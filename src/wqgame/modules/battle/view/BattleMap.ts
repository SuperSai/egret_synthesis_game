/**
 * 战斗地图
 */
class BattleMap extends BaseEuiView {

	public mapImg: eui.Image;
	public pos_boss: eui.Image;
	public lists: eui.List;	// 所有底座列表

	private _arrColl: eui.ArrayCollection;
	private _model: BattleModel;
	private _battleController: BattleController;

	public constructor($controller: BaseController, $layer: number) {
		super($controller, $layer);
		this.skinName = SkinName.BattleMapSkin;
	}

	/** 面板开启执行函数，用于子类继承 */
	public open(...param: any[]): void {
		super.open(param);
		let self = this;
		self._model = param[0];
		self._battleController = param[1];
		self.init();
		self.initMap();
		self.addEvents();
		self.updateAllBaseItem();
	}
	/** 初始化 */
	private init(): void {
		let self = this;
		self._arrColl = new eui.ArrayCollection();
		self.lists.itemRenderer = BaseItem;
		self.lists.dataProvider = self._arrColl;
	}
	/** 初始化地图 */
	private initMap(): void {
		let self = this;
		let path: string = PathConfig.MapPath.replace("{0}", self._model.levelVO.icon + "");
		App.DisplayUtils.addAsyncBitmapToImage(path, self.mapImg);
	}

	public addEvents(): void {
		super.addEvents();
		let self = this;
		self.lists.addEventListener(eui.ItemTapEvent.ITEM_TAP, self.onItemTapHandler, self);
		self._battleController.registerFunc(BattleConst.CREATE_ROLE, self.onCreateRole, self);
		App.StageUtils.getStage().addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.onTouchBegin, self);
	}

	public removeEvents(): void {
		super.removeEvents();
		let self = this;
		self.lists.removeEventListener(eui.ItemTapEvent.ITEM_TAP, self.onItemTapHandler, self);
	}

	/** 创建角色 */
	private onCreateRole(roleId: number): void {
		let self = this;
		if (roleId < 0) return Log.traceError("角色ID错误：" + roleId);
		let len: number = self._model.roleDic.GetLenght();
		if (len >= self._model.openBaseCount) return App.MessageManger.showText(App.LanguageManager.getLanguageText("battle.txt.01"));
		while (len < self._model.openBaseCount) {
			//在可以放置的底座中随机一个
			let random: number = App.RandomUtils.randrange(self._model.maxBaseCount - self._model.openBaseCount, self._model.maxBaseCount);
			let baseItem: BaseItem = self.lists.getChildAt(random) as BaseItem;
			if (!self._model.roleDic.ContainsKey(baseItem) && baseItem.state == BASE_STATE.OPEN) {
				self._battleController.pushRoleToMap(roleId, baseItem);
				break;
			}
		}
	}

	/** 更新所有底座数据 */
	private updateAllBaseItem(): void {
		let self = this;
		self._arrColl.replaceAll(self._battleController.getAllBaseState());
	}

	/** 更新单个底座数据 */
	private updateSingleBaseItem(): void {
		let self = this;
	}
	private _selectRole: Role;
	private _oX: number;
	private _oY: number;
	/** 点击单个底座处理 */
	private onItemTapHandler(itemTap: eui.ItemTapEvent): void {
		let self = this;
		if (!itemTap) return;
		//当前点击的底座
		let baseItem: BaseItem = itemTap.itemRenderer as BaseItem;
		//不存在字典中，说明当前点击的底座上没有角色的存在
		if (!self._model.roleDic.ContainsKey(baseItem)) return;
		self._selectRole = self._model.roleDic.TryGetValue(baseItem);
		if (!self._selectRole) return Log.traceError("onItemTapHandler -- role在字典中获取错误，baseItemIndex:" + baseItem.itemIndex);
	}

	private onTouchBegin(evt: egret.TouchEvent): void {
		let self = this;
		if (!evt.target || !(evt.target instanceof BaseItem)) return;
		App.StageUtils.getStage().removeEventListener(egret.TouchEvent.TOUCH_BEGIN, self.onTouchBegin, self);
		App.StageUtils.getStage().addEventListener(egret.TouchEvent.TOUCH_MOVE, self.onTouchMove, self);
		App.StageUtils.getStage().once(egret.TouchEvent.TOUCH_END, self.onTouchEnd, self, true);
		self._selectRole = self._model.roleDic.TryGetValue(evt.target);
		self._oX = self._selectRole.x;
		self._oY = self._selectRole.y;
		self._selectRole.x = evt.stageX;
		self._selectRole.y = evt.stageY;
		//设置拿起来的角色层级一定是最高的
		let layer: DisplayLayer = App.LayerManager.getLayerByType(LayerManager.GAME_MAP_LAYER);
		layer.setChildIndex(self._selectRole, layer.numChildren);
	}

	private onTouchMove(evt: egret.TouchEvent): void {
		let self = this;
		self._selectRole.x = evt.stageX;
		self._selectRole.y = evt.stageY;
	}

	private onTouchEnd(evt: egret.TouchEvent): void {
		let self = this;
		App.StageUtils.getStage().removeEventListener(egret.TouchEvent.TOUCH_MOVE, self.onTouchMove, self);
		App.StageUtils.getStage().addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.onTouchBegin, self);
		let baseItem: BaseItem = evt.target;
		if (!(evt.target instanceof BaseItem) || !baseItem || baseItem.state == BASE_STATE.CLOSE || baseItem.hashCode == self._selectRole.baseItem.hashCode) {
			self._selectRole.x = self._oX;
			self._selectRole.y = self._oY;
			return;
		}
		if (baseItem.state == BASE_STATE.OPEN) {
			self.createRole(self._selectRole, baseItem, self._selectRole.roleId);
		} else if (baseItem.state == BASE_STATE.HAVE) {
			let role: Role = self._model.roleDic.TryGetValue(baseItem);
			let moveRole: Role = self._model.roleDic.TryGetValue(self._selectRole.baseItem);
			if (role.roleId == moveRole.roleId) {
				self._model.roleDic.Remove(moveRole.baseItem);
				moveRole.baseItem.state = BASE_STATE.OPEN;
				moveRole.reset();
				ObjectPool.push(moveRole);
				App.DisplayUtils.removeFromParent(moveRole);
				self.createRole(role, baseItem, role.roleId + 1);
			} else {
				self.createRole(role, self._selectRole.baseItem, role.roleId);
				self.createRole(self._selectRole, baseItem, self._selectRole.roleId);
			}
		}
	}

	private createRole(selectRole: Role, baseItem: BaseItem, roleId: number): void {
		let self = this;
		self._model.roleDic.Remove(selectRole.baseItem);
		selectRole.reset();
		ObjectPool.push(selectRole);
		App.DisplayUtils.removeFromParent(selectRole);
		self._battleController.pushRoleToMap(roleId, baseItem);
	}
}