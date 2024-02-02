interface FormatsDate {
  yyyy: string
  MM: string
  dd: string
  HH: string
  mm: string
  ss: string
}

export const eachDayOfInterval = (start: Date, end: Date): Date[] => {
  const days = []
  const currentDay = new Date(start)

  while (currentDay <= end) {
    days.push(new Date(currentDay))
    currentDay.setDate(currentDay.getDate() + 1)
  }

  return days
}

export const endOfMonth = (today: Date): Date => {
  return new Date(today.getFullYear(), today.getMonth() + 1, 0)
}

export const getDayOfWeek = (date: Date): number => {
  return date.getDay()
}

export const getDaysInMonth = (date: Date): number => {
  const nextMonth = new Date(date)
  nextMonth.setMonth(nextMonth.getMonth() + 1)
  nextMonth.setDate(0)
  return nextMonth.getDate()
}

export const isBefore = (dateA: Date, dateB: Date): boolean => {
  return dateA.getTime() < dateB.getTime()
}

export const isToday = (date: Date): boolean => {
  const today = new Date()
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

export const startOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export const addMonths = (date: Date, months: number): Date => {
  const newDate = new Date(date.getFullYear(), date.getMonth(), 1)
  newDate.setMonth(newDate.getMonth() + months)
  return newDate
}

export const subMonths = (date: Date, months: number): Date => {
  const newDate = new Date(date)
  newDate.setMonth(newDate.getMonth() - months)
  return newDate
}

export const isAfter = (dateA: Date, dateB: Date): boolean => {
  return dateA.getTime() > dateB.getTime()
}

export const isSameMonth = (dateA: Date, dateB: Date): boolean => {
  return (
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getFullYear() === dateB.getFullYear()
  )
}

export function format(date: string | Date, formatString: string): string {
  let dateObject: Date

  if (typeof date === "string") {
    dateObject = new Date(date)
  } else if (date instanceof Date) {
    dateObject = date
  } else {
    throw new Error("Invalid date.")
  }

  const formats: FormatsDate = {
    yyyy: String(dateObject.getFullYear()),
    MM: String(dateObject.getMonth() + 1).padStart(2, "0"),
    dd: String(dateObject.getDate()).padStart(2, "0"),
    HH: String(dateObject.getHours()).padStart(2, "0"),
    mm: String(dateObject.getMinutes()).padStart(2, "0"),
    ss: String(dateObject.getSeconds()).padStart(2, "0"),
  }

  const formattedResult = formatString.replace(
    /yyyy|MM|dd|HH|mm|ss/g,
    (match) => formats[match as keyof FormatsDate]
  )

  return formattedResult
}

export const extractMonthAndYear = (date: Date) => {
  const options = {
    month: "long",
    year: "numeric",
  } as Intl.DateTimeFormatOptions
  return new Intl.DateTimeFormat("pt-BR", options).format(date)
}

export const getAvailableYears = () => {
  const currentYear = new Date().getFullYear()
  const startYear = currentYear
  const years = []

  for (let year = startYear; year <= currentYear + 23; year++) {
    years.push(year)
  }

  return years
}

export const differenceInMonths = (start: Date, end: Date): number => {
  let diff = (end.getFullYear() - start.getFullYear()) * 12
  diff += end.getMonth() - start.getMonth()
  return Math.abs(diff)
}