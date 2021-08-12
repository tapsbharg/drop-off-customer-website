import Link from "next/link";
import DashLayout from "../components/dashLayout";

export default function ReferPage(props) {
    return (
      <>
      <DashLayout props={props}>
      <div className="description_right">
                        <div className="referral_outer"> 

                            <div className="referral_box01 d-flex flex-wrap justify-content-between align-items-center">
                            <h6>Refer & Earn </h6>
                            <Link  href="/my-earning"><span className="btn custom01">My Earnings </span></Link>
                            </div>

                            <div className="referral_box02 d-flex flex-wrap align-items-center bg-red my-3 p-3 rounded-3">
                            <h6>Invite your friend and earn rewards </h6>
                            <p>Share your referral link and invite your friends via SMS/Email/WhatsApp. You earn unlimited rewards.</p>
                            </div>

                            <div className="referral_box03 d-flex flex-wrap align-items-center bg-light01 my-3 p-4 rounded-3">
                                <ul className="d-flex flex-wrap justify-content-between align-items-center">
                                    <li> <span><img src="assets/images/web/user.svg" alt=""/></span> <b> Invite your friends to sign up  </b></li>
                                    <li> <span><img src="assets/images/web/shop.svg" alt=""/> </span>  <b> Your friend will purchase products from us </b> </li>
                                    <li> <span><img src="assets/images/web/reward.svg" alt=""/> </span>  <b> You and your friends get rewarded  </b> </li>
                                </ul>
                            </div>

                            <div className="referral_box04 d-flex flex-wrap my-3">
                                <h6>Your Referral Code </h6>
                                    <div className="refer_input d-flex flex-wrap justify-content-between align-items-center">
                                        <input type="text" placeholder="JOHN151"/>
                                        <a className="btn custom01" href="#">Refer Now </a>
                                    </div>
                                <a className="term-con" href="#"> Terms & Conditions Apply* </a>
                            </div>

                        </div>
                    </div>
                
      </DashLayout>
      </>
    )
  }
  