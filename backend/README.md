# WBC Content Admin

A small Django admin panel that lets a non-technical person manage **every image,
video and testimonial** on the Wisbees Business Carnival website — without
touching any code.

## First-time setup

From the project root (the folder with `package.json`):

```powershell
npm run setup
```

This creates a Python environment, installs Django, sets up the database, and
loads the site's current images so nothing looks different to start with.

It prints a login at the end:

```
username: admin   password: wbcadmin123
```

**Change this password after your first login** (top-right of the admin → Change password).

## Everyday use

Start the website **and** the admin together with one command:

```powershell
npm run dev
```

- Website:  http://localhost:3000
- Admin:    http://127.0.0.1:8000/admin

## Editing content

Log into the admin and you'll see:

| Section | What it controls |
|---|---|
| **Site Configuration** | Logo, hero video, hero background image, hero title |
| **Partner Logos** | The "Trusted by schools" strip on the home page |
| **Gallery Photos** | The Gallery / Past Events photos (tick *Show on home* to also put one in the home strip) |
| **Testimonials** | Home-page columns + the Parents/Schools testimonials |
| **Videos** | All YouTube videos (home, gallery, founder talks, student stories) |

For any image you can **either upload a file or paste an image URL** — if you
upload a file it always wins. Use *Order* to sort items and untick *Active* to
hide something without deleting it.

Changes appear on the website within about a minute (or immediately after a hard
refresh).
