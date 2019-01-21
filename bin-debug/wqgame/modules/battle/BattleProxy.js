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
var BattleProxy = (function (_super) {
    __extends(BattleProxy, _super);
    function BattleProxy($controller) {
        return _super.call(this, $controller) || this;
        //注册从服务器返回消息的监听
        // this.receiveServerMsg(HttpConst.USER_LOGIN, this.loginSuccess, this);
    }
    return BattleProxy;
}(BaseProxy));
__reflect(BattleProxy.prototype, "BattleProxy");
