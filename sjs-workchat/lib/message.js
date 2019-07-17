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
	 * @content {STRING} 消息内容
	 * @callback {FUNCTION} 回调方法
	 */
	send: function(toUserName, content, callback){
		
		this.getAccessToken((accessToken) => {
			
			this.request('message/send?access_token=' + accessToken.token, {
				method: 'POST',
				data: {
				   'touser' : toUserName,
				   'msgtype': 'text',
				   'agentid' : this.settings.agent_id,
				   'text': {
		        		'content': content
		            }
				}
			}, callback);
		});
	}
};