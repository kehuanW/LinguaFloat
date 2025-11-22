import { globalShortcut } from 'electron';

/**
 * Register global hotkeys for the application
 */
export function registerGlobalHotkeys(onToggleWindow: () => void): boolean {
  // Default hotkey: Cmd/Ctrl + Shift + Space
  const hotkey = process.platform === 'darwin' ? 'Command+Shift+Space' : 'Control+Shift+Space';

  const registered = globalShortcut.register(hotkey, () => {
    onToggleWindow();
  });

  if (!registered) {
    console.error(`Failed to register global hotkey: ${hotkey}`);
    return false;
  }

  console.log(`Global hotkey registered: ${hotkey}`);
  return true;
}

/**
 * Unregister all global hotkeys
 */
export function unregisterGlobalHotkeys(): void {
  globalShortcut.unregisterAll();
}

/**
 * Get the current hotkey string for display
 */
export function getHotkeyString(): string {
  return process.platform === 'darwin' ? 'Cmd+Shift+Space' : 'Ctrl+Shift+Space';
}
