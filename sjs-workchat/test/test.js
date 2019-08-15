//	test/test.js

const WorkchatAPI = require('../index');
const assert = require("assert");

/*
 * 声明创建 EZLinkAPI 对象
 */
var workchatAPI = new WorkchatAPI({
	token: 'gocom',
	app_id: 'ww619243ee51dcd203',
	app_secret: '4bSUWrMxcpyJBM5Re2xvV5zrXF6-bzxIuD1sUyuc7G0',
	agent_id: '1000002',
	encodingAESKey: 'pU9YqhBkIeGpghYa3sEiA5r2Q7KlOIjv26ns7pl9gaq'
});

/*
 * 基础接口
 */
describe('base', function() {
	
//	it('authorizeUrl(url)', function(done) {
//		
//		var authorizeUrl = workchatAPI.authorizeUrl('http://www.baidu.com');
//		
//		assert.strictEqual('', authorizeUrl, authorizeUrl);
//	});
//	
//	it('oauth(callback)', function(done) {
//		
//		workchatAPI.oauth('22222', function(err, result){
//			
//			done(err, result)
//		});
//	});
	
	it('signature(url, callback)', function(done) {
		
		workchatAPI.signature('http://ezlink.natapp1.cc/recipe/577562d746e0487f886d3ffdb085e839/action/assign', function(err, result){
			console.log(result);
			done(err, result)
		});
	});
	return ;
});

/*
 * 部门接口
 */
describe('department', function() {
	
	return ;
	it('listDepartment(id, callback)', function(done) {
		
		workchatAPI.listDepartment(0, function(err, result){
			
			done(assert.strictEqual(0, result.errcode, JSON.stringify(result)))
		});
	});
});

/*
 * 成员接口
 */
describe('user', function() {
	
	return ;
	it('simplelistUser(department_id, fetch_child, callback)', function(done) {
		
		workchatAPI.simplelistUser(1, 0, function(err, result){

			done(assert.strictEqual(0, result.errcode, JSON.stringify(result)))
		});
	});
	
	it('getUser(userid, callback)', function(done) {
		
		workchatAPI.createUser('ShenXu', function(err, result){

			done(assert.strictEqual(0, result.errcode, JSON.stringify(result)))
		});
	});
	
	it('createUser(date, callback)', function(done) {
		
		workchatAPI.createUser({
		    "userid": "zhangsan",
		    "name": "张三",
		    "mobile": "15913215421",
		    "department": [1],
		    "order":[100000001],
		    "position": "产品经理",
		    "enable":1,
		    "extattr": { },
		    "to_invite": true,
		    "external_position": "高级产品经理",
		    "external_profile": {
		        "external_corp_name": "企业简称",
		        "external_attr": []
		    }	
		}, function(err, result){

			done(assert.strictEqual(0, result.errcode, JSON.stringify(result)))
		});
	});
	
	it('updateUser(date, callback)', function(done) {
		
		workchatAPI.updateUser({
		    "userid": "ShenXu",
		    "name": "张三"
		}, function(err, result){

			done(assert.strictEqual(0, result.errcode, JSON.stringify(result)))
		});
	});
	
	it('deleteUser(userid, callback)', function(done) {
		
		workchatAPI.deleteUser('ShenXu-1', function(err, result){

			done(assert.strictEqual(0, result.errcode, JSON.stringify(result)))
		});
	});
});

/*
 * 自定义菜单接口
 */
describe('menu', function() {
	
	return ;
	it('createMenu(callback)', function(done) {
		
		workchatAPI.createMenu({
	    	"button":[{
	    		"type":"click",
	         	"name":"测试菜单",
	        	"key":"MENU_ACTIVE"
			}]
	    }, function(err, result){
			
			done(assert.strictEqual(0, result.errcode, JSON.stringify(result)))
		});
	});
});

/*
 * 消息接口
 */
describe('message', function() {

	return ;
	it('sendMessage(data, callback)', function(done) {
		
		workchatAPI.sendMessage({
			touser: 'ShenXu',
			msgtype: 'text',
			text: {
				content: '你的快递已到，请携带工卡前往邮件中心领取。\n出发前可查看 <a href="http://work.weixin.qq.com">邮件中心视频实况</a>，聪明避开排队。'
			},
			safe: 0
		}, function(err, result){
			
			done(assert.strictEqual(0, result.errcode, JSON.stringify(result)))
		});
	});
});

/*
 * 回调接口
 */
describe('callback', function() {

	it('callback(req, res, callback)', function(done) {
		
		workchatAPI.callback({
			
		}, {
			
		}, function(err, result){
			
			done(assert.strictEqual(0, result.errcode, JSON.stringify(result)))
		});
	});
});