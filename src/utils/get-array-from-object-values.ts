export function getArrayFromObjectValues<T>(object: Record<string, T>): T[] {
  return Object.values(object)
}
