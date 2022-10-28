import { baseService } from "./baseService";

export class QuanLyNguoiDung extends baseService {
    constructor(){
        super()
    }

    login = (user) => {
        return this.post(`api/QuanLyNguoiDung/DangNhap`,user);
    }
}

export const quanlynguoidung = new QuanLyNguoiDung();