var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MonsterInfo = (function () {
    function MonsterInfo() {
        this.hp = 100;
        this.hpMax = 100;
        this.moveSpeed = 0.1;
        this.type = 1;
        this.path = ["368,1252", "370,981", "607,983", "588,232", "366,233", "368,110"];
    }
    return MonsterInfo;
}());
__reflect(MonsterInfo.prototype, "MonsterInfo");
//# sourceMappingURL=MonsterInfo.js.map