/**
 * 角色底座
 */
class BaseItem extends BaseEuiItem {

	public levelGroup: eui.Group;
	public txtLevel: eui.Label;
	private _state: number = BASE_STATE.CLOSE; // 底座的状态

	public constructor() {
		super(SkinName.BaseItemSkin);
	}

	public dataChanged() {
		super.dataChanged();
		let self = this;
		self.setLevelVisible();
		//处于关闭状态就不再继续往下处理
		if (self.data == BASE_STATE.CLOSE) {
			self._state = BASE_STATE.CLOSE;
			return;
		}
		self._state = BASE_STATE.OPEN;
	}

	private setLevelVisible(): void {
		if (this._state == BASE_STATE.CLOSE || this._state == BASE_STATE.OPEN) {
			this.levelGroup.visible = false;
		}
	}

	public setLevel(level: number): void {
		this.txtLevel.text = level + "";
		this.levelGroup.visible = true;
	}

	set state(value: number) {
		this._state = value;
		this.setLevelVisible();
	}
	/** 底座的状态 */
	get state(): number { return this._state; }
}