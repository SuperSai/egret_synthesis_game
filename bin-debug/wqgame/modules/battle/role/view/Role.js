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
        var self = _this;
        self.touchChildren = self.touchEnabled = false;
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
        self.initRole();
    };
    /** 初始化角色 */
    Role.prototype.initRole = function () {
        var self = this;
        App.DisplayUtils.removeFromParent(self._roleImg);
        self._roleImg = new eui.Image("role_" + self._roleId);
        self.addChild(self._roleImg);
    };
    /** 设置坐标点 */
    Role.prototype.setPosition = function ($x, $y) {
        var self = this;
        self.x = $x;
        self.y = $y;
    };
    /** 重置 */
    Role.prototype.reset = function () {
        var self = this;
        self._baseItem = null;
    };
    Object.defineProperty(Role.prototype, "roleImg", {
        get: function () {
            return this._roleImg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Role.prototype, "roleId", {
        get: function () {
            return this._roleId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Role.prototype, "baseItem", {
        get: function () {
            return this._baseItem;
        },
        set: function (value) {
            this._baseItem = value;
        },
        enumerable: true,
        configurable: true
    });
    return Role;
}(BaseRole));
__reflect(Role.prototype, "Role");
//# sourceMappingURL=Role.js.map