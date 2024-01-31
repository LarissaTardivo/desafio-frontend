import React from "react"
import { DateAction } from "../calendar"
import "./header-styles.scss"
import { format } from '../../../functions'
import { Button } from '../../button/button'

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
        <Button
          isDisabled={!checkIn || !checkOut}
          text="Limpar"
          className="clean-button"
          onClick={() => handleWithSelectedDates("clean")}
          backgroundColor="transparent"
          hoverColor="#e7e7e7"
          stroke="#a0a0a0"
        />
        <Button
          isDisabled={!checkIn || !checkOut}
          text="Reservar"
          className="book-button"
          onClick={() => handleWithSelectedDates("book")}
          backgroundColor="#f45692"
          hoverColor="#ca3d59"
        />
      </div>
    </div>
  )
}
