import React from 'react';
import Nav from './Nav';


export default function InfoRecipe({id, name, image, diets, summary, dishTypes, healthScore}){

    return(
        <>
        <Nav/>
        <div>
        <h1>{name}</h1>
        <img src={image || 'https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png'}/>
        <p>{summary}</p>
        </div>
        </>
    )
}