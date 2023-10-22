function arraysHaveSameValues(arr1: any[], arr2: any[]): boolean {
  if (arr1.length !== arr2.length) {
    return false; // If the lengths are different, they can't have the same values
  }

  const set1 = new Set(arr1);
  for (const value of arr2) {
    if (!set1.has(value)) {
      return false; // If a value in arr2 is not in arr1, they are not the same
    }
  }

  return true; // All values in arr2 are also in arr1
}

export { arraysHaveSameValues };
