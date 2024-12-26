// 创建右键菜单
chrome.runtime.onInstalled.addListener(() => {
    console.log('Creating context menus...');
    
    // JSON工具组
    chrome.contextMenus.create({
        id: "jsonGroup",
        title: "JSON工具",
        contexts: ["selection"]
    });

    chrome.contextMenus.create({
        id: "formatJSON",
        title: "JSON格式化",
        parentId: "jsonGroup",
        contexts: ["selection"]
    });

    chrome.contextMenus.create({
        id: "stringifyJSON",
        title: "JSON转字符串",
        parentId: "jsonGroup",
        contexts: ["selection"]
    });

    // Base64工具组
    chrome.contextMenus.create({
        id: "base64Group",
        title: "Base64工具",
        contexts: ["selection"]
    });

    chrome.contextMenus.create({
        id: "encodeBase64",
        title: "Base64编码",
        parentId: "base64Group",
        contexts: ["selection"]
    });

    chrome.contextMenus.create({
        id: "decodeBase64",
        title: "Base64解码",
        parentId: "base64Group",
        contexts: ["selection"]
    });

    // 时间工具组
    chrome.contextMenus.create({
        id: "timeGroup",
        title: "时间工具",
        contexts: ["selection"]
    });

    chrome.contextMenus.create({
        id: "timestampToDate",
        title: "时间戳转日期",
        parentId: "timeGroup",
        contexts: ["selection"]
    });

    chrome.contextMenus.create({
        id: "dateToTimestamp",
        title: "日期转时间戳",
        parentId: "timeGroup",
        contexts: ["selection"]
    });
});

