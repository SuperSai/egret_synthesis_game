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
 * 货币组组件
 */
var CurrencyCom = (function (_super) {
    __extends(CurrencyCom, _super);
    function CurrencyCom($controller, $layer) {
        var _this = _super.call(this, $controller, $layer) || this;
        _this.skinName = SkinName.CurrencyComSkin;
        return _this;
    }
    /** 对面板进行显示初始化，用于子类继承 */
    CurrencyCom.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.txt_gold.text = App.PlayerMgr.info.gold + "";
        this.txt_diamond.text = App.PlayerMgr.info.diamond + "";
        this.removeEvents();
        this.addEvents();
    };
    /**
     * 添加监听事件
     */
    CurrencyCom.prototype.addEvents = function () {
        _super.prototype.addEvents.call(this);
        App.NotificationCenter.addListener(CommonEvent.UPDATE_CURRENCY, this.onUpdateView, this);
    };
    /**
     * 移除监听事件
     */
    CurrencyCom.prototype.removeEvents = function () {
        _super.prototype.removeEvents.call(this);
        App.NotificationCenter.removeListener(CommonEvent.UPDATE_CURRENCY, this.onUpdateView, this);
    };
    /**
     * 更新货币
     * @param isTotal true 表示price是总额 	false 表示price是扣费数
     */
    CurrencyCom.prototype.onUpdateView = function (price, type, isTotal) {
        if (isTotal === void 0) { isTotal = false; }
        switch (type) {
            case ITEM_TYPE.GOLD:
                if (isTotal) {
                    App.PlayerMgr.info.gold = price;
                    this.txt_gold.text = App.PlayerMgr.info.gold + "";
                }
                else {
                    App.PlayerMgr.info.gold += price;
                    this.txt_gold.text = App.PlayerMgr.info.gold + "";
                }
                break;
            case ITEM_TYPE.DIAMOND:
                if (isTotal) {
                    App.PlayerMgr.info.diamond = price;
                    this.txt_diamond.text = App.PlayerMgr.info.diamond + "";
                }
                else {
                    App.PlayerMgr.info.diamond += price;
                    this.txt_diamond.text = App.PlayerMgr.info.diamond + "";
                }
                break;
        }
    };
    return CurrencyCom;
}(BaseEuiView));
__reflect(CurrencyCom.prototype, "CurrencyCom");
//# sourceMappingURL=CurrencyCom.js.map