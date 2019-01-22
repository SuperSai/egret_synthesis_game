var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BattleConst = (function () {
    function BattleConst() {
    }
    /** 战斗初始化 */
    BattleConst.BATTLE_INIT = 11000;
    /** 创建角色 */
    BattleConst.CREATE_ROLE = 11001;
    /** 怪物已经达到终点 */
    BattleConst.MONSTER_MOVE_END = 11002;
    /** 怪物死了 */
    BattleConst.MONSTER_DIE = 11003;
    /** 每波完成后派发 */
    BattleConst.MONSTER_WAVENUM_COMPLETE = 11004;
    /** 角色攻击 */
    BattleConst.ROLE_ATTACK = 11005;
    /** 更新购买英雄数据 */
    BattleConst.UPDATE_BUY_HERO = 11006;
    return BattleConst;
}());
__reflect(BattleConst.prototype, "BattleConst");
//# sourceMappingURL=BattleConst.js.map