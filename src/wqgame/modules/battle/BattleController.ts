class BattleController extends BaseController {

	private _battleView: BattleView;
	private _battleModel: BattleModel;
	private _battleProxy: BattleProxy;

	public constructor() {
		super();
		let self = this;

		self._battleView = new BattleView(self, LayerMgr.GAME_MAP_LAYER);
		App.View.register(ViewConst.Battle, self._battleView);

		self._battleModel = new BattleModel(self);
		self.setModel(self._battleModel);

		self._battleProxy = new BattleProxy(self);

		//注册模块消息
		self.registerFunc(BattleConst.BATTLE_INIT, self.onBattleInit, self);
	}

	private onBattleInit(): void {
		let self = this;
		self._battleModel.battleMonsterState = BATTLE_MONSTER_STATE.PAUSE;
		self._battleModel.levelVO = GlobleData.getData(GlobleData.LevelVO, self._battleModel.currMission);
		self._battleModel.maxMonsterCount = self._battleModel.monsterWaveNumCount;
		self._battleModel.maxBaseCount = Number(GlobleData.getDataByFilter(GlobleData.ServerConfigVO, "id", "MAX_OPEN_COUNT")[0].value);
		App.View.open(ViewConst.Battle, () => {
			App.TimerMgr.doFrame(0, 0, self.onBattleUpdate, self);
			self.initRegisterView();
			self._battleModel.battleMonsterState = BATTLE_MONSTER_STATE.MONSTER;
		});
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
		let role: Role = ObjectPool.pop(Role, "Role", self, LayerMgr.GAME_MAP_LAYER);
		role.isGuard = false;
		role.addToParent();
		role.open(roleId);
		role.isDrop = false;
		baseItem.state = BASE_STATE.HAVE;
		role.baseItem = baseItem;
		role.baseItem.setLevel(roleId + 1);
		let pos: egret.Point = baseItem.localToGlobal();
		let roleX: number = pos.x + (baseItem.width / 2) - (role.roleImg.width / 2);
		let roleY: number = pos.y + 10;
		role.setPosition(roleX, roleY);
		self._battleModel.roleDic.Add(baseItem, role);
	}

	/** 创建怪物 */
	public createMonster(monsterId: number): void {
		let self = this;
		let monster: Monster = ObjectPool.pop(Monster, "Monster", self, LayerMgr.GAME_MAP_LAYER);
		monster.addToParent();
		let info: MonsterInfo = ObjectPool.pop(MonsterInfo, "MonsterInfo");
		//给怪一个行走路径
		info.path = self._battleModel.levelVO.path;
		info.monsterVO = GlobleData.getData(GlobleData.MonsterVO, monsterId);
		monster.Parse(info);
		self._battleModel.monsterDic.Add(monster.MonsterId, monster);
	}

	/** 获取购买英雄的价格 */
	public getHeroBuyGold(heroId: number): number {
		let heroVO: HeroVO = GlobleData.getData(GlobleData.HeroVO, heroId);
		if (heroVO) return heroVO.gold;
		return -1;
	}

	/** 查找一样的英雄 */
	public findSameHero(heroId: number = -1): void {
		let len: number = this._battleModel.roleDic.GetLenght();
		if (len > 0) {
			for (let i: number = 0; i < len; i++) {
				let role: Role = this._battleModel.roleDic.getValueByIndex(i);
				if (role && !role.isGuard) {
					if (heroId != -1 && role.heroVO.heroId != heroId) {
						role.alpha = 0.3;
					} else {
						role.alpha = 1;
					}
				}
			}
		}
	}

	/** 注册界面才可以打开界面 */
	private initRegisterView(): void {
		let self = this;
		App.View.register(ViewConst.HeroMsgPanel, new HeroMsgPanel(self, LayerMgr.GAME_UI_LAYER, SkinName.HeroMsgPanelSkin));
	}

}