import './App.css';
import {Routes, Route, BrowserRouter } from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';
// import Recipes from './components/recipes/Recipes'
import Cards from './components/Cards';
import Recipes from './components/Recipes';
import InfoRecipe from './components/InfoRecipe';

function App() {
  return (
    <BrowserRouter>
      <Routes>

      <Route exact path='/' element= {<Landing/>}/>
      <Route path = '/home' element = {<Home/>}/>
      <Route path= '/recipes' element= {<Recipes/>}/>
      <Route path= '/recipes/:id' element= {<InfoRecipe/>}/>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
