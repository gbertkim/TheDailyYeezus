import React, {useState, useEffect} from 'react'
import './KanyeFace.css'
interface Props {
  mouthHeight: number,
  onClickPlayer: React.MouseEventHandler<SVGSVGElement>
}

export const KanyeFace: React.FC<Props> = (props) => {
  const [blinkStatus, setBlinkStatus] = useState('open')
  const BLINK_TIMER:number = 8000
  useEffect(()=> {
    setInterval(()=> {
        setTimeout(()=> {setBlinkStatus('mid')}, 250)
        setTimeout(()=> {setBlinkStatus('closed')}, 400)
        setTimeout(()=> {setBlinkStatus('open')}, 500)
    }, BLINK_TIMER)
    return () => clearInterval(BLINK_TIMER)
  }, [])
  return (
    <div id='container' tabIndex={1}>
          <svg onClick={props.onClickPlayer} width="232" height="394" viewBox="0 0 232 394" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="232" height="394" />
          <g id="Frame 1">
          <g id="Vector 2">
          <path id="face-outline" d="M9.75514 187.134C-21.0449 48.3339 60.9218 6.63388 105.755 3.13388C227.355 -1.66612 236.755 123.801 226.255 187.134C234 309.5 223 363 171 381.134C171 381.134 138.596 402.225 73.2551 381.134C-5.74486 355.634 3.42181 245.134 9.75514 187.134Z" fill="black" stroke="black" strokeWidth="5"/>
          <path id="face-skin" d="M179.755 40.6339C137.755 56.2339 64.5885 46.3005 34.2552 40.6339L9.75516 109.634V171.134L9.75517 196.134C-4.24483 295.634 18.7551 351.134 64.2552 347.134C63.7552 340.634 59.0552 315.934 64.2552 291.134C70.7552 260.134 120.755 265.134 127.255 263.134C133.755 261.134 157.755 271.634 169.255 278.634C178.455 284.234 179.589 334.467 179.755 351.134C200.955 349.534 223.255 331.634 225.755 278.634V191.634C233.355 114.834 196.089 52.1339 179.755 40.6339Z" fill="#B68263" stroke="black" strokeWidth="2.17077"/>
          <path id="around-mouth" d="M106.755 271.634C67.1551 281.234 67.5885 314.634 72.7551 330.134C109.955 371.334 153.922 346.301 171.255 328.634C171.255 271.634 143.422 278.634 127.255 271.634L116.255 274.134L106.755 271.634Z" fill="#B68263" stroke="black" strokeWidth="2.17077"/>
          <path id="nose" d="M121.755 174.634C125.922 190.967 136.255 224.434 144.255 227.634C154.255 231.634 155.255 250.634 151.255 252.634C147.255 254.634 133.255 241.134 116.255 256.134C109.755 251.967 94.3551 246.134 84.7551 256.134C80.7551 249.634 75.6551 234.834 87.2551 227.634" stroke="black" strokeWidth="2.17077"/>
          <path id="right-eye-closed" style={{'opacity': `${blinkStatus==='closed'? '100' : '0'}`}} className='closed' d="M189.5 182C179.167 184.833 154.4 188.8 138 182" stroke="black" strokeWidth="2"/>
          <path id="right-eye-mid" style={{'opacity': `${blinkStatus==='mid'? '100' : '0'}`}}  className='mid' d="M137 183.502C147.456 176.062 172.694 165.229 190 181.419C185.673 185.883 169.016 192.55 137 183.502Z" fill="white" stroke="black" strokeWidth="2.17077"/>
          <path id="right-eyeball-mid" style={{'opacity': `${blinkStatus==='mid'? '100' : '0'}`}}  className='mid' d="M177.255 180.134C177.255 187.59 170.987 188 163.255 188C155.523 188 149.255 187.59 149.255 180.134C149.255 175 155.523 174 163.255 174C170.987 174 177.255 172.678 177.255 180.134Z" fill="black"/>
          <path id="right-eye" style={{'opacity': `${blinkStatus==='open'? '100' : '0'}`}} d="M136.824 185.785C147.316 172.218 172.641 152.464 190.008 181.986C185.666 190.127 168.951 202.283 136.824 185.785Z" fill="white" stroke="black" strokeWidth="2.17077"/>
          <ellipse id="right-eyeball" style={{'opacity': `${blinkStatus==='open'? '100' : '0'}`}}cx="163.255" cy="180.134" rx="14" ry="13.5" fill="black"/>
          <path id="left-eye-closed" style={{'opacity': `${blinkStatus==='closed'? '100' : '0'}`}}  className='closed' d="M34.5 180.5C44.8333 183.333 69.6 187.3 86 180.5" stroke="black" strokeWidth="2"/>
          <path id="left-eye-mid" style={{'opacity': `${blinkStatus==='mid'? '100' : '0'}`}}  className='mid' d="M35 182.181C42.129 175.253 62.3097 165.553 86 182.181C77.5914 186.572 55.6194 192.72 35 182.181Z" fill="white" stroke="black" strokeWidth="2.17077"/>
          <path id="left-eyeball-mid" style={{'opacity': `${blinkStatus==='mid'? '100' : '0'}`}}  className='mid' d="M75.2552 182.134C75.2552 190.142 69.0081 188 61 188C52.9919 188 46.2552 188 46.2552 182.134C46.2552 174.126 50.4919 172.5 58.5 172.5C66.5081 172.5 75.2552 174.126 75.2552 182.134Z" fill="black"/>
          <path id="left-eye" style={{'opacity': `${blinkStatus==='open'? '100' : '0'}`}} d="M34.2552 185.785C41.3101 172.942 61.2812 154.96 84.7255 185.785C76.4042 193.926 54.6604 205.322 34.2552 185.785Z" fill="white" stroke="black" strokeWidth="2.17077"/>
          <path id="left-eyeball" style={{'opacity': `${blinkStatus==='open'? '100' : '0'}`}} d="M75.2552 182.134C75.2552 190.142 68.7633 196.634 60.7552 196.634C52.747 196.634 46.2552 190.142 46.2552 182.134C46.2552 174.126 49.9919 168.5 58 168.5C66.0081 168.5 75.2552 174.126 75.2552 182.134Z" fill="black"/>
          <path id="right-eyebrow" style={{'transform':`${props.mouthHeight > 2 ? 'rotate(-15deg)': 'rotate(0deg)'}`, 'transformBox':'fill-box', 'transformOrigin' : '50% 50%'}} d="M198.67 156.771C177.582 127.823 145.47 144.471 132.05 156.414L146.867 164.689C152.762 157.615 183.858 156.463 198.67 156.771Z" fill="black" stroke="black" strokeWidth="2.17077"/>
          <path id="left-eyebrow" style={{'transform':`${props.mouthHeight > 2 ? 'rotate(15deg)': 'rotate(0deg)'}`, 'transformBox':'fill-box', 'transformOrigin' : '50% 50%'}} d="M87.588 152.696C49.2952 128.829 26.2779 151.962 19.5558 166.512C27.7995 150.692 64.6086 158.269 81.9827 164.036L87.588 152.696Z" fill="black" stroke="black" strokeWidth="2.17077"/>
          <path viewBox='0 0 300 300' style={{'transform': 'scale(1, 1.3)', 'transformOrigin':'50% 50%', 'transformBox':'fill-box'}} id="inside-mouth"  d="M80 317.5C77.2 317.1 77.5 313 78 311C107.2 289 141.167 299.5 154.5 307.5C159.3 308.3 159.167 312.5 158.5 314.5C124.5 333 83.5 318 80 317.5Z" fill="black" stroke="black" strokeWidth="2"/>
          <path style={{'transform': `translateY(${props.mouthHeight}%)`}} id="lower-lip" d="M115.5 313.144C110.7 306.744 87.8333 312.81 77 316.644C121.8 338.244 151 323.31 160 313.144C137.5 302.644 130.5 311.144 125 313.144C120.6 314.744 116.833 313.81 115.5 313.144Z" fill="#A8816F" stroke="black" strokeWidth="2.17077" strokeLinejoin="round"/>
          <path style={{'transform': `translateY(-${props.mouthHeight/3}%)`}}id="upper-lip" d="M115.801 312.607C108.201 307.007 86.968 312.94 77.3013 316.607C73.8013 302.107 101.886 287.607 104.801 287.607C107.301 287.607 114.135 287.94 115.801 289.607H119.801C135.001 279.607 153.135 300.774 160.301 312.607C141.301 303.107 130.301 309.607 125.301 312.607C121.301 315.007 117.301 313.607 115.801 312.607Z" fill="#A8816F" stroke="black" strokeWidth="2.17077" strokeLinejoin="round"/>
          </g>
          </g>
          </svg>
      </div>
  )
}


