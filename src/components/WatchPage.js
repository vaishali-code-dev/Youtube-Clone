import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom';
import { closeMenu } from '../utils/appSlice';
import Comments from './Comments';

const WatchPage = () => {
    const [seachParams] = useSearchParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(closeMenu());
    }, [])

    return (
        <div className='px-5'>
            <iframe
                width="900"
                height="400"
                src={"https://www.youtube.com/embed/" + seachParams.get("v")}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen>
            </iframe>

            <Comments />
        </div>
    )
}

export default WatchPage