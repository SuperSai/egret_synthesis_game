/**
 * 大厅主界面
 */
class HallView extends BaseEuiView {

	private currency: CurrencyCom;
	private btn_battle: eui.Button;
	private btn_menu: eui.Button;

	public constructor($controller: BaseController, $layer: number) {
		super($controller, $layer);
		this.skinName = SkinName.HallViewSkin;
		this.setResources(["hall"]);
	}

	/** 对面板进行显示初始化，用于子类继承 */
	public initUI(): void {
		super.initUI();
		let self = this;
		self.currency.initUI();
	}

	/** 对面板数据的初始化，用于子类继承 */
	public initData(): void {
		super.initData();
	}

	public addEvents(): void {
		super.addEvents();
		let self = this;
		self.btn_battle.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onEnterBattle, self);
		self.btn_menu.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onShowMenu, self);
		self.setBtnEffect(["btn_battle"]);
	}

	public removeEvents(): void {
		super.removeEvents();
		let self = this;
		self.btn_battle.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onEnterBattle, self);
		self.btn_menu.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onShowMenu, self);
	}

	/** 进入战斗 */
	private onEnterBattle(): void {
		App.Scene.clear();
		App.Scene.runScene(SceneConsts.BATTLE);
	}

	/** 显示功能菜单 */
	private onShowMenu(): void {

	}
}