import { useRouter } from "next/dist/client/router";
import Link from "next/link";

export default function Sidebar(props) {
  const router=useRouter();
  function ActiveClass(cls){
    if(cls == router.pathname){
      return 'active';
    }
  }
    return (
      <>
        <div className="dashbord_opction">
          <i className="far fa-bars"></i>
          <ul>
              <li className={ActiveClass('/profile')}><Link href="/profile">Profile</Link></li>
              <li className={ActiveClass('/my-orders')}><Link href="/my-orders">My Orders</Link></li>
              <li className={ActiveClass('/addresses')}><Link href="/addresses">My Addresses</Link></li>
              <li className={ActiveClass('/card')}><Link href="/card">Card</Link></li>
              <li className={ActiveClass('/id-card')}><Link href="/id-card">ID</Link></li>
              <li className={ActiveClass('/referral')}><Link href="/referral">Refer & Earn</Link></li>
              <li className={ActiveClass('/help')}><Link href="/help">Help</Link></li>
              <li className={ActiveClass('/change-password')}><Link href="/change-password">Change Password</Link></li>
              <li><Link href="/">Sign Out</Link></li>
          </ul>
      </div>
  
      </>
    )
  }