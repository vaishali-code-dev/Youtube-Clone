import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { YOUTUBE_API_URL } from '../utils/constants';
import { setVideos } from '../utils/videoSlice';
import AddContainer from './AddContainer';
import VideoCards from './VideoCards';

const VedioContainer = () => {
    // const [vedios, setVedios] = useState([]);

    useEffect(() => {
        getVedios();
    }, [])

    const dispatch = useDispatch()
    const vedios = useSelector(store => store.video)

    const getVedios = async () => {
        const data = await fetch(YOUTUBE_API_URL);
        const jsonData = await data.json();
        // setVedios(jsonData.items)
        dispatch(setVideos(jsonData?.items))
    }

    return (
        <div className='flex flex-wrap'>
            <AddContainer info={vedios[0]} />
            {vedios?.map((item) => (
                <Link key={item.id} to={"/watch?v=" + item.id}> <VideoCards info={item} /> </Link>
            ))
            }
        </div>
    )
}

export default VedioContainer