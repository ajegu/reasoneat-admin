export function parseDate(value) {
  if (value !== null) {
    const date = new Date(value)
    return `${date.toLocaleDateString()} à ${date.toLocaleTimeString()}`
  }
}
