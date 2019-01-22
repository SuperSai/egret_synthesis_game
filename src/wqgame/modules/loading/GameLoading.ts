/**
 *	small loading
 */
class GameLoading extends BaseClass {

	private _content: egret.Sprite;
	private _uiContainer: egret.DisplayObjectContainer;
	private _img: egret.Bitmap;
	private _text: egret.TextField;
	private _symbol: string = "";

	constructor() {
		super();
		this.init();
	}

	private init(): void {
		this._content = new egret.Sprite();
		this._content.graphics.beginFill(0x000000, 0.2);
		this._content.graphics.drawRect(0, 0, App.Stage.getWidth(), App.Stage.getHeight());
		this._content.graphics.endFill();
		this._content.touchEnabled = true;

		this._uiContainer = new egret.DisplayObjectContainer();
		this._uiContainer.x = this._content.width * 0.5;
		this._uiContainer.y = this._content.height * 0.5;
		this._content.addChild(this._uiContainer);

		this._img = new egret.Bitmap();
		this._img.texture = RES.getRes("loading_player_png");
		this._img.x = -this._img.width * 0.5 - 80;
		this._img.y = -this._img.height * 0.5;

		this._text = new egret.TextField();
		this._text.stroke = 2;
		this._text.strokeColor = 0x946430;
		this._text.fontFamily = "Microsoft YaHei";
		this._text.size = 28;
		this._text.x = -this._text.width * 0.5;
		this._text.y = -this._text.height * 0.5 + 40;
		this._text.text = "客官亲稍等...";
		
		this._uiContainer.addChild(this._img);
		this._uiContainer.addChild(this._text);
	}

	public showLoading(): void {
		App.Stage.getStage().addChild(this._content);
		App.TimerMgr.doFrame(20, 0, this.enterFrame, this);
	}

	public hideLoading(): void {
		if (this._content && this._content.parent) {
			App.Stage.getStage().removeChild(this._content);
		}
		App.TimerMgr.remove(this.enterFrame, this);
	}

	private enterFrame(time: number) {
		this._text.text = "客官亲稍等" + this._symbol;
		this._symbol += ".";
		if (this._symbol.length > 3) {
			this._symbol = "";
		}
	}
}
