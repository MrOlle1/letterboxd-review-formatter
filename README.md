# Review Formatter for Letterboxd

A browser extension that adds a formatting toolbar to Letterboxd review text areas — making it easy to apply bold, italic, blockquote, and hyperlink formatting without typing HTML by hand.

Works on **Firefox** and all **Chromium-based browsers** (Chrome, Edge, Brave, Opera).

![Toolbar screenshot](Screenshots/toolbar.png)

---

## Features

- **Bold** — wraps selected text in `<b>`
- **Italic** — wraps selected text in `<i>`
- **Blockquote** — wraps selected text in `<blockquote>`
- **Link** — prompts for a URL and wraps selected text in `<a href="...">`
- Toolbar appears automatically on any Letterboxd review field

---

## Installation

### Firefox

 [Letterboxd Review Formatting](https://addons.mozilla.org/addon/letterboxd-review-formatting/)

> There is no store listing for Chrome yet. Load the extension manually using the steps below.

### Step 1 — Download

Click **Code → Download ZIP** on this page, then unzip the folder.

### Chrome / Brave / Edge / Opera

1. Go to `chrome://extensions` (or `edge://extensions`, `brave://extensions`)
2. Enable **Developer mode** using the toggle in the top-right corner
3. Click **Load unpacked**
4. Select the unzipped folder

The extension will stay installed permanently unless you remove it.

---

## Usage

1. Go to any film page on Letterboxd and click **Add review** (or edit an existing one)
2. The formatting toolbar appears beneath the review text area
3. Select some text, then click a button to wrap it in the appropriate HTML tag
4. For links: select the link text first (or leave it blank), then click the link button and enter a URL when prompted

---

## Supported formatting tags

Letterboxd supports a limited subset of HTML in reviews:

| Tag | Effect |
|---|---|
| `<b>` | Bold |
| `<i>` | Italic |
| `<blockquote>` | Indented quote block |
| `<a href="...">` | Hyperlink |

---

## Contributing

Bug reports and pull requests are welcome. Please open an issue first for anything beyond small fixes.

---

## License

MIT — see [LICENSE](LICENSE) for details.
