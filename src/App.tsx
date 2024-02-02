import { Calendar } from "./app/presentation/components"
import "./app-styles.scss"
import { Logo } from "./app/presentation/assets"

export const App = () => {
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
  
  return (
    <div className="main">
      <header className="header">
        <img src={Logo} alt="housi-logo" />
      </header>
      <div className="container">
        <div className="title">Por quanto tempo deseja ficar em uma Housi?</div>
        <Calendar
          customDates={customDates}
          dateStyles={{
            backgroundColor: "#FFF",
            hoverColor: "#FAC5D4",
            selectedColor: "#F45692",
            disabledColor: "#f8f8f8",
            poupupColor: "#fcf3f5",
          }}
          onDatesChange={(selectedDates) => console.log(selectedDates)}
        />
      </div>
    </div>
  )
}
