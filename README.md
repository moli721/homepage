<p>
<strong><h2>陌离の主页</h2></strong>
基于 <a href="https://github.com/imsyy/home">無名の主页</a> 二次开发的个人主页项目
</p>

![陌离の主页](/screenshots/main.jpg)

### Demo

- [陌离の主页](https://moli721.xyz)

### 项目说明

本项目 Fork 自 [imsyy/home](https://github.com/imsyy/home)（原项目已归档），在原项目基础上进行了大量优化和功能增强，感谢原作者 [@imsyy](https://github.com/imsyy) 的开源贡献。

### 相比原项目的改进

#### 新增功能

- [x] 自定义壁纸功能（支持移动端/桌面端分别设置）
- [x] 音乐播放进度条（支持拖动、点击跳转）
- [x] 移动端底部 Tab 导航（首页/功能/导航三栏切换）
- [x] 一言组件过渡动画优化
- [x] 萌ICP备案号显示

#### 体验优化

- [x] 进度条平滑动画（RAF 插值优化）
- [x] 移动端盒子全屏适配
- [x] 设置页面移动端适配
- [x] 移动端一言和音乐卡片样式优化

#### Bug 修复

- [x] 修复 Music 组件空指针错误
- [x] 修复移动端切换 Tab 音乐中断问题
- [x] 修复 favicon 浏览器缓存问题

### 未来计划

- [ ] 进一步优化桌面端和移动端的交互体验
- [ ] 代码重构，提升代码质量和可维护性
- [ ] 添加更多个性化配置选项
- [ ] 优化页面加载性能
- [ ] 添加更多实用功能组件
- [ ] 完善暗色模式支持

### 部署

#### 手动部署

```bash
# 安装 pnpm
npm install -g pnpm

# 安装依赖
pnpm install

# 预览
pnpm dev

# 构建
pnpm build
```

构建完成后，静态资源会在 `dist` 目录中生成。

#### Vercel 部署

1. Fork 本仓库到你的 GitHub 账号
2. 复制 `.env.example` 文件并重命名为 `.env`
3. 按需修改 `.env` 文件中的配置
4. 在 Vercel 中导入项目并部署

### 配置说明

#### 环境变量

请参考 `.env.example` 文件配置以下内容：

- 站点信息（作者、URL、备案号等）
- 天气 API Key（高德开放平台）
- 音乐播放器配置（歌单 ID、服务器等）

#### 网站链接

在 `src/assets/siteLinks.json` 中自定义导航链接。

#### 社交链接

在 `src/assets/socialLinks.json` 中自定义社交链接。

### 技术栈

- [Vue 3](https://cn.vuejs.org/) - 渐进式 JavaScript 框架
- [Vite](https://vitejs.cn/) - 下一代前端构建工具
- [Pinia](https://pinia.vuejs.org/zh/) - Vue 状态管理
- [Element Plus](https://element-plus.org/) - Vue 3 组件库
- [Aplayer](https://aplayer.js.org/) - 音乐播放器

### 更新日志

#### v4.2.0

- 新增移动端底部 Tab 导航
- 新增音乐播放进度条组件
- 优化移动端盒子全屏适配
- 修复设置页面移动端适配问题

#### v4.1.0

- 新增自定义壁纸功能
- 支持移动端/桌面端分别设置壁纸
- 优化一言组件过渡动画

### 致谢

- [imsyy/home](https://github.com/imsyy/home) - 原项目作者
- [Hitokoto 一言](https://hitokoto.cn/)
- [高德开放平台](https://lbs.amap.com/)

### 许可证

本项目基于原项目进行二次开发，遵循原项目的开源协议。

---

<a title="Copyright" target="_blank" href="https://moli721.xyz/"><img src="https://img.shields.io/badge/Copyright%20%C2%A9%202024--2025-陌离-blue"></a>
