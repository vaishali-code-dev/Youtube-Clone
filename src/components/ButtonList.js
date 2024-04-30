import React from 'react'
import Button from './Button'

const ButtonList = () => {
    return (
        <div className='flex'>
            <Button name="ADD" />
            <Button name="GAMING" />
            <Button name="SONGS" />
            <Button name="LIVE" />
            <Button name="Soocer" />
            <Button name="Cricket" />
            <Button name="Cooking" />
            <Button name="Valentine's" />
        </div>
    )
}

export default ButtonList