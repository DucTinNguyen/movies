import { applyMiddleware } from "redux";
import { combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { CarouselReducer } from "./reducer/CarouselReducer";
import { CinestaReducer } from "./reducer/CinestarReducer";
import { MoviveReducer } from "./reducer/MovieReducer";
import { TicketManagerReducer } from "./reducer/TicketManagerReducer";
import { UserReducer } from "./reducer/UserReducer";

const rootReducer = combineReducers({
    //reducer con
    CarouselReducer,
    MoviveReducer,
    CinestaReducer,
    UserReducer,
    TicketManagerReducer
})

export const store = createStore(rootReducer,applyMiddleware(thunk));
