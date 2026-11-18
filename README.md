# Chelliamma Birthday Website — Complete GitHub Pages Files

This is the complete website exported from published source commit `81152d5c67146188da5cd7a4f5f7f748207b04c6`.
It includes all ten gift photos, friends' photos, audio, countdown, gold birthday gift, opening animation and gold scratch cards. Scratch cards reveal at 45% and display only “Scratch here”.

## Uploading this update

Extract the ZIP. Upload the CONTENTS of this folder into your existing GitHub Pages publishing folder, replacing files with the same names. Keep `index.html` directly in that folder, alongside `app.js`, `style.css`, and the other files. Preserve the `birthday-people` and `gift-photos` subfolders. Uploading the ZIP file alone will not update the website.

For your existing repository, the normal website address is:
https://viharkmanoj.github.io/Chelli-Bday/

This export does not change your live GitHub website until you upload/commit it. No build command or package installation is needed.

## Add the missing birthday wishes

Open **birthday-gift.js** in your code editor. Near the top, find `const wishes = [`.
Each person has an object with three fields: `name`, `image`, and `message`.

Currently blank messages: **Moahith, Jayani, Vichu, Pragna and ANNAIYA**.
Shuvetha, Harshita and Reema already have messages. Their supplied wording is preserved.

For example, Moahith's entry currently looks like this:

```js
  {
    "name": "Moahith",
    "image": "birthday-people/moahith.jpeg",
    "message": ""
  },
```

Replace only the empty message quotes with the exact wish he sends:

```js
  {
    "name": "Moahith",
    "image": "birthday-people/moahith.jpeg",
    "message": "Happy birthday, Chelliamma! ❤️\n\nYour next paragraph goes here."
  },
```

The wording above is just an example, not a message added to the website. Repeat the same edit for Jayani, Vichu, Pragna and ANNAIYA, finding each by their `name`.

### Writing messages without breaking the code

- Keep the surrounding double quotes and commas exactly as they are.
- Use `\n` for a line break or `\n\n` between paragraphs. Do not press Enter inside a double-quoted message string.
- Emojis, Telugu and other languages can be pasted directly; save the file as UTF-8.
- Apostrophes are fine: `I'm happy` needs no escaping inside double quotes.
- If the message contains a straight double quote, put a backslash before it: `She said \"Happy birthday!\"`.
- If the message contains a literal backslash, write it as `\\`.
- Paste plain text, not HTML. The website renders it as text.
- Leave `"message": ""` for anyone whose wish has not arrived. The reserved space remains blank.

After saving, upload/commit your changed `birthday-gift.js` to GitHub. Updating this file is enough when only messages change.

## Add your own photo and message

Put your photo in the `birthday-people` folder. For example, name it `annaiya.jpeg`, then update the existing ANNAIYA entry:

```js
  {
    "name": "ANNAIYA",
    "image": "birthday-people/annaiya.jpeg",
    "message": "Paste your exact birthday wish here. 💙\n\nAnother paragraph can go here."
  }
```

Use your actual filename and extension, including the same upper/lowercase letters. Upload both the new photo and the changed JS file. A `.jpg` file must be referenced as `.jpg`, not `.jpeg`. Leave `"image": ""` to keep your photo space blank.

To change someone else's photo, replace their existing image or change their `image` path. No CSS changes are needed. Their name, photo and message are automatically covered by the same scratch layer.

## Review the changes

Use:
https://viharkmanoj.github.io/Chelli-Bday/?review=annaiya3

This previews locked gifts without waiting for their dates. If you previously selected Finish review, use a private/incognito browser window to review again. Refresh after uploading; a hard refresh can help if old files are cached. Scratch covers reset on page reload. Share the normal URL without the review parameter with Chelliamma.

## Unlock schedule — India Standard Time

| Gift | Unlock date and time (IST) |
| --- | --- |
| Box 10 | 24 November 2026, 00:00 |
| Box 9 | 25 November 2026, 00:00 |
| Box 8 | 26 November 2026, 00:00 |
| Box 7 | 27 November 2026, 00:00 |
| Box 6 | 28 November 2026, 00:00 |
| Box 5 | 29 November 2026, 00:00 |
| Box 4 | 30 November 2026, 00:00 |
| Box 3 | 1 December 2026, 00:00 |
| Box 2 | 2 December 2026, 00:00 |
| Box 1 | 3 December 2026, 00:00 |
| Main birthday gift | 4 December 2026, 00:00 |

The code uses the explicit `+05:30` offset. Uploading to GitHub Pages or editing messages does not change these unlock times. Gifts remain available after unlocking. Time checks use the visitor's device clock, which must be correct.

## File guide

| File | Purpose |
| --- | --- |
| `birthday-gift.js` | Main birthday gift, friends' names/photos/messages and opening behavior |
| `birthday-gift.css` | Main birthday pane and glass card styles |
| `birthday-scratch.js` | Gold scratch layer and 45% reveal threshold |
| `birthday-people/` | Friends' photos |
| `messages.js` | Messages for the ten countdown gifts |
| `gift-photos/` | Photos for the ten countdown gifts |
| `app.js` | Countdown gift unlocking, opening and review mode |
| `countdown.js` and `countdown.css` | Birthday flip timer |
| `index.html` and `style.css` | Main page and its styling |
| Audio files | Background music, gift-opening and locked-gift sounds |

## Existing behavior to know

Opened-gift status uses localStorage in that browser; it does not sync across devices. Moving to a different website address does not transfer browser history. Scratch reveals are retained while the page stays loaded and reset on reload. There is no cloud database in this export.

Audible background music is attempted automatically; browsers may require a tap before allowing sound.

This is a static website: messages and review code are present in its source. Date locks and scratch covers are presentation features, not access security. GitHub Pages does not inherit the ChatGPT site's private access settings.

No hosting credentials, Git history or ChatGPT platform configuration are included.

The main birthday gift spans the entire bottom row of the gift grid, with centred artwork.
# Chelli-Birthday-Site
