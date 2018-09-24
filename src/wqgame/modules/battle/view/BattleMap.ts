/**
 * 战斗地图
 */
class BattleMap extends BaseEuiView {

	public mapImg: eui.Image;
	public pos_boss: eui.Image;
	public lists: eui.List;	// 所有底座列表
	public heroBase: HeroBaseItem;	// 英雄底座
	public btn_open: eui.Group;	// 开放新底座

	private _arrColl: eui.ArrayCollection;
	private _model: BattleModel;
	private _battleController: BattleController;
	private _starMonsterTime: number;
	private _selectRole: Role;
	// 选中的底座上角色的原始X坐标
	private _oX: number;
	// 选中的底座上角色的原始Y坐标
	private _oY: number;

	public constructor($controller: BaseController, $layer: number) {
		super($controller, $layer);
		this.skinName = SkinName.BattleMapSkin;
	}

	/** 面板开启执行函数，用于子类继承 */
	public open(...param: any[]): void {
		super.open(param);
		let self = this;
		self._battleController = param[0];
		self._model = <BattleModel>self._battleController.getModel();
		self.init();
		self.initMap();
		self.addEvents();
		self.updateAllBaseItem();
	}
	/** 初始化 */
	private init(): void {
		let self = this;
		self._arrColl = new eui.ArrayCollection();
		self.lists.itemRenderer = BaseItem;
		self.lists.dataProvider = self._arrColl;
		self._starMonsterTime = egret.getTimer();
		self.heroBase.onAwake(self._battleController);
	}
	/** 初始化地图 */
	private initMap(): void {
		let self = this;
		let path: string = PathConfig.MapPath.replace("{0}", self._model.LevelVo.icon + "");
		App.DisplayUtils.addAsyncBitmapToImage(path, self.mapImg);
	}

