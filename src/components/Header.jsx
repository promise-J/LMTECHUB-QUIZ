import React, { useRef, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { MdClose } from 'react-icons/md'
import logo from '/logo.png'
import profilePic from '/profile-pic.jpeg'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useUserContext } from '../context/Usercontext'
import { toast } from 'react-toastify'

const Header = () => {
    const navigate = useNavigate()
    const [showSidebar, setShowSidebar] = useState(false)
    const [selectedTab, setSelectedTab] = useState(0)
    const menuContent = useRef()
    const { user, setUser } = useUserContext();
    const {pathname} = useLocation()


    const itemList = [
        {
            name: 'Home',
            link: '/'
        },
        {
            name: 'Get Started',
            link: '/login'
        }
    ]
    const loggedInItems = [
        {
            name: 'Home',
            link: '/dashboard',
            action: null
        },
        {
            name: 'View Quiz',
            link: '/dashboard/viewquiz',
            action: null
        }
    ]

    function handleLogout() {
        setUser(null);
        localStorage.removeItem("x-token");
        navigate("/");
        toast.success("Logged out successfully", {autoClose: 2000});
      };

    function authStateList(){
        let result = user ? loggedInItems : itemList
        return result
    }


    const handleMenuOpen = (e)=>{
        if(e.target != menuContent.current){
            setShowSidebar(false)
        }
    }

    const handleClose = ()=>{
        setShowSidebar(false)
    }

  return (
    <div className='flex md:px-5 justify-between items-center pb-3 p-3 relative'>
    <Link style={{textDecoration: 'none', color: 'inherit'}} to={user ? '/dashboard' : '/'}><img src={logo} className='w-[40px]' alt="" /></Link>
    <div className='md:flex hidden p-3 h-full flex gap-10 me-5'>
       {
                authStateList().map((i, id)=>(
                    <Link className={`header_link ${i.link == pathname && 'header_active_link'}`} style={{textDecoration: 'none', color: 'inherit', position: 'relative'}} to={i.link && i.link} key={id}>
                        {i.name}
                    </Link>
                ))
        }
        {
            user &&
            <div className='relative user-profile'>
               <img title='Profile' src={user?.avatar || profilePic} alt="profile image" className='h-10 rounded-3xl cursor-pointer' />
                <div className='profile-pop w-[120px] bg-transparent absolute top-110 left-[-90%] gap-2 items-center flex flex-col p-3 shadow-md'>
                    <span onClick={()=> navigate('/dashboard/profile')} className='cursor-pointer hover:font-bold'>Profile</span>
                    <span onClick={handleLogout} className='cursor-pointer hover:font-bold'>Logout</span>
                </div>
            </div>
        }
    </div>
    <AiOutlineMenu onClick={()=> setShowSidebar(true)} className='cursor-pointer md:hidden' size={23} />
    
    <div onClick={(e)=> handleMenuOpen(e)} className={`menu-container fixed top-0 bg-gray-400 top-0 ${!showSidebar && 'hidden'} right-0 w-full h-[100vh] flex justify-end z-10`}>
        <div ref={menuContent} className='w-[67%] personal-animate menu-inner-container p-3'>
            <MdClose className='absolute right-10 top-10' size={26} color='white' onClick={handleClose} />
            {
                <ul className=' mt-[140px] py-3 flex flex-col gap-3 text-white'>
                {
                    authStateList().map((i, id)=>(
                        <Link style={{textDecoration: 'none', color: 'inherit'}} to={i.link && i.link} key={id}>
                        <li onClick={()=> {setSelectedTab(id); typeof i.action == 'function' && i.action()}} style={{background: selectedTab == id && 'rgb(245,158,10)'}} className='rounded-3  p-2'>{i.name}</li>
                        </Link>
                    ))
                }
               </ul> 
        }
        </div>
    </div>
   </div>
   )
}

export default Header