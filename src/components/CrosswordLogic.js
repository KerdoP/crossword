class CrosswordLogic {
    constructor(data) {
        this.answers = data.map((item) => item.answer.map((a) => String(a).toUpperCase()));
        this.hints = data.map((item) => item.hint);
        this.grid = [];
        this.clues = { across: [], down: [] };
        this.buildGrid();
        this.buildClues();
    }

    buildGrid() {
        // Find the longest answer and calculate the grid size
        const maxLength = Math.max(...this.answers.map((answer) => answer.length));
        const gridSize = maxLength * 2 - 1;

        // Create the empty grid
        for (let i = 0; i < gridSize; i++) {
            this.grid.push([]);
            for (let j = 0; j < gridSize; j++) {
                this.grid[i].push('');
            }
        }

        // Place the answers in the grid
        for (let i = 0; i < this.answers.length; i++) {
            const answer = this.answers[i];
            const hint = this.hints[i];

            // Find the start cell for the answer
            const startRow = Math.floor((gridSize - answer.length) / 2);
            const startCol = Math.floor((gridSize - answer.length) / 2);

            // Place the answer in the grid
            for (let j = 0; j < answer.length; j++) {
                const row = startRow + (hint.direction === 'down' ? j : 0);
                const col = startCol + (hint.direction === 'across' ? j : 0);
                const overlapping = this.grid[row][col] !== '';
                this.grid[row][col] = answer[j];
                if (!overlapping) {
                    // Initialize the array if it's undefined
                    if (!this.clues[hint.direction]) {
                        this.clues[hint.direction] = [];
                    }
                    this.clues[hint.direction].push({
                        answerIndex: i,
                        cell: { row, col },
                        clue: hint.clue,
                        number: this.clues[hint.direction].length + 1,
                    });
                }
            }
        }
    }

    buildClues() {
        // Sort the clues by their cell position
        this.clues.across.sort((a, b) => a.cell.row * 100 + a.cell.col - (b.cell.row * 100 + b.cell.col));
        this.clues.down.sort((a, b) => a.cell.row * 100 + a.cell.col - (b.cell.row * 100 + b.cell.col));

        // Add the clue numbers to the clues object
        let clueNumber = 1;
        for (let direction of ['across', 'down']) {
            for (let i = 0; i < this.clues[direction].length; i++) {
                this.clues[direction][i].number = clueNumber;
                clueNumber++;
            }
        }
    }

    getGrid() {
        return this.grid;
    }

    getClues() {
        return this.clues;
    }
}

export default CrosswordLogic;
