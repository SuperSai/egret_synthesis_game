/**
 * 登陆场景层
 */
class LoginScene extends BaseScene {
    /**
     * 构造函数
     */
	public constructor() {
		super();
	}

    /**
     * 进入Scene调用
     */
	public onEnter(): void {
		super.onEnter();

		//初始打开Login页面
		App.View.open(ViewConst.Login);
	}

    /**
     * 退出Scene调用
     */
	public onExit(): void {
		super.onExit();
	}
}