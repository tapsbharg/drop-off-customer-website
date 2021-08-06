import Link from 'next/link';

export default function Header(appProps) {

    return (
      <>
        <header className="header">
      <div className="container-fluid">
        <div className="d-flex flex-wrap align-items-center justify-content-between justify-content-md-between py-3">
            <div className="logo d-flex">
                <Link className="d-flex align-items-center" href="/">
                  <img src="/assets/images/logo.svg" alt="" />
                  </Link>
                <ul>
                  <li><a href="#"><i className="fas fa-map-marker-alt"></i> Scott Rd Keuka Park, New York(NY) </a></li>
                </ul>
            </div>
            {!appProps.props.auth && (
                <nav className="d-flex flex-wrap">
                    <ul className="d-flex text-end ">
                        <li className="active"><Link href="/">Home</Link></li>
                        <li><Link href="/login">Sign in</Link></li>
                    </ul>
                </nav>
            )}
            {appProps.props.auth && (
                <div className="after_login">
                    <ul className="d-flex text-end ">
                        <li className="notice"><Link href="/notification"><span><i className="far fa-bell"></i></span></Link></li>  
                        <li className="admin_login"><Link href="/profile"><span><i className="fad fa-user"></i> Austin Store</span></Link></li>
                    </ul>
                </div>
            )}

            


        </div>
      </div>
    </header>
  
      </>
    )
  }