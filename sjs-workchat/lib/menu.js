//	lib/menu.js

/**
 * 自定义菜单接口
 * @author: tianeyi
 * date: 2019-07-17
 */
module.exports = {
	
	/**
	 * 创建自定义菜单
	 * @menu {OBJECT} 菜单配置信息
	 * @callback {FUNCTION} 回调方法
	 */
	createMenu: function(menu, callback){
		
		this.getAccessToken((accessToken) => {
			
			this.request('menu/create?access_token=' + accessToken.token + '&agentid=' + this.settings.agent_id, {
				method: 'POST',
				data: menu || {}
			}, callback);
		});
	}
};