var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CommonEvent = (function () {
    function CommonEvent() {
    }
    /** 更新货币 */
    CommonEvent.UPDATE_CURRENCY = "UPDATE_CURRENCY";
    return CommonEvent;
}());
__reflect(CommonEvent.prototype, "CommonEvent");
//# sourceMappingURL=CommonEvent.js.map