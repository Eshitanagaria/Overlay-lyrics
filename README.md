<div align="center">

#  Lyrify

**A translucent, karaoke-style lyrics overlay that floats above everything on your screen that is synced live with Spotify or YouTube.**

No terminal to keep open once installed. No clicking back and forth. Just lyrics, always on top, always in sync.

[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS-blue)](#installation)
[![Made with Electron](https://img.shields.io/badge/made%20with-Electron-9feaf9)](https://www.electronjs.org/)
[![Lyrics](https://img.shields.io/badge/lyrics-lrclib.net-orange)](https://lrclib.net)

</div>

---

##  What it does

Lyrify is a desktop overlay app that stays on top of every other window and shows synced, karaoke-style lyrics for whatever you're currently playing, whether that's the **Spotify desktop app**, the **Spotify web player**, or a **YouTube** video. ps. it works even if you're playing music on **Spotify mobile app**.

The current line sweeps with a color fill as it's sung. The previous and next lines are visible but dimmed. All of this floats in a frosted-glass panel over your screen without interrupting anything you're doing underneath it.

---

##  Installation

### Windows
Download `Lyrify Setup.exe` from [Releases](../../releases) and run it. The installer lets you choose where to install it, and adds a shortcut to your Start Menu and Desktop.

### macOS
Download `Lyrify.dmg` from [Releases](../../releases), open it and drag Lyrify into Applications.

### Run from source
```bash
git clone https://github.com/Eshitanagaria/Lyrify.git
cd Lyrify/lyrify
npm install
npm start
```
Requires [Node.js LTS](https://nodejs.org).

---

##  Spotify setup (one-time, ~2 minutes)

Lyrify uses Spotify's official API with PKCE authentication, that means it never sees your Spotify password, and there's no shared backend. Each user connects their own account directly.

1. Click **Open Spotify Developer Dashboard ↗** inside the app's settings panel
2. Log in → **Create app** (name it anything)
3. Under **Redirect URIs**, paste exactly:
   ```
   http://127.0.0.1:8898/callback
   ```
   The app has a **Copy** button for this so you don't have to type it.
4. Save → copy the **Client ID** (the long alphanumeric string on the app's overview page)
5. Back in Lyrify → paste the Client ID → **Connect Spotify** → approve in the browser

Done. Works identically whether you play from the Spotify desktop app or the web player.

> ⚠️ As of February 2026, Spotify requires the account that creates the Developer app to have an active **Premium** subscription. This is a Spotify policy, not a Lyrify requirement.

---

##  YouTube setup

1. Open Chrome → go to `chrome://extensions`
2. Enable **Developer mode** (top right toggle)
3. Click **Load unpacked** → select the `youtube-lyrics-bridge` folder from this repo
4. That's it! No popup, no configuration. Open any music video and Lyrify will pick it up automatically.

---

## Features

| Feature | Details |
|---|---|
| **Karaoke line fill** | Active line sweeps left-to-right in sync with playback |
| **Multi-line view** | See 1 to 9 lines at once; current line is always centered |
| **Frosted-glass overlay** | Translucent background with adjustable opacity and blur |
| **Custom colors** | Pick your own text color and highlight/karaoke color |
| **Font size control** | Adjustable from the settings panel |
| **Always on top** | Stays above every other window, follows across virtual desktops |
| **Click-through mode** | Interact with apps underneath without moving the overlay |
| **Track name display** | Optional, it shows artist and song title in the drag bar |
| **Scrollable settings** | Full settings panel accessible without resizing the window |
| **One-click Spotify setup** | Dashboard shortcut + copyable redirect URI built into the settings panel |
| **Smart rate-limit handling** | Respects Spotify's `Retry-After` header; persists backoff across restarts |
| **Single instance lock** | Launching a second copy focuses the existing window instead of starting a new one |
| **Cross-platform installer** | Windows `.exe` (NSIS) and macOS `.dmg` (universal binary) |

---

## Hotkeys

| Shortcut | Action |
|---|---|
| `Ctrl+Alt+L` | Show / hide the overlay |
| `Ctrl+Alt+K` | Toggle click-through mode |
| `Ctrl+Alt+Q` | Quit |

The overlay is also draggable from its top strip and resizable from its edges. There's a ✕ button to quit directly from the overlay.

---

## How it works

- **Spotify sync** : polls Spotify's `/me/player/currently-playing` endpoint every 2 seconds. This is account-level, not app-level, so it works whether you're playing from the desktop app or the browser.
- **YouTube sync** : a small Chrome MV3 extension reads the `<video>` element's `currentTime` and `duration` directly, plus the page title, and forwards it to the Electron app over a local WebSocket on `127.0.0.1:8765`.
- **Lyrics**: fetched from [lrclib.net](https://lrclib.net), a free, open, no-key-required database with line-level LRC timestamps for a large catalog.
- **Position interpolation** : between API polls, the playback position is estimated from elapsed wall-clock time, keeping the highlight smooth with no visible lag despite infrequent polling.
- **Karaoke fill**: since lrclib provides per-line timestamps (not per-word), the fill effect is a CSS `clip-path` sweep timed against the gap between the current line's timestamp and the next one. It reads as karaoke without needing paid word-level data.
- **Auth**: Spotify uses the PKCE OAuth 2.0 flow: no client secret, no backend, tokens stored locally in Electron's userData folder.

---

##  FAQ

**Will multiple users hit the same rate limit?**
No. Every user creates their own Spotify Developer app with their own Client ID. Spotify's rate limits are scoped per Client ID. Your usage is entirely isolated from anyone else's.

**Do I need Spotify Premium?**
To create the Developer app, yes (Spotify's 2026 policy). To use the YouTube side of Lyrify, no premium is required at all.

**Can I run this without building from source?**
Yes!! Download the installer from [Releases](../../releases).

**Why does YouTube title matching sometimes get the wrong song?**
The YouTube bridge parses titles heuristically (looking for "Artist - Title" patterns). It works well on official music uploads; less reliably on remixes, covers, or oddly titled videos.

---

##  Contributing

Issues and PRs are welcome. A few directions worth exploring:

- Smarter YouTube title parsing (MusicBrainz lookup, etc.)
- Linux packaging
- Word-level accurate karaoke (would need a different lyrics source [Musixmatch has this but requires a paid key] )
- Auto-start on login

##  Contributors

- [Eshita](https://github.com/Eshitanagaria) — project author
- [Nandinee](https://github.com/TheNandinee) — macOS packaging
- [Aashi Garg](https://github.com/AashiGarg-tech) — security review, event listener cleanup, regex improvements


---

## License

MIT — see [LICENSE](LICENSE).
