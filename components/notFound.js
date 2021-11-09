import Link from 'next/link';

export default function NoFound(props){
    return(
        <>
            <div className="notFoundWrapper">
                <div className="container">
                    <div className="nothinfounxo">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="notifmagebox">
                                <img src="/assets/images/some-thing-wrong.png" className="img-fluid" alt=""/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="nosthingContnet">
                                <h2>Something Went Wrong</h2>
                                <h4>Redirect to home <Link href="/">Click Here</Link></h4>
                                <div className="counterRedict">5</div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>

            </div>
        </>
    )
}