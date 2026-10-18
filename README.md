# czyyy 的博客 — 搭建与使用指南

> 站点：<https://czyyy2611.github.io/czyyy_nlw/>
> 工程：`D:\myblog`
> 仓库：<https://github.com/czyyy2611/czyyy_nlw>
> 技术栈：Hexo 7.3.0 + Butterfly 5.7.0

这份文档分两部分：**第一部分教你用**（写文章、改外观、加特效），**第二部分记录这个站是怎么搭起来的**（含踩过的坑）。

**目录**

- 一、写文章
- 二、改外观
- 三、加动态效果
- 四、生成与部署
- 五、常见问题
- **六、语法速查（带样例）** ← 写文章和改配置要用到的全部语法
- 七、架构
- 八、搭建步骤（可复现）
- 九、环境坑（本机特有）

---

# 第一部分：怎么用

## 一、写文章

### 1.1 新建一篇

在 `D:\myblog` 下打开终端：

```bash
npm run new -- "文章标题"
```

会生成两个东西：

```
source/_posts/文章标题.md      ← 正文写这里
source/_posts/文章标题/        ← 这篇文章的图片放这里
```

> 如果标题里有空格或特殊字符，用引号包住。生成的文件名就是标题本身，**建议用中文短标题或英文**，避免 `/` 这类字符。

### 1.2 文章头部（Front matter）

生成的文件长这样：

```markdown
---
title: 文章标题
date: 2026-10-17 10:00:00
tags:
categories:
---
```

可以填的字段：

| 字段 | 作用 | 示例 |
|---|---|---|
| `title` | 标题 | `第一篇博客` |
| `date` | 发布时间，决定排序 | `2026-10-17 10:00:00` |
| `tags` | 标签，可多个 | `[折腾, Hexo]` |
| `categories` | 分类，**建议只填一个** | `随笔` |
| `description` | 摘要，显示在首页卡片上 | `记录一下搭博客的过程` |
| `cover` | 首页卡片封面图 | `/img/cover.jpg` |
| `top_img` | 文章页顶部大图 | `/img/banner.jpg` |
| `sticky` | 置顶权重，越大越靠前 | `1` |
| `mathjax` | 单篇开启公式渲染 | `true` |

> `tags` 和 `categories` 是两套独立系统：分类适合「一篇只属于一个」，标签适合「一篇打多个」。

### 1.3 插入图片

因为开了 `post_asset_folder`，图片直接放进同名文件夹，正文写相对路径即可：

```markdown
![图片说明](截图.png)
```

不用装任何插件。构建时 Hexo 会把 `source/_posts/文章标题/截图.png` 复制到文章页旁边。

### 1.4 摘要（首页显示多少字）

两种方式，二选一：

- 在 front matter 写 `description: 一句话摘要`
- 或在正文里插入 `<!-- more -->`，它上面的内容就是摘要

`_config.butterfly.yml` 里的 `index_post_content.method` 控制取哪种：

```yaml
index_post_content:
  method: 3      # 1=description 2=都要 3=自动截取(默认) false=不显示
  length: 500    # 自动截取的字数上限
```

> 对应 `_config.butterfly.yml` **第 185-188 行**（`method` 在第 186 行，`length` 在第 188 行）。

### 1.5 草稿

不想立刻发布就建草稿：

```bash
npx hexo new draft "还没写完的文章"
```

草稿在 `source/_drafts/`，正常构建会被跳过。预览草稿：

```bash
npx hexo server --draft
```

写完了改成正式文章：

```bash
npx hexo publish "还没写完的文章"
```

### 1.6 公式

在 `_config.butterfly.yml` 里选一个渲染器（默认是关的，即 `use:` 留空）：

```yaml
math:
  use: katex        # 或 mathjax；留空 = 关闭
  per_page: true    # true = 只有文章 front matter 写了 mathjax: true 才渲染
```

> 对应 `_config.butterfly.yml` **第 454-469 行**：`use:` 在第 457 行（当前留空），`per_page:` 在第 458 行。

### 1.7 预览与发布

```bash
npm run s      # 本地预览 → http://localhost:4000/czyyy_nlw/
npm run go     # 生成 + 部署
```

**注意本地预览地址带 `/czyyy_nlw/` 前缀** —— 因为站点配置的是项目页，不是根域名。直接开 `localhost:4000` 会 404，这是正常的。

`npm run go` 需要代理（见 4.3）；只跑 `npm run g` 或 `npm run s` 不需要代理。

### 1.8 边写边看（推荐工作流）

**写作本身完全不用碰终端。** 终端只用来启动一次预览服务，之后就一直在编辑器里写。

#### 方式 A：双击启动（最省事）

工程根目录有个 **`预览博客.bat`**，双击它：

1. 自动启动本地服务并打开浏览器
2. 浏览器里就是**真实的博客效果**（和线上一样）
3. 你在编辑器里改文章、**保存**，浏览器**自动刷新**
4. 关掉那个黑窗口 = 停止预览

> 这个功能由 `hexo-browsersync` 提供，只在本地预览时生效，**不会影响线上站点**。

#### 方式 B：VSCode 分屏

1. 用 VSCode 打开文件夹 `D:\myblog`
2. 在 `source/_posts/` 里打开要写的 `.md`
3. 按 `Ctrl+K` 然后 `V`（或 `Ctrl+Shift+V`），右边弹出 Markdown 预览
4. 拖成左右分屏，左边写、右边即时渲染

VSCode 的预览用的是**它自己的样式**，不是 Butterfly 主题，但排版、图片、代码块、公式都能实时看到，写内容时最快。

**推荐组合**：VSCode 左右分屏写 + 浏览器开着 `预览博客.bat` 的页面看最终效果。内容用左边看，效果用浏览器看。

#### 方式 C：所见即所得编辑器

想更接近 Word 的体验，可以用任意 Markdown 编辑器直接打开 `source/_posts/` 里的文件：

| 工具 | 特点 | 价格 |
|---|---|---|
| **VSCode** | 已装，分屏预览够用 | 免费 |
| **Obsidian** | 所见即所得，可管理整个文件夹 | 个人免费 |
| **MarkText** | 纯所见即所得，界面简洁 | 免费开源 |
| **Typora** | 体验最好，导出功能强 | 付费（约 ¥89） |

它们改的都是同一批 `.md` 文件，用哪个都行。改完保存，浏览器那边会自动刷新。

#### 几个注意事项

- **预览服务启动着的时候不要再启动第二个**，会提示端口 4000 被占用
- 改了 `_config.yml` 或 `_config.butterfly.yml` 后，需要**关掉窗口重新双击**（主题配置不会热更新）
- 本地预览的地址一定要带 `/czyyy_nlw/`，直接开 `localhost:4000` 是 404
- 浏览器提示"无法访问"时，先确认那个黑窗口还开着

