# League Management UI

A Next.js 15 application with drag-and-drop functionality for managing sports leagues.

## Features

- Drag and drop interface to reorder leagues
- Highlighted selection with pink border
- Status indicators (Pre-Draft, Draft Live, Post-Draft)
- Collapsible archived section
- Dark theme UI
- Mobile responsive

## Tech Stack

- Next.js 15
- React 18
- Tailwind CSS
- Shadcn UI components
- DND Kit (@dnd-kit/core and @dnd-kit/sortable)

## Installation

1. Clone the repository:

```bash
git clone
cd league-management
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- Click and drag to reorder leagues
- Click the arrow next to "Archived" to expand/collapse the archived section
- You can drag leagues to the archive section when expanded

## Project Structure

- `app/page.jsx` - Main page component with drag and drop functionality
- `app/layout.jsx` - Root layout with metadata
- `app/globals.css` - Global CSS styles
- `components/LeagueItem.jsx` - Component for league items
- `components/ui/button.jsx` - Shadcn UI button component
- `lib/utils.js` - Utility functions for styling

## Credits

- UI design inspired by modern sports management interfaces
- Built with Next.js 15, Shadcn UI, and DND Kit
