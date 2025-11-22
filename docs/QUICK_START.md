# Quick Start Guide

Get LinguaFloat up and running in 5 minutes.

## Installation

```bash
# Clone and setup
git clone https://github.com/yourusername/linguafloat.git
cd linguafloat
npm install

# Run the app
npm run dev
```

## First-Time Setup

### 1. Get an OpenAI API Key

1. Visit [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key (you won't see it again!)

### 2. Configure LinguaFloat

1. Find the LinguaFloat icon in your:
   - **macOS**: Menu bar (top right)
   - **Windows**: System tray (bottom right)

2. Click the icon → **Settings**

3. Enter your API key in the "OpenAI API Key" field

4. Configure defaults (optional):
   - **Default Tone**: Neutral / Professional / Warm
   - **Default Style**: Refine / Shorter / More Polite
   - **Auto-paste from clipboard**: Auto-fill text when opening
   - **Theme**: Light / Dark

5. Click **Save Settings**

## Using LinguaFloat

### Method 1: Hotkey (Fastest)

Press `Cmd + Shift + Space` (macOS) or `Ctrl + Shift + Space` (Windows)

### Method 2: Menu/Tray Icon

Click the LinguaFloat icon → **Open LinguaFloat**

## Refining Text

1. Open LinguaFloat
2. Ensure **Refine** tab is selected
3. Paste or type your text
4. (Optional) Add context to guide the refinement
5. Choose tone and style
6. Click **Refine**
7. Edit the result if needed
8. Click **Copy & Close**

### Example

**Original**:
```
Hi boss, i cant come work tomorrow because i am sick
```

**Context** (optional):
```
Email to manager
```

**Tone**: Professional
**Style**: More Polite

**Result**:
```
Dear [Manager's Name],

I hope this message finds you well. Unfortunately, I'm not feeling well and won't be able to come to work tomorrow. I apologize for any inconvenience this may cause.

I'll keep you updated on my recovery and plan to return as soon as possible.

Thank you for your understanding.

Best regards,
[Your Name]
```

## Writing from Intent

1. Open LinguaFloat
2. Click **Write from Intent** tab
3. Describe what you want to say
4. (Optional) Add context
5. Choose tone and style
6. Click **Generate**
7. Edit if needed
8. Click **Copy & Close**

### Example

**Intent**:
```
Tell my client the project will be delayed by one week
```

**Context** (optional):
```
Professional client relationship, been working together for 6 months
```

**Tone**: Professional
**Style**: More Polite

**Result**:
```
Dear [Client Name],

I wanted to reach out regarding our current project timeline. After careful review, I need to inform you that we're facing a one-week delay in the delivery schedule.

This adjustment will ensure we maintain the quality standards we've established throughout our partnership. The new completion date will be [new date].

I apologize for any inconvenience this may cause and appreciate your understanding. Please let me know if you have any questions or concerns.

Best regards,
[Your Name]
```

## Tips & Tricks

### 1. Use Context for Better Results

Adding context helps the LLM understand your situation:
- "Email to professor"
- "Slack message to team"
- "Formal business email"
- "Casual message to friend"

### 2. Quick Workflow

1. Copy text you want to refine
2. Press hotkey (`Cmd/Ctrl + Shift + Space`)
3. Text auto-pastes (if enabled)
4. Press `Enter` or click Refine
5. Click **Copy & Close**
6. Paste in your app

### 3. Keyboard Shortcuts

- `Tab`: Move between fields
- `Enter`: Submit (when in a single-line field)
- `Cmd/Ctrl + Shift + Space`: Toggle window

### 4. Experiment with Tones

- **Neutral**: Balanced, everyday communication
- **Professional**: Formal business contexts
- **Warm**: Friendly, approachable tone

### 5. Experiment with Styles

- **Refine**: Improve without major changes
- **Shorter**: Condense while keeping meaning
- **More Polite**: Add courtesy and formality

## Common Use Cases

### Email Writing

**Use**: Write from Intent
**Tone**: Professional
**Style**: More Polite

### Slack Messages

**Use**: Refine
**Tone**: Warm
**Style**: Shorter

### Error Messages to Users

**Use**: Write from Intent
**Tone**: Warm
**Style**: Refine

### Meeting Notes Cleanup

**Use**: Refine
**Tone**: Neutral
**Style**: Refine

### Social Media Posts

**Use**: Write from Intent
**Tone**: Warm
**Style**: Shorter

## Troubleshooting

### "API key is required" Error

1. Open Settings
2. Enter your OpenAI API key
3. Click Save Settings
4. Try again

### "API error: 401" Error

Your API key is invalid or expired:
1. Get a new key from [OpenAI](https://platform.openai.com/api-keys)
2. Update it in Settings

### "API error: 429" Error

You've hit the rate limit:
- Wait a few seconds
- Try again
- Check your OpenAI account billing

### Hotkey Not Working

1. Make sure LinguaFloat is running (check tray icon)
2. On macOS: Grant Accessibility permissions
   - System Preferences → Security & Privacy → Accessibility
3. Another app might be using the same hotkey

### Window Won't Open

1. Check if the window is off-screen
2. Right-click tray icon → Quit
3. Restart LinguaFloat
4. Window will reset to default position

## Next Steps

- Read [DEVELOPMENT.md](DEVELOPMENT.md) to customize LinguaFloat
- Check [ARCHITECTURE.md](ARCHITECTURE.md) to understand how it works
- Visit [GitHub Issues](https://github.com/yourusername/linguafloat/issues) for support

---

Enjoy using LinguaFloat! 🚀
