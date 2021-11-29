import React, {useState, useEffect} from 'react';
import Nav from './Nav';
import { useDispatch, useSelector } from 'react-redux';
import { addRecipe, getDietTypes } from '../actions';
import food10 from './food10.jpg';

export default function Form(){
    const dispatch = useDispatch();
    
const dietas = useSelector(state => state.dietTypes)


    useEffect(() => {
        dispatch(getDietTypes())
    }, [])


    const [input, setInput] = useState({
        name: '',
        summary : '',
        healthScore : '',
        image: '',
        instructions: '',
        diets : [],
        score : undefined,
        healthScore: undefined
    });
    const [errors,setErrors] = useState({});

    const styles = {
        div1 : {
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            minHeight: '84.5vh',
            width : '100vw',
            backgroundImage : `url(https://media.istockphoto.com/vectors/food-and-drink-outline-seamless-pattern-hand-drawn-kitchen-background-vector-id493660520?k=20&m=493660520&s=612x612&w=0&h=A40XvvV9WKRf2DNqfaLW6NI5AxPzfQcsYannbyGTR4M=)`
        },
        div : {
        //     display: 'grid',
        // gridTemplateColumns : 'repeat(3,1fr)',
        // gridAutoRow : 'minmax(200px, auto)',
        // gridGap : '10px',
            fontFamily : 'Courier New',
            color: '#FC0',
            fontWeight : '600',
            textShadow : '1px 1px 0 black',
            display :'flex',
            justifyContent : 'center',
            alignItems : 'center',
            flexFlow: 'column',
            minHeight : '70vh',
            backgroundColor : 'RGBA(155,155,155,.9)',
            borderBottom : 'solid 2px #FA0',
            borderRadius : '4px',
            width: '80vw',
            border: '3px solid lightblue',
            borderRadius : '10px',
            margin : '5vh',
            padding: '10px'
        },
        center:{
            display:'flex',
            justifyContent:'center',
            flexFlow : 'column',
            margin : '4px'
        },
        input : {
            border : '2px solid #AA0',
            borderRadius : '7px',
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        
        setErrors(validate({
            ...errors,
            [e.target.name] : [e.target.input]
        }))
        if(!!Object.keys(errors) && input.name && input.summary){
            console.log('despacha');
        dispatch(addRecipe(input));
        setInput({
            name: '',
            summary : '',
            healthScore : '',
            image: '',
            instructions: '',
            diets : [],
            score : 0,
            healthScore: 0
        })
        setErrors({});}

        else{
            alert('Faltan parámetros');
        }
    }


    const validate = function(input){
        var errors ={};
        if(!input.name){
          errors.name = 'Se necesita un nombre de receta';
        }
        if(!input.summary){
          errors.summary = 'Se necesita un summary';
        }
        if(!input.healthScore){
            errors.healthScore = 'Se necesita un healthScore';
        }
    
        return errors;
      }
    

    function handleInputChange(e){
        setErrors(validate({
            ...errors,
            [e.target.name] : [e.target.input]
        }))
        setInput({
          ...input,
          [e.target.name] : e.target.value
        })
    }


    const handleCheckboxs = (e) => {
        if(e.target.checked){
          setInput({
          ...input,
          diets: [...input.diets, e.target.value]
          })
      }
      }
    return(
        <>
        <Nav/>
        <div style= {styles.div1}>
        <div style = {styles.div}>
            <div>
            <h1 style={{fontFamily:'Courier New', textShadow: '1px 1px 0 black', color:'#FF0'}}>Crear Receta</h1>
            </div>
            <form onSubmit={(e)=> handleSubmit(e)}>

                <div>
                
                <label>Nombre</label>
                </div>
                <div>
                &nbsp;<input type='text' name='name' onChange={(e)=>handleInputChange(e)} value={input.name} ></input>

                </div>
                <div>

                <label>Health Score</label>
                </div>
                <div>
                &nbsp;<input type='number' name='healthScore' min='0' max ='100' onChange={(e)=>handleInputChange(e)} value={input.healthScore}></input>
                </div>
                <div>
                <label>Spoonacular Score</label>
                </div>
                <div>
                &nbsp;<input type='number' name='score' min='0' max ='100' onChange={(e)=>handleInputChange(e)} value={input.score}></input>
                
                </div>
                <div> 
                <label>Summary</label>
                </div>
                <div> 
                &nbsp;<textarea style = {styles.input} name='summary' rows="6" cols="35" onChange={(e)=>handleInputChange(e)} value={input.summary}></textarea>
                

                </div>
                <div>
                <label>Pasos</label>
                </div>
                <div>
                &nbsp;<textarea style={styles.input} name='instructions' rows='6' cols='35' onChange={(e)=>handleInputChange(e)} value={input.instructions} ></textarea>
                </div>
               
                

                <div style={styles.center}>

                        {dietas.map(i=> <div>
                             <label>{i.name}</label> 
                        <input
                         type='checkbox' 
                         key= {i.id}
                        value={i.name}
                        name={i.name}
                        onChange={(e)=>handleCheckboxs(e)}>
                        </input> 
                        </div>)}
                </div>
                <input style={styles.input} type='submit' value='Agregar receta' onSubmit={(e)=> handleSubmit(e)} ></input>
            </form>
        </div>
        </div>
        </>
    )
}