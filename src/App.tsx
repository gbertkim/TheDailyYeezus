import React, { useState, useEffect, useRef } from 'react'
import { KanyeFace } from './components/KanyeFace/KanyeFace'
import { StartPage } from './components/StartPage/StartPage'
import { Scripture } from './components/Scripture/Scripture'
import { About } from './components/About/About'
import './App.css'

function App():JSX.Element {
  const [voice, setVoice] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [hideStart, setHideStart] = useState<boolean>(false)
  const [biblePassage, setBiblePassage] = useState<never[]>([])
  const [mouthHeight, setMouthHeight] = useState<number>(0)
  const [blinkStatus, setBlinkStatus] = useState<string>('closed')
  const [error, setError] = useState<string>('')
  const [aboutToggle, setAboutToggle] = useState<boolean>(false)
  const audioPlayerRef = useRef<HTMLAudioElement>(null)
  
  useEffect(() => {
    if(error) {
      throw new Error(error);
    }
  },[error])


  ///////////////FETCH FUNCTIONS///////////////////
  const fetchAndLoadAudio= async () : Promise<any> => {
    try {
      const verse = await fetchVerse()
      const uuid = await fetchVoiceUUID(verse)
      const waveUrl = await fetchWaveUrl(uuid, 0)
      return Promise.resolve(waveUrl)
    } catch (e:any) {
      console.log(e.message)
      setError(e.message)
    }
  }
  
  const fetchVerse = async () : Promise<any> => {
    try {
      const fetchBible = await fetch('https://labs.bible.org/api/?passage=random&type=json')
      const bibleJson = await fetchBible.json()
      setBiblePassage(bibleJson)
      let verse:string = bibleJson[0].text
      verse = verse.replace(/<b>/g, "")
      verse = verse.replace(/<\/b>/g, "")
      return (Promise.resolve(verse))
    } catch (e: any) {
      console.log(e)
      setError('Fetch Failed at Bible API')
    }
  }
  const fetchVoiceUUID = async (verse: string) : Promise<any> => {
    try {
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Basic cHViX21vbWR2Y2N3bndka2dvYXpsaTpwa19jMDFlNWVkMi0wMGQ4LTRmMjMtYjBmZC0zMTMyOGFjZmU3NTc='
        },
        body: JSON.stringify({voice: 'kanye-west-rap', pace: 1, speech: verse})
      }
      const response = await fetch('https://rocky-plateau-32639.herokuapp.com/https://api.uberduck.ai/speak', options)
      const resJson = await response.json()
      const uuid = resJson.uuid
      return Promise.resolve(uuid)
    } catch (e:any) {
      console.log(e)
      setError('Fetch Failed at Uberduck Speak')
    }
  }
  const fetchWaveUrl = async (uuid:string, tryCounter: number) : Promise<any>  => {
    const wait = (delay:number) => {
      return new Promise((resolve) => setTimeout(resolve, delay));
    }
    try {
      let numberOfTries = tryCounter
      const options = {method: 'GET', headers: {Accept: 'application/json'}};
      const response = await fetch(`https://rocky-plateau-32639.herokuapp.com/https://api.uberduck.ai/speak-status?uuid=${uuid}`, options)
      const resJson = await response.json()
      if (numberOfTries === 10) {
        setLoading(false)
        return Promise.reject(Error('Too Many Fetch Retries'))
      } 
      if (resJson.path !== null) {
        setVoice(`https://rocky-plateau-32639.herokuapp.com/${resJson.path}`)
        setLoading(false)
        setHideStart(true)
        return Promise.resolve(resJson.path.toString())
      } else {
        return wait(3000).then(() => fetchWaveUrl(uuid, numberOfTries + 1))
      }
    } catch (e:any) {
      console.log(e)
      setError('Fetch Failed at Uberduck UUID')
    }
  }

  ///////////////CONTEXT, ANALYSER, KANYE ANIMATION///////////////////
  const resumeContext = async (context:any) : Promise<void> => {
    if (context.state === 'suspended') {
      await context.resume()
    }
  }



  const setupContextAndAnalyser = () => {
    let context = new AudioContext()
    let analyserNode = new AnalyserNode(context, { fftSize: 32 })
    if (audioPlayerRef.current) {
      const source:MediaElementAudioSourceNode = context.createMediaElementSource(audioPlayerRef.current)
      source
      .connect(analyserNode)
      .connect(context.destination) 
    }
    const animateKanye = () :void => {
      requestAnimationFrame(animateKanye)
      if(audioPlayerRef.current) {
        audioPlayerRef.current.onended = () => {
          setMouthHeight(0)
        }
      }
      // const bufferLength = analyserNode.frequencyBinCount
      const bufferLength:number = 1
      const dataArray:Uint8Array = new Uint8Array(bufferLength)
      analyserNode.getByteFrequencyData(dataArray)
      dataArray.forEach((item, index) => {
        let volumePercentage:number = ((item/255 -.8)/.5) * 100
        setMouthHeight(Math.max(0, volumePercentage/15))
      })
    }
    animateKanye()
    return context
  }

  ///////////////ON CLICK FUNCTIONS///////////////////
  const onClickPlayer = async (e:any) : Promise<void> => {
    e.preventDefault()
    setTimeout(()=> {setBlinkStatus('mid')}, 250)
    setTimeout(()=> {setBlinkStatus('open')}, 500)
    if (audioPlayerRef.current) {
      audioPlayerRef.current.play()
    }
  }

  const onClickStart = async (e:any) : Promise<void> => {
    e.preventDefault()
    let context = setupContextAndAnalyser()
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause()
    }
    setLoading(true)
    setHideStart(false)
    await fetchAndLoadAudio()
    if (audioPlayerRef.current) {
      resumeContext(context)
      audioPlayerRef.current.load()
    }
  }

  const onClickNewVerse = async (e:any) : Promise<void> => {
    e.preventDefault()
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause()
    }
    setLoading(true)
    setHideStart(false)
    await fetchAndLoadAudio()
    if (audioPlayerRef.current) {
      audioPlayerRef.current.load()
    }
  }

  const onAboutClick = (e:any) : void => {
    e.preventDefault()
    console.log('hello')
    setAboutToggle(!aboutToggle)
  }
  
  ///////////////ON ENDED AUDIO PLAYER///////////////////
  const audioEnded = () => {
    setBlinkStatus('closed')
  }

  return (
    <div className="App">
      <h1 style={{textDecoration: 'underline'}}>THE DAILY YEEZUS</h1>
      <StartPage onClickStart={onClickStart} loading={loading} hideStart={hideStart}/>
      <audio src={voice} ref={audioPlayerRef} crossOrigin='anonymous' onEnded={audioEnded}></audio>
      <div className='wrapper' style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <p style={{marginTop: '.5rem'}}>"Click Yeezus"</p>
        <KanyeFace blinkStatus={blinkStatus} mouthHeight={mouthHeight} onClickPlayer={onClickPlayer}/>
        <Scripture biblePassage={biblePassage}/>
        <button id='newVerse' style={{marginTop: '1rem', color: 'white', textDecoration: 'underline', textTransform: 'uppercase', fontSize: '1rem', fontWeight: 'bold'}} 
          onClick={onClickNewVerse}
        >
          new verse
        </button>
      </div>
      <button id='aboutButton' onClick={onAboutClick} style={{position: 'absolute', top: '.5rem', right: '1.5rem', fontSize: '1.5rem', zIndex: '101'}}>About</button>
      <About aboutToggle={aboutToggle} aboutToggleHandler={onAboutClick}/>
    </div>
  ); 
}


export default App;
