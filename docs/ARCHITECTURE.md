# LinguaFloat Architecture

This document explains the technical architecture and design decisions behind LinguaFloat.

## Overview

LinguaFloat is built using the Electron framework, combining Node.js (main process) with a React-based UI (renderer process). Communication between processes happens through a secure IPC bridge.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                     Main Process                        │
│  (Node.js - src/main/)                                  │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │  main.ts │  │  tray.ts │  │hotkeys.ts│              │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘              │
│       │             │              │                     │
│       └─────────────┴──────────────┘                     │
│                     │                                    │
│       ┌─────────────┴─────────────┐                      │
│       │   Window Management        │                      │
│       │   IPC Handlers             │                      │
│       └─────────────┬─────────────┘                      │
└───────────────────┬─┴─────────────────────────────────┘
                     │
              IPC Communication
            (contextBridge API)
                     │
┌───────────────────┴───────────────────────────────────┐
│                Preload Script                          │
│  (src/preload/index.ts)                                │
│                                                         │
│  Exposes secure API to renderer:                       │
│  - getSettings, saveSettings                           │
│  - getClipboard, setClipboard                          │
│  - refineText, generateFromIntent                      │
└───────────────────┬───────────────────────────────────┘
                     │
┌───────────────────┴───────────────────────────────────┐
│               Renderer Process                         │
│  (React + TypeScript - src/renderer/)                  │
│                                                         │
│  ┌──────────┐     ┌─────────────────────────┐          │
│  │  App.tsx │────▶│  FloatingWindow.tsx      │          │
│  └──────────┘     │  SettingsWindow.tsx      │          │
│                   └─────────────────────────┘          │
│                                                         │
│  Components:                                            │
│  - Header (tabs, dropdowns, settings button)           │
│  - InputSection (text inputs, action buttons)          │
│  - ResultPanel (editable result, copy buttons)         │
└─────────────────────────────────────────────────────────┘

External Services:
┌─────────────────────────────────────────────────────────┐
│              LLM Service (src/services/llm.ts)          │
│  - Builds prompts for Refine and Intent modes           │
│  - Makes HTTP requests to OpenAI-compatible API         │
│  - Returns formatted responses                          │
└─────────────────────────────────────────────────────────┘
```

## Process Breakdown

### Main Process (`src/main/`)

The main process is the Node.js backend that controls:

1. **Application Lifecycle** ([main.ts](../src/main/main.ts))
   - Initializes the app
   - Creates and manages windows
   - Handles app events (ready, quit, etc.)

2. **Window Management** ([main.ts](../src/main/main.ts))
   - Creates floating window (always-on-top, frameless)
   - Creates settings window (standard window)
   - Manages window positioning and visibility
   - Saves/restores window positions

3. **System Tray** ([tray.ts](../src/main/tray.ts))
   - Creates tray icon (macOS menu bar / Windows system tray)
   - Builds context menu
   - Handles tray interactions

4. **Global Hotkeys** ([hotkeys.ts](../src/main/hotkeys.ts))
   - Registers `Cmd/Ctrl + Shift + Space`
   - Toggles floating window visibility

5. **IPC Handlers** ([main.ts](../src/main/main.ts))
   - Handles requests from renderer process
   - Provides access to:
     - Settings (load/save)
     - Clipboard (read/write)
     - Window control (close)
     - LLM operations (refine/generate)

### Preload Script (`src/preload/`)

The preload script ([index.ts](../src/preload/index.ts)) creates a secure bridge:

- Exposes only whitelisted IPC methods to renderer
- Uses `contextBridge` to prevent Node.js access from renderer
- Provides TypeScript types for the exposed API

**Security**: The renderer process cannot directly access Node.js APIs, only the methods exposed through the preload script.

### Renderer Process (`src/renderer/`)

The renderer is a React application built with TypeScript:

1. **App Routing** ([App.tsx](../src/renderer/App.tsx))
   - Hash-based routing (#/ for floating window, #/settings for settings)
   - No router library needed (simple use case)

2. **Floating Window** ([pages/FloatingWindow.tsx](../src/renderer/pages/FloatingWindow.tsx))
   - Main UI with header, input, and result sections
   - Manages mode state (Refine vs Intent)
   - Handles LLM requests and displays results

3. **Settings Window** ([pages/SettingsWindow.tsx](../src/renderer/pages/SettingsWindow.tsx))
   - Configuration UI
   - Loads/saves settings via IPC
   - Applies theme changes immediately

4. **Components** ([components/](../src/renderer/components/))
   - Reusable UI components
   - Each component has its own CSS file

### Services Layer (`src/services/`)

**LLM Service** ([llm.ts](../src/services/llm.ts))
- Builds prompts for Refine and Intent modes
- Makes HTTP requests to OpenAI-compatible API
- Handles errors and returns formatted responses

### Utilities (`src/utils/`)

**Settings Management** ([settings.ts](../src/utils/settings.ts))
- Loads/saves settings from local JSON file
- Provides default settings
- Handles migrations for new settings

## Data Flow

### Example: Refining Text

1. **User Action**: User types text and clicks "Refine"
2. **Renderer**: `FloatingWindow` calls `window.electronAPI.refineText(request)`
3. **Preload**: Forwards request to main process via `ipcRenderer.invoke('refine-text', request)`
4. **Main Process**: IPC handler receives request
5. **LLM Service**: Main process calls `refineText(apiKey, request)`
6. **API Request**: Service makes HTTP POST to OpenAI API
7. **Response**: API returns refined text
8. **Main Process**: Returns result to renderer via IPC
9. **Renderer**: Displays result in `ResultPanel`

## File Structure

```
src/
├── main/                  # Electron main process (Node.js)
│   ├── main.ts           # App initialization, window management, IPC
│   ├── tray.ts           # System tray/menu bar
│   └── hotkeys.ts        # Global keyboard shortcuts
│
├── preload/              # Secure IPC bridge
│   └── index.ts          # Context bridge API
│
├── renderer/             # React UI (browser)
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # React entry point
│   ├── index.html        # HTML template
│   ├── pages/            # Page components
│   │   ├── FloatingWindow.tsx
│   │   └── SettingsWindow.tsx
│   ├── components/       # Reusable components
│   │   ├── Header.tsx
│   │   ├── InputSection.tsx
│   │   └── ResultPanel.tsx
│   ├── styles/           # CSS files
│   │   └── global.css
│   └── types/            # TypeScript definitions
│       └── electron.d.ts
│
├── services/             # Business logic
│   └── llm.ts           # LLM API communication
│
└── utils/               # Shared utilities
    └── settings.ts      # Settings management
