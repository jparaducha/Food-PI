import React, { useEffect, useState } from 'react';
import Card from './Card';
import { useSelector, useDispatch } from 'react-redux';
import { getByName } from '../actions';
import { filterByType, orderFunction, orderFunctionDesc, orderFunctionScore } from '../actions';
import axios from 'axios';
import prevButtn from './prevButtn.png';
import nextButtn from './nextButtn.png';

const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

export default  function Cards(){
    const dispatch = useDispatch();
    
    var recipes = useSelector((state)=> state.recipes);

  const [filtrados, setFiltrados] = useState([]);
  const [search, setSearch] = useState("");
  const [diet, setDiet] = useState('');
  const [searchSubmit, setSearchSubmit] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [actualPage, setActualPage] = useState(1);

  const styles = {
    divControles : {
      display: 'flex',
      justifyContent : 'space-evenly',
      alignItems : 'center',
      border: '15px solid #FCC',
      backgroundColor : 'RGBA(255,5,5,.2)'
    },
    divPaginado : {
      display: 'flex',
      justifyContent: 'center',
      alignItems : 'center',
      border: '10px solid #FCC',
      backgroundColor : 'RGBA(255,5,5,.2)',
    },
    cards : {
      display: 'flex',
      flexWrap : 'wrap',
      justifyContent : 'space-around',
      borderRadius: '2px',
      backgroundImage : 'url(' + 'https://previews.123rf.com/images/kucherav/kucherav1703/kucherav170300105/73010705-marco-de-diferentes-alimentos-cocinados-a-la-parrilla-en-la-mesa-de-madera-en-un-d%C3%ADa-soleado-bistec-.jpg' + ')',
      backgroundRepeat : 'no-repeat',
      backgroundAttachment : 'fixed'
    },
    global : {
      
      backgroundColor: '#CCC'
    }
  }


  const nextPage = () => {
        setCurrentPage(currentPage + 9)
        setActualPage(actualPage + 1)
  }
  const prevPage = () => {
    if(currentPage > 0) {
      setActualPage(actualPage - 1)
      setCurrentPage(currentPage - 9)
    } 
  }

  function filteredRecipes(){
    if (searchSubmit.length === 0) {
      return (recipes.length) && recipes.slice(currentPage, currentPage + 9)
    }
  else{
    setSearchSubmit("");
    return (recipes.length) && recipes.slice(currentPage, currentPage + 9)
  }
}
useEffect(()=>{
  setFiltrados(filteredRecipes())
},)

    const onSearchChange = (event) => {
        setSearch(event.target.value);
       console.log(search)
     }
     const onSearchSubmit = (event) => {
       
      setCurrentPage(0);
      setActualPage(1);
      setDiet('All');
         dispatch(getByName(search));
         console.log('despacha getbyname : ', search, '\n línea 47 Cards.jsx');
       setCurrentPage(0); 
       setSearchSubmit(search);
       setSearch("");
     }


    const handleDietChange = (e)=>{
        setDiet(e.target.value);
        console.log(diet);
    }

    const asdsa = (e)=>{
        e.preventDefault();
        console.log('EL TIPO DE DIETA ES:', diet);
        console.log('se despaacha filterbytype con :', diet);
        setCurrentPage(0);
        setActualPage(1);
        dispatch(filterByType(diet));
    }

    const orderHandler = (e)=>{
      setCurrentPage(0);
      setActualPage(1);
      e.preventDefault();
      console.log('a ordenar');
      dispatch(orderFunction());
      setFiltrados(filteredRecipes);
    }

    const orderHandlerScore = (e)=>{
      setCurrentPage(0);
      setActualPage(1);
      e.preventDefault();
      console.log('a ordenar');
      dispatch(orderFunctionScore());
      setFiltrados(filteredRecipes);
    }

    const orderHandlerDesc = (e)=>{
      setCurrentPage(0);
      setActualPage(1);
      e.preventDefault();
      console.log('a ordenar');
      dispatch(orderFunctionDesc());
      setFiltrados(filteredRecipes);
    }
    
    
    return(
        <>
        <div styles={styles.global}>
            <div style={styles.divControles}>
              <input type="text" placeholder="Buscar receta" onChange={(e) => onSearchChange(e)} />
              <button onClick={(e) => onSearchSubmit(e)}>Buscar</button>
              <form onSubmit={(e)=> asdsa(e)} value={diet}>
                <label for="dietas">Filtrar por tipo:</label>
                  <select id="dietas" name="dietas"  onChange={(e)=>handleDietChange(e)}>
                    <option value='All'>All</option>
                    <option id='GlutenFree' value="Gluten Free">Gluten Free</option>
                    <option value="Ketogenic">Ketogenic</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Lacto Ovo Vegetarian">Lacto Ovo Vegetarian</option>
                    <option value="Dairy Free">Dairy Free</option>
                    <option value='Vegan'>Vegan</option>
                    <option value='Pescetarian'>Pescetarian</option>
                    <option value='Paleo'>Paleo</option>
                    <option value='Primal'>Primal</option>
                    <option value='Low FODMAP'>Low FODMAP</option>
                    <option value='Whole30'>Whole30</option>
                  </select>
                <input type='submit' value='Filtrar'></input>
              </form>

              <input type='button' value='ordenar por puntaje' onClick = {(e)=> orderHandlerScore(e)}/>
              <input type='button' value='ordenar A-Z' onClick = {(e)=> orderHandler(e)}/>
              <input type='button' value='ordenar Z-A' onClick = {(e)=> orderHandlerDesc(e)}/>
            </div>
            <div style={styles.divPaginado}>
              {actualPage!=1?<img src={prevButtn} style={{maxHeight:'8vh'}} onClick={() => prevPage()}/>: null}
              &nbsp;
              <p>{actualPage}</p>
              &nbsp;
              {(recipes.length)/9>actualPage ?<img src={nextButtn} style={{maxHeight:'8vh'}} onClick={() => nextPage()}/>:null}
            </div>

            <div style={styles.cards}>
              {filtrados ? filtrados.map((r) => {
                return(
                       <Card id={r.id} name={r.name} image ={r.image} healthScore={r.healthScore} diets={r.diets}/>
                      )
                                                })
              :null}
            </div>


            <div style={styles.divPaginado}>
              {actualPage!=1?<img src={prevButtn} style={{maxHeight:'8vh'}} onClick={() => prevPage()}/>: null}
              &nbsp;
              <p>{actualPage}</p>
              &nbsp;
              {(recipes.length)/9>actualPage ?<img src={nextButtn} style={{maxHeight:'8vh'}} onClick={() => nextPage()}/>:null}
            </div>
        </div>
        </>
    )
}