import { Thongtindatve } from "../../model/Thongtindatve";
import { quanlydatve } from "../../service/Quanlydatve"
import { BOOK_TICKET, GET_ROOM_TICKET } from "../type/TicketType";



export const getRoomTicketAction = (id) =>{
    return async dispatch =>{
        try{
            let result = await quanlydatve.getListRoomTicket(id);
         
            dispatch({
                type:GET_ROOM_TICKET,
                ticket:result.data.content
            })
        }
        catch(e){
            console.log(e)
        }
    }
}
export const bookTicketAction = (thongtindatve = new Thongtindatve()) =>{
    return async dispatch =>{
        try{    
            let result = await quanlydatve.bookTicket(thongtindatve)
            alert('Đặt vé thành công')
           
        }
        catch(err){
            console.log(err)
        }
    }
}