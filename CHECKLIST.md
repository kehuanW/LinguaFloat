# LinguaFloat - Development Checklist

Use this checklist to track your progress from initial setup to production release.

## ✅ Initial Setup

- [ ] Clone the repository
- [ ] Install Node.js 18+ (check: `node --version`)
- [ ] Run `npm install`
- [ ] Get OpenAI API key from [platform.openai.com](https://platform.openai.com/api-keys)
- [ ] Read [GETTING_STARTED.md](GETTING_STARTED.md)

## ✅ First Run

- [ ] Run `npm run dev`
- [ ] Verify tray icon appears
- [ ] Click tray icon → Settings
- [ ] Enter API key
- [ ] Save settings
- [ ] Test global hotkey (`Cmd/Ctrl + Shift + Space`)
- [ ] Verify floating window opens

## ✅ Feature Testing

### Refine Mode
- [ ] Open floating window
- [ ] Select Refine tab
- [ ] Enter text in main input
- [ ] Add optional context
- [ ] Choose tone (Neutral/Professional/Warm)
- [ ] Choose style (Refine/Shorter/More Polite)
- [ ] Click Refine button
- [ ] Verify loading state shows
- [ ] Verify result appears
- [ ] Edit result text
- [ ] Click Copy button
- [ ] Verify clipboard has result
- [ ] Click Copy & Close
- [ ] Verify window closes

### Write from Intent Mode
- [ ] Open floating window
- [ ] Select Write from Intent tab
- [ ] Enter intent description
- [ ] Add optional context
- [ ] Choose tone
- [ ] Choose style
- [ ] Click Generate button
- [ ] Verify result appears
- [ ] Copy result

### Settings Window
- [ ] Open Settings
- [ ] Change default tone
- [ ] Change default style
- [ ] Toggle auto-paste clipboard
- [ ] Toggle close on click outside
- [ ] Switch theme (Light ↔ Dark)
- [ ] Click Save Settings
- [ ] Close settings
- [ ] Reopen to verify persistence

### Window Behavior
- [ ] Drag floating window
- [ ] Close and reopen - verify position remembered
- [ ] Test close on click outside (if enabled)
- [ ] Verify always-on-top behavior

### Error Handling
- [ ] Test with empty input (should show error)
- [ ] Test with invalid API key (should show error)
- [ ] Test with no internet (should show error)
- [ ] Verify error messages are clear

## ✅ Code Quality

- [ ] Run `npm run type-check` (no errors)
- [ ] Check all TypeScript files compile
- [ ] Review code comments
- [ ] Check console for warnings/errors

## ✅ Customization (Optional)

- [ ] Update `package.json` author
- [ ] Update `package.json` repository URL
- [ ] Customize LLM prompts in [src/services/llm.ts](src/services/llm.ts)
- [ ] Adjust theme colors in [src/renderer/styles/global.css](src/renderer/styles/global.css)
- [ ] Change window size in [src/main/main.ts](src/main/main.ts)
- [ ] Customize hotkey in [src/main/hotkeys.ts](src/main/hotkeys.ts)

## ✅ Before Production

### App Icons
- [ ] Create or get 512x512 PNG icon
- [ ] Convert to `.icns` for macOS
- [ ] Convert to `.ico` for Windows
- [ ] Place in `assets/` folder
- [ ] Create 16x16 tray icon (`tray-icon.png`)
- [ ] Update paths in [src/main/tray.ts](src/main/tray.ts)

### Metadata
- [ ] Update version in `package.json`
- [ ] Update `appId` in `package.json` build section
- [ ] Add your name to LICENSE
- [ ] Update README.md with your repo URL
- [ ] Review all documentation

### Code Signing (for distribution)
- [ ] Get Apple Developer account (macOS)
- [ ] Get code signing certificate
- [ ] Configure signing in `package.json`
- [ ] Test signed build

### Security Review
- [ ] Ensure API key is never logged
- [ ] Verify no console.log in production
- [ ] Check all external API calls use HTTPS
- [ ] Review IPC security (context isolation enabled)

### Testing
- [ ] Test on clean macOS installation
- [ ] Test on Windows 10/11
- [ ] Test with different OpenAI API endpoints
- [ ] Test with rate limiting
- [ ] Test with slow internet
- [ ] Test all error scenarios

## ✅ Building

### Development Build
- [ ] Run `npm run build`
- [ ] Check `dist/` folder created
- [ ] Verify no build errors

### Production Build (macOS)
- [ ] Run `npm run build:mac`
- [ ] Check `release/` folder
- [ ] Verify `.dmg` file created
- [ ] Test installation from `.dmg`
- [ ] Verify app launches correctly
- [ ] Test all features in built app

### Production Build (Windows)
- [ ] Run `npm run build:win`
- [ ] Check `release/` folder
- [ ] Verify `.exe` installer created
- [ ] Test installation
- [ ] Verify app launches correctly
- [ ] Test all features in built app

## ✅ Distribution

- [ ] Create GitHub release
- [ ] Upload macOS `.dmg`
- [ ] Upload Windows `.exe`
- [ ] Write release notes
- [ ] Update version number
- [ ] Tag release in git

## ✅ Documentation

- [ ] Update README.md with screenshots
- [ ] Add demo GIF/video
- [ ] Update QUICK_START.md with any changes
- [ ] Document any customizations
- [ ] Add troubleshooting tips
- [ ] Create FAQ if needed

## ✅ Optional Enhancements

- [ ] Add keyboard shortcuts guide
- [ ] Implement history feature (V2)
- [ ] Add scenario templates (V2)
- [ ] Allow hotkey customization (V2)
- [ ] Add analytics (if desired)
- [ ] Create auto-updater
- [ ] Add crash reporting
- [ ] Multi-language UI

## 🎯 Quick Reference

### Development Commands
```bash
npm run dev              # Start development
npm run type-check       # Check TypeScript
npm run build            # Build for testing
npm run build:mac        # Build macOS installer
npm run build:win        # Build Windows installer
npm run build:all        # Build all platforms
```

### Important Files
- `src/main/main.ts` - Main process entry point
- `src/renderer/App.tsx` - UI entry point
- `src/services/llm.ts` - LLM integration
- `src/utils/settings.ts` - Settings management
- `package.json` - Dependencies and build config

### Default Hotkey
- macOS: `Cmd + Shift + Space`
- Windows: `Ctrl + Shift + Space`

### Settings Location
- macOS: `~/Library/Application Support/LinguaFloat/settings.json`
- Windows: `%APPDATA%/LinguaFloat/settings.json`

---

**Progress**: Check off items as you complete them!

Once all items are checked, your app is ready for production release. 🚀
