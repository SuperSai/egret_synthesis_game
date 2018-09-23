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
 * 角色底座
 */
var BaseItem = (function (_super) {
    __extends(BaseItem, _super);
    function BaseItem() {
        var _this = _super.call(this, SkinName.BaseItemSkin) || this;
        _this._state = BASE_STATE.CLOSE; // 底座的状态
        return _this;
    }
    BaseItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        var self = this;
        //处于关闭状态就不再继续往下处理
        if (self.data == BASE_STATE.CLOSE) {
            self._state = BASE_STATE.CLOSE;
            return;
        }
        self._state = BASE_STATE.OPEN;
    };
    Object.defineProperty(BaseItem.prototype, "state", {
        /** 底座的状态 */
        get: function () {
            return this._state;
        },
        set: function (value) {
            this._state = value;
        },
        enumerable: true,
        configurable: true
    });
    return BaseItem;
}(BaseEuiItem));
__reflect(BaseItem.prototype, "BaseItem");
//# sourceMappingURL=BaseItem.js.map