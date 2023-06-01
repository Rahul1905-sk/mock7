import React from 'react'

const Pagination = ({curr,handlePageChange}) => {
 
    let arr = new Array(10).fill(0);
 
  return (
    <div>
       { arr?.map((e,i)=> <button disabled={curr === i+1} key={e+i} onClick={()=>handlePageChange(i+1)}>{i+1} </button>)}
    </div>
  )
}

export default Pagination