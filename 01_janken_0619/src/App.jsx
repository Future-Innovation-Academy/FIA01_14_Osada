
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";

import Login from "./Login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Login/>} />

        <Route path={`/Home/`} element={<Home  />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
