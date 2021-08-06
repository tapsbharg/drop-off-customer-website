import Head from "next/head";
import Footer from "./footerComp";
import Header from "./headerComp";

export default function Layout(props) {
    return (
      <>
        <Head>
            <title>Drop Off Customer</title>
        </Head>
        <div className="loaderWRapper">
          <div className="loader loaderCircle"></div>
        </div>
        <div className="pageMainWrap">
        <Header  props={props} />
            <div className="pagContentWRp">
                {props.children}
            </div>
        <Footer />
        </div>
      </>
    )
  }