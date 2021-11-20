import React from 'react';
import homeLogo from './home-logo.png';
import {Link} from 'react-router-dom';

const styles = {
    div : {
        minWidth : '100vw',
        minHeight : '100vh',
        display: 'flex',
        justifyContent : 'center',
        alignItems : 'center'
    },
    wrapper : {
        maxWidth: '80vw',
        display: 'grid',
        gridTemplateColumns : 'repeat(3,1fr)',
        griAutoRow : 'minmax(200px, auto)',
        gridGap : '10px'
    },
    one : {
        fontFamily: 'Courier New',
        gridColumn : '1/3',
        gridRow : '1'
    },
    two : {
        fontFamily : 'Courier New',
        gridColumn : '1/3',
        gridRow : '2'
    },
    three : {
        fontFamily : 'Courier New',
        gridColumn : '1/3',
        gridRow : '3'
    },
    img : {
        maxHeight : '35vh',
        maxWidth : '35vw',
        gridColumn : '2/3',
        gridRow : '2'
    }
}

const Landing = function(){
    return(
        <div style={styles.div}>
        <div style={styles.wrapper}>
        <div style = {styles.one}>
            
        <h1 >Henry</h1>
        <h1 >Food</h1>
        <h1 >App</h1>
        </div>
        <Link to='/home'>
        <img src ={homeLogo} style={styles.img} alt='homeLogo'></img>
        </Link>
        </div>
        </div>
    )
}

export default Landing;