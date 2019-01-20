/**
 * 战斗场景
 */
class BattleScene extends BaseScene {
    /**
     * 构造函数
     */
	public constructor() {
		super();
	}

	/**
	  * 进入Scene调用
	  */
	public onEnter(...param: any[]): void {
		super.onEnter();
		App.ControllerMgr.applyFunc(ControllerConst.Battle, BattleConst.BATTLE_INIT);
	}

    /**
     * 退出Scene调用
     */
	public onExit(): void {
		super.onExit();
	}
}