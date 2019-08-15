// index.js

/**
 * 微信接口代理
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

/**
 * 二维码接口
 */
API.mixin(require('./lib/qrcode'));

/**
 * 回调接口
 */
API.mixin(require('./lib/callback'));

/**
 * 公开方法
 */
module.exports = API;