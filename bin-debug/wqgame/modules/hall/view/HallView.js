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
 * 大厅主界面
 */
var HallView = (function (_super) {
    __extends(HallView, _super);
    function HallView($controller, $layer) {
        var _this = _super.call(this, $controller, $layer) || this;
        _this.skinName = SkinName.HallViewSkin;
        _this.setResources(["hall"]);
        return _this;
    }
    /** 对面板进行显示初始化，用于子类继承 */
    HallView.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        var self = this;
        self.currency.initUI();
    };
    /** 对面板数据的初始化，用于子类继承 */
    HallView.prototype.initData = function () {
        _super.prototype.initData.call(this);
    };
    HallView.prototype.addEvents = function () {
        _super.prototype.addEvents.call(this);
        var self = this;
        self.btn_battle.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onEnterBattle, self);
        self.btn_menu.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onShowMenu, self);
        self.setBtnEffect(["btn_battle"]);
    };
    HallView.prototype.removeEvents = function () {
        _super.prototype.removeEvents.call(this);
        var self = this;
        self.btn_battle.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onEnterBattle, self);
        self.btn_menu.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onShowMenu, self);
    };
    /** 进入战斗 */
    HallView.prototype.onEnterBattle = function () {
        App.Scene.clear();
        App.Scene.runScene(SceneConsts.BATTLE);
    };
    /** 显示功能菜单 */
    HallView.prototype.onShowMenu = function () {
    };
    return HallView;
}(BaseEuiView));
__reflect(HallView.prototype, "HallView");
//# sourceMappingURL=HallView.js.map