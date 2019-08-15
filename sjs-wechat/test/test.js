//	test/test.js

const assert = require('assert');
const request = require('request');
const WechatAPI = require('../index');

/*
 * 声明创建 WechatAPI 对象
 */
var wechatAPI = new WechatAPI({
	token: 'gocom',
	app_id: 'wx617c5c1f99f7fca4',
	app_secret: 'cec0b6f6dc3954dd2014abfaf2512ba4',
	grant_type: 'client_credential'
});

/*
 * 基础接口
 */
describe('base', function() {
	
//	it('getAccessToken(callback)', function(done) {
//		
//		wechatAPI.getAccessToken(function(accessToken){
//			
//			done(assert(accessToken && accessToken.token, 'token 获取失败：' + JSON.stringify(accessToken)));
//		});
//	});
//	
//	it('getJSSDKTicket(callback)', function(done) {
//		
//		wechatAPI.getJSSDKTicket(function(jssdkTicket){
//			
//			done(assert(jssdkTicket && jssdkTicket.ticket, 'ticket 获取失败' + JSON.stringify(jssdkTicket)));
//		});
//	});
//	
//	it('authorizeUrl(callback)', function() {
//		
//		assert(/^https/i.test(wechatAPI.authorizeUrl('http://ezlink.natapp1.cc')), '获取授权地址失败');
//	});
//	
//	it('oauth(callback)', function(done) {
//		
//		wechatAPI.oauth('061bFDrh0RyWxv1Ezbrh0YUjrh0bFDrP', function(err, result){
//			
//			done(assert(!err && result && result.openid, 'oauth 认证失败：' + (err || JSON.stringify(result)).toString()));
//		});
//	});
});

/*
 * 菜单接口
 */
describe('menu', function() {
		
//	it('createMenu(menu, callback)', function(done) {
//		
//		wechatAPI.createMenu({
//			button: [{
//				type: 'click',
//				name: '今日歌曲',
//				key: 'V1001_TODAY_MUSIC'
//			}]
//		}, function(err, result){
//			
//			done(assert(!err && result && result.errcode==0, 'oauth 认证失败：' + (err || JSON.stringify(result)).toString()));
//		});
//	});
});

/*
 * 消息接口
 */
describe('message', function(done) {
	
//	it('sendMessage(data, callback)', function(done) {
//	
//		wechatAPI.sendMessage({
//			touser: 'ovOTntzNOgVSNerlkc2iwdI_EW_Q',
//			msgtype: 'text',
//			text: {
//				content: 'Hello World'
//			}
//		}, function(err, result){
//			
//			done(assert(!err && result && result.errcode==0, 'oauth 认证失败：' + (err || JSON.stringify(result)).toString()));
//		});
//	});	
});

/*
 * 消息接口
 */
describe('qrcode', function(done) {
	
	it('createQrCode(qrcode, callback)', function(done) {
	
		wechatAPI.createQrCode({
			expire_seconds: 2592000,
			action_name: 'QR_SCENE',
			action_info: {
				scene: {
					scene_id: 123
				}
			}
		}, function(err, result){
			
			done(assert(!err && result && result.ticket, '生成二维码失败：' + (err || JSON.stringify(result)).toString()));
		});
	});	
});