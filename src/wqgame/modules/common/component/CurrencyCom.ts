/**
 * 货币组组件
 */
class CurrencyCom extends BaseEuiView {

	public btn_heartCount: eui.Label;
	public btn_goldCount: eui.Label;

	public constructor($controller: BaseController, $layer: number) {
		super($controller, $layer);
		this.skinName = SkinName.CurrencyComSkin;
	}

	/** 对面板进行显示初始化，用于子类继承 */
	public initUI(): void {
		super.initUI();
		let self = this;

	}

	/** 对面板数据的初始化，用于子类继承 */
	public initData(): void {
		super.initData();
	}

	/** 面板开启执行函数，用于子类继承 */
	public open(...param: any[]): void {
		super.open(param);
		let self = this;
	}

}