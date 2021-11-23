import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Nav from './Nav';
import { useParams } from 'react-router';
import { getById } from '../actions';


export default function InfoRecipe(){
    const dispatch = useDispatch();
    const { id } = useParams();

    var recipe ;
    useEffect(()=>{
        dispatch(getById(id));
        recipe = {};
      },[]);

    recipe = useSelector(state => state.details)

    const styles = {
        div : {
            display: 'flex',
            justifyContent : 'center',
            flexFlow : 'column',
            alignItems : 'center',
            backgroundColor: 'RGBA(255,255,255,.6)',
            border: '3px solid lightblue',
            borderRadius: '10px',
            maxWidth : '75vw',
            margin: '10px',
            padding: '15px',
            fontFamily : 'arial',
            color: '#4273CB',
            textShadow : '0.2px 0.2px 0px black'
        },
        div1 : {
            Width : '93vw',
            backgroundImage : 'url(https://previews.123rf.com/images/jagcz/jagcz1702/jagcz170200134/72504512-comida-asi%C3%A1tica-servido-en-blanco-mesa-de-madera-vista-desde-arriba-el-espacio-para-el-texto-juego-d.jpg)',
            // backgroundColor : '#FC6',
            display : 'flex',
            justifyContent : 'center',
            padding : '%5'
        },
        img : {
            maxHeight : '40vh',
            border: '2px solid lightblue',
            borderRadius: '4px'
        }
    }

    return(
        <>
        <Nav/>
        <div style={styles.div1}>
        <div style={styles.div}>
        <h1 style={{fontFamily:'Courier New'}}>{recipe.name? recipe.name : 'cargando...'}</h1>
        <img style={styles.img}src={recipe.image || 'https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png'} alt='recipe'/>
        {recipe.healthScore!==undefined? <h3>Puntaje de salud: {recipe.healthScore}</h3>:null}
        {recipe.score? <h3>Puntaje Spoonacular: {recipe.score}</h3>:null}
        

        {recipe.summary? <h4 >Resumen:<div dangerouslySetInnerHTML={{ __html: recipe.summary }}/></h4>: null}&nbsp;
        {recipe.instructions ? <h4 >Pasos: <div dangerouslySetInnerHTML={{ __html: recipe.instructions}}/></h4>: null}
        </div>
        </div>
        </>
    )
}