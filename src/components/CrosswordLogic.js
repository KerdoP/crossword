function findOverlappingLetter(longestAnswer, gridSize, grid, searchCount) {
    let overlappingLetter = "";
    for (let i = 0; i < longestAnswer.length; i++) {
        const letter = longestAnswer[i];
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                if (grid[row][col] === letter) {
                    if (searchCount > 0) {
                        searchCount--;
                    } else {
                        overlappingLetter = letter;
                        break;
                    }
                }
            }
            if (overlappingLetter !== "") {
                break;
            }
        }
        if (overlappingLetter !== "") {
            break;
        }
    }
    return overlappingLetter;
}

function findOverlappingLetterPosition(overlappingLetter, gridSize, grid, directionIndex) {
    let overlappingLetterRow = -1;
    let overlappingLetterCol = -1;

    switch (directionIndex) {
        case 0:
            for (let row = 0; row < gridSize; row++) {
                for (let col = 0; col < gridSize; col++) {
                    if (grid[row][col] === overlappingLetter) {
                        overlappingLetterRow = row;
                        overlappingLetterCol = col;
                        return [overlappingLetterRow, overlappingLetterCol];
                    }
                }
            }
            break;
        case 1:
            for (let row = 0; row < gridSize; row++) {
                for (let col = gridSize - 1; col >= 0; col--) {
                    if (grid[row][col] === overlappingLetter) {
                        overlappingLetterRow = row;
                        overlappingLetterCol = col;
                        return [overlappingLetterRow, overlappingLetterCol];
                    }
                }
            }
            break;
        case 2:
            for (let row = gridSize - 1; row >= 0; row--) {
                for (let col = 0; col < gridSize; col++) {
                    if (grid[row][col] === overlappingLetter) {
                        overlappingLetterRow = row;
                        overlappingLetterCol = col;
                        return [overlappingLetterRow, overlappingLetterCol];
                    }
                }
            }
            break;
        case 3:
            for (let row = gridSize - 1; row >= 0; row--) {
                for (let col = gridSize - 1; col >= 0; col--) {
                    if (grid[row][col] === overlappingLetter) {
                        overlappingLetterRow = row;
                        overlappingLetterCol = col;
                        return [overlappingLetterRow, overlappingLetterCol];
                    }
                }
            }
            break;
        default:
            break;
    }

    return [overlappingLetterRow, overlappingLetterCol];
}


// Function to shuffle an array using the Fisher-Yates algorithm
function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



function findLetterIndex(longestAnswer, overlappingLetter) {
    let letterIndex = 0;
    for (let i = 0; i < longestAnswer.length; i++) {
        if (longestAnswer[i] === overlappingLetter) {
            letterIndex = i;
            break;
        }
    }
    return letterIndex;
}

function findDirection(longestAnswer, overlappingLetterRow, overlappingLetterCol, letterIndex, grid) {
    const numRows = grid.length;
    const numCols = grid[0].length;

    let direction = "";

    // Check if the word can be placed across
    if (
        overlappingLetterCol - letterIndex >= 0 &&
        overlappingLetterCol + (longestAnswer.length - letterIndex - 1) < numCols
    ) {
        let canPlace = true;

        for (let j = 0; j < longestAnswer.length; j++) {
            const row = overlappingLetterRow;
            const col = overlappingLetterCol - letterIndex + j;

            if (row < 0 || row >= numRows || col < 0 || col >= numCols) {
                canPlace = false;
                break;
            }
            if (j === 0 && col > 0 && grid[row][col - 1] !== "") {
                canPlace = false;
                break;
            }
            if (j === 0 && row > 0 && col > 0 && grid[row - 1][col - 1] !== "") {
                canPlace = false;
                break;
            }
            if (j === 0 && row < numRows - 1 && col > 0 && grid[row + 1][col - 1] !== "") {
                canPlace = false;
                break;
            }
            if (j === longestAnswer.length - 1 && col < numCols - 1 && grid[row][col + 1] !== "") {
                canPlace = false;
                break;
            }
            if (row === overlappingLetterRow && col === overlappingLetterCol) {
                continue;
            }
            if (grid[row][col] !== "" || (row > 0 && grid[row - 1][col] !== "") || (row < numRows - 1 && grid[row + 1][col] !== "")) {
                canPlace = false;
                break;
            }
        }

        if (canPlace) {
            direction = "across";
        }
    }

    // Check if the word can be placed down
    if (
        overlappingLetterRow - letterIndex >= 0 &&
        overlappingLetterRow + (longestAnswer.length - letterIndex - 1) < numRows
    ) {
        let canPlace = true;

        for (let j = 0; j < longestAnswer.length; j++) {
            const row = overlappingLetterRow - letterIndex + j;
            const col = overlappingLetterCol;

            if (row < 0 || row >= numRows || col < 0 || col >= numCols) {
                canPlace = false;
                break;
            }
            if (j === 0 && row > 0 && grid[row - 1][col] !== "") {
                canPlace = false;
                break;
            }
            if (j === 0 && row > 0 && col > 0 && grid[row - 1][col - 1] !== "") {
                canPlace = false;
                break;
            }
            if (j === 0 && row > 0 && col < numCols - 1 && grid[row - 1][col + 1] !== "") {
                canPlace = false;
                break;
            }
            if (j === longestAnswer.length - 1 && row < numRows - 1 && grid[row + 1][col] !== "") {
                canPlace = false;
                break;
            }
            if (row === overlappingLetterRow && col === overlappingLetterCol) {
                continue;
            }
            if (grid[row][col] !== "" || (col > 0 && grid[row][col - 1] !== "") || (col < numCols - 1 && grid[row][col + 1] !== "")) {
                canPlace = false;
                break;
            }
        }

        if (canPlace) {
            direction = "down";
        }
    }

    return direction;
}

