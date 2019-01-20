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
var BattleModel = (function (_super) {
    __extends(BattleModel, _super);
    function BattleModel($controller) {
        var _this = _super.call(this, $controller) || this;
        /** 当前的关卡等级 */
        _this.currMission = 1;
        /** 当前游戏中最高级的角色ID */
        _this.maxRoleId = 0;
        /** 一排的底座数量 */
        _this.hBaseItemCount = 4;
        /** 当前在第几波 */
        _this.currwaveNum = 1;
        /** 当前波数的怪物数量 */
        _this.currMonsterCount = 0;
        /** 最大的底座数量 */
        _this.maxBaseCount = 0;
        /** 战斗怪物状态 */
        _this.battleMonsterState = BATTLE_MONSTER_STATE.PAUSE;
        var self = _this;
        self.init();
        return _this;
    }
    /** 初始化 */
    BattleModel.prototype.init = function () {
        var self = this;
        self._roleDic = new TSDictionary();
        self._monsterDic = new TSDictionary();
        self._bulletDic = new TSDictionary();
    };
    Object.defineProperty(BattleModel.prototype, "monsterWaveNumCount", {
        /** 获取当前波数的怪物数量 */
        get: function () {
            if (this._levelVO.monsterCount.length <= 1) {
                return this._levelVO.monsterCount[0];
            }
            return this._levelVO.monsterCount[this.currwaveNum - 1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BattleModel.prototype, "allBaseState", {
        /** 获取所有底座的状态 */
        get: function () {
            var self = this;
            var lists = [];
            for (var i = self.maxBaseCount; i > 0; i--) {
                if (i > self._levelVO.openBaseCount) {
                    lists.push(BASE_STATE.CLOSE);
                }
                else {
                    lists.push(BASE_STATE.OPEN);
                }
            }
            return lists;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BattleModel.prototype, "levelVO", {
        /** 关卡表模板数据 */
        get: function () {
            return this._levelVO;
        },
        set: function (value) {
            this._levelVO = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BattleModel.prototype, "roleDic", {
        /** 出战的角色字典 */
        get: function () {
            return this._roleDic;
        },
        set: function (value) {
            this._roleDic = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BattleModel.prototype, "monsterDic", {
        /** 出战中的怪物字典 */
        get: function () {
            return this._monsterDic;
        },
        set: function (value) {
            this._monsterDic = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BattleModel.prototype, "bulletDic", {
        /** 子弹的字典 */
        get: function () {
            return this._bulletDic;
        },
        set: function (value) {
            this._bulletDic = value;
        },
        enumerable: true,
        configurable: true
    });
    return BattleModel;
}(BaseModel));
__reflect(BattleModel.prototype, "BattleModel");
/** 底座的状态 */
var BASE_STATE;
(function (BASE_STATE) {
    /** 关闭状态 */
    BASE_STATE[BASE_STATE["CLOSE"] = 0] = "CLOSE";
    /** 开启状态 */
    BASE_STATE[BASE_STATE["OPEN"] = 1] = "OPEN";
    /** 拥有角色状态 */
    BASE_STATE[BASE_STATE["HAVE"] = 2] = "HAVE";
})(BASE_STATE || (BASE_STATE = {}));
/** 怪物的方向 */
var MONSTER_DIR;
(function (MONSTER_DIR) {
    /** 朝下 */
    MONSTER_DIR[MONSTER_DIR["DOWN"] = 0] = "DOWN";
    /** 朝上 */
    MONSTER_DIR[MONSTER_DIR["UP"] = 1] = "UP";
    /** 朝左 */
    MONSTER_DIR[MONSTER_DIR["RIGHT"] = 2] = "RIGHT";
    /** 朝右 */
    MONSTER_DIR[MONSTER_DIR["LEFT"] = 3] = "LEFT";
})(MONSTER_DIR || (MONSTER_DIR = {}));
/** 战斗中的出怪状态 */
var BATTLE_MONSTER_STATE;
(function (BATTLE_MONSTER_STATE) {
    /** 出小怪 */
    BATTLE_MONSTER_STATE[BATTLE_MONSTER_STATE["MONSTER"] = 0] = "MONSTER";
    /** 出BOSS怪 */
    BATTLE_MONSTER_STATE[BATTLE_MONSTER_STATE["BOSS"] = 1] = "BOSS";
    /** 暂停出怪 */
    BATTLE_MONSTER_STATE[BATTLE_MONSTER_STATE["PAUSE"] = 2] = "PAUSE";
})(BATTLE_MONSTER_STATE || (BATTLE_MONSTER_STATE = {}));
//# sourceMappingURL=BattleModel.js.map