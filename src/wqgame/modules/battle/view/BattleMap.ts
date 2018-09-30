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
	/** 每只怪的出现时间 */
	private _lastTime: number = 0;
	/** 当前选择中的角色 */
	private _selectRole: Role;
	// 选中的底座上角色的原始X坐标
	private _oX: number;
	// 选中的底座上角色的原始Y坐标
	private _oY: number;
	/** 是否界面初始化完毕 */
	private _initComplete: boolean = false;

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
		self._initComplete = true;
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
		let path: string = PathConfig.MapPath.replace("{0}", self._model.levelVO.icon + "");
		App.DisplayUtils.addAsyncBitmapToImage(path, self.mapImg);
	}

	public addEvents(): void {
		super.addEvents();
		let self = this;
		self.btn_open.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onOpenNewBase, self);
		self._battleController.registerFunc(BattleConst.CREATE_ROLE, self.onCreateRole, self);
		self._battleController.registerFunc(BattleConst.ROLE_ATTACK, self.onRoleAttack, self);
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

	/** 获取怪物行走路径的坐标点 */
	private onTestHandler(evt: egret.TouchEvent): void {
		Log.trace("坐标：" + evt.stageX + "," + evt.stageY);
	}

	/** 角色攻击 */
	private onRoleAttack(bulledId: number, x: number, y: number, target: Monster): void {
		let self = this;
		let bullet: Bullet = ObjectPool.pop(Bullet, "Bullet", self._battleController, LayerManager.GAME_MAP_LAYER);
		bullet.addToParent();
		bullet.setTarget(bulledId, x, y, target);
		bullet.rotation = App.MathUtils.getAngle(new egret.Point(x, y), target.point);
		self._model.bulletDic.Add(bullet.ID, bullet);
		let layer: DisplayLayer = App.LayerManager.getLayerByType(LayerManager.GAME_MAP_LAYER);
		layer.setChildIndex(bullet, layer.numChildren);
	}

	/** 开放新的底座 */
	private onOpenNewBase(): void {
		let self = this;
		self._model.levelVO.openBaseCount += self._model.hBaseItemCount;
		if (self._model.levelVO.openBaseCount >= self._model.levelVO.maxBaseCount) {
			self._model.levelVO.openBaseCount = self._model.levelVO.maxBaseCount;
			self.btn_open.visible = self.btn_open.touchEnabled = false;
			self.doNeedUpdateBaseItem();
			return;
		}
		self.btn_open.y -= ((self._model.levelVO.maxBaseCount - self._model.levelVO.openBaseCount) / self._model.hBaseItemCount * self._model.levelVO.baseH);
		self.doNeedUpdateBaseItem();
	}

	/** 创建角色 */
	private onCreateRole(roleId: number): void {
		let self = this;
		if (roleId < 0) return Log.traceError("角色ID错误：" + roleId);
		let len: number = self._model.roleDic.GetLenght();
		if (len >= (self._model.levelVO.openBaseCount + 1)) return App.MessageManger.showText(App.LanguageManager.getLanguageText("battle.txt.01"));
		while (len < (self._model.levelVO.openBaseCount + 1)) {
			//在可以放置的底座中随机一个
			let random: number = App.RandomUtils.randrange(self._model.levelVO.maxBaseCount - self._model.levelVO.openBaseCount, self._model.levelVO.maxBaseCount);
			let baseItem: BaseItem = self.lists.getChildAt(random) as BaseItem;
			if (!self._model.roleDic.ContainsKey(baseItem) && baseItem.state == BASE_STATE.OPEN) {
				self.updateHeroBase(roleId);
				self._battleController.pushRoleToMap(roleId, baseItem);
				break;
			}
		}
	}

	/** 更新所有底座数据 */
	private updateAllBaseItem(): void {
		let self = this;
		self._arrColl.replaceAll(self._model.allBaseState);
	}

	/** 处理需要更新的底座 */
	private doNeedUpdateBaseItem(): void {
		let self = this;
		let startI: number = self._model.levelVO.maxBaseCount - self._model.levelVO.openBaseCount;
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
		self._selectRole = self._model.roleDic.TryGetValue(evt.target);
		self._selectRole.isMove = true;
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
		self._selectRole.isMove = false;
		if (!(evt.target instanceof BaseItem) || !baseItem || baseItem.state == BASE_STATE.CLOSE || baseItem.hashCode == self._selectRole.baseItem.hashCode) {
			self._selectRole.x = self._oX;
			self._selectRole.y = self._oY;
			return;
		}
		if (baseItem.state == BASE_STATE.OPEN) {
			self.createRole(self._selectRole, baseItem, self._selectRole.roleId);
		} else if (baseItem.state == BASE_STATE.HAVE) {
			let role: Role = self._model.roleDic.TryGetValue(baseItem);
			let moveRole: Role = self._model.roleDic.TryGetValue(self._selectRole.baseItem);
			if (role.roleId == moveRole.roleId) {
				self._model.roleDic.Remove(moveRole.baseItem);
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
		self._model.roleDic.Remove(selectRole.baseItem);
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

	/** 更新怪物 -- 出怪 */
	public updateMonster(passTime: number): void {
		let self = this;
		if (!self._model) return;
		if (self._model.battleMonsterState == BATTLE_MONSTER_STATE.MONSTER) {	//生成普通小怪
			if (self._initComplete && self._model.currMonsterCount < self._model.maxMonsterCount && passTime > self._lastTime) {
				self._model.currMonsterCount++;
				self.createMonster();
				self._lastTime = passTime + self._model.levelVO.monsterDelay;
			}
			/** 当前波数的怪物已经全部出战完毕后就进入生成BOSS怪*/
			if (self._initComplete && self._model.currMonsterCount >= self._model.maxMonsterCount) {
				//波数+1
				self._model.currwaveNum++;
				//重新设置当前波数的怪物
				self._model.currMonsterCount = 0;
				self._model.maxMonsterCount = self._model.monsterWaveNumCount;
				self._battleController.applyFunc(BattleConst.MONSTER_WAVENUM_COMPLETE);
			}
		} else if (self._model.battleMonsterState == BATTLE_MONSTER_STATE.BOSS) {	//生成BOSS怪
			//TODO BOSS怪
		}
	}

	/** 创建怪物 */
	private createMonster(): void {
		let self = this;
		if (self._starMonsterTime <= egret.getTimer()) {
			let monster: Monster = ObjectPool.pop(Monster, "Monster", self._battleController, LayerManager.GAME_MAP_LAYER);
			monster.addToParent();
			let info: MonsterInfo = ObjectPool.pop(MonsterInfo, "MonsterInfo");
			//给怪一个行走路径
			info.path = self._model.levelVO.path;
			let num: number = App.RandomUtils.randrange(0, 3);
			info.monsterVO = GlobleVOData.getData(GlobleVOData.MonsterVO, num);
			monster.Parse(info);
			self._model.monsterDic.Add(monster.ID, monster);
		}
	}

	/** 创建Boss */
	private createBoss(): void {
		let self = this;
	}
}