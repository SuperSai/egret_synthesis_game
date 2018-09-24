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
		self.addEvents();
	}

    /**
     * 添加监听事件
     */
	public addEvents(): void {
		super.addEvents();

	}

    /**
     * 移除监听事件
     */
	public removeEvents(): void {
		super.removeEvents();
	}

}