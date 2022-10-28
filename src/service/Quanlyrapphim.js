import { baseService } from "./baseService";


export class Quanlyrapphim extends baseService {
    constructor(){
        super();
    }
    

    getInforCinestar = ()=>{
        return this.get(`api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01`);
    }

    getInforMovie = (id)=>{
        return this.get(`api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`)
    }
    getCinestar = ()=>{
        return this.get(`/api/QuanLyRap/LayThongTinHeThongRap`);
    }
    laythongtincumrapTheohethong = (id)=>{
        return this.get(`api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${id}`)
    }
}
export const  quanlyrapphim = new Quanlyrapphim();