import { GET_RECIPES, ADD_RECIPE, FILTER_BY_TYPE, GET_BY_NAME, GET_BY_ID, GET_DIET_TYPES, ORDER_RECIPES, ORDER_RECIPES_DESC, ORDER_RECIPES_SCORE } from "../constants/action-types"
import axios from 'axios';


// export const setRecipe = (recipe) => {
//     return {
//         type: ADD_RECIPE,
//         payload : recipe
//     }
// }



export const getRecipes = ()=>{
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/recipes'); //la acción llama a la db para leer la información;
        return dispatch({ //despacha una acción del tipo get_recipes con la data de la db;
            type : GET_RECIPES,
            payload : json.data
        })
    }
}

export const getByName = (name)=>{
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/recipes?name=${name}`); //busca recetas en la db por nombre;
        return dispatch({
            type: GET_BY_NAME, //despacha una acción con la lista de recetas obtenidos de la db;
            payload : json.data
        })
    }
}


export const filterByType = (payload)=>{
    return {
        type: FILTER_BY_TYPE,
        payload
    }
}

export const orderFunction = (payload)=>{
    return {
        type: ORDER_RECIPES,
        payload
    }
}

export const orderFunctionDesc = (payload)=>{
    return {
        type: ORDER_RECIPES_DESC,
        payload
    }
}

export const orderFunctionScore = (payload)=>{
    return {
        type: ORDER_RECIPES_SCORE,
        payload
    }
}

export const addRecipe = (payload)=>{
    console.log('addRecipe!!');
    return async function(){
        let url = `http//localhost:3001/recipes`;
        var json = await axios.post(url, payload);
        console.log('hace un post con axios en:', url, ' y con payload: ', payload);
        return json;
    }
}

export const getById = (payload)=>{
    return async function(dispatch){
        const fetch = await axios.get(`http://localhost:3001/recipes/${payload}`)
    
    return dispatch({
        type: GET_BY_ID,
        payload : fetch.data
    })
    }
}

export const getDietTypes = ()=>{
    return async function(dispatch){
        var fetch = await axios.get(`http://localhost:3001/types`);

        return dispatch({
            type : GET_DIET_TYPES,
            payload : fetch.data
        })
    }
}