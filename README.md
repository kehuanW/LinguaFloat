# LinguaFloat

A cross-platform desktop app designed for non-native English speakers to quickly refine or generate English messages without switching apps or opening a browser.

![LinguaFloat Demo](docs/demo.png)

## Features

### 🎯 Two Modes
- **Refine Mode**: Improve existing text while preserving meaning
- **Write from Intent**: Generate messages from your ideas

### ⚡ Quick Access
- Menu bar (macOS) / System tray (Windows) icon
- Global hotkey: `Cmd/Ctrl + Shift + Space`
- Always-on-top floating window

### 🎨 Customization
- **Tone**: Neutral, Professional, Warm
- **Style**: Refine, Shorter, More Polite
- **Theme**: Light/Dark mode
- Auto-paste from clipboard

### 🔒 Privacy-First
- API key stored locally
- No data collection
- Works with OpenAI-compatible APIs

## Installation

### From Source

```bash
# Clone the repository
git clone https://github.com/yourusername/linguafloat.git
cd linguafloat

# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Build platform-specific installers
npm run build:mac    # macOS
npm run build:win    # Windows
npm run build:all    # Both platforms
```

## Setup

1. **Launch LinguaFloat** - The app runs in your menu bar/system tray
2. **Open Settings** - Click the tray icon → Settings
3. **Add API Key** - Enter your OpenAI API key
4. **Configure Defaults** - Set your preferred tone and style
5. **Start Using** - Press `Cmd/Ctrl + Shift + Space` or click the tray icon

## Usage

### Refine Existing Text
1. Open LinguaFloat (`Cmd/Ctrl + Shift + Space`)
2. Select **Refine** mode
3. Paste or type your text
4. Optionally add context
5. Click **Refine**
6. Copy the result or edit as needed

### Write from Intent
1. Open LinguaFloat
2. Select **Write from Intent** mode
3. Describe what you want to say
4. Add context if needed
5. Click **Generate**
6. Copy the result

## Configuration

Settings are stored locally in a JSON file:
- **macOS**: `~/Library/Application Support/LinguaFloat/settings.json`
- **Windows**: `%APPDATA%/LinguaFloat/settings.json`
- **Linux**: `~/.config/LinguaFloat/settings.json`

### Settings Options
- `apiKey`: Your OpenAI API key
- `defaultTone`: Default tone (neutral/professional/warm)
- `defaultStyle`: Default style (refine/shorter/more_polite)
- `autoPasteClipboard`: Auto-fill from clipboard (true/false)
- `closeOnClickOutside`: Close when losing focus (true/false)
- `theme`: UI theme (light/dark)
- `windowPosition`: Last window position (auto-saved)

## Tech Stack

- **Electron** - Desktop app framework
- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast development and bundling
- **Zustand** - State management (ready for future use)
- **OpenAI API** - LLM integration (compatible with other APIs)

## Project Structure

```
LinguaFloat/
├── src/
│   ├── main/              # Electron main process
│   │   ├── main.ts        # App initialization, window management
│   │   ├── tray.ts        # System tray/menu bar
│   │   └── hotkeys.ts     # Global keyboard shortcuts
│   ├── preload/           # Secure IPC bridge
│   │   └── index.ts       # Context bridge API
│   ├── renderer/          # React UI
│   │   ├── App.tsx        # Main app component
│   │   ├── pages/         # Window components
│   │   ├── components/    # Reusable UI components
│   │   └── styles/        # CSS files
│   ├── services/          # Business logic
│   │   └── llm.ts         # LLM API communication
│   └── utils/             # Shared utilities
│       └── settings.ts    # Settings management
├── assets/                # App icons and images
├── docs/                  # Documentation
└── package.json           # Dependencies and scripts
```

## Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Running in Development
```bash
npm run dev
```

This starts:
- Vite dev server on port 5173
- Electron app with hot reload

### Building
```bash
# Build renderer and main process
npm run build

# Create platform-specific installer
npm run build:mac    # macOS (.dmg)
npm run build:win    # Windows (.exe)
```

### Type Checking
```bash
npm run type-check
```

## API Compatibility

LinguaFloat uses the OpenAI Chat Completions API. It's compatible with:
- OpenAI API
- Azure OpenAI
- Other OpenAI-compatible endpoints

The default model is `gpt-3.5-turbo`. To use a different model, modify [src/services/llm.ts](src/services/llm.ts#L58).

## Roadmap

### V1 (Current)
- ✅ Menu bar / System tray
- ✅ Floating window
- ✅ Refine mode
- ✅ Write from Intent mode
- ✅ Tone and style selection
- ✅ Settings window
- ✅ Local storage
- ✅ Global hotkey
- ✅ Theme support

### V1.5 (Planned)
- [ ] Better error handling and retry logic
- [ ] Loading states and animations
- [ ] Window position memory improvements
- [ ] Keyboard shortcuts for actions

### V2 (Future)
- [ ] History of refined/generated messages
- [ ] Scenario templates
- [ ] Custom hotkey configuration
- [ ] Multiple API provider support
- [ ] Offline mode with local models
- [ ] Browser extension integration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Electron](https://www.electronjs.org/)
- UI powered by [React](https://react.dev/)
- Icons from [Lucide](https://lucide.dev/)

## Support

If you encounter any issues or have questions:
- Open an issue on [GitHub](https://github.com/yourusername/linguafloat/issues)
- Check the [documentation](docs/)

---

Made with ❤️ for non-native English speakers everywhere
