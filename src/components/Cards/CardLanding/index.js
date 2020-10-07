import React from 'react'
import './styles.css'

export default ({image, text1, text2}) => {

    return(

        <div className='card-landing'>
            <img className ='card-landing-image' src={image} alt=""/>
            <p className='card-landing-text1'>{text1}</p>
            <p className='card-landing-text2'>{text2}</p>
        </div>
    )
}