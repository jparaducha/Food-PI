import React, { useState , useEffect } from 'react';
import Nav from './Nav';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes } from '../actions';

const Home = function (){
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [ search, setSearch ] = useState('') 
    const styles = {
        form : {
            display: 'flex',
            justifyContent : 'center'
        }
    }


    useEffect(()=>{
        dispatch(getRecipes());
    }, [dispatch])

    function handleInputChange(e){
        setSearch(e.target.value);
    }

    function buscarRecetas(e){
        e.preventDefault();
        navigate('/recipes',{replace: true} );
        dispatch(getRecipes());

    }
    return (
        <>
        <Nav/>
        <div>
            <form style={styles.form} onSubmit={(e)=>buscarRecetas(e)}>
                <input type='text' id='textoBusqueda' placeholder='recetas' onChange= {(e)=>handleInputChange(e)}></input>
                <input type='submit' value='Buscar'></input> 
            </form>   
        </div>
        </>
    )
}

export default Home;