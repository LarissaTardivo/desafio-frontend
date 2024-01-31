import React from "react"
import { DayProps } from "../../../../domain/entities"
import "./day-styles.scss"
import { format } from '../../../functions'

export const Day: React.FC<DayProps> = ({
  day,
  onDayClick,
  selectedDates,
  allPreviousDays,
  preventedDates,
  isEmptyDates,
  intervalDates,
}) => {
  const dayNumber = day?.split("-")[1]
  
  const formattedBlockedDates = preventedDates.map((item) =>
    format(item.date, "MM-dd-yyyy")
  )
  const isDayBlocked =
    allPreviousDays.includes(day || "") ||
    formattedBlockedDates.includes(day || "")

  const handleOnClick = (day: string) => {
    if (day && !isDayBlocked) {
      onDayClick(day)
    }
  }

  return (
    <div
      onClick={() => handleOnClick(day || "")}
      className={day ? "day" : ""}
      data-selected={
        isEmptyDates
          ? false
          : selectedDates[0] === day || intervalDates.includes(day || "")
      }
      data-disabled={isDayBlocked}
    >
      {dayNumber}
    </div>
  )
}
