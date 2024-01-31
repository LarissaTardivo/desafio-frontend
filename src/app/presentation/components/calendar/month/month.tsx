import React, { useEffect, useState } from "react"
import { MonthProps } from "../../../../domain/entities"
import { Day } from "../day/day"
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isBefore,
  isToday,
  getDayOfWeek,
  getDaysInMonth,
  format,
} from "../../../functions"
import "./month-styles.scss"

export const Month: React.FC<MonthProps> = ({
  selectedMonth,
  onDateChange,
  preventedDates,
  isEmptyDates,
  intervalDates,
}) => {
  const [selectedDates, setSelectedDates] = useState<string[]>([])

  useEffect(() => {
    if (isEmptyDates) setSelectedDates([])
  }, [isEmptyDates])

  const today = new Date()
  const firstDayOfMonth = startOfMonth(selectedMonth)
  const lastDayOfMonth = endOfMonth(today)
  const previousDays = eachDayOfInterval(firstDayOfMonth, lastDayOfMonth)
  const formattedPreviousDays = previousDays
    .filter((day) => isBefore(day, today) && !isToday(day))
    .map((day) => format(day, "MM-dd-yyyy"))

  const startDayOfWeek = getDayOfWeek(firstDayOfMonth)
  const monthDays = getDaysInMonth(firstDayOfMonth)

  const daysArray: (number | null)[] = Array.from(
    { length: startDayOfWeek },
    () => null
  )
  daysArray.push(...Array.from({ length: monthDays }, (_, index) => index + 1))

  const formattedDays = daysArray.map((day) => {
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

  return (
    <div className="month-container">
      {formattedDays.map((day, index) => (
        <Day
          key={index}
          day={day}
          onDayClick={handleDayClick}
          selectedDates={selectedDates}
          allPreviousDays={formattedPreviousDays}
          preventedDates={preventedDates}
          isEmptyDates={isEmptyDates}
          intervalDates={intervalDates}
        />
      ))}
    </div>
  )
}
