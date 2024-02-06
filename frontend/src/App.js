import './App.css';
import Barra  from "./Barra";
import Cuerpo from './Cuerpo'

function App() {
  return (
    <div className="App">
      <header className="">
        {Barra()}
      </header>
      <div>
        {Cuerpo()}
      </div>
    </div>
  );
}

export default App;
