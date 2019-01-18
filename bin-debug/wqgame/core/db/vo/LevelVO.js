var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 关卡表数据
 */
var LevelVO = (function () {
    function LevelVO() {
    }
    Object.defineProperty(LevelVO.prototype, "path", {
        /** 地图行走路径 */
        get: function () {
            return this._path;
        },
        set: function (value) {
            this._path = ObjectUtils.splitToString(value, "#");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LevelVO.prototype, "monsterNumRange", {
        /** 怪物数量范围 */
        get: function () {
            return this._monsterNumRange;
        },
        set: function (value) {
            this._monsterNumRange = ObjectUtils.splitToNumber(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LevelVO.prototype, "monstersId", {
        /** 出怪物ID */
        get: function () {
            return this._monstersId;
        },
        set: function (value) {
            this._monstersId = ObjectUtils.splitToNumber(value);
        },
        enumerable: true,
        configurable: true
    });
    return LevelVO;
}());
__reflect(LevelVO.prototype, "LevelVO");
//# sourceMappingURL=LevelVO.js.map