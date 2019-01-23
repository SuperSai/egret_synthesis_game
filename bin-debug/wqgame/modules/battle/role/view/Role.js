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
var Role = (function (_super) {
    __extends(Role, _super);
    function Role($controller, $layer) {
        var _this = _super.call(this, $controller, $layer) || this;
        _this._lastTime = 0;
        /** 是否正在拖拽中 */
        _this._isDrop = false;
        /** 是否守卫 */
        _this.isGuard = false;
        var self = _this;
        self.touchChildren = self.touchEnabled = false;
        self._model = self.controller.getModel();
        return _this;
    }
    /** 面板开启执行函数，用于子类继承 */
    Role.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        var self = this;
        self._roleId = param[0];
        self._heroVO = GlobleData.getData(GlobleData.HeroVO, self._roleId);
        self.initRole();
    };
    /** 初始化角色 */
    Role.prototype.initRole = function () {
        var self = this;
        self._isDrop = false;
        if (self._roleImg)
            App.Display.removeFromParent(self._roleImg);
        self._roleImg = new eui.Image(self._heroVO.assetname);
        self.addChild(self._roleImg);
        App.Sound.playEffect(self._heroVO.bornSound);
    };
    Role.prototype.onUpdate = function (passTime) {
        _super.prototype.onUpdate.call(this, passTime);
        if (this._isDrop)
            return;
        if (passTime > this._lastTime) {
            this.searchTarget();
            this._lastTime = passTime + App.Random.randint(this._heroVO.delay - 300, this._heroVO.delay + 300); //下次执行时间
        }
    };
    /** 设置坐标点 */
    Role.prototype.setPosition = function ($x, $y) {
        var self = this;
        self.x = $x;
        self.y = $y;
    };
    /** 选择攻击目标 */
    Role.prototype.searchTarget = function () {
        var self = this;
        var monsters = this._model.monsterDic.getValues();
        for (var i = 0; i < monsters.length; i++) {
            var monster = monsters[App.Random.randint(0, monsters.length - 1)];
            if (monster.HP > 0 && monster.IsMove && App.Math.getDistance(this.x, this.y, monster.x, monster.y) <= self._heroVO.distance) {
                self.bulletLaunch(monster);
                break;
            }
        }
    };
    /** 发射子弹 */
    Role.prototype.bulletLaunch = function (monster) {
        this.controller.applyFunc(BattleConst.ROLE_ATTACK, this._heroVO.bulletId, { x: this.x, y: this.y }, monster);
    };
    /** 重置 */
    Role.prototype.reset = function () {
        var self = this;
        self._baseItem = null;
    };
    Object.defineProperty(Role.prototype, "heroVO", {
        /** 角色数据信息 */
        get: function () { return this._heroVO; },
        set: function (value) { this._heroVO = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Role.prototype, "roleImg", {
        get: function () { return this._roleImg; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Role.prototype, "roleId", {
        /** 角色ID */
        get: function () { return this._roleId; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Role.prototype, "baseItem", {
        /** 角色当前对应的底座 */
        get: function () { return this._baseItem; },
        set: function (value) { this._baseItem = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Role.prototype, "isDrop", {
        /** 是否在移动合成中 */
        get: function () { return this._isDrop; },
        set: function (value) { this._isDrop = value; },
        enumerable: true,
        configurable: true
    });
    return Role;
}(BaseRole));
__reflect(Role.prototype, "Role");
//# sourceMappingURL=Role.js.map