```

## Key Design Decisions

### 1. Context Isolation
- **Why**: Security - prevent renderer from accessing Node.js
- **How**: `contextIsolation: true` + `nodeIntegration: false`
- **Impact**: Must use preload script for all IPC

### 2. Hash-based Routing
- **Why**: Simple routing without dependencies
- **How**: `window.location.hash` to switch between pages
- **Impact**: Lightweight, no router library needed

### 3. Local Settings Storage
- **Why**: Simple, no database needed
- **How**: JSON file in user data directory
- **Impact**: Easy to backup/reset, human-readable

### 4. Frameless Window
- **Why**: Custom UI, modern look
- **How**: `frame: false` in BrowserWindow options
- **Impact**: Must handle window dragging with CSS (`-webkit-app-region: drag`)

### 5. Always-on-Top Floating Window
- **Why**: Quick access without losing context
- **How**: `alwaysOnTop: true`, `skipTaskbar: true`
- **Impact**: Window stays above other apps

### 6. OpenAI-Compatible API
- **Why**: Flexibility to use different providers
- **How**: Standard Chat Completions format
- **Impact**: Works with OpenAI, Azure, local models, etc.

## Build Process

1. **Development**:
   - Vite dev server runs on port 5173
   - Electron loads from `http://localhost:5173`
   - Hot module reload for fast development

2. **Production Build**:
   - Vite builds renderer to `dist/renderer/`
   - TypeScript compiles main process to `dist/main/`
   - electron-builder packages app with assets

3. **Platform-Specific**:
   - macOS: `.dmg` installer
   - Windows: `.exe` NSIS installer
   - Icons and metadata from `package.json` build config

## Performance Considerations

1. **Fast Startup**:
   - No main window on launch
   - Lazy load settings
   - Minimal initial state

2. **Low Memory**:
   - Single window architecture
   - No heavy dependencies
   - Efficient React rendering

3. **Quick Response**:
   - Settings cached in memory
   - IPC optimized for small payloads
   - Direct API calls (no middleware)

## Security

1. **API Key Storage**:
   - Stored in local JSON (OS-protected user directory)
   - Never transmitted except to LLM API
   - Not logged or exposed to renderer

2. **Context Isolation**:
   - Renderer cannot access Node.js
   - All IPC goes through whitelisted preload API
   - No eval or dynamic code execution

3. **Content Security**:
   - No external content loading in renderer
   - All assets bundled
   - HTTPS required for API calls

## Future Enhancements

1. **Encryption**: Encrypt settings.json (especially API key)
2. **Multiple Providers**: Support for different LLM APIs
3. **Offline Mode**: Local model integration
4. **History Database**: SQLite for message history
5. **Sync**: Cloud backup/sync across devices
