/**
 * Tic-Tac-Toe Game Logic
 * VOSC Activity-1
 */

(() => {
  'use strict';

  /* ==========================================================================
     1. Constants & State Variables
     ========================================================================== */

  // All 8 possible winning line configurations (3 rows, 3 columns, 2 diagonals)
  const WINNING_COMBINATIONS = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Top-left to bottom-right diagonal
    [2, 4, 6], // Top-right to bottom-left diagonal
  ];

  // Game state
  let board = ['', '', '', '', '', '', '', '', ''];
  let currentPlayer = 'X';
  let isGameActive = true;
  let isAiMode = false;
  let isAiThinking = false;

  // Session scoreboard (persists until page refresh)
  const scores = {
    X: 0,
    O: 0,
    draws: 0,
  };

  /* ==========================================================================
     2. DOM Element References (Initialized in initGame)
     ========================================================================== */
  let cells;
  let gameBoard;
  let statusText;
  let restartBtn;
  let aiToggle;
  let playerOTitle;
  let scoreXDisplay;
  let scoreODisplay;
  let scoreTiesDisplay;
  let cardPlayerX;
  let cardPlayerO;

  /* ==========================================================================
     3. Initialization & Event Binding
     ========================================================================== */

  /**
   * Queries DOM elements and initializes game state and listeners safely.
   */
  function initGame() {
    cells = document.querySelectorAll('.cell');
    gameBoard = document.getElementById('game-board');
    statusText = document.getElementById('status-text');
    restartBtn = document.getElementById('restart-btn');
    aiToggle = document.getElementById('ai-toggle');
    playerOTitle = document.getElementById('player-o-title');
    scoreXDisplay = document.getElementById('score-x');
    scoreODisplay = document.getElementById('score-o');
    scoreTiesDisplay = document.getElementById('score-ties');
    cardPlayerX = document.querySelector('.player-x-card');
    cardPlayerO = document.querySelector('.player-o-card');

    if (!cells || cells.length === 0) return;

    // Attach click listeners to all board cells
    cells.forEach((cell) => {
      cell.addEventListener('click', handleCellClick);
    });

    if (restartBtn) {
      restartBtn.addEventListener('click', resetGame);
    }

    if (aiToggle) {
      aiToggle.addEventListener('change', handleModeChange);
    }

    updateTurnDisplay();
    updateScoreboardDisplay();
  }

  /* ==========================================================================
     4. Move Handling & Gameplay Logic
     ========================================================================== */

  /**
   * Handles user click on any board cell.
   * @param {Event} event - Cell click event
   */
  function handleCellClick(event) {
    const clickedCell = event.target.closest('.cell');
    if (!clickedCell) return;

    const cellIndex = parseInt(clickedCell.getAttribute('data-cell-index'), 10);

    // Ignore clicks if cell is taken, game is finished, or computer is moving
    if (board[cellIndex] !== '' || !isGameActive || isAiThinking) {
      return;
    }

    // Place player mark
    makeMove(cellIndex, currentPlayer);

    // If game continues and AI mode is active, schedule AI move
    if (isGameActive && isAiMode && currentPlayer === 'O') {
      isAiThinking = true;
      if (statusText) statusText.textContent = 'Computer is thinking...';
      
      setTimeout(() => {
        if (isGameActive) {
          makeAiMove();
        }
        isAiThinking = false;
      }, 400);
    }
  }

  /**
   * Executes a move on the board for a specified player.
   * @param {number} index - Index of cell (0-8)
   * @param {string} player - Player marker ('X' or 'O')
   */
  function makeMove(index, player) {
    board[index] = player;
    renderCell(index, player);

    // Check for win condition
    const winningCombo = checkWinner(board);
    if (winningCombo) {
      handleWin(player, winningCombo);
      return;
    }

    // Check for draw condition
    if (checkDraw(board)) {
      handleDraw();
      return;
    }

    // Switch turn
    switchTurn();
  }

  /**
   * Renders the placed mark with animations and styles.
   * @param {number} index - Cell index (0-8)
   * @param {string} player - 'X' or 'O'
   */
  function renderCell(index, player) {
    const cell = cells[index];
    if (!cell) return;

    cell.classList.add(player.toLowerCase(), 'occupied');
    cell.innerHTML = `<span class="mark">${player}</span>`;
    cell.setAttribute('aria-label', `Cell ${index + 1}: ${player}`);
  }

  /**
   * Checks if any winning pattern is present on the board.
   * @param {Array<string>} currentBoard
   * @returns {Array<number>|null} Winning cell indices or null
   */
  function checkWinner(currentBoard) {
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
      const [a, b, c] = WINNING_COMBINATIONS[i];
      if (
        currentBoard[a] !== '' &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return WINNING_COMBINATIONS[i];
      }
    }
    return null;
  }

  /**
   * Checks if the board is full with no winner.
   * @param {Array<string>} currentBoard
   * @returns {boolean}
   */
  function checkDraw(currentBoard) {
    return currentBoard.every((cell) => cell !== '');
  }

  /**
   * Handles win state, updates scores, highlights winning line, and shows banner.
   * @param {string} winner - 'X' or 'O'
   * @param {Array<number>} winningIndices - Indices of the 3 winning cells
   */
  function handleWin(winner, winningIndices) {
    isGameActive = false;
    scores[winner]++;
    updateScoreboardDisplay();

    // Highlight winning cells
    winningIndices.forEach((index) => {
      if (cells[index]) cells[index].classList.add('winner');
    });

    // Disable remaining cells
    cells.forEach((cell) => cell.classList.add('disabled'));

    if (gameBoard) {
      gameBoard.classList.remove('turn-x', 'turn-o');
    }

    if (statusText) {
      const winnerName = isAiMode && winner === 'O' ? 'Computer' : `Player ${winner}`;
      statusText.textContent = `🎉 ${winnerName} Wins!`;
      statusText.className = `status-banner win-${winner.toLowerCase()}`;
    }

    highlightActiveScorecard(null);
  }

  /**
   * Handles draw state, updates scores, and announces tie.
   */
  function handleDraw() {
    isGameActive = false;
    scores.draws++;
    updateScoreboardDisplay();

    cells.forEach((cell) => cell.classList.add('disabled'));

    if (gameBoard) {
      gameBoard.classList.remove('turn-x', 'turn-o');
    }

    if (statusText) {
      statusText.textContent = "It's a Draw! 🤝";
      statusText.className = 'status-banner draw';
    }

    highlightActiveScorecard(null);
  }

  /**
   * Switches turns between 'X' and 'O'.
   */
  function switchTurn() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateTurnDisplay();
  }

  /**
   * Updates turn message, hover state class, and scorecard active glow.
   */
  function updateTurnDisplay() {
    if (!isGameActive) return;

    if (gameBoard) {
      gameBoard.classList.remove('turn-x', 'turn-o');
      gameBoard.classList.add(`turn-${currentPlayer.toLowerCase()}`);
    }

    if (statusText) {
      statusText.className = 'status-banner';
      if (isAiMode && currentPlayer === 'O') {
        statusText.textContent = "Computer's turn (O)";
      } else {
        statusText.textContent = `Player ${currentPlayer}'s turn`;
      }
    }

    highlightActiveScorecard(currentPlayer);
  }

  /**
   * Toggles glow border on player cards.
   * @param {string|null} player - 'X', 'O', or null
   */
  function highlightActiveScorecard(player) {
    if (cardPlayerX) cardPlayerX.classList.toggle('active', player === 'X');
    if (cardPlayerO) cardPlayerO.classList.toggle('active', player === 'O');
  }

  /**
   * Updates the scoreboard numbers.
   */
  function updateScoreboardDisplay() {
    if (scoreXDisplay) scoreXDisplay.textContent = scores.X;
    if (scoreODisplay) scoreODisplay.textContent = scores.O;
    if (scoreTiesDisplay) scoreTiesDisplay.textContent = scores.draws;
  }

  /* ==========================================================================
     5. AI (vs Computer) Logic
     ========================================================================== */

  /**
   * Determines and executes the best move for Computer (Player O).
   */
  function makeAiMove() {
    const bestMove = getBestAiMove();
    if (bestMove !== -1) {
      makeMove(bestMove, 'O');
    }
  }

  /**
   * AI Strategy:
   * 1. Take winning move if available.
   * 2. Block opponent's winning move.
   * 3. Take center square if available.
   * 4. Take corner squares.
   * 5. Take any open cell.
   * @returns {number} Selected index (0-8)
   */
  function getBestAiMove() {
    const emptyIndices = board
      .map((val, idx) => (val === '' ? idx : null))
      .filter((val) => val !== null);

    if (emptyIndices.length === 0) return -1;

    // 1. Check if AI can win immediately
    for (let i = 0; i < emptyIndices.length; i++) {
      const idx = emptyIndices[i];
      const tempBoard = [...board];
      tempBoard[idx] = 'O';
      if (checkWinner(tempBoard)) {
        return idx;
      }
    }

    // 2. Block Player X from winning next move
    for (let i = 0; i < emptyIndices.length; i++) {
      const idx = emptyIndices[i];
      const tempBoard = [...board];
      tempBoard[idx] = 'X';
      if (checkWinner(tempBoard)) {
        return idx;
      }
    }

    // 3. Take center square
    if (board[4] === '') {
      return 4;
    }

    // 4. Take corners (0, 2, 6, 8)
    const corners = [0, 2, 6, 8].filter((idx) => board[idx] === '');
    if (corners.length > 0) {
      return corners[Math.floor(Math.random() * corners.length)];
    }

    // 5. Take any remaining empty cell
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  }

  /* ==========================================================================
     6. Game Reset & Mode Toggle
     ========================================================================== */

  /**
   * Resets the board for a new round while keeping score counters.
   */
  function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameActive = true;
    isAiThinking = false;

    if (cells) {
      cells.forEach((cell, index) => {
        cell.textContent = '';
        cell.className = 'cell';
        cell.setAttribute('aria-label', `Cell ${index + 1}`);
      });
    }

    if (statusText) {
      statusText.className = 'status-banner';
    }

    updateTurnDisplay();
  }

  /**
   * Handles switching game modes (PvP vs vs AI).
   */
  function handleModeChange() {
    if (!aiToggle) return;
    isAiMode = aiToggle.value === 'ai';
    if (playerOTitle) {
      playerOTitle.textContent = isAiMode ? 'Computer (O)' : 'Player O';
    }
    resetGame();
  }

  /* ==========================================================================
     7. Safe Bootstrap
     ========================================================================== */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
  } else {
    // If DOM is already parsed, initialize immediately
    initGame();
  }
})();