// 显示结果弹窗
function showResultModal(text) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            func: (text) => {
                // 创建并显示弹窗
                const modal = document.createElement('div');
                modal.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                    z-index: 10000;
                    max-width: 80%;
                    max-height: 80%;
                    overflow: auto;
                `;

                // 添加标题
                const title = document.createElement('div');
                title.style.cssText = `
                    font-size: 16px;
                    font-weight: bold;
                    margin-bottom: 10px;
                    color: #4CAF50;
                `;
                title.textContent = '转换成功！';

                // 添加内容区域
                const content = document.createElement('div');
                content.style.cssText = `
                    margin: 15px 0;
                    padding: 10px;
                    background: #f5f5f5;
                    border-radius: 4px;
                    white-space: pre-wrap;
                    word-break: break-all;
                    max-height: 300px;
                    overflow-y: auto;
                    border: 1px solid #ddd;
                `;
                content.textContent = text;

                // 按钮容器
                const buttonContainer = document.createElement('div');
                buttonContainer.style.cssText = `
                    display: flex;
                    justify-content: flex-end;
                    gap: 10px;
                    margin-top: 15px;
                `;
                
                // 复制按钮
                const copyButton = document.createElement('button');
                copyButton.textContent = '复制';
                copyButton.style.cssText = `
                    padding: 5px 15px;
                    background: #4CAF50;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                `;
                
                // 关闭按钮
                const closeButton = document.createElement('button');
                closeButton.textContent = '关闭';
                closeButton.style.cssText = `
                    padding: 5px 15px;
                    background: #757575;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                `;
                
                buttonContainer.appendChild(copyButton);
                buttonContainer.appendChild(closeButton);
                
                modal.appendChild(title);
                modal.appendChild(content);
                modal.appendChild(buttonContainer);
                
                // 创建遮罩层
                const overlay = document.createElement('div');
                overlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.5);
                    z-index: 9999;
                `;
                
                document.body.appendChild(overlay);
                document.body.appendChild(modal);
                
                // 复制按钮事件
                copyButton.onclick = () => {
                    navigator.clipboard.writeText(text).then(() => {
                        copyButton.textContent = '已复制！';
                        copyButton.style.background = '#45a049';
                        setTimeout(() => {
                            copyButton.textContent = '复制';
                            copyButton.style.background = '#4CAF50';
                        }, 1500);
                    });
                };
                
                // 关闭按钮事件
                closeButton.onclick = () => {
                    document.body.removeChild(modal);
                    document.body.removeChild(overlay);
                };
                
                // 点击遮罩层也可以关闭
                overlay.onclick = () => {
                    document.body.removeChild(modal);
                    document.body.removeChild(overlay);
                };
            },
            args: [text]
        });
    });
}

// 显示错误弹窗
function showErrorModal(errorMessage) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            func: (message) => {
                const modal = document.createElement('div');
                modal.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                    z-index: 10000;
                `;

                const content = document.createElement('div');
                content.style.cssText = `
                    margin-bottom: 15px;
                    color: #ff4444;
                `;
                content.textContent = '错误: ' + message;
                
                const closeButton = document.createElement('button');
                closeButton.textContent = '关闭';
                closeButton.style.cssText = `
                    padding: 5px 15px;
                    background: #ff4444;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    float: right;
                `;
                
                modal.appendChild(content);
                modal.appendChild(closeButton);
                
                const overlay = document.createElement('div');
                overlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.5);
                    z-index: 9999;
                `;
                
                document.body.appendChild(overlay);
                document.body.appendChild(modal);
                
                closeButton.onclick = () => {
                    document.body.removeChild(modal);
                    document.body.removeChild(overlay);
                };
                
                overlay.onclick = () => {
                    document.body.removeChild(modal);
                    document.body.removeChild(overlay);
                };
            },
            args: [errorMessage]
        });
    });
}

// 处理右键菜单点击事件
chrome.contextMenus.onClicked.addListener((info, tab) => {
    const selectedText = info.selectionText;

    switch (info.menuItemId) {
        case "formatJSON":
            try {
                const formattedJSON = JSON.stringify(JSON.parse(selectedText), null, 2);
                showResultModal(formattedJSON);
            } catch (e) {
                showErrorModal('无效的JSON格式');
            }
            return;

        case "stringifyJSON":
            try {
                const parsedJSON = JSON.parse(selectedText);
                const stringified = JSON.stringify(parsedJSON)
                    .replace(/"/g, '\\"')
                    .replace(/\n/g, '\\n');
                showResultModal(stringified);
            } catch (e) {
                showErrorModal('无效的JSON格式');
            }
            return;

        case "encodeBase64":
            try {
                const encoded = btoa(encodeURIComponent(selectedText).replace(/%([0-9A-F]{2})/g,
                    function toSolidBytes(match, p1) {
                        return String.fromCharCode('0x' + p1);
                    }));
                showResultModal(encoded);
            } catch (e) {
                showErrorModal('Base64编码失败');
            }
            return;

        case "decodeBase64":
            try {
                const decoded = decodeURIComponent(Array.prototype.map.call(atob(selectedText), function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                showResultModal(decoded);
            } catch (e) {
                showErrorModal('无效的Base64格式');
            }
            return;

        case "timestampToDate":
            try {
                const timestamp = parseInt(selectedText);
                if (isNaN(timestamp)) {
                    throw new Error('无效的时间戳');
                }
                const date = new Date(timestamp * 1000);
                const formatted = date.toLocaleString('zh-CN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                });
                showResultModal(formatted);
            } catch (e) {
                showErrorModal('无效的时间戳');
            }
            return;

        case "dateToTimestamp":
            try {
                let date;
                if (selectedText.match(/^\d+$/)) {
                    showErrorModal('输入已经是时间戳格式');
                    return;
                }
                
                date = new Date(selectedText);
                if (isNaN(date.getTime())) {
                    throw new Error('无效的日期格式');
                }
                
                const timestamp = Math.floor(date.getTime() / 1000);
                showResultModal(timestamp.toString());
            } catch (e) {
                showErrorModal('无效的日期格式，请使用标准日期格式（如：2024-01-01 或 2024/01/01）');
            }
            return;
    }
}); 