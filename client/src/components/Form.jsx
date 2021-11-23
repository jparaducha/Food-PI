import React, {useEffect,useState} from 'react';
import Nav from './Nav';
import { useDispatch } from 'react-redux';
import { addRecipe } from '../actions';


export default function Form(){
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        name: '',
        summary : '',
        healthScore : ''
    });

    const styles = {
        div : {
            display :'flex',
            justifyContent : 'center',
            alignItems : 'center',
            minHeight : '84vh',
            backgroundColor : '#556',
            borderBottom : 'solid 2px #FA0',
            borderRadius : '4px',
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(addRecipe(input));
        setInput({
            name: '',
            summary : '',
            healthScore : ''
        })
    }

    function handleInputChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        console.log(input)
    }
    return(
        <>
        <Nav/>
        <div style={styles.div}>
            <form onSubmit={(e)=> handleSubmit(e)}>
                <input type='text' name='name' onChange={(e)=>handleInputChange(e)} value={input.name}></input>
                <input type='number' name='healthScore' onChange={(e)=>handleInputChange(e)} value={input.healthScore}></input>
                <textarea name='summary' rows="10" cols="50" onChange={(e)=>handleInputChange(e)} value={input.summary}></textarea>

                <input type='submit' value='Agregar receta'></input>
            </form>
        </div>
        </>
    )
}