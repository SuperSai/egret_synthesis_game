class HallController extends BaseController {

	private _hall: HallView;
	private _hallModel: HallModel;
	private _hallProxy: HallProxy;

	public constructor() {
		super();
		let self = this;

		//View初始化
		self._hall = new HallView(self, LayerMgr.GAME_UI_LAYER);
		App.View.register(ViewConst.Hall, self._hall);

		self._hallModel = new HallModel(self);
		//代理 -- 负责接收协议和转发协议
		self._hallProxy = new HallProxy(self);

		//注册模块消息
		self.registerFunc(HallConst.HALL_INIT, self.onHallInit, self);
	}

	private onHallInit(param: any[]): void {
		let self = this;
		App.View.open(ViewConst.Hall,null, self._hallModel);
	}
}