/**
 * 排列工具类
 */
class AlignUtils extends BaseClass {

	/** 把现实对象设置到屏幕水平居中，垂直居中的位置上 */
	public setToScreenCenter(display: egret.DisplayObjectContainer): void {
		display.x = (App.Stage.getWidth() - display.width) * 0.5;
		display.y = (App.Stage.getHeight() - display.height) * 0.5;
	}

	/** 把现实对象设置到屏幕水平居中，垂直在0.618的黄金分割点位置上 */
	public setScreenGoldenDivision(display: egret.DisplayObjectContainer): void {
		display.x = (App.Stage.getWidth() - display.width) * 0.5;
		display.y = (App.Stage.getHeight() - display.height) * 0.382;
	}
}
