const { ipcRenderer } = require("electron");
const path = require("path");
class Plugin {
  #ctx;
  constructor(ctx) {
    this.#ctx = ctx;
  }

  init() {
    const focusButton = document.querySelector("#focus");
    if (focusButton) {
      const button = document.createElement("div");
      button.id = "palert";
      button.className = "nav-bar-location";
      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" version="1.1" x="0px" y="0px" viewBox="0 0 256 256" enable-background="new 0 0 256 256" xml:space="preserve">
          <g><g><path d="M205.9,106.5L205.9,106.5c-3.6,0-6.7,2.1-8.1,5.2l-9.7,21.8L165,78.3c-1.3-3.2-4.5-5.5-8.2-5.5c-3.8,0-7.1,2.4-8.3,5.8l-26.8,78L82.9,38.2c-1-3.8-4.5-6.5-8.5-6.5c-4,0-7.3,2.6-8.5,6.2l-27.7,81.9H10v27.4c0,0,41.8,0,41.9,0c4.1,0,7.5-2.8,8.5-6.5L72,105.5l-3.3-25.9l43.3,138.6c1.2,3.5,4.5,6.1,8.4,6.1c3.9,0,7.2-2.5,8.4-6l0,0l27.6-78.8l-6.1-25.5l29.2,69.1c1.3,3.2,4.5,5.4,8.2,5.4s6.8-2.2,8.2-5.4l20.5-45.9l-4.2-3.4H246v-27.4L205.9,106.5z" fill="currentColor"/></g></g>
        </svg>`;
      focusButton.insertAdjacentElement("afterend", button);
    }
  }

  addClickEvent() {
    const { info } = this.#ctx;
    const button = document.querySelector("#palert");
    button.addEventListener("click", () => {
      // console.log(__dirname, "palert.html");
      ipcRenderer.send("open-plugin-window", {
          pluginId: "palert",
          htmlPath: `${info.pluginDir}/palert/palert.html`,
          options: {
            width          : 784,
            height         : 561,
            minWidth       : 784,
            minHeight      : 561,
            frame          : true,
            resizable      : false,
            webPreferences : {
              nodeIntegration  : true,
              contextIsolation : false,
            },
            title: "P-Alert",
          },
      });
    });
  }

  onLoad() {
    this.init();
    this.addClickEvent();
  }
}

module.exports = Plugin;
