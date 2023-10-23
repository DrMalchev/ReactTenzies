import React from 'react'

export default function Die(props) {
    //console.log(props)
    return (

        < div className='die' style={props.isHeld ? { backgroundColor: '#59E391' } : { backgroundColor: 'white' }} onClick={props.handleClick}>
            {props.value}

        </div >
    )
}