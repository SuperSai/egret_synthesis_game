/**
 * App初始化类 -- 管理各种单例类
 * @author weiqiang.huang
 */
class App {
	/** 请求服务器使用的用户标识 */
	public static ProxyUserFlag: string = "";
	/** 全局配置数据 */
	public static GlobalData: any = null;

	/** Http请求 */
	public static get Http(): Http {
		return Http.Instance();
	}
	/** Stage操作相关工具类 */
	public static get Stage(): StageUtils {
		return StageUtils.Instance();
	}
	/** 消息提示类 */
	public static get MessageMgr(): MessageMgr {
		return MessageMgr.Instance();
	}
	/** 层级管理类 */
	public static get LayerMgr(): LayerMgr {
		return LayerMgr.Instance();
	}
	/** 模块管理类 */
	public static get ControllerMgr(): ControllerMgr {
		return ControllerMgr.Instance();
	}
	/** 注册控制器管理类 */
	public static get RegisterMgr(): RegisterMgr {
		return RegisterMgr.Instance();
	}
	/** Socket管理类 */
	public static get SocketMgr(): SocketMgr {
		return SocketMgr.Instance();
	}
	/** 人物信息管理类 */
	public static get PlayerMgr(): PlayerMgr {
		return PlayerMgr.Instance();
	}
	/** 语言包管理类 */
	public static get LanguageMgr(): LanguageMgr {
		return LanguageMgr.Instance();
	}
	/** manager初始化类 */
	public static get GameEnterMgr(): GameEnterMgr {
		return GameEnterMgr.Instance();
	}
	/** Effect工具类 */
	public static get Effect(): EffectUtils {
		return EffectUtils.Instance();
	}
	/** 字符串工具类 */
	public static get StringU(): StringUtils {
		return StringUtils.Instance();
	}
	/** 声音管理类 */
	public static get Sound(): SoundMgr {
		return SoundMgr.Instance();
	}
	/** 通过工具类 */
	public static get Common(): CommonUtils {
		return CommonUtils.Instance();
	}
	/** 键盘操作工具类 */
	public static get Keyboard(): KeyboardUtils {
		return KeyboardUtils.Instance();
	}
	/** 设备工具类 */
	public static get Device(): DeviceUtils {
		return DeviceUtils.Instance();
	}
	/** 摇杆操作工具类 */
	public static get Rocker(): RockerUtils {
		return RockerUtils.Instance();
	}
	/** 数学计算工具类 */
	public static get MathUtils(): MathUtils {
		return MathUtils.Instance();
	}
	/** 统一的计时器和帧刷管理类 */
	public static get TimerMgr(): TimerMgr {
		return TimerMgr.Instance();
	}
	/** 调试工具 */
	public static get Debug(): DebugUtils {
		return DebugUtils.Instance();
	}
	/** 随机数工具类 */
	public static get Random(): RandomUtils {
		return RandomUtils.Instance();
	}
	/** 震动类 */
	public static get Shake(): ShakeUtils {
		return ShakeUtils.Instance();
	}
	/** 服务器返回的消息处理中心 */
	public static get MsgCenter(): MessageCenter {
		return MessageCenter.Instance(0);
	}
	/** 通用Loading动画 */
	public static get GameLoading(): GameLoading {
		return GameLoading.Instance();
	}
	/** 显示对象工具类 */
	public static get Display(): DisplayUtils {
		return DisplayUtils.Instance();
	}
	/** View管理类 */
	public static get View(): ViewMgr {
		return ViewMgr.Instance();
	}
	/** 渲染纹理管理类 */
	public static get RenderTexture(): RenderTextureMgr {
		return RenderTextureMgr.Instance();
	}
	/** 场景管理类 */
	public static get Scene(): SceneMgr {
		return SceneMgr.Instance();
	}
	/** 分帧处理类 */
	public static get DelayOpt(): DelayOptMgr {
		return DelayOptMgr.Instance();
	}
	/** 龙骨管理类 */
	public static get Bone(): BoneMgr {
		return BoneMgr.Instance();
	}
	/** StarlingSwf工厂类 */
	public static get StarlingSwfFactory(): StarlingSwfFactory {
		return StarlingSwfFactory.Instance();
	}
	/** 引擎扩展类 */
	public static get Expand(): ExpandUtils {
		return ExpandUtils.Instance();
	}
	/** 资源加载类 */
	public static get Res(): ResUtil {
		return ResUtil.Instance();
	}
	private static _notificationCenter: MessageCenter;
	/** 消息通知中心 */
	public static get NotificationCenter(): MessageCenter {
		if (App._notificationCenter == null) {
			App._notificationCenter = new MessageCenter(1);
		}
		return App._notificationCenter;
	}

	/** 初始化函数 */
	public static Init(): void {
		//全局配置数据
		App.GlobalData = RES.getRes("global");
		//开启调试
		App.Debug.isOpen(App.GlobalData.IsDebug);
		App.Debug.setThreshold(5);
		//扩展功能初始化
		App.Expand.init();
		//实例化Http请求
		// App.Http.initServer(App.GlobalData.HttpSerever);
	}
}