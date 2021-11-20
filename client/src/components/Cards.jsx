import React, { useEffect } from 'react';
import Card from './Card';
import { useSelector, useDispatch } from 'react-redux';
// import { getRecipes } from '../actions';

export default  function Cards(){
    // const dispatch = useDispatch();
    
    var recipes = useSelector((state)=> state.recipes);


    // useEffect(()=>{
    //     dispatch(getRecipes());
    // }, [dispatch])
    
    // console.log('recipes: ', recipes)
    var mappedArray;
    while(!mappedArray){
        mappedArray = recipes.map(r=>{
        return(
            <Card id={r.id} name={r.name} image ={r.image} healthScore={r.healthScore}/>
        )
    })
}
    return(
        <div>
            {!mappedArray ? <h1>cargando...</h1>: mappedArray}
        </div>
    )
}