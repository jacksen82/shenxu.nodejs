//	lib/department.js

/**
 * 部门接口
 * @author: tianeyi
 * date: 2019-07-17
 */
module.exports = {
	
	/**
	 * 创建自定义菜单
	 * @menu {OBJECT} 菜单配置信息
	 * @callback {FUNCTION} 回调方法
	 */
	listDepartment: function(id, callback){
		
		this.getAccessToken((accessToken) => {
			
			this.request('department/list?access_token=' + accessToken.token + '&id=' + id, {
				method: 'GET'
			}, callback);
		});
	},
	
	/**
	 * 创建新部门
	 * @data {OBJECT} 部门信息
	 * @callback {FUNCTION} 回调方法
	 * @sample 
	 * {
			"id": 2,
		   "name": "广州研发中心",
		   "parentid": 1,
		   "order": 1
		}
	 */
	createDepartment: function(data, callback){
		
		this.getAccessToken((accessToken) => {
			
			this.request('department/create?access_token=' + accessToken.token, {
				method: 'POST',
				data: data
			}, callback);
		});
	},
	
	/**
	 * 更新部门
	 * @data {OBJECT} 部门信息
	 * @callback {FUNCTION} 回调方法
	 * @sample 
	 * {
			"id": 2,
		   "name": "广州研发中心",
		   "parentid": 1,
		   "order": 1
		}
	 */
	updateDepartment: function(data, callback){
		
		this.getAccessToken((accessToken) => {
			
			this.request('department/update?access_token=' + accessToken.token, {
				method: 'POST',
				data: data
			}, callback);
		});
	},
	
	/**
	 * 删除部门
	 * @id {NUMBER} 部门编号
	 * @callback {FUNCTION} 回调方法
	 */
	deleteDepartment: function(id, callback){
		
		this.getAccessToken((accessToken) => {
			
			this.request('department/delete?access_token=' + accessToken.token + '&id=' + id, {
				method: 'GET'
			}, callback);
		});
	}
};