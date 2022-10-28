
import { quanlynguoidung } from "../../service/QuanLyNguoiDung"
import { LOGIN_ACTION } from "../type/UserType";

import {history} from '../../App'

export const loginAction = (user) =>{
    return async (dispatch) =>{
        try{
            let result = await quanlynguoidung.login(user);

            dispatch({
                type:LOGIN_ACTION,
                user: result.data.content
                //
                
            })
            history.goBack();
        }catch(err){
            console.log(err)
        }

    }
}