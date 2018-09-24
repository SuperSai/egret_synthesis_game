class Monster extends BaseRole {

	/** 怪物唯一ID */
	private _id: number;
	/** 怪物类型 */
	public type: number;
	/** 移动速度 */
	public moveSpeed: number;
	/** 血量 */
	private _hp: number;
	/** 最大血量 */
	public hpMax: number;
	/** 攻击力 */
	public attack: number;
	/** 方向 -- 默认朝上*/
	private _direction: number = MONSTER_DIR.UP;
	/** 行走路径 */
	private _path: egret.Point[];
	private _battleController: BattleController;

	public constructor($controller: BaseController, $layer: number) {
		super($controller, $layer);
		this._id = App.CommonUtils.Token;
		this._battleController = <BattleController>$controller;
	}

	/** 更新数据 */
	public update(passTime: number): void {
		this.move(passTime);
	}

	private move(passTime: number): void {

		if (this._path.length == 0) return;

		var point: egret.Point = this._path[0];  //下一个节点

		var targetSpeed: egret.Point = App.CommonUtils.getSpeed(point, new egret.Point(this.x, this.y), this.moveSpeed);
		var xDistance: number = 10 * targetSpeed.x;
		var yDistance: number = 10 * targetSpeed.y;

		if (Math.abs(point.x - this.x) <= Math.abs(xDistance) && Math.abs(point.y - this.y) <= Math.abs(yDistance)) {

			this.x = point.x;
			this.y = point.y;
			this._path.shift();

			if (this._path.length == 0) {
				this._battleController.applyFunc(BattleConst.MONSTER_MOVE_END);
				(<BattleModel>this._battleController.getModel()).MonsterDic.Remove(this._id);
				ObjectPool.push(this);
				App.DisplayUtils.removeFromParent(this);
				return;
			}
			else {
				this.setDirection(this._path[0]);
			}
		}
		else {
			this.x = this.x + xDistance;
			this.y = this.y + yDistance;
		}

	}

	/**
	* 设定朝向
	* @param p:要朝向的点
	*/
	public setDirection(p: egret.Point): void {
		let xNum: number = p.x - this.x;
		let yNum: number = p.y - this.y;
		let tempDirection: number = MONSTER_DIR.UP;
		if (xNum == 2 || yNum == 1) {
			if (yNum > 0) {
				tempDirection = MONSTER_DIR.DOWN;
			}
			if (yNum < 0) {
				tempDirection = MONSTER_DIR.UP;
			}
		}
		if (yNum == 2 || yNum == 1) {
			if (xNum > 0) {
				tempDirection = MONSTER_DIR.LEFT;
			}
			if (xNum < 0) {
				tempDirection = MONSTER_DIR.RIGHT;
			}
		}
		//如果怪物的方向改变了
		if (tempDirection != this._direction) {
			this._direction = tempDirection;
			this.changeMonsterDir();
		}
		return;
	}

	/** 改变怪物的方向 */
	private changeMonsterDir(): void {

	}

	/** 解析数据 */
	public Parse(info: MonsterInfo): void {
		this._hp = info.hp
		this.hpMax = info.hp;
		this.moveSpeed = info.moveSpeed;
		this.type = info.type;
		this._path = [];

		for (var i: number = 0; i < info.path.length; i++) {
			let pos: string[] = info.path[i].split(",");
			this._path.push(new egret.Point(parseInt(pos[0]), parseInt(pos[1])));
		}

		let num: number = App.RandomUtils.randrange(0, 6);
		let img: eui.Image = new eui.Image("role_" + num);
		this.addChild(img);

		this.x = this._path[0].x;
		this.y = this._path[0].y;
		this.setDirection(this._path[1]);
	}

	get ID(): number {
		return this._id;
	}
}