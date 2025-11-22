# 👋 Welcome to LinguaFloat!

You now have a **complete, production-ready Electron desktop application** built with React and TypeScript.

## What You Have

✅ **Full V1 Implementation** - All core features working  
✅ **30+ Source Files** - Well-organized, documented code  
✅ **Type-Safe** - Full TypeScript coverage  
✅ **Cross-Platform** - macOS, Windows, Linux ready  
✅ **Modern UI** - Light/Dark theme support  
✅ **Secure** - Context isolation, local storage  

## Quick Start (3 Steps)

### 1. Install Dependencies
```bash
npm install
```

### 2. Get API Key
Visit [platform.openai.com/api-keys](https://platform.openai.com/api-keys) and create a key.

### 3. Run the App
```bash
npm run dev
```

Then:
- Find the LinguaFloat icon in your menu bar/tray
- Click it → Settings
- Enter your API key
- Click Save
- Press `Cmd+Shift+Space` (or `Ctrl+Shift+Space`) to open!

## 📚 Documentation

Choose your path:

### 👤 I'm a User
→ Read [GETTING_STARTED.md](GETTING_STARTED.md) for step-by-step setup  
→ Read [docs/QUICK_START.md](docs/QUICK_START.md) for usage guide

### 👨‍💻 I'm a Developer
→ Read [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) for technical overview  
→ Read [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) for dev guide  
→ Read [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for system design

### ✅ I Want a Checklist
→ Use [CHECKLIST.md](CHECKLIST.md) to track your progress

## 🎯 What LinguaFloat Does

**Two Modes:**

1. **Refine** - Improve existing text
   - Paste your rough draft
   - Choose tone (Neutral/Professional/Warm)
   - Choose style (Refine/Shorter/More Polite)
   - Get polished version instantly

2. **Write from Intent** - Generate from scratch
   - Describe what you want to say
   - AI writes it for you
   - Edit and copy

**Features:**
- 🔥 Global hotkey for instant access
- 🎨 Clean, modern UI
- 🌓 Light/Dark theme
- 📋 Auto-paste from clipboard
- 💾 Remembers window position
- 🔒 Secure API key storage

## 🏗️ Project Structure

```
src/
├── main/          # Electron (tray, windows, hotkeys)
├── preload/       # Secure IPC bridge
├── renderer/      # React UI (pages, components)
├── services/      # LLM API integration
└── utils/         # Settings, helpers

docs/              # Full documentation
assets/            # App icons (add your own!)
```

## 🛠️ Development

```bash
npm run dev              # Start with hot reload
npm run build            # Build for testing
npm run build:mac        # Build macOS installer
npm run build:win        # Build Windows installer
```

## 🚀 What's Next?

1. **Try it out** - Run `npm run dev` and test all features
2. **Customize** - Change colors, prompts, behavior
3. **Add icons** - Replace placeholder icons in `assets/`
4. **Build** - Create installers for distribution

## 📖 File Guide

| File | Purpose |
|------|---------|
| [README.md](README.md) | Main documentation |
| [GETTING_STARTED.md](GETTING_STARTED.md) | Setup guide (start here!) |
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | Technical overview |
| [CHECKLIST.md](CHECKLIST.md) | Progress tracker |
| [docs/QUICK_START.md](docs/QUICK_START.md) | User guide |
| [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) | Developer guide |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | System design |

## ❓ Common Questions

**Q: Do I need to write any code?**  
A: No! It's ready to use. Just add your API key.

**Q: Can I customize it?**  
A: Yes! All code is documented and easy to modify.

**Q: Does it work on Windows?**  
A: Yes! Builds for macOS, Windows, and Linux.

**Q: Is my API key safe?**  
A: Yes! It's stored locally on your machine only.

**Q: Can I use a different LLM?**  
A: Yes! Any OpenAI-compatible API works.

## 🎓 Learning the Code

Every file has detailed comments explaining:
- What it does
- Why it's designed that way
- How it connects to other parts

Start with these key files:
1. [src/main/main.ts](src/main/main.ts) - App core
2. [src/renderer/pages/FloatingWindow.tsx](src/renderer/pages/FloatingWindow.tsx) - Main UI
3. [src/services/llm.ts](src/services/llm.ts) - API calls
4. [src/utils/settings.ts](src/utils/settings.ts) - Settings

## ✨ Features Included

### V1 (Complete)
- ✅ Menu bar / System tray
- ✅ Floating always-on-top window
- ✅ Global hotkey
- ✅ Refine mode
- ✅ Write from Intent mode
- ✅ Tone selection
- ✅ Style selection
- ✅ Context input
- ✅ Editable results
- ✅ Copy & Copy + Close
- ✅ Settings window
- ✅ Theme support
- ✅ Position memory
- ✅ Clipboard integration

### V2 (Planned)
- History feature
- Custom hotkeys
- Scenario templates
- Multi-provider support

## 💡 Tips

1. **Fast Workflow**: 
   - Copy text → Press hotkey → Result auto-pastes → Press Enter → Copy result
   
2. **Use Context**: 
   - Add context like "Email to boss" or "Slack message" for better results
   
3. **Experiment**: 
   - Try different tone/style combinations to find what works best

## 🐛 Troubleshooting

**App won't start?**
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**API errors?**
- Check your API key is valid
- Verify you have OpenAI API credits
- Check your internet connection

**Hotkey not working?**
- macOS: Grant Accessibility permissions
- Windows: Make sure no other app uses the same key

## 📞 Getting Help

- Check the [docs/](docs/) folder
- Review code comments (they explain everything!)
- Open an issue on GitHub
- Read troubleshooting guides

## 🎉 You're Ready!

Run this now:
```bash
npm install && npm run dev
```

Then look for the tray icon and start refining! 🚀

---

**Built with ❤️ for non-native English speakers everywhere**
