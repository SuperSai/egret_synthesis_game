/**
 * 英雄底座
 */
class HeroBaseItem extends BaseEuiItem {

	public pos: eui.Group;

	private _heroRole: Role;
	private _heroVO: HeroVO;
	private _battleController: BattleController;

	public constructor() {
		super(SkinName.HeroBaseItemSkin);
	}

	public onAwake($data: any = null): void {
		super.onAwake($data);
		let self = this;
		self._battleController = self.data;
		self.initRole();
	}

	private initRole(): void {
		let self = this;
		self._heroRole = new Role(self._battleController, LayerMgr.GAME_MAP_LAYER);
		self._heroRole.touchEnabled = true;
		self._heroRole.addToParent();
		self._heroRole.isDrop = true;
		(<BattleModel>self._battleController.getModel()).roleDic.Add(self, self._heroRole);
		self._heroRole.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onShowHeroMsgPanel, self);
	}

	public removeEvents(): void {
		super.removeEvents();
		let self = this;
		self._heroRole.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onShowHeroMsgPanel, self);
	}

	/** 更新英雄角色样式 */
	public updateHeroStyle(roleId: number): void {
		let self = this;
		if (!self._heroRole) return Log.traceError("HeroBaseItem -- updateHeroStyle -- 英雄角色初始化后再赋值!");
		self._heroRole.open(roleId);
		let gPos: egret.Point = self.pos.localToGlobal();
		self._heroRole.x = gPos.x - self._heroRole.roleImg.width / 2;
		self._heroRole.y = gPos.y - self._heroRole.roleImg.height;
		self._heroRole.isDrop = false;
	}

	/** 显示英雄信息面板 */
	private onShowHeroMsgPanel(): void {
		let self = this;
		App.View.open(ViewConst.HeroMsgPanel,null, self._heroRole);
	}
}