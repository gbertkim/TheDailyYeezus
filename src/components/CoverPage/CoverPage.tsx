import React from 'react'
import './CoverPage.css'

interface Props {
    onClickPlayer: React.MouseEventHandler<HTMLInputElement>;
}

export const CoverPage:React.FC<Props>= (props) => {
  return (
    <input type ='button' value="Play" onClick = {props.onClickPlayer}/>
  )
}
