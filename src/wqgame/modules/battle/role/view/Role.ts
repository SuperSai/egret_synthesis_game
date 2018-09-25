class Role extends BaseRole {

	private _roleId: number;
	private _roleImg: eui.Image;
	private _baseItem: BaseItem; // 角色当前对应的底座
	private lastTime: number = 0;
	private _model: BattleModel;
	private _heroVO: HeroVO;
	private _isMove: boolean = false;

	public constructor($controller: BaseController, $layer: number) {
		super($controller, $layer);
		let self = this;
		self.touchChildren = self.touchEnabled = false;
		self._model = <BattleModel>self.controller.getModel();
	}

	/** 面板开启执行函数，用于子类继承 */
	public open(...param: any[]): void {
		super.open(param);
		let self = this;
		self._roleId = param[0];
		self._heroVO = GlobleVOData.getData(GlobleVOData.HeroVO, self._roleId);
		self.initRole();
	}

	/** 初始化角色 */
	private initRole(): void {
		let self = this;
		App.DisplayUtils.removeFromParent(self._roleImg);
		self._roleImg = new eui.Image(self._heroVO.assetname);
		self.addChild(self._roleImg);
	}

	public onUpdate(passTime: number): void {
		super.onUpdate(passTime);
		if (this._isMove) return;
		this.searchTarget();
	}

	/** 设置坐标点 */
	public setPosition($x: number, $y: number): void {
		let self = this;
		self.x = $x;
		self.y = $y;
	}

	/** 选择攻击目标 */
	private searchTarget(): void {
		let self = this;
		let monsters: Monster[] = this._model.monsterDic.getValues();
		for (let i: number = 0; i < monsters.length; i++) {
			if (App.MathUtils.getDistance(this.x, this.y, monsters[i].x, monsters[i].y) <= self._heroVO.distance) {
				self.createBullet(monsters[i]);
				break;
			}
		}
	}

	/** 创建子弹 */
	private createBullet(monster: Monster): void {
		let nowTime: number = egret.getTimer();
		if (nowTime > this.lastTime) {
			this.lastTime = nowTime + this._heroVO.delay;//下次执行时间
			this.controller.applyFunc(BattleConst.ROLE_ATTACK, this._heroVO.bulletId, this.x, this.y, monster);
		}
	}

	/** 重置 */
	public reset(): void {
		let self = this;
		self._baseItem = null;
	}

	set heroVO(value: HeroVO) {
		this._heroVO = value;
	}

	get heroVO(): HeroVO {
		return this._heroVO;
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

	set isMove(value: boolean) {
		this._isMove = value;
	}
	/** 是否在移动合成中 */
	get isMove(): boolean {
		return this._isMove;
	}
}