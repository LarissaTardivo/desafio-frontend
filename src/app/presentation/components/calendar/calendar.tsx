import React, { useState } from "react"
import "./calendar-styles.scss"
import { Month } from "./month/month"
import { addMonths, isAfter, isSameMonth, subMonths } from "date-fns"
import { Header } from "./header/header"
import { Navigation } from "./navigation/navigation"
import { Weekdays } from "./weekdays/weekdays"

export type DatePosition = "previous" | "current" | "next"
export type DateAction = "clean" | "book"

const customDates = [
  {
    type: "block",
    date: "2024-03-03",
  },
  {
    type: "booked",
    date: "2024-04-04",
  },
  {
    type: "booked",
    date: "2024-04-05",
  },
  {
    type: "block",
    date: "2024-03-16",
  },
]

export function Calendar(): JSX.Element {
  const [showToast, setShowToast] = useState(false)
  const [selectedMonth, setCurrentMonth] = React.useState(new Date())
  const [checkIn, setCheckIn] = React.useState<string | null>(null)
  const [checkOut, setCheckOut] = React.useState<string | null>(null)
  const isEmptyDates = checkIn === null && checkOut === null

   const showToastMessage = () => {
     setShowToast(true)
     setTimeout(() => {
       setShowToast(false)
     }, 3000)
   }

  const handleWithCalendar = (datePosition: DatePosition) => {
    const currentDate = new Date()
    let newMonth

    if (datePosition === "next") {
      newMonth = addMonths(selectedMonth, 1)
    } else {
      newMonth = subMonths(selectedMonth, 1)
    }
    if (isAfter(newMonth, currentDate) || isSameMonth(newMonth, currentDate)) {
      setCurrentMonth(newMonth)
    }
  }

  const handleDayClick = (selectedDates: string[]) => {
    let newCheckIn: string | null = null
    let newCheckOut: string | null = null

    if (selectedDates.length > 0) {
      newCheckIn = selectedDates[0]
      setCheckIn(newCheckIn)
    }

    if (selectedDates.length > 1) {
      newCheckOut = selectedDates[selectedDates.length - 1]
      setCheckOut(newCheckOut)
    }
  }

  const handleWithDates = (action: DateAction) => {
    if (action === "book") {
      setCheckIn(null)
      setCheckOut(null)
      showToastMessage()
    } else {
      setCheckIn(null)
      setCheckOut(null)
    }
  }

  return (
    <>
      <div className={`toast-container ${showToast ? "show" : ""}`}>
        {showToast && <div className="toast">Datas reservadas com sucesso! 😄</div>}
      </div>
      <div className="calendar-container">
        <div className="calendar-title">
          Por quanto tempo deseja ficar em uma Housi?
        </div>
        <Header
          checkIn={checkIn}
          checkOut={checkOut}
          handleWithDates={handleWithDates}
          
        />
        <div className="calendar-content">
          <Navigation
            selectedMonth={selectedMonth}
            handleWithCalendar={handleWithCalendar}
          />
          <Weekdays />
          <Month
            selectedMonth={selectedMonth}
            onDateChange={handleDayClick}
            customDates={customDates}
            isEmptyDates={isEmptyDates}
          />
        </div>
      </div>
    </>
  )
}
