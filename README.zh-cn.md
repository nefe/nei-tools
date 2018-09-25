# 多环境管理 Chrome 扩展（multi-env-switch）

> 俗称 “大M”。一个多环境管理和快速切换的 Chrome 扩展。

![](https://github.com/TingGe/multi-environment-manager/raw/618796eb6ef60d9640c1fa60c0b0a9afe2e85d13/multi-environment-manager/icon48.png)

## 解决的问题

- 如果你和小伙伴们在开发或沟通中经常看到一个域名一头雾水；
- 如果你和小伙伴们讨论某个环境时还得在各种 xx 群、云笔记、excel 或上千封邮件中翻箱倒柜；
- 如果你搭建了新的环境还得通过邮件、口头或即时通讯工具等等不厌其烦地说明解释；
- 如果……

那么，装上它吧。它能：

1. 一键识别当前环境；
2. 一键切换直达；
3. 一个 push，全量更新；
4. 支持 I18N，暂时只支持了中英文；
5. 一键更多可能……

“*Happy enjoy your world！*”

## 安装

1. 直接访问 [Chrome Web Store](https://chrome.google.com/webstore/detail/multiple-environmental-ma/ehboglklfbenahbjndhnpkicglekincp) 安装；也可以在 Chrome 商店搜索 multi-environment-manager 安装；

2. 安装成功后，右击 “M” 图标，在选项页中设置自己团队的环境列表文档地址即可。

   当前版本仅支持 Markdown 格式。

   该扩展默认的 Demo 地址是

   `https://raw.githubusercontent.com/TingGe/multi-environment-manager/master/multi-env-list.md`。 

## 使用

首次使用时，默认选了一个示例文档。如下图：

![Demo](https://github.com/TingGe/multi-environment-manager/raw/master/assets/demo.png)



可以右键 “M” 扩展，打开“选项”页，配置自己研发团队中一份 Markdown 格式的统一的环境列表文档地址。选项页如下：

![Options](https://github.com/TingGe/multi-environment-manager/raw/master/assets/options.png)



## 开发

1. 全局安装 [npm](https://nodejs.org/) 和 [yarn](https://yarnpkg.com/en/docs/install)；

2. 下载 `multi-environment-manager` 项目；

   ```bash
   git clone https://github.com/TingGe/multi-environment-manager.git
   ```

3. 在命令行工具（如  iTerm2） 中，切换到 `multi-environment-manager` 目录，执行 build 或 watch 即可构建出最新版本的"M"；

   ```bash
   cd multi-environment-manager
   yarn
   yarn build 
   # 或 yarn watch
   ```

4. 打开 Chrome 浏览器，在地址栏输入 `chrome://extensions` ，按 Enter 键；开启开发人员模式，点击"加载已解压目录"选择 `multi-environment-manager/build` 。
