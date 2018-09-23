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
 * manager初始化类
 */
var GameEnterManager = (function (_super) {
    __extends(GameEnterManager, _super);
    function GameEnterManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /** 初始化 */
    GameEnterManager.prototype.init = function () {
        App.BoneManager.start();
        App.PlayerInfoManager.setup();
    };
    return GameEnterManager;
}(BaseClass));
__reflect(GameEnterManager.prototype, "GameEnterManager");
//# sourceMappingURL=GameEnterManager.js.map