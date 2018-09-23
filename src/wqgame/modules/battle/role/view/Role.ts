class Role extends BaseRole {

	private _roleId: number;
	private _roleImg: eui.Image;
	private _baseItem: BaseItem; // 角色当前对应的底座

	public constructor($controller: BaseController, $layer: number) {
		super($controller, $layer);
		let self = this;
		self.touchChildren = self.touchEnabled = false;
	}

	/** 面板开启执行函数，用于子类继承 */
	public open(...param: any[]): void {
		super.open(param);
		let self = this;
		self._roleId = param[0];
		self.initRole();
	}

	/** 初始化角色 */
	private initRole(): void {
		let self = this;
		App.DisplayUtils.removeFromParent(self._roleImg);
		self._roleImg = new eui.Image("role_" + self._roleId);
		self.addChild(self._roleImg);
	}

	/** 设置坐标点 */
	public setPosition($x: number, $y: number): void {
		let self = this;
		self.x = $x;
		self.y = $y;
	}

	/** 重置 */
	public reset(): void {
		let self = this;
		self._baseItem = null;
	}

	get roleImg(): eui.Image {
		return this._roleImg;
	}

	get roleId(): number {
		return this._roleId;
	}

	set baseItem(value: BaseItem) {
		this._baseItem = value;
	}

	get baseItem(): BaseItem {
		return this._baseItem;
	}
}