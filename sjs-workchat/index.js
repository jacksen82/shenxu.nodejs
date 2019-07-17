// index.js

/**
 * 企业微信接口代理
 * @author: tianeyi
 * date: 2019-07-10
 */
const API = require('./lib/common');

/**
 * 自定义菜单接口
 */
API.mixin(require('./lib/menu'));

/**
 * 消息接口
 */
API.mixin(require('./lib/message'));

module.exports = API;