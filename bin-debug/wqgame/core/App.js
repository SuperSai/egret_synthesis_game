var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * App初始化类 -- 管理各种单例类
 * @author weiqiang.huang
 */
var App = (function () {
    function App() {
    }
    Object.defineProperty(App, "Http", {
        /** Http请求 */
        get: function () {
            return Http.Instance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "Stage", {
        /** Stage操作相关工具类 */
        get: function () {
            return StageUtils.Instance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "MessageMgr", {
        /** 消息提示类 */
        get: function () {
            return MessageMgr.Instance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "LayerMgr", {
        /** 层级管理类 */
        get: function () {
            return LayerMgr.Instance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "ControllerMgr", {
        /** 模块管理类 */
        get: function () {
            return ControllerMgr.Instance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "RegisterMgr", {
        /** 注册控制器管理类 */
        get: function () {
            return RegisterMgr.Instance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "SocketMgr", {
        /** Socket管理类 */
        get: function () {
            return SocketMgr.Instance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "PlayerMgr", {
        /** 人物信息管理类 */
        get: function () {
            return PlayerMgr.Instance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "LanguageMgr", {
        /** 语言包管理类 */
        get: function () {
            return LanguageMgr.Instance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "GameEnterMgr", {
        /** manager初始化类 */
        get: function () {
            return GameEnterMgr.Instance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "Effect", {
        /** Effect工具类 */
        get: function () {
            return EffectUtils.Instance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "StringU", {
        /** 字符串工具类 */
        get: function () {
            return StringUtils.Instance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "Sound", {
        /** 声音管理类 */
        get: function () {
            return SoundMgr.Instance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "Common", {
        /** 通过工具类 */
        get: function () {
            return CommonUtils.Instance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "Keyboard", {
        /** 键盘操作工具类 */
        get: function () {
            return KeyboardUtils.Instance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "Device", {
        /** 设备工具类 */
        get: function () {
            return DeviceUtils.Instance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "Rocker", {
        /** 摇杆操作工具类 */
        get: function () {
            return RockerUtils.Instance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "MathUtils", {
        /** 数学计算工具类 */
        get: function () {
            return MathUtils.Instance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "TimerMgr", {
        /** 统一的计时器和帧刷管理类 */
        get: function () {
            return TimerMgr.Instance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "Debug", {
        /** 调试工具 */
        get: function () {
            return DebugUtils.Instance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "Random", {
        /** 随机数工具类 */
        get: function () {
            return RandomUtils.Instance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "Shake", {
        /** 震动类 */
        get: function () {
            return ShakeUtils.Instance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "MsgCenter", {
        /** 服务器返回的消息处理中心 */
        get: function () {
            return MessageCenter.Instance(0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "GameLoading", {
        /** 通用Loading动画 */
        get: function () {
            return GameLoading.Instance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "Display", {
        /** 显示对象工具类 */
        get: function () {
            return DisplayUtils.Instance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "View", {
        /** View管理类 */
        get: function () {
            return ViewMgr.Instance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "RenderTexture", {
        /** 渲染纹理管理类 */
        get: function () {
            return RenderTextureMgr.Instance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "Scene", {
        /** 场景管理类 */
        get: function () {
            return SceneMgr.Instance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "DelayOpt", {
        /** 分帧处理类 */
        get: function () {
            return DelayOptMgr.Instance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "Bone", {
        /** 龙骨管理类 */
        get: function () {
            return BoneMgr.Instance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "StarlingSwfFactory", {
        /** StarlingSwf工厂类 */
        get: function () {
            return StarlingSwfFactory.Instance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "Expand", {
        /** 引擎扩展类 */
        get: function () {
            return ExpandUtils.Instance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "Res", {
        /** 资源加载类 */
        get: function () {
            return ResUtil.Instance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "NotificationCenter", {
        /** 消息通知中心 */
        get: function () {
            if (App._notificationCenter == null) {
                App._notificationCenter = new MessageCenter(1);
            }
            return App._notificationCenter;
        },
        enumerable: true,
        configurable: true
    });
    /** 初始化函数 */
    App.Init = function () {
        //全局配置数据
        App.GlobalData = RES.getRes("global");
        //开启调试
        App.Debug.isOpen(App.GlobalData.IsDebug);
        App.Debug.setThreshold(5);
        //扩展功能初始化
        App.Expand.init();
        //实例化Http请求
        // App.Http.initServer(App.GlobalData.HttpSerever);
    };
    /** 请求服务器使用的用户标识 */
    App.ProxyUserFlag = "";
    /** 全局配置数据 */
    App.GlobalData = null;
    return App;
}());
__reflect(App.prototype, "App");
//# sourceMappingURL=App.js.map