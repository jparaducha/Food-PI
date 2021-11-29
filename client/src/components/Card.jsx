import React from 'react';
import {Link} from 'react-router-dom';

function Card({uuid ,id, name, image, diets, summary, dishTypes, healthScore}){
    
    

    const styles = {
        div : {
            display: 'flex',
            justifyContent : 'center',
            alignItems : 'center',
            flexFlow : 'column',
            background : 'RGBA(200,200,200,.7)',
            width : '27vw',
            border : '3px solid orange',
            margin : '10px',
            borderRadius : '10px'
        },
        img : {
            width : '23vw',
            border : '1px solid gray',
            borderRadius : '5px'
        },
        hScore : {
            fontFamily : 'Helvetica',
            color : '#EE0',
            textShadow:' -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
        }
    }
    return (
        <div key = {id} style={styles.div}>
            <Link to={id ?`/recipes/${id}`: `/recipes/${uuid}`} style={{textDecoration:'none'}}>
            <h4 style={{ color : '#5384DC', textShadow: '1px 1px 0 black', fontFamily:'Lucida Console'}}>{name}</h4>
            </Link>
            <img src={image || 'https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png'} style ={styles.img} alt= 'not found'></img> 
            <h4 style={styles.hScore}>Puntaje de salud  {healthScore}</h4>
            <p>{diets && diets.length?  <h5>Tipos de dietas</h5>:null}
            </p>
            <ul>
              {diets? <p>{diets.map(d => {
                  if(d.name) return <li>{d.name[0].toUpperCase()+ d.name.slice(1,)}</li>
                  else return <li>{d[0].toUpperCase()+ d.slice(1,)}</li>
              })}</p>: null}
            </ul>
        </div>
    )

}

export default Card;