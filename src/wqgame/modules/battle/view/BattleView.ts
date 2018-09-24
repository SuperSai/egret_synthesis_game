/**
 * 战斗界面
 */
class BattleView extends BaseEuiView {

	public map: BattleMap;	// 地图
	public btn_buyRole: eui.Group;
	public btn_hall: eui.Button; // 返回大厅按钮
	public btn_buy: eui.Group;	// 购买角色按钮
	public txt_money: eui.Label; // 角色价格
	public txt_level: eui.Label; // 当前关卡数
	public currency: CurrencyCom; // 货币组件

	private _model: BattleModel;

	public constructor($controller: BaseController, $layer: number) {
		super($controller, $layer);
		let self = this;
		self.skinName = SkinName.BattleViewSkin;
		self.setResources(["battle_json", "roles_json"]);
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

	/** 面板开启执行函数，用于子类继承 */
	public open(...param: any[]): void {
		super.open(param);
		let self = this;
		self._model = <BattleModel>self.controller.getModel();
		//初始化地图数据
		self.map.open(self.controller);
	}

	public addEvents(): void {
		super.addEvents();
		let self = this;
		self.btn_hall.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onBackHallHandler, self);
		self.btn_buyRole.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onBuyRoleHandler, self);
		self.setBtnEffect(["btn_buyRole", "btn_hall"]);
	}

	public removeEvents(): void {
		super.removeEvents();
		let self = this;
		self.btn_hall.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onBackHallHandler, self);
		self.btn_buyRole.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onBuyRoleHandler, self);
	}

	/** 购买角色 */
	private onBuyRoleHandler(): void {
		let self = this;
		let roleId: number = App.RandomUtils.randrange(1, 3);
		self.applyFunc(BattleConst.CREATE_ROLE, roleId);
	}

	/** 返回大厅界面 */
	private onBackHallHandler(): void {
		App.SceneManager.runScene(SceneConsts.HALL);
	}
}