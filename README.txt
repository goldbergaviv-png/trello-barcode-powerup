Overwrite these files in your GitHub repo root:

- index.html
- client.js
- popup.html
- logo.jpeg
- icon.png

Fix in v8:
- List barcode printing now passes list ID + name directly from the clicked list
- This fixes the bug where only the first viewed list printed and all later lists were blank
- Print and Close buttons remain
- Cache-busting updated to ?v=8
