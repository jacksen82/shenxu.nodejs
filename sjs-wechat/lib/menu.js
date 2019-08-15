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
	 * @sample {
	 * 	"button": [{
	 * 		"type":"click",
	 * 		"name":"今日歌曲",
	 * 		"key":"V1001_TODAY_MUSIC"
	 * 	}]
	 * }
	 */
	createMenu: function(menu, callback){
		
		this.getAccessToken((accessToken) => {
			
			this.request('menu/create?access_token=' + accessToken.token, {
				method: 'POST',
				data: menu || {}
			}, callback);
		});
	}
};