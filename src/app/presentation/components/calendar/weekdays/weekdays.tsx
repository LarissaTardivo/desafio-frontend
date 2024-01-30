import './weekdays-styles.scss'

export const Weekdays = () => {
  const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"]
  return (
    <div className="weekday-headers">
      {weekdays.map((weekday, index) => (
        <div key={index} className="weekday-header">
          {weekday}
        </div>
      ))}
    </div>
  )
}