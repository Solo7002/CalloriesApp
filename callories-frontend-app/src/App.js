import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Main from './Pages/Main/Main';
import EditProduct from './Pages/EditProduct/EditProduct';
import EditDish from './Pages/EditDish/EditDish';
import Login from './Pages/Auth/Login/Login';
import Register from './Pages/Auth/Register/Register';

function App() {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path='/' element={<Main/>}/>
                <Route path='/edit-dish/:id' element={<EditDish/>}/>
                <Route path='/edit-product/:id' element={<EditProduct/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                {/* <Route path='/statistics' element={<Statistics/>}/>*/}
            </Routes>
        </div>
    );
}

export default App;
