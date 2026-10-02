# VOSC Activity-1 - Tic-Tac-Toe

A modern, responsive, and lightweight Tic-Tac-Toe web game built with pure vanilla HTML5, CSS3, and JavaScript. Zero external dependencies or build tools required.

<!-- Optional Screenshot Placeholder -->
<!-- ![Tic-Tac-Toe Screenshot](screenshot.png) -->

---

## 🎮 Features

- **Interactive 3x3 Grid**: Seamless turn-based gameplay for two players (X and O) sharing the same device.
- **Smart Turn Indicator**: Displays real-time status indicating whose turn it is.
- **Instant Win & Draw Detection**: Automatically checks for all 8 winning combinations across rows, columns, and diagonals.
- **Winning Line Highlight**: Beautiful glow animation that highlights the exact 3 cells that formed the winning line.
- **Scoreboard Tracking**: Tracks Player X wins, Player O wins, and Draws across rounds throughout the session.
- **AI Opponent (vs Computer)**: Optional single-player mode with smart blocking and strategic move selection.
- **Move Locking & Input Validation**: Prevents overwriting occupied cells or placing moves after a round concludes.
- **Modern Dark Theme UI**: Built with CSS variables, smooth transitions, mark pop-in animations, and full mobile responsiveness.
- **Accessible & Semantic**: Uses semantic HTML elements and ARIA roles for screen readers.

---

## 🛠️ Technologies Used

- **HTML5**: Semantic markup, accessible button controls, and structured layout.
- **CSS3**: CSS Custom Properties (variables), Flexbox, CSS Grid, custom keyframe animations, and responsive media queries.
- **JavaScript (ES6+)**: Pure vanilla JavaScript with clean modular functions, DOM manipulation, turn switching, win/draw algorithms, and smart AI logic.

---

## 🚀 How to Run

No installation, build step, or package manager is needed!

### Method 1: Directly in Any Web Browser
1. Clone or download the project files.
2. Double-click `index.html` or right-click and choose **Open With > Google Chrome / Firefox / Safari / Edge**.

### Method 2: Using VS Code Live Server
1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension if you haven't already.
3. Right-click `index.html` and select **"Open with Live Server"**.

---

## 🕹️ How to Play

### Rules
1. The game is played on a 3x3 grid.
2. **Player X** always moves first, followed by **Player O**.
3. Players take turns clicking on empty squares to place their marks (`X` or `O`).
4. The first player to get **3 marks in a row** (horizontally, vertically, or diagonally) wins the round!
5. If all 9 squares are filled and neither player has achieved 3 in a row, the round is declared a **Draw**.

### Controls & Options
- **Cell Selection**: Click or tap any empty square on the grid to make your move.
- **Mode Toggle**: Use the dropdown at the top to toggle between **Two Players (1v1)** and **vs Computer (AI)**.
- **Restart Round**: Click the **🔄 Restart Round** button to clear the board and begin a new round while keeping the current scores intact.

---

## 📁 Project Structure

```text
VOSC Activity-1/
├── index.html     # Semantic structure and markup
├── style.css      # Dark theme styling, animations, and responsive layout
├── script.js      # Game logic, state management, and AI behavior
└── README.md      # Project documentation and guide
```

---

## 📄 License

This project is created for **VOSC Activity-1**. Free to use, modify, and distribute.
