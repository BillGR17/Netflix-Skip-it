# Netflix-Skip-it
[Firefox & Chrome Extension] Skips Intros, Disables the interrupter and plays the next episode.

## Features
- **Skip Intros**: Automatically clicks the "Skip Intro" button.
- **Skip Interrupter**: Automatically clicks the "Continue Watching" button.
- **Next Episode**: Automatically clicks the "Next Episode" button.
- **Settings**: Toggle features via the extension popup.
  - Enable/Disable the entire extension.
  - Enable/Disable the interrupter skipper.
  - Enable/Disable the intro skipper.
  - Enable/Disable the next episode skipper.

## Installation

### Firefox
1. Go to `about:debugging#/runtime/this-firefox`.
2. Click "Load Temporary Add-on...".
3. Navigate to the `firefox/` directory in this repository and select `manifest.json`.

Alternatively, download from the [Firefox Add-ons page](https://addons.mozilla.org/en-US/firefox/addon/netflix-skip-it/).

### Chrome
1. Go to `chrome://extensions/`.
2. Enable "Developer mode" in the top right corner.
3. Click "Load unpacked".
4. Select the `chrome/` directory in this repository.

Alternatively, download from the [Chrome Webstore page](https://chromewebstore.google.com/detail/ljccelpoglccgbachdcpncghkpmejgml?utm_source=item-share-cb).

## Project Structure
- `firefox/`: Contains the Firefox version of the extension (Manifest V3, uses `browser` namespace).
- `chrome/`: Contains the Chrome version of the extension (Manifest V3, uses `chrome` namespace).
