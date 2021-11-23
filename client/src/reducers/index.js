// import { combineReducers } from 'redux';
// import { recipeReducer } from './recipeReducer';

// const reducer = combineReducers({
//     rootReducer : recipeReducer
// })

// export default reducer;
import { GET_BY_NAME, GET_RECIPES, ADD_RECIPE, FILTER_BY_TYPE, GET_BY_ID , GET_DIET_TYPES, ORDER_RECIPES, ORDER_RECIPES_DESC, ORDER_RECIPES_SCORE} from "../constants/action-types"

export const InitialState = {
    recipes : [],
    allRecipes : [],
    details : {},
    dietTypes : []
}


export default function rootReducer(state=InitialState, { type, payload }){
    switch(type){
        case GET_RECIPES:  // recibe la acción get_recipes y agrega el payload (recetas) a los arreglos;
                        return{
                            ...state,
                            recipes : payload,
                            allRecipes : payload
                        }
        case FILTER_BY_TYPE: //recibe la acción filter y  actualiza el estado recipes con las recetas filtradas;
                        const recetas = state.allRecipes;
                        console.log('línea 29 reducer\n recetas(', recetas.length,') = allrecipes(',state.allRecipes.length,') en redux');
                        var filtered;
                        if(payload==='All'){
                            console.log('linea 32 reducer (if)\n "filtered" almacena "recetas"');
                            filtered = recetas;
                        }else{
                            console.log('línea 35 reducer (else)\n filtered es igual a recetas con método filter y find');
                            filtered = recetas.filter((r)=>{
                                console.log('línea 37 reducer (filter)\n diets:', r.diets,' contiene ', payload.toLowerCase(), '?:', r.diets.includes(payload.toLowerCase()));
                                return r.diets.includes(payload.toLowerCase());
                            })
                        }
                        console.log('línea 41 reducer\nnueva recipes en redux va a ser:', filtered)
                        return {
                            ...state,
                            recipes : filtered
                        }
        case GET_BY_NAME: // devuelve la lista de recetas obtenidas de la db;
                        return {
                            ...state,
                            recipes : payload,
                            allRecipes : payload
                        }
        case ADD_RECIPE:
                        return {
                            ...state
                        }
        case GET_BY_ID:
                        return {
                            ...state,
                            details : payload
                        }
        case GET_DIET_TYPES:
                        return {
                            ...state,
                            dietTypes : payload
                        }
        case ORDER_RECIPES:
                        return {
                            ...state,
                            recipes : state.recipes.sort((a,b)=> a.name>b.name? 1 : -1)
                        }
        case ORDER_RECIPES_DESC:
                        return {
                            ...state,
                            recipes : state.recipes.sort((a,b)=> a.name>b.name? -1 : 1)
                        }
        case ORDER_RECIPES_SCORE:
                        return {
                            ...state,
                            recipes : state.recipes.sort((a,b)=> a.healthScore>b.healthScore? -1: 1)
                        }
        default:
                        return{
                            ...state
                        }
    }
}