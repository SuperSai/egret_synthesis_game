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
var HallController = (function (_super) {
    __extends(HallController, _super);
    function HallController() {
        var _this = _super.call(this) || this;
        var self = _this;
        //View初始化
        self._hall = new HallView(self, LayerMgr.GAME_UI_LAYER);
        App.View.register(ViewConst.Hall, self._hall);
        self._hallModel = new HallModel(self);
        //代理 -- 负责接收协议和转发协议
        self._hallProxy = new HallProxy(self);
        //注册模块消息
        self.registerFunc(HallConst.HALL_INIT, self.onHallInit, self);
        return _this;
    }
    HallController.prototype.onHallInit = function (param) {
        var self = this;
        App.View.open(ViewConst.Hall, null, self._hallModel);
    };
    return HallController;
}(BaseController));
__reflect(HallController.prototype, "HallController");
