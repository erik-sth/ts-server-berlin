import { arraysHaveSameValues } from "../../utils/array";

describe("arraysHaveSameValues", () => {
  it("should return true for arrays with the same values", () => {
    const arr1 = [1, 2, 3];
    const arr2 = [3, 2, 1];
    expect(arraysHaveSameValues(arr1, arr2)).toBe(true);
  });

  it("should return false for arrays with different lengths", () => {
    const arr1 = [1, 2, 2];
    const arr2 = [1, 2, 3, 4];
    expect(arraysHaveSameValues(arr1, arr2)).toBe(false);
  });

  it("should return false for arrays with different values", () => {
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];
    expect(arraysHaveSameValues(arr1, arr2)).toBe(false);
  });

  it("should return true for empty arrays", () => {
    const arr1: number[] = [];
    const arr2: number[] = [];
    expect(arraysHaveSameValues(arr1, arr2)).toBe(true);
  });

  it("should return true for arrays with duplicate values", () => {
    const arr1 = [1, 2, 2, 3, 4];
    const arr2 = [3, 2, 1, 4, 2];
    expect(arraysHaveSameValues(arr1, arr2)).toBe(true);
  });
});
