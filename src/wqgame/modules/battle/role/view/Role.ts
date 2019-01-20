class Role extends BaseRole {

	private _roleId: number;
	private _roleImg: eui.Image;
	/** 角色当前对应的底座 */
	private _baseItem: BaseItem;
	private lastTime: number = 0;
	private _model: BattleModel;
	private _heroVO: HeroVO;
	/** 是否正在拖拽中 */
	private _isDrop: boolean = false;

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
		App.Display.removeFromParent(self._roleImg);
		self._roleImg = new eui.Image(self._heroVO.assetname);
		self.addChild(self._roleImg);
	}

	public onUpdate(passTime: number): void {
		super.onUpdate(passTime);
		if (this._isDrop) return;
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
			let monster: Monster = monsters[i];
			if (monster.HP > 0 && monster.isMove && App.MathUtils.getDistance(this.x, this.y, monster.x, monster.y) <= self._heroVO.distance) {
				self.createBullet(monster);
				break;
			}
		}
	}

	/** 创建子弹 */
	private createBullet(monster: Monster): void {
		let nowTime: number = egret.getTimer();
		if (monster.HP > 0 && monster.isMove && nowTime > this.lastTime) {
			this.lastTime = nowTime + this._heroVO.delay;//下次执行时间
			this.controller.applyFunc(BattleConst.ROLE_ATTACK, this._heroVO.bulletId, { x: this.x, y: this.y }, monster);
		}
	}

	/** 重置 */
	public reset(): void {
		let self = this;
		self._baseItem = null;
	}

	set heroVO(value: HeroVO) { this._heroVO = value; }
	/** 角色数据信息 */
	get heroVO(): HeroVO { return this._heroVO; }

	get roleImg(): eui.Image { return this._roleImg; }
	/** 角色ID */
	get roleId(): number { return this._roleId; }

	set baseItem(value: BaseItem) { this._baseItem = value; }
	/** 角色当前对应的底座 */
	get baseItem(): BaseItem { return this._baseItem; }

	set isDrop(value: boolean) { this._isDrop = value; }

	/** 是否在移动合成中 */
	get isDrop(): boolean { return this._isDrop; }
}