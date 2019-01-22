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
 * 通用工具类
 */
var CommonUtils = (function (_super) {
    __extends(CommonUtils, _super);
    function CommonUtils() {
        var _this = _super.call(this) || this;
        _this._token = 0;
        /**
         * 万字的显示
         * @param label
         * @param num
         */
        _this.labelIsOverLenght = function (label, num) {
            var str = null;
            if (num < 100000) {
                str = num;
            }
            else if (num < 1000000) {
                str = Math.floor(num / 1000 / 10).toString() + "万";
            }
            else {
                str = Math.floor(num / 10000).toString() + "万";
            }
            label.text = str;
        };
        return _this;
    }
    Object.defineProperty(CommonUtils.prototype, "Token", {
        get: function () {
            return this._token++;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 锁屏
     */
    CommonUtils.prototype.lock = function () {
        var stage = App.Stage.getStage();
        stage.$children.forEach(function (child) {
            if (child instanceof egret.DisplayObjectContainer) {
                child.touchEnabled = child.touchChildren = false;
            }
        });
    };
    /**
     * 解屏
     */
    CommonUtils.prototype.unlock = function () {
        var stage = App.Stage.getStage();
        stage.$children.forEach(function (child) {
            if (child instanceof egret.DisplayObjectContainer) {
                child.touchEnabled = child.touchChildren = true;
            }
        });
    };
    return CommonUtils;
}(BaseClass));
__reflect(CommonUtils.prototype, "CommonUtils");
//# sourceMappingURL=CommonUtils.js.map