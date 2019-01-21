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
 * 战斗界面
 */
var BattleView = (function (_super) {
    __extends(BattleView, _super);
    function BattleView($controller, $layer) {
        var _this = _super.call(this, $controller, $layer) || this;
        var self = _this;
        self.skinName = SkinName.BattleViewSkin;
        self.setResources(["battle", "role", "bullet"]);
        return _this;
    }
    /** 对面板进行显示初始化，用于子类继承 */
    BattleView.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        var self = this;
        self.currency.initUI();
    };
    /** 对面板数据的初始化，用于子类继承 */
    BattleView.prototype.initData = function () {
        _super.prototype.initData.call(this);
    };
    /** 面板开启执行函数，用于子类继承 */
    BattleView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        var self = this;
        self._model = self.controller.getModel();
        //初始化地图数据
        self.map.open(self.controller);
        self.onUpdateView();
    };
    BattleView.prototype.addEvents = function () {
        _super.prototype.addEvents.call(this);
        var self = this;
        self.btn_hall.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onBackHallHandler, self);
        self.btn_buyRole.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onBuyRoleHandler, self);
        self.setBtnEffect(["btn_buyRole", "btn_hall"]);
        self.controller.registerFunc(BattleConst.MONSTER_WAVENUM_COMPLETE, self.onUpdateView, self);
    };
    BattleView.prototype.removeEvents = function () {
        _super.prototype.removeEvents.call(this);
        var self = this;
        self.btn_hall.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onBackHallHandler, self);
        self.btn_buyRole.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onBuyRoleHandler, self);
    };
    /** 每波怪完成后的处理 */
    BattleView.prototype.onUpdateView = function () {
        var self = this;
        if (self._model.battleMonsterState == BATTLE_MONSTER_STATE.BOSS) {
            self.txt_level.text = App.LanguageMgr.getLanguageText("battle.txt.03");
        }
        else {
            self.txt_level.text = App.LanguageMgr.getLanguageText("battle.txt.02", self._model.levelVO.missionId, self._model.currwaveNum);
        }
    };
    /** 购买角色 */
    BattleView.prototype.onBuyRoleHandler = function () {
        var self = this;
        var roleId = App.Random.randrange(1, 3);
        self.applyFunc(BattleConst.CREATE_ROLE, roleId);
    };
    /** 返回大厅界面 */
    BattleView.prototype.onBackHallHandler = function () {
        App.Scene.runScene(SceneConsts.HALL);
    };
    return BattleView;
}(BaseEuiView));
__reflect(BattleView.prototype, "BattleView");
