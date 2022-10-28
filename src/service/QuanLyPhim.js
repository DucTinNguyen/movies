import { baseService } from "./baseService"


export class QuanLyPhim extends baseService {
    constructor(){
        super();
    }
    getListBanner = ()=>{
        return this.get(`api/QuanLyPhim/LayDanhSachBanner`);
    }
    getListMovie = ()=>{
        return this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01`);
    }
    addMovieUploadImage = (formData)=>{
        return this.post(`api/QuanLyPhim/ThemPhimUploadHinh`,formData);
    }
    updateMovie = (formData)=>{
        return this.post(`api/QuanLyPhim/CapNhatPhimUpload`,formData)
    }
    searchPhim = (id)=>{
        return this.get(`api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`)
    }
    deleteMovie = (id)=>{
        return this.delete(`api/QuanLyPhim/XoaPhim?MaPhim=${id}`)
    }
}
export const quanlyphim = new QuanLyPhim();
