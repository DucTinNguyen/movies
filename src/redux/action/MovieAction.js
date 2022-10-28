
import axios from 'axios';
import { history } from '../../App';
import { quanlyphim } from '../../service/QuanLyPhim';
import { GET_MOVIES } from '../type/MovieType';
export const getmovieAction = async (dispatch) =>{
    try{
        let results = await quanlyphim.getListMovie()
        dispatch({
            type: GET_MOVIES,
            result: results.data.content
        })
    }
    catch(err){
        console.log(err);
    }
}
export const addMovieUploadImageAction =  (formdata) => {
   return async dispatch =>{
   try{
        let results = await quanlyphim.addMovieUploadImage(formdata)
        alert('Thêm phim thành công');
        // console.log('result',results.data.content);

    }catch(err){
        console.log(err);
    }
}}
export const upDateMovieAction = (formdata) => {
    return async (dispatch) => {
        try{
            let results = await quanlyphim.updateMovie(formdata);
            alert('Cập nhật thành công');
        }catch(err){
            console.log(err);
        }
    }
}
export const searchMovieAction = (id) => {
    return async (dispatch) => {
        try{
            let results = await quanlyphim.searchPhim(id);
           
            dispatch({
                type:'SET_PHIM',
                data: results.data.content
            })
        }catch(err){console.log(err);}
    }
}
export const deleteMovieAction = (id) => {
    return async (dispatch) => {
        try{
            let results = await quanlyphim.deleteMovie(id);
            alert('xóa phim thành công')
            //
            dispatch(getmovieAction)

        }
        catch(err){console.log(err.response?.data);}
    }
}