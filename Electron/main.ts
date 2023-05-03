import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";

async function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        minWidth: 800,
        height: 720,
        minHeight: 600,
        title: "Template",
        // icon: "../SimpleTest/public/vite.svg", 
        webPreferences: {
            preload: path.resolve(__dirname, "preload.ts"),
            devTools: false,
        },
        alwaysOnTop: true,
    });

    // await win.loadFile(__dirname + "./index.html");
    await win.loadURL(`file://${path.join(__dirname, "./index.html")}`);
    // await win.loadURL("http://localhost:3000/");

    setTimeout(() => {
        win.setAlwaysOnTop(false);
    }, 1000);

    ipcMain.handle("versions", () => {
        return {
            node: process.versions.node,
            chrome: process.versions.chrome,
            electron: process.versions.electron,
            version: app.getVersion(),
            name: app.getName(),
        }
    });
}

app.whenReady()
    .then(() => {
        createWindow();

        app.on("activate", () => {
            if (BrowserWindow.getAllWindows().length === 0) createWindow();
        });

        app.on("window-all-closed", () => {
            if (process.platform !== "darwin") app.quit();
        });
    });

    