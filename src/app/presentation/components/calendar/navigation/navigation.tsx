import React from "react"
import { DatePosition } from "../calendar"
import "./navigation-styles.scss"
import { extractMonthAndYear, isSameMonth } from "../../../functions"

type Props = {
  selectedMonth: Date
  handleWithCalendar: (datePosition: DatePosition) => void
}
export const Navigation: React.FC<Props> = ({
  selectedMonth,
  handleWithCalendar,
}) => {

  return (
    <div className="navigation">
      <div
        className="arrow"
        data-disabled={isSameMonth(selectedMonth, new Date())}
        onClick={() => handleWithCalendar("previous")}
      >
        {isSameMonth(selectedMonth, new Date()) ? "" : "<"}
      </div>
      <div className="calendar-date">
        {extractMonthAndYear(selectedMonth).toUpperCase()}
      </div>
      <div className="arrow" onClick={() => handleWithCalendar("next")}>
        {">"}
      </div>
    </div>
  )
}
