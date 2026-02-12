const DEFAULT_URL = "http://192.168.31.41:8080/";
const urlEl = document.getElementById("url");
const openBtn = document.getElementById("openBtn");
const openOptions = document.getElementById("openOptions");

chrome.storage.sync.get({ startUrl: DEFAULT_URL }, (items) => {
    const url = items.startUrl || DEFAULT_URL;
    urlEl.textContent = url;
    openBtn.addEventListener("click", () => {
        chrome.tabs.create({ url });
    });
});

openOptions.addEventListener("click", (e) => {
    e.preventDefault();
    // 打开扩展的 options 页面
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL("options.html"));
    }
});