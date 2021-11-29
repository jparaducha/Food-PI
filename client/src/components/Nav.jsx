import React from 'react';
import spatula from './spatula.png';
import {Link} from 'react-router-dom';
import foodBg from './food5.jpg';

const styles = {
    div : {
        display : 'flex',
        justifyContent : 'space-between',
        alignContent: 'flex-end',
        // backgroundColor : '#FC9',
        backgroundImage : `url(${foodBg})`,
        borderBottom : 'solid 6px #FA0',
        borderRadius : '2px',
        minHeight : '15vh',
        fontFamily : 'helvetica'
    },
    img : {
        maxWidth : '12vw',
        maxHeight : '12vh',
    },
    link : {
        textDecoration : 'none',
    },
    title : {
        fontFamily : 'Courier New',
        color : '#D90',
        borderRadius : '1px',
        textShadow : '3px 3px 0 black',
        fontSize: '6vh'
    }
}

const Nav = function(){
    return(
        <div style={styles.div}>
        <Link to={'/home'} style={styles.link}>
            <h2 style={styles.title}>Henry Food App</h2>
        </Link>

            <Link to='/form' style={styles.link}>
            <h3 style={styles.title}>Agregar receta</h3>
            </Link>
            <img src={spatula} alt='logo' style={styles.img}></img>
            
            
        </div>
        
    )
}

export default Nav;