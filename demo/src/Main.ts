/**
 * 入口文件
 */
class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        if (!DEBUG) {
            egret.lifecycle.addLifecycleListener((context) => {
                // custom lifecycle plugin

                context.onUpdate = () => {

                };
            });
            egret.lifecycle.onPause = () => {
                egret.ticker.pause();
            };

            egret.lifecycle.onResume = () => {
                egret.ticker.resume();
            };
        }

        this.runGame().catch(e => {
            console.log(e);
        });
    }

    private _demoEntry: DemoEntry;

    private async runGame() {
        await this.loadResource();
        await platform.login();
        const userInfo = await platform.getUserInfo();

        this.stage.addChild(fgui.GRoot.inst.displayObject);
        fgui.GRoot.inst.displayObject.name = '_main';//添加到stage中的fgui顶级容器
        this._demoEntry = new DemoEntry();
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        } catch (e) {
            console.error(e);
        }
    }
}