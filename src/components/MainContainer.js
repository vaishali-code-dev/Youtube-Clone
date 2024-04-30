import React from 'react'
import ButtonList from './ButtonList'
import VedioContainer from './VedioContainer'

const MainContainer = () => {
    return (
        <div className='flex flex-col p-2'>
            <ButtonList />
            <VedioContainer />
        </div>
    )
}


export default MainContainer