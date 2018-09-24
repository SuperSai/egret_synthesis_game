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
var Monster = (function (_super) {
    __extends(Monster, _super);
    function Monster($controller, $layer) {
        var _this = _super.call(this, $controller, $layer) || this;
        /** 方向 -- 默认朝上*/
        _this._direction = MONSTER_DIR.UP;
        _this._id = App.CommonUtils.Token;
        _this._battleController = $controller;
        return _this;
    }
    /** 更新数据 */
    Monster.prototype.update = function (passTime) {
        this.move(passTime);
    };
    Monster.prototype.move = function (passTime) {
        if (this._path.length == 0)
            return;
        var point = this._path[0]; //下一个节点
        var targetSpeed = App.CommonUtils.getSpeed(point, new egret.Point(this.x, this.y), this.moveSpeed);
        var xDistance = 10 * targetSpeed.x;
        var yDistance = 10 * targetSpeed.y;
        if (Math.abs(point.x - this.x) <= Math.abs(xDistance) && Math.abs(point.y - this.y) <= Math.abs(yDistance)) {
            this.x = point.x;
            this.y = point.y;
            this._path.shift();
            if (this._path.length == 0) {
                this._battleController.applyFunc(BattleConst.MONSTER_MOVE_END);
                this._battleController.getModel().MonsterDic.Remove(this._id);
                ObjectPool.push(this);
                App.DisplayUtils.removeFromParent(this);
                return;
            }
            else {
                this.setDirection(this._path[0]);
            }
        }
        else {
            this.x = this.x + xDistance;
            this.y = this.y + yDistance;
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
        this._hp = info.hp;
        this.hpMax = info.hp;
        this.moveSpeed = info.moveSpeed;
        this.type = info.type;
        this._path = [];
        for (var i = 0; i < info.path.length; i++) {
            var pos = info.path[i].split(",");
            this._path.push(new egret.Point(parseInt(pos[0]), parseInt(pos[1])));
        }
        var num = App.RandomUtils.randrange(0, 10);
        var img = new eui.Image("role_" + num);
        this.addChild(img);
        this.x = this._path[0].x;
        this.y = this._path[0].y;
        this.setDirection(this._path[1]);
    };
    Object.defineProperty(Monster.prototype, "ID", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    return Monster;
}(BaseRole));
__reflect(Monster.prototype, "Monster");
//# sourceMappingURL=Monster.js.map