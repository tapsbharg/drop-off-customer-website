import Link from 'next/link';
import React from 'react'
import cartService from '../../services/cartSrvice';

function ProductList({props}) {



// add to cart
async function addToCart(data){
    var stockchk = data.productId.stock
    var quantity = data.quantity
    if(stockchk > quantity){
        await cartService.addToCart(data.productId._id, data.vendorId._id, props);
    }else{
        toast.error('Out of Stock')
    }
    
}
//remove cart
async function removeToCart(data){
    await cartService.removeToCart(data.productId._id, data.vendorId._id, props);
}





  return (
    <>
    <h3> Summary </h3>   
                                    <div className="summer_box00 bg-light02 rounded-3 p-3 mb-3">
                                        <table className="order_from">
                                            <thead>
                                                <tr>
                                                    <th colSpan="4"> Order From </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {props.cartData && (
                                                <tr>
                                                    <td className="address" colSpan="2"> 
                                                        <Link href={`/store-view?id=${props.cartData.vendor._id}`}><span> {props.cartData.vendor.storeName} </span></Link>
                                                        
                                                        <span><i className="fas fa-map-marker-alt"></i> {props.cartData.vendor.address}</span> 
                                                    </td>
                                                    <td colSpan="2" align="right"> Upload Your Identity/ Prescriptions </td>
                                                </tr>
                                            )}
                                                {props.cartData && (
                                                    props.cartData.cart.map((data, index)=>(
                                                        data.productId && (
                                                            <tr key={index}>
                                                            <td className="on-off">
                                                                <div className={`vegtype ${data.productId.isNonVeg?'non-veg':'veg'}`}></div>
                                                            </td>
                                                            <td className="content">{data.productId.name}</td>
                                                            <td className={`${data.productId.stock < data.quantity?'stockOut':'stockIn'}`}>  
                                                                <div className={`quntityPls show`}>
                                                                    <button type="button" onClick={()=>removeToCart(data)} className="qty-minus">-</button>
                                                                    <input type="text" readOnly className="qty" value={data.quantity} />
                                                                    <button type="button" onClick={()=>addToCart(data)} className="qty-plus">+</button>
                                                                </div>
                                                                {data.productId.stock < data.quantity && (
                                                                    <div className="text-danger text-center">Out of stock</div>
                                                                )}
                                                            </td>
                                                            <td className="price" > ${data.quantity * data.productId.price} </td>
                                                        </tr> 
                                                        )
                                                            
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
    </>
  )
}

export default ProductList