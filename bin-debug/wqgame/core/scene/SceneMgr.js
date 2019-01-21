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
 * 场景管理类
 */
var SceneMgr = (function (_super) {
    __extends(SceneMgr, _super);
    /**
     * 构造函数
     */
    function SceneMgr() {
        var _this = _super.call(this) || this;
        _this._scenes = new TSDictionary();
        return _this;
    }
    /**
     * 清除当前场景
     */
    SceneMgr.prototype.clear = function () {
        var nowScene = this._scenes.TryGetValue(this._currScene);
        if (nowScene) {
            nowScene.onExit();
            this._currScene = undefined;
        }
        this._scenes.Remove(this._currScene);
    };
    /**
     * 注册Scene
     * @param key Scene唯一标识
     * @param scene Scene对象
     */
    SceneMgr.prototype.register = function (key, scene) {
        this._scenes.Add(key, scene);
    };
    /**
     * 切换场景
     * @param key 场景唯一标识
     * @param isClear 是否清除上一个场景
     */
    SceneMgr.prototype.runScene = function (key) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        var nowScene = this._scenes.TryGetValue(key);
        if (nowScene == null) {
            Log.trace("场景" + key + "不存在");
            return;
        }
        // var oldScene: BaseScene = this._scenes.TryGetValue(this._currScene);
        // if (oldScene) {
        // 	oldScene.onExit();
        // }
        nowScene.onEnter.apply(nowScene, param);
        this._currScene = key;
    };
    /**
     * 获取当前Scene
     * @returns {number}
     */
    SceneMgr.prototype.getCurrScene = function () {
        return this._currScene;
    };
    return SceneMgr;
}(BaseClass));
__reflect(SceneMgr.prototype, "SceneMgr");
