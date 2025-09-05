export class Cell {
  public readonly row: number;
  public readonly col: number;
  public value: string;
  public readonly modifiable: boolean;
  public centreMarks: Annotations;
  public cornerMarks: Annotations;
  public colours: Annotations;

  constructor(
    row: number,
    col: number,
    value: string = "",
    modifiable: boolean = true,
  ) {
    this.row = row;
    this.col = col;
    this.value = value;
    this.modifiable = modifiable;
    this.centreMarks = new Annotations();
    this.cornerMarks = new Annotations();
    this.colours = new Annotations();
  }

  clear(): void {
    if (this.modifiable) {
      this.value = "";
    }
    this.centreMarks.clear();
    this.cornerMarks.clear();
    this.colours.clear();
  }

  render(): HTMLElement {
    const cell = document.createElement("div");
    cell.className = "cell";

    // Store the cell coordinates in data attributes
    cell.dataset.row = String(this.row);
    cell.dataset.col = String(this.col);

    if (this.value !== "") {
      cell.textContent = this.value;
    } else {
      // TODO: display centre/corner marks
    }
    return cell;
  }

  renderColours(): HTMLElement {
    const colour = document.createElement("div");
    if (!this.colours.isEmpty()) {
      // TODO: render all the colours together somehow, not just the first.
      colour.style.backgroundColor = `${this.colours.get()[0]}`;
    }
    return colour;
  }
}

export class Annotations {
  private marks: Set<string> = new Set();

  add(mark: string): void {
    this.marks.add(mark);
  }

  delete(mark: string): boolean {
    return this.marks.delete(mark);
  }

  toggle(mark: string): void {
    if (this.marks.has(mark)) {
      this.marks.delete(mark);
    } else {
      this.marks.add(mark);
    }
  }

  clear(): void {
    this.marks.clear();
  }

  get(): string[] {
    return Array.from(this.marks).sort();
  }

  isEmpty(): boolean {
    return this.marks.size === 0;
  }
}

export type CellIndex = string & { __brand: "CellIndex" };
export function CellIndex(row: number, col: number): CellIndex {
  return `${row},${col}` as CellIndex;
}
export function getCellIndex(index: CellIndex): { row: number; col: number } {
  const [row, col] = index.split(",").map(Number);
  return { row, col };
}
