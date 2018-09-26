class BaseEuiItem extends eui.ItemRenderer {

	private _btnEffect: UI.BtnEffectComponent = null;

	public constructor(skinName: string) {
		super();
		let self = this;
		self.skinName = skinName;
		self.addEventListener(egret.Event.REMOVED_FROM_STAGE, self.onRemoveFromStage, self, false);
	}

	public childrenCreated() {
		super.childrenCreated();
		let self = this;
		App.LanguageManager.setModuleLanguage(self);
	}

	public dataChanged() {
		super.dataChanged();
	}

	public onAwake($data: any = null): void {
		let self = this;
		self.data = $data;
	}

	/**
	 * 设置按钮效果
	 */
	public setBtnEffect(btnName: string[]): void {
		let self = this;
		if (self._btnEffect == null) {
			self._btnEffect = new UI.BtnEffectComponent(self, btnName);
		}
	}

	public removeEvents(): void {
		let self = this;
	}

	/**移出舞台后调用 */
	protected onRemoveFromStage(evt: egret.Event): void {
		let self = this;
		self.removeEvents();
		if (this._btnEffect) this._btnEffect.dispose();
		this._btnEffect = null;
	}

}