import React,{useState} from 'react'
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
import { useDispatch } from 'react-redux';
import { addMovieUploadImageAction } from '../../../redux/action/MovieAction';

export default function AddMovie() {

    //state img
    const [srcImg,setSrcImg] = useState('');
    let dispatch = useDispatch();
    const formik = useFormik({
        initialValues:{
            tenPhim:'',
            trailer:'',
            moTa:'',
            ngayKhoiChieu:'',
            danhGia:0,
            dangChieu:false,
            sapChieu:false,
            hot:false,
            hinhAnh:{},
        },
        onSubmit: (value) => {
          console.log(value);
            //tạo ra đối tượng FormData
            let formData = new FormData();
            for(let key in value) {
              if(key !== 'hinhAnh'){
                formData.append(key, value[key]);
              }
              else
              {
                formData.append('File',value.hinhAnh,value.hinhAnh.name);
              }
            }
            //
            dispatch(addMovieUploadImageAction(formData));
        },
    })

    const handleChangePicker = (value)=>{
        let ngayKhoiChieu = moment(value).format('DD/MM/YYYY');
        formik.setFieldValue('ngayKhoiChieu',ngayKhoiChieu);
    }

    const handleChangeStatus = (name)=>{
        
        return (value)=>formik.setFieldValue(name,value);
    }

    const handleChangeImg = (e)=>{
        
        let file = e.target.files[0];
        console.log(file)
        const fileReader = new FileReader();
         fileReader.readAsDataURL(file);
         fileReader.onload = (e)=>{
            setSrcImg(e.target.result)
         }
         //đưa dữ liệu vào formik
         formik.setFieldValue('hinhAnh',file)
    }
  return (
    <div>
    <h2 className="text-xl text-center">Giao diện thêm phim</h2>
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
        <Input name="tenPhim" onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Trailer">
        <Input name="trailer" onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Mô tả">
        <Input name="moTa" onChange={formik.handleChange}/>
      </Form.Item>
      
      <Form.Item label="Ngày khởi chiếu">
        <DatePicker format={'DD//MM/YYYY'} onChange={handleChangePicker} />
      </Form.Item>
      <Form.Item label="Đánh giá">
        <InputNumber onChange={handleChangeStatus('danhGia')} min={1} max={10}/>
      </Form.Item>
      <Form.Item label="Đang chiếu" valuePropName="checked">
        <Switch onChange={handleChangeStatus('dangChieu')} />
      </Form.Item>
      <Form.Item label="Sắp chiếu" valuePropName="checked">
        <Switch onChange={handleChangeStatus('sapChieu')}/>
      </Form.Item>
      <Form.Item label="Hot" valuePropName="checked">
        <Switch onChange={handleChangeStatus('hot')}/>
      </Form.Item>
      <Form.Item label="Hình ảnh">
        <input accept='image/*' onChange={handleChangeImg} type="file"/> <br/>
        <img src={srcImg} width={150} height={150} alt ="" />
      </Form.Item>
      <Form.Item className="flex justify-center">
        <button type="submit">Thêm</button>
      </Form.Item>
    </Form>
    </div>
  )
}
