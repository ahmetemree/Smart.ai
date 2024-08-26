import { Link } from 'react-router-dom'
import './chatList.scss'

const ChatList = () => {
  return (
    <div className='chatList'>
        <span className='title'>Dashboard</span>
        <Link to="/dashboard">Create a new Chat</Link>
        <Link to="/">Explore SmartAI</Link>
        <Link to="/">Contact</Link>
        <hr/>
        <span className='title'>Recent Chats</span>
        <div className="list">
            <Link to="/">My Chat Title</Link>
            <Link to="/">My Chat Title</Link>
            <Link to="/">My Chat Title</Link>
            <Link to="/">My Chat Title</Link>
            <Link to="/">My Chat Title</Link>
            <Link to="/">My Chat Title</Link>
            <Link to="/">My Chat Title</Link>
            <Link to="/">My Chat Title</Link>
            <Link to="/">My Chat Title</Link>
            <Link to="/">My Chat Title</Link>
            <Link to="/">My Chat Title</Link>
            <Link to="/">My Chat Title</Link>
            <Link to="/">My Chat Title</Link>
            <Link to="/">My Chat Title</Link>
            <Link to="/">My Chat Title</Link>
            <Link to="/">My Chat Title</Link>
            <Link to="/">My Chat Title</Link>
            <Link to="/">My Chat Title</Link>
            <Link to="/">My Chat Title</Link>
            <Link to="/">My Chat Title</Link>
            <Link to="/">My Chat Title</Link>
            <Link to="/">My Chat Title</Link>
            <Link to="/">My Chat Title</Link>
        </div>
        <hr/>
        <div className="upgrade">
            <img src="/logo2.png" alt="" />
            <div className="texts">
                <span>Upgrade Pro Version</span>
                <span>Get unlimited acess to all features</span>
            </div>
        </div>
    </div>
  )
}

export default ChatList