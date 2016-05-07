export default class Range {
  readonly names: Array<string>;
  constructor(...names: Array<string>) {
    this.names = names;
  }

  get values(): Array<number> {
    return this.names.map((_, i) => i);
  }

  getClosest(value: number): string {
    const intValue = Math.round(value);
    if (intValue < 0)
      return this.names[0];
    else if (intValue >= this.names.length)
      return this.names[this.names.length - 1];
    else
      return this.names[intValue];
  }
}
