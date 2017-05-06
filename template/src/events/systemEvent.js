/**
 * @systemEent 自定义事件管理
 * @author  stylehuan
 * @create  2017-02-09 13:19
 */
import eventBus from './eventBus';
const eventMsg = {
  ROUTER_BEFORE: 'ROUTER_BEFORE',
  ROUTER_AFTER: 'ROUTER_AFTER',
  CONNECTERROT: 'CONNECTERROT',
  UPDATE_PAGE_DIR: 'UPDATE_PAGE_DIR'
};
export {eventBus, eventMsg};
