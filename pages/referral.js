import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { UserContext } from "../components/context/locationContext";
import DashLayout from "../components/dashLayout";
import { toast } from "react-toastify";
import copy from "copy-to-clipboard";

export default function ReferPage(props) {
  const [referralModal, setReferralModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState("Copy");
  const context = useContext(UserContext);
  const url = "https://cust.alphonic.net.in/";
  const quote = "Please share";
  const referralCode = context.profile.referralCode;
  const title = `Da Drop Off`;
  const message = `Hi there, Welcome to wish, You can now get $30 on signup using ${referralCode} referral code. Please Visit http://cust.alphonic.net.in/sign-up`;
  const copyToClipboard = () => {
    copy(referralCode);
    toast.success(`You have copied "${referralCode}"`);
    setCopySuccess("Copied");
  };

  return (
    <>
      <DashLayout props={props}>
        <div className="description_right">
          <div className="referral_outer">
            <div className="referral_box01 d-flex flex-wrap justify-content-between align-items-center">
              <h6>Refer & Earn </h6>
              <Link href="/my-earning">
                <span className="btn custom01">My Earnings </span>
              </Link>
            </div>

            <div className="referral_box02 d-flex flex-wrap align-items-center bg-red my-3 p-3 rounded-3">
              <h6>Invite your friend and earn rewards </h6>
              <p>
                Share your referral link and invite your friends via
                SMS/Email/WhatsApp. You earn unlimited rewards.
              </p>
            </div>

            <div className="referral_box03 d-flex flex-wrap align-items-center bg-light01 my-3 p-4 rounded-3">
              <ul className="d-flex flex-wrap justify-content-between align-items-center">
                <li>
                  <span>
                    <img src="assets/images/web/user.svg" alt="" />
                  </span>
                  <b> Invite your friends to sign up </b>
                </li>
                <li>
                  <span>
                    <img src="assets/images/web/shop.svg" alt="" />
                  </span>
                  <b> Your friend will purchase products from us </b>
                </li>
                <li>
                  <span>
                    <img src="assets/images/web/reward.svg" alt="" />
                  </span>
                  <b> You and your friends get rewarded </b>
                </li>
              </ul>
            </div>

            <div className="referral_box04 d-flex flex-wrap my-3">
              <h6>Your Referral Code </h6>
              <div className="refer_input d-flex flex-wrap justify-content-between align-items-center">
                <input
                  type="text"
                  placeholder="Referral Code"
                  readOnly
                  defaultValue={context.profile.referralCode}
                />
                <a
                  className="btn custom01"
                  onClick={() => {
                    setReferralModal(true);
                  }}
                >
                  Refer Now
                </a>
              </div>
              {/* <a className="term-con" href="#">
                Terms & Conditions Apply*
              </a> */}
              <div className="term-con-par">
                <Link href="/terms">
                  <a className="term-con"> Terms & Conditions Apply* </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Modal
          show={referralModal}
          onHide={() => {
            setReferralModal(false);
          }}
          backdrop="static"
          keyboard={false}
          className="modal-gray"
          centered
        >
          <div className="add_new_card">
            <div className="add_new_card_contant bg-white p-5 rounded-3">
              <i
                className="fal fa-times-circle"
                onClick={() => setReferralModal(false)}
              ></i>
              <div className="shareOptionWrap">
                <div className="shareHeasing">
                  <h3>Referral</h3>
                </div>
                <div className={`refrboxwr ${copySuccess}`}>
                  <div className="rressinput">{referralCode}</div>
                  <div className="rerBtns" onClick={() => copyToClipboard()}>
                    {copySuccess}
                  </div>
                </div>
                <div className="shareinPbpx">
                  <WhatsappShareButton url={message}>
                    <WhatsappIcon size={32} borderRadius={10} />
                  </WhatsappShareButton>
                  <FacebookShareButton url={url} quote={message} title={title}>
                    <FacebookIcon size={32} borderRadius={10} />
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={url}
                    title={title}
                    via="web"
                    hashtags={["#referral"]}
                    related={["referral"]}
                  >
                    <TwitterIcon size={32} borderRadius={10} />
                  </TwitterShareButton>
                  <LinkedinShareButton
                    url={url}
                    title={title}
                    summary={message}
                  >
                    <LinkedinIcon size={32} borderRadius={10} />
                  </LinkedinShareButton>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </DashLayout>
    </>
  );
}
