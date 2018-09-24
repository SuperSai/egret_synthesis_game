class BattleModel extends BaseModel {

	//关卡模板数据
	private _levelVO: LevelVO;
	//出战的角色字典
	private _roleDic: TSDictionary<BaseItem, Role>;
	//出战的怪物字典
	private _monsterDic: TSDictionary<number, Monster>;

	/** 当前的关卡等级 */
	public currMission: number = 1;
	/** 开放的底座数量 */
	public openBaseCount: number = 6;
	/** 最大的底座数量 */
	public maxBaseCount: number = 12;
	/** 当前游戏中最高级的角色ID */
	public maxRoleId: number = 0;
	/** 一排的底座数量 */
	public hBaseItemCount: number = 3;
	/** 底座的宽度 */
	public baseW: number = 120;
	/** 底座的高度 */
	public baseH: number = 120;

	public constructor($controller: BaseController) {
		super($controller)
		let self = this;
		self.init();
	}
	/** 初始化 */
	private init(): void {
		let self = this;
		self._roleDic = new TSDictionary<BaseItem, Role>();
		self._monsterDic = new TSDictionary<number, Monster>();
	}

	set LevelVo(value: LevelVO) {
		this._levelVO = value;
	}
	/** 关卡模板信息 */
	get LevelVo(): LevelVO {
		return this._levelVO;
	}

	set RoleDic(value: TSDictionary<BaseItem, Role>) {
		this._roleDic = value;
	}
	/** 出战的角色字典 */
	get RoleDic(): TSDictionary<BaseItem, Role> {
		return this._roleDic;
	}

	set MonsterDic(value: TSDictionary<number, Monster>) {
		this._monsterDic = value;
	}
	/** 出战中的怪物字典 */
	get MonsterDic(): TSDictionary<number, Monster> {
		return this._monsterDic;
	}
}

/** 底座的状态 */
enum BASE_STATE {
	/** 关闭状态 */
	CLOSE,
	/** 开启状态 */
	OPEN,
	/** 拥有角色状态 */
	HAVE,
}

/** 怪物的方向 */
enum MONSTER_DIR {
	/** 朝下 */
	DOWN,
	/** 朝上 */
	UP,
	/** 朝左 */
	RIGHT,
	/** 朝右 */
	LEFT
}