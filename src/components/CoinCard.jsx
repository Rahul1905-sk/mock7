import React from 'react'

const CoinCard = ({data,priceSym}) => {
    const arr = ['₹','$','€'];

    const {
        price_change_percentage_24h,
        market_cap,
        symbol,
        id,
        image,
        current_price,
      } = data;

      console.log(data);
      
    return (
        <tr>
        <td style={{display:'flex'}}>
          <div style={{width:"10%"}}>
            <img style={{width:'100%'}} src={image} alt={symbol} />
          </div>
          <div>
            <p>{symbol}</p>
            <p>{id}</p>
          </div>
        </td>
        <td>{arr[priceSym]} {current_price}</td>
        <td>{price_change_percentage_24h?`${price_change_percentage_24h.toFixed(2)}%`:0}</td>

        
        <td>{arr[priceSym]} {`${market_cap.toString().split('').splice(0,8).join('')}M`}</td>
      </tr>
  )
}

export default CoinCard