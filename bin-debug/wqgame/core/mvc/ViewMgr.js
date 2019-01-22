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
var ViewMgr = (function (_super) {
    __extends(ViewMgr, _super);
    /**
     * 构造函数
     */
    function ViewMgr() {
        var _this = _super.call(this) || this;
        _this._views = {};
        _this._opens = [];
        return _this;
    }
    /**
     * 清空处理
     */
    ViewMgr.prototype.clear = function () {
        this.closeAll();
        this._views = {};
    };
    /**
     * 面板注册
     * @param key 面板唯一标识
     * @param view 面板
     */
    ViewMgr.prototype.register = function (key, view) {
        if (view == null) {
            return;
        }
        if (this._views[key]) {
            return;
        }
        this._views[key] = view;
    };
    /**
     * 面板解除注册
     * @param key
     */
    ViewMgr.prototype.unregister = function (key) {
        if (!this._views[key]) {
            return;
        }
        this._views[key] = null;
        delete this._views[key];
    };
    /**
     * 销毁一个面板
     * @param key 唯一标识
     * @param newView 新面板
     */
    ViewMgr.prototype.destroy = function (key, newView) {
        if (newView === void 0) { newView = null; }
        var oldView = this.getView(key);
        if (oldView) {
            this.unregister(key);
            oldView.destroy();
            oldView = null;
        }
        this.register(key, newView);
    };
    /**
     * 开启面板
     * @param key 面板唯一标识
     * @param param 参数
     */
    ViewMgr.prototype.open = function (key, openComplete) {
        if (openComplete === void 0) { openComplete = null; }
        var param = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            param[_i - 2] = arguments[_i];
        }
        var view = this.getView(key);
        if (view == null) {
            Log.trace("UI_" + key + "不存在");
            return;
        }
        if (view.isShow()) {
            view.open.apply(view, param);
            openComplete && openComplete();
            return view;
        }
        if (view.isInit()) {
            view.addToParent();
            view.initUI();
            view.addEvents();
            view.open.apply(view, param);
            view.initData();
            openComplete && openComplete();
        }
        else {
            App.GameLoading.showLoading();
            view.loadResource(function () {
                view.setVisible(false);
                view.addToParent();
            }.bind(this), function () {
                view.initUI();
                view.addEvents();
                view.open.apply(view, param);
                view.initData();
                view.setVisible(true);
                openComplete && openComplete();
                App.GameLoading.hideLoading();
            }.bind(this));
        }
        this._opens.push(key);
        return view;
    };
    /**
     * 关闭面板
     * @param key 面板唯一标识
     * @param param 参数
     */
    ViewMgr.prototype.close = function (key) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        if (!this.isShow(key)) {
            return;
        }
        var view = this.getView(key);
        if (view == null) {
            return;
        }
        var viewIndex = this._opens.indexOf(key);
        if (viewIndex >= 0) {
            this._opens.splice(viewIndex, 1);
        }
        view.removeFromParent();
        view.close.apply(view, param);
    };
    /**
     * 关闭面板
     * @param view
     * @param param
     */
    ViewMgr.prototype.closeView = function (view) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        var keys = Object.keys(this._views);
        for (var i = 0, len = keys.length; i < len; i++) {
            var key = parseInt(keys[i]);
            if (this._views[key] == view) {
                this.close(key, param);
                return;
            }
        }
    };
    /**
     * 根据唯一标识获取一个UI对象
     * @param key
     * @returns {any}
     */
    ViewMgr.prototype.getView = function (key) {
        return this._views[key];
    };
    /**
     * 关闭所有开启中的UI
     */
    ViewMgr.prototype.closeAll = function () {
        while (this._opens.length) {
            this.close(this._opens[0]);
        }
    };
    /**
     * 当前ui打开数量
     * @returns {number}
     */
    ViewMgr.prototype.currOpenNum = function () {
        return this._opens.length;
    };
    /**
     * 检测一个UI是否开启中
     * @param key
     * @returns {boolean}
     */
    ViewMgr.prototype.isShow = function (key) {
        return this._opens.indexOf(key) != -1;
    };
    return ViewMgr;
}(BaseClass));
__reflect(ViewMgr.prototype, "ViewMgr");
//# sourceMappingURL=ViewMgr.js.map