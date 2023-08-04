import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" />
        <Route path="/signin" />
        <Route path="/todo" />
      </Routes>
    </div>
  );
}

export default App;
