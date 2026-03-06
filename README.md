# Trello Barcode Power-Up

This Power-Up adds:
- **Print Barcode** on the card back
- **Print List Barcode…** in the list `...` menu

## Files
- `index.html` — connector URL entry page
- `client.js` — registers Trello capabilities
- `print-card.html` — popup for card barcode printing
- `print-list.html` — popup for list barcode printing
- `icon.svg` — simple icon

## How to deploy

### 1) Host the files over HTTPS
You can use any static host, for example:
- GitHub Pages
- Netlify
- Cloudflare Pages
- Vercel (static)

Your connector URL should point to `index.html`, for example:

`https://your-domain.example/trello-barcode-powerup/index.html`

### 2) In Trello Power-Up Admin
- Open `https://trello.com/power-ups/admin`
- Open your Power-Up
- Set **Iframe Connector URL** to your hosted `index.html`
- In **Capabilities**, enable:
  - `card-buttons`
  - `list-actions`

### 3) Add the Power-Up to your board
On the board, add your custom Power-Up from the **Custom** tab.

## Notes
- This version prints `CARD_<cardId>` and `LIST_<listId>` using Code 128.
- If your scanner struggles with long codes, replace the payload format with short aliases and connect it to your mapping file.
