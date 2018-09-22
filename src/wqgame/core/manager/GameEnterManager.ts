/**
 * manager初始化类
 */
class GameEnterManager extends BaseClass {

	/** 初始化 */
	public init(): void {
		App.BoneManager.start();
		App.PlayerInfoManager.setup();
	}
}