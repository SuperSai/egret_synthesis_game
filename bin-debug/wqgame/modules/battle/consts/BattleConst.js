var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BattleConst = (function () {
    function BattleConst() {
    }
    /** 战斗初始化 */
    BattleConst.BATTLE_INIT = 10000;
    /** 创建角色 */
    BattleConst.CREATE_ROLE = 10001;
    /** 怪物已经达到终点 */
    BattleConst.MONSTER_MOVE_END = 10002;
    return BattleConst;
}());
__reflect(BattleConst.prototype, "BattleConst");
//# sourceMappingURL=BattleConst.js.map