import React, { useEffect } from 'react'
import HomeMenu from './HomeMenu/HomeMenu'
import { useSelector, useDispatch } from 'react-redux'
import { getmovieAction } from '../../redux/action/MovieAction';
import { getInformationCinestar } from '../../redux/action/CinestarAction';
import HomeCarousel from '../../template/HomeTemplate/Layout/HomeCarousel/HomeCarousel';
import { NavLink } from 'react-router-dom';
import {history} from '../../App'
const textStyle = {
    maxWidth: '100%',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
}
export default function Home() {

    let { listMovie } = useSelector(state => state.MoviveReducer);

    ///Hệ thống cụm rạp
    let { listCinestar } = useSelector(state => state.CinestaReducer);

    let dispatch = useDispatch();
    const renderMovie = () => {
        return listMovie.map((movie, index) => {
            return <div key={index} className="max-w-xs p-6 rounded-md shadow-md dark:bg-gray-900 dark:text-gray-50">
                <img src={movie.hinhAnh} alt={movie.hinhAnh} className="object-cover object-center w-full rounded-md h-72 dark:bg-gray-500" />
                <div className="mt-6 mb-2">
                    <span className="block text-xs font-medium tracking-widest uppercase dark:text-violet-400">{movie.maPhim}</span>
                    <h2 className="text-xl font-semibold tracking-wide">{movie.tenPhim}</h2>
                </div>
                <p style={textStyle} className="dark:text-gray-100">{movie.moTa}</p>
                {/* <NavLink to={`/detail/${movie.maPhim}`} className="flex justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                        ĐẶT VÉ
                    </button>
                </NavLink> */}
                <div onClick={() => {
                    history.push(`detail/${movie.maPhim}`)
                }}  className="flex justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                        ĐẶT VÉ
                    </button>
                </div>
            </div>
        })
    }

    useEffect(() => {
        dispatch(getmovieAction)

        dispatch(getInformationCinestar())
    }, [])

    return (
        <div>
            <HomeCarousel />
            <div className="w-4/5 m-auto">
                {/* Home lich phim */}
                <div className="grid grid-cols-4 gap-3 mb-5">
                    {renderMovie()}
                </div>
                {/* HOme menu */}
                <div className="flex justify-center">
                    <HomeMenu listCinestar={listCinestar} />
                </div>
            </div>
        </div>
    )
}
