import React, { useEffect, memo, Fragment } from 'react'
import style from './Checkout.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { bookTicketAction, getRoomTicketAction } from '../../redux/action/TicketAction';
import './Checkout.css'
import { BOOK_TICKET } from '../../redux/type/TicketType';
import { Thongtindatve } from '../../model/Thongtindatve';
import _ from 'lodash';
function Checkout(props) {


  //lấy thông tin người dùng(sau khi đã đăng nhập)
  let { userLogin } = useSelector(state => state.UserReducer);
  let { ticket, danhSachGheDangDat,danhSachGheNguoiKhacDat} = useSelector(state => state.TicketManagerReducer);

  // console.log(thongTinPhim,danhSachGhe);
  let dispatch = useDispatch();

  useEffect(() => {
    let { id } = props.match.params;
    // console.log(id)
    let action = getRoomTicketAction(id)
    dispatch(action)
  }, [])

  let { thongTinPhim, danhSachGhe } = ticket;
  const renderSeat = () => {
    return danhSachGhe?.map((ghe, index) => {

      let classgheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '';
      let classgheDaDat = ghe.daDat ? 'gheDaDuocDat' : '';

      let classGheDangDuocChon = '';
      let classGheDaDuocDat = '';
      // 
      if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheDaDuocDat = 'gheDaDuocDat'
      }
      //Tìm ghê có đang được đặt không
      let indexDD = danhSachGheDangDat.findIndex(gheDD => gheDD.maGhe === ghe.maGhe);
      if (indexDD != -1) {
        classGheDangDuocChon = 'gheDangDat';
      }
      //Kiểm tra ghế có trùng với ghế người khác đặt không
      let classGheNKD = '';
      console.log(danhSachGheNguoiKhacDat);
      console.log(danhSachGhe)
      let indexKD = danhSachGheNguoiKhacDat.findIndex(gheNK => gheNK.maGhe === ghe.maGhe);
      if(indexKD !== -1){
        classGheNKD = 'gheNKDat'
      }
      return <Fragment key={index}>
        <button onClick={() => {

          dispatch({
            type: BOOK_TICKET,
            ghe: ghe
          })

        }} className={`ghe ${classgheVip} ${classGheDangDuocChon} ${classGheDaDuocDat} ${classGheNKD}`}>{ghe.tenGhe}</button>
      </Fragment>
    })
  }

  return (
    <div className="px-10">
      <div className="grid grid-cols-12 min-h-screen py-10">
        <div className="col-span-8">
          <div className="flex flex-col items-center">
            <div className='w-4/5 bg-black' style={{ border: 'solid 2px #000' }}></div>
            <div className={`${style['trapezoid']}`}>
              <span className="block text-center mt-3">Màn hình đặt vé</span>
            </div>
            {/* render ghế */}
            <div className="grid grid-cols-12 gap-1 w-4/5 text-center px-3 mt-2">
              {renderSeat()}
            </div>
          </div>

        </div>
        <div className="col-span-4 shadow-lg px-5 relative">
          <h1 className="text-green-400 py-3 text-2xl text-center">
            {danhSachGheDangDat?.reduce((totalMoney, ghe) => {
              return totalMoney += ghe.giaVe;;
            }, 0).toLocaleString()}đ
          </h1>
          <hr />
          <div className="py-3">
            {
              thongTinPhim ? <><h3 className="text-xl font-bold">{thongTinPhim.tenPhim}</h3>
                <p className="m-0 font-medium">Địa điểm: {thongTinPhim.tenCumRap} - {thongTinPhim.tenRap}</p>
                <p className="font-medium">Ngày chiếu: {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}</p></>
                : ''}

          </div>

          <hr />
          <div className="flex justify-between font-bold py-3 items-center">
            <span className="text-lg text-red-500">Ghế: {_.sortBy(danhSachGheDangDat, ['stt']).map((ghe, index) => {
              return <span key={index}>{ghe.stt} - </span>
            })}</span>
            <span className="text-lg text-green-500">0đ</span>
          </div>
          <hr />
          <div className="py-3">
            <p className="m-0 text-blue-500 font-bold text-lg">Email</p>
            <span>{userLogin.email}</span>
          </div>
          <hr />
          <div className="py-3">
            <p className="m-0 font-bold text-lg">Phone</p>
            <span>{userLogin.soDT}</span>
          </div>
          {/* Bảng hiển thị thông tin chi tiết vé */}

          <div>
            <h2 className="text-xl text-center font-bold">Thông tin chi viết đặt vé</h2>
            <table class="table-fixed text-center">
              <thead>
                <tr>
                  <th>Ghế thường</th>
                  <th>Ghế VIP</th>
                  <th>Ghế đang chọn</th>
                  <th>Ghế đã đặt</th>
                  <th>Ghế NK đã đặt</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><button className='ghe'></button></td>
                  <td><button className='ghe gheVip'></button></td>
                  <td><button className='ghe gheDangDat'></button></td>
                  <td><button className='ghe gheDaDuocDat'></button></td>
                  <td><button className='ghe gheNKDat'></button></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/*  */}
          <div className='absolute w-full' style={{ bottom: 0 }}>
            <button onClick={() => {
              let thongtindatve = new Thongtindatve();
              thongtindatve.maLichChieu = props.match.params.id;
              thongtindatve.danhSachVe = danhSachGheDangDat;

              let action = bookTicketAction(thongtindatve);
              dispatch(action);

              dispatch(getRoomTicketAction(thongtindatve.maLichChieu))

            }} type="button" className="w-full px-8 py-3 font-semibold rounded bg-gray-800 text-white">Đặt vé</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default memo(Checkout)