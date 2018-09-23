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
 * 通用功能按钮
 */
var ButtonCom = (function (_super) {
    __extends(ButtonCom, _super);
    function ButtonCom() {
        return _super.call(this, SkinName.ButtonComSkin) || this;
    }
    ButtonCom.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
    };
    ButtonCom.prototype.onAwake = function ($data) {
        if ($data === void 0) { $data = null; }
        _super.prototype.onAwake.call(this, $data);
    };
    return ButtonCom;
}(BaseEuiItem));
__reflect(ButtonCom.prototype, "ButtonCom");
//# sourceMappingURL=ButtonCom.js.map