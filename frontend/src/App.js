import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/NavBar';
import CarroForm from './components/CarroCadastro';
import Carro from './components/Carro';
import MarcaForm from './components/MarcaCadastro';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Carro />} />
        <Route path='/cadastrar' element={<CarroForm />} />
        <Route path='/cadastrarMarcas' element={<MarcaForm />} />
      </Routes>
    </>
  );
}

export default App;