---

## 二、改外观

### 2.0 `_config.butterfly.yml` 主要内容总览

根目录的 [`_config.butterfly.yml`](_config.butterfly.yml) 共 1136 行，是主题的全部配置。**下面这张表是它的骨架**，行号以当前文件为准（你以后增删内容后行号会变，用文件名旁的编辑器行号栏核对）：

| 区块 | 行号 | 管什么 | 当前值 / 状态 |
|---|---|---|---|
| `nav` | 12-18 | 导航栏 logo、站名、固定 | logo 空，`fixed: false` |
| `menu` | 20-24 | 顶部菜单 | **全被注释掉了，所以当前没有菜单** |
| `code_blocks` | 30-43 | 代码块主题、复制按钮 | `theme: light`，`macStyle: false` |
| `social` | 48-50 | 社交图标 | **空**（只有注释示例） |
| `favicon` | 56 | 网站小图标 | `/img/favicon.png`（见 2.4 的提醒） |
| `avatar` | 58-60 | 头像 | `/img/zy头像.jpg`，不旋转 |
| 顶部大图系列 | 64-97 | `disable_top_img`、`default_top_img`、`index_img`、`archive_img`、`tag_img`、`category_img`、`footer_img`、`background` | 首页大图 `雷赛.jpg`，背景也是 `雷赛.jpg` |
| `cover` | 99-106 | 封面开关、默认封面 | 三处都开，默认封面没配 |
| `error_img` / `error_404` | 109-117 | 图片 404、整个 404 页 | 404 页关 |
| `post_meta` | 119-138 | 首页/文章页的日期、分类、标签 | 首页显示分类不显示标签 |
| `index_site_info_top` | 147 | 首页大图上方留白 | 空（居中） |
| `index_top_img_height` | 149 | 首页大图高度 | `100vh` |
| `subtitle` | 152-168 | 首页打字机副标题 | **关** |
| `index_layout` | 178 | 首页文章版式 | `3`（左右交替） |
| `index_post_content` | 185-188 | 首页摘要的取法与长度 | `method: 3`，500 字 |
| `toc` | 194-201 | 文章目录 | 文章页开、文章页外关 |
| `post_copyright` | 203-208 | 文章版权声明 | 开，CC BY-NC-SA 4.0 |
| `reward` | 211-220 | 打赏二维码 | 关 |
| `post_edit` / `related_post` | 224-236 | 在线编辑、相关推荐 | 编辑关，相关推荐开 |
| `post_pagination` | 242 | 上一篇/下一篇 | `1` |
| `noticeOutdate` | 245-254 | 文章过期提示 | 关 |
| `footer` | 259-268 | 页脚版权 | `since: 2025` |
| `aside` | 274-356 | 侧边栏所有卡片 | 开，右侧 |
| `rightside_*` | 363-410 | 右下角按钮 | — |
| `anchor` / `copy` | 416-429 | 标题锚点、代码复制 | 复制开，版权追加关 |
| `wordcount` | 432-439 | 字数统计 | 关 |
| `busuanzi` | 442-445 | 不蒜子访问量 | 开 |
| `math` | 454-469 | 公式 | **关**（`use:` 空） |
| `search` | 475-507 | 站内搜索 | `local_search` 本地搜索 |
| `share` | 513-526 | 分享按钮 | `sharejs` |
| `comments` | 532-546 | 评论系统总开关 | **关**（`use:` 空） |
| `chat` | 662-670 | 在线聊天 | 关 |
| 统计/广告/验证 | 693-755 | 百度、Google、AdSense 等 | 全空/关 |
| `theme_color` | 764-780 | 自定义颜色 | **整段被注释，未启用** |
| `rounded_corners_ui` | 789 | 圆角 UI | `true` |
| `mask` | 795-797 | 头图/页脚遮罩 | 都开 |
| `preloader` | 800-807 | 加载动画 | 关 |
| `enter_transitions` | 810 | 页面切换动画 | **开** |
| `display_mode` | 813 | 默认亮/暗 | `light` |
| `beautify` | 816-823 | 正文美化 | 关 |
| `font` / `blog_title_font` | 827-836 | 字体 | 全空（用主题默认） |
| `hr_icon` | 839-843 | 分隔线图标 | 开 |
| `activate_power_mode` | 847-851 | 打字粒子 | 关 |
| 背景特效 | 856-907 | 彩带、粒子、烟花、爱心、点击文字 | **全关** |
| `lightbox` | 917 | 图片放大 | 空（不启用） |
| `series` / `abcjs` / `mermaid` / `chartjs` | 924-970 | 系列、乐谱、图表、流程图 | 全关 |
| `note` | 973-984 | 提示块样式 | `flat` |
| `pjax` / `snackbar` / `instantpage` / `lazyload` | 991-1020 | 无刷新跳转、提示条、预加载、懒加载 | 全关 |
| `pwa` / `Open_Graph_meta` / `structured_data` | 1025-1052 | PWA、社交卡片、结构化数据 | PWA 关，OG 开 |
| `css_prefix` | 1055 | CSS 兼容前缀 | `true` |
| `inject` | 1059-1065 | 往页面塞自定义代码 | head 里有 noindex meta |
| `CDN` | 1069-1136 | 资源 CDN | 内部本地、第三方 jsdelivr |

> 记住一个判断方法：**在文件里搜键名**（VSCode 按 `Ctrl+F`），比记行号可靠。行号只是方便你现在按图索骥。

### 2.1 先搞清楚两个配置文件

| 文件 | 管什么 | 什么时候改 | 行号参考 |
|---|---|---|---|
| `_config.yml` | 站名、作者、URL、部署、文章生成规则 | 改站点本身 | 见 2.2 |
| `_config.butterfly.yml` | 主题的一切：颜色、布局、特效、菜单 | 绝大部分外观调整都在这 | 见 2.0 |

**永远不要改 `themes/butterfly/_config.yml`。** 那份是主题自带的，升级主题时会被覆盖。根目录的 `_config.butterfly.yml` 才是你的。

### 2.2 站点基本信息

`_config.yml` **第 6-17 行**：

```yaml
title: czyyy_nlw              # 第 6 行
subtitle: ''                 # 第 7 行
description: 'Hello World'   # 第 8 行
author: czyyy                # 第 10 行
language: zh-CN              # 第 11 行
timezone: Asia/Shanghai      # 第 12 行
url: https://czyyy2611.github.io/czyyy_nlw   # 第 17 行
```

