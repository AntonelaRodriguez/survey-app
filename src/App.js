
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Survey from './Components/Survey';
import Responses from './Components/Responses';

function App() {
  return (
    
    <BrowserRouter>
    <div className='App'>
      <Routes>
        <Route exact path={'/'} element={<Survey/>}/>
        <Route exact path={'/responses'} element={<Responses/>}/>
      </Routes>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