	public addEvents(): void {
		super.addEvents();
		let self = this;
		self.btn_open.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onOpenNewBase, self);
		self._battleController.registerFunc(BattleConst.CREATE_ROLE, self.onCreateRole, self);
		App.StageUtils.getStage().addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.onTouchBegin, self);
		// App.StageUtils.getStage().addEventListener(egret.TouchEvent.TOUCH_TAP, self.onTestHandler, self);
		self.setBtnEffect(["btn_open"]);
	}

	public removeEvents(): void {
		super.removeEvents();
		let self = this;
		self.btn_open.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onOpenNewBase, self);
		App.StageUtils.getStage().removeEventListener(egret.TouchEvent.TOUCH_BEGIN, self.onTouchBegin, self);
	}

	private onTestHandler(evt: egret.TouchEvent): void {
		Log.trace("x:" + evt.stageX + " -- y:" + evt.stageY);
	}

	/** 开放新的底座 */
	private onOpenNewBase(): void {
		let self = this;
		self._model.openBaseCount += self._model.hBaseItemCount;
		if (self._model.openBaseCount >= self._model.maxBaseCount) {
			self._model.openBaseCount = self._model.maxBaseCount;
			self.btn_open.visible = self.btn_open.touchEnabled = false;
			self.doNeedUpdateBaseItem();
			return;
		}
		self.btn_open.y -= ((self._model.maxBaseCount - self._model.openBaseCount) / self._model.hBaseItemCount * self._model.baseH);
		self.doNeedUpdateBaseItem();
	}

	/** 创建角色 */
	private onCreateRole(roleId: number): void {
		let self = this;
		if (roleId < 0) return Log.traceError("角色ID错误：" + roleId);
		let len: number = self._model.RoleDic.GetLenght();
		if (len >= self._model.openBaseCount) return App.MessageManger.showText(App.LanguageManager.getLanguageText("battle.txt.01"));
		while (len < self._model.openBaseCount) {
			//在可以放置的底座中随机一个
			let random: number = App.RandomUtils.randrange(self._model.maxBaseCount - self._model.openBaseCount, self._model.maxBaseCount);
			let baseItem: BaseItem = self.lists.getChildAt(random) as BaseItem;
			if (!self._model.RoleDic.ContainsKey(baseItem) && baseItem.state == BASE_STATE.OPEN) {
				self.updateHeroBase(roleId);
				self._battleController.pushRoleToMap(roleId, baseItem);
				break;
			}
		}
	}

	/** 更新所有底座数据 */
	private updateAllBaseItem(): void {
		let self = this;
		self._arrColl.replaceAll(self._battleController.getAllBaseState());
	}

	/** 处理需要更新的底座 */
	private doNeedUpdateBaseItem(): void {
		let self = this;
		let startI: number = self._model.maxBaseCount - self._model.openBaseCount;
		let len: number = startI + self._model.hBaseItemCount;
		for (let i: number = startI; i < len; i++) {
			(self.lists.getChildAt(i) as BaseItem).state = BASE_STATE.OPEN;
		}
	}

	private onTouchBegin(evt: egret.TouchEvent): void {
		let self = this;
		if (!evt.target || !(evt.target instanceof BaseItem)) return;
		App.StageUtils.getStage().removeEventListener(egret.TouchEvent.TOUCH_BEGIN, self.onTouchBegin, self);
		App.StageUtils.getStage().addEventListener(egret.TouchEvent.TOUCH_MOVE, self.onTouchMove, self);
		App.StageUtils.getStage().once(egret.TouchEvent.TOUCH_END, self.onTouchEnd, self, true);
		self._selectRole = self._model.RoleDic.TryGetValue(evt.target);
		self._oX = self._selectRole.x;
		self._oY = self._selectRole.y;
		self._selectRole.x = evt.stageX;
		self._selectRole.y = evt.stageY;
		//设置拿起来的角色层级一定是最高的
		let layer: DisplayLayer = App.LayerManager.getLayerByType(LayerManager.GAME_MAP_LAYER);
		layer.setChildIndex(self._selectRole, layer.numChildren);
	}

	private onTouchMove(evt: egret.TouchEvent): void {
		let self = this;
		self._selectRole.x = evt.stageX;
		self._selectRole.y = evt.stageY;
	}

	private onTouchEnd(evt: egret.TouchEvent): void {
		let self = this;
		App.StageUtils.getStage().removeEventListener(egret.TouchEvent.TOUCH_MOVE, self.onTouchMove, self);
		App.StageUtils.getStage().addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.onTouchBegin, self);
		let baseItem: BaseItem = evt.target;
		if (!(evt.target instanceof BaseItem) || !baseItem || baseItem.state == BASE_STATE.CLOSE || baseItem.hashCode == self._selectRole.baseItem.hashCode) {
			self._selectRole.x = self._oX;
			self._selectRole.y = self._oY;
			return;
		}
		if (baseItem.state == BASE_STATE.OPEN) {
			self.createRole(self._selectRole, baseItem, self._selectRole.roleId);
		} else if (baseItem.state == BASE_STATE.HAVE) {
			let role: Role = self._model.RoleDic.TryGetValue(baseItem);
			let moveRole: Role = self._model.RoleDic.TryGetValue(self._selectRole.baseItem);
			if (role.roleId == moveRole.roleId) {
				self._model.RoleDic.Remove(moveRole.baseItem);
				moveRole.baseItem.state = BASE_STATE.OPEN;
				moveRole.reset();
				ObjectPool.push(moveRole);
				App.DisplayUtils.removeFromParent(moveRole);
				self.createRole(role, baseItem, role.roleId + 1);
			} else {
				self.createRole(role, self._selectRole.baseItem, role.roleId);
				self.createRole(self._selectRole, baseItem, self._selectRole.roleId);
			}
		}
	}

	/** 创建普通角色 */
	private createRole(selectRole: Role, baseItem: BaseItem, roleId: number): void {
		let self = this;
		self._model.RoleDic.Remove(selectRole.baseItem);
		selectRole.reset();
		ObjectPool.push(selectRole);
		App.DisplayUtils.removeFromParent(selectRole);
		self.updateHeroBase(roleId);
		self._battleController.pushRoleToMap(roleId, baseItem);
	}

	/** 更新英雄底座上的英雄角色 */
	private updateHeroBase(roleId: number): void {
		let self = this;
		if (roleId < self._model.maxRoleId) return;
		self._model.maxRoleId = roleId;
		self.heroBase.updateHeroStyle(self._model.maxRoleId);
	}
	private _lastTime: number = 0;

	public updateMonster(passTime: number): void {
		if (this.isInit && passTime > this._lastTime) {
			this.createMonster();
			this._lastTime = passTime + 1500;
		}
	}

	private createMonster(): void {
		if (this._starMonsterTime <= egret.getTimer()) {
			let monster: Monster = ObjectPool.pop(Monster, "Monster", this._battleController, LayerManager.GAME_MAP_LAYER);
			monster.addToParent();
			let info: MonsterInfo = ObjectPool.pop(MonsterInfo, "MonsterInfo");
			monster.Parse(info);
			this._model.MonsterDic.Add(monster.ID, monster);
		}
	}
}