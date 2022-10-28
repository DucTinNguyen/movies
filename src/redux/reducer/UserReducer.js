import { TOKEN, USER_LOGIN } from "../../utli/setting/setting"
import { LOGIN_ACTION } from "../type/UserType";

let user={};

if(localStorage.getItem(USER_LOGIN)){
    user = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const stateDefault = {
    userLogin: user
}

export const UserReducer = (state= stateDefault, action) =>{
    switch(action.type){
        case LOGIN_ACTION:{
            let {user}  = action;
            localStorage.setItem(USER_LOGIN, JSON.stringify(user));
            localStorage.setItem(TOKEN,user.accessToken);
            return {...state,userLogin:user}

        }
        default:return {...state}
    }
}