> `url` 千万别乱改。它决定所有 CSS/JS 的路径前缀，写错就是"页面能开但样式全无"。
> 同文件里还有几个常用的：`theme: butterfly` 在第 91 行、`deploy:` 在第 95-98 行、`search:` 在第 101-105 行、`browsersync:` 在第 109-111 行。

### 2.3 导航栏菜单

`nav:` 在 `_config.butterfly.yml` **第 12-18 行**：

```yaml
nav:
  logo:                      # 第 14 行：导航栏图标（图片路径）
  display_title: true        # 第 15 行：显示站名
  display_post_title: true   # 第 16 行：文章页显示文章标题
  fixed: false               # 第 18 行：导航栏是否固定在顶部
```

`menu:` 在 **第 20-24 行**，格式是 `显示名: 路径 || 图标`。**当前整段是注释状态**，所以站点没有顶部菜单。想启用就把注释删掉、改成这样：

```yaml
menu:
  首页: / || fas fa-home
  归档: /archives/ || fas fa-archive
  标签: /tags/ || fas fa-tags
  分类: /categories/ || fas fa-folder-open
  # 二级菜单：
  更多||fas fa-list:
    关于: /about/ || fas fa-user
    留言板: /message/ || fas fa-comment
```

> 注意：启用了 `标签` / `分类` 菜单后，如果对应页面还没生成，点进去会 404。Hexo 默认会生成归档、标签、分类页，正常没问题。

图标名去 <https://fontawesome.com/search> 搜，用 `fas fa-xxx`（实心）或 `fab fa-xxx`（品牌）。

### 2.4 头像 / favicon / 社交链接

| 配置 | 行号 | 当前值 |
|---|---|---|
| `favicon` | 56 | `/img/favicon.png` |
| `avatar.img` | 59 | `/img/zy头像.jpg` |
| `avatar.effect` | 60 | `false`（改成 `true` 悬停转圈） |
| `social` | 48-50 | 空 |

`social:` 目前只有注释示例，取消注释并改成你的账号即可：

```yaml
social:
  fab fa-github: https://github.com/czyyy2611 || Github || '#24292e'
  fas fa-envelope: mailto:czyyy@buaa.edu.cn || Email || '#4a7dbe'
  fab fa-bilibili: https://space.bilibili.com/xxx || Bilibili || '#00a1d6'
```

格式：`图标: 链接 || 提示文字 || 颜色`，颜色可省略。

**图片放在哪？** 配置里写 `/img/文件名`，Hexo 会去 `source/img/` 和 `themes/butterfly/source/img/` 两处找。当前工程的图片实际在 `themes/butterfly/source/img/`（`zy头像.jpg`、`奶龙图片.jpg`、`雷赛.jpg`）。

> ⚠️ 两个提醒：
> 1. 图片放主题目录里，**升级/重装主题时可能丢失**。建议把这几个文件复制到 `source/img/`（没有就新建），配置不用改。
> 2. `favicon` 现在写的是 `/img/favicon.png`，但目录里实际是 `favicon.ico`。浏览器会请求失败、显示默认图标。要么把配置改成 `/img/favicon.ico`（第 56 行），要么放一张真正的 `favicon.png`。

### 2.5 首页文章版式（7 种）

`index_layout` 在 `_config.butterfly.yml` **第 178 行**，当前是 `3`：

```yaml
index_layout: 3
```

| 值 | 效果 |
|---|---|
| `1` | 封面在左，信息在右 |
| `2` | 封面在右，信息在左 |
| `3` | 左右交替（默认） |
| `4` | 封面在上，信息在下 |
| `5` | 信息压在封面上 |
| `6` | 瀑布流，封面在上 |
| `7` | 瀑布流，信息压在封面上 |

想改成卡片瀑布流就试 `6` 或 `7`。

### 2.6 首页大图与文章封面

对应 `_config.butterfly.yml` **第 64-106 行**，当前值如下：

```yaml
disable_top_img: false              # 第 64 行：true = 关掉所有大图
default_top_img: /img/奶龙图片.jpg   # 第 67 行：没单独设置时的大图
index_img: /img/雷赛.jpg            # 第 70 行：首页大图
archive_img:                        # 第 73 行：归档页大图（空）
tag_img:                            # 第 76 行：标签页大图（空）
category_img:                       # 第 84 行：分类页大图（空）
footer_img: false                   # 第 92 行：页脚背景，false = 不用
background: /img/雷赛.jpg           # 第 97 行：整站背景
```

`cover:` 在 **第 99-106 行**：

```yaml
cover:
  index_enable: true      # 首页显示封面
  aside_enable: true      # 侧边栏卡片显示封面
  archives_enable: true   # 归档/标签/分类页显示封面
  default_cover:          # 第 105-106 行：没写 cover 时的默认图（当前空）
    # - /img/default-cover.jpg
```

大图高度在 **第 149 行**：

```yaml
index_top_img_height: 100vh     # 想矮一点就写 400px
```

想让背景每次刷新随机换图，就把 `background` 改成数组：

```yaml
background:
  - /img/雷赛.jpg
  - /img/奶龙图片.jpg
```

### 2.7 换配色

主题支持 `theme_color`，这段配置**已经在文件里，但整段被注释掉了**，位置是 `_config.butterfly.yml` **第 764-780 行**。把行首的 `#` 去掉即可启用（第 762 行还提醒了：颜色值必须用双引号）：

```yaml
theme_color:
  enable: true
  main: "#49B1F5"                    # 主色（按钮、链接、高亮）
  paginator: "#00c4b6"               # 分页器
  text_selection: "#00c4b6"          # 选中文字的颜色
  link_color: "#99a9bf"              # 正文链接
  hr_color: "#A4D8FA"                # 分隔线
  code_foreground: "#F47466"         # 行内代码文字
  code_background: "rgba(27, 31, 35, .05)"  # 行内代码背景
  toc_color: "#00c4b6"               # 目录高亮
  blockquote_padding_color: "#49b1f5"
  blockquote_background_color: "#49b1f5"
  meta_color: "#858585"              # 日期/标签等元信息
  scrollbar_color: "#49b1f5"         # 滚动条
```

改完 `npm run g` 才生效（Stylus 是编译期处理颜色，不是 CSS 变量）。

### 2.8 暗色模式

`darkmode:` 在 **第 383-394 行**，当前：

```yaml
darkmode:
  enable: true
  button: true            # 右下角显示切换按钮
  autoChangeMode: false   # 1=跟随系统 2=晚6点到早6点自动切 false=手动
  start:                  # 第 393 行：自动切暗的开始小时（1-24）
  end:                    # 第 394 行：结束小时
```

### 2.9 字体

