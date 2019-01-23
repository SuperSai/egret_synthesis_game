/**
 * manager初始化类
 */
class GameEnterMgr extends BaseClass {

	/** 初始化 */
	public init(): void {
		App.Bone.start();
		App.Player.setup();
	}
}