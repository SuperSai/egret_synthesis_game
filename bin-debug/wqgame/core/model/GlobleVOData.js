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
 * json数据解析类
 */
var GlobleVOData = (function (_super) {
    __extends(GlobleVOData, _super);
    function GlobleVOData() {
        var _this = _super.call(this) || this;
        _this._hasParasComplete = false;
        _this._totalStepCsvList = new TSDictionary();
        _this._needParseCount = 0;
        _this._currParseCount = 0;
        return _this;
    }
    Object.defineProperty(GlobleVOData.prototype, "hasParasComplete", {
        get: function () {
            return this._hasParasComplete;
        },
        enumerable: true,
        configurable: true
    });
    GlobleVOData.prototype.setup = function () {
        var self = this;
        self.initModel();
        self.initStep();
    };
    GlobleVOData.prototype.initModel = function () {
        var self = this;
        self._totalStepCsvList.Add(GlobleVOData.LevelVO, LevelVO);
        self._totalStepCsvList.Add(GlobleVOData.BoneAnimationVO, BoneAnimationVO);
        self._totalStepCsvList.Add(GlobleVOData.SoundVO, SoundVO);
        self._totalStepCsvList.Add(GlobleVOData.MonsterVO, MonsterVO);
        self._totalStepCsvList.Add(GlobleVOData.ServerConfigVO, ServerConfigVO);
        self._totalStepCsvList.Add(GlobleVOData.HeroVO, HeroVO);
        self._totalStepCsvList.Add(GlobleVOData.BulletVO, BulletVO);
    };
    // 解析初始数据表
    GlobleVOData.prototype.initStep = function () {
        var self = this;
        self._needParseCount = self._totalStepCsvList.GetLenght();
        RES.getResAsync("json_zip", this.onloadDataComplete, self);
        Log.trace("dataFile is json_zip");
    };
    GlobleVOData.prototype.onloadDataComplete = function (data, key) {
        var self = this;
        self._csvZipData = new JSZip(data);
        Log.trace("onloadDataComplete is json_zip:" + key);
        self.addEventListener(egret.Event.ENTER_FRAME, self.onEnterFrameLoader, self);
    };
    GlobleVOData.prototype.onEnterFrameLoader = function () {
        var self = this;
        if (self._currParseCount >= self._needParseCount) {
            self.removeEventListener(egret.Event.ENTER_FRAME, self.onEnterFrameLoader, self);
            this._hasParasComplete = true;
            App.GameEnterManager.init();
        }
        else {
            //一次解析两个文件
            self.getCsvFile();
            self.getCsvFile();
        }
    };
    GlobleVOData.prototype.getCsvFile = function () {
        var self = this;
        if (self._currParseCount < self._needParseCount) {
            var key = self._totalStepCsvList.getKeyByIndex(self._currParseCount);
            key = key.replace('_', '.');
            var data = self._csvZipData.file(key);
            if (data == null) {
                Log.trace("can't get key from key :" + key);
            }
            var csvStr = self._csvZipData.file(key).asText();
            self.starSingleParse(csvStr);
        }
    };
    GlobleVOData.prototype.starSingleParse = function (csvStr) {
        var self = this;
        var key = self._totalStepCsvList.getKeyByIndex(self._currParseCount);
        var DataClass = self._totalStepCsvList.getValueByIndex(self._currParseCount);
        var dic = CSVParser.ParseJsonData(DataClass, csvStr);
        GlobleVOData.AllCacheData.Add(key, dic);
        self._currParseCount++;
    };
    Object.defineProperty(GlobleVOData, "getInstance", {
        get: function () {
            if (!this._instance) {
                this._instance = new GlobleVOData();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    GlobleVOData.getData = function (type, key) {
        var dic = GlobleVOData.AllCacheData.TryGetValue(type);
        return dic.TryGetValue(key);
    };
    GlobleVOData.getDataByFilter = function (type, filterType, filterValue) {
        var dic = GlobleVOData.AllCacheData.TryGetValue(type);
        var filterd = dic.TryGetListByCondition(function (bean) { return bean[filterType] == filterValue; });
        return filterd;
    };
    GlobleVOData.getAllValue = function (type) {
        var dic = GlobleVOData.AllCacheData.TryGetValue(type);
        return dic.getValues();
    };
    GlobleVOData.getDataByCondition = function (type, value) {
        var dic = GlobleVOData.AllCacheData.TryGetValue(type);
        var arr = dic.TryGetListByCondition(value);
        return arr;
    };
    GlobleVOData.AllCacheData = new TSDictionary();
    GlobleVOData.ServerConfigVO = "ServerConfig_json";
    GlobleVOData.BoneAnimationVO = "BoneAnimation_json";
    GlobleVOData.LevelVO = "Level_json";
    GlobleVOData.SoundVO = "Sound_json";
    GlobleVOData.MonsterVO = "Monster_json";
    GlobleVOData.HeroVO = "Hero_json";
    GlobleVOData.BulletVO = "Bullet_json";
    return GlobleVOData;
}(egret.DisplayObject));
__reflect(GlobleVOData.prototype, "GlobleVOData");
//# sourceMappingURL=GlobleVOData.js.map