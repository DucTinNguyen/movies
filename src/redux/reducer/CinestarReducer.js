import { GET_CINESTARS, GET_INFOR_MOVIE } from "../type/CinestarType"

const stateDefault = {
    listCinestar:[],
    filmDetail:{
    }
}

export const CinestaReducer = (state = stateDefault, action)=>{

    switch(action.type){
        case GET_CINESTARS:{
            return {...state,listCinestar:action.listCinestar}
        }
        case GET_INFOR_MOVIE:{
            return {...state,filmDetail:action.filmDetail};
        }
        default:return {...state}
    }

}