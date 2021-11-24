import React,{useState,useEffect} from 'react'

function Footer() {
    const[inputText,setInputText]=useState('')
    return (
        <div className='footerContainer'>
            <div>
                <input 
                    value={inputText}
                    onChange={(e)=>setInputText(e.target.value)}
                    placeholder='Please Enter Something..'
                />
            </div>
        </div>
    )
}

export default Footer
