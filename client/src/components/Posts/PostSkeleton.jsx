import React from 'react'
import Skeleton from 'react-loading-skeleton'


const PostSkeleton = ({cards}) => {
  return Array(cards)
  .fill(0)
  .map((_,i) => (
    <div key={i} className="sm:w-64 w-full  rounded-sm  mb-6">
      <div className="w-full h-1/2 rounded-md overflow-hidden">
        <Skeleton height={208} />
    </div>
    <div className="w-full flex gap-4 px-3  ">
        <Skeleton circle width={24} height={24} />
        <Skeleton width={44} height={20} />
    </div>
    <div className='px-3'>
    <Skeleton width={40} height={18} />
    <Skeleton width={40} height={18} />
    </div>
    <div className='flex px-3 pb-2 justify-between'>
    <Skeleton circle width={26} height={26} />
    <Skeleton width={78} height={44} />
    </div>
    </div>
  ));
}

export default PostSkeleton