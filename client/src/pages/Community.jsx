import { useUser } from '@clerk/clerk-react'
import { Heart } from 'lucide-react'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'


const Community = () => {

  const [creations, setCreations] = React.useState([])
  const [loading, setLoading] = useState(false)
  const {user} = useUser()

  useEffect(() => {
    // Fetch creations from your API
    const fetchCreations = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/creations') 
        const data = await response.json()
        setCreations(data || [])
      } catch (error) {
        console.error('Error fetching creations:', error)
        setCreations([])
      } finally {
        setLoading(false)
      }
    }
    fetchCreations()
  }, [])

  return (
    <div className='flex-1 h-full flex flex-col gap-4 p-6 '>
      <h2 className='text-2xl font-semibold'>Creations</h2>
      <div className='bg-white h-full w-full rounded-xl overflow-y-scroll'>
        {loading ? (
          <div className='flex justify-center items-center h-96'>
            <p className='text-gray-400'>Loading creations...</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
            {creations.length > 0 ? (
              creations.map((creation, index)=> (
                <div key={index} className='relative group overflow-hidden rounded-lg bg-gray-200'>
                  <img 
                    src={creation.content} 
                    alt={creation.prompt || 'Creation'} 
                    className='w-full h-64 object-cover rounded-lg'
                    onError={(e) => e.target.src = 'https://via.placeholder.com/300?text=Image+Error'}
                  />
                  
                  <div className='absolute bottom-0 top-0 right-0 left-0 flex gap-2 items-end justify-between p-3 group-hover:bg-gradient-to-b from-transparent to-black/80 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity'>
                    <p className='text-sm truncate'>
                      {creation.prompt}
                    </p>

                    <div className='flex gap-1 items-center flex-shrink-0'>
                      <p>{creation.likes?.length || 0}</p>
                      <Heart className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${creation.likes?.includes(user?.id) ? "fill-red-500 text-red-600" : "text-white"} ` }/>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className='col-span-full flex justify-center items-center h-96'>
                <p className='text-gray-400'>No creations yet</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Community
