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
}