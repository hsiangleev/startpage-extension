const DEFAULT_URL = "https://www.bing.com/";
const input = document.getElementById("urlInput");
const saveBtn = document.getElementById("saveBtn");
const resetBtn = document.getElementById("resetBtn");

// 加载当前设置
chrome.storage.sync.get({ startUrl: DEFAULT_URL }, (items) => {
    input.value = items.startUrl || DEFAULT_URL;
});

// 简单的 URL 验证
function isValidUrl(s) {
    try {
        const u = new URL(s);
        return u.protocol === "http:" || u.protocol === "https:";
    } catch (e) {
        return false;
    }
}

saveBtn.addEventListener("click", () => {
    const v = input.value.trim();
    if (!isValidUrl(v)) {
        alert("请输入合法的 URL，必须以 http:// 或 https:// 开头。");
        return;
    }
    chrome.storage.sync.set({ startUrl: v }, () => {
        alert("已保存！");
    });
});

resetBtn.addEventListener("click", () => {
    chrome.storage.sync.set({ startUrl: DEFAULT_URL }, () => {
        input.value = DEFAULT_URL;
        alert("已恢复默认地址。");
    });
});