const board = document.getElementById("board")
const statusDiv = document.getElementById("status")
const svg = document.getElementById("svg")
let currentPlayer = "X"
let cells = []
let gameActive = true

const SVGsize = svg.clientWidth

const winningCombos = [
	[0, 1, 2, `x1="5" y1="${SVGsize / 6}" x2="${SVGsize - 5}" y2="${SVGsize / 6}"`], // rows
	[3, 4, 5, `x1="5" y1="${SVGsize / 2}" x2="${SVGsize - 5}" y2="${SVGsize / 2}"`],
	[6, 7, 8, `x1="5" y1="${SVGsize / 1.2}" x2="${SVGsize - 5}" y2="${SVGsize / 1.2}"`],
	[0, 3, 6, `x1="${SVGsize / 6}" y1="5" x2="${SVGsize / 6}" y2="${SVGsize - 5}"`], // cols
	[1, 4, 7, `x1="${SVGsize / 2}" y1="5" x2="${SVGsize / 2}" y2="${SVGsize - 5}"`],
	[2, 5, 8, `x1="${SVGsize / 1.2}" y1="5" x2="${SVGsize / 1.2}" y2="${SVGsize - 5}"`],
	[0, 4, 8, `x1="5" y1="5" x2="${SVGsize - 5}" y2="${SVGsize - 5}"`], // diagonals
	[2, 4, 6, `x1="${SVGsize - 5}" y1="5" x2="5" y2="${SVGsize - 5}"`],
]

const playerDisplay = (player) => `<img src="../${player}.svg" alt="${player}" />`

function startGame() {
	board.innerHTML = ""
	cells = []
	gameActive = true
	currentPlayer = "X"
	statusDiv.innerHTML = `Current Turn: ${playerDisplay(currentPlayer)}`
	svg.innerHTML = ""
	svg.style.zIndex = -1

	for (let i = 0; i < 9; i++) {
		const cell = document.createElement("div")
		cell.classList.add("cell")
		cell.addEventListener("click", onCellClick)
		cell.addEventListener("mouseenter", onHover)
		cell.addEventListener("mouseleave", onLeave)
		board.appendChild(cell)
		cells.push(cell)
	}
}

function onCellClick(e) {
	const cell = e.target
	if (!gameActive || cell.dataset.fill) return

	cell.removeEventListener("click", onCellClick)
	cell.removeEventListener("mouseenter", onHover)
	cell.removeEventListener("mouseleave", onLeave)

	cell.dataset.fill = currentPlayer
	cell.classList.remove("preview")
	cell.innerHTML = playerDisplay(currentPlayer)

	if (checkWin(currentPlayer)) {
		statusDiv.innerHTML = `${playerDisplay(currentPlayer)} Wins!`
		gameActive = false
		return
	}

	if (cells.every((c) => c.dataset.fill)) {
		statusDiv.textContent = "Draw!"
		gameActive = false
		return
	}

	currentPlayer = currentPlayer === "X" ? "O" : "X"
	statusDiv.innerHTML = `Current Turn: ${playerDisplay(currentPlayer)}`
}

function onHover(e) {
	const cell = e.target
	if (!gameActive || cell.dataset.fill) return
	cell.classList.add("preview")
	cell.innerHTML = playerDisplay(currentPlayer)
}

function onLeave(e) {
	const cell = e.target
	if (!gameActive || cell.dataset.fill) return
	cell.classList.remove("preview")
	cell.innerHTML = ""
}

function checkWin(player) {
	for (const combo of winningCombos) {
		const [a, b, c, line] = combo
		if (cells[a].dataset.fill === player && cells[b].dataset.fill === player && cells[c].dataset.fill === player) {
			svg.style.zIndex = 10
			svg.innerHTML = `<line ${line} stroke="var(--${player === "X" ? "secondary" : "primary"}-color)" stroke-width="10" stroke-linecap="round" />`
			return true
		}
	}
	return false
}

startGame()
