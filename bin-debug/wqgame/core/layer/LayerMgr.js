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
var LayerMgr = (function (_super) {
    __extends(LayerMgr, _super);
    function LayerMgr() {
        var _this = _super.call(this) || this;
        _this._layers = [];
        _this._sceneContainer = new eui.UILayer();
        _this._gameContainer = new eui.UILayer();
        return _this;
    }
    Object.defineProperty(LayerMgr.prototype, "sceneContainer", {
        get: function () {
            var self = this;
            return self._sceneContainer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerMgr.prototype, "gameContainer", {
        get: function () {
            var self = this;
            return self._gameContainer;
        },
        enumerable: true,
        configurable: true
    });
    LayerMgr.prototype.setup = function (stage) {
        var self = this;
        this.createAllLayers();
        self._sceneContainer.touchThrough = true;
        self._gameContainer.touchThrough = true;
        stage.addChild(self._sceneContainer);
        stage.addChild(self.getLayerByType(LayerMgr.POP_LAYER));
        stage.addChild(self.getLayerByType(LayerMgr.TIP_LAYER));
        self._sceneContainer.addChild(self._gameContainer);
        self._sceneContainer.addChild(self.getLayerByType(LayerMgr.SCENE_BASE_LAYER));
        self._sceneContainer.addChild(self.getLayerByType(LayerMgr.SCENE_UI_LAYER));
        self._sceneContainer.addChild(self.getLayerByType(LayerMgr.SCENE_UI_EFFECT_LAYER));
        self._sceneContainer.addChild(self.getLayerByType(LayerMgr.SCENE_POP_LAYER));
        self._gameContainer.addChild(self.getLayerByType(LayerMgr.GAME_MAP_LAYER));
        self._gameContainer.addChild(self.getLayerByType(LayerMgr.GAME_EFFECT_LAYER));
        self._gameContainer.addChild(self.getLayerByType(LayerMgr.GAME_MASCOT_LAYER));
        self._gameContainer.addChild(self.getLayerByType(LayerMgr.GAME_UI_LAYER));
        self._gameContainer.addChild(self.getLayerByType(LayerMgr.GAME_POP_LAYER));
        stage.addEventListener(egret.Event.RESIZE, self.onStageResize, self);
    };
    LayerMgr.prototype.onStageResize = function (event) {
        this.resize();
    };
    LayerMgr.prototype.createAllLayers = function () {
        for (var i = 0; i < LayerMgr.layerCount; i++) {
            var layer = this.createOnLayer(i);
            this._layers[layer.layerType] = layer;
        }
    };
    LayerMgr.prototype.createOnLayer = function (layerType) {
        var layer = new DisplayLayer();
        layer.layerType = layerType;
        layer.touchThrough = true;
        return layer;
    };
    LayerMgr.prototype.addToLayer = function (display, layerType) {
        var layer = this._layers[layerType]; //this.getLayerByType(layerType);
        layer.addChild(display);
    };
    LayerMgr.prototype.getLayerByType = function (layerType) {
        return this._layers[layerType];
        // for (let i: number = 0; i < this._layers.length; i++) {
        // 	if (this._layers[i].layerType == layerType) {
        // 		return this._layers[i];
        // 	}
        // }
    };
    LayerMgr.prototype.resize = function () {
        Log.trace("【 LayerManager 】stageResized-------------");
        var width = App.Stage.getWidth();
        var height = App.Stage.getHeight();
        for (var i = 0; i < this._layers.length; i++) {
            var layer = this._layers[i];
            for (var i_1 = 0; i_1 < layer.numChildren; i_1++) {
                var child = layer.getChildAt(i_1);
                if (instanceOfIStageResizeable(child)) {
                    child["resize"](width, height);
                }
            }
        }
    };
    LayerMgr.TIP_LAYER = 0;
    LayerMgr.POP_LAYER = 1;
    LayerMgr.SCENE_POP_LAYER = 2;
    LayerMgr.SCENE_UI_EFFECT_LAYER = 3;
    LayerMgr.SCENE_UI_LAYER = 4;
    LayerMgr.SCENE_BASE_LAYER = 5;
    LayerMgr.GAME_POP_LAYER = 6;
    LayerMgr.GAME_UI_LAYER = 7;
    LayerMgr.GAME_EFFECT_LAYER = 8;
    LayerMgr.GAME_MASCOT_LAYER = 10;
    LayerMgr.GAME_MAP_LAYER = 9;
    LayerMgr.layerCount = 11;
    return LayerMgr;
}(BaseClass));
__reflect(LayerMgr.prototype, "LayerMgr");
//# sourceMappingURL=LayerMgr.js.map