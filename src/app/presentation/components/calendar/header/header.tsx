import React from "react"
import { DateAction } from "../calendar"
import "./header-styles.scss"
import { format } from '../../../functions'

type Props = {
  checkIn: string | null
  checkOut: string | null
  handleWithSelectedDates: (action: DateAction) => void
}
export const Header: React.FC<Props> = ({
  checkIn,
  checkOut,
  handleWithSelectedDates,
}) => {
  return (
    <div className="calendar-header">
      <div className="check-dates">
        <div>
          <strong>Check-in</strong>
          <div>{checkIn ? format(checkIn, "dd/MM/yyyy") : "-"}</div>
        </div>
        <div>
          <strong>Check-out</strong>
          <div>{checkOut ? format(checkOut, "dd/MM/yyyy") : "-"}</div>
        </div>
      </div>
      <div className="calendar-buttons">
        <div
          className="clean-button"
          data-disabled={!checkIn || !checkOut}
          onClick={() => handleWithSelectedDates("clean")}
        >
          Limpar
        </div>
        <div
          className="book-button"
          data-disabled={!checkIn || !checkOut}
          onClick={() => handleWithSelectedDates("book")}
        >
          Reservar
        </div>
      </div>
    </div>
  )
}
