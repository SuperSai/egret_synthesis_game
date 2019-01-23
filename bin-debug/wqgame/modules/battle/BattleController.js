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
        self._battleView = new BattleView(self, LayerMgr.GAME_MAP_LAYER);
        App.View.register(ViewConst.Battle, self._battleView);
        self._battleModel = new BattleModel(self);
        self.setModel(self._battleModel);
        self._battleProxy = new BattleProxy(self);
        //注册模块消息
        self.registerFunc(BattleConst.BATTLE_INIT, self.onBattleInit, self);
        return _this;
    }
    BattleController.prototype.onBattleInit = function () {
        var self = this;
        if (App.View.isShow(ViewConst.Battle))
            return;
        self._battleModel.battleMonsterState = BATTLE_MONSTER_STATE.PAUSE;
        self._battleModel.levelVO = GlobleData.getData(GlobleData.LevelVO, self._battleModel.currMission);
        self._battleModel.maxMonsterCount = self._battleModel.monsterWaveNumCount;
        self._battleModel.maxBaseCount = Number(GlobleData.getDataByFilter(GlobleData.ServerConfigVO, "id", "MAX_OPEN_COUNT")[0].value);
        App.View.open(ViewConst.Battle, function () {
            App.Timer.doFrame(0, 0, self.onBattleUpdate, self);
            self.initRegisterView();
            self._battleModel.battleMonsterState = BATTLE_MONSTER_STATE.MONSTER;
        });
    };
    /** 更新战斗中的数据信息	比如：怪物的生产、移动等 */
    BattleController.prototype.onBattleUpdate = function () {
        //判断来控制是否继续生成怪物
        if (this._battleModel.battleMonsterState != BATTLE_MONSTER_STATE.PAUSE) {
            //生成怪物
            this._battleView.map.updateMonster(egret.getTimer());
        }
        //怪物移动
        if (this._battleModel.monsterDic.GetLenght() > 0) {
            var monsters = this._battleModel.monsterDic.getValues();
            for (var i = 0; i < monsters.length; i++) {
                monsters[i].onUpdate(egret.getTimer());
            }
        }
        //子弹移动
        if (this._battleModel.bulletDic.GetLenght() > 0) {
            var bullets = this._battleModel.bulletDic.getValues();
            for (var i = 0; i < bullets.length; i++) {
                bullets[i].onUpdate();
            }
        }
        //角色攻击
        if (this._battleModel.monsterDic.GetLenght() > 0 && this._battleModel.roleDic.GetLenght() > 0) {
            var roles = this._battleModel.roleDic.getValues();
            for (var i = 0; i < roles.length; i++) {
                roles[i].onUpdate(egret.getTimer());
            }
        }
    };
    /** 添加角色在地图上 */
    BattleController.prototype.pushRoleToMap = function (roleId, baseItem) {
        var self = this;
        var role = ObjectPool.pop(Role, "Role", self, LayerMgr.GAME_MAP_LAYER);
        role.isGuard = false;
        role.addToParent();
        role.open(roleId);
        role.isDrop = false;
        baseItem.state = BASE_STATE.HAVE;
        role.baseItem = baseItem;
        role.baseItem.setLevel(roleId + 1);
        var pos = baseItem.localToGlobal();
        var roleX = pos.x + (baseItem.width / 2) - (role.roleImg.width / 2);
        var roleY = pos.y + 10;
        role.setPosition(roleX, roleY);
        self._battleModel.roleDic.Add(baseItem, role);
    };
    /** 创建怪物 */
    BattleController.prototype.createMonster = function (monsterId) {
        var self = this;
        var monster = ObjectPool.pop(Monster, "Monster", self, LayerMgr.GAME_MAP_LAYER);
        monster.addToParent();
        var info = ObjectPool.pop(MonsterInfo, "MonsterInfo");
        //给怪一个行走路径
        info.path = self._battleModel.levelVO.path;
        info.monsterVO = GlobleData.getData(GlobleData.MonsterVO, monsterId);
        monster.Parse(info);
        self._battleModel.monsterDic.Add(monster.MonsterId, monster);
    };
    /** 获取购买英雄的价格 */
    BattleController.prototype.getHeroBuyGold = function (heroId) {
        var heroVO = GlobleData.getData(GlobleData.HeroVO, heroId);
        if (heroVO)
            return heroVO.gold;
        return -1;
    };
    /** 查找一样的英雄 */
    BattleController.prototype.findSameHero = function (heroId) {
        if (heroId === void 0) { heroId = -1; }
        var len = this._battleModel.roleDic.GetLenght();
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                var role = this._battleModel.roleDic.getValueByIndex(i);
                if (role && !role.isGuard) {
                    if (heroId != -1 && role.heroVO.heroId != heroId) {
                        role.alpha = 0.3;
                    }
                    else {
                        role.alpha = 1;
                    }
                }
            }
        }
    };
    /** 注册界面才可以打开界面 */
    BattleController.prototype.initRegisterView = function () {
        var self = this;
        App.View.register(ViewConst.HeroMsgPanel, new HeroMsgPanel(self, LayerMgr.GAME_UI_LAYER, SkinName.HeroMsgPanelSkin));
    };
    return BattleController;
}(BaseController));
__reflect(BattleController.prototype, "BattleController");
//# sourceMappingURL=BattleController.js.map