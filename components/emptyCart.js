import Link from 'next/link';

export default function EmptyCart(props){

    return(
        <>
            <div className="emptyCart">
                <div className="container-fluid mt-100">
                    <div className="cart">
                        <div className="col-sm-12 empty-cart-cls text-center"> <img src="/assets/images/empty-cart-icon.png" className="img-fluid"/>
                            <h3><strong>Your Cart is Empty</strong></h3>
                            <h4>Add something to make me happy :)</h4> <Link href="/"><a  className="btn custom01 " >Continue</a></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}