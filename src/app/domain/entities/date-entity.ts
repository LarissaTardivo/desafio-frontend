export interface DayProps {
  day: string | null
  onDayClick: (day: string) => void
  selectedDates: string[]
  allPreviousDays: string[]
  preventedDates: string[]
  isEmptyDates: boolean
}

export interface MonthProps {
  selectedMonth: Date
  onDateChange: (selectedDates: string[]) => void
  customDates: { type: string; date: string }[]
  isEmptyDates: boolean
}
