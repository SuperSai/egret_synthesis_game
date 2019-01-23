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
 * 怪物死掉后掉落的物品
 */
var DropItem = (function (_super) {
    __extends(DropItem, _super);
    function DropItem($controller, $layer) {
        return _super.call(this, $controller, $layer) || this;
    }
    DropItem.prototype.initItem = function (itemId, pos) {
        this._itemVO = GlobleData.getData(GlobleData.ItemVO, itemId);
        if (this._itemVO) {
            var path = PathConfig.ItemPath.replace("{0}", this._itemVO.icon);
            this._itemImg = new eui.Image(path);
            this.addChild(this._itemImg);
            this.x = pos.x - 5;
            this.y = pos.y - 20;
            this.addEvents();
            App.TimerMgr.doTimer(3000, 1, this.onClickItem, this);
        }
        else {
            this.removeSelf();
        }
    };
    DropItem.prototype.addEvents = function () {
        _super.prototype.addEvents.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClickItem, this);
    };
    DropItem.prototype.removeEvents = function () {
        _super.prototype.removeEvents.call(this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClickItem, this);
    };
    DropItem.prototype.onClickItem = function () {
        switch (this._itemVO.itemId) {
            case ITEM_TYPE.GOLD:
                App.NotificationCenter.dispatch(CommonEvent.UPDATE_CURRENCY, 1000, ITEM_TYPE.GOLD);
                break;
            case ITEM_TYPE.DIAMOND:
                App.NotificationCenter.dispatch(CommonEvent.UPDATE_CURRENCY, 1000, ITEM_TYPE.DIAMOND);
                break;
        }
        this.callBack && this.callBack();
    };
    DropItem.prototype.removeSelf = function () {
        this.destroy();
        this._itemImg = null;
        this._itemVO = null;
        App.Display.removeFromParent(this);
    };
    return DropItem;
}(BaseSpriteView));
__reflect(DropItem.prototype, "DropItem");
//# sourceMappingURL=DropItem.js.map