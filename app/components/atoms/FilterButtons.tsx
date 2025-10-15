import { ArrowUpDown } from 'lucide-react'
import React from 'react'

const SortButton = (
    {onClick}: {onClick: () => void}
) => {
  return (
    <button 
    className='cursor-pointer' 
    onClick={onClick}>
        <ArrowUpDown className='h-3' />
    </button>
  )
}

export default SortButton