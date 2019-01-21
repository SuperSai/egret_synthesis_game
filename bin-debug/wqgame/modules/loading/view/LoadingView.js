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
 * smallLoading
 */
var LoadingView = (function (_super) {
    __extends(LoadingView, _super);
    function LoadingView($controller, $layer, $skinName) {
        var _this = _super.call(this, $controller, $layer, $skinName, 0) || this;
        _this.isMaskTouch = false;
        _this.setResources(["loading"]);
        return _this;
    }
    LoadingView.prototype.setProgress = function (current, total) {
        this.txtMsg.text = "客官亲稍等..." + current + "/" + total;
    };
    return LoadingView;
}(BaseEuiAlert));
__reflect(LoadingView.prototype, "LoadingView");
//# sourceMappingURL=LoadingView.js.map