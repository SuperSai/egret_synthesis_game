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
 * 英雄信息面板
 */
var HeroMsgPanel = (function (_super) {
    __extends(HeroMsgPanel, _super);
    function HeroMsgPanel($controller, $layer, $skinName) {
        return _super.call(this, $controller, $layer, $skinName) || this;
    }
    /** 初始化界面 */
    HeroMsgPanel.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        var self = this;
    };
    /** 初始化数据 */
    HeroMsgPanel.prototype.initData = function () {
        var self = this;
        self.txt_title.text = self._heroRole.heroVO.name;
    };
    HeroMsgPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        var self = this;
        self._heroRole = param[0];
        self._model = self.controller.getModel();
    };
    HeroMsgPanel.prototype.addEvents = function () {
        _super.prototype.addEvents.call(this);
        var self = this;
        self.setBtnEffect(["btn_close"]);
    };
    HeroMsgPanel.prototype.removeEvents = function () {
        _super.prototype.removeEvents.call(this);
        var self = this;
    };
    return HeroMsgPanel;
}(BaseEuiAlert));
__reflect(HeroMsgPanel.prototype, "HeroMsgPanel");
