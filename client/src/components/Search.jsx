import React, { use, useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { Typewriter } from 'react-simple-typewriter'
function Search() {

    const [placeholder , setPlaceholder] = useState(0)

    const suggestions = ["Search for milk" , 'search for curd' , 'search for eggs' , 'search for chips' , 'search for chocolate' ,
        'search for rice'
    ]
    
   useEffect(() => {
      const interval = setInterval(() => {
       setPlaceholder(prev => (prev + 1) % suggestions.length);
    }, 1500);
 
  console.log(placeholder)
  return () => clearInterval(interval);
}, []);


  return (
    <div>
           <div className='relative w-full max-w-md'>
          
              <IoSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 '/>
         <input className='border border gray-1000 rounded-2xl pr-[150px] py-[10px] pl-[45px]'placeholder={`Search for ${suggestions[placeholder]}`}></input>
 

        </div>
    </div>
  )
}

export default Search
