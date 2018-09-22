class BattleModel extends BaseModel {

	private _levelVO: LevelVO;

	public constructor($controller: BaseController) {
		super($controller)
	}

	set levelVO(value: LevelVO) {
		this._levelVO = value;
	}
	/** 关卡模板信息 */
	get levelVO(): LevelVO {
		return this._levelVO;
	}
}