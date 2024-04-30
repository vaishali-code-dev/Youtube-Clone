import React from 'react';
import { comments } from '../utils/constants';

const Comments = () => {

  const CommentList = ({ itemList }) => (
    <div>
      {itemList?.map((item, index) => {
        if (item?.comments?.length === 0) {
          return <CommentCard item={item} key={index} />
        } else {
          return (
            <div>
              <CommentCard item={item} key={index} />
              <div className='pl-6 mt-2 border-l-2'>
                <CommentList itemList={comments} />
              </div>
            </div>
          )
        }
      })}
    </div>
  )


  const CommentCard = ({ item }) => (
    <div className='w-full p-2 rounded-lg shadow-md'>
      <h1>{item?.title}</h1>
      <p>{item?.owner}</p>
    </div>
  )

  return (
    <div className='m-2'>
      <CommentList itemList={comments} />
    </div>
  )
}

export default Comments