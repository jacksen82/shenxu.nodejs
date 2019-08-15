//	lib/qrcode.js

/**
 * 二维码接口
 * @author: tianeyi
 * date: 2019-07-17
 */
module.exports = {
	
	/**
	 * 生成二维码
	 * @qrcode {OBJECT} 二维码信息
	 * @callback {FUNCTION} 回调方法
	 * @sample {
	 * 	"expire_seconds": 2592000, 
	 * 	"action_name": "QR_SCENE", 
	 * 	"action_info": {
	 * 		"scene": {
	 * 			"scene_id": 123
	 * 		}
	 * 	}
	 * }
	 */
	createQrcode: function(qrcode, callback){
		
		this.getAccessToken((accessToken) => {
			
			this.request('qrcode/create?access_token=' + accessToken.token, {
				method: 'POST',
				data: qrcode || {}
			}, callback);
		});
	}
};