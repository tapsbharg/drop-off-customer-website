import Link from 'next/link';
export default function Footer() {
    return (
      <>
        <footer className="footer_outer bg-light01  pb-1">
    <div className="container">
        <div className="footer_widget_outer d-flex justify-content-between py-sm-5">
            <div className="footer_widget f_logo">
                <img src="assets/images/Logo.png" alt=""/>
                <ul>
                    <li><a href="#"><i className="fas fa-map-marker-alt"></i> Jane Doe 123 Main Street  Dorm New York, NY 11377 USA</a></li>
                    <li><a href="#"> <i className="fas fa-envelope"></i> info@dropoff.com </a></li>
                    <li><a href="#"> <i className="fas fa-phone-alt"></i> +19999999999 </a></li>
                </ul>
            </div>
            <div className="footer_widget">
                <h5>Quick Links</h5>
                <ul>
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/faqs">FAQ's</Link></li>
                </ul>
            </div>
            <div className="footer_widget">
                <h5>Legal Stuff</h5>
                <ul>
                    <li><Link href="/privacy">Privacy Policy</Link></li>
                    <li><Link href="/terms">Terms & Conditions</Link></li>
                    <li><Link href="/cancellation-policy">Cancellation Policy</Link></li>
                </ul>
            </div>
            <div className="footer_widget">
                <h5>follow on</h5>
                <ul className=" social_link d-flex">
                    <li><a href="#"> <i className="fab fa-facebook-f"></i> </a></li>
                    <li><a href="#"> <i className="fab fa-instagram"></i> </a></li>
                    <li><a href="#"> <i className="fab fa-youtube"></i> </a></li>
                    <li><a href="#"> <i className="fab fa-twitter"></i> </a></li>
                </ul>
            </div>
        </div>
        <div className="copy_right text-center">
            <p>©Da DropOff. All rights reserved.</p>
        </div>
    </div>
    </footer>

  
      </>
    )
  }