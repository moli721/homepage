English | [中文](./README.md)

<p>
<strong><h2>Moli's Homepage</h2></strong>
A personal homepage project based on <a href="https://github.com/imsyy/home">無名の主页</a>
</p>

![Moli's Homepage](/screenshots/main.jpg)

### Demo

- [Moli's Homepage](https://moli721.xyz)

### About

This project is forked from [imsyy/home](https://github.com/imsyy/home) (original project archived). It includes many optimizations and feature enhancements. Thanks to the original author [@imsyy](https://github.com/imsyy) for the open source contribution.

### Improvements Over Original Project

#### New Features

- [x] Custom wallpaper (separate settings for mobile/desktop)
- [x] Music player progress bar (drag and click to seek)
- [x] Mobile bottom Tab navigation (Home/Features/Links)
- [x] Hitokoto transition animation optimization
- [x] Moe ICP badge display

#### Experience Optimization

- [x] Smooth progress bar animation (RAF interpolation)
- [x] Mobile box fullscreen adaptation
- [x] Settings page mobile adaptation
- [x] Mobile Hitokoto and music card style optimization

#### Bug Fixes

- [x] Fixed Music component null pointer error
- [x] Fixed music interruption when switching tabs on mobile
- [x] Fixed favicon browser cache issue

### Future Plans

- [ ] Further optimize desktop and mobile interaction experience
- [ ] Add more personalization options
- [ ] Optimize page loading performance
- [ ] Add more utility components
- [ ] Improve dark mode support
- [ ] Migrate to TypeScript (optional)

### Deployment

#### Manual Deployment

```bash
# Install pnpm
npm install -g pnpm

# Install dependencies
pnpm install

# Preview
pnpm dev

# Build
pnpm build
```

After building, static resources will be generated in the `dist` directory.

#### Vercel Deployment

1. Fork this repository to your GitHub account
2. Copy `.env.example` and rename it to `.env`
3. Modify the `.env` file as needed
4. Import the project in Vercel and deploy

### Configuration

#### Environment Variables

Please refer to the `.env.example` file to configure:

- Site information (author, URL, ICP number, etc.)
- Weather API Key (Amap Open Platform)
- Music player configuration (playlist ID, server, etc.)

#### Site Links

Customize navigation links in `src/assets/siteLinks.json`.

#### Social Links

Customize social links in `src/assets/socialLinks.json`.

### Tech Stack

- [Vue 3](https://vuejs.org/) - Progressive JavaScript Framework
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [Pinia](https://pinia.vuejs.org/) - Vue State Management
- [Element Plus](https://element-plus.org/) - Vue 3 Component Library
- [Aplayer](https://aplayer.js.org/) - Music Player

### Changelog

#### v4.3.0

- Refactored Store architecture into three independent modules:
  - `usePlayerStore` - Music player state
  - `useUIStore` - UI state management
  - `useSettingsStore` - User settings (persisted)
- Added `constants.js` for unified management of breakpoints and configuration
- Fixed memory leak in Music component event listeners
- Enhanced API layer: added request timeout and unified error handling
- Improved code quality while maintaining backward compatibility

#### v4.2.0

- Added mobile bottom Tab navigation
- Added music player progress bar component
- Optimized mobile box fullscreen adaptation
- Fixed settings page mobile adaptation issues

#### v4.1.0

- Added custom wallpaper feature
- Support separate wallpaper settings for mobile/desktop
- Optimized Hitokoto component transition animation

### Acknowledgments

- [imsyy/home](https://github.com/imsyy/home) - Original project author
- [Hitokoto](https://hitokoto.cn/)
- [Amap Open Platform](https://lbs.amap.com/)

### License

This project is based on the original project for secondary development and follows the original project's open source license.

---

<a title="Copyright" target="_blank" href="https://moli721.xyz/"><img src="https://img.shields.io/badge/Copyright%20%C2%A9%202024--2025-Moli-blue"></a>
