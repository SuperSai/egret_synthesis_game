/**
 * 关卡表数据
 */
class LevelVO {

	/** 地图ID */
	public mapId: number;
	/** 地图的Icon */
	public icon: number;
	/** 波数 */
	public waveNum: number;
	/** 数量范围 */
	public range: number;
	/** 开放的底座数量 */
	public openBaseCount: number;
	/** 最大的底座数量 */
	public maxBaseCount: number;
	/** 每波怪之间延迟 */
	public waveNumDelay: number;
	/** 刷怪延迟 */
	public monsterDelay: number;
	/** 底座宽度 */
	public baseW: number;
	/** 底座高度 */
	public baseH: number;


	private _path: string[];
	set path(value) {
		this._path = ObjectUtils.splitToString(value, "#");
	}
	/** 地图行走路径 */
	get path(): string[] {
		return this._path;
	}

	private _monsterNumRange: number[];
	set monsterNumRange(value) {
		this._monsterNumRange = ObjectUtils.splitToNumber(value);
	}
	/** 怪物数量范围 */
	get monsterNumRange(): number[] {
		return this._monsterNumRange;
	}

	private _monstersId: number[];
	set monstersId(value) {
		this._monstersId = ObjectUtils.splitToNumber(value);
	}
	/** 出怪物ID */
	get monstersId(): number[] {
		return this._monstersId;
	}
}