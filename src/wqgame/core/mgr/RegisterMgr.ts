/** 
 * 控制器注册管理类
 */
class RegisterMgr extends BaseClass {
	public constructor() {
		super();
	}

	/** 初始化场景 */
	public initScene(): void {
		App.SceneMgr.register(SceneConsts.LOADING, new LoadingScene());
		App.SceneMgr.register(SceneConsts.LOGIN, new LoginScene());
		App.SceneMgr.register(SceneConsts.HALL, new HallScene());
		App.SceneMgr.register(SceneConsts.BATTLE, new BattleScene());
	}

	/** 
	 * 初始化所有模块控制器
	 */
	public initModules(): void {
		App.ControllerMgr.register(ControllerConst.Loading, new LoadingController());
		App.ControllerMgr.register(ControllerConst.Login, new LoginController());
		App.ControllerMgr.register(ControllerConst.Hall, new HallController());
		App.ControllerMgr.register(ControllerConst.Battle, new BattleController());
	}
}
