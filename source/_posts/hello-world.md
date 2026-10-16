---
title: Hello World
date: 2026-10-16 21:30:00
tags:
  - 折腾
categories:
  - 随笔
description: 第一篇博客，顺便说明这套站点是怎么搭起来的。
---

欢迎来到我的小站 👋

这是 Hexo + Butterfly 搭的第一篇文章，用来验证整条链路是通的。

## 怎么写文章

在项目根目录执行：

```bash
npm run new -- "文章标题"
```

会生成 `source/_posts/文章标题.md`，用任意 Markdown 编辑器写就行。
写完本地预览：

```bash
npm run s
```

打开 <http://localhost:4000> 看效果，满意了再发布：

```bash
npm run go
```

`npm run go` 等于 `hexo clean && hexo generate && hexo deploy`，会把页面生成到
`public/` 然后推到 GitHub 的 `gh-pages` 分支。

## 放图片

因为开启了 `post_asset_folder`，新建文章时会同时生成一个同名文件夹，
图片丢进去，正文里直接写相对路径即可：

```markdown
![图片说明](图片名.png)
```

## 代码高亮

```javascript
function hello(name) {
  return `Hello, ${name}!`;
}

console.log(hello('world'));
```

---

模板搭好了，接下来把 `_config.yml` 里的站名、`_config.butterfly.yml` 里的头像和社交链接换成自己的就行。
