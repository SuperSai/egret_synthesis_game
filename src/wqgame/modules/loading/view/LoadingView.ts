/**
 * smallLoading
 */
class LoadingView extends BaseEuiAlert {

	private txtMsg: eui.Label;

	public constructor($controller: BaseController, $layer: number, $skinName: string) {
		super($controller, $layer, $skinName, 0);
		this.isMaskTouch = false;
		this.setResources(["loading"]);
	}

	public setProgress(current: number, total: number): void {
		this.txtMsg.text = "客官亲稍等..." + current + "/" + total;
	}
}