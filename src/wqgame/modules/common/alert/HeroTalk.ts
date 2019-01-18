/**
 * 说话提示界面
 */
class HeroTalk extends BaseEuiAlert {

	public talkGroup: eui.Group;
	public txt_talk: eui.Label;

	public constructor($controller: BaseController, $layer: number, $skinName: string, $viewShowType: number = VIEW_SHOW_TYPE.UP) {
		super($controller, $layer, $skinName, $viewShowType);
		this.anchorOffsetY = -300;
	}

	/** 初始化界面 */
	public initUI(): void {
		super.initUI();
		let self = this;

		self.effectCallBack = () => {
			self.talkGroup.visible = true;
		}
	}

	/** 初始化数据 */
	public initData(): void {
		super.initData();
		let self = this;
		App.TimerMgr.doTimer(1000, 1, () => {
			(<BattleModel>self.controller.getModel()).battleMonsterState = BATTLE_MONSTER_STATE.MONSTER;
			super.onClosePanel();
		}, self)
	}

	public open(...param: any[]): void {
		super.open(param);
		let self = this;
	}

	public addEvents(): void {
		super.addEvents();
		let self = this;
	}

	public removeEvents(): void {
		super.removeEvents();
		let self = this;

	}

	protected onMaskHandler() {
		super.onMaskHandler();
		let self = this;
		self.talkGroup.visible = false;
		(<BattleModel>self.controller.getModel()).battleMonsterState = BATTLE_MONSTER_STATE.MONSTER;
	}
}