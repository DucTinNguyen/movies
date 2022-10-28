import React,{useEffect, useState} from 'react'
import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
    TreeSelect,
  } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { isBuffer } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { addMovieUploadImageAction, searchMovieAction, upDateMovieAction } from '../../../redux/action/MovieAction';
import FormItemLabel from 'antd/es/form/FormItemLabel';

export default function EditMovie(props) {
    //lấy thông tin phim cần chỉnh sửa từ redux về
    let {movie} = useSelector(state => state.MoviveReducer);
    console.log(movie);
    //dispacth lên redux để lấy thông tin phim cần chỉnh sửa về
    useEffect(() => {
        let {id} = props.match.params;
        dispatch(searchMovieAction(id));
    },[])
    //state img
    const [srcImg,setSrcImg] = useState('');
    let dispatch = useDispatch();
    const formik = useFormik({
        enableReinitialize:true,
        initialValues:{
            tenPhim:movie.tenPhim,
            trailer:movie.trailer,
            moTa:movie.moTa,
            ngayKhoiChieu:movie.ngayKhoiChieu,
            danhGia:movie.danhGia,
            dangChieu:movie.dangChieu,
            sapChieu:movie.sapChieu,
            hot:movie.hot,
            hinhAnh:null,
        },
        onSubmit: (value) => {
        //   console.log(value);
        //     //tạo ra đối tượng FormData
            let formData1 = new FormData();
            for(let key in value) {
              if(key !== 'hinhAnh'){
                formData1.append(key, value[key]);
              }
              else
              {
                if(value.hinhAnh!==null)
                    {
                        formData1.append('File',value.hinhAnh,value.hinhAnh.name);
                    }
              }
            }
        //     //
            dispatch(upDateMovieAction(formData1));
        },
    })

    const handleChangePicker = (value)=>{
        let ngayKhoiChieu = moment(value).format('DD/MM/YYYY');
        formik.setFieldValue('ngayKhoiChieu',ngayKhoiChieu);
    }

    const handleChangeStatus = (name)=>{
        
        return (value)=>formik.setFieldValue(name,value);
    }

    const handleChangeImg = async (e)=>{
        let file = e.target.files[0];
        await formik.setFieldValue('hinhAnh',file)
        const fileReader = new FileReader();
         fileReader.readAsDataURL(file);
         fileReader.onload = (e)=>{
            setSrcImg(e.target.result)
         }
    }
  return (
    <div>
    <h2 className="text-xl text-center">Giao diện chỉnh sửa phim</h2>
        <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      onSubmitCapture={formik.handleSubmit}
    >
      <Form.Item label="Tên Phim">
        <Input name="tenPhim" onChange={formik.handleChange} value={formik.values.tenPhim}/>
      </Form.Item>
      <Form.Item label="Trailer">
        <Input name="trailer" onChange={formik.handleChange} value={formik.values.trailer}/>
      </Form.Item>
      <Form.Item label="Mô tả">
        <Input name="moTa" onChange={formik.handleChange} value={formik.values.moTa}/>
      </Form.Item>
      
      <Form.Item label="Ngày khởi chiếu">
        <DatePicker format={'DD//MM/YYYY'} onChange={handleChangePicker} value={moment(formik.values.ngayKhoiChieu)}/>
      </Form.Item>
      <Form.Item label="Đánh giá">
        <InputNumber  value={formik.values.danhGia} onChange={handleChangeStatus('danhGia')} min={1} max={10}/>
      </Form.Item>
      <Form.Item label="Đang chiếu" valuePropName="checked">
        <Switch onChange={handleChangeStatus('dangChieu')} checked={formik.values.dangChieu} />
      </Form.Item>
      <Form.Item label="Sắp chiếu" valuePropName="checked">
        <Switch onChange={handleChangeStatus('sapChieu')} checked={formik.values.sapChieu} />
      </Form.Item>
      <Form.Item label="Hot" valuePropName="checked">
        <Switch onChange={handleChangeStatus('hot')} checked={formik.values.hot} />
      </Form.Item>
      <Form.Item label="Hình ảnh">
        <input accept='image/*' onChange={handleChangeImg} type="file"/> <br/>
        <img src={srcImg === '' ? movie.hinhAnh : srcImg} width={150} height={150} alt ="" />
      </Form.Item>
      <Form.Item className="flex justify-center">
        <button type="submit">Cập nhật</button>
      </Form.Item>
    </Form>
    </div>
  )
}
