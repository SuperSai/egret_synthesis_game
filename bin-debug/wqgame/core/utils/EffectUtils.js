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
 * 各种效果工具类
 */
var EffectUtils = (function (_super) {
    __extends(EffectUtils, _super);
    /**
     * 构造函数
     */
    function EffectUtils() {
        return _super.call(this) || this;
    }
    /**
     * 类似mac上图标上下抖动的效果
     * @param obj 要抖动的对象，使用
     * @param initY 要抖动的对象的初始Y值，原始位置
     * @example eval(macIconShake("this.btnIcon", 100));
     * @returns {string} 返回的是一个要执行代码的字符串，通过eval执行
     */
    EffectUtils.prototype.doMacIconShake = function (obj, initY) {
        if (initY === void 0) { initY = 0; }
        //抖动频率[时间，移动距离]，可修改
        var arr = [
            [20, 200],
            [15, 200],
            [10, 200],
            [5, 200]
        ];
        var str = "egret.Tween.get(" + obj + ")";
        for (var i = 0, len = arr.length; i < len; i++) {
            str += ".to({'y':" + initY + "-" + arr[i][0] + "}, " + arr[i][1] + ")";
            str += ".to({'y':" + initY + "}, " + arr[i][1] + ")";
        }
        str += ";";
        return str;
    };
    /** 开始闪烁 */
    EffectUtils.prototype.startFlicker = function (obj, alphaTime) {
        obj.alpha = 1;
        egret.Tween.get(obj).to({ "alpha": 0 }, alphaTime).to({ "alpha": 1 }, alphaTime).call(this.startFlicker, this, [obj, alphaTime]);
    };
    /** 停止闪烁 */
    EffectUtils.prototype.stopFlicker = function (obj) {
        egret.Tween.removeTweens(obj);
    };
    /** 爆炸特效 */
    EffectUtils.prototype.doBombEffect = function (bombName, pos, obj) {
        var self = this;
        var bombBone = ResourcePool.Instance.pop(bombName, ResourcePool.SKE);
        App.Layer.addToLayer(bombBone, LayerMgr.GAME_EFFECT_LAYER);
        bombBone.x = pos.x;
        bombBone.y = pos.y;
        bombBone.play(function () {
            App.Display.removeFromParent(bombBone);
        }, obj);
    };
    /** 物品飞入的特效 */
    EffectUtils.prototype.doGoodsFlyEffect = function (obj, starPos, endPos, callback, duration) {
        if (duration === void 0) { duration = 300; }
        egret.Tween.get(obj).set({ x: starPos.x, y: starPos.y });
        egret.Tween.get(obj).to({ x: endPos.x, y: endPos.y }, duration).call(function () {
            egret.Tween.removeTweens(obj);
            callback && callback();
        });
    };
    /** 界面出现特效 */
    EffectUtils.prototype.viewShowEffect = function (view, type, callback) {
        if (type === void 0) { type = VIEW_SHOW_TYPE.UP; }
        if (callback === void 0) { callback = null; }
        var param = null;
        switch (type) {
            case VIEW_SHOW_TYPE.UP:
                view.anchorOffsetY = App.Stage.getHeight();
                param = { anchorOffsetY: 0 };
                break;
            case VIEW_SHOW_TYPE.DOWN:
                view.anchorOffsetY = -(App.Stage.getHeight());
                param = { anchorOffsetY: 0 };
                break;
            case VIEW_SHOW_TYPE.RIGHT:
                view.anchorOffsetX = App.Stage.getWidth();
                param = { anchorOffsetX: 0 };
                break;
            case VIEW_SHOW_TYPE.LEFT:
                view.anchorOffsetX = -(App.Stage.getWidth());
                param = { anchorOffsetX: 0 };
                break;
            default:
                view.anchorOffsetY = App.Stage.getHeight();
                param = { anchorOffsetY: 0 };
                break;
        }
        egret.Tween.get(view).to(param, 300).call(function () {
            egret.Tween.removeTweens(view);
            if (callback)
                callback();
        });
    };
    return EffectUtils;
}(BaseClass));
__reflect(EffectUtils.prototype, "EffectUtils");
var VIEW_SHOW_TYPE;
(function (VIEW_SHOW_TYPE) {
    /** 从上到下 */
    VIEW_SHOW_TYPE[VIEW_SHOW_TYPE["UP"] = 0] = "UP";
    /** 从下到上 */
    VIEW_SHOW_TYPE[VIEW_SHOW_TYPE["DOWN"] = 1] = "DOWN";
    /** 从左到右 */
    VIEW_SHOW_TYPE[VIEW_SHOW_TYPE["RIGHT"] = 2] = "RIGHT";
    /** 从右到左 */
    VIEW_SHOW_TYPE[VIEW_SHOW_TYPE["LEFT"] = 3] = "LEFT";
})(VIEW_SHOW_TYPE || (VIEW_SHOW_TYPE = {}));
//# sourceMappingURL=EffectUtils.js.map