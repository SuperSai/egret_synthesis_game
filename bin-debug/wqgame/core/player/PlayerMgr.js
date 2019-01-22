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
 * 人物信息管理类
 */
var PlayerMgr = (function (_super) {
    __extends(PlayerMgr, _super);
    function PlayerMgr() {
        return _super.call(this) || this;
    }
    PlayerMgr.prototype.setup = function () {
        this._info = new PlayerInfo();
    };
    Object.defineProperty(PlayerMgr.prototype, "info", {
        get: function () { return this._info; },
        set: function (value) { this._info = value; },
        enumerable: true,
        configurable: true
    });
    return PlayerMgr;
}(BaseClass));
__reflect(PlayerMgr.prototype, "PlayerMgr");
var ITEM_TYPE;
(function (ITEM_TYPE) {
    /** 金币 */
    ITEM_TYPE[ITEM_TYPE["GOLD"] = 1] = "GOLD";
    /** 钻石 */
    ITEM_TYPE[ITEM_TYPE["DIAMOND"] = 2] = "DIAMOND";
})(ITEM_TYPE || (ITEM_TYPE = {}));
//# sourceMappingURL=PlayerMgr.js.map