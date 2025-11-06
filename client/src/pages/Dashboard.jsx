import React, { use } from 'react'
import { dummyCreationData } from '../assets/assets'
import { Sparkles } from 'lucide-react'
import { useState,useEffect } from 'react'  
import { Gem } from 'lucide-react'
import { Protect } from '@clerk/clerk-react'
import CreationItem from '../components/CreationItem'
import { Link } from 'react-router-dom'

const Dashboard = () => {

  const [creations, setCreations] = useState([])

  const getDashboardData = async () => {
    setCreations(dummyCreationData)
  }

  useEffect(() => {
    getDashboardData()
  }, [])

  return (
    <div className='h-full overflow-y-scroll p-6'>
        <div className='flex justify-start gap-4 flex-wrap'>

          <div className='flex justify-between items-center w-72 p-4 px-6 
          bg-white rounded-xl border border-gray-200' >

            <div className='text-slate-600'>
              <p className='text-sm'>Total Creations</p>
              <h2  className='text-xl font-semibold' >{creations.length}</h2>
            </div>
            <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#5b1fa9] to-[#6d3891a0]
             text-white flex justify-center items-center' >
              <Sparkles className="w-5 text-white"/>
            </div>

          </div>

          <div className='flex justify-between items-center w-72 p-4 px-6 
          bg-white rounded-xl border border-gray-200' >

            <div className='text-slate-600'>
              <p className='text-sm'>Active Plan</p>
              <h2  className='text-xl font-semibold' >
                <Protect plan="premium" fallback="free"> Premium</Protect>
              </h2>
            </div>
            <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#1f5ba9] to-[#0b96d7] 
             text-white flex justify-center items-center' >
             
              <Gem className="w-5 text-white"/>
            </div>

          </div>

       </div>
        
          <div className='space-y-3' >

            <p className='mt-8 mb-4 '> Recent Creations </p>

            {
              creations.map((item)=> 
              <CreationItem key={item.id} item={item} />)
            }
          </div>
    </div>
  )
}

export default Dashboard
