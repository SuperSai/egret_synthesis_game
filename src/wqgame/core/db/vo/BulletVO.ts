class BulletVO {

	public id: number;
	/** 资源名称（类型） */
	public assetname: string;
	/** 延迟 */
	public delay: number;
	/** 伤害 */
	public damage: number;
	/** 初始速度 */
	public speed: number;
	/** 加速度 */
	public accSpeed: number;
	/** 爆炸动画 */
	public bombAni: string;
	/** 与敌人距离 */
	public radius: number;
	/** 子弹销毁音效 */
	public dieSound: string;
	/** 子弹发射音效 */
	public startSound: string;
}