`font:` 在 **第 827-831 行**，`blog_title_font:` 在 **第 834-836 行**，当前都留空（用主题默认）。想改就填：

```yaml
font:
  global_font_size: 15px
  code_font_size: 13px
  font_family: 'PingFang SC, Microsoft YaHei, sans-serif'
  code_font_family: 'JetBrains Mono, Consolas, monospace'

# 博客标题的字体（想用网络字体就填 font_link）
blog_title_font:
  font_link: https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe
  font_family: 'ZCOOL KuaiLe, Microsoft YaHei'
```

> Google Fonts 在部分网络环境下加载很慢，建议优先用系统字体，或把字体文件放进 `source/` 自托管。

### 2.10 代码块样式

`code_blocks:` 在 **第 30-43 行**，当前值：

```yaml
code_blocks:
  theme: light        # 第 32 行：darker / pale night / light / ocean / false
  macStyle: false     # 第 33 行：苹果风格的红黄绿三个点
  height_limit: false # 第 35 行：超过这个高度折叠（px），false=不限
  word_wrap: false    # 第 36 行：长代码是否自动换行
  copy: true          # 第 39 行：显示复制按钮
  language: true      # 第 40 行：显示语言名
  shrink: false       # 第 42 行：默认折叠代码块
  fullpage: false     # 第 43 行：全屏按钮
```

### 2.11 页脚 / 侧边栏

`footer:` 在 **第 259-268 行**，当前：

```yaml
footer:
  owner:
    enable: true
    since: 2025           # 第 263 行：版权年份起点
  copyright:
    enable: true          # 第 266 行：主题版权声明
    version: true         # 第 267 行：显示版本号
  custom_text:            # 第 268 行：自定义页脚文字（当前空）
```

`aside:`（侧边栏）在 **第 274-356 行**，当前总体开启、靠右：

```yaml
aside:
  enable: true            # 第 275 行：显示侧边栏
  mobile: true            # 第 279 行：手机上也显示
  position: right         # 第 281 行：left / right
```

侧边栏卡片各自的开关在同一段往下：作者卡 286-293、公告卡 294-296、最近文章 297-303、最新评论 304-310、分类 311-317、标签 318-328、归档 329-339、文章系列 340-347、网站信息 348-356。

### 2.12 其余常用开关（按行号速查）

| 想要 | 键 | 行号 | 当前 |
|---|---|---|---|
| 首页摘要取法 | `index_post_content.method` | 186 | `3` 自动截取 |
| 首页摘要长度 | `index_post_content.length` | 188 | `500` |
| 文章目录 | `toc.post` | 195 | `true` |
| 文章版权 | `post_copyright.enable` | 204 | `true` |
| 相关推荐 | `related_post.enable` | 232 | `true` |
| 站内搜索 | `search.use` | 478 | `local_search` |
| 分享 | `share.use` | 516 | `sharejs` |
| 评论 | `comments.use` | 537 | 空 = 关 |
| 页面切换动画 | `enter_transitions` | 810 | `true` |
| 加载动画 | `preloader.enable` | 801 | `false` |
| 图片放大 | `lightbox` | 917 | 空 = 关 |
| 提示块样式 | `note.style` | 979 | `flat` |
| 懒加载 | `lazyload.enable` | 1014 | `false` |
| 自定义注入 | `inject.head` / `inject.bottom` | 1060 / 1064 | head 有 noindex meta |

---

## 三、加动态效果

先说明：**Butterfly 5.7 内置的特效只有下面这张表里的这些**，都通过 `_config.butterfly.yml` 开关，不需要装插件、不需要联网 CDN。

### 3.1 内置特效总表

| 配置项 | 效果 | 默认 | `_config.butterfly.yml` 行号 |
|---|---|---|---|
| `fireworks` | 鼠标点击处放烟花 | 关 | 888-891 |
| `click_heart` | 鼠标点击处冒出爱心 | 关 | 894-896 |
| `clickShowText` | 鼠标点击处弹出文字 | 关 | 899-907 |
| `canvas_ribbon` | 背景彩带 | 关 | 858-866 |
| `canvas_fluttering_ribbon` | 飘动彩带 | 关 | 869-871 |
| `canvas_nest` | 背景粒子连线 | 关 | 875-885 |
| `activate_power_mode` | 输入时打字粒子 + 抖动 | 关 | 847-851 |
| `subtitle.effect` | 首页副标题打字机 | 关 | 152-168（`effect` 在第 154 行） |
| `preloader` | 页面加载动画 | 关 | 800-807 |
| `enter_transitions` | 页面切换转场 | **开** | 810 |

### 3.2 直接复制这几段

```yaml
# 点击放烟花
fireworks:
  enable: true
  zIndex: 9999
  mobile: false          # 手机上关掉，省电

# 点击冒爱心
click_heart:
  enable: true
  mobile: false

# 点击弹文字
clickShowText:
  enable: true
  text:
    - 你好
    - 加油
    - 欢迎
  fontSize: 15px
  random: true
  mobile: false
```

> `fireworks`、`click_heart`、`clickShowText` **不要同时开**，三个都是点击事件，会打架。
> 这三段分别对应 `_config.butterfly.yml` 第 888-891、894-896、899-907 行，**直接改原文件里的 `enable:` 即可**，不用新增段落。

背景类：

```yaml
# 彩带（推荐，低调好看）
canvas_ribbon:
  enable: true
  size: 150
  alpha: 0.6
  zIndex: -1
  click_to_change: false   # 点击换一条彩带
  mobile: false

# 粒子连线（科技感）
canvas_nest:
  enable: true
  color: '0,0,255'
  opacity: 0.7
  zIndex: -1
  count: 99
  mobile: false
```

> `canvas_ribbon` 和 `canvas_nest` 也建议二选一，都开背景会很乱。
> 对应行号：`canvas_ribbon` 第 858-866 行、`canvas_nest` 第 875-885 行。

### 3.3 首页打字机副标题

```yaml
subtitle:
  enable: true
  effect: true
  typed_option: "{typeSpeed: 100, backSpeed: 50, loop: true}"
  source: false
  sub:
    - 记录学习和生活
    - 一个北航学生的博客
    - 想到什么写什么
```

它会依次打出 `sub` 里的每一行。对应 `_config.butterfly.yml` **第 152-168 行**，当前 `enable: false`、`sub:` 为空，改完记得把 `sub:` 下面补上列表项。

### 3.4 页面加载动画

```yaml
preloader:
  enable: true
  source: 1          # 1=全屏加载动画 2=顶部进度条
  pace_css_url:      # source=2 时可自定义进度条样式
```

对应 `_config.butterfly.yml` **第 800-807 行**。

