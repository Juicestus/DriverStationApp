import { app, BrowserWindow } from "electron";
import * as path from "path";
import minimist from "minimist";
import { fork, ChildProcess } from "child_process";
import { AppWindowType, Position } from "./common";

class Main {
  constructor() {
    app.on("will-quit", this.onAppWillQuit);
    app.on("quit", this.onAppQuit);
    this.init();
  }

  private _server!: ChildProcess;

  private init = async (): Promise<void> => {

    // TODO: create app args type for validation
    const args = minimist(process.argv.slice(2), {
      default: { 
        "ntServerAddress": "127.0.0.1",
        "ntServerPort": 5810 
      }
    });

    this._server = fork(path.join(__dirname, "server/main.js"), [ `--ntServerAddress=${ args.ntServerAddress }`, `--ntServerPort=${ args.ntServerPort }` ]);

    await app.whenReady();

    this.createAppWindow(AppWindowType.HUD, { x: 0, y: 0 });
    this.createAppWindow(AppWindowType.DASHBOARD, { x: 30, y: 50 });
    this.createAppWindow(AppWindowType.DATA, { x: 60, y: 100 });

    if (!app.isPackaged) {
      const electronReload = (await import("electron-reload")).default;
      electronReload(path.join(__dirname, "ui"), { hardResetMethod: "exit" });
    }
  };

  private createAppWindow = (appWindowType: AppWindowType, position: Position): void => {
    const window = new BrowserWindow({
      title: `Driver Station - ${appWindowType}`,
      width: 1280,
      height: 720,
      x: position.x,
      y: position.y,
      backgroundColor: "#000000",
      webPreferences: { 
        webSecurity: false,
        nodeIntegration: true
      }
    });
    window.menuBarVisible = false;
    window.loadFile(
      path.join(__dirname, "ui/index.html"), 
      { query: { "appWindowType": appWindowType } }
    );
  };

  private onAppWillQuit = (): void => {
    this._server.disconnect();
  };

  private onAppQuit = (): void => {
    if (!app.isPackaged) {
      console.log("All windows closed and application exited. Press [ Ctrl+C ] to terminate process.");
    }
  };
}

new Main();