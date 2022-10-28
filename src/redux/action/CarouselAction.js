// async ()=>{
//         try{
//             const results = await axios({
//                 url:'https://movieapi.cyberlearn.vn/api/QuanLyPhim/LayDanhSachBanner',
//                 method:'GET',
//             })
//             console.log(results.data.content);
//         }
//         catch(err){
//             console.log(err);
//         }
import axios from 'axios';
import { quanlyphim } from '../../service/QuanLyPhim';
import { DOMAIN } from '../../utli/setting/setting';
import { SETTING_CAROUSEL } from '../type/CarouselType';

export const getCarouselAction = async (dispatch) => {
    try {
        const results = await quanlyphim.getListBanner();
        
        dispatch({
            type:SETTING_CAROUSEL,
            carousel:results.data.content
        })

    }
    catch (err) {
        console.log(err);
    }
}