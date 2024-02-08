import './App.css';
import Barra  from "./Barra";
import Cuerpo from './Cuerpo'
import PiePag from './PiePag'

function App() {
  return (
    <div className="App">
      <header className="">
        {Barra()}
      </header>
      <div>
        {Cuerpo()}
      </div>
      {PiePag()}
    </div>
  );
}

export default App;
