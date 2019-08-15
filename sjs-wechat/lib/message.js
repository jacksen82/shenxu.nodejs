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
		   'text': {
        		'content': content
            }
		}
	 */
	sendMessage: function(data, callback){
		
		this.getAccessToken((accessToken) => {
			
			this.request('message/custom/send?access_token=' + accessToken.token, {
				method: 'POST',
				data: data
			}, callback);
		});
	}
};