/**
 * 货币组组件
 */
class CurrencyCom extends BaseEuiView {

	public goldGroup: eui.Group;
	public diamondGroup: eui.Group;
	private txt_gold: eui.Label;
	private txt_diamond: eui.Label;

	public constructor($controller: BaseController, $layer: number) {
		super($controller, $layer);
		this.skinName = SkinName.CurrencyComSkin;
	}

	/** 对面板进行显示初始化，用于子类继承 */
	public initUI(): void {
		super.initUI();
		this.txt_gold.text = App.Player.info.gold + "";
		this.txt_diamond.text = App.Player.info.diamond + "";
		this.removeEvents();
		this.addEvents();
	}

    /**
     * 添加监听事件
     */
	public addEvents(): void {
		super.addEvents();
		App.NotificationCenter.addListener(CommonEvent.UPDATE_CURRENCY, this.onUpdateView, this);
	}

    /**
     * 移除监听事件
     */
	public removeEvents(): void {
		super.removeEvents();
		App.NotificationCenter.removeListener(CommonEvent.UPDATE_CURRENCY, this.onUpdateView, this);
	}

	/**
	 * 更新货币
	 * @param isTotal true 表示price是总额 	false 表示price是扣费数
	 */
	private onUpdateView(price: number, type: number, isTotal: boolean = false): void {
		switch (type) {
			case ITEM_TYPE.GOLD:
				if (isTotal) {
					App.Player.info.gold = price;
					this.txt_gold.text = App.Player.info.gold + "";
				} else {
					App.Player.info.gold += price;
					this.txt_gold.text = App.Player.info.gold + "";
				}
				break;
			case ITEM_TYPE.DIAMOND:
				if (isTotal) {
					App.Player.info.diamond = price;
					this.txt_diamond.text = App.Player.info.diamond + "";
				} else {
					App.Player.info.diamond += price;
					this.txt_diamond.text = App.Player.info.diamond + "";
				}
				break;
		}
	}
}