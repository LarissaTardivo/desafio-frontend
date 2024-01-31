export interface DayProps {
  day: string | null
  onDayClick: (day: string) => void
  selectedDates: string[]
  allPreviousDays: string[]
  isEmptyDates: boolean
  intervalDates: string[]
  preventedDates: { type: string; date: string }[]
}

export interface MonthProps {
  selectedMonth: Date
  onDateChange: (selectedDates: string[]) => void
  isEmptyDates: boolean
  intervalDates: string[]
  preventedDates: { type: string; date: string }[]
}
