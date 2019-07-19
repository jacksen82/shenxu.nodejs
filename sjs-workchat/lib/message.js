//	lib/message.js

/**
 * 消息接口
 * @author: tianeyi
 * date: 2019-07-10
 */
module.exports = {
	
	/**
	 * 发送文本消息
	 * @toUserName {STRING} 接收人 openId
	 * @data {STRING} 消息内容
	 * @callback {FUNCTION} 回调方法
	 * @sample 
	 * {
		   'touser' : toUserName,
		   'msgtype': 'text',
		   'agentid' : this.settings.agent_id,
		   'text': {
        		'content': content
            }
		}
	 */
	sendMessage: function(data, callback){
		
		this.getAccessToken((accessToken) => {
			
			this.request('message/send?access_token=' + accessToken.token, {
				method: 'POST',
				data: data
			}, callback);
		});
	},
	
	/*
	 * 构建文本消息
	 */
	buildTextMessage: function(req, content){
		
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
	}
};