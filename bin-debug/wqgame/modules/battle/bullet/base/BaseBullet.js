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
 * 子弹基类
 */
var BaseBullet = (function (_super) {
    __extends(BaseBullet, _super);
    function BaseBullet($controller, $layer) {
        return _super.call(this, $controller, $layer) || this;
    }
    BaseBullet.prototype.onUpdate = function () {
    };
    return BaseBullet;
}(BaseSpriteView));
__reflect(BaseBullet.prototype, "BaseBullet");
