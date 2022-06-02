import React, { useState, useEffect, useRef } from 'react'
import { KanyeFace } from './components/KanyeFace/KanyeFace'
import { StartPage } from './components/StartPage/StartPage'
import { Scripture } from './components/Scripture/Scripture'
import './App.css'

function App():JSX.Element {
  const [voice, setVoice] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [hideStart, setHideStart] = useState<boolean>(false)
  const [biblePassage, setBiblePassage] = useState<never[]>([])
  const [mouthHeight, setMouthHeight] = useState<number>(0)
  const audioPlayerRef = useRef<HTMLAudioElement>(null)

  const fetchAndLoadAudio:() => Promise<any> = async () => {
    try {
      const fetchVerse = await fetch('https://labs.bible.org/api/?passage=random&type=json')
      const bibleJson = await fetchVerse.json()
      setBiblePassage(bibleJson)
      const verse:string = bibleJson[0].text
      const uuid = await fetchVoiceUUID(verse)
      const waveUrl = await fetchWaveUrl(uuid, 0)
      return Promise.resolve(waveUrl)
    } catch (e) {
      console.log(e)
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
    } catch (e) {
      console.log(e)
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
        return Promise.reject(Error('Too Many Tries'))
      } 
      if (resJson.path !== null) {
        console.log(resJson.path)
        setVoice(`https://rocky-plateau-32639.herokuapp.com/${resJson.path}`)
        setLoading(false)
        setHideStart(true)
        return Promise.resolve(resJson.path.toString())
      } else {
        return wait(3000).then(() => fetchWaveUrl(uuid, numberOfTries + 1))
      }
    } catch (e) {
      console.log(e)
    }
  }

  const setupContext = async (context:any) : Promise<void> => {
    if (context.state === 'suspended') {
      await context.resume()
    }
  }

  const onClickPlayer = async (e:any) : Promise<void> => {
    e.preventDefault()
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause()
      audioPlayerRef.current.load()
      audioPlayerRef.current.play()
    }
  }

  const onClickStart = async (e:any) : Promise<void> => {
    let context = new AudioContext()
    let analyserNode = new AnalyserNode(context, { fftSize: 32 })
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
    if (audioPlayerRef.current) {
      const source:MediaElementAudioSourceNode = context.createMediaElementSource(audioPlayerRef.current)
      source
      .connect(analyserNode)
      .connect(context.destination) 
    }
    animateKanye()
    e.preventDefault()
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause()
    }
    setLoading(true)
    setHideStart(false)
    await fetchAndLoadAudio()
    if (audioPlayerRef.current) {
      setupContext(context)
      audioPlayerRef.current.load()
    }
  }

  const newVerse = async (e:any) : Promise<void> => {
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

  return (
    <div className="App">
      <h1 style={{textDecoration: 'underline'}}>THE DAILY YEEZUS</h1>
      <StartPage onClickStart={onClickStart} loading={loading} hideStart={hideStart}/>
      <audio src={voice} ref={audioPlayerRef} crossOrigin='anonymous'></audio>
      <div className='wrapper' style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <p style={{marginTop: '.5rem'}}>"Click Yeezus"</p>
        <KanyeFace mouthHeight={mouthHeight} onClickPlayer={onClickPlayer}/>
        <Scripture biblePassage={biblePassage}/>
        <button style={{marginTop: '1rem', color: 'white', textDecoration: 'underline', textTransform: 'uppercase',}} 
          onClick={newVerse}
        >
          new verse
        </button>
      </div>
    </div>
  ); 
}


export default App;
