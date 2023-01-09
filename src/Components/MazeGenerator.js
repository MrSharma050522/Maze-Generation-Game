import React, { Fragment, useContext, useEffect, useState } from "react";
import { DataContext } from "../Store/Data-Context";
import classes from "./Controls/Control.module.css";
import Timer from "./Timer/Timer";

let start;

const GenerateMaze = (props) => {
  const {
    size,
    row,
    startPlaying,
    setGameFinished,
    setDisplayModal,
    setModalText,
    setStartPlaying,
  } = useContext(DataContext);
  const [startTimer, setStartTimer] = useState(false);
  start = startPlaying;

  let maze = document.getElementById("maze");
  let context = maze.getContext("2d");
  let current;
  let generationComplete = false;

  class Mazze {
    constructor(size, rows, columns) {
      this.size = size;
      this.columns = columns;
      this.rows = rows;
      this.grid = [];
      this.stack = [];
    }

    // Setting up the grid: Create new this.grid array based on number of instance rows and columns so we can get actual grid
    setup() {
      for (let r = 0; r < this.rows; r++) {
        let row = [];
        for (let c = 0; c < this.columns; c++) {
          //  creating  new instance of the Cell class for each element in the 2D array and push to the maze grid array
          let cell = new Cell(r, c, this.grid, this.size);
          row.push(cell);
        }
        this.grid.push(row);
      }
      // Set the starting grid
      current = this.grid[0][0];
      this.grid[this.rows - 1][this.columns - 1].goal = true;

      //
    }
    //dra ko use karenge and we also used our visited Logic to check neighbhor
    // Function to Draw the canvas by setting the size and placing the cells in the grid array on the canvas.
    draw() {
      maze.width = this.size;
      maze.height = this.size;
      maze.style.background = "black";
      // Set the first cell as visited
      current.visited = true;
      // Loop through the 2d grid array and call the show method for each cell instance
      for (let r = 0; r < this.rows; r++) {
        for (let c = 0; c < this.columns; c++) {
          let grid = this.grid;
          grid[r][c].show(this.size, this.rows, this.columns);
        }
      }

      // This function will assign the variable 'next' to random cell out of the current cells available neighbouring cells
      let next = current.checkNeighbours();
      // If there is a non visited neighbour cell
      if (next) {
        next.visited = true;
        // Add the current cell to the stack for backtracking
        this.stack.push(current);
        // this function will highlight the current cell on the grid. The parameter columns is passed
        // in order to set the size of the cell
        current.highlight(this.columns);
        // This function compares the current cell to the next cell and removes the relevant walls for each cell
        current.removeWalls(current, next);
        // Set the next cell to the current cell
        current = next;

        // Else if there are no available neighbours start backtracking using the stack
      } else if (this.stack.length > 0) {
        let cell = this.stack.pop();
        current = cell;
        current.highlight(this.columns);
      }
      // If no more items in the stack then all cells have been visted and the function can be exited
      if (this.stack.length === 0) {
        generationComplete = true;
        // setStartPlaying(true);
        return;
      }

      // Recursively call the draw function. This will be called up until the stack is empty
      window.requestAnimationFrame(() => {
        this.draw();
      });
      // setTimeout(() => {
      //   rd;
      //   this.draw();
      // }, 30);

      //frameRate(5);
    }
  }

  class Cell {
    // Constructor takes in the rowNum and colNum which will be used as coordinates to draw on the canvas.
    // also using the logic of we used in the graph or dp array to get matrix cordinates
    constructor(rowNum, colNum, parentGrid, parentSize) {
      this.rowNum = rowNum;
      this.colNum = colNum;
      this.visited = false;
      this.walls = {
        topWall: true,
        rightWall: true,
        bottomWall: true,
        leftWall: true,
      };
      this.goal = false;
      // parentGrid is passed in to enable the checkneighbours method.
      // parentSize is passed in to set the size of each cell on the grid
      this.parentGrid = parentGrid;
      this.parentSize = parentSize;
    }

    checkNeighbours() {
      let grid = this.parentGrid;
      let row = this.rowNum;
      let col = this.colNum;
      let neighbours = [];

      // The following lines push all available neighbours to the neighbours array
      // undefined is returned where the index is out of bounds (edge cases)
      let top = row !== 0 ? grid[row - 1][col] : undefined;
      let right = col !== grid.length - 1 ? grid[row][col + 1] : undefined;
      let bottom = row !== grid.length - 1 ? grid[row + 1][col] : undefined;
      let left = col !== 0 ? grid[row][col - 1] : undefined;

      // if the following are not 'undefined' then push them to the neighbours array
      if (top && !top.visited) neighbours.push(top);
      if (right && !right.visited) neighbours.push(right);
      if (bottom && !bottom.visited) neighbours.push(bottom);
      if (left && !left.visited) neighbours.push(left);

      // Choose a random neighbour from the neighbours array
      if (neighbours.length !== 0) {
        let random = Math.floor(Math.random() * neighbours.length);
        return neighbours[random];
      } else {
        return undefined;
      }
    }
    //Passing all required cordinate and making false to for walls
    // Wall drawing functions for each cell. Will be called if relevent wall is set to true in cell constructor
    drawTopWall(x, y, size, columns, rows) {
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x + size / columns, y);
      context.stroke();
    }

    drawRightWall(x, y, size, columns, rows) {
      context.beginPath();
      context.moveTo(x + size / columns, y);
      context.lineTo(x + size / columns, y + size / rows);
      context.stroke();
    }

    drawBottomWall(x, y, size, columns, rows) {
      context.beginPath();
      context.moveTo(x, y + size / rows);
      context.lineTo(x + size / columns, y + size / rows);
      context.stroke();
    }

    drawLeftWall(x, y, size, columns, rows) {
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x, y + size / rows);
      context.stroke();
    }

    // Highlights the current cell on the grid. Columns is once again passed in to set the size of the grid.
    highlight(columns) {
      // Additions and subtractions added so the highlighted cell does cover the walls

      let x = (this.colNum * this.parentSize) / columns + 1;
      let y = (this.rowNum * this.parentSize) / columns + 1;
      context.fillStyle = "blue";
      context.fillRect(
        x,
        y,
        this.parentSize / columns - 3,
        this.parentSize / columns - 3
      );
    }

    //Removing the walls using the graph and tree visited logic and find the neighbhor row and col visited or not also check the edges not
    // to get out side the grid
    removeWalls(cell1, cell2) {
      // compares to two cells on x axis
      let x = cell1.colNum - cell2.colNum;
      // Removes the relevant walls if there is a different on x axis
      if (x === 1) {
        cell1.walls.leftWall = false;
        cell2.walls.rightWall = false;
      } else if (x === -1) {
        cell1.walls.rightWall = false;
        cell2.walls.leftWall = false;
      }
      // compares to two cells on x axis
      let y = cell1.rowNum - cell2.rowNum;
      // Removes the relevant walls if there is a different on x axis
      if (y === 1) {
        cell1.walls.topWall = false;
        cell2.walls.bottomWall = false;
      } else if (y === -1) {
        cell1.walls.bottomWall = false;
        cell2.walls.topWall = false;
      }
    }

    // Draws each of the cells on the maze canvas and use the method of filstyle and fill rectangel
    show(size, rows, columns) {
      let x = (this.colNum * size) / columns;
      let y = (this.rowNum * size) / rows;
      // console.log(`x =${x}`);
      // console.log(`y =${y}`);
      context.strokeStyle = "white";
      context.fillStyle = "black";
      context.lineWidth = 2;
      if (this.walls.topWall) this.drawTopWall(x, y, size, columns, rows);
      if (this.walls.rightWall) this.drawRightWall(x, y, size, columns, rows);
      if (this.walls.bottomWall) this.drawBottomWall(x, y, size, columns, rows);
      if (this.walls.leftWall) this.drawLeftWall(x, y, size, columns, rows);
      if (this.visited) {
        context.fillRect(x + 1, y + 1, size / columns - 2, size / rows - 2);
      }
      if (this.goal) {
        context.fillStyle = "Green";
        context.fillRect(x + 1, y + 1, size / columns - 2, size / rows - 2);
        //
      }
    }
  }
  /*----GENERATING-MAZE----*/

  let newMaze;
  // const startMazeGeneration = (event) => {
  //   event.preventDefault();
  //   startPlaying = true;
  //   setGameStart(true);
  // };
  // const cancelPlaying = (event) => {
  //   event.preventDefault();
  //   startPlaying = false;
  // };
  // let keyPressEvent;
  useEffect(() => {
    newMaze = new Mazze(size, row, row);
    newMaze.setup();
    newMaze.draw();
    document.addEventListener("keydown", move);
    return () => {
      document.removeEventListener("keydown", move);
    };
  }, []);

  /*-----HANDLING-EVENTS-----*/

  // console.log(start);
  // console.log(isLoggedIn);

  const isAtFinishedLine = (obj) => {
    if (obj.rowNum === row - 1 && obj.colNum === row - 1) {
      setGameFinished(true);
      setDisplayModal("block");
      setModalText({
        firstText: " Huge Amounts of Congrats ",
        secondText: " Celebrate! ",
      });
      // setTimeout(() => {
      //   setGameFinished(false);
      // }, 60000);
      // alert("Hurray you won the game");
    }
  };

  function move(e) {
    e.preventDefault();

    // console.log("entered");
    // console.log(start);
    // console.log("exit");
    // setStartTimer(true);

    if (!generationComplete) return;
    if (!start) return;
    let key = e.key;
    let row = current.rowNum;
    let col = current.colNum;

    switch (key) {
      case "ArrowUp":
        if (!current.walls.topWall) {
          let next = newMaze.grid[row - 1][col];
          current = next;
          newMaze.draw();
          current.highlight(newMaze.columns);
          // not required if goal is in bottom right
          // if (current.goal) complete.style.display = "block";
        }
        isAtFinishedLine(current);
        break;

      case "ArrowRight":
        if (!current.walls.rightWall) {
          let next = newMaze.grid[row][col + 1];
          current = next;
          newMaze.draw();
          current.highlight(newMaze.columns);
          // if (current.goal) complete.style.display = "block";
        }
        isAtFinishedLine(current);
        break;

      case "ArrowDown":
        if (!current.walls.bottomWall) {
          let next = newMaze.grid[row + 1][col];
          current = next;
          newMaze.draw();
          current.highlight(newMaze.columns);
          // if (current.goal) complete.style.display = "block";
        }
        isAtFinishedLine(current);
        break;

      case "ArrowLeft":
        if (!current.walls.leftWall) {
          let next = newMaze.grid[row][col - 1];
          current = next;
          newMaze.draw();
          current.highlight(newMaze.columns);
          // not required if goal is in bottom right
          // if (current.goal) complete.style.display = "block";
        }
        isAtFinishedLine(current);
        break;
      default:
        break;
    }
    // console.log("at the end");
  }

  /*-----------------------------------------------------------------------*/

  return (
    <Fragment>
      {startTimer && <Timer value={65} />}

      {!startTimer && (
        <button
          className={`${classes.button} ${classes.button1}`}
          onClick={() => {
            if (generationComplete) {
              setStartTimer(true);
              setStartPlaying(true);
            }
          }}
        >
          Start
        </button>
      )}
    </Fragment>
  );
};

export default GenerateMaze;
