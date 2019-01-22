var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 排列工具类
 */
var AlignUtils = (function (_super) {
    __extends(AlignUtils, _super);
    function AlignUtils() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /** 把现实对象设置到屏幕水平居中，垂直居中的位置上 */
    AlignUtils.prototype.setToScreenCenter = function (display) {
        display.x = (App.Stage.getWidth() - display.width) * 0.5;
        display.y = (App.Stage.getHeight() - display.height) * 0.5;
    };
    /** 把现实对象设置到屏幕水平居中，垂直在0.618的黄金分割点位置上 */
    AlignUtils.prototype.setScreenGoldenDivision = function (display) {
        display.x = (App.Stage.getWidth() - display.width) * 0.5;
        display.y = (App.Stage.getHeight() - display.height) * 0.382;
    };
    return AlignUtils;
}(BaseClass));
__reflect(AlignUtils.prototype, "AlignUtils");
//# sourceMappingURL=AlignUtils.js.map