class BattleController extends BaseController {

	private _battleView: BattleView;
	private _battleModel: BattleModel;
	private _battleProxy: BattleProxy;

	public constructor() {
		super();
		let self = this;

		self._battleView = new BattleView(self, LayerManager.GAME_MAP_LAYER);
		App.ViewManager.register(ViewConst.Battle, self._battleView);

		self._battleModel = new BattleModel(self);
		self.setModel(self._battleModel);

		self._battleProxy = new BattleProxy(self);

		//注册模块消息
		self.registerFunc(BattleConst.BATTLE_INIT, self.onBattleInit, self);
	}

	private onBattleInit(param: any[]): void {
		let self = this;
		self._battleModel.battleMonsterState = BATTLE_MONSTER_STATE.PAUSE;
		self._battleModel.levelVO = GlobleVOData.getData(GlobleVOData.LevelVO, param[0]);
		self._battleModel.maxMonsterCount = self._battleModel.monsterWaveNumCount;
		App.ViewManager.open(ViewConst.Battle);
		App.TimerManager.doFrame(0, 0, self.onBattleUpdate, self);
		self.initRegisterView();
	}

	/** 更新战斗中的数据信息	比如：怪物的生产、移动等 */
	private onBattleUpdate(): void {
		//判断来控制是否继续生成怪物
		if (this._battleModel.battleMonsterState != BATTLE_MONSTER_STATE.PAUSE) {
			//生成怪物
			this._battleView.map.updateMonster(egret.getTimer());
		}
		//怪物移动
		if (this._battleModel.monsterDic.GetLenght() > 0) {
			let monsters: Monster[] = this._battleModel.monsterDic.getValues();
			for (let i: number = 0; i < monsters.length; i++) {
				monsters[i].onUpdate(egret.getTimer());
			}
		}
		//子弹移动
		if (this._battleModel.bulletDic.GetLenght() > 0) {
			let bullets: BaseBullet[] = this._battleModel.bulletDic.getValues();
			for (let i: number = 0; i < bullets.length; i++) {
				bullets[i].onUpdate();
			}
		}
		//角色攻击
		if (this._battleModel.monsterDic.GetLenght() > 0 && this._battleModel.roleDic.GetLenght() > 0) {
			let roles: BaseRole[] = this._battleModel.roleDic.getValues();
			for (let i: number = 0; i < roles.length; i++) {
				roles[i].onUpdate(egret.getTimer());
			}
		}
	}

	/** 添加角色在地图上 */
	public pushRoleToMap(roleId: number, baseItem: BaseItem): void {
		let self = this;
		let role: Role = ObjectPool.pop(Role, "Role", self, LayerManager.GAME_MAP_LAYER);
		role.addToParent();
		role.open(roleId);
		role.isMove = false;
		baseItem.state = BASE_STATE.HAVE;
		role.baseItem = baseItem;
		let pos: egret.Point = baseItem.localToGlobal();
		let roleX: number = pos.x + (baseItem.width / 2) - (role.roleImg.width / 2);
		let roleY: number = pos.y + 10;
		role.setPosition(roleX, roleY);
		self._battleModel.roleDic.Add(baseItem, role);
	}


	/** 注册界面才可以打开界面 */
	private initRegisterView(): void {
		let self = this;
		App.ViewManager.register(ViewConst.HeroMsgPanel, new HeroMsgPanel(self, LayerManager.GAME_UI_LAYER, SkinName.HeroMsgPanelSkin));
		App.ViewManager.register(ViewConst.HeroTalk, new HeroTalk(self, LayerManager.GAME_UI_LAYER, SkinName.HeroTalkSkin, VIEW_SHOW_TYPE.LEFT));
	}

}