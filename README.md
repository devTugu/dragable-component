# Fantasy League Manager

A Next.js application for managing fantasy sports leagues with drag-and-drop functionality.

![Fantasy League Manager Screenshot](https://via.placeholder.com/800x400)

## Features

- **Drag and Drop Interface**: Easily reorder leagues or move them to archives
- **League Management**: Display leagues with different statuses (Draft Live, Pre-Draft, Post-Draft)
- **Archiving System**: Archive leagues you don't need active anymore
- **Responsive Design**: Optimized for both desktop and mobile viewing

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [dnd-kit](https://dndkit.com/) - Drag and drop toolkit
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide Icons](https://lucide.dev/) - Beautiful icons

## Getting Started

### Prerequisites

- Node.js 16.8.0 or later
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/devTugu/dragable-component.git
   cd dragable-component
   ```

2. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

### League Management

- **View Leagues**: All active leagues are displayed at the top of the page
- **Reorder Leagues**: Drag and drop leagues to reorder them in the active section
- **Archive Leagues**: Drag leagues to the archive section to archive them
- **Unarchive Leagues**: Click on an archived league to restore it to the active section
- **Create New League**: Use the "Create League" button to add a new league

### Drag and Drop

The app uses the dnd-kit library for drag and drop functionality:

- Click and hold on a league to start dragging
- Drag the league to a new position in the active leagues section to reorder
- Drag a league to the archive section to archive it
- Archived leagues can also be reordered within the archive section

## Project Structure

```
├── components/
│   ├── section/
│   │   ├── LeagueItem.tsx  # Individual league component
│   │   └── Navigation.tsx  # Navigation component
│   └── ui/
│       └── button.tsx      # Reusable button component
├── app/
│   └── page.tsx            # Main application page
├── public/                 # Static assets
└── ...                    # Next.js configuration files
```

## Customization

### Adding New League Statuses

To add a new league status:

1. Update the status colors in the `LeagueItem.tsx` file:

   ```tsx
   className={`text-xs px-2 py-1 rounded bg-zinc-800 ${
     league.status === "Draft Live"
       ? "text-[#B5FF4D]"
       : league.status === "Pre-Draft"
       ? "text-[#FFAD33]"
       : league.status === "Archived"
       ? "text-[#FF4D4D]"
       : "text-[#CCCCC5]"
   }`}
   ```

2. Add your new status to the conditional check.

### Modifying League Data

To change the default leagues, update the `initialLeagues` array in `page.tsx`.

## License

[MIT](LICENSE)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- [dnd-kit](https://dndkit.com/) for the drag and drop functionality
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Next.js](https://nextjs.org/) for the React framework
