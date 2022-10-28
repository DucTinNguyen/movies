import { BOOK_TICKET, GET_ROOM_TICKET } from "../type/TicketType"


const stateDefault = {
    ticket:{},
    danhSachGheDangDat:[],
    danhSachGheNguoiKhacDat:[{maGhe:49004},{maGhe:49005}]
}

export const TicketManagerReducer = (state = stateDefault,action)=>{
    switch(action.type){

        case GET_ROOM_TICKET:{
            let {ticket} = action;
            return {...state,ticket:ticket}
        }
        case BOOK_TICKET:{
            let danhSachGheDangDatUpdate = [...state.danhSachGheDangDat];
            // kiểm tra xem ghe đc tick có được bấm rồi chưa
            let index = danhSachGheDangDatUpdate.findIndex(gheDD => gheDD.maGhe === action.ghe.maGhe);
            if(index !== -1) {
                danhSachGheDangDatUpdate.splice(index, 1);
            }
            else
            {
                danhSachGheDangDatUpdate.push(action.ghe)
            }
            state.danhSachGheDangDat = danhSachGheDangDatUpdate;
            console.log(state.danhSachGheDangDat)
            return {...state}
        }

        default:return {...state}
    }
}