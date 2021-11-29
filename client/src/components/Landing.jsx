import React, {useEffect} from 'react';
import homeLogo from './home-logo.png';
// import { useDispatch, useSelector } from 'react-redux';
// import { getDietTypes } from '../actions';
import {Link} from 'react-router-dom';
import food1 from './food1.jpg';
import food2 from './food2.jpg';
import food3 from './food3.jpg';
import food4 from './food4.jpg';
import food5 from './food5.jpg';
import food6 from './food6.jpg';
import food7 from './food7.jpg';
import food8 from './food8.jpg';
import food9 from './food9.jpg';
import food10 from './food10.jpg';





const Landing = function(){

    var imgs = [food1, food2, food3 ,food4, food5, food6, food7, food8, food9 ,food10]


const styles = {
    div : {
        Width : '100vw',
        minHeight : '100vh',
        display: 'flex',
        justifyContent : 'center',
        alignItems : 'center',
        backgroundImage : `url(${imgs[Math.floor(Math.random() * 10)]})`,
        backgroundRepeat : 'no-repeat',
        backgroundAttachment : 'fixed',
        backgroundSize : 'cover'
    },
    wrapper : {
        maxWidth: '80vw',
        display: 'grid',
        gridTemplateColumns : 'repeat(3,1fr)',
        gridAutoRow : 'minmax(200px, auto)',
        gridGap : '10px'
    },
    one : {
        fontFamily: 'Courier New',
        gridColumn : '1/3',
        gridRow : '1',
        color : '#FC0',
        textShadow : '2px 2px 0 black'
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
        gridRow : '2',
        fontFamily : 'Courier New',
        fontSize: '80px',
        textShadow: '2px 2px 0 black',
        color: '#FC0',
        textDecoration : 'none'
    }
}

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
        {/* <h1 style={styles.img}>Home</h1> */}
        </Link>
        </div>
        </div>
    )
}

export default Landing;