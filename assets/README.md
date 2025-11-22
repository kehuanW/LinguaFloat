# Assets Directory

This directory should contain the application icons for different platforms.

## Required Assets

### macOS
- `icon.icns` - macOS application icon (512x512 recommended)
- `tray-icon.png` - Menu bar icon (16x16 @ 2x = 32x32, template mode)

### Windows
- `icon.ico` - Windows application icon (256x256 recommended)
- `tray-icon.png` - System tray icon (16x16)

### Linux
- `icon.png` - Application icon (512x512)
- `tray-icon.png` - System tray icon (16x16)

## Creating Icons

You can use tools like:
- [electron-icon-builder](https://www.npmjs.com/package/electron-icon-builder)
- [png2icons](https://www.npmjs.com/package/png2icons)
- Online converters like [CloudConvert](https://cloudconvert.com/)

## Placeholder Icons

For development, the app uses base64-encoded placeholder icons. Replace these with proper icons before production release.
