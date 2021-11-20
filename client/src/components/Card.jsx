import React from 'react';
import {Link} from 'react-router-dom';

function Card({id, name, image, diets, summary, dishTypes, healthScore}){

    const style = {
        div : {
            display: 'flex',
            justifyContent : 'center',
            alignItems : 'center',
        }
    }

    return (
        <div key = {id} style={style.div}>
            <Link to={`/recipes/${id}`}>
            <h4>{name}</h4>
            </Link>
            <img src={image || 'https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png'} alt= 'not found'></img> 
            <p>{summary}</p>
        </div>
    )

}

export default Card;