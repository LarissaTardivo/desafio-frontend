import React, { useEffect } from "react"
import { DatePosition } from "../calendar"
import "./navigation-styles.scss"
import { differenceInMonths, extractMonthAndYear, getAvailableYears, isSameMonth } from "../../../functions"
import { months } from '../../../../domain/helpers'

type Props = {
  currentDate: Date
  handleWithCalendar: (datePosition: DatePosition, diffMonths: number) => void
  dateStyles: { poupupColor: string }
}

export const Navigation: React.FC<Props> = ({
  currentDate,
  handleWithCalendar,
  dateStyles: { poupupColor },
}) => {
  const [yearsPopup, setYearsPopup] = React.useState(false)
  const [monthsPopup, setMonthsPopup] = React.useState(false)
  const [years, setYears] = React.useState<number[]>([])
  const [selectedDate, setSelectedDate] = React.useState<Date>()
  const [selectedYear, setSelectedYear] = React.useState<string>()

  useEffect(() => {
    const availableYears = getAvailableYears()
    setYears(availableYears)
  }, [])
  
  const showYears = () => {
    setYearsPopup(!yearsPopup)
  }

  const onYearSelected = (year: number) => {
    setSelectedYear(year.toString())
    setYearsPopup(false)
    setMonthsPopup(!monthsPopup)
  }

  const onMonthSelected = (month: string) => {
    const selectedDate = new Date(`${selectedYear}-${month}-02`)
    const diff = differenceInMonths(currentDate, selectedDate)
    const position = currentDate > selectedDate ? "previous" : "next"

    handleWithCalendar(position, diff)

    setSelectedDate(selectedDate)
    setYearsPopup(false)
    setMonthsPopup(false)
  }

  return (
    <>
      <div className="navigation">
        <div
          className="arrow"
          data-disabled={isSameMonth(currentDate, new Date())}
          onClick={() => handleWithCalendar("previous", 1)}
        >
          {isSameMonth(currentDate, new Date()) ? "" : "<"}
        </div>
        <div className="calendar-date" onClick={() => showYears()}>
          {extractMonthAndYear(currentDate).toUpperCase()}
        </div>
        <div className="arrow" onClick={() => handleWithCalendar("next", 1)}>
          {">"}
        </div>
      </div>

      {yearsPopup && (
        <div className="years-popup" style={{ backgroundColor: poupupColor }}>
          {years.map((year) => (
            <div
              key={year}
              onClick={() => onYearSelected(year)}
              className="year"
            >
              {year}
            </div>
          ))}
        </div>
      )}

      {monthsPopup && (
        <div className="months-popup" style={{ backgroundColor: poupupColor }}>
          <div
            className="arrow"
            onClick={() => {
              setMonthsPopup(false)
              setYearsPopup(true)
            }}
          >
            {"<"}
          </div>
          <div className="months-grid">
            {months.map((month) => (
              <div
                key={month.name}
                className="month"
                onClick={() => onMonthSelected(month.month)}
              >
                {month.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
