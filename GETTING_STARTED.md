# Getting Started with LinguaFloat

Follow these steps to get LinguaFloat running on your machine.

## Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages. It may take a few minutes.

## Step 2: Get an OpenAI API Key

1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Give it a name (e.g., "LinguaFloat")
5. Copy the key (starts with `sk-...`)
6. Keep it safe - you'll need it in Step 4

## Step 3: Start the App

```bash
npm run dev
```

You should see:
- Terminal shows: "Vite dev server started on port 5173"
- LinguaFloat icon appears in your menu bar (macOS) or system tray (Windows)

## Step 4: Configure Your API Key

1. Click the LinguaFloat icon in your menu bar/tray
2. Click **Settings** from the menu
3. Paste your OpenAI API key in the "OpenAI API Key" field
4. (Optional) Adjust other settings:
   - Default Tone
   - Default Style
   - Auto-paste from clipboard
   - Theme
5. Click **Save Settings**
6. Close the settings window

## Step 5: Try It Out!

### Test Refine Mode

1. Press `Cmd + Shift + Space` (macOS) or `Ctrl + Shift + Space` (Windows)
2. The floating window appears
3. Make sure **Refine** tab is selected
4. Type or paste some text:
   ```
   hi can u help me with this bug its not working
   ```
5. (Optional) Add context:
   ```
   Message to senior developer
   ```
6. Select:
   - Tone: **Professional**
   - Style: **More Polite**
7. Click **Refine**
8. Wait a few seconds
9. You'll see the refined text!
10. Click **Copy & Close**

### Test Write from Intent Mode

1. Press the hotkey again to open the window
2. Click **Write from Intent** tab
3. Describe what you want to say:
   ```
   tell my team the meeting is moved to 3pm tomorrow
   ```
4. (Optional) Add context:
   ```
   Slack message
   ```
5. Select:
   - Tone: **Warm**
   - Style: **Shorter**
6. Click **Generate**
7. See the generated message!

## Step 6: Customize (Optional)

Edit settings by clicking the LinguaFloat icon → **Settings**:

- **Default Tone**: Your preferred tone (saves time)
- **Default Style**: Your preferred style
- **Auto-paste from clipboard**: Enable to auto-fill text when opening
- **Close on click outside**: Enable to auto-hide window
- **Theme**: Switch between Light and Dark

## Troubleshooting

### "npm install" fails

Try:
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### "API key is required" error

1. Make sure you entered your API key in Settings
2. Check it starts with `sk-`
3. Make sure you clicked **Save Settings**

### Hotkey doesn't work

**macOS**:
1. System Preferences → Security & Privacy → Accessibility
2. Add Terminal or your IDE to the allowed apps
3. Restart the app

**Windows**:
- Make sure no other app is using `Ctrl + Shift + Space`

### Window doesn't appear

1. Look for the LinguaFloat icon in menu bar/tray
2. Click it → Open LinguaFloat
3. If still not visible, restart the app

### Can't see tray icon

**macOS**: Look in the top-right menu bar
**Windows**: Look in the system tray (bottom-right, may need to click ^ to expand)

## What's Next?

- Read [README.md](README.md) for full documentation
- Check [docs/QUICK_START.md](docs/QUICK_START.md) for usage tips
- See [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) to customize the app
- Review [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) for technical overview

## Building for Production

When you're ready to create installers:

```bash
# macOS
npm run build:mac

# Windows
npm run build:win

# Both
npm run build:all
```

Installers will be in the `release/` folder.

---

**Need Help?**
- Check the [docs/](docs/) folder
- Open an issue on GitHub
- Review the code comments (they explain everything!)

Enjoy using LinguaFloat! 🚀
