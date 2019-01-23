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
 * 说话提示界面
 */
var HeroTalk = (function (_super) {
    __extends(HeroTalk, _super);
    function HeroTalk($controller, $layer, $skinName, $viewShowType) {
        if ($viewShowType === void 0) { $viewShowType = VIEW_SHOW_TYPE.UP; }
        var _this = _super.call(this, $controller, $layer, $skinName, $viewShowType) || this;
        _this.anchorOffsetY = -300;
        return _this;
    }
    /** 初始化界面 */
    HeroTalk.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        var self = this;
        self.effectCallBack = function () {
            self.talkGroup.visible = true;
        };
    };
    /** 初始化数据 */
    HeroTalk.prototype.initData = function () {
        var _this = this;
        _super.prototype.initData.call(this);
        var self = this;
        App.Timer.doTimer(1000, 1, function () {
            self.controller.getModel().battleMonsterState = BATTLE_MONSTER_STATE.MONSTER;
            _super.prototype.onClosePanel.call(_this);
        }, self);
    };
    HeroTalk.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        var self = this;
    };
    HeroTalk.prototype.addEvents = function () {
        _super.prototype.addEvents.call(this);
        var self = this;
    };
    HeroTalk.prototype.removeEvents = function () {
        _super.prototype.removeEvents.call(this);
        var self = this;
    };
    HeroTalk.prototype.onMaskHandler = function () {
        _super.prototype.onMaskHandler.call(this);
        var self = this;
        self.talkGroup.visible = false;
        self.controller.getModel().battleMonsterState = BATTLE_MONSTER_STATE.MONSTER;
    };
    return HeroTalk;
}(BaseEuiAlert));
__reflect(HeroTalk.prototype, "HeroTalk");
//# sourceMappingURL=HeroTalk.js.map