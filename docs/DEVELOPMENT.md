# Development Guide

This guide will help you set up and develop LinguaFloat.

## Prerequisites

- **Node.js**: Version 18 or higher
- **npm**: Version 8 or higher (comes with Node.js)
- **Git**: For version control
- **Code Editor**: VS Code recommended

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/linguafloat.git
cd linguafloat
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- Electron
- React and React DOM
- TypeScript
- Vite
- Development tools

### 3. Get an API Key

You'll need an OpenAI API key to test the LLM features:

1. Go to [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Create a new API key
3. Save it securely (you'll enter it in the app settings)

## Running in Development

### Start the Development Server

```bash
npm run dev
```

This command:
1. Starts Vite dev server on `http://localhost:5173`
2. Waits for the server to be ready
3. Launches Electron app
4. Enables hot module reload

### What You'll See

1. The app icon appears in your menu bar (macOS) or system tray (Windows)
2. Click the icon or press `Cmd/Ctrl + Shift + Space` to open the floating window
3. Click the settings icon to configure your API key

## Development Workflow

### Making Changes

1. **Renderer Changes** (React/UI):
   - Edit files in `src/renderer/`
   - Changes hot reload automatically
   - Check browser console in DevTools

2. **Main Process Changes** (Electron):
   - Edit files in `src/main/`, `src/services/`, `src/utils/`
   - Restart the app (`Ctrl+C` and `npm run dev`)
   - Check terminal for errors

3. **Preload Changes**:
   - Edit `src/preload/index.ts`
   - Restart the app
   - Update TypeScript types in `src/renderer/types/electron.d.ts`

### Debugging

#### Renderer Process (React)

Uncomment this line in [src/main/main.ts](../src/main/main.ts#L93):

```typescript
this.floatingWindow.webContents.openDevTools({ mode: 'detach' });
```

This opens Chrome DevTools for the floating window.

#### Main Process (Electron)

1. Add `console.log()` statements
2. Check the terminal where you ran `npm run dev`
3. Or use VS Code debugger:

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Main Process",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron",
      "windows": {
        "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron.cmd"
      },
      "args": ["."],
      "outputCapture": "std"
    }
  ]
}
```

### Type Checking

```bash
npm run type-check
```

Checks TypeScript types without emitting files.

## Project Structure

```
LinguaFloat/
├── src/
│   ├── main/              # Electron main process
│   │   ├── main.ts        # ⭐ App core
│   │   ├── tray.ts        # System tray
│   │   └── hotkeys.ts     # Global shortcuts
│   │
│   ├── preload/           # IPC bridge
│   │   └── index.ts       # ⭐ Secure API
│   │
│   ├── renderer/          # React app
│   │   ├── App.tsx        # ⭐ Router
│   │   ├── pages/         # Windows
│   │   ├── components/    # UI components
│   │   ├── styles/        # CSS
│   │   └── types/         # TypeScript types
│   │
│   ├── services/          # Business logic
│   │   └── llm.ts         # ⭐ API calls
│   │
│   └── utils/             # Utilities
│       └── settings.ts    # ⭐ Settings I/O
│
├── assets/                # Icons
├── docs/                  # Documentation
├── package.json           # Dependencies
├── vite.config.ts         # Vite config
└── tsconfig*.json         # TypeScript configs
```

## Common Tasks

### Adding a New UI Component

1. Create component file:
```bash
touch src/renderer/components/MyComponent.tsx
touch src/renderer/components/MyComponent.css
```

2. Implement component:
```tsx
import React from 'react';
import './MyComponent.css';

interface MyComponentProps {
  // Props
}

function MyComponent({ }: MyComponentProps) {
  return (
    <div className="my-component">
      {/* Content */}
    </div>
  );
}

