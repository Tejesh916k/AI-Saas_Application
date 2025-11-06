import React from 'react'
import {PricingTable} from '@clerk/clerk-react'

const Plan = () => {
  return (
    <div className='max-w-3xl mx-auto z-20 my-20'>
        <div className='text-center'>

            <h2 className='text-slate-800 text-[42px] font-semibold'>
                Choose the plan that’s right for you
            </h2>
            <p className='text-gray-700 max-w-lg mx-auto'> 
                Whether you're just starting out or looking for advanced features, we've got a plan to suit your needs.
            </p>
        </div>

        <div className='mt-14 max-sm:mx-8'>
            <PricingTable/> 
        </div>
      
    </div>
  )
}

export default Plan
