import React from 'react'
import { Sparkles, Scissors } from 'lucide-react'
import { useState } from 'react'

const RemoveObject = () => {
  const [input,setInput] = useState('')
  const [object,setObject] = useState('')
  const onSubmitHandler = async(e) => { 
    e.preventDefault();
  }

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'  >
  
      <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
  
        <div className='flex items-center gap-3' >
          <Sparkles className="w-6 bg-gradient-to-r from-amber-500 to-orange-500 text-transparent bg-clip-text" />
  
          <h1 className='text-xl font-semibold'>Object Removal</h1>
  
        </div>
  
        <p className='mt-6 text-sm font-medium'>Upload Image</p>
  
        <input onChange={(e)=> setInput(e.target.files[0])}  type="file" accept='image/*' className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border 
        border-gray-300 placeholder-gray-400 text-gray-600'  required/>
  
          
        <p className='mt-6 text-sm font-medium'>Describe object name to remove</p>
  
        <textarea 
          onChange={(e)=> setObject(e.target.value)} 
          value={object} 
          rows={4}
          className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border 
          border-gray-300 placeholder-gray-400' 
          placeholder='eg : person, car, tree only single object name ' 
          required
        />
  
      
        <button type='submit' className='w-full flex items-center justify-center gap-2
        bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white px-4 py-2 rounded-md mt-6 hover:from-amber-600 hover:via-orange-600 hover:to-amber-700
        '>
          <Scissors className='w-5'/>
          Remove Object
        </button> 
  
      </form>
  
  
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border
      border-gray-200 min-h-96'>
  
        <div className='flex items-center gap-3'>
          <Scissors className='w-5 h-5 bg-gradient-to-r from-amber-500 to-orange-500 text-transparent bg-clip-text'/>
          <h1 className='text-xl font-semibold'>Processed Image</h1>
  
        </div>
  
        <div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5
          text-gray-400'>
  
            <Scissors className='w-9 h-9 '/>
  
            <p>Upload an image and click "Remove Object" to get started. </p>
  
          </div>
  
        </div>
  
      </div>
        
    </div>
  )
}

export default RemoveObject
