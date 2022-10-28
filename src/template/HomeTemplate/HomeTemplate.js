import React, { useEffect } from 'react'
import { Route } from 'react-router-dom';
import Footer from './Layout/Footer/Footer';
import Header from './Layout/Header/Header';
import HomeCarousel from './Layout/HomeCarousel/HomeCarousel';
export const HomeTemplate = (props) =>{
    let {Component,...restProps} = props;
    useEffect(()=>{
        window.scrollTo(0,0);
    })
    return <Route {...restProps} render={(propsRouter) =>{
        return <>
            <Header />
            <Component {...propsRouter} />
           <Footer/>
        </>
    }}
     />
}