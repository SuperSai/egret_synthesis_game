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
 * Scene基类
 */
var BaseScene = (function (_super) {
    __extends(BaseScene, _super);
    /**
     * 构造函数
     */
    function BaseScene() {
        var _this = _super.call(this) || this;
        _this._layers = new Array();
        return _this;
    }
    /**
     * 进入Scene调用
     */
    BaseScene.prototype.onEnter = function () {
    };
    /**
     * 退出Scene调用
     */
    BaseScene.prototype.onExit = function () {
        App.View.closeAll();
        this.removeAllLayer();
    };
    /**
     * 添加一个Layer到舞台
     */
    BaseScene.prototype.addLayer = function (layer) {
        if (layer instanceof BaseSpriteLayer) {
            App.Stage.getStage().addChild(layer);
            this._layers.push(layer);
        }
        else if (layer instanceof BaseEuiLayer) {
            App.Stage.getUIStage().addChild(layer);
            this._layers.push(layer);
        }
    };
    /**
     * 添加一个Layer到舞台
     */
    BaseScene.prototype.addLayerAt = function (layer, index) {
        if (layer instanceof BaseSpriteLayer) {
            App.Stage.getStage().addChildAt(layer, index);
            this._layers.push(layer);
        }
        else if (layer instanceof BaseEuiLayer) {
            App.Stage.getUIStage().addChildAt(layer, index);
            this._layers.push(layer);
        }
    };
    /**
     * 在舞台移除一个Layer
     */
    BaseScene.prototype.removeLayer = function (layer) {
        if (layer instanceof BaseSpriteLayer) {
            App.Stage.getStage().removeChild(layer);
            this._layers.splice(this._layers.indexOf(layer), 1);
        }
        else if (layer instanceof BaseEuiLayer) {
            App.Stage.getUIStage().removeChild(layer);
            this._layers.splice(this._layers.indexOf(layer), 1);
        }
    };
    /**
     * Layer中移除所有
     */
    BaseScene.prototype.layerRemoveAllChild = function (layer) {
        if (layer instanceof BaseSpriteLayer) {
            layer.removeChildren();
        }
        else if (layer instanceof BaseEuiLayer) {
            layer.removeChildren();
        }
    };
    /**
     * 移除所有Layer
     */
    BaseScene.prototype.removeAllLayer = function () {
        while (this._layers.length) {
            var layer = this._layers[0];
            this.layerRemoveAllChild(layer);
            this.removeLayer(layer);
        }
    };
    return BaseScene;
}(egret.DisplayObjectContainer));
__reflect(BaseScene.prototype, "BaseScene");
//# sourceMappingURL=BaseScene.js.map