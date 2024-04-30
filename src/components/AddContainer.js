import React from 'react'
import VideoCards from './VideoCards';

const AddContainer = ({ info }) => {

    return (
        <div className='p-1 m-1 border border-red-700'>
            <VideoCards info={info} />
        </div>
    )
}

export default AddContainer 