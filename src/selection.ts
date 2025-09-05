import { CellIndex } from "./cell.ts";

export class Selection {
  public readonly width: number;
  public readonly height: number;

  private selected: Set<CellIndex>;

  private element: HTMLElement;

  constructor(element: HTMLElement, width: number, height: number) {
    this.width = width;
    this.height = height;

    this.selected = new Set();

    this.element = element;
  }

  select(cell: CellIndex): void {
    this.selected.add(cell);
  }

  deselect(cell: CellIndex): void {
    this.selected.delete(cell);
  }

  clear(): void {
    this.selected.clear();
  }

  render(): void {
    // TODO: Render this more nicely than with a grid of transparent squares

    this.element.innerHTML = ""; // clear
    this.element.style.display = "grid";
    this.element.style.gridTemplateColumns = `repeat(${this.width}, 1fr)`;
    this.element.style.gridTemplateRows = `repeat(${this.height}, 1fr)`;

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        const cell = document.createElement("div");
        cell.className = "cell";

        if (this.selected.has(CellIndex(row, col))) {
          cell.style.backgroundColor = "rgba(0, 0, 255, 0.2)";
        }

        this.element.appendChild(cell);
      }
    }
  }
}
