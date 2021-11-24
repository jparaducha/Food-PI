import React, {useState, useEffect} from 'react';
import Nav from './Nav';
import { useDispatch, useSelector } from 'react-redux';
import { addRecipe, getDietTypes } from '../actions';
// import food1 from './food1.jpg';
// import food2 from './food2.jpg';
// import food3 from './food3.jpg';
// import food4 from './food4.jpg';
// import food5 from './food5.jpg';
// import food6 from './food6.jpg';
// import food7 from './food7.jpg';
// import food8 from './food8.jpg';
// import food9 from './food9.jpg';
import food10 from './food10.jpg';

export default function Form(){
    const dispatch = useDispatch();
    
//   var imgs = [food1, food2, food3 ,food4, food5, food6, food7, food8, food9 ,food10]

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
            height: '84.5vh',
            width : '100vw',
            backgroundImage : `url(${food10})`,
        },
        div : {
            display :'flex',
            justifyContent : 'center',
            alignItems : 'center',
            minHeight : '70vh',
            backgroundColor : 'RGBA(155,155,155,.8)',
            borderBottom : 'solid 2px #FA0',
            borderRadius : '4px',
            width: '80vw',
            border: '3px solid lightblue',
            borderRadius : '10px'
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        
        setErrors(validate({
            ...errors,
            [e.target.name] : [e.target.input]
        }))
        if(input.name){
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


    const dietas = useSelector(state => state.dietTypes)

    const validate = function(input){
        var errors ={};
        if(!input.name){
          errors.name = 'Se necesita un nombre de receta';
        }// }else if(!/\S+@\S+\.\S+/.test(input.username)){
        //   errors.username = 'Username tiene que ser un mail válido';
        // }
        if(!input.summary){
          errors.summary = 'Se necesita un summary';
        }
        if(!input.healthScore){
            errors.healthScore = 'Se necesita un healthScore';
        }
        // if(input.summary===''){
        //   delete errors.summary;
        // }
        // if(input.name===''){
        //   delete errors.name;
        // }
        // if(input.healthScore===''){
        //     delete errors.healthScore;
        // }
    
        return errors;
      }
    

    function handleInputChange(e){
        setErrors({});
        
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
        <div style={styles.div1}>
        <div  style={styles.div}>
            <h1 style={{fontFamily:'Courier New', textShadow: '1px 1px 0 black', color:'#FF0'}}>Crear Receta</h1>
            <form onSubmit={(e)=> handleSubmit(e)}>
                <div style={{MinHeigth: '20vh', margin:'20px'}}>


                {errors.name && <p  style={{color:'red'}}>{errors.name}</p>}

                &nbsp;<label>Nombre</label>
                <input type='text' name='name' onChange={(e)=>handleInputChange(e)} value={input.name}></input>


                {errors.healthScore && <p style={{color:'red'}}>{errors.healthScore}</p>}

                &nbsp;<label>Health Score</label>
                <input type='number' name='healthScore' onChange={(e)=>handleInputChange(e)} value={input.healthScore}></input>

                &nbsp;<label>Spoonacular Score</label>
                <input type='number' name='score' onChange={(e)=>handleInputChange(e)} value={input.score}></input>
                </div>

                <div style={{display:'flex', justifyContent:'space-evenly'}}> 
                &nbsp;<label>Summary</label>
                <textarea name='summary' rows="6" cols="35" onChange={(e)=>handleInputChange(e)} value={input.summary}></textarea>


                {errors.summary && <p style={{color:'red'}}>{errors.summary}</p>}

                &nbsp;<label>Pasos</label>
                <textarea name='instructions' rows='6' cols='35' onChange={(e)=>handleInputChange(e)} value={input.instructions}></textarea>
                </div>

                <div>

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
                <input type='submit' value='Agregar receta'></input>
            </form>
        </div>
        </div>
        </>
    )
}