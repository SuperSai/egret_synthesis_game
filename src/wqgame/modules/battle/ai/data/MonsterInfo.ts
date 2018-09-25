class MonsterInfo {

	private _monsterVO: MonsterVO;
	public path: string[];// = ["368,1252", "370,981", "607,983", "588,232", "366,233", "368,110"];

	set monsterVO(value: MonsterVO) {
		this._monsterVO = value;
	}

	/** Monster表数据 */
	get monsterVO(): MonsterVO {
		return this._monsterVO;
	}
}