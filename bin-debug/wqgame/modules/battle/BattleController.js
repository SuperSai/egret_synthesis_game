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
var BattleController = (function (_super) {
    __extends(BattleController, _super);
    function BattleController() {
        var _this = _super.call(this) || this;
        var self = _this;
        self._battleView = new BattleView(self, LayerManager.GAME_MAP_LAYER);
        App.ViewManager.register(ViewConst.Battle, self._battleView);
        self._battleModel = new BattleModel(self);
        self.setModel(self._battleModel);
        self._battleProxy = new BattleProxy(self);
        //注册模块消息
        self.registerFunc(BattleConst.BATTLE_INIT, self.onBattleInit, self);
        return _this;
    }
    BattleController.prototype.onBattleInit = function (param) {
        var self = this;
        self._battleModel.LevelVo = GlobleVOData.getData(GlobleVOData.LevelVO, param[0]);
        App.ViewManager.open(ViewConst.Battle);
        App.TimerManager.doFrame(0, 0, self.onBattleUpdate, self);
    };
    /** 更新战斗中的数据信息	比如：怪物的生产、移动等 */
    BattleController.prototype.onBattleUpdate = function () {
        //生成怪物
        this._battleView.map.updateMonster(egret.getTimer());
        //怪物移动
        if (this._battleModel.MonsterDic.GetLenght() > 0) {
            var monsters = this._battleModel.MonsterDic.getValues();
            for (var i = 0; i < monsters.length; i++) {
                monsters[i].update(egret.getTimer());
            }
        }
    };
    /** 获取所有底座的状态 */
    BattleController.prototype.getAllBaseState = function () {
        var self = this;
        var lists = [];
        for (var i = self._battleModel.maxBaseCount; i > 0; i--) {
            if (i > self._battleModel.openBaseCount) {
                lists.push(BASE_STATE.CLOSE);
            }
            else {
                lists.push(BASE_STATE.OPEN);
            }
        }
        return lists;
    };
    /** 添加角色在地图上 */
    BattleController.prototype.pushRoleToMap = function (roleId, baseItem) {
        var self = this;
        var role = ObjectPool.pop(Role, "Role", self, LayerManager.GAME_MAP_LAYER);
        role.addToParent();
        role.open(roleId);
        baseItem.state = BASE_STATE.HAVE;
        role.baseItem = baseItem;
        var pos = baseItem.localToGlobal();
        var roleX = pos.x + (baseItem.width / 2) - (role.roleImg.width / 2);
        var roleY = pos.y + 10;
        role.setPosition(roleX, roleY);
        self._battleModel.RoleDic.Add(baseItem, role);
    };
    return BattleController;
}(BaseController));
__reflect(BattleController.prototype, "BattleController");
//# sourceMappingURL=BattleController.js.map