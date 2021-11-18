import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <p>Base React App</p>
      <Link to="/">Home</Link>
      &nbsp;|&nbsp;
      <Link to="/app-vue-base">AppVueBase</Link>
      <div id="container1"></div>
    </div>
  );
}

export default App;
