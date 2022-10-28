import React,{memo} from 'react'
import { Radio, Space, Tabs } from 'antd';
import moment from 'moment';
import history from '../../../App'
import { NavLink } from 'react-router-dom';
const { TabPane } = Tabs;
const tabPosition = 'left';
const borderStyle = {
    border: 'solid 1px rgb(224,13,122)',
    padding: '2px 4px',
    cursor: 'pointer'
}
function HomeMenu(props) {
    
    let {listCinestar} = props;
    const renderLogoCinestar = () =>{
        return listCinestar.map((item,index) => {
            return <TabPane tab={<img style={{width:50,height:50}} src={item.logo} alt={item.logo} />} key={index}>
            <Tabs  tabPosition={tabPosition}>
                {item.lstCumRap.map((cumrap,index) => {
                    return  <TabPane tab={
                    <div className="flex items-center">
                         <img style={{width:30,height:30}} src={item.logo} alt={item.logo} />
                         <p className="m-0 ml-2">{cumrap.tenCumRap}</p>
                    </div>
                } key={index}>
                {/* nội dung tabpain */}
                    {cumrap.danhSachPhim.slice(0,10).map((phim,index) => {
                        return <div key={index} className="flex items-center">
                            <img style={{width:60,height:60}} src={phim.hinhAnh} onError={(e) => (e.target.onerror = null, e.target.src ='https://picsum.photos/200')} alt={phim.hinhAnh} />
                            <div className="ml-3">
                                <h2 className="text-xl">{phim.tenPhim}</h2>
                                <ul className="grid grid-cols-5 gap-1">
                                    {phim.lstLichChieuTheoPhim.slice(0,5).map((time,index)=>{
                                        return <NavLink to ={`/checkout/${time.maLichChieu}`} key={index} style={borderStyle}>{moment(time.ngayChieuGioChieu).format('dd hh::mm A')}</NavLink>
                                    })}
                                </ul>
                            </div>
                        </div>
                    })}
                </TabPane>
                })}
               
            </Tabs>
        </TabPane>
        })
    }
    return (
        <Tabs  tabPosition={tabPosition}>
            {renderLogoCinestar()}
        </Tabs>
    )
}
export default memo(HomeMenu)