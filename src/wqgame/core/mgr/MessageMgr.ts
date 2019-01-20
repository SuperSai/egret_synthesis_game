
class MessageMgr extends BaseClass {

    private _textDisplayDic: TSDictionary<string, any> = new TSDictionary<string, any>();
    private _maxNum: number = 5;

    private _creatOneTextDisplay(): eui.Label {
        let label: eui.Label = ObjectPool.pop(eui.Label, "eui.Label");
        label.textColor = 0xFFFFFF;
        label.stroke = 3;
        label.strokeColor = 0x401303;
        label.size = 40;
        label.fontFamily = "黑体";
        label.horizontalCenter = 0;
        label.verticalCenter = 0;
        label.touchEnabled = false;
        label.width = App.Stage.getWidth();
        label.wordWrap = true;
        label.textAlign = "center";
        label.y = App.Stage.getHeight() / 2;
        return label;
    }

    public showText(message: string): void {
        let display: eui.Label = this.getOne(message);
        display.text = message;
        let messageObject: any = { display: display, isplaying: true };
        this._textDisplayDic.Add(message, messageObject);
        this.startAnimation(message, display);
    }

    private startAnimation(message: string, label: eui.Label): void {
        App.LayerMgr.addToLayer(label, LayerMgr.GAME_POP_LAYER);
        label.alpha = 1;
        egret.Tween.get(label).wait(1000).to({ alpha: 0 }, 1000);
        egret.Tween.get(label).to({ verticalCenter: -100 }, 2000).call(() => {
            egret.Tween.removeTweens(label);
            ObjectPool.push(label);
            label.alpha = 1;
            label.verticalCenter = 0;
            App.Display.removeFromParent(label);
            this.onAnimationComplete(message);
        })
    }

    public onAnimationComplete(message: string): void {
        let item: any = this._textDisplayDic.TryGetValue(message);
        if (item) {
            item.isplaying = false;
            this._textDisplayDic.Remove(message);
        }
    }

    public removeTips(): void {
        let self = this;
        for (let i: number = 0; i < self._textDisplayDic.GetLenght(); i++) {
            let data: any = self._textDisplayDic.getValueByIndex(i);
            data.display.parent && data.display.parent.removeChild(data.display);
            data.display.alpha = 1;
            data.display.verticalCenter = 0;
            delete data.display.$children;
        }
        self._textDisplayDic.clear();
    }

    private getOne(msg: string): eui.Label {
        return this._creatOneTextDisplay();
    }
}
