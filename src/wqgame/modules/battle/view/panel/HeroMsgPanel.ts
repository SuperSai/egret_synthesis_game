/**
 * 英雄信息面板
 */
class HeroMsgPanel extends BaseEuiAlert {

	public txt_title: eui.Label;

	private _model: BattleModel;
	private _heroRole: Role;

	public constructor($controller: BaseController, $layer: number, $skinName: string) {
		super($controller, $layer, $skinName);
	}

	/** 初始化界面 */
	public initUI(): void {
		super.initUI();
		let self = this;
	}

	/** 初始化数据 */
	public initData(): void {
		let self = this;
		self.txt_title.text = self._heroRole.heroVO.name;
	}

	public open(...param: any[]): void {
		super.open(param);
		let self = this;
		self._heroRole = param[0];
		self._model = <BattleModel>self.controller.getModel();
	}

	public addEvents(): void {
		super.addEvents();
		let self = this;
		self.setBtnEffect(["btn_close"]);
	}

	public removeEvents(): void {
		super.removeEvents();
		let self = this;

	}
}