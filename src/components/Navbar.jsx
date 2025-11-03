 

import React from 'react'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useClerk , UserButton, useUser} from '@clerk/clerk-react'

const Navbar = () => {
    const navigate = useNavigate();

    // 1. Destructure 'isLoaded' along with 'user'
    const { isLoaded, user } = useUser();
    const { openSignIn } = useClerk();

    // 2. Add the crucial loading check
    if (!isLoaded) {
      // Return null or a simple loading indicator while the user status is being checked.
      return null; 
    }

    return (
      <div className='fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32'>

        <img src={assets.logo} alt="logo" className='w-32 sm:w-44' onClick={() => 
        navigate('/')}/>

        {
          // 3. Conditional rendering now works correctly because 'user' is guaranteed to be 
          // either the logged-in user object or null (logged out).
          user ? <UserButton /> 
          : 
          (
            <button 
              onClick={openSignIn} 
              className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'
            >
              Get Started 
              <ArrowRight className='w-4 h-4'/> 
            </button>
          )
        }

      </div>
    )
}

export default Navbar