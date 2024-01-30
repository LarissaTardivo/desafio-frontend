import { Calendar } from './app/presentation/components';
import './app-styles.scss';
import { Logo } from './app/presentation/assets';

function App() {
  return (
    <div className="main">
      <header className="header">
        <img src={Logo} alt="housi-logo" />
      </header>
      <div className='container'>
        <Calendar />
      </div>
    </div>
  )
}

export default App;
