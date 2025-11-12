export const isValidDate = (date: string): boolean => {
  return !isNaN(Date.parse(date))
}

export const getDaysInMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() - 1, 0).getDate()
}

export const getFormattedDate = (date: Date) => new Intl.DateTimeFormat('en-US', {
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
}).format(date)
