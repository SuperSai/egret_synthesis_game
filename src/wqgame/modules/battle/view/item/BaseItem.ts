/**
 * 角色底座
 */
class BaseItem extends BaseEuiItem {

	private _state: number = BASE_STATE.CLOSE; // 底座的状态

	public constructor() {
		super(SkinName.BaseItemSkin);
	}

	public dataChanged() {
		super.dataChanged();
		let self = this;
		//处于关闭状态就不再继续往下处理
		if (self.data == BASE_STATE.CLOSE) {
			self._state = BASE_STATE.CLOSE;
			return;
		}
		self._state = BASE_STATE.OPEN;
	}

	set state(value: number) {
		this._state = value;
	}
	/** 底座的状态 */
	get state(): number {
		return this._state;
	}
}