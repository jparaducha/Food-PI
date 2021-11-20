// import { combineReducers } from 'redux';
// import { recipeReducer } from './recipeReducer';

// const reducer = combineReducers({
//     rootReducer : recipeReducer
// })

// export default reducer;
import { GET_BY_NAME, GET_RECIPES, ADD_RECIPE, FILTER_BY_TYPE } from "../constants/action-types"

export const InitialState = {
    recipes : [],
    allRecipes : []
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

                        var filtered;
                        if(payload==='All'){
                            filtered = recetas;
                        }else{
                            filtered = recetas.filter((r)=>{
                                return r.typeDiets.find((t)=> t.name=== payload);
                            })
                        }

                        return {
                            ...state,
                            recipes : filtered
                        }
        case GET_BY_NAME: // devuelve la lista de recetas obtenidas de la db;
                        return {
                            ...state,
                            payload
                        }
        case ADD_RECIPE:
                        return {
                            ...state
                        }
        default:
                        return{
                            ...state
                        }
    }
}