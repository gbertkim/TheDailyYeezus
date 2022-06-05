import React, { useEffect } from 'react'
import './About.css'

interface Props {
    aboutToggle:Boolean,
    aboutToggleHandler:any
}
export const About:React.FC<Props> = (props) => {
    useEffect(() => {

    })
    return (
    props.aboutToggle === false ? <></> :
    <div className='About'
        style={{
            zIndex: '101',
            backgroundColor: 'black',
            height: '100%',
            minHeight: '100%',
            width: '100%',
            position: 'absolute',
            top: '0',
            left: '0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        <div className='aboutWrapper' 
            style={{
                zIndex: '102',
                width: '100%',
                maxWidth: '800px',
                minHeight: '100%',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <button
                id='closeButton'
                style={{
                    position: 'absolute',
                    top: '1.5rem',
                    right: '2rem',
                    fontSize: '1.5rem',
                }}
                onClick={props.aboutToggleHandler}
            >
                X
            </button>
            <p className='aboutP'>
                Hello World, I built this app as a portfolio builder and to learn TypeScript.
                I am a big fan of Yeezus and thought this app would be funny.
                I used a proxy because I was having CORS issues with uberduck api.
                Check out my <a href='https://gbertkim.github.io/portfolio/' target="_blank" rel="noopener noreferrer">portfolio</a> and reach 
                out if you're looking to hire a front-end coder!
            </p>
            <br></br>
            <p className='aboutP'>
                If you'd like to support, <a href='https://ko-fi.com/gbertkim' target="_blank" rel="noopener noreferrer">I love coffee!</a>
            </p>
        </div>
    </div>
  )
}
