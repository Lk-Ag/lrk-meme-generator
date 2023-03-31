import React from 'react';
export default function Meme(){

    const[meme,setMeme]= React.useState({
        topText:"",
        bottomText:"",
        randomImage:"https://i.imgflip.com/21tqf4.jpg"
    })
    const [allMemes,setAllMemes]=React.useState([])

    React.useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemes(data.data.memes))
    },[])

    function getMemeImage(){
        const randomNumber = Math.floor(Math.random()*allMemes.length)
        const url=allMemes[randomNumber].url
        setMeme(prevMeme=>({
            ...prevMeme,
            randomImage:url
        }))
    }
    function handleChange(event){
        const {name,value}=event.target;
        setMeme(prevMeme =>({
            ...prevMeme,
            [name]:value
        }))
    }

    return(
        <div id="Meme">
            <input className="input" 
                   type="text" 
                   placeholder="Top Text" 
                   name="topText" 
                   value={meme.topText} 
                   onChange={handleChange} >

            </input>
            <input className="input" 
                   type="text" 
                   placeholder="Bottom Text" 
                   name="bottomText" 
                   value={meme.bottomText} 
                   onChange={handleChange}>

             </input>

            <button id="meme-btn" onClick={getMemeImage}>Get a new meme image</button>

           <div id="meme-container">
                <img id="meme-img" src={meme.randomImage} alt="Meme"/>
                <h2 className='meme-text top' >{meme.topText}</h2>
                <h2 className='meme-text bottom'>{meme.bottomText}</h2>

           </div>
        </div>
    )
}