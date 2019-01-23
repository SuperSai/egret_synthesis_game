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
var DelayOptMgr = (function (_super) {
    __extends(DelayOptMgr, _super);
    function DelayOptMgr() {
        var _this = _super.call(this) || this;
        //每帧运算逻辑的时间阈值，执行代码超过这个时间就跳过到下一帧继续执行，根据实际情况调整，因为每一帧除了这里的逻辑还有别的逻辑要做对吧
        _this.TIME_THRESHOLD = 2;
        _this._delayOpts = [];
        App.Timer.doFrame(1, 0, _this.runCachedFun, _this);
        return _this;
    }
    DelayOptMgr.prototype.addDelayOptFunction = function (thisObj, fun, funPara, callBack, para) {
        this._delayOpts.push({ "fun": fun, "funPara": funPara, "thisObj": thisObj, "callBack": callBack, "para": para });
    };
    DelayOptMgr.prototype.clear = function () {
        this._delayOpts.length = 0;
    };
    DelayOptMgr.prototype.stop = function () {
        App.Timer.remove(this.runCachedFun, this);
    };
    DelayOptMgr.prototype.runCachedFun = function (f) {
        if (this._delayOpts.length == 0) {
            return;
        }
        var timeFlag = egret.getTimer();
        var funObj;
        while (this._delayOpts.length) {
            funObj = this._delayOpts.shift();
            if (funObj.funPara)
                funObj.fun.call(funObj.thisObj, funObj.funPara);
            else
                funObj.fun.call(funObj.thisObj);
            if (funObj.callBack) {
                if (funObj.para != undefined)
                    funObj.callBack.call(funObj.thisObj, funObj.para);
                else
                    funObj.callBack();
            }
            if (egret.getTimer() - timeFlag > this.TIME_THRESHOLD)
                break;
        }
    };
    return DelayOptMgr;
}(BaseClass));
__reflect(DelayOptMgr.prototype, "DelayOptMgr");
//# sourceMappingURL=DelayOptMgr.js.map