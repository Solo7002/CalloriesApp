import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Main from './Pages/Main/Main';
import EditProduct from './Pages/EditProduct/EditProduct';
import EditDish from './Pages/EditDish/EditDish';

function App() {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path='/' element={<Main/>}/>
                <Route path='/edit-dish/:id' element={<EditDish/>}/>
                <Route path='/edit-product/:id' element={<EditProduct/>}/>
                {/* <Route path='/statistics' element={<About/>}/>
                <Route path='/calendar' element={<Cars/>}/> */}
            </Routes>
        </div>
    );
}

export default App;
