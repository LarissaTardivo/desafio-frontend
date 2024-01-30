import React from "react"
import { DatePosition } from "../calendar"
import { format, isSameMonth } from "date-fns"
import { ptBR } from "date-fns/locale"
import "./navigation-styles.scss"

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
        {format(selectedMonth, "MMMM yyyy", { locale: ptBR }).toUpperCase()}
      </div>
      <div className="arrow" onClick={() => handleWithCalendar("next")}>
        {">"}
      </div>
    </div>
  )
}
