import React, { memo } from "react"

const Figures = ({ onClick = () => null, ...props }) => (
    <figure onClick={onClick} className='w-1/2 mx-auto cursor-pointer'>
      <img className='w-full object-contain aspect-square' alt='activity' {...props} />
    </figure>
)

export default memo(Figures);