### 3.5 内置之外的效果（樱花 / 看板娘 / 音乐播放器）

这些主题没内置，思路都是**用 `inject` 往页面里塞脚本**：

```yaml
inject:
  head:
    - '<link rel="stylesheet" href="/czyyy_nlw/css/你的样式.css">'
  bottom:
    - '<script src="/czyyy_nlw/js/你的脚本.js"></script>'
```

> 路径里的 `/czyyy_nlw/` 是仓库名前缀，**如果以后改仓库名，这里也要改**。

#### 樱花飘落

我已经把一份自包含的实现放在 `source/js/sakura.js`（不依赖任何 CDN，离线也能跑）。开启方式：

```yaml
inject:
  bottom:
    - '<script src="/czyyy_nlw/js/sakura.js" defer></script>'
```

想调花瓣数量/颜色，改文件顶部的 `CONFIG`：`desktopCount`、`mobileCount`、`color`、`zIndex`。

**注意**：`inject` 是全局的，所有页面都会加载。不想让手机端跑可以在脚本里加判断（文件里已经处理了 `prefers-reduced-motion`）。

#### 看板娘（Live2D）

需要模型文件和加载器，属于第三方资源，建议直接照 Butterfly 官方文档接：

<https://butterfly.js.org/posts/ceeb73f/#看板娘>

#### 音乐播放器

装插件：

```bash
npm i hexo-tag-aplayer --save
```

然后在文章里用标签：

```markdown
{% aplayer "歌名" "歌手" "音乐链接.mp3" "封面.jpg" %}
```

注意：aplayer 是**单篇启用**的，不是全站背景音乐。想做全站背景音乐需要自己写固定定位的 `<audio>`，塞进 `inject.bottom`。

### 3.6 改完怎么看效果

```bash
npm run s     # 本地预览，改配置后可能要重启 server
```

改了 `_config.butterfly.yml` 如果没生效：

```bash
npx hexo clean && npm run s
```

---

## 四、生成与部署

先记住四条命令的关系（定义在 [`package.json`](package.json) 第 5-16 行）：

| 命令 | 实际执行 | 干什么 | 产出 |
|---|---|---|---|
| `npm run s` | `hexo server` | 启动本地预览服务，**边改边看** | 不写文件，内存里构建 |
| `npm run g` | `hexo generate` | **只生成**静态文件 | `public/` |
| `npm run d` | `hexo deploy` | 只把**已有的** `public/` 推上去 | `gh-pages` 分支 |
| `npm run go` | `hexo clean && hexo generate && hexo deploy` | 清空 → 生成 → 部署，一条龙 | `public/` + `gh-pages` |

> 最常用的其实是 `npm run g`（检查构建有没有错）和 `npm run go`（发布）。`npm run d` 单独用的情况很少。

### 4.1 `npm run g` 具体怎么用

`npm run g` 是 `hexo generate` 的简写，作用是把 `source/` 里的 Markdown、主题模板、图片等**全部渲染成静态网页，输出到 `public/` 目录**。它**不联网、不部署、不需要代理**。

#### 第一步：打开正确的目录

必须是在 `D:\myblog`（有 `package.json` 的那一层）执行。VSCode 里按 `` Ctrl+` `` 打开终端，确认提示符所在目录；或者用 Git Bash：

```bash
cd /d/myblog
pwd          # 应该输出 /d/myblog
ls           # 应该能看到 _config.yml、package.json、source、themes
```

在错误的目录执行会报 `Missing script: "g"` 或 `ENOENT: no such file or directory, open '_config.yml'`。

#### 第二步（可选）：先清理

改了 `_config.yml`、`_config.butterfly.yml`、主题文件，或者发现"明明改了却没生效"时，先清掉旧产物：

```bash
npm run cl
```

它等价于 `hexo clean`：删掉 `public/` 和缓存 `db.json`。**只改文章内容的话不需要这一步**，`generate` 会自己更新。

#### 第三步：生成

```bash
npm run g
```

正常情况下会看到类似输出（数字因文章数不同而变，下面是本机实测）：

```
INFO  Validating config
INFO  Start processing
INFO  Files loaded in 1.27 s
INFO  Generated: index.html
INFO  Generated: 2026/10/17/1/index.html
INFO  Generated: archives/index.html
INFO  Generated: img/雷赛.jpg
...
INFO  11 files generated in 61 ms
```

看到末尾的 `N files generated in ...` 且没有 `FATAL`，就说明成功了。
（如果没先 `clean`，会只列出本次有变化的文件，数量少是正常的。）

#### 第四步：确认产物

生成物在 `public/`：

```
public/
├── index.html          ← 首页
├── 2026/10/17/1/       ← 每篇文章一个目录
├── archives/index.html
├── tags/index.html
├── categories/index.html
├── css/  js/  img/     ← 主题资源
└── search.xml
```

**不要直接双击 `public/index.html` 看效果。** 页面里的 CSS/JS 用的是 `/czyyy_nlw/...` 绝对路径，`file://` 打开必然样式全无。要看效果就用 `npm run s`（本地服务会以同样的路径规则提供页面）。

#### 常见输出怎么读

| 输出 | 含义 | 要不要处理 |
|---|---|---|
| `11 files generated in 61 ms` | 成功，生成了 11 个文件 | 不用 |
| `WARN No layout: xxx` | 某篇文章/页面的 front matter 写错了布局名 | 检查 front matter 的 `layout`/`title` |
| `0 files generated` | 没找到可生成的内容 | 十有八九目录不对，或 `source/_posts` 是空的 |
| `FATAL YAMLException` / `bad indentation` | 配置文件缩进错了（典型是用了 Tab） | 见 6.3 |
| `Cannot read properties of undefined` | 主题配置键名写错/层级挂错 | 对照 2.0 的键名检查 |
| `ENOENT ... _config.yml` | 不在项目根目录 | `cd /d/myblog` |

#### `npm run g` 之后要发布怎么办？

`g` 只负责生成，**不会上传**。确认构建没问题后：

```bash
npm run go        # clean + generate + deploy，真正发布到线上
```

`go` 会重新生成一遍（所以不必先手动 `g`），并且需要代理（见 4.3）。

### 4.2 `npm run go`：生成 + 部署

```bash
npm run go
```

等价于 `hexo clean && hexo generate && hexo deploy`。

它做两件事：
1. 把 `source/` 渲染成静态页面到 `public/`
2. 把 `public/` 推到 GitHub 的 `gh-pages` 分支

GitHub Pages 会自动从 `gh-pages` 分支发布，**推上去 1~2 分钟后就生效**。

### 4.3 代理

