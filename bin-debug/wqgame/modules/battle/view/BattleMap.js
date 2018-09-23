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
        self._model = param[0];
        self._battleController = param[1];
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
    };
    /** 初始化地图 */
    BattleMap.prototype.initMap = function () {
        var self = this;
        var path = PathConfig.MapPath.replace("{0}", self._model.levelVO.icon + "");
        App.DisplayUtils.addAsyncBitmapToImage(path, self.mapImg);
    };
    BattleMap.prototype.addEvents = function () {
        _super.prototype.addEvents.call(this);
        var self = this;
        self.lists.addEventListener(eui.ItemTapEvent.ITEM_TAP, self.onItemTapHandler, self);
        self._battleController.registerFunc(BattleConst.CREATE_ROLE, self.onCreateRole, self);
        App.StageUtils.getStage().addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.onTouchBegin, self);
    };
    BattleMap.prototype.removeEvents = function () {
        _super.prototype.removeEvents.call(this);
        var self = this;
        self.lists.removeEventListener(eui.ItemTapEvent.ITEM_TAP, self.onItemTapHandler, self);
    };
    /** 创建角色 */
    BattleMap.prototype.onCreateRole = function (roleId) {
        var self = this;
        if (roleId < 0)
            return Log.traceError("角色ID错误：" + roleId);
        var len = self._model.roleDic.GetLenght();
        if (len >= self._model.openBaseCount)
            return App.MessageManger.showText(App.LanguageManager.getLanguageText("battle.txt.01"));
        while (len < self._model.openBaseCount) {
            //在可以放置的底座中随机一个
            var random = App.RandomUtils.randrange(self._model.maxBaseCount - self._model.openBaseCount, self._model.maxBaseCount);
            var baseItem = self.lists.getChildAt(random);
            if (!self._model.roleDic.ContainsKey(baseItem) && baseItem.state == BASE_STATE.OPEN) {
                self._battleController.pushRoleToMap(roleId, baseItem);
                break;
            }
        }
    };
    /** 更新所有底座数据 */
    BattleMap.prototype.updateAllBaseItem = function () {
        var self = this;
        self._arrColl.replaceAll(self._battleController.getAllBaseState());
    };
    /** 更新单个底座数据 */
    BattleMap.prototype.updateSingleBaseItem = function () {
        var self = this;
    };
    /** 点击单个底座处理 */
    BattleMap.prototype.onItemTapHandler = function (itemTap) {
        var self = this;
        if (!itemTap)
            return;
        //当前点击的底座
        var baseItem = itemTap.itemRenderer;
        //不存在字典中，说明当前点击的底座上没有角色的存在
        if (!self._model.roleDic.ContainsKey(baseItem))
            return;
        self._selectRole = self._model.roleDic.TryGetValue(baseItem);
        if (!self._selectRole)
            return Log.traceError("onItemTapHandler -- role在字典中获取错误，baseItemIndex:" + baseItem.itemIndex);
    };
    BattleMap.prototype.onTouchBegin = function (evt) {
        var self = this;
        if (!evt.target || !(evt.target instanceof BaseItem))
            return;
        App.StageUtils.getStage().removeEventListener(egret.TouchEvent.TOUCH_BEGIN, self.onTouchBegin, self);
        App.StageUtils.getStage().addEventListener(egret.TouchEvent.TOUCH_MOVE, self.onTouchMove, self);
        App.StageUtils.getStage().once(egret.TouchEvent.TOUCH_END, self.onTouchEnd, self, true);
        self._selectRole = self._model.roleDic.TryGetValue(evt.target);
        self._oX = self._selectRole.x;
        self._oY = self._selectRole.y;
        self._selectRole.x = evt.stageX;
        self._selectRole.y = evt.stageY;
        var layer = App.LayerManager.getLayerByType(LayerManager.GAME_MAP_LAYER);
        layer.setChildIndex(self._selectRole, layer.numChildren);
    };
    BattleMap.prototype.onTouchMove = function (evt) {
        var self = this;
        self._selectRole.x = evt.stageX;
        self._selectRole.y = evt.stageY;
    };
    BattleMap.prototype.onTouchEnd = function (evt) {
        var self = this;
        App.StageUtils.getStage().removeEventListener(egret.TouchEvent.TOUCH_MOVE, self.onTouchMove, self);
        App.StageUtils.getStage().addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.onTouchBegin, self);
        var baseItem = evt.target;
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
                App.DisplayUtils.removeFromParent(moveRole);
                self.createRole(role, baseItem, role.roleId + 1);
            }
            else {
                self.createRole(role, self._selectRole.baseItem, role.roleId);
                self.createRole(self._selectRole, baseItem, self._selectRole.roleId);
            }
        }
    };
    BattleMap.prototype.createRole = function (selectRole, baseItem, roleId) {
        var self = this;
        self._model.roleDic.Remove(selectRole.baseItem);
        selectRole.reset();
        ObjectPool.push(selectRole);
        App.DisplayUtils.removeFromParent(selectRole);
        self._battleController.pushRoleToMap(roleId, baseItem);
    };
    return BattleMap;
}(BaseEuiView));
__reflect(BattleMap.prototype, "BattleMap");
//# sourceMappingURL=BattleMap.js.map