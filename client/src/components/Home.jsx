import React, { useState , useEffect } from 'react';
import Nav from './Nav';
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getByName, getRecipes } from '../actions';
import Cards from './Cards';

const Home = function (){
    const dispatch = useDispatch();
    // const navigate = useNavigate();


    const [ search, setSearch ] = useState('') 


    var recetasActuales = useSelector((state)=> state.recipes)
    useEffect(()=>{
        if(search){ dispatch(getByName(search))
        console.log('search getbyname: ', search);
        }else{
            if(!recetasActuales.length) dispatch(getRecipes());}
    }, [])

    
    return (
        <>
        <Nav/>
        <Cards/>
        </>
    )
}

export default Home;