`npm run go` 要访问 `github.com`，而你的网络对它有 TLS 拦截。所以**部署前必须先开代理**。注意：`npm run g` 和 `npm run s` 都是纯本地操作，**不需要代理**。

git 已经配好了（只对 github.com 生效）：

```bash
git config --global http."https://github.com".proxy http://127.0.0.1:7897
```

代理没开时的表现：`Failed to connect to github.com:443 over proxy`。这不是仓库坏了，开代理重试即可。

### 4.4 源码也要提交

`npm run go` 只推构建产物到 `gh-pages`。**源码在 `main` 分支**，改完文章记得：

```bash
git add -A
git commit -m "新增文章：xxx"
git push
```

否则源码只在你本地，换台电脑就找不回来了。

### 4.5 让搜索引擎别收录（已启用）

博客默认是公开的，任何人拿到链接都能看，搜索引擎也会收录。如果只想「能访问但别太招摇」，用两处配置：

**① `source/robots.txt`**（告诉爬虫别抓）：

```
User-agent: *
Disallow: /czyyy_nlw/
```

只禁 `czyyy_nlw` 这个路径，不影响你以后在同一个 GitHub 账号下开的其他 Pages 项目。

**② `_config.butterfly.yml` 的 `inject.head`**（给每个页面加 meta 标签）：

```yaml
inject:
  head:
    - '<meta name="robots" content="noindex, nofollow">'
```

两条一起用才靠谱：robots.txt 是给爬虫看的约定，meta 是页面内的声明。

**它做不到什么**

| 你以为 | 实际 |
|---|---|
| 别人打不开 | ❌ 拿到链接照样能看 |
| GitHub 上看不到源码 | ❌ 仓库还是 public |
| 立刻从搜索消失 | ❌ 已收录的要等 1~4 周，急的话去 Google Search Console 提交「移除网址」 |

**想真正私密**只有换托管（Cloudflare Access / Netlify 密码保护 / 自建），GitHub Pages 本身没有访问控制。把仓库改 Private 会直接让 Pages 停掉，等于关站。

---

## 五、常见问题

| 现象 | 原因 | 解决 |
|---|---|---|
| 页面能开但**完全没有样式** | `_config.yml` 的 `url` 写错 | 必须是 `https://czyyy2611.github.io/czyyy_nlw`，仓库名大小写也要一致 |
| 本地 `localhost:4000` 打开 404 | 项目页有路径前缀 | 访问 `http://localhost:4000/czyyy_nlw/` |
| `npm run` 报 `'"node"' 不是内部或外部命令` | 系统 PATH 有坏字符（本机已修） | 见第九节 |
| `npm run go` 连不上 github | 代理没开 | 先启动代理客户端 |
| 部署成功但页面 404 | Pages 没配置 / 还没构建完 | 等 1~2 分钟；GitHub 仓库 Settings → Pages 确认分支是 `gh-pages` |
| 改了主题配置没反应 | 缓存 | `npx hexo clean` 后重试 |
| 图片不显示 | 路径不对 | 图片放 `source/_posts/文章名/`，正文用相对路径 `![](图.png)` |
| 公式不渲染 | 没启用 | `math.use: katex`，文章 front matter 加 `mathjax: true` |
| 百度/Google 搜不到博客 | 已开启 noindex，这是**预期行为** | 见 4.5；想恢复收录就删掉 robots.txt 和那条 meta |
| YAML 报 `bad indentation` | 用了 Tab 或缩进没对齐 | 见 6.3 |
| 文章里 `{% note %}` 原样显示 | 标签拼错 / 缺 `{% endnote %}` | 对照 6.5 检查闭合 |

---

## 六、语法速查（带样例）

搭这个博客只用到三类语法，各管一摊：

| 语法 | 用在哪 | 学它的时机 |
|---|---|---|
| **Markdown** | 文章正文 `.md` | 写文章 |
| **YAML** | 文章头部的 front matter、两个 `_config*.yml` | 改配置 |
| **Hexo / Butterfly 标签** | 文章里插提示块、折叠、标签页等组件 | 用到时查 |

### 6.1 Markdown（写正文）

#### 标题

```markdown
## 二级标题
### 三级标题
#### 四级标题
```

> 文章标题由 front matter 的 `title` 决定，**正文从 `##` 开始用**。用 `#` 会破坏主题排版。

#### 文字样式

```markdown
**粗体**　*斜体*　***粗斜体***　~~删除线~~　`行内代码`
```

#### 列表

```markdown
- 无序列表
- 第二项
  - 缩进两格 = 子项
1. 有序列表
2. 第二项

- [ ] 未完成的任务
- [x] 已完成的任务
```

#### 引用

```markdown
> 一层引用
>> 嵌套引用
```

#### 链接与图片

```markdown
[普通外链](https://example.com)
[站内链接](/czyyy_nlw/archives/)

![图注](截图.png)          ← 文章同名文件夹里的图
![图注](/img/photo.jpg)    ← source/img/ 里的图
```

#### 代码块

````markdown
```python
def hello():
    print('hi')
```
````

语言名决定高亮：`js` `ts` `python` `java` `c` `cpp` `go` `bash` `yaml` `json` `html` `css` `sql` `markdown` `text`。

> 代码里本身有 ` ``` ` 时，外层用四个反引号包起来。

#### 表格

```markdown
| 左对齐 | 居中 | 右对齐 |
|:-------|:----:|-------:|
| A      | B    | C      |
| 长一点 | 内容 | 123    |
```

#### 分割线与换行

```markdown
---

上一行结尾加两个空格  
这一行才会紧贴着换行（不空行）

空一行 = 新段落
```

#### 转义与原生 HTML

```markdown
\*这不是斜体\*

<details>
<summary>点我展开</summary>

这里可以写 HTML，里面的 Markdown 也会正常渲染。

</details>
```

#### 首页摘要分隔

```markdown
这是首页会显示的开头……

<!-- more -->

这行之后的内容只在文章页显示。
```

### 6.2 Front matter（文章头部）

规则：**必须是文件第一行**，以 `---` 开头、`---` 结尾，中间是 YAML。

```yaml
---
title: 我的第一篇文章
date: 2026-10-17 10:00:00
tags: [Hexo, 折腾]
categories:
  - 随笔
description: 一句话摘要，显示在首页卡片上
cover: /img/cover.jpg
top_img: /img/banner.jpg
sticky: 1
mathjax: true
---
```

写法对照：

| 想要 | 写法 |
|---|---|
| 多个标签 | `tags: [Hexo, 折腾]`，或换行写 `- Hexo` |
| 一个分类 | `categories: 随笔` |
| 不发布这篇文章 | `published: false` |
| 置顶 | `sticky: 10`（数字越大越靠前） |
| 关掉评论 | `comments: false` |
| 自定义链接 | `permalink: custom-url/` |
| 单独的封面/大图 | `cover: /img/a.jpg`、`top_img: /img/b.jpg` |

> 中文值一般不用引号。但值里**有 `: `（冒号加空格）、`#`，或以 `{ [ & * ! | >` 开头**时，必须用单引号包住。

