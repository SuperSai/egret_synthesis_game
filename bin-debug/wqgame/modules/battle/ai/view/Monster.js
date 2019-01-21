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
 * 怪物类
 */
var Monster = (function (_super) {
    __extends(Monster, _super);
    function Monster($controller, $layer) {
        var _this = _super.call(this, $controller, $layer) || this;
        /** 方向 -- 默认朝上*/
        _this._direction = MONSTER_DIR.UP;
        /** 是否移动 */
        _this._isMove = false;
        _this._id = App.Common.Token;
        _this._battleController = $controller;
        return _this;
    }
    /** 更新数据 */
    Monster.prototype.onUpdate = function (passTime) {
        if (!this._isMove)
            return;
        this.move(passTime);
    };
    /** 怪物移动 */
    Monster.prototype.move = function (passTime) {
        var self = this;
        if (self._path.length == 0)
            return;
        var point = self._path[0]; //下一个节点
        var targetSpeed = App.Common.getSpeed(point, { x: self.x, y: self.y }, self._monsterInfo.monsterVO.speed);
        var xDistance = 10 * targetSpeed.x;
        var yDistance = 10 * targetSpeed.y;
        if (Math.abs(point.x - self.x) <= Math.abs(xDistance) && Math.abs(point.y - self.y) <= Math.abs(yDistance)) {
            self.x = point.x;
            self.y = point.y;
            self._path.shift();
            //已经达到终点
            if (self._path.length == 0) {
                self._battleController.applyFunc(BattleConst.MONSTER_MOVE_END);
                self.removeSelf();
                return;
            }
            self.setDirection(self._path[0]);
        }
        else {
            self.x = self.x + xDistance;
            self.y = self.y + yDistance;
        }
    };
    /**
    * 设定朝向
    * @param p:要朝向的点
    */
    Monster.prototype.setDirection = function (p) {
        var xNum = p.x - this.x;
        var yNum = p.y - this.y;
        var tempDirection = MONSTER_DIR.UP;
        if (xNum == 2 || yNum == 1) {
            if (yNum > 0) {
                tempDirection = MONSTER_DIR.DOWN;
            }
            if (yNum < 0) {
                tempDirection = MONSTER_DIR.UP;
            }
        }
        if (yNum == 2 || yNum == 1) {
            if (xNum > 0) {
                tempDirection = MONSTER_DIR.LEFT;
            }
            if (xNum < 0) {
                tempDirection = MONSTER_DIR.RIGHT;
            }
        }
        //如果怪物的方向改变了
        if (tempDirection != this._direction) {
            this._direction = tempDirection;
            this.changeMonsterDir();
        }
        return;
    };
    /** 改变怪物的方向 */
    Monster.prototype.changeMonsterDir = function () {
    };
    /** 解析数据 */
    Monster.prototype.Parse = function (info) {
        var self = this;
        self._monsterInfo = info;
        self._hp = self._monsterInfo.monsterVO.maxHp;
        self._path = [];
        //解析怪物行走路径点
        for (var i = 0; i < info.path.length; i++) {
            var pos = info.path[i].split(",");
            self._path.push({ x: Number(pos[0]), y: Number(pos[1]) });
        }
        self._bone = ResourcePool.Instance.pop(self._monsterInfo.monsterVO.assetname, ResourcePool.SKE);
        self._bone.play();
        self.addChild(self._bone);
        self.x = self._path[0].x;
        self.y = self._path[0].y;
        self.setDirection(self._path[1]);
        self._isMove = true;
    };
    /** 移除自己 */
    Monster.prototype.removeSelf = function () {
        var self = this;
        self._battleController.getModel().monsterDic.Remove(self._id);
        self._isMove = false;
        self._path = [];
        ObjectPool.push(self._monsterInfo);
        ObjectPool.push(self);
        ResourcePool.Instance.push(self._bone, ResourcePool.SKE);
        App.Display.removeFromParent(self);
    };
    Object.defineProperty(Monster.prototype, "HP", {
        /** 设置怪物当前血量值 */
        get: function () { return this._hp; },
        set: function (value) {
            var self = this;
            self._hp = value;
            if (self._hp <= 0) {
                self.removeSelf();
                App.Effect.bombEffect(self.localToGlobal(), self);
                self._battleController.applyFunc(BattleConst.MONSTER_DIE);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Monster.prototype, "Point", {
        get: function () { return { x: this.x, y: this.y }; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Monster.prototype, "IsMove", {
        /** 是否移动中 */
        get: function () { return this._isMove; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Monster.prototype, "MonsterId", {
        /** 获取怪物唯一ID */
        get: function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    return Monster;
}(BaseRole));
__reflect(Monster.prototype, "Monster");
