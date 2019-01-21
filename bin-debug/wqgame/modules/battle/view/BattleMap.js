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
 * 战斗地图
 */
var BattleMap = (function (_super) {
    __extends(BattleMap, _super);
    function BattleMap($controller, $layer) {
        var _this = _super.call(this, $controller, $layer) || this;
        /** 每只怪的出现时间 */
        _this._lastTime = 0;
        /** 获取怪物行走路径的坐标点 */
        _this._paths = "";
        _this.skinName = SkinName.BattleMapSkin;
        return _this;
    }
    /** 面板开启执行函数，用于子类继承 */
    BattleMap.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        var self = this;
        self._battleController = param[0];
        self._model = self._battleController.getModel();
        self.init();
        self.initMap();
        self.addEvents();
        self.updateAllBaseItem();
    };
    /** 初始化 */
    BattleMap.prototype.init = function () {
        var self = this;
        self._arrColl = new eui.ArrayCollection();
        self.lists.itemRenderer = BaseItem;
        self.lists.dataProvider = self._arrColl;
        self._starMonsterTime = egret.getTimer();
        self.heroBase.onAwake(self._battleController);
    };
    /** 初始化地图 */
    BattleMap.prototype.initMap = function () {
        var self = this;
        var path = PathConfig.MapPath.replace("{0}", self._model.levelVO.icon + "");
        App.Display.addAsyncBitmapToImage(path, self.mapImg);
    };
    BattleMap.prototype.addEvents = function () {
        _super.prototype.addEvents.call(this);
        var self = this;
        self.btn_open.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onOpenNewBase, self);
        self._battleController.registerFunc(BattleConst.CREATE_ROLE, self.onCreateRole, self);
        self._battleController.registerFunc(BattleConst.ROLE_ATTACK, self.onRoleAttack, self);
        self._battleController.registerFunc(BattleConst.MONSTER_DIE, self.onMonsterDie, self);
        App.Stage.getStage().addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.onTouchBegin, self);
        // App.StageUtils.getStage().addEventListener(egret.TouchEvent.TOUCH_TAP, self.onTestHandler, self);	//设置行走路径点
        self.setBtnEffect(["btn_open"]);
    };
    BattleMap.prototype.removeEvents = function () {
        _super.prototype.removeEvents.call(this);
        var self = this;
        self.btn_open.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onOpenNewBase, self);
        App.Stage.getStage().removeEventListener(egret.TouchEvent.TOUCH_BEGIN, self.onTouchBegin, self);
    };
    BattleMap.prototype.onTestHandler = function (evt) {
        this._paths += (evt.stageX + "," + evt.stageY + "#");
        Log.trace("坐标：" + this._paths);
    };
    /** 角色攻击 */
    BattleMap.prototype.onRoleAttack = function (bulledId, currPos, target) {
        var self = this;
        var bullet = ObjectPool.pop(Bullet, "Bullet", self._battleController, LayerMgr.GAME_MAP_LAYER);
        bullet.addToParent();
        bullet.setTarget(bulledId, currPos, target);
        bullet.rotation = App.MathUtils.getAngle(currPos, target.Point);
        self._model.bulletDic.Add(bullet.ID, bullet);
        var layer = App.LayerMgr.getLayerByType(LayerMgr.GAME_MAP_LAYER);
        layer.setChildIndex(bullet, layer.numChildren);
    };
    /** 开放新的底座 */
    BattleMap.prototype.onOpenNewBase = function () {
        var self = this;
        self._model.levelVO.openBaseCount += self._model.hBaseItemCount;
        if (self._model.levelVO.openBaseCount >= self._model.maxBaseCount) {
            self._model.levelVO.openBaseCount = self._model.maxBaseCount;
            self.btn_open.visible = self.btn_open.touchEnabled = false;
            self.doNeedUpdateBaseItem();
            return;
        }
        self.btn_open.y -= ((self._model.maxBaseCount - self._model.levelVO.openBaseCount) / self._model.hBaseItemCount * self._model.baseH);
        self.doNeedUpdateBaseItem();
    };
    /** 创建角色 */
    BattleMap.prototype.onCreateRole = function (roleId) {
        var self = this;
        if (roleId < 0)
            return Log.traceError("角色ID错误：" + roleId);
        var len = self._model.roleDic.GetLenght();
        if (len >= (self._model.levelVO.openBaseCount + 1))
            return App.MessageMgr.showText(App.LanguageMgr.getLanguageText("battle.txt.01"));
        while (len < (self._model.levelVO.openBaseCount + 1)) {
            //在可以放置的底座中随机一个
            var random = App.Random.randrange(self._model.maxBaseCount - self._model.levelVO.openBaseCount, self._model.maxBaseCount);
            var baseItem = self.lists.getChildAt(random);
            if (!self._model.roleDic.ContainsKey(baseItem) && baseItem.state == BASE_STATE.OPEN) {
                self.updateHeroBase(roleId);
                self._battleController.pushRoleToMap(roleId, baseItem);
                break;
            }
        }
    };
    /** 更新所有底座数据 */
    BattleMap.prototype.updateAllBaseItem = function () {
        var self = this;
        self._arrColl.replaceAll(self._model.allBaseState);
    };
    /** 处理需要更新的底座 */
    BattleMap.prototype.doNeedUpdateBaseItem = function () {
        var self = this;
        var startI = self._model.maxBaseCount - self._model.levelVO.openBaseCount;
        var len = startI + self._model.hBaseItemCount;
        for (var i = startI; i < len; i++) {
            self.lists.getChildAt(i).state = BASE_STATE.OPEN;
        }
    };
    BattleMap.prototype.onTouchBegin = function (evt) {
        var self = this;
        if (!evt.target || !(evt.target instanceof BaseItem))
            return;
        App.Stage.getStage().removeEventListener(egret.TouchEvent.TOUCH_BEGIN, self.onTouchBegin, self);
        App.Stage.getStage().addEventListener(egret.TouchEvent.TOUCH_MOVE, self.onTouchMove, self);
        App.Stage.getStage().once(egret.TouchEvent.TOUCH_END, self.onTouchEnd, self, true);
        self._selectRole = self._model.roleDic.TryGetValue(evt.target);
        self._selectRole.isDrop = true;
        self._oX = self._selectRole.x;
        self._oY = self._selectRole.y;
        self._selectRole.x = evt.stageX;
        self._selectRole.y = evt.stageY;
        //设置拿起来的角色层级一定是最高的
        var layer = App.LayerMgr.getLayerByType(LayerMgr.GAME_MAP_LAYER);
        layer.setChildIndex(self._selectRole, layer.numChildren);
    };
    BattleMap.prototype.onTouchMove = function (evt) {
        var self = this;
        self._selectRole.x = evt.stageX;
        self._selectRole.y = evt.stageY;
    };
    BattleMap.prototype.onTouchEnd = function (evt) {
        var self = this;
        App.Stage.getStage().removeEventListener(egret.TouchEvent.TOUCH_MOVE, self.onTouchMove, self);
        App.Stage.getStage().addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.onTouchBegin, self);
        var baseItem = evt.target;
        self._selectRole.isDrop = false;
        if (!(evt.target instanceof BaseItem) || !baseItem || baseItem.state == BASE_STATE.CLOSE || baseItem.hashCode == self._selectRole.baseItem.hashCode) {
            self._selectRole.x = self._oX;
            self._selectRole.y = self._oY;
            return;
        }
        if (baseItem.state == BASE_STATE.OPEN) {
            self.createRole(self._selectRole, baseItem, self._selectRole.roleId);
        }
        else if (baseItem.state == BASE_STATE.HAVE) {
            var role = self._model.roleDic.TryGetValue(baseItem);
            var moveRole = self._model.roleDic.TryGetValue(self._selectRole.baseItem);
            if (role.roleId == moveRole.roleId) {
                self._model.roleDic.Remove(moveRole.baseItem);
                moveRole.baseItem.state = BASE_STATE.OPEN;
                moveRole.reset();
                ObjectPool.push(moveRole);
                App.Display.removeFromParent(moveRole);
                self.createRole(role, baseItem, role.roleId + 1);
            }
            else {
                self.createRole(role, self._selectRole.baseItem, role.roleId);
                self.createRole(self._selectRole, baseItem, self._selectRole.roleId);
            }
        }
    };
    /** 创建普通角色 */
    BattleMap.prototype.createRole = function (selectRole, baseItem, roleId) {
        var self = this;
        self._model.roleDic.Remove(selectRole.baseItem);
        selectRole.reset();
        ObjectPool.push(selectRole);
        App.Display.removeFromParent(selectRole);
        self.updateHeroBase(roleId);
        self._battleController.pushRoleToMap(roleId, baseItem);
    };
    /** 更新英雄底座上的英雄角色 */
    BattleMap.prototype.updateHeroBase = function (roleId) {
        var self = this;
        if (roleId < self._model.maxRoleId)
            return;
        self._model.maxRoleId = roleId;
        self.heroBase.updateHeroStyle(self._model.maxRoleId);
    };
    /** 更新怪物 -- 出怪 */
    BattleMap.prototype.updateMonster = function (passTime) {
        var self = this;
        if (!self._model)
            return;
        if (self._model.currMonsterCount < self._model.maxMonsterCount && passTime > self._lastTime) {
            self._model.currMonsterCount++;
            if (self._model.battleMonsterState == BATTLE_MONSTER_STATE.MONSTER) {
                self.createSmallMonster(passTime);
            }
            else if (self._model.battleMonsterState == BATTLE_MONSTER_STATE.BOSS) {
                self.createBoss();
            }
            self._lastTime = passTime + self._model.levelVO.monsterDelay;
        }
        /** 当前波数的怪物已经全部出战完毕*/
        if (self._model.currMonsterCount >= self._model.maxMonsterCount) {
            if (self._model.battleMonsterState == BATTLE_MONSTER_STATE.BOSS) {
                //重新设置当前波数
                self._model.currwaveNum = 1;
                //进入下一个关卡
                self._model.currMission++;
                self._model.levelVO = GlobleVOData.getData(GlobleVOData.LevelVO, self._model.currMission);
            }
            else {
                self._model.currwaveNum++; //波数+1
            }
            self._model.maxMonsterCount = self._model.monsterWaveNumCount;
            self._model.battleMonsterState = BATTLE_MONSTER_STATE.PAUSE;
            self._lastTime += self._model.levelVO.waveNumDelay;
            //重新设置当前波数的怪物
            self._model.currMonsterCount = 0;
        }
    };
    /** 怪物死亡 */
    BattleMap.prototype.onMonsterDie = function () {
        var self = this;
        if (this._model.monsterDic.GetLenght() > 0)
            return;
        if (self._model.currwaveNum > self._model.levelVO.waveNum) {
            self._model.maxMonsterCount = 1;
            self._model.battleMonsterState = BATTLE_MONSTER_STATE.BOSS;
        }
        else {
            self._model.battleMonsterState = BATTLE_MONSTER_STATE.MONSTER;
        }
        self._battleController.applyFunc(BattleConst.MONSTER_WAVENUM_COMPLETE);
    };
    /** 创建小怪 */
    BattleMap.prototype.createSmallMonster = function (passTime) {
        var self = this;
        var num = App.Random.randrange(0, self._model.levelVO.monstersId.length);
        self._battleController.createMonster(self._model.levelVO.monstersId[num]);
    };
    /** 创建Boss */
    BattleMap.prototype.createBoss = function () {
        var self = this;
        self._battleController.createMonster(self._model.levelVO.bossId);
    };
    return BattleMap;
}(BaseEuiView));
__reflect(BattleMap.prototype, "BattleMap");
//# sourceMappingURL=BattleMap.js.map