### 6.3 YAML（改配置文件）

`_config.yml` 和 `_config.butterfly.yml` 都是 YAML。规则只有下面几条，记住就不会写错：

1. **缩进只能用空格，绝对不能用 Tab**，一层 2 格。
2. **冒号后面必须有空格**：`title: 博客` ✅ / `title:博客` ❌
3. **列表项是 `- `**，横杠后面也有空格。
4. **`#` 之后是注释**；值里真要写 `#` 就得加引号。
5. 布尔值只写 `true` / `false`；数字不加引号。
6. 不需要的值**留空**即可（键后面什么都不写）。

```yaml
# 单值
title: czyyy 的博客

# 嵌套 = 缩进
darkmode:
  enable: true
  button: true

# 列表：两种写法等价，任选一种
tags: [a, b, c]

# 或者：
# tags:
#   - a
#   - b
#   - c

# 带特殊字符的值要加引号
subtitle: '记录：一个学生的日常'
custom_text: '# 这行不是注释'

# 多行文本（| 保留换行，> 合并成一段）
intro: |
  第一行
  第二行

# 留空 = 用默认值 / 不启用
index_img:
```

**四个最常见的坑：**

| 报错 / 现象 | 原因 |
|---|---|
| `bad indentation of a mapping entry` | 用了 Tab，或同一层没对齐 |
| 配置写了却没生效 | 缩进多一格少一格，键挂到了别的父级下 |
| 数字/true 变成字符串 | 该加引号时没加，比如年份想当文本就写 `'2026'` |
| 值后半截消失 | 值里有没加引号的 `#` |

### 6.4 Hexo 标签（内容组织）

语法长这样：`{% 标签名 参数 %}`。参数之间用空格或逗号分隔，具体看每个标签。

#### 引用本文自己的资源

```markdown
{% asset_img 截图.png 图片说明 %}
{% asset_link 简历.pdf 下载简历 %}
```

文件放在 `source/_posts/文章名/` 下（`post_asset_folder` 已开启）。

#### 站内文章链接（推荐）

```markdown
{% post_link hello-world %}
{% post_link hello-world 点这里看我的第一篇文章 %}
```

用**文件名**而不是网址，以后改 permalink 旧链接也不会断。

#### 外链带标题

```markdown
{% link Hexo 官网 https://hexo.io %}
```

#### 原样输出

```markdown
{% raw %}
这里写任何看起来像标签的文本都不会被解析
{% endraw %}
```

#### 带文件名的代码块

````markdown
{% codeblock app.js lang:js %}
console.log('hi')
{% endcodeblock %}
````

普通场景直接写 Markdown 的三反引号就行，这个只在需要显示文件名时用。

### 6.5 Butterfly 标签（文章里的组件）

这些由主题提供，源码在 `themes/butterfly/scripts/tag/`，复制下面样例即可。

#### 提示块

```markdown
{% note info %}
这是一条普通提示。
{% endnote %}

{% note warning flat %}
这是一条警告，flat 是扁平样式。
{% endnote %}
```

颜色可换：`primary` `success` `info` `warning` `danger` `blue` `pink` `red` `purple` `orange` `green` `default`。
样式可换：`flat` `modern` `simple` `disabled`（不写就用主题默认）。

#### 折叠

```markdown
{% hideToggle 点我展开 %}
被折叠的内容，支持完整 Markdown。
{% endhideToggle %}

{% hideBlock 点我展开 %}
同上，另一种外观。
{% endhideBlock %}

行内隐藏：{% hideInline 答案在这里, 看答案 %}
```

> `hideInline` 用逗号分隔「内容, 按钮文字」，内容里不能有英文逗号。

#### 标签页（tabs）

```markdown
{% tabs 我的标签页 %}
<!-- tab 第一页 -->
第一页的内容
<!-- endtab -->
<!-- tab 第二页 -->
第二页的内容
<!-- endtab -->
{% endtabs %}
```

`{% tabs 名字,2 %}` 的第二个参数表示默认打开第几个。

#### 时间线

```markdown
{% timeline 2026 %}
<!-- timeline 10-17 -->
今天把博客搭起来了。
<!-- endtimeline -->
<!-- timeline 10-18 -->
写了第一篇文章。
<!-- endtimeline -->
{% endtimeline %}
```

#### 相册

```markdown
{% gallery %}
![](/img/a.jpg)
![](/img/b.jpg)
![](/img/c.jpg)
{% endgallery %}
```

#### 按钮

```markdown
{% btn 'https://hexo.io', Hexo 官网, fas fa-home, outline %}
```

参数顺序：`网址, 文字, 图标, 选项`。
选项：`outline` / `center` / `block` / `larger` / 颜色（`blue` `pink` `red` `purple` `orange` `green`）。

#### 文字标签

```markdown
{% label 重要 red %}　{% label 可选 default %}
```

### 6.6 路径怎么写

这是最容易错的地方，因为站点挂在 `/czyyy_nlw/` 子路径下，不是根域名：

| 写在哪 | 写法 | 例子 |
|---|---|---|
| 配置文件里引用图片 | 以 `/img/` 开头，文件放 `source/img/` 或 `themes/butterfly/source/img/` | `avatar.img: /img/zy头像.jpg` |
| `inject` 里的脚本/样式 | **必须带仓库前缀** | `/czyyy_nlw/js/sakura.js` |
| 文章里链到本站页面 | 带仓库前缀 | `/czyyy_nlw/archives/` |
| 文章里引用同目录图片 | 相对路径 | `截图.png` |
| 本地预览地址 | 带仓库前缀 | `http://localhost:4000/czyyy_nlw/` |

> 以后**改仓库名**，三处要跟着改：`_config.yml` 第 17 行的 `url`、`_config.butterfly.yml` 第 1060-1065 行 `inject` 里的路径、`source/robots.txt` 第 2 行的 `Disallow`。

### 6.7 一篇完整示例

把上面的东西串起来，可以直接复制成 `source/_posts/示例文章.md`：

````markdown
---
title: 学期总结
date: 2026-10-17 20:00:00
tags: [生活, 北航]
categories: 随笔
description: 大二上学期的一些记录
cover: /img/cover.jpg
---

## 这学期都干了什么

主要三件事：**上课**、*写代码*、~~摸鱼~~ `学习`。

