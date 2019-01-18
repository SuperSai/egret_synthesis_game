var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 控制器注册管理类
 */
var RegisterMgr = (function (_super) {
    __extends(RegisterMgr, _super);
    function RegisterMgr() {
        return _super.call(this) || this;
    }
    /** 初始化场景 */
    RegisterMgr.prototype.initScene = function () {
        App.SceneMgr.register(SceneConsts.LOADING, new LoadingScene());
        App.SceneMgr.register(SceneConsts.LOGIN, new LoginScene());
        App.SceneMgr.register(SceneConsts.HALL, new HallScene());
        App.SceneMgr.register(SceneConsts.BATTLE, new BattleScene());
    };
    /**
     * 初始化所有模块控制器
     */
    RegisterMgr.prototype.initModules = function () {
        App.ControllerMgr.register(ControllerConst.Loading, new LoadingController());
        App.ControllerMgr.register(ControllerConst.Login, new LoginController());
        App.ControllerMgr.register(ControllerConst.Hall, new HallController());
        App.ControllerMgr.register(ControllerConst.Battle, new BattleController());
    };
    return RegisterMgr;
}(BaseClass));
__reflect(RegisterMgr.prototype, "RegisterMgr");
//# sourceMappingURL=RegisterMgr.js.map