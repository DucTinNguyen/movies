import React, { useEffect } from 'react'
import { CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { Rate, Tabs } from 'antd'
import { getmovieAction } from '../../redux/action/MovieAction'
import '../../assets/styles/circle.css'
import { getInforMovieAction } from '../../redux/action/CinestarAction'
import { NavLink } from 'react-router-dom'




const { TabPane } = Tabs;
const TabPosition = 'left';
const borderStyle = {
    border: 'solid 1px rgb(224,13,122)',
    padding: '2px 4px',
    textAlign: 'center',
    cursor: 'pointer'
}
export default function Detail(props) {
    let { filmDetail } = useSelector(state => state.CinestaReducer)
    console.log(filmDetail)
    let dispatch = useDispatch();
    useEffect(() => {
        let { id } = props.match.params;

        dispatch(getInforMovieAction(id))
    }
        , [])

    return (
        <div style={{ backgroundImage: `url(${filmDetail.hinhAnh})`, backgroundSize: '100%', backgroundPosition: 'center', minHeight: '100vh' }}>
            <CustomCard
                style={{ paddingTop: '150px', minHeight: '100vh' }}
                effectColor="#fff" // required
                color="#fff" // default color is white
                blur={10} // default blur value is 10px
                borderRadius={0} // default border radius value is 10px
            >

                <div className="grid grid-cols-12">
                    <div className="col-span-5 col-start-3">
                        <div className="grid grid-cols-3">
                            <img className="col-span-1" src={filmDetail.hinhAnh} style={{ width: '100%', height: 300 }} alt="123" />
                            <div className="col-span-2 ml-5" style={{ marginTop: '25%' }}>
                                <p className="text-sm">Ngày chiếu: {moment(filmDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
                                <p className="text-4xl ">{filmDetail.tenPhim}</p>
                                <p>{filmDetail.moTa}</p>
                            </div>
                        </div>

                    </div>

                    <div className="col-span-4">
                        <h1 style={{ marginLeft: '15%', color: 'yellow', fontWeight: 'bold', fontSize: 15 }}>Đánh giá</h1>
                        <h1 style={{ marginLeft: '5%' }} className="text-green-400 text-2xl"><Rate allowHalf value={filmDetail.danhGia / 2} style={{ color: '#78ed78', fontSize: 30 }} /></h1>
                        <div className={`c100 p${filmDetail.danhGia * 10} big`}>
                            <span className="text-white">
                                {filmDetail.danhGia * 10}%
                            </span>
                            <div className="slice">
                                <div className="bar"></div>
                                <div className="fill"></div>

                            </div>

                        </div>
                        <br />

                    </div>
                </div>

                <div className="mt-20 ml-72 w-2/3 bg-white px-5 py-5">
                    <Tabs defaultActiveKey="1" centered style={{ minHeight: 300 }}>
                        <TabPane tab="Lịch chiếu" key="1">
                            <div >
                                <Tabs tabPosition={TabPosition}>

                                    {filmDetail.heThongRapChieu?.map((film, index) => {
                                        return <TabPane tab={
                                            <div className="flex items-center">
                                                <img style={{ width: '50px', height: '50px', marginRight: '4px' }} src={film.logo} alt={film.logo} />
                                                {film.tenHeThongRap}
                                            </div>
                                        } key={index}>
                                            {/* Hiển thị thông tin */}
                                            {film.cumRapChieu?.map((cumRap, index) => {
                                                return <div  key={index}>
                                                    <div className="flex flex-row ">
                                                        <img style={{ width: '50px', height: '50px', marginRight: 4 }} src={cumRap.hinhAnh} alt={cumRap.hinhAnh} />
                                                        <div>
                                                            <h2>{cumRap.tenCumRap}</h2>
                                                            <span>{cumRap.diaChi}</span>
                                                        </div>
                                                    </div>

                                                    <ul className="grid grid-cols-5 gap-1 mt-2">
                                                        {cumRap.lichChieuPhim.slice(0, 5).map((time, index) => {
                                                            return <NavLink to={`/checkout/${time.maLichChieu}`} style={borderStyle} key={index}>{moment(time.ngayChieuGioChieu).format('dd hh:mm A')}</NavLink>
                                                        })}
                                                    </ul>
                                                </div>
                                            })}
                                        </TabPane>
                                    })
                                    }
                                </Tabs>
                            </div>

                        </TabPane>
                        <TabPane tab="Thông tin" key="2">
                            Thông tin
                        </TabPane>
                        <TabPane tab="Đánh giá" key="3">
                            Đánh giá
                        </TabPane>
                    </Tabs>
                </div>





            </CustomCard>
        </div>
    )
}
