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
var GameEnterMgr = (function (_super) {
    __extends(GameEnterMgr, _super);
    function GameEnterMgr() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /** 初始化 */
    GameEnterMgr.prototype.init = function () {
        App.Bone.start();
        App.Player.setup();
    };
    return GameEnterMgr;
}(BaseClass));
__reflect(GameEnterMgr.prototype, "GameEnterMgr");
//# sourceMappingURL=GameEnterMgr.js.map