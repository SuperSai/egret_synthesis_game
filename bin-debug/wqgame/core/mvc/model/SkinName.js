var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SkinName = (function () {
    function SkinName() {
    }
    SkinName.LoadingUISkin = "resource/skins/loading/LoadingUISkin.exml";
    SkinName.LoginViewSkin = "resource/skins/login/LoginViewSkin.exml";
    SkinName.CurrencyComSkin = "resource/skins/common/component/CurrencyComSkin.exml";
    SkinName.HallViewSkin = "resource/skins/hall/HallViewSkin.exml";
    SkinName.ButtonComSkin = "resource/skins/common/component/ButtonComSkin.exml";
    SkinName.BattleMapSkin = "resource/skins/battle/BattleMapSkin.exml";
    SkinName.BattleViewSkin = "resource/skins/battle/BattleViewSkin.exml";
    SkinName.BaseItemSkin = "resource/skins/battle/item/BaseItemSkin.exml";
    return SkinName;
}());
__reflect(SkinName.prototype, "SkinName");
//# sourceMappingURL=SkinName.js.map