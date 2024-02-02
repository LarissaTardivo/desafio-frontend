import React, { useState } from "react"
import { DayProps } from "../../../../domain/entities"
import "./day-styles.scss"
import { format } from "../../../functions"

export const Day: React.FC<DayProps> = ({
  day,
  onDayClick,
  selectedDates,
  allPreviousDays,
  preventedDates,
  isEmptyDates,
  intervalDates,
  dateStyles,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const dayNumber = day?.split("-")[1]

  const dateSelected =
    selectedDates[0] === day || intervalDates.includes(day || "")

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
      onMouseEnter={() => !isDayBlocked && day && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => handleOnClick(day || "")}
      className={day ? "day" : ""}
      data-selected={isEmptyDates ? false : dateSelected}
      data-disabled={isDayBlocked}
      style={{
        backgroundColor: isDayBlocked
          ? dateStyles.disabledColor
          : isHovered
          ? dateStyles.hoverColor
          : dateSelected
          ? dateStyles.selectedColor
          : dateStyles.backgroundColor,
      }}
    >
      {dayNumber}
    </div>
  )
}
