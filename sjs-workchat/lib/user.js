//	lib/user.js

/**
 * 成员接口
 * @author: tianeyi
 * date: 2019-07-17
 */
module.exports = {
	
	/**
	 * 获取成员列表
	 * @department_id {NUMBER} 部门编号
	 * @fetch_child {NUMBER} 是否递归查询，非必填
	 * @callback {FUNCTION} 回调方法
	 */
	simplelistUser: function(department_id, fetch_child, callback){
		
		this.getAccessToken((accessToken) => {
			
			this.request('user/simplelist?access_token=' + accessToken.token + '&department_id=' + department_id + '&fetch_child=' + fetch_child, {
				method: 'GET'
			}, callback);
		});
	},
	
	/**
	 * 获取成员详情
	 * @userid {NUMBER} 成员编号
	 * @callback {FUNCTION} 回调方法
	 */
	getUser: function(userid, callback){
		
		this.getAccessToken((accessToken) => {
			
			this.request('user/get?access_token=' + accessToken.token + 'userid=' + userid, {
				method: 'GET'
			}, callback);
		});
	},
	
	/**
	 * 创建成员
	 * @data {OBJECT} 成员信息
	 * @callback {FUNCTION} 回调方法
	 * @sample
	 * {
		    "userid": "zhangsan",
		    "name": "张三",
		    "mobile": "15913215421",
		    "department": [1],
		    "order":[100000001],
		    "position": "产品经理",
		    "enable":1,
		    "telephone": "020-123456",
		    "address": "广州市海珠区新港中路",
		    "extattr": { },
		    "to_invite": true,
		    "external_position": "高级产品经理",
		    "external_profile": {
		        "external_corp_name": "企业简称",
		        "external_attr": []
		    }
		}
	 */
	createUser: function(data, callback){
		
		this.getAccessToken((accessToken) => {
			
			this.request('user/create?access_token=' + accessToken.token, {
				method: 'POST',
				data: data
			}, callback);
		});
	},
	
	/**
	 * 更新成员
	 * @data {OBJECT} 成员信息
	 * @callback {FUNCTION} 回调方法
	 * @sample
	 * {
		    "userid": "zhangsan",
		    "name": "张三",
		    "mobile": "15913215421",
		    "department": [1],
		    "order":[100000001],
		    "position": "产品经理",
		    "enable":1,
		    "telephone": "020-123456",
		    "address": "广州市海珠区新港中路",
		    "extattr": { },
		    "to_invite": true,
		    "external_position": "高级产品经理",
		    "external_profile": {
		        "external_corp_name": "企业简称",
		        "external_attr": []
		    }
		}
	 */
	updateUser: function(data, callback){
		
		this.getAccessToken((accessToken) => {
			
			this.request('user/update?access_token=' + accessToken.token, {
				method: 'POST',
				data: data
			}, callback);
		});
	},
	
	/**
	 * 删除成员
	 * @userid {NUMBER} 成员编号
	 * @callback {FUNCTION} 回调方法
	 */
	deleteUser: function(userid, callback){
		
		this.getAccessToken((accessToken) => {
			
			this.request('user/delete?access_token=' + accessToken.token + '&userid=' + userid, {
				method: 'GET'
			}, callback);
		});
	}
};