<!-- more -->

### 一件小事

> 某天在图书馆待到闭馆。

![图书馆](/img/library.jpg)

### 一段代码

```cpp
#include <iostream>
int main() {
    std::cout << "hello" << std::endl;
}
```

### 一个提示块

{% note info %}
这周作业截止到周日。
{% endnote %}

### 一张折叠

{% hideToggle 展开看课程表 %}
| 周一 | 周二 |
|:---|:---|
| 计组 | 数分 |
{% endhideToggle %}

### 一个标签页

{% tabs 课程 %}
<!-- tab 上午 -->
计组
<!-- endtab -->
<!-- tab 下午 -->
数分
<!-- endtab -->
{% endtabs %}
````

---

# 第二部分：这个站是怎么搭的

## 七、架构

```
main 分支（源码）                    gh-pages 分支（构建产物）
├── _config.yml                      ├── index.html
├── _config.butterfly.yml            ├── css/
├── package.json                     ├── js/
├── scaffolds/                       ├── 2026/10/17/文章名/index.html
├── source/                          └── search.xml
│   ├── _posts/            ← 写这里
│   └── img/
└── themes/butterfly/
```

**为什么分两个分支**：GitHub Pages 只能发布静态文件，不能跑 Node。所以本地构建好，把产物推上去。源码留在 `main`，方便以后继续写。

## 八、搭建步骤（可复现）

1. **初始化**：`npm install` 安装 Hexo 及插件（都走 npmmirror，不碰 GitHub）
2. **装主题**：从 npm 装 `hexo-theme-butterfly`，再把包拷进 `themes/butterfly`
3. **抽配置**：`cp themes/butterfly/_config.yml _config.butterfly.yml`
4. **配站点**：`_config.yml` 里设 `url`、`theme: butterfly`、`deploy` 到 `gh-pages`
5. **构建预览**：`hexo generate`，20 个文件，本地 200
6. **建仓库**：GitHub 上建空仓库，`git remote add origin`
7. **推送源码**：`git push -u origin main`
8. **部署产物**：`hexo deploy` 推 `gh-pages`
9. **开 Pages**：GitHub 检测到 `gh-pages` 后自动发布

每一步落到当前工程里，对应的是这些具体位置：

| 步骤 | 文件 | 行号 | 内容 |
|---|---|---|---|
| 1 初始化 | [`package.json`](package.json) | 5-16 | `scripts`（`s` / `g` / `go` 等） |
| 1 初始化 | [`package.json`](package.json) | 20-39 | 依赖版本 |
| 2 装主题 | `themes/butterfly/` | — | 主题目录（当前 5.7.0） |
| 2 装主题 | `themes/butterfly/_config.yml` | — | 主题自带配置，**不要改** |
| 3 抽配置 | [`_config.butterfly.yml`](_config.butterfly.yml) | 全文件 | 你的主题配置（2.0 有总览） |
| 4 配站点 | [`_config.yml`](_config.yml) | 6-12 | 站名、作者、语言、时区 |
| 4 配站点 | [`_config.yml`](_config.yml) | 17 | `url`（项目页路径前缀） |
| 4 配站点 | [`_config.yml`](_config.yml) | 91 | `theme: butterfly` |
| 4 配站点 | [`_config.yml`](_config.yml) | 95-98 | `deploy:` 指向 `gh-pages` |
| 5 构建 | `package.json` | 9 | `npm run g` = `hexo generate` |
| 5 构建 | `_config.yml` | 58-61 | 首页每页 10 篇 |
| 5 构建 | `_config.yml` | 101-105 | 本地搜索 `search.xml` |
| 6 建仓库 | `.git/config` | — | `origin` 地址（用 `git remote -v` 看） |
| 7 推源码 | 整个工程 | — | `.gitignore` 应忽略 `public/`、`db.json`、`node_modules/` |
| 8 部署 | `package.json` | 14 | `npm run go`（clean + generate + deploy） |
| 9 开 Pages | GitHub 仓库设置 | — | Settings → Pages → 分支 `gh-pages` |

## 九、环境坑（本机特有）

### 9.1 npm 11 拦截 install scripts

npm 11 默认不执行依赖的 postinstall。`hexo-util` 的 `build:highlight` 因此没跑。它生成的是 `highlight_alias.json`，而这个文件本来就随包发布，所以**实际无影响**。如果真缺，手动补：

```bash
cd node_modules/hexo-util && node scripts/build_highlight_alias.js
```

### 9.2 `.nojekyll`

Hexo 默认忽略 `source/` 下的点文件，`source/.nojekyll` 不会被复制到 `public/`。所以在 `_config.yml` 里强制包含：

```yaml
include:
  - .nojekyll
```

对应 [`_config.yml`](_config.yml) **第 84-85 行**（第 81-83 行是注释说明）。

没有它，GitHub Pages 会用 Jekyll 处理 `gh-pages`，而 Jekyll 会忽略下划线开头的文件/目录，容易埋雷。

### 9.3 系统 PATH 坏引号（已修复）

系统 PATH 里曾有一对错位引号：

```
"%JAVA_HOME%\bin                                    ← 只有开引号
C:\...\Oracle\Java\javapath"                        ← 只有闭引号
```

cmd.exe 解析到引号就断，**后面所有路径失效** —— 包括 `C:\WINDOWS\system32`、`nodejs`、`Git`。症状是 `npm run` 报：

```
'"node"' 不是内部或外部命令
```

（命令名**带引号**是关键特征，来自 npm 生成的 `.cmd` wrapper 里 `"%_prog%"` 那一行。）

Git Bash 不受影响（bash 把 `"` 当普通字符按 `:` 切分），所以会出现「bash 里能跑、PowerShell 里报错」的怪现象。

修复方式：删掉那两个多余的 `"`。注意 PATH 是 `REG_EXPAND_SZ`，必须用注册表 API 读取（不能用会展开变量的 `[Environment]::GetEnvironmentVariable`，否则 `%JAVA_HOME%` 会被烧成硬编码）。

备份在：`%TEMP%\path-backup-20261016-220318.txt`

### 9.4 网络

| 域名 | 情况 |
|---|---|
| `github.com` | TLS 被中间人替换，**必须走代理** |
| `raw.githubusercontent.com` | 同上 |
| `api.github.com` | 不用代理也能通（但未认证请求有速率限制） |
| `codeload.github.com` | 不用代理也能通，可下 tarball |
| `*.github.io` | 不用代理也能通 —— **所以读者看你的博客不需要代理** |

代理：`127.0.0.1:7897`。注意"进程在跑"不等于"流量走它"，系统代理开关可能是关的。
