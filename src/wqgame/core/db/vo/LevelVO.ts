/**
 * 关卡表数据
 */
class LevelVO {

	/** 关卡ID */
	public missionId: number;
	/** 地图的Icon */
	public icon: number;
	/** 波数 */
	public waveNum: number;
	/** BOSSId */
	public bossId: number;
	/** 开放的底座数量 */
	public openBaseCount: number;
	/** 每波怪之间延迟 */
	public waveNumDelay: number;
	/** 刷怪延迟 */
	public monsterDelay: number;

	private _path: string[];
	set path(value) {
		this._path = ObjectUtils.splitToString(value, "#");
	}
	/** 地图行走路径 */
	get path(): string[] {
		return this._path;
	}

	private _monsterCount: number[];
	set monsterCount(value) {
		this._monsterCount = ObjectUtils.splitToNumber(value);
	}
	/** 每波怪物数量 */
	get monsterCount(): number[] {
		return this._monsterCount;
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