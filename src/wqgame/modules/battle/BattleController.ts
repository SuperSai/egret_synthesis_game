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

		self._battleProxy = new BattleProxy(self);

		//注册模块消息
		self.registerFunc(BattleConst.BATTLE_INIT, self.onBattleInit, self);
	}

	private onBattleInit(param: any[]): void {
		let self = this;
		self._battleModel.levelVO = GlobleVOData.getData(GlobleVOData.LevelVO, param[0]);
		App.ViewManager.open(ViewConst.Battle, self._battleModel);
	}

	/** 获取所有底座的状态 */
	public getAllBaseState(): any[] {
		let self = this;
		let lists: any[] = [];
		for (let i: number = self._battleModel.maxBaseCount; i > 0; i--) {
			if (i > self._battleModel.openBaseCount) {
				lists.push(BASE_STATE.CLOSE);
			} else {
				lists.push(BASE_STATE.OPEN);
			}
		}
		return lists;
	}

	/** 添加角色在地图上 */
	public pushRoleToMap(roleId: number, baseItem: BaseItem): void {
		let self = this;
		let role: Role = ObjectPool.pop(Role, "Role", self, LayerManager.GAME_MAP_LAYER);
		role.addToParent();
		role.open(roleId);
		baseItem.state = BASE_STATE.HAVE;
		role.baseItem = baseItem;
		let pos: egret.Point = baseItem.localToGlobal();
		let roleX: number = pos.x + (baseItem.width / 2) - (role.roleImg.width / 2);
		let roleY: number = pos.y + 10;
		role.setPosition(roleX, roleY);
		self._battleModel.roleDic.Add(baseItem, role);
	}

}