// lib/common.js

/**
 * 基础方法以及 AccessToken 缓存区
 * @author: tianeyi
 * date: 2019-07-17
 */
const crypto = require('crypto');
const request = require('request');

/*
 * 全局  AccessToken
 * @token {STRING} accessToken
 */
const AccessToken = function(token){
	
	return {
		token: token, 
		expire: new Date().getTime() + (7000 * 1000)
	}
};

/*
 * 全局  JSSDKTicket
 * @token {STRING} ticket
 */
const JSSDKTicket = function(ticket, agentTicket){
	
	return {
		ticket: ticket, 
		agentTicket: agentTicket,
		expire: new Date().getTime() + (7000 * 1000)
	}
};

/**
 * 企业微信接口客户端
 * @settings {JSON} 企业微信配置信息
 * @samples 
 * {
	token: '',
	app_id: '',
	app_secret: '-bzxIuD1sUyuc7G0',
	agent_id: '',
	encodingAESKey: ''
  }
 */

var API = function(settings){
	
	this.settings = Object.assign({ }, settings);
};

/**
 * 渗入方法
 * @obj {OBJECT}} 方法集合
 */
API.mixin = function(obj){
	
	for (var key in obj) {
		if (API.prototype.hasOwnProperty(key)) {
			throw new Error('Don\'t allow override existed prototype method. method: ' + key);
		} else {
			API.prototype[key] = obj[key];
		}
	}
};

/**
 * 请求接口方法
 * @url {STRING}}接口地址，不含 endpoint 部分
 * @options {JSON} 参数
 * @callback {FUNCTION} 回调方法
 */
API.prototype.request = function (url, options, callback) {
	
	options = options || {};
	
	request({
		url: 'https://qyapi.weixin.qq.com/cgi-bin/' + url,
		json: options.json || true,
		method: options.method || 'GET',
		headers: {
			'content-type': 'application/json'
		},
		body: options.data || {}
	}, function(err, response, body){
		
		typeof(callback) == 'function' && callback(err, body);
	});
};

/**
 * 获取 token 方法
 * @callback {FUNCTION} 回调方法
 */
API.prototype.getAccessToken = function(callback){
	
	if (this.accessToken && this.accessToken.token && this.accessToken.expire>new Date().getTime()){
		callback(this.accessToken);
	} else {
		this.request('gettoken?corpid=' + this.settings.app_id + '&corpsecret=' + this.settings.app_secret, {
			method: 'GET'
		}, (err, result) => {
			
			if (err){
				callback(this.accessToken);
			} else {
				callback(this.accessToken = AccessToken(result.access_token));
			}
		});
	}
};

/**
 * 获取 jssdk ticket 方法
 * @callback {FUNCTION} 回调方法
 */
API.prototype.getJSSDKTicket = function(callback){
	
	this.getAccessToken((accessToken) => {
		
		if (this.jssdkTicket && this.jssdkTicket.ticket && this.jssdkTicket.expire>new Date().getTime()){
			callback(this.jssdkTicket);
		} else {
			this.request('get_jsapi_ticket?access_token=' + this.settings.app_id, {
				method: 'GET'
			}, (err, result) => {
		
				this.request('ticket/get?access_token=' + this.settings.app_id + '&type=agent_config', {
					method: 'GET'
				}, (_err, _result) => {
						
					if (err || _err){
						callback(this.jssdkTicket);
					} else {
						callback(this.jssdkTicket = JSSDKTicket(result.ticket, _result.ticket));
					}
				});
			});
		}
	});		
};

/**
 * 用户授权认证方法
 * @code {STRING} 授权码
 * @callback {FUNCTION} 回调方法
 */
API.prototype.oauth = function(code, callback){
	
	this.getAccessToken((accessToken) => {
		
		this.request('user/getuserinfo?access_token=' + accessToken.token + '&code=' + code, {
			method: 'GET'
		}, callback);
	});
}

/**
 * JSSDK 授权方法
 * @url {STRING} 页面地址
 * @callback {FUNCTION} 回调方法
 */
API.prototype.signature = function(url, callback){
	
	this.getJSSDKTicket((jssdkTicket) => {
		
		var timestamp = new Date().getTime();
		var nonce = Math.random().toString(36).substr(2, 15);
		var sha1 = crypto.createHash("sha1");
			sha1.update('jsapi_ticket=' + jssdkTicket.ticket + '&noncestr=' + nonce + '&timestamp=' + timestamp + '&url=' + url);
		var signature = sha1.digest("hex");
		var agentSha1 = crypto.createHash("sha1");
			agentSha1.update('jsapi_ticket=' + jssdkTicket.agentTicket + '&noncestr=' + nonce + '&timestamp=' + timestamp + '&url=' + url);
		var agentSignature = agentSha1.digest("hex");
		
		callback(null, {
			appId: this.settings.app_id,
			agentId: this.settings.agent_id,
			timestamp: timestamp,
			nonceStr: nonce,
			url: url,
			ticket: jssdkTicket.ticket,
			ticketAgent: jssdkTicket.agentTicket,
			signature: signature,
			signatureAgent: agentSignature
		});
	});
};

module.exports = API;