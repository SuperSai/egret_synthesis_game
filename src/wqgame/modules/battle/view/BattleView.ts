/**
 * 战斗界面
 */
class BattleView extends BaseEuiView {

	public map: BattleMap;	// 地图
	public btn_buyRole: eui.Group; // 购买角色按钮
	public btn_hall: eui.Button; // 返回大厅按钮
	public txt_money: eui.Label; // 角色价格
	public txt_level: eui.Label; // 当前关卡数
	public currency: CurrencyCom; // 货币组件
	private _buyHeroId: number;
	private _buyHeroGold: number;

	private _model: BattleModel;

	public constructor($controller: BaseController, $layer: number) {
		super($controller, $layer);
		let self = this;
		self.skinName = SkinName.BattleViewSkin;
		self.setResources(["battle", "role", "bullet"]);
	}

	/** 对面板进行显示初始化，用于子类继承 */
	public initUI(): void {
		super.initUI();
		let self = this;
		self.currency.initUI();
	}

	/** 对面板数据的初始化，用于子类继承 */
	public initData(): void {
		super.initData();
		this.refreshBuyHeroBtn();
	}

	/** 面板开启执行函数，用于子类继承 */
	public open(...param: any[]): void {
		super.open(param);
		let self = this;
		self._model = <BattleModel>self.controller.getModel();
		//初始化地图数据
		self.map.open(self.controller);
		self.onUpdateView();
		App.Sound.playBg("10005");
	}

	public addEvents(): void {
		super.addEvents();
		let self = this;
		self.btn_hall.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onBackHallHandler, self);
		self.btn_buyRole.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onBuyRoleHandler, self);
		self.setBtnEffect(["btn_buyRole", "btn_hall"]);
		self.controller.registerFunc(BattleConst.MONSTER_WAVENUM_COMPLETE, self.onUpdateView, self);
		self.controller.registerFunc(BattleConst.UPDATE_BUY_HERO, self.onUpdateBuyHeroView, self);
		self.controller.registerFunc(BattleConst.MONSTER_DROP_GOODS, self.onMonsterDropGoods, self);
	}

	public removeEvents(): void {
		super.removeEvents();
		let self = this;
		self.btn_hall.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onBackHallHandler, self);
		self.btn_buyRole.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onBuyRoleHandler, self);
	}

	/** 每波怪完成后的处理 */
	private onUpdateView(): void {
		let self = this;
		if (self._model.battleMonsterState == BATTLE_MONSTER_STATE.BOSS) {
			self.txt_level.text = App.LanguageMgr.getLanguageText("battle.txt.03");
		} else {
			self.txt_level.text = App.LanguageMgr.getLanguageText("battle.txt.02", self._model.levelVO.missionId, self._model.currwaveNum);
		}
	}

	/** 购买角色 */
	private onBuyRoleHandler(): void {
		let self = this;
		if (App.PlayerMgr.info.gold < this._buyHeroGold || this._buyHeroGold == -1) {
			App.MessageMgr.showText(App.LanguageMgr.getLanguageText("label.01"));
			return;
		}
		self.applyFunc(BattleConst.CREATE_ROLE, self._buyHeroId);
	}

	private onUpdateBuyHeroView(): void {
		App.NotificationCenter.dispatch(CommonEvent.UPDATE_CURRENCY, -this._buyHeroGold, ITEM_TYPE.GOLD);
		this.refreshBuyHeroBtn();
	}

	/** 刷新英雄购买按钮 */
	private refreshBuyHeroBtn(): void {
		this._buyHeroId = App.Random.randrange(0, 3);
		this._buyHeroGold = (this.controller as BattleController).getHeroBuyGold(this._buyHeroId);
		this.txt_money.text = this._buyHeroGold + "";
	}

	/** 怪物掉落物品 */
	private onMonsterDropGoods(pos: egret.Point): void {
		let dropItem: DropItem = ObjectPool.pop(DropItem, "DropItem", null, LayerMgr.GAME_MAP_LAYER);
		let dropType: number = Math.random() > 0.5 ? ITEM_TYPE.GOLD : ITEM_TYPE.DIAMOND;
		dropItem.initItem(dropType, pos);
		dropItem.addToParent();
		dropItem.parent.setChildIndex(dropItem, 1);
		dropItem.callBack = () => {
			let target: eui.Group = this.getCurrencyTarget(dropType);
			App.Effect.doGoodsFlyEffect(dropItem, pos, target.localToGlobal(), () => {
				dropItem.removeSelf();
				eval(App.Effect.doMacIconShake("target"));
			}, 500);
		}
	}

	private getCurrencyTarget(type: number): eui.Group {
		switch (type) {
			case ITEM_TYPE.GOLD:
				return this.currency.goldGroup;
			case ITEM_TYPE.DIAMOND:
				return this.currency.diamondGroup;
		}
	}

	/** 返回大厅界面 */
	private onBackHallHandler(): void {
		App.Scene.runScene(SceneConsts.HALL);
	}
}