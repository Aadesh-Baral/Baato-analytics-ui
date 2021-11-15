import './App.css';
import Charts from './Charts/Charts'
import authHeader from './API/API';
function App() {
  console.log( authHeader());
  return (
    <div className="App">
      < Charts />
    </div>
  );
}

export default App;
