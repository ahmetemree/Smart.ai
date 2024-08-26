import { useEffect, useRef } from 'react';
import './newPrompt.scss'

const NewPrompt = () => {
    const endRef = useRef(null)

    useEffect(()=>{
      endRef.current.scrollIntoView({behaviour:"smooth"});
    },[])
  return (
    <div className='newPrompt'>
        <div className="endChat" ref={endRef}></div>
        <form action="" className='newForm'>
            <label htmlFor="file">
                <img src="/attachment.png" alt="" />
            </label>
            <input id="file" type="file" multiple={false} hidden/>
            <input type="text" placeholder='Ask me anything...'/>
            <button>
                <img src="/arrow.png" alt="" />
            </button>
        </form>
    </div>
  )
}

export default NewPrompt