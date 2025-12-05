// 默认地址（当用户未设置时）
const DEFAULT_URL = "http://10.0.0.1:8080/";

// 读取设置并跳转（或在 iframe 中加载）
chrome.storage.sync.get({ startUrl: DEFAULT_URL }, (items) => {
    const url = items.startUrl || DEFAULT_URL;
    // 安全：只在同源安全或用户允许的情况下使用 iframe，
    // 否则直接跳转 window.location.href = url
    // 为了兼容更多网站，采用直接跳转（替换当前 newtab）
    try {
        // 使用 location.replace 避免后退历史记录
        window.location.replace(url);
    } catch (e) {
        // 如果出错，展示一个简单的链接作为回退
        const c = document.getElementById("container");
        c.innerHTML = `<div class="fallback">无法直接跳转。<a href="${url}" target="_blank" rel="noopener">点击打开：${url}</a></div>`;
    }
});