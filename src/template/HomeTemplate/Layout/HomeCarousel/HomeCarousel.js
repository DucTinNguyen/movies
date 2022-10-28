
import { Carousel, Radio } from 'antd';
import React, { useState,useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { getCarouselAction } from '../../../../redux/action/CarouselAction';
import axios from 'axios'
const contentStyle = {
    height: '600px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    backgroundColor: '#364d79',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    backgroundPosition: 'center',
};

export default function HomeCarousel() {
   
    let {carousel} = useSelector(state => state.CarouselReducer);
    let dispatch = useDispatch();
    
    useEffect(  ()=>{

        dispatch(getCarouselAction);
    }
    ,[])
        
    const renderCarousel = () => {
        return carousel.map((item,index)=>{
            return <div key={index}>
            <div style={{...contentStyle,backgroundImage:`url(${item.hinhAnh})`}}>
                <img src={item.hinhAnh} className="w-full opacity-0" alt={item.hinhAnh} />
            </div>
        </div>
        })
    }
    return (
        <div>
            <>
                <Carousel>
                    {renderCarousel()}
                </Carousel>
            </>
        </div>
    )
}
