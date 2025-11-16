# Maze Escape 🎮

<img width="1920" height="1080" alt="Screenshot from 2025-11-16 16-11-12" src="https://github.com/user-attachments/assets/19195fcb-8c92-4253-a814-4659cfa10d45" />

A fun and interactive maze navigation game built with TypeScript and HTML5 Canvas. Navigate through a challenging maze to reach the exit and escape!

## 🎯 Features

- **Smooth Movement**: Arrow key controls for intuitive navigation
- **Collision Detection**: Realistic wall collision system
- **Visual Feedback**: Color-coded game elements (green player, red exit)
- **Win Condition**: Clear victory state when reaching the exit
- **Feedback System**: Submit feedback about your gaming experience
- **Modern UI**: Dark theme with neon green accents

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd maze-escape
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

## 🎮 How to Play

1. **Start the Game**: The game begins automatically when the page loads
2. **Navigate**: Use the arrow keys to move your character:
   - `↑` Arrow Up - Move up
   - `↓` Arrow Down - Move down
   - `←` Arrow Left - Move left
   - `→` Arrow Right - Move right
3. **Objective**: Navigate through the maze to reach the **red circle** (exit)
4. **Win**: When you reach the exit, you'll see a victory message!

### Game Elements

- **Green Circle**: Your player character
- **Dark Blue Walls**: Obstacles you cannot pass through
- **Black Paths**: Navigable areas
- **Red Circle**: The exit - your goal!

## 📁 Project Structure

```
maze-escape/
├── index.html          # Main game page
├── feedback.html       # Feedback form page
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── src/
│   ├── Game.ts         # Main game logic and game loop
│   ├── Player.ts       # Player class with movement and collision
│   ├── MazeMap.ts      # Maze generation and rendering
│   └── index.css       # Global styles
└── README.md          # This file
```

## 🛠️ Technologies Used

- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and dev server
- **HTML5 Canvas**: 2D rendering for the game
- **Lit**: Web components library (dependency)

## 📜 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally

## 🎨 Game Architecture

### Core Classes

- **`MazeMap`**: Handles maze data, rendering, and collision detection
  - Loads maze from string representation
  - Manages start and end positions
  - Provides collision checking methods

- **`Player`**: Manages player state and movement
  - Handles direction changes
  - Implements smooth movement with speed control
  - Checks win conditions

- **`Game`**: Main game controller
  - Initializes game components
  - Manages game loop with `requestAnimationFrame`
  - Handles keyboard input
  - Updates game state and rendering

## 🔧 Development

### Building for Production

```bash
npm run build
```

This will:
1. Compile TypeScript to JavaScript
2. Bundle assets with Vite
3. Output to `dist/` directory

### TypeScript Configuration

The project uses TypeScript with strict type checking. Configuration is in `tsconfig.json`.

## 📝 Feedback

Found a bug? Have a suggestion? Use the **Feedback** button on the main page to submit your thoughts!

## 🎯 Future Enhancements

Potential improvements for the game:
- Multiple maze levels
- Timer/score system
- Difficulty levels
- Sound effects
- Mobile touch controls
- Maze generator algorithm
- Leaderboard system

## 📄 License

This project is private and not licensed for public use.

## 👤 Author

Created as a fun project to explore game development with TypeScript and Canvas API.

---

Enjoy playing Maze Escape! 🎉

