import { quanlyrapphim } from "../../service/Quanlyrapphim"

import {GET_CINESTARS, GET_INFOR_MOVIE} from '../type/CinestarType'

export const getInformationCinestar = ()=>{
    return async dispatch =>{
        try{
            let result = await quanlyrapphim.getInforCinestar();
            
            dispatch({
                type:GET_CINESTARS,
                listCinestar:result.data.content
            })
        }
        catch(err){
            console.log(err)
        }
        
    }
}
export const getInforMovieAction = (id)=>{
    return async dispatch =>{
        try{
            let result = await quanlyrapphim.getInforMovie(id);
            dispatch({
                type:GET_INFOR_MOVIE,
                filmDetail:result.data.content
            })
            
        }
        catch(err){
            console.log(err)
        }
    }
}