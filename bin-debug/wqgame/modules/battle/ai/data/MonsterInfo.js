var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MonsterInfo = (function () {
    function MonsterInfo() {
    }
    Object.defineProperty(MonsterInfo.prototype, "monsterVO", {
        /** Monster表数据 */
        get: function () {
            return this._monsterVO;
        },
        set: function (value) {
            this._monsterVO = value;
        },
        enumerable: true,
        configurable: true
    });
    return MonsterInfo;
}());
__reflect(MonsterInfo.prototype, "MonsterInfo");
//# sourceMappingURL=MonsterInfo.js.map