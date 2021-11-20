import React from 'react';
import spatula from './spatula.png';
import {Link} from 'react-router-dom';

const styles = {
    div : {
        display : 'flex',
        justifyContent : 'space-between',
        alignContent: 'center',
        backgroundColor : '#CCC',
        borderBottom : 'solid 2px #FA0',
        borderRadius : '4px',
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
        fontFamily : 'helvetica',
        color : '#D90',
        borderRadius : '1px'
    }
}

const Nav = function(){
    return(
        <Link to={'/'} style={styles.link}>
        <div style={styles.div}>
            <h2 style={styles.title}>Henry Food App</h2>
            <img src={spatula} alt='logo' style={styles.img}></img>
        </div>
        </Link>
    )
}

export default Nav;