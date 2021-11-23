import React from 'react';
import {Link} from 'react-router-dom';

function Card({id, name, image, diets, summary, dishTypes, healthScore}){

    const styles = {
        div : {
            display: 'flex',
            justifyContent : 'center',
            alignItems : 'center',
            flexFlow : 'column',
            background : 'RGBA(200,200,200,.7)',
            width : '27vw',
            border : '3px solid orange',
            margin : '10px'
        },
        img : {
            width : '23vw'
        },
        hScore : {
            fontFamily : 'Helvetica',
            color : '#EE0',
            textShadow:' -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
        }
    }
    return (
        <div key = {id} style={styles.div}>
            <Link to={`/recipes/${id}`}>
            <h4 style={{textDecoration:'none', color : '#5384DC'}}>{name}</h4>
            </Link>
            <img src={image || 'https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png'} style ={styles.img} alt= 'not found'></img> 
            <h4 style={styles.hScore}>Puntaje de salud {healthScore}</h4>
            <p>{diets.length?  <h5>Tipos de dietas</h5>:null}
            
            {diets?<ul>{ diets.map(i=> <li>{i[0].toUpperCase()+i.slice(1,)}</li>)}</ul>: null}
            
            </p>
        </div>
    )

}

export default Card;