import React from 'react'
import { Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Edit } from 'lucide-react'
import { useAuth } from '@clerk/clerk-react'



const WriteArticle = () => {

  const articleLength= [
    {length:800, text:"Short(500-800 words)"},
    {length:1200, text:"Medium(800-1200 words)"},
    {length:1600, text:"short(1200+ words)"},
  ]

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input,setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const { getToken } = useAuth();


  const onSubmitHandler = async (e) => {
  e.preventDefault();

  if (!input.trim()) {
    alert("Please enter a topic");
    return;
  }

  setLoading(true);

  try {
    const token = await getToken();

    if (!token) {
      alert("User not authenticated");
      setLoading(false);
      return;
    }

    const response = await fetch(
      "http://localhost:3000/api/ai/generate-article",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 🔴 THIS WAS MISSING
        },
        body: JSON.stringify({
          prompt: input,
          length: selectedLength.length,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      setOutput(data.content);
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
    alert("Error generating article");
  } finally {
    setLoading(false);
  }
};



  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'  >

      <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lgborder border-gray-200'>

        <div className='flex items-center gap-3' >
          <Sparkles className="w-6 text-[#8830db]" />

          <h1 className='text-xl font-semibold'> Article Configuration </h1>

        </div>

        <p className='mt-6 text-sm font-medium'> Article Topic</p>

        <input onChange={(e)=> setInput(e.target.value)} value={input} type="text"  className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border 
        border-gray-300 placeholder-gray-400' placeholder=' the future of Artificial Intelligence is ...  ' required/>

        <p className='mt-4 text-sm font-medium'> Article Length </p>
        
    <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11' >
      {articleLength.map((item,index)=>
      (
              <span 
        onClick={() => setSelectedLength(item)} 
        className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
          selectedLength.text === item.text 
            ? 'bg-blue-50 text-blue-700 border-blue-400'
            : 'text-gray-600 border-gray-400'
        }`} 
        key={index}
      > 
        {item.text} 
      </span>
      ))}
    </div>

    <br />

    <button type='submit' disabled={loading} className='w-full flex items-center justify-center gap-2
    bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-md mt-6 hover:from-indigo-700 hover:to-purple-500 disabled:opacity-50
    '>
      <Edit className='w-5'/>
      {loading ? 'Generating...' : 'Generate Article'}
    </button> 

      </form>


      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border
      border-gray-200 min-h-96 max-h-[600px]'>

        <div className='flex items-center gap-3'>
          <Edit className='w-5 h-5 text-[#4a7aff]'/>
          <h1 className='text-xl font-semibold'>Generated Article</h1>

        </div>

        <div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5
          text-gray-400'>

            <Edit className='w-9 h-9 '/>

            {output ? (
              <div className='w-full text-gray-700 text-left whitespace-pre-wrap'>
                {output}
              </div>
            ) : (
              <p>Enter a topic and click "Generated article" to get started</p>
            )}

          </div>

        </div>

      </div>
      
    </div>
  )
}

export default WriteArticle
