# Moodify - Mood Tracker App

Moodify is a mood tracker app developed to help users better understand their emotional patterns and promote mental well-being. The idea was sparked by the intense stress my classmates and I faced during the IDSP project in my third term at BCIT.

## Current MVP

- Homepage: Display your recent mood, calendar, mood count, mood chart and inspirational random quotes.
- Log your mood: Capture your daily emotions using a simple interface with emojis, categories, and notes.
- View all mood: Display all logged moods by date.
- Edit & Delete your mood: Allow users to modify or remove recorded moods.

## Tech Stack

### Frontend:

- React
- Vite
- Tailwind CSS
- ShadCN
- TanStack Query
- TanStack Router
- TanStack Form

### Backend:

- Bun
- Hono
- Zod
- Hono Zod Validation

### Database:

- PostgreSQL (Neon)
- Drizzle ORM
- Drizzle Zod

### Authentication:

- Kindle

## Next Sprint:

- Allow users to log their moods directly on the calendar.
- Display all moods by date on the calendar.
- Enable users to add photos to mood logs.
- Expand mood categories and introduce sub-categories.
- Implement a mood report feature.

## Installation Instructions:

1. Clone this repository

```bash
git clone https://github.com/emmy-nguyen/moodify.git
cd moodify
```

2. Install dependencies

```bash
bun install
```

3. Run the application
   Backend:

```bash
cd moodify
bun run dev
```

Frontend:

```bash
cd frontend
bun run dev
```

4. Access the app:
   Visit http://localhost:5173 in your browser

This project was created using `bun init` in bun v1.1.34. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
