/** 
 * 怪物死掉后掉落的物品
 */
class DropItem extends BaseSpriteView {

	private _itemImg: eui.Image;
	private _itemVO: ItemVO;

	public constructor($controller: BaseController, $layer: number) {
		super($controller, $layer);
	}

	public initItem(itemId: number, pos: egret.Point): void {
		this._itemVO = GlobleData.getData(GlobleData.ItemVO, itemId);
		if (this._itemVO) {
			let path: string = PathConfig.ItemPath.replace("{0}", this._itemVO.icon);
			this._itemImg = new eui.Image(path);
			this.addChild(this._itemImg);
			this.x = pos.x - 5;
			this.y = pos.y - 20;
			this.addEvents();
			App.TimerMgr.doTimer(3000, 1, this.onClickItem, this);
		} else {
			this.removeSelf();
		}
	}

	public addEvents(): void {
		super.addEvents();
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClickItem, this);
	}

	public removeEvents(): void {
		super.removeEvents();
		this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClickItem, this);
	}

	private onClickItem(): void {
		switch (this._itemVO.itemId) {
			case ITEM_TYPE.GOLD:
				App.NotificationCenter.dispatch(CommonEvent.UPDATE_CURRENCY, 1000, ITEM_TYPE.GOLD);
				break;
			case ITEM_TYPE.DIAMOND:
				App.NotificationCenter.dispatch(CommonEvent.UPDATE_CURRENCY, 1000, ITEM_TYPE.DIAMOND);
				break;
		}
		this.removeSelf();
	}

	private removeSelf(): void {
		this.destroy();
		this._itemImg = null;
		this._itemVO = null;
		App.Display.removeFromParent(this);
	}
}