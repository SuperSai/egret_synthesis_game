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
 * 普通子弹
 */
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet($controller, $layer) {
        var _this = _super.call(this, $controller, $layer) || this;
        _this._id = App.Common.Token;
        return _this;
    }
    /** 设置子弹攻击的目标 */
    Bullet.prototype.setTarget = function (bulletId, currPos, $target) {
        var self = this;
        self._bulletVO = GlobleData.getData(GlobleData.BulletVO, bulletId);
        self._target = $target;
        if (self._bulletImg)
            App.Display.removeFromParent(self._bulletImg);
        self._bulletImg = ObjectPool.pop(egret.Bitmap, "egret.Bitmap");
        self._bulletImg.texture = RES.getRes(self._bulletVO.assetname);
        self.addChild(self._bulletImg);
        self.x = currPos.x + (self._target.width >> 1) + (self._bulletImg.width >> 1);
        self.y = currPos.y + self._target.height; // + (self._bulletImg.height >> 1);
        App.Sound.playEffect(self._bulletVO.startSound);
        this.scaleX = this.scaleY = 0.6;
    };
    Bullet.prototype.onUpdate = function () {
        _super.prototype.onUpdate.call(this);
        if (!this._bulletVO)
            return;
        this.move();
    };
    Bullet.prototype.move = function () {
        if (this._target.HP <= 0 || !this._target.IsMove) {
            this._target = null;
            this._bulletVO = null;
            this.release();
            return;
        }
        var distance = App.Math.getDistance(this.point.x, this.point.y, this._target.Point.x, this._target.Point.y);
        if (distance <= this._bulletVO.radius) {
            this._target.HP = this._target.HP - this._bulletVO.damage;
            App.Effect.doBombEffect(this._bulletVO.bombAni, this.localToGlobal(), this);
            App.Sound.playEffect(this._bulletVO.dieSound);
            this._target = null;
            this._bulletVO = null;
            this.release();
        }
        else {
            var targetSpeed = App.Math.getSpeed(this._target.Point, this.point, this._bulletVO.speed);
            var xDistance = 10 * targetSpeed.x;
            var yDistance = 10 * targetSpeed.y;
            this.x = this.x + xDistance;
            this.y = this.y + yDistance;
        }
    };
    /** 释放 */
    Bullet.prototype.release = function () {
        var self = this;
        self.controller.getModel().bulletDic.Remove(self._id);
        ObjectPool.push(self._bulletImg);
        ObjectPool.push(self);
        App.Display.removeFromParent(self._bulletImg);
        App.Display.removeFromParent(self);
    };
    Object.defineProperty(Bullet.prototype, "point", {
        get: function () {
            return { x: this.x, y: this.y };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bullet.prototype, "ID", {
        /** 子弹的唯一ID 不是 子弹表ID */
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    return Bullet;
}(BaseBullet));
__reflect(Bullet.prototype, "Bullet");
//# sourceMappingURL=Bullet.js.map