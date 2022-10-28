import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Select,InputNumber, Cascader, DatePicker } from 'antd';
import { quanlyrapphim } from '../../../service/Quanlyrapphim';
import { useFormik } from 'formik';
import moment from 'moment';
import { quanlydatve } from '../../../service/Quanlydatve';
import { thongtinlichchieu } from '../../../model/ThongtinLichchieu';
export default function Showtime(props) {

  const [state,setState] = useState({
    heThongRap:[],
    cumRap:[]
  })
  //tạo ra đối tượng formik lấy từ form để call api tạo lịch chiếu
  const formik = useFormik({
    initialValues:{
      maPhim: props.match.params.id,
      ngayChieuGioChieu:'',
      maRap:'',
      giaVe:''
    },
    onSubmit: async (values)=>{
      // console.log(values);
      try{
        let thongtin = new thongtinlichchieu();
        thongtin.maPhim = values.maPhim;
        thongtin.ngayChieuGioChieu = values.ngayChieuGioChieu;
        thongtin.maRap = values.maRap;
        thongtin.giaVe = values.giaVe;
        let result = await quanlydatve.createCalendar(thongtin);
        alert(result.data.content);
      }catch(e){
        console.log(e)
      }
    
    }
  })
  // console.log(state.heThongRap)
  //gọi api lấy thông tin hệ thống rạp ngay lần chạy đầu tiên
  useEffect(async ()=>{
      try{
        let result = await quanlyrapphim.getCinestar();
        setState({
          ...state,
          heThongRap:result.data.content
        })
  
      }catch(e){console.log(e)}
    
  },[]);

  const handleChangeHeThongRap = async (value) =>{
    // console.log('ma rap',values)
    //gọi api truy xuất ra tất cả cụm rạp của hệ thống rạp
    try{
        let result = await quanlyrapphim.laythongtincumrapTheohethong(value)
        setState({
          ...state,
          cumRap:result.data.content
        })
    }catch(e){console.log(e)}
  }

  const handleChangeDate = (value) => {
    let ngayChieuGioChieu = moment(value).format('DD/MM/YYYY :hh:mm:ss');
    formik.setFieldValue('ngayChieuGioChieu',ngayChieuGioChieu)
  }

  const handleChangeNumber = (value) => {
    // console.log('gias ve',value)
    formik.setFieldValue('giaVe',value)

  }
   const handleChangeCumrap = (value) => {
    // console.log('cumrap',value)
    formik.setFieldValue('maRap',value)

   }
  return (
    <div>
      <h3>Tạo Lịch Chiếu Phim</h3>
      <Form name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onSubmitCapture={formik.handleSubmit}>
        <Form.Item
          label="Hệ Thống Rạp"
        >
          <Select options={state.heThongRap.map((htr,index)=>({label:htr.tenHeThongRap,value:htr.maHeThongRap}))} onChange={handleChangeHeThongRap} placeholder="Chọn hệ thống rạp" />
        </Form.Item>

        <Form.Item
          label=" Cụm Rạp"
        >
          <Select options={state.cumRap.map((cumrap,index)=>({label:cumrap.tenCumRap,value:cumrap.maCumRap}))}  onChange={handleChangeCumrap} placeholder="Chọn cụm rạp" />
        </Form.Item>

        <Form.Item
          label="Ngày chiếu giờ chiếu"
        >
          <DatePicker showTime onChange={handleChangeDate}  />
        </Form.Item>
        <Form.Item
          label="Giá vé"
        >
          <InputNumber onChange={handleChangeNumber} min={45000} max={150000}/>
        </Form.Item>
        <Form.Item
          className="flex justify-center"
        >
            <Button htmlType="submit">Tạo Lịch Chiếu</Button>
        </Form.Item>  
      </Form>

    </div>
  )
}
