import { NavHashLink as NavLink } from 'react-router-hash-link';
import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import './Header.css';
import Loading from '../Loading/Loading';
import { AiOutlinePlus } from 'react-icons/ai';
import { GrMenu } from 'react-icons/gr';
import unset from '../../../images/Avatar/avatar.png'
import { Button, } from '@mui/material';

const Header = () => {
  const navigate = useNavigate()
  const [navShow, setNavShow] = useState(false)
  const [userShow, setUserShow] = useState(false)
  const [user, loading] = useAuthState(auth)
  const [hour, setHour] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')
  const date = new Date().toDateString()
  setInterval(() => {
    setHour(new Date().getHours())
    setMin(new Date().getMinutes())
    setSec(new Date().getSeconds())
  }, 1000)
  if (loading) {
    return <Loading />
  }
  const logout = () => {
    signOut(auth);
  };
  // background: #e0ffff;
  // color: #0808a9;
  return (
    <header>
      <div className="res-icon">
        <button onClick={() => setNavShow(!navShow)}><GrMenu style={{ fontSize: '20px' }} /></button>
      </div>
      <nav className={`${navShow ? `navshow` : `navhide`}`}>
        <div className='nav-content'>
          <NavLink to={'/#'}>Home</NavLink>
          <NavLink to={'/home/#sampleproducts'}>Sample</NavLink>
          <NavLink to={'/home/#dashboard'}>Dashboard</NavLink>
        </div>
        <div className="time">
          <h4>
            <span>{hour < 10 ? `0${hour}` : hour}</span>:
            <span>{min < 10 ? `0${min}` : min}</span>:
            <span>{sec < 10 ? `0${sec}` : sec}</span>
          </h4>
          <h5>{date}</h5>
        </div>
        <div className="user">
          {
            user ? <>
              <h4><Button variant='contained' onClick={() => navigate('/additem')} startIcon={<AiOutlinePlus />}> Add Item</Button></h4>
              <h4><NavLink to={'/manageinventories'}>Inventorys</NavLink></h4>
              <h4><NavLink to={'/myitem'}>My Item</NavLink></h4>
              <div className="user-details">
                <div className='user-img'>
                  <img src={user?.photoURL || unset} alt="Profile" onClick={() => setUserShow(!userShow)} />
                  <div className={`user-info ${userShow ? 'show' : 'hide'}`}>
                    <h4 style={{ marginBottom: '10px', color: '#2C6AE5' }}>{user?.displayName || "USER"}</h4>
                    <h3><Button variant='contained' onClick={logout}>Logout</Button></h3>
                  </div>
                </div>
              </div>
            </> : <>
              <h4><NavLink to={'/login'}>Login</NavLink></h4>
              <h4><NavLink style={{ backgroundColor: '#2C6AE5', color: '#fff' }} to={'/Register'}>Sign Up</NavLink></h4>
            </>
          }
        </div>
      </nav>
    </header>
  );
};

export default Header;