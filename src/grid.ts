import { Cell } from "./cell.ts";

export class Grid {
  public readonly width: number;
  public readonly height: number;
  private cells: Cell[][];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.cells = this.initialiseCells();
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
  render(gridElement: HTMLElement): void {
    gridElement.innerHTML = ""; // clear

    gridElement.style.display = "grid";
    gridElement.style.gridTemplateColumns = `repeat(${this.width}, 1fr)`;
    gridElement.style.gridTemplateRows = `repeat(${this.height}, 1fr)`;

    for (let col = 0; col < this.width; col++) {
      for (let row = 0; row < this.height; row++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.textContent = `${row}, ${col}`;
        gridElement.appendChild(cell);
      }
    }
  }
}
