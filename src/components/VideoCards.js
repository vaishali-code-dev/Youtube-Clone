import React from 'react'

const VideoCards = ({ info }) => {
    // console.warn(info)
    // const { snippet, statistics } = info;
    // const { channelTitle, title, thumbnails } = snippet;

    return (
        <div className='p-2 m-2 w-72 h-76 shadow-md'>
            <img className='rounded-lg' alt="thumbnail" src={info?.snippet?.thumbnails?.medium?.url} />
            <ul>
                <li className='font-bold py-2'>{info?.snippet?.title}</li>
                <li>{info?.snippet?.channelTitle}</li>
                <li>{info?.statistics?.viewCount}</li>
            </ul>
        </div>
    )
}

export default VideoCards