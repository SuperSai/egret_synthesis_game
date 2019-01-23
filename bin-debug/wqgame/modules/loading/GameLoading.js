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
 *	small loading
 */
var GameLoading = (function (_super) {
    __extends(GameLoading, _super);
    function GameLoading() {
        var _this = _super.call(this) || this;
        _this._symbol = "";
        _this.init();
        return _this;
    }
    GameLoading.prototype.init = function () {
        this._content = new egret.Sprite();
        this._content.graphics.beginFill(0x000000, 0.2);
        this._content.graphics.drawRect(0, 0, App.Stage.getWidth(), App.Stage.getHeight());
        this._content.graphics.endFill();
        this._content.touchEnabled = true;
        this._uiContainer = new egret.DisplayObjectContainer();
        this._uiContainer.x = this._content.width * 0.5;
        this._uiContainer.y = this._content.height * 0.5;
        this._content.addChild(this._uiContainer);
        if (!this._img) {
            this._img = new egret.Bitmap();
            this._img.texture = RES.getRes("loading_player_png");
            this._img.x = -this._img.width * 0.5 - 80;
            this._img.y = -this._img.height * 0.5;
        }
        if (!this._text) {
            this._text = new egret.TextField();
            this._text.stroke = 2;
            this._text.strokeColor = 0x946430;
            this._text.fontFamily = "Microsoft YaHei";
            this._text.size = 28;
            this._text.x = -this._text.width * 0.5;
            this._text.y = -this._text.height * 0.5 + 40;
            this._text.text = "客官亲稍等...";
        }
        this._uiContainer.addChild(this._img);
        this._uiContainer.addChild(this._text);
    };
    GameLoading.prototype.showLoading = function () {
        App.Stage.getStage().addChild(this._content);
        App.Timer.doFrame(20, 0, this.enterFrame, this);
    };
    GameLoading.prototype.hideLoading = function () {
        if (this._content && this._content.parent) {
            App.Stage.getStage().removeChild(this._content);
        }
        App.Timer.remove(this.enterFrame, this);
    };
    GameLoading.prototype.enterFrame = function (time) {
        this._text.text = "客官亲稍等" + this._symbol;
        this._symbol += ".";
        if (this._symbol.length > 3) {
            this._symbol = "";
        }
    };
    return GameLoading;
}(BaseClass));
__reflect(GameLoading.prototype, "GameLoading");
//# sourceMappingURL=GameLoading.js.map