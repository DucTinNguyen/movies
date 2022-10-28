import { SETTING_CAROUSEL } from "../type/CarouselType"

const  stateDefault = {
    carousel:[
        {
            "maBanner": 1,
            "maPhim": 1282,
            "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/ban-tay-diet-quy.png"
          },
    ]
}
export const CarouselReducer = (state = stateDefault, action) =>{
    switch(action.type)
    {
        case SETTING_CAROUSEL:{
            return {...state,carousel: action.carousel}
        }
        default: return {...state}
    }
}