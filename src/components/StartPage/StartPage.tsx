import React from 'react'
import './StartPage.css'

interface Props {
    onClickStart: React.MouseEventHandler<HTMLButtonElement> | undefined,
    loading: boolean,
    hideStart: boolean,
}
export const StartPage:React.FC<Props> = (props) => {
  return (
    props.hideStart ? <></> : 
    <div className='StartPage'
        style = {{ 
            height: '100%',
            minHeight: '100%',
            width: '100%',
            backgroundColor: '#f88b52',
            position: 'absolute',
            top: '0',
            left: '0',
            zIndex: props.hideStart ? 0 : 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <h1 style={{color: 'black', fontSize: '1.5rem'}}>THE DAILY YEEZUS</h1>
        {!props.loading ? 
            <button id='start' onClick={props.onClickStart} style={{ border: '2px solid white', padding: '.5rem', fontSize: '2rem' }}>START</button>
            : <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <p>creating audio file...</p>
                <div className="lds-heart"><div></div></div>
              </div>}
    </div>
  )
}
