import { GET_MOVIES } from "../type/MovieType";

const stateDefault = {
 listMovie:[
        {
            "maPhim": 10544,
            "tenPhim": "Spy x Family",
            "biDanh": "spy-x-family",
            "trailer": "https://www.youtube.com/embed/G1Mrk6pFqVI",
            "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/spy-x-family_gp01.png",
            "moTa": "Spy x Family",
            "maNhom": "GP01",
            "ngayKhoiChieu": "2022-08-16T23:26:51.15",
            "danhGia": 10,
            "hot": true,
            "dangChieu": true,
            "sapChieu": true
        }
    ],
    movie: {}
}

export const MoviveReducer = (state = stateDefault,action) =>{
    switch(action.type){
        case GET_MOVIES:{
            return {...state,listMovie:action.result}
        }
        case 'SET_PHIM':{
            return {...state,movie: action.data}
        }
        default: return {...state};
    }
}