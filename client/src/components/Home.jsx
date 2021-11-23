import React, { useState , useEffect } from 'react';
import Nav from './Nav';
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getByName, getRecipes } from '../actions';
import Cards from './Cards';

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
        if(search){ dispatch(getByName(search))
        console.log('search getbyname: ', search);
        }else dispatch(getRecipes());
    }, [])

    
    return (
        <>
        <Nav/>
        <Cards/>
        </>
    )
}

export default Home;