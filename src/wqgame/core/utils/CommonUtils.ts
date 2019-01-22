/**
 * 通用工具类
 */
class CommonUtils extends BaseClass {
	public constructor() {
		super();
	}

	private _token: number = 0;
	public get Token(): number {
		return this._token++;
	}

    /**
     * 锁屏
     */
	public lock(): void {
		var stage: egret.Stage = App.Stage.getStage();
		stage.$children.forEach(child => {
			if (child instanceof egret.DisplayObjectContainer) {
				child.touchEnabled = child.touchChildren = false;
			}
		})
	}

    /**
     * 解屏
     */
	public unlock(): void {
		var stage: egret.Stage = App.Stage.getStage();
		stage.$children.forEach(child => {
			if (child instanceof egret.DisplayObjectContainer) {
				child.touchEnabled = child.touchChildren = true;
			}
		})
	}

    /**
     * 万字的显示
     * @param label
     * @param num
     */
	public labelIsOverLenght = function (label, num) {
		var str = null;
		if (num < 100000) {
			str = num;
		}
		else if (num < 1000000) {
			str = Math.floor(num / 1000 / 10).toString() + "万";
		}
		else {
			str = Math.floor(num / 10000).toString() + "万";
		}
		label.text = str;
	};

}
