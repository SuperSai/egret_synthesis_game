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
        this.refreshBuyHeroBtn();
        this._model = this.controller.getModel();
        //初始化地图数据
        this.map.open(this.controller);
        this.onUpdateView();
        App.Sound.playBg("10005");
    };
    BattleView.prototype.addEvents = function () {
        _super.prototype.addEvents.call(this);
        var self = this;
        self.btn_hall.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onBackHallHandler, self);
        self.btn_buyRole.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onBuyRoleHandler, self);
        self.setBtnEffect(["btn_buyRole", "btn_hall"]);
        self.controller.registerFunc(BattleConst.MONSTER_WAVENUM_COMPLETE, self.onUpdateView, self);
        self.controller.registerFunc(BattleConst.UPDATE_BUY_HERO, self.onUpdateBuyHeroView, self);
        self.controller.registerFunc(BattleConst.MONSTER_DROP_GOODS, self.onMonsterDropGoods, self);
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
            self.txt_level.text = App.Language.getLanguageText("battle.txt.03");
        }
        else {
            self.txt_level.text = App.Language.getLanguageText("battle.txt.02", self._model.levelVO.missionId, self._model.currwaveNum);
        }
    };
    /** 购买角色 */
    BattleView.prototype.onBuyRoleHandler = function () {
        var self = this;
        if (App.Player.info.gold < this._buyHeroGold || this._buyHeroGold == -1) {
            App.Message.showText(App.Language.getLanguageText("label.01"));
            return;
        }
        self.applyFunc(BattleConst.CREATE_ROLE, self._buyHeroId);
    };
    BattleView.prototype.onUpdateBuyHeroView = function () {
        App.NotificationCenter.dispatch(CommonEvent.UPDATE_CURRENCY, -this._buyHeroGold, ITEM_TYPE.GOLD);
        this.refreshBuyHeroBtn();
    };
    /** 刷新英雄购买按钮 */
    BattleView.prototype.refreshBuyHeroBtn = function () {
        this._buyHeroId = App.Random.randrange(0, 3);
        this._buyHeroGold = this.controller.getHeroBuyGold(this._buyHeroId);
        this.txt_money.text = this._buyHeroGold + "";
    };
    /** 怪物掉落物品 */
    BattleView.prototype.onMonsterDropGoods = function (pos) {
        var _this = this;
        var dropItem = ObjectPool.pop(DropItem, "DropItem", null, LayerMgr.GAME_MAP_LAYER);
        var dropType = Math.random() > 0.5 ? ITEM_TYPE.GOLD : ITEM_TYPE.DIAMOND;
        dropItem.initItem(dropType, pos);
        dropItem.addToParent();
        dropItem.parent.setChildIndex(dropItem, 1);
        dropItem.callBack = function () {
            var target = _this.getCurrencyTarget(dropType);
            App.Effect.doGoodsFlyEffect(dropItem, pos, target.localToGlobal(), function () {
                dropItem.removeSelf();
                eval(App.Effect.doMacIconShake("target"));
            }, 500);
        };
    };
    BattleView.prototype.getCurrencyTarget = function (type) {
        switch (type) {
            case ITEM_TYPE.GOLD:
                return this.currency.goldGroup;
            case ITEM_TYPE.DIAMOND:
                return this.currency.diamondGroup;
        }
    };
    /** 返回大厅界面 */
    BattleView.prototype.onBackHallHandler = function () {
        App.Scene.runScene(SceneConsts.HALL);
    };
    return BattleView;
}(BaseEuiView));
__reflect(BattleView.prototype, "BattleView");
//# sourceMappingURL=BattleView.js.map