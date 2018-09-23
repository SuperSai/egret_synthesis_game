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
var BaseEuiAlert = (function (_super) {
    __extends(BaseEuiAlert, _super);
    function BaseEuiAlert($controller, $layer, $skinName) {
        var _this = _super.call(this, $controller, $layer) || this;
        _this.offsetX = 0;
        _this.offsetY = 0;
        _this.offsetW = 0;
        _this.offsetH = 0;
        _this.isDispose = false;
        _this.isMaskTouch = true;
        _this.skinName = $skinName;
        return _this;
    }
    /** 对面板进行显示初始化，用于子类继承 */
    BaseEuiAlert.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        var self = this;
        self.isDispose = false;
        self.onDisplayResizeHandler();
        if (!self.maskRect) {
            self.maskRect = self.getMask(0.7);
        }
        App.LayerManager.addToLayer(self.maskRect, LayerManager.GAME_UI_LAYER);
        self.anchorOffsetY = App.StageUtils.getHeight();
        this.x = (App.StageUtils.getWidth() - this.width) >> 1;
        this.y = (App.StageUtils.getHeight() - this.height) >> 1;
        App.LayerManager.addToLayer(self, LayerManager.GAME_POP_LAYER);
        egret.Tween.get(self).to({ anchorOffsetY: 0 }, 300).call(function () {
            egret.Tween.removeTweens(self);
        });
    };
    BaseEuiAlert.prototype.addEvents = function () {
        _super.prototype.addEvents.call(this);
        var self = this;
        self.isMaskTouch && self.maskRect && self.maskRect.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onMaskHandler, self);
        self.btn_close && self.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosePanel, self);
        self.addEventListener(egret.Event.RESIZE, self.onDisplayResizeHandler, self);
    };
    BaseEuiAlert.prototype.removeEvents = function () {
        _super.prototype.removeEvents.call(this);
        var self = this;
        self.btn_close && self.btn_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosePanel, self);
        self.isMaskTouch && self.maskRect && self.maskRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onMaskHandler, self);
        self.removeEventListener(egret.Event.RESIZE, self.onDisplayResizeHandler, self);
    };
    BaseEuiAlert.prototype.onMaskHandler = function () {
        var self = this;
        App.ViewManager.closeView(self);
    };
    BaseEuiAlert.prototype.onClosePanel = function () {
        var self = this;
        App.ViewManager.closeView(self);
    };
    BaseEuiAlert.prototype.onDisplayResizeHandler = function () {
        var self = this;
        self.x = ((App.StageUtils.getWidth() - (self.width - self.offsetW)) >> 1) + self.offsetX;
        self.y = ((App.StageUtils.getHeight() - (self.height - self.offsetH)) >> 1) + self.offsetY;
    };
    /** 创建遮罩 */
    BaseEuiAlert.prototype.getMask = function (maskAlpha) {
        var rect = new eui.Rect();
        rect.touchEnabled = true;
        rect.percentWidth = 100;
        rect.percentHeight = 100;
        rect.fillColor = 0x0;
        rect.fillAlpha = maskAlpha;
        return rect;
    };
    return BaseEuiAlert;
}(BaseEuiView));
__reflect(BaseEuiAlert.prototype, "BaseEuiAlert");
//# sourceMappingURL=BaseEuiAlert.js.map