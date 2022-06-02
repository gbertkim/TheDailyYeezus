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
            height: '100vh',
            width: '100%',
            backgroundColor: '#f88b52',
            position: 'absolute',
            zIndex: props.hideStart ? 0 : 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <h1 style={{color: 'black', fontSize: '1.5rem'}}>THE DAILY YEEZUS</h1>
        {!props.loading ? 
            <button id='start' onClick={props.onClickStart} style={{ backgroundColor: 'transparent', border: 'none', fontSize: '2rem' }}>START</button>
            : <div>loading may take a moment...</div>}
    </div>
  )
}
