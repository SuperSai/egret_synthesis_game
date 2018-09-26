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
 * 英雄底座
 */
var HeroBaseItem = (function (_super) {
    __extends(HeroBaseItem, _super);
    function HeroBaseItem() {
        return _super.call(this, SkinName.HeroBaseItemSkin) || this;
    }
    HeroBaseItem.prototype.onAwake = function ($data) {
        if ($data === void 0) { $data = null; }
        _super.prototype.onAwake.call(this, $data);
        var self = this;
        self._battleController = self.data;
        self.initRole();
    };
    HeroBaseItem.prototype.initRole = function () {
        var self = this;
        self._heroRole = new Role(self._battleController, LayerManager.GAME_MAP_LAYER);
        self._heroRole.touchEnabled = true;
        self._heroRole.addToParent();
        self._heroRole.isMove = true;
        self._battleController.getModel().roleDic.Add(self, self._heroRole);
        self._heroRole.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onShowHeroMsgPanel, self);
    };
    HeroBaseItem.prototype.removeEvents = function () {
        _super.prototype.removeEvents.call(this);
        var self = this;
        self._heroRole.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onShowHeroMsgPanel, self);
    };
    /** 更新英雄角色样式 */
    HeroBaseItem.prototype.updateHeroStyle = function (roleId) {
        var self = this;
        if (!self._heroRole)
            return Log.traceError("HeroBaseItem -- updateHeroStyle -- 英雄角色初始化后再赋值!");
        self._heroRole.open(roleId);
        self._heroRole.heroVO.distance = 9999;
        var gPos = self.pos.localToGlobal();
        self._heroRole.x = gPos.x - self._heroRole.roleImg.width / 2;
        self._heroRole.y = gPos.y - self._heroRole.roleImg.height;
        self._heroRole.isMove = false;
    };
    /** 显示英雄信息面板 */
    HeroBaseItem.prototype.onShowHeroMsgPanel = function () {
        var self = this;
        App.ViewManager.open(ViewConst.HeroMsgPanel, self._heroRole);
    };
    return HeroBaseItem;
}(BaseEuiItem));
__reflect(HeroBaseItem.prototype, "HeroBaseItem");
//# sourceMappingURL=HeroBaseItem.js.map