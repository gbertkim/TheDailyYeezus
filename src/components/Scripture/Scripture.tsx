import React from 'react'

interface Props {
    biblePassage: Array<any>
}

export const Scripture:React.FC<Props> = (props) => {
    const divStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '400px',
        paddingTop: '1rem',
        paddingLeft: '2rem',
        paddingRight: '2rem'
    }
    const book = props.biblePassage[0]?.bookname || null
    const chapterNum = props.biblePassage[0]?.chapter || null
    const verseNum = props.biblePassage[0]?.verse || null
    const passage = props.biblePassage[0]?.text.replace(/<b>/g, "").replace(/<\/b>/g, "") || null
    return (
        <div className='Scripture' style={divStyle}>
            <h3>{book} {chapterNum}:{verseNum}</h3>
            <p>{`${passage}`}</p>
        </div>
    )
}
