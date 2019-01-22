class LayerMgr extends BaseClass {
	public constructor() {
		super();
	}
	public static TIP_LAYER: number = 0;
	public static POP_LAYER: number = 1;
	public static SCENE_POP_LAYER: number = 2;
	public static SCENE_UI_EFFECT_LAYER: number = 3;
	public static SCENE_UI_LAYER: number = 4;
	public static SCENE_BASE_LAYER: number = 5;
	public static GAME_POP_LAYER: number = 6;
	public static GAME_UI_LAYER: number = 7;
	public static GAME_EFFECT_LAYER: number = 8;
	public static GAME_MASCOT_LAYER: number = 10;
	public static GAME_MAP_LAYER: number = 9;

	private static layerCount: number = 11;
	private _layers: Object[] = [];

	private _sceneContainer: eui.UILayer = new eui.UILayer();
	private _gameContainer: eui.UILayer = new eui.UILayer();

	public get sceneContainer(): eui.UILayer {
		let self = this;
		return self._sceneContainer;
	}

	public get gameContainer(): eui.UILayer {
		let self = this;
		return self._gameContainer;
	}

	public setup(stage: egret.Stage): void {
		let self = this;
		this.createAllLayers();
		self._sceneContainer.touchThrough = true;
		self._gameContainer.touchThrough = true;

		stage.addChild(self._sceneContainer);
		stage.addChild(self.getLayerByType(LayerMgr.POP_LAYER));
		stage.addChild(self.getLayerByType(LayerMgr.TIP_LAYER));

		self._sceneContainer.addChild(self._gameContainer);
		self._sceneContainer.addChild(self.getLayerByType(LayerMgr.SCENE_BASE_LAYER));
		self._sceneContainer.addChild(self.getLayerByType(LayerMgr.SCENE_UI_LAYER));
		self._sceneContainer.addChild(self.getLayerByType(LayerMgr.SCENE_UI_EFFECT_LAYER));
		self._sceneContainer.addChild(self.getLayerByType(LayerMgr.SCENE_POP_LAYER));

		self._gameContainer.addChild(self.getLayerByType(LayerMgr.GAME_MAP_LAYER));
		self._gameContainer.addChild(self.getLayerByType(LayerMgr.GAME_EFFECT_LAYER));
		self._gameContainer.addChild(self.getLayerByType(LayerMgr.GAME_MASCOT_LAYER));
		self._gameContainer.addChild(self.getLayerByType(LayerMgr.GAME_UI_LAYER));
		self._gameContainer.addChild(self.getLayerByType(LayerMgr.GAME_POP_LAYER));
		stage.addEventListener(egret.Event.RESIZE, self.onStageResize, self);
	}

	private onStageResize(event: egret.Event): void {
		this.resize()
	}

	private createAllLayers(): void {
		for (let i: number = 0; i < LayerMgr.layerCount; i++) {
			let layer: DisplayLayer = this.createOnLayer(i);
			this._layers[layer.layerType] = layer;
		}
	}

	private createOnLayer(layerType: number): DisplayLayer {
		let layer: DisplayLayer = new DisplayLayer();
		layer.layerType = layerType;
		layer.touchThrough = true;
		return layer;
	}

	public addToLayer(display: egret.DisplayObject, layerType: number): void {
		let layer: DisplayLayer = this._layers[layerType] as DisplayLayer;
		layer.addChild(display);
	}

	public getLayerByType(layerType: number): DisplayLayer {
		return this._layers[layerType] as DisplayLayer;
	}

	public resize(): void {
		Log.trace("【 LayerManager 】stageResized-------------");
		let width: number = App.Stage.getWidth();
		let height: number = App.Stage.getHeight();
		for (let i: number = 0; i < this._layers.length; i++) {
			let layer: DisplayLayer = this._layers[i] as DisplayLayer;
			for (let i: number = 0; i < layer.numChildren; i++) {
				let child = layer.getChildAt(i);
				if (instanceOfIStageResizeable(child)) {
					child["resize"](width, height);
				}
			}
		}
	}
}