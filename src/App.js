import './App.css';
import { Outlet } from 'react-router';

function App() {
  return (
    <div className="App">
      <h1> APP Page</h1>
      <Outlet />
      {/* <LoginPage /> */}
     {/* <HomePage /> */}
    </div>
  );
}

export default App;
