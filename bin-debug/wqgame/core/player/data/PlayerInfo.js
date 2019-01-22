var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerInfo = (function () {
    function PlayerInfo() {
        /** 金币 */
        this.gold = 100000;
        /** 钻石 */
        this.diamond = 1000;
    }
    return PlayerInfo;
}());
__reflect(PlayerInfo.prototype, "PlayerInfo");
//# sourceMappingURL=PlayerInfo.js.map