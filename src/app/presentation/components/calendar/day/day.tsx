import React, { useEffect, useState } from "react"
import { DayProps } from "../../../../domain/entities"
import "./day-styles.scss"

export const Day: React.FC<DayProps> = ({
  day,
  onDayClick,
  selectedDates,
  allPreviousDays,
  preventedDates,
  isEmptyDates,
}) => {
  const [intervalDates, setIntervalDates] = useState<string[]>([])
  const checkIn = new Date(selectedDates[0])
  const checkOut = new Date(selectedDates[1])
  const dayNumber = day?.split("-")[1]

  const blockedDates =
    allPreviousDays.includes(day || "") || preventedDates.includes(day || "")

  const handleOnClick = (day: string) => {
    if (day && !blockedDates) {
      onDayClick(day)
    }
  }

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()
    return `${month}-${day}-${year}`
  }

  useEffect(() => {
    let intervalDates = []
    let currentDate = new Date(checkIn)

    while (currentDate <= checkOut) {
      const formattedDate = formatDate(currentDate)

      if (!preventedDates.includes(formattedDate)) {
        intervalDates.push(formattedDate)
      }

      currentDate.setDate(currentDate.getDate() + 1)
    }

    setIntervalDates(intervalDates)
  }, [selectedDates, preventedDates])


  return (
    <div
      onClick={() => handleOnClick(day || "")}
      className="day"
      data-selected={
        isEmptyDates
          ? false
          : selectedDates[0] === day || intervalDates.includes(day || "")
      }
      data-disabled={blockedDates}
    >
      {dayNumber}
    </div>
  )
}
