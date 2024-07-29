import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from './layouts/Navbar';
import Home from './pages/Home';
import { Route, BrowserRouter as Router , Routes  } from 'react-router-dom';
import AddClient from './clients/AddClient';
import EditClient from './clients/EditClient';
import ViewClient from './clients/ViewClient';

function App() {
  return (
    <div className="App">
     <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/addclient" element={<AddClient/>}/>
        <Route exact path="/editclient/:id" element={<EditClient />}/>
        <Route exact path="/viewclient/:id" element={<ViewClient />}/>
        


      </Routes>
      </Router>
    </div>
  );
}

export default App;
