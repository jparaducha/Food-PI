import { GET_RECIPES, ADD_RECIPE, FILTER_BY_TYPE, GET_BY_NAME } from "../constants/action-types"
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
        var json = await axios.get(`http://localhost:3001/recipes?${name}`); //busca recetas en la db por nombre;
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

export const addRecipe = ({name , summary , diets, image, dishTypes , healthScore , instructions})=>{
    return async function(){
        var json = await axios.post(`http//localhost:3001/recipes?name=${name}&summary=${summary}&image=${image}&healthScore=${healthScore}&instructions=${instructions}`);
        return json;
    }
}