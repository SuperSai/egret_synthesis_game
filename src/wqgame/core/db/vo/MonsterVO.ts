class MonsterVO {

	/** 唯一ID */
	public id: number;
	/** 骨骼动画资源的名称 */
	public assetname: string;
	/** 速度 */
	public speed: number;
	/** 每帧加速度 */
	public accSpeed: number;
	/** 怪物类型 */
	public type: number;
	/** 怪物最大血量 */
	public maxHp: number;
	/** 爆炸动画 */
	public bombAni: string;
	/** 怪物出生音效 */
	public bornSound: string;
	/** 怪物死亡音效 */
	public dieSound: string;
	/** 掉落库ID */
	public dropID: number;
	/** 掉落物品次数 */
	public dropCount: number;
}