function placeAnswers(epic, initialNumberOfAnswers, sortedAnswers, gridSize, grid, loopNumber, searchCount, directionIndex, lastPlacedDirection, firstRow, firstCol, placedWords, lastLongestAnswer, id, shuffledClues, returnedData) {
    let longestAnswer = sortedAnswers[0];
    let clue = shuffledClues[0];

    let overlappingLetter = findOverlappingLetter(longestAnswer, gridSize, grid, searchCount);

    if (overlappingLetter !== "") {
        let overlappingLetterRow, overlappingLetterCol;

        let directionIndex = Math.floor(Math.random() * 4) % 4;

        [overlappingLetterRow, overlappingLetterCol] = findOverlappingLetterPosition(overlappingLetter, gridSize, grid, directionIndex);

        //check where the letter is in the word
        let letterIndex = findLetterIndex(longestAnswer, overlappingLetter);

        //find the direction of the word
        let direction = findDirection(longestAnswer, overlappingLetterRow, overlappingLetterCol, letterIndex, grid);

        //place the word in the grid based on the letter index and direction
        if (direction === "across") {
            for (let j = 0; j < longestAnswer.length; j++) {
                const row = overlappingLetterRow;
                const col = overlappingLetterCol - letterIndex + j;
                grid[row][col] = longestAnswer[j];
            }
            const firstRow = overlappingLetterRow;
            const firstCol = overlappingLetterCol - letterIndex;
            placedWords++
            returnedData.across[id] = {
                clue: clue,
                answer: longestAnswer,
                row: firstRow,
                col: firstCol
            };
            id++;
            shuffledClues.shift();
            sortedAnswers.shift();
        } else if (direction === "down") {
            for (let j = 0; j < longestAnswer.length; j++) {
                const row = overlappingLetterRow - letterIndex + j;
                const col = overlappingLetterCol;
                grid[row][col] = longestAnswer[j];
            }
            const firstRow = overlappingLetterRow - letterIndex;
            const firstCol = overlappingLetterCol;
            placedWords++
            returnedData.down[id] = {
                clue: clue,
                answer: longestAnswer,
                row: firstRow,
                col: firstCol
            };
            id++;
            shuffledClues.shift();
            sortedAnswers.shift();
        } else if (direction === "" && loopNumber < (gridSize * gridSize)) {
            loopNumber++;
            searchCount++;
            return placeAnswers(epic, initialNumberOfAnswers, sortedAnswers, gridSize, grid, loopNumber, searchCount, directionIndex, lastPlacedDirection, firstRow, firstCol, placedWords, lastLongestAnswer, id, shuffledClues, returnedData);
        }
    } else {
        placedWords++
        const result = placeAnswerRandomly(longestAnswer, gridSize, grid, lastPlacedDirection, sortedAnswers, id, shuffledClues, returnedData);

        if (result === null) {
            // Handle failure case
        } else {
            id = result.id;
            shuffledClues = result.shuffledClues;
            returnedData = result.returnedData;
        }
    }

    if (epic < initialNumberOfAnswers - 1) {
        return placeAnswers(epic + 1, initialNumberOfAnswers, sortedAnswers, gridSize, grid, 0, 0, directionIndex, lastPlacedDirection, firstRow, firstCol, placedWords, lastLongestAnswer, id, shuffledClues, returnedData);
    }

    // Check if the desired number of words have been placed
    if (placedWords >= initialNumberOfAnswers - 1) {
        console.log("All words placed!");
        return grid;
    } else {
        // Handle the case where not all words could be placed
        console.log("Not all words could be placed!");
        return null;
    }
}

