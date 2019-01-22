/**
 * 人物信息管理类
 */
class PlayerMgr extends BaseClass {

	private _info: PlayerInfo;

	public constructor() {
		super();
	}

	public setup(): void {
		this._info = new PlayerInfo();
	}




	public get info(): PlayerInfo { return this._info; }
	public set info(value: PlayerInfo) { this._info = value; }
}

enum ITEM_TYPE {
	/** 金币 */
	GOLD = 1,
	/** 钻石 */
	DIAMOND = 2,
}