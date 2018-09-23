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
var BaseEuiItem = (function (_super) {
    __extends(BaseEuiItem, _super);
    function BaseEuiItem(skinName) {
        var _this = _super.call(this) || this;
        _this._btnEffect = null;
        var self = _this;
        self.skinName = skinName;
        self.addEventListener(egret.Event.REMOVED_FROM_STAGE, self.onRemoveFromStage, self, false);
        return _this;
    }
    BaseEuiItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        var self = this;
        App.LanguageManager.setModuleLanguage(self);
    };
    BaseEuiItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
    };
    BaseEuiItem.prototype.onAwake = function ($data) {
        if ($data === void 0) { $data = null; }
        var self = this;
        self.data = $data;
    };
    /**
     * 设置按钮效果
     */
    BaseEuiItem.prototype.setBtnEffect = function (btnName) {
        var self = this;
        if (self._btnEffect == null) {
            self._btnEffect = new UI.BtnEffectComponent(self, btnName);
        }
    };
    BaseEuiItem.prototype.removeEvents = function () {
        var self = this;
    };
    /**移出舞台后调用 */
    BaseEuiItem.prototype.onRemoveFromStage = function (evt) {
        var self = this;
        self.removeEvents();
        if (this._btnEffect)
            this._btnEffect.dispose();
        this._btnEffect = null;
    };
    return BaseEuiItem;
}(eui.ItemRenderer));
__reflect(BaseEuiItem.prototype, "BaseEuiItem");
//# sourceMappingURL=BaseEuiItem.js.map