function placeAnswerRandomly(longestAnswer, gridSize, grid, lastPlacedDirection, sortedAnswers, id, shuffledClues, returnedData) {
    let clue = shuffledClues[0];

    // Find all available spaces for the word
    const availableSpaces = [];
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            let canBePlacedHorizontally = true;
            let canBePlacedVertically = true;
            for (let j = 0; j < longestAnswer.length; j++) {
                const horizontalCol = col + j;
                const verticalRow = row + j;
                if (
                    horizontalCol >= gridSize || // Check if out of bounds horizontally
                    grid[row][horizontalCol] !== "" ||
                    (lastPlacedDirection !== "across" && grid[row][horizontalCol] !== "") // Check if conflict with previous words horizontally
                ) {
                    canBePlacedHorizontally = false;
                }
                if (
                    verticalRow >= gridSize || // Check if out of bounds vertically
                    grid[verticalRow][col] !== "" ||
                    (lastPlacedDirection !== "down" && grid[verticalRow][col] !== "") // Check if conflict with previous words vertically
                ) {
                    canBePlacedVertically = false;
                }
            }

            if (canBePlacedHorizontally) {
                availableSpaces.push({ row, col, direction: "across" });
            }
            if (canBePlacedVertically) {
                availableSpaces.push({ row, col, direction: "down" });
            }
        }
    }

    if (availableSpaces.length === 0) {
        console.log("WE COULDN'T FIND A PLACE FOR THE WORD");
        return null; // Indicate failure by returning null
    }

    // Randomly select one available space
    const randomSpace = availableSpaces[Math.floor(Math.random() * availableSpaces.length)];
    const { row: startRow, col: startCol, direction } = randomSpace;

    // Place the word in the grid
    for (let j = 0; j < longestAnswer.length; j++) {
        const row = (direction === "down") ? (startRow + j) : startRow;
        const col = (direction === "across") ? (startCol + j) : startCol;
        grid[row][col] = longestAnswer[j];
    }

    // Save the word in the returned data
    const updatedReturnedData = { ...returnedData }; // Create a shallow copy of returnedData

    if (direction === "across") {
        updatedReturnedData.across[id] = {
            clue: clue,
            answer: longestAnswer,
            row: startRow,
            col: startCol
        };
        id++;
    } else {
        updatedReturnedData.down[id] = {
            clue: clue,
            answer: longestAnswer,
            row: startRow,
            col: startCol
        };
        id++;
    }

    shuffledClues.shift();
    sortedAnswers.shift();

    // Return the updated variables as an object
    return {
        direction: direction,
        id: id,
        shuffledClues: shuffledClues,
        returnedData: updatedReturnedData
    };
}




function createCrossword(data) {
    let returnedData = {
        across: {},
        down: {}
    };

    let id = 1;

    const answers = data.answer;
    const clues = data.clue;

    // Saves the number of answers
    let initialNumberOfAnswers = answers.length;

    // Sorts the answers by length
    const sortedAnswers = answers.slice().sort((a, b) => b.length - a.length);

    // Generates a new array of shuffled clues based on the sorting order of answers
    const shuffledClues = sortedAnswers.map(answer => {
        const index = answers.indexOf(answer);
        return clues[index];
    });

    // Saves the longest answer
    let longestAnswer = sortedAnswers[0];

    let lastPlacedDirection = "across";
    let lastLongestAnswer = "";

    // Calculates the size of the grid
    const gridSize = longestAnswer.length * 3 - 1;

    //creates the grid
    const grid = [];

    for (let i = 0; i < gridSize; i++) {
        grid.push([]);
        for (let j = 0; j < gridSize; j++) {
            grid[i].push("");
        }
    }
    console.log(grid);

    // Places the first word in the middle of the grid
    const firstRow = Math.floor((gridSize - longestAnswer.length) / 3);
    const firstCol = Math.floor((gridSize - longestAnswer.length) / 3);

    for (let j = 0; j < longestAnswer.length; j++) {
        const row = firstRow;
        const col = firstCol + j;
        grid[row][col] = longestAnswer[j];
    }

    const clue = shuffledClues[0];

    returnedData.across[id] = {
        clue: clue,
        answer: longestAnswer,
        row: firstRow,
        col: firstCol
    };
    id++;

    // Removes the first word from the list of answers and clues
    sortedAnswers.shift();
    shuffledClues.shift();

    // For cycle for every answer in sortedAnswers
    placeAnswers(1, initialNumberOfAnswers, sortedAnswers, gridSize, grid, 0, 0, 0, lastPlacedDirection, firstRow, firstCol, 0, lastLongestAnswer, id, shuffledClues, returnedData);

    return returnedData;
}

export default createCrossword;