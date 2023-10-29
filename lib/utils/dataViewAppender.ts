export class DataViewAppender {
  private cursor = 0;

  constructor(public dv: DataView) {}

  setFloat32(value: number, littleEndian = false) {
    this.dv.setFloat32(this.cursor, value, littleEndian);
    this.cursor += 4;
    return this;
  }

  setFloat64(value: number, littleEndian = false) {
    this.dv.setFloat64(this.cursor, value, littleEndian);
    this.cursor += 8;
    return this;
  }

  setInt16(value: number, littleEndian = false) {
    this.dv.setInt16(this.cursor, value, littleEndian);
    this.cursor += 2;
    return this;
  }

  setInt32(value: number, littleEndian = false) {
    this.dv.setInt32(this.cursor, value, littleEndian);
    this.cursor += 4;
    return this;
  }

  setInt8(value: number) {
    this.dv.setInt8(this.cursor, value);
    this.cursor += 1;
    return this;
  }

  setUint16(value: number, littleEndian = false) {
    this.dv.setUint16(this.cursor, value, littleEndian);
    this.cursor += 2;
    return this;
  }

  setUint32(value: number, littleEndian = false) {
    this.dv.setUint32(this.cursor, value, littleEndian);
    this.cursor += 4;
    return this;
  }

  setUint8(value: number) {
    this.dv.setUint8(this.cursor, value);
    this.cursor += 1;
    return this;
  }

  setNUint8(values: number[]) {
    for (const value of values) {
      this.setUint8(value);
    }

    return this;
  }
}
