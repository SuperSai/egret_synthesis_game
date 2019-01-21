class BattleModel extends BaseModel {

	//关卡表模板数据
	private _levelVO: LevelVO;
	//出战的角色字典
	private _roleDic: TSDictionary<BaseItem, Role>;
	//出战的怪物字典
	private _monsterDic: TSDictionary<number, Monster>;
	//子弹的字典
	private _bulletDic: TSDictionary<number, BaseBullet>;

	/** 当前的关卡等级 */
	public currMission: number = 1;
	/** 当前游戏中最高级的角色ID */
	public maxRoleId: number = 0;
	/** 一排的底座数量 */
	public hBaseItemCount: number = 4;
	/** 当前在第几波 */
	public currwaveNum: number = 1;
	/** 当前波数的怪物数量 */
	public currMonsterCount: number = 0;
	/** 最大波数的怪物数量 */
	public maxMonsterCount: number;
	/** 最大的底座数量 */
	public maxBaseCount: number = 0;
	/** 底座的高度 */
	public baseH: number = 96;
	/** 战斗怪物状态 */
	public battleMonsterState: number = BATTLE_MONSTER_STATE.PAUSE;

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
		self._bulletDic = new TSDictionary<number, BaseBullet>();
	}

	/** 获取当前波数的怪物数量 */
	get monsterWaveNumCount(): number {
		if (this._levelVO.monsterCount.length <= 1) {
			return this._levelVO.monsterCount[0];
		}
		return this._levelVO.monsterCount[this.currwaveNum - 1];
	}

	/** 获取所有底座的状态 */
	get allBaseState(): any[] {
		let self = this;
		let lists: any[] = [];
		for (let i: number = self.maxBaseCount; i > 0; i--) {
			if (i > self._levelVO.openBaseCount) {
				lists.push(BASE_STATE.CLOSE);
			} else {
				lists.push(BASE_STATE.OPEN);
			}
		}
		return lists;
	}

	set levelVO(value: LevelVO) {
		this._levelVO = value;
	}
	/** 关卡表模板数据 */
	get levelVO(): LevelVO {
		return this._levelVO;
	}

	set roleDic(value: TSDictionary<BaseItem, Role>) {
		this._roleDic = value;
	}
	/** 出战的角色字典 */
	get roleDic(): TSDictionary<BaseItem, Role> {
		return this._roleDic;
	}

	set monsterDic(value: TSDictionary<number, Monster>) {
		this._monsterDic = value;
	}
	/** 出战中的怪物字典 */
	get monsterDic(): TSDictionary<number, Monster> {
		return this._monsterDic;
	}

	set bulletDic(value: TSDictionary<number, BaseBullet>) {
		this._bulletDic = value;
	}
	/** 子弹的字典 */
	get bulletDic(): TSDictionary<number, BaseBullet> {
		return this._bulletDic;
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

/** 战斗中的出怪状态 */
enum BATTLE_MONSTER_STATE {
	/** 出小怪 */
	MONSTER,
	/** 出BOSS怪 */
	BOSS,
	/** 暂停出怪 */
	PAUSE,
}