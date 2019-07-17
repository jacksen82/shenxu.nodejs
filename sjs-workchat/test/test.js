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
 * 开始测试
 */
describe('api', function() {
	
	it('oauth(callback)', function(done) {
		
		workchatAPI.oauth('22222', function(err, result){
			
			done(err, result)
		});
	});
	
	it('signature(callback)', function(done) {
		
		workchatAPI.signature('http://www.baidu.com', function(err, result){
			
			done(err, result)
		});
	});
	
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
	
	it('send(callback)', function(done) {
		
		workchatAPI.send('22222', '1111111', function(err, result){
			
			done(assert.strictEqual(0, result.errcode, JSON.stringify(result)))
		});
	});
});
