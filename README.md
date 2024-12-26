# Web开发者工具箱 (Web Developer Toolbox)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

一个简单但实用的 Chrome 扩展，为开发者提供常用的文本转换工具。通过右键菜单快速访问各种转换功能，提高开发效率。

## ✨ 功能特性

### 🔧 JSON 工具
- JSON 格式化：将压缩的 JSON 转换为易读格式
- JSON 转字符串：将 JSON 对象转换为字符串形式

### 🔐 Base64 工具
- Base64 编码：支持中文字符的 Base64 编码
- Base64 解码：准确解码 Base64 字符串

### ⏰ 时间工具
- 时间戳转日期：将 Unix 时间戳转换为可读日期
- 日期转时间戳：将日期转换为 Unix 时间戳

## 🚀 安装步骤

1. 下载源码
    ```bash
    git clone https://github.com/yourusername/web-developer-toolbox.git
    ```
    或直接下载 ZIP 文件并解压

2. 创建并准备文件
    - 在项目目录中创建以下文件：
        ```
        web-developer-toolbox/
        ├── manifest.json        # 扩展配置文件
        ├── background.js        # 后台脚本
        ├── popup.html          # 弹出页面
        └── README.md           # 说明文档
        ```
    - 将提供的代码分别复制到对应文件中

3. 安装扩展
    1. 打开 Chrome 浏览器
    2. 在地址栏输入 `chrome://extensions/` 并访问
    3. 在右上角打开「开发者模式」
    4. 点击左上角「加载已解压的扩展程序」
    5. 选择项目所在文件夹

4. 验证安装
    - 在浏览器右上角工具栏中应该能看到扩展图标
    - 在任意网页选中文本，点击右键，应该能看到工具箱菜单

## 📖 使用方法

1. 文本转换
    - 在网页中选中需要转换的文本
    - 点击鼠标右键
    - 选择对应的工具类型（JSON/Base64/时间）
    - 选择具体的转换功能

2. 查看结果
    - 转换结果会在弹窗中显示
    - 可以通过「复制」按钮复制结果
    - 点击「关闭」或遮罩层关闭弹窗

3. 常见用例
    - JSON格式化：选中压缩的JSON文本 → 右键 → JSON工具 → JSON格式化
    - Base64编码：选中普通文本 → 右键 → Base64工具 → Base64编码
    - 时间戳转换：选中时间戳 → 右键 → 时间工具 → 时间戳转日期

## 🔨 技术栈

- JavaScript
- Chrome Extension API
- HTML/CSS

## 📝 待实现功能

- [ ] URL 编解码工具
- [ ] MD5/SHA1 等哈希计算
- [ ] Unicode 转换
- [ ] HTML 实体编解码
- [ ] JWT 解析工具

## 📋 更新日志

### [1.0.0] - 2024-01-01
- 初始版本发布
- 实现基础功能：JSON、Base64、时间戳转换

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 💬 问题反馈

如果您在使用过程中遇到任何问题，请创建 Issue 