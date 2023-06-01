import axios from "axios";
import React, { useEffect, useState } from "react";
import CoinCard from "./CoinCard";
import Pagination from "./Pagination";

const Coin = () => {
  const [data, setData] = useState([]);
const [page, setPage] = useState(1)
const [total, setTotal] = useState(100)
const [priceSym, setPriceSym] = useState(1)

const [orderDis, setOrderDis] = useState(1);
const [idS, setIdS] = useState('')

// market_cap_asc, market_cap_desc, volume_asc, volume_desc, id_asc, id_desc
  const getData = async (page,orderDis,idS) => {

    console.log('getData', idS);
    const options = {
        params : {
            page: page,
            per_page: 10,
            order: orderDis === 1 ? "market_cap_asc": "market_cap_desc",
            id:idS?idS:''
        }
    }
    try {

        if(idS) {
            let res = await axios(
                `https://api.coingecko.com/api/v3/coins/${idS}`
              );
              console.log(res.data);
              setData(res.data);
        } else {
            let res = await axios(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR`,options
              );
              console.log(res.data);
              setData(res.data);
        }
      
 
    } catch (error) {
      console.log(error);
    }
  };

//   useEffect(() => {
//       console.log({page});
//     getData(page)
//   }, [page])
  
 
  useEffect(() => {

    if(priceSym ===1) {
        getData(page,'INR',idS)
        
    } else if (priceSym ===2) {
        getData(page,"USD",idS)
        
    } else {
        getData(page,orderDis,idS)    
    }
  }, [page, priceSym, orderDis,idS])
  
 
const handlePageChange = (p) => {


    setPage(p)
    console.log('setpage' , p);
}


  return (
    <div>

<div>
    <input type="text" value={idS} placeholder="enter name" onChange={(e)=>setIdS(e.target.value)} />

 <div>
    <button onClick={()=>setOrderDis(1)}>Low to High</button>
    <button onClick={()=>setOrderDis(2)}>High to Low</button>
 </div>
<select name="" id="" onChange={(e)=>setPriceSym(e.target.value)}>
   
    <option value="0">INR</option>
    <option value="1">USD</option>
    <option value="2">EUR</option>
</select>

</div>

      <table>
        <thead>
          <tr>
            <th>Coin</th>
            <th>Price</th>
            <th>24h Change</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {data.length>0 && data?.map((e) => (
            <CoinCard key={e.id} data={e} priceSym={priceSym} />
          ))}
        </tbody>
      </table>

      <div id='pagi'> </div>
     <Pagination  curr={page} handlePageChange={handlePageChange} />
    </div>
  );
};

export default Coin;
