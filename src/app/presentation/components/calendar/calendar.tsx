import React, { useEffect, useState } from "react"
import "./calendar-styles.scss"
import { Month } from "./month/month"
import { Header } from "./header/header"
import { Navigation } from "./navigation/navigation"
import { Weekdays } from "./weekdays/weekdays"
import {
  subMonths,
  isSameMonth,
  isAfter,
  addMonths,
  format,
} from "../../functions"

export type DatePosition = "previous" | "next"
export type DateAction = "clean" | "book"

interface Props {
  customDates?: {
    type: string
    date: string
  }[]
  onDatesChange: (dates: string[]) => void
  dateStyles: {
    backgroundColor: string
    hoverColor: string
    selectedColor: string
    disabledColor: string
    poupupColor: string
  }
}

export const Calendar: React.FC<Props> = ({
  onDatesChange,
  dateStyles,
  customDates,
}) => {
  const [showToast, setShowToast] = useState(false)
  const [selectedMonth, setCurrentMonth] = React.useState(new Date())
  const [intervalDates, setIntervalDates] = React.useState<string[]>([])
  const [preventedDates, setPreventedDates] = React.useState(customDates || [])
  const [checkIn, setCheckIn] = React.useState<string | null>(null)
  const [checkOut, setCheckOut] = React.useState<string | null>(null)
  const isEmptyDates = checkIn === null && checkOut === null

  const handleWithCalendar = (
    datePosition: DatePosition,
    diffMonths: number
  ) => {
    const currentDate = new Date()
    let newMonth

    if (datePosition === "next") {
      newMonth = addMonths(selectedMonth, diffMonths)
    } else {
      newMonth = subMonths(selectedMonth, diffMonths)
    }
    if (isAfter(newMonth, currentDate) || isSameMonth(newMonth, currentDate)) {
      setCurrentMonth(newMonth)
    }
  }

  const setCheckInAndCheckout = (selectedDates: string[]) => {
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
    onDatesChange(selectedDates)
  }

  const formattedPreventedDates = customDates?.map((item) =>
    format(item.date, "MM-dd-yyyy")
  )

  useEffect(() => {
    if (checkIn && checkOut) {
      calculateAndSetIntervalDates(new Date(checkIn), new Date(checkOut))
    }
  }, [checkIn, checkOut])

  const calculateAndSetIntervalDates = (
    newCheckIn: Date,
    newCheckOut: Date
  ) => {
    let intervalDates = []
    let currentDate = new Date(newCheckIn)

    while (currentDate <= newCheckOut) {
      const formattedDate = format(currentDate, "MM-dd-yyyy")

      if (!formattedPreventedDates?.includes(formattedDate)) {
        intervalDates.push(formattedDate)
      }

      currentDate.setDate(currentDate.getDate() + 1)
    }

    setIntervalDates(intervalDates)
  }

  const handleWithSelectedDates = (action: DateAction) => {
    if (!isEmptyDates && action === "book") {
      setCheckIn(null)
      setCheckOut(null)
      showToastMessage()
      setPreventedDates([
        ...preventedDates,
        ...intervalDates?.map((item) => ({ type: "booked", date: item })),
      ])
    } else {
      setCheckIn(null)
      setCheckOut(null)
      setIntervalDates([])
    }
  }

  const showToastMessage = () => {
    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
    }, 3000)
  }

  return (
    <>
      <div className={`toast-container ${showToast ? "show" : ""}`}>
        {showToast && (
          <div className="toast">Datas reservadas com sucesso! 😄</div>
        )}
      </div>
      <div className="calendar-container">
        <Header
          checkIn={checkIn}
          checkOut={checkOut}
          handleWithSelectedDates={handleWithSelectedDates}
        />
        <div className="calendar-content">
          <Navigation
            currentDate={selectedMonth}
            handleWithCalendar={handleWithCalendar}
            dateStyles={dateStyles}
          />
          <Weekdays />
          <Month
            selectedMonth={selectedMonth}
            onDateChange={setCheckInAndCheckout}
            preventedDates={preventedDates}
            isEmptyDates={isEmptyDates}
            intervalDates={intervalDates}
            dateStyles={dateStyles}
          />
        </div>
      </div>
    </>
  )
}
