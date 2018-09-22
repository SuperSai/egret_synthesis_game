/**
 * 战斗地图
 */
class BattleMap extends BaseEuiView {

	public pos_boss: eui.Image;

	private _model: BattleModel;

	public constructor($controller: BaseController, $layer: number) {
		super($controller, $layer);
		this.skinName = SkinName.BattleMapSkin;
	}

	/** 面板开启执行函数，用于子类继承 */
	public open(...param: any[]): void {
		super.open(param);
		let self = this;
		self._model = param[0];
		self.init();
		self.addEvents();
	}
	/** 初始化 */
	private init(): void {

	}

	public addEvents(): void {
		super.addEvents();
		let self = this;
	}

	public removeEvents(): void {
		super.removeEvents();
		let self = this;
	}
}