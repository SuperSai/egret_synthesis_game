class Monster extends BaseRole {

	/** 怪物唯一ID */
	private _id: number;
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
	private _bone: BoneAnimation;
	private _isMove: boolean = false;
	private _monsterVO: MonsterVO;
	private _monsterInfo: MonsterInfo;

	public constructor($controller: BaseController, $layer: number) {
		super($controller, $layer);
		this._id = App.CommonUtils.Token;
		this._battleController = <BattleController>$controller;
	}

	/** 更新数据 */
	public onUpdate(passTime: number): void {
		if (!this._isMove) return;
		this.move(passTime);
	}

	/** 怪物移动 */
	private move(passTime: number): void {
		let self = this;
		if (self._path.length == 0) return;
		let point: egret.Point = self._path[0];  //下一个节点
		let targetSpeed: egret.Point = App.CommonUtils.getSpeed(point, new egret.Point(self.x, self.y), self._monsterVO.speed);
		let xDistance: number = 10 * targetSpeed.x;
		let yDistance: number = 10 * targetSpeed.y;
		if (Math.abs(point.x - self.x) <= Math.abs(xDistance) && Math.abs(point.y - self.y) <= Math.abs(yDistance)) {
			self.x = point.x;
			self.y = point.y;
			self._path.shift();
			//已经达到终点
			if (self._path.length == 0) {
				self._battleController.applyFunc(BattleConst.MONSTER_MOVE_END);
				self.removeSelf();
				return;
			}
			self.setDirection(self._path[0]);
		}
		else {
			self.x = self.x + xDistance;
			self.y = self.y + yDistance;
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
		let self = this;
		self._monsterInfo = info;
		self._monsterVO = self._monsterInfo.monsterVO;
		self._hp = self._monsterVO.maxHp
		self._path = [];

		for (let i: number = 0; i < info.path.length; i++) {
			let pos: string[] = info.path[i].split(",");
			self._path.push(new egret.Point(Number(pos[0]), Number(pos[1])));
		}

		self._bone = ResourcePool.Instance.pop(self._monsterVO.assetname, ResourcePool.SKE);
		self._bone.play();
		self.addChild(self._bone);

		self.x = self._path[0].x;
		self.y = self._path[0].y;
		self.setDirection(self._path[1]);
		self._isMove = true;
	}

	/** 移除自己 */
	private removeSelf(): void {
		let self = this;
		(<BattleModel>self._battleController.getModel()).monsterDic.Remove(self._id);
		self._isMove = false;
		self._path = [];
		ObjectPool.push(self._monsterInfo);
		ObjectPool.push(self);
		ResourcePool.Instance.push(self._bone, ResourcePool.SKE);
		App.DisplayUtils.removeFromParent(self);
	}

	/** 获取怪物唯一ID */
	get ID(): number {
		return this._id;
	}

	/** 设置怪物当前血量值 */
	set HP(value: number) {
		let self = this;
		self._hp = value;
		if (self._hp <= 0) {
			self._battleController.applyFunc(BattleConst.MONSTER_DIE);
			self.removeSelf();
			App.EffectUtils.bombEffect(self.localToGlobal(), self);
		}
	}

	/** 设置怪物当前血量值 */
	get HP(): number {
		return this._hp;
	}

	get point(): egret.Point {
		return new egret.Point(this.x, this.y);
	}

}