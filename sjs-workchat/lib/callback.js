//	lib/callback.js

/**
 * 回调接口
 * @author: tianeyi
 * date: 2019-07-17
 */
const xml2js = require('xml2js');
const crypto = require('crypto');
const WXBizMsgCrypt = require('wechat-crypto');
const WXMessage = require('./message');

/**
 * 转换 XML 消息为对象
 * @xmlMessage {OBJECT} XML 消息
 */
const messageToJSON = function(xmlMessage){

	var result = {};

	if (typeof xmlMessage === 'object') {
		for (var key in xmlMessage) {
			if (!Array.isArray(xmlMessage[key]) || xmlMessage[key].length === 0) {
				continue;
			}
			if (xmlMessage[key].length === 1) {
				result[key] = (
					typeof xmlMessage[key][0]==='object' ?
					messageToJSON(val) : 
					(xmlMessage[key][0] || '').trim()
				);
			} else {
				result[key] = [];
				xmlMessage[key].forEach(function(item){
					
					result[key].push(messageToJSON(item));
				});
			}
		}
	}
	
	return result;
};

/**
 * 转换对象为消息 XML 消息
 * @cryptor {OBJECT} 转码对象
 * @timestamp {NUMBER} 时间戳
 * @nonce {STRING} 随机串
 * @encrypt {STRING} 加密消息
 * @xmlMessage {STRING} XML 消息
 */
const jsonToMessage = function(cryptor, timestamp, nonce, encrypt, xmlMessage){
	
	var timestamp = new Date().getTime();
	var nonce = Math.random().toString(36).substr(2, 15);
	var encrypt = cryptor.encrypt(xmlMessage);
	var signature = cryptor.getSignature(timestamp, nonce, encrypt);
	
	return `<xml>
		<Encrypt><![CDATA[${encrypt}]]></Encrypt>
		<MsgSignature><![CDATA[${signature}]]></MsgSignature>
		<TimeStamp>${timestamp}</TimeStamp>
		<Nonce><![CDATA[${nonce}]]></Nonce>
	</xml>`;
};

/*
 * 构建文本消息
 */
const buildTextMessage = function(req, content){
		
	var timestamp = new Date().getTime();
	var toUserName = req.message.FromUserName;
	var fromUserName = req.message.ToUserName;
	
	return `<xml>
		<ToUserName><![CDATA[${toUserName}]]></ToUserName>
		<FromUserName><![CDATA[${fromUserName}]]></FromUserName>
		<CreateTime>${timestamp}</CreateTime>
		<MsgType><![CDATA[text]]></MsgType>
		<Content><![CDATA[${content}]]></Content>
	</xml>`;
};

module.exports = {
	
	/**
	 * 消息回调委托
	 * @req {OBJECT} request 对象
	 * @res {OBJECT} response 对象
	 * @callback {FUNCTION} 回调方法
	 */
	callback: function(req, res, callback){
		
		var buffers = [];
		var signature = req.query.msg_signature;
		var timestamp = req.query.timestamp;
		var nonce = req.query.nonce;
		var echostr = decodeURIComponent(req.query.echostr);
		var cryptor = new WXBizMsgCrypt(
			this.settings.token,
			this.settings.encodingAESKey, 
			this.settings.app_id
		);
		
		if (req.method == 'POST'){	
			req.on('data', function (trunk) {
				
				buffers.push(trunk);
			});
			req.on('end', function (err, result) {
			
				if (err){
					throw new Error('wechat load message error');
				} else {
					xml2js.parseString(Buffer.concat(buffers).toString('utf-8') || '<xml></xml>', {
					 	trim: true
					}, function (_err, _result) {
						
						if (_err){
							throw new Error('-40008_parse xml error');
						} else {
							var message = messageToJSON(_result.xml);
							var encrypted = message.Encrypt;
							var decrypted, xmlWrapper;
							
							if (signature != cryptor.getSignature(timestamp, nonce, encrypted)){
								throw new Error('-40009_parse signature unvalid');
							} else {
								decrypted = cryptor.decrypt(encrypted);
								xmlWrapper = decrypted.message || '<xml></xml>';
								xml2js.parseString(xmlWrapper, {
									trim: true
								}, function (__err, __result) {
	
									if (__err) {
										throw new Error('-40008_BadMessage:' + __err.name);
									} else {
										req.message = messageToJSON(__result.xml);
										res.reply = function(xmlString){
											
											res.send(jsonToMessage(cryptor, timestamp, nonce, encrypted, xmlString));
										};
										res.replyText = function(content){
											
											res.send(jsonToMessage(cryptor, timestamp, nonce, encrypted, buildTextMessage(req, content)));
										};
										callback(req, res);
									}
								});
							}
						}
					});
				}
			});
			req.once('error', callback);
		} else {
			if (signature == cryptor.getSignature(timestamp, nonce, echostr)) {
				res.send(cryptor.decrypt(echostr).message);
			} else {
		   		throw new Error('-40001_invaild MsgSig');
		    }
		}
	}
};