export default MyComponent;
```

3. Import and use:
```tsx
import MyComponent from '../components/MyComponent';
```

### Adding a New IPC Method

1. **Main Process** ([src/main/main.ts](../src/main/main.ts)):
```typescript
ipcMain.handle('my-method', async (_, arg) => {
  // Logic here
  return result;
});
```

2. **Preload** ([src/preload/index.ts](../src/preload/index.ts)):
```typescript
const electronAPI: ElectronAPI = {
  // ... existing methods
  myMethod: (arg) => ipcRenderer.invoke('my-method', arg),
};
```

3. **Type Definitions** ([src/renderer/types/electron.d.ts](../src/renderer/types/electron.d.ts)):
```typescript
export interface ElectronAPI {
  // ... existing methods
  myMethod: (arg: string) => Promise<Result>;
}
```

4. **Renderer** (use it):
```typescript
const result = await window.electronAPI.myMethod('test');
```

### Adding a New Setting

1. **Update interface** ([src/utils/settings.ts](../src/utils/settings.ts)):
```typescript
export interface AppSettings {
  // ... existing settings
  mySetting: string;
}
```

2. **Add default value**:
```typescript
const defaultSettings: AppSettings = {
  // ... existing defaults
  mySetting: 'default',
};
```

3. **Update Settings UI** ([src/renderer/pages/SettingsWindow.tsx](../src/renderer/pages/SettingsWindow.tsx)):
```tsx
<div className="setting-item">
  <label>My Setting</label>
  <input
    value={settings.mySetting}
    onChange={(e) => updateSetting('mySetting', e.target.value)}
  />
</div>
```

### Changing LLM Prompts

Edit [src/services/llm.ts](../src/services/llm.ts):

```typescript
function buildRefinePrompt(request: RefineRequest) {
  const system = `Your custom prompt here...`;
  // ...
}
```

### Changing the Hotkey

Edit [src/main/hotkeys.ts](../src/main/hotkeys.ts):

```typescript
const hotkey = process.platform === 'darwin'
  ? 'Command+Option+L'  // macOS
  : 'Control+Alt+L';     // Windows/Linux
```

## Building for Production

### Build All Platforms

```bash
npm run build:all
```

Creates installers in `release/`:
- macOS: `LinguaFloat-1.0.0.dmg`
- Windows: `LinguaFloat Setup 1.0.0.exe`

### Build Specific Platform

```bash
npm run build:mac    # macOS only
npm run build:win    # Windows only
```

### Build Configuration

Edit [package.json](../package.json) `build` section:

```json
{
  "build": {
    "appId": "com.linguafloat.app",
    "productName": "LinguaFloat",
    "mac": {
      "category": "public.app-category.productivity"
    }
  }
}
```

## Testing

### Manual Testing Checklist

- [ ] App launches and tray icon appears
- [ ] Hotkey opens/closes floating window
- [ ] Window position is remembered
- [ ] Settings save and persist
- [ ] API key validation works
- [ ] Refine mode produces results
- [ ] Intent mode produces results
- [ ] Copy buttons work
- [ ] Copy & Close works
- [ ] Theme switching works
- [ ] Clipboard auto-paste works (if enabled)

### Testing Different API Endpoints

To test with a different API endpoint, edit [src/services/llm.ts](../src/services/llm.ts):

```typescript
// Default
const apiEndpoint = 'https://api.openai.com/v1/chat/completions';

// Azure OpenAI
const apiEndpoint = 'https://YOUR_RESOURCE.openai.azure.com/openai/deployments/YOUR_DEPLOYMENT/chat/completions?api-version=2023-05-15';
```

## Troubleshooting

### Electron Won't Start

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Vite Build Errors

```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

### TypeScript Errors

```bash
# Check for type errors
npm run type-check
```

### Hotkey Not Working

- Make sure another app isn't using the same hotkey
- On macOS, grant Accessibility permissions:
  - System Preferences → Security & Privacy → Accessibility
  - Add Electron to the list

### Settings Not Persisting

Check the settings file location:
- macOS: `~/Library/Application Support/LinguaFloat/settings.json`
- Windows: `%APPDATA%/LinguaFloat/settings.json`

Delete it to reset to defaults.

## Code Style

### TypeScript

- Use interfaces for object types
- Prefer `const` over `let`
- Use async/await over promises
- Add JSDoc comments for functions

### React

- Functional components only
- Props interface for each component
- Use React hooks (useState, useEffect)
- Keep components focused and small

### CSS

- Use CSS variables for theming
- BEM-like naming: `.component-name__element`
- Separate CSS file for each component

## Resources

- [Electron Documentation](https://www.electronjs.org/docs)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Getting Help

- Check [ARCHITECTURE.md](ARCHITECTURE.md) for system design
- Open an issue on GitHub
- Review existing issues and discussions
