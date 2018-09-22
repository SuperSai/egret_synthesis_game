class BaseEuiAlert extends BaseEuiView {

	public maskRect: eui.Rect;
	public btn_close: eui.Group;
	public offsetX: number = 0;
	public offsetY: number = 0;
	public offsetW: number = 0;
	public offsetH: number = 0;
	public isDispose: boolean = false;
	protected isMaskTouch: boolean = true;

	public constructor($controller: BaseController, $layer: number, $skinName: string) {
		super($controller, $layer);
		this.skinName = $skinName;
	}

	/** 对面板进行显示初始化，用于子类继承 */
	public initUI(): void {
		super.initUI();
		let self = this;
		self.isDispose = false;
		self.onDisplayResizeHandler();
		if (!self.maskRect) {
			self.maskRect = self.getMask(0.7);
		}
		App.LayerManager.addToLayer(self.maskRect, LayerManager.GAME_UI_LAYER);
		self.anchorOffsetY = App.StageUtils.getHeight();
		this.x = (App.StageUtils.getWidth() - this.width) >> 1;
		this.y = (App.StageUtils.getHeight() - this.height) >> 1;
		App.LayerManager.addToLayer(self, LayerManager.GAME_POP_LAYER);
		egret.Tween.get(self).to({ anchorOffsetY: 0 }, 300).call(() => {
			egret.Tween.removeTweens(self);
		});
	}

	public addEvents(): void {
		super.addEvents();
		let self = this;
		self.isMaskTouch && self.maskRect && self.maskRect.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onMaskHandler, self);
		self.btn_close && self.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosePanel, self);
		self.addEventListener(egret.Event.RESIZE, self.onDisplayResizeHandler, self);
	}

	public removeEvents(): void {
		super.removeEvents();
		let self = this;
		self.btn_close && self.btn_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosePanel, self);
		self.isMaskTouch && self.maskRect && self.maskRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onMaskHandler, self);
		self.removeEventListener(egret.Event.RESIZE, self.onDisplayResizeHandler, self);
	}

	protected onMaskHandler() {
		let self = this;
		App.ViewManager.closeView(self);
	}

	protected onClosePanel(): void {
		let self = this;
		App.ViewManager.closeView(self);
	}

	protected onDisplayResizeHandler() {
		let self = this;
		self.x = ((App.StageUtils.getWidth() - (self.width - self.offsetW)) >> 1) + self.offsetX;
		self.y = ((App.StageUtils.getHeight() - (self.height - self.offsetH)) >> 1) + self.offsetY;
	}

	/** 创建遮罩 */
	protected getMask(maskAlpha) {
		let rect = new eui.Rect();
		rect.touchEnabled = true;
		rect.percentWidth = 100;
		rect.percentHeight = 100;
		rect.fillColor = 0x0;
		rect.fillAlpha = maskAlpha;
		return rect;
	}
}