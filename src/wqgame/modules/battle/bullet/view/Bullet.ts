/**
 * 普通子弹
 */
class Bullet extends BaseBullet {

	private _id: number;
	private _target: Monster;
	private _bulletVO: BulletVO;
	private _bulletImg: egret.Bitmap;

	public constructor($controller: BaseController, $layer: number) {
		super($controller, $layer);
		this._id = App.Common.Token;
	}

	/** 设置子弹攻击的目标 */
	public setTarget(bulletId: number, currPos: { x: number, y: number }, $target: Monster): void {
		let self = this;
		self._bulletVO = GlobleData.getData(GlobleData.BulletVO, bulletId);
		self._target = $target;
		if (self._bulletImg) App.Display.removeFromParent(self._bulletImg);
		self._bulletImg = ObjectPool.pop(egret.Bitmap, "egret.Bitmap");
		self._bulletImg.texture = RES.getRes(self._bulletVO.assetname);
		self.addChild(self._bulletImg);

		self.x = currPos.x + (self._target.width >> 1) + (self._bulletImg.width >> 1);
		self.y = currPos.y + self._target.height;// + (self._bulletImg.height >> 1);
		App.Sound.playEffect(self._bulletVO.startSound);
		this.scaleX = this.scaleY = 0.6;
	}

	public onUpdate(): void {
		super.onUpdate();
		if (!this._bulletVO) return;
		this.move();
	}

	private move(): void {
		if (this._target.HP <= 0 || !this._target.IsMove) {
			this._target = null;
			this._bulletVO = null;
			this.release();
			return;
		}
		var distance: number = App.MathUtils.getDistance(this.point.x, this.point.y, this._target.Point.x, this._target.Point.y);
		if (distance <= this._bulletVO.radius) {
			this._target.HP = this._target.HP - this._bulletVO.damage;
			App.Effect.bombEffect(this._bulletVO.bombAni, this.localToGlobal(), this);
			App.Sound.playEffect(this._bulletVO.dieSound);
			this._target = null;
			this._bulletVO = null;
			this.release();
		}
		else {
			var targetSpeed: any = App.MathUtils.getSpeed(this._target.Point, this.point, this._bulletVO.speed);
			var xDistance: number = 10 * targetSpeed.x;
			var yDistance: number = 10 * targetSpeed.y;
			this.x = this.x + xDistance;
			this.y = this.y + yDistance;
		}
	}

	/** 释放 */
	private release(): void {
		let self = this;
		(<BattleModel>self.controller.getModel()).bulletDic.Remove(self._id);
		ObjectPool.push(self._bulletImg);
		ObjectPool.push(self);
		App.Display.removeFromParent(self._bulletImg);
		App.Display.removeFromParent(self);
	}

	get point(): { x: number, y: number } {
		return { x: this.x, y: this.y };
	}

	/** 子弹的唯一ID 不是 子弹表ID */
	get ID(): number {
		return this._id;
	}
}