import { it, expect } from "vitest"
import { getArrayFromObjectValues } from "./get-array-from-object-values"

it("should return an array of values from an object", () => {
  const object = { a: 1, b: 2, c: 3 }
  const result = getArrayFromObjectValues(object)

  expect(result.every(value => typeof value === "number")).toBe(true)
  expect(result).toEqual([1, 2, 3])
})
