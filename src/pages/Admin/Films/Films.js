import React, { Fragment, useEffect } from 'react'
import { AudioOutlined,SearchOutlined,EditOutlined,DeleteOutlined,PlusOutlined,CalendarOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import { Table, Button, } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getInformationCinestar } from '../../../redux/action/CinestarAction';
import { deleteMovieAction, getmovieAction } from '../../../redux/action/MovieAction';
import styles from './Films.less'
import { history } from '../../../App';
export default function Films() {

  // lấy dữ liệu phim từ redux về
  let { listMovie } = useSelector(state => state.MoviveReducer);
  let dispatch = useDispatch();
  console.log(listMovie)
  //dispatch call api lấy array phim về
  useEffect(() => {
      dispatch(getmovieAction)
  },[])
  const onSearch = (value) => console.log(value);
  const { Search } = Input;

  const columns = [
    {
      title: 'Mã Phim',
      dataIndex: 'maPhim',
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ['descend','ascend'],
      width:'15%',
    },
    {
      title: 'Hình Ảnh',
      render: (text,film,index)=>{
        return <img src={film.hinhAnh} alt={film.tenPhim} width={50} height={50} />
      },
      width:'15%'
    },
    {
      title: 'Tên Phim',
      dataIndex: 'tenPhim',
      width:'50%'
    },
    {
      title: 'Thao tác',
      render: (text, film)=>{
        return <div className="flex justify-center">
          <button onClick={()=>{history.push(`/admin/films/edit/${film.maPhim}`)}} className="w-10 h-10 border border-lime-500 mr-3"><EditOutlined /></button>
          <button onClick={()=>{

            if(window.confirm('Bạn có chắc chắn muốn xóa ?'))
            {
              ///gọi action xóa
              dispatch(deleteMovieAction(film.maPhim))
            }
          }} className="w-10 h-10 border border-amber-800 mr-3" ><DeleteOutlined /></button>

          <button onClick={()=>{
            history.push(`/admin/showtime/${film.maPhim}`)
          }} className="w-10 h-10 border border-blue-800"><CalendarOutlined /></button>
        </div>
        },
      width:'20%'
    },
  ];
  const data = listMovie;
  const onChange = (pagination, filters, sorter, extra) => {
    // console.log('params', pagination, filters, sorter, extra);
  };
  return (
    <div>
      <h2>Quản lý Phim</h2>
      <Search
        placeholder="search movie"
        allowClear
        enterButton={<SearchOutlined />}
        size="large"
        onSearch={onSearch}
        className="mb-5"
      />
      <Button onClick={()=>{
        history.push('/admin/films/addnew')
      }} type="primary" shape="round" className="mb-5" icon={<PlusOutlined />}>Thêm Phim</Button>
      <Table className="text-center" columns={columns} dataSource={data} onChange={onChange} />
    </div>
  )
}
