export class Cell {
  public value: string;
  public readonly modifiable: boolean;
  public centreMarks: Annotations;
  public cornerMarks: Annotations;
  public colours: Annotations;

  constructor(value: string = "", modifiable: boolean = true) {
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
}

export class Annotations {
  private marks: Set<string> = new Set();

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
