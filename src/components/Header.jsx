import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className="header-container">
        <div className='header-wrap'>
            <div className='header-left-wrap'>
                <Link style={{display: 'flex', alignItems: 'center'}} to='/'>UMC MOVIE</Link>
                <ul>
                  <li><Link className='header-nav-item' to='/signup'>회원가입</Link></li>
                  <li><Link className='header-nav-item' to='/popular'>Popular</Link></li>
                  <li><Link className='header-nav-item' to='/nowplaying'>Now Playing</Link></li>
                  <li><Link className='header-nav-item' to='/toprated'>Top Rated</Link></li>
                  <li><Link className='header-nav-item' to='/upcoming'>UpComing</Link></li>
                </ul>
            </div>
        </div>
    </div>
  )
}
