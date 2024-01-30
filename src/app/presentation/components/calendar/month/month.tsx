import React, { useEffect, useState } from "react"
import { MonthProps } from "../../../../domain/entities"
import { Day } from "../day/day"
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  getDaysInMonth,
  isBefore,
  isToday,
  startOfMonth,
} from "date-fns"
import "./month-styles.scss"

export const Month: React.FC<MonthProps> = ({
  selectedMonth,
  onDateChange,
  customDates,
  isEmptyDates,
}) => {
  const [selectedDates, setSelectedDates] = useState<string[]>([])

  const today = new Date()
  const firstDayOfMonth = startOfMonth(selectedMonth)
  const lastDayOfMonth = endOfMonth(today)
  const previousDays = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  })
  const formattedDays = previousDays
    .filter((day) => isBefore(day, today) && !isToday(day))
    .map((day) => format(day, "MM-dd-yyyy"))

  const startDayOfWeek = getDay(firstDayOfMonth)
  const monthDays = getDaysInMonth(firstDayOfMonth)

  const daysArray: (number | null)[] = Array.from(
    { length: startDayOfWeek },
    () => null
  )
  daysArray.push(...Array.from({ length: monthDays }, (_, index) => index + 1))

  const preventedDates = customDates.map((item) =>
    format(item.date, "MM-dd-yyyy")
  )

  const completeDates = daysArray.map((day) => {
    if (day === null) {
      return null
    }
    return format(
      new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), day),
      "MM-dd-yyyy"
    )
  })

  const handleDayClick = (day: string | null) => {
    if (day) {
      setSelectedDates((prev) => {
        let updatedDates: string[] = [...prev]
        if (updatedDates.length < 2) {
          updatedDates.push(day)
        } else {
          updatedDates[1] = day
        }
        updatedDates.sort()
        onDateChange(updatedDates)
        return updatedDates
      })
    }
  }

  useEffect(() => {
    if (isEmptyDates) setSelectedDates([])
  }, [isEmptyDates])

  return (
    <div className="month-container">
      {completeDates.map((day, index) => (
        <Day
          key={index}
          day={day}
          onDayClick={handleDayClick}
          selectedDates={selectedDates}
          allPreviousDays={formattedDays}
          preventedDates={preventedDates}
          isEmptyDates={isEmptyDates}
        />
      ))}
    </div>
  )
}
