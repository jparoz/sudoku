import { Cell } from "./cell.ts";

export class Grid {
  public readonly width: number;
  public readonly height: number;
  private cells: Cell[][];

  private readonly gameElement: HTMLElement;
  private readonly gridElement: HTMLElement;
  private readonly selectionElement: HTMLElement;
  private readonly featuresElement: HTMLElement;
  private readonly coloursElement: HTMLElement;

  constructor(gameElement: HTMLElement, width: number, height: number) {
    this.width = width;
    this.height = height;
    this.cells = this.initialiseCells();

    this.gameElement = gameElement;
    this.gridElement = gameElement.querySelector(".grid")!;
    this.selectionElement = gameElement.querySelector(".selection")!;
    this.featuresElement = gameElement.querySelector(".features")!;
    this.coloursElement = gameElement.querySelector(".colours")!;

    // Disable context menu on the grid element
    this.gameElement.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });

    this.gameElement.addEventListener("mousedown", (event) => {
      if (event.button === 0) {
        // left mouse
      } else if (event.button === 1) {
        // middle mouse
      } else if (event.button === 2) {
        // right mouse
      }
    });

    this.render(); // TODO: do this somewhere else
  }

  private initialiseCells(): Cell[][] {
    const grid: Cell[][] = [];
    for (let row = 0; row < this.height; row++) {
      grid[row] = [];
      for (let col = 0; col < this.width; col++) {
        grid[row][col] = new Cell();
      }
    }
    return grid;
  }

  // Get a cell at specific coordinates
  getCell(row: number, col: number): Cell {
    if (!this.isValidPosition(row, col)) {
      throw new Error(`Invalid position: (${row}, ${col})`);
    }
    return this.cells[row][col];
  }

  // Set a cell at specific coordinates
  setCell(row: number, col: number, cell: Cell): void {
    if (!this.isValidPosition(row, col)) {
      throw new Error(`Invalid position: (${row}, ${col})`);
    }
    this.cells[row][col] = cell;
  }

  // Check if position is within grid bounds
  isValidPosition(row: number, col: number): boolean {
    return row >= 0 && row < this.height && col >= 0 && col < this.width;
  }

  // Get all cells in a specific row
  getRow(row: number): Cell[] {
    if (row < 0 || row >= this.height) {
      throw new Error(`Invalid row: ${row}`);
    }
    return [...this.cells[row]]; // Return a copy
  }

  // Get all cells in a specific column
  getColumn(col: number): Cell[] {
    if (col < 0 || col >= this.width) {
      throw new Error(`Invalid column: ${col}`);
    }
    return this.cells.map((row) => row[col]);
  }

  // Get all cells as a flat array
  getAllCells(): Cell[] {
    return this.cells.flat();
  }

  // Clear all modifiable cells in the grid
  clearAll(): void {
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        this.cells[row][col].clear();
      }
    }
  }

  // Renders the grid into the given HTML element
  render(): void {
    this.gridElement.innerHTML = ""; // clear

    this.gridElement.style.display = "grid";
    this.gridElement.style.gridTemplateColumns = `repeat(${this.width}, 1fr)`;
    this.gridElement.style.gridTemplateRows = `repeat(${this.height}, 1fr)`;

    this.coloursElement.innerHTML = ""; // clear
    this.coloursElement.style.display = "grid";
    this.coloursElement.style.gridTemplateColumns = `repeat(${this.width}, 1fr)`;
    this.coloursElement.style.gridTemplateRows = `repeat(${this.height}, 1fr)`;

    for (let col = 0; col < this.width; col++) {
      for (let row = 0; row < this.height; row++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.textContent = `${row}, ${col}`;
        this.gridElement.appendChild(cell);

        const colour = document.createElement("div");
        // Debug colours
        const red = (255 * row) / this.height;
        const green = (255 * col) / this.width;
        colour.style.backgroundColor = `rgba(${red}, ${green}, 0, 0.5)`;
        this.coloursElement.appendChild(colour);
      }
    }
  }
}
