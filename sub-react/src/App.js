import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      Sub React App 
      <p>
        <Link to="/">Home</Link> 
        &nbsp;|&nbsp;
        <Link to="/about">About</Link>
      </p>
    </div>
  );
}

export default App;
