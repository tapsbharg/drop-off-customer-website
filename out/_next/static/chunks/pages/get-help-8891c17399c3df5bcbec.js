(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[273],{8332:function(e,s,r){"use strict";r.d(s,{Z:function(){return o}});var a=r(5893),l=r(1163),i=r(7294),n=r(4651),t=r(1664);function c(e){var s=(0,n.useRouter)();function r(e){if(e==s.pathname)return"active"}return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)("div",{className:"dashbord_opction",children:[(0,a.jsx)("i",{className:"far fa-bars"}),(0,a.jsxs)("ul",{children:[(0,a.jsx)("li",{className:r("/profile"),children:(0,a.jsx)(t.default,{href:"/profile",children:"Profile"})}),(0,a.jsx)("li",{className:r("/my-orders"),children:(0,a.jsx)(t.default,{href:"/my-orders",children:"My Orders"})}),(0,a.jsx)("li",{className:r("/addresses"),children:(0,a.jsx)(t.default,{href:"/addresses",children:"My Addresses"})}),(0,a.jsx)("li",{className:r("/card"),children:(0,a.jsx)(t.default,{href:"/card",children:"Card"})}),(0,a.jsx)("li",{className:r("/id-card"),children:(0,a.jsx)(t.default,{href:"/id-card",children:"ID"})}),(0,a.jsx)("li",{className:r("/referral"),children:(0,a.jsx)(t.default,{href:"/referral",children:"Refer & Earn"})}),(0,a.jsx)("li",{className:r("/help"),children:(0,a.jsx)(t.default,{href:"/help",children:"Help"})}),(0,a.jsx)("li",{className:r("/change-password"),children:(0,a.jsx)(t.default,{href:"/change-password",children:"Change Password"})}),(0,a.jsx)("li",{children:(0,a.jsx)(t.default,{href:"/",children:"Sign Out"})})]})]})})}var o=function(e){var s=(0,i.useState)(),r=s[0],n=s[1],t=(0,l.useRouter)();return(0,i.useEffect)((function(){n(e.props.auth),0==r&&t.push("/sign-in")}),[r]),(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("div",{className:"cus_dashbord_outer py-5",children:(0,a.jsx)("div",{className:"container",children:(0,a.jsx)("div",{className:"cus_dashbord_inner",children:(0,a.jsxs)("div",{className:"customer_profile_outer d-flex flex-wrap ",children:[(0,a.jsx)("div",{className:"opction_left",children:(0,a.jsx)(c,{props:e})}),!r&&(0,a.jsx)("div",{className:"loadingSren",children:"Loading"}),r&&e.children]})})})})})}},6405:function(e,s,r){"use strict";r.r(s),r.d(s,{default:function(){return h}});var a=r(5893),l=r(4942),i=r(8332),n=r(4300),t=r(9249),c=r(9501),o=r(6890),d=r(7294);function u(e,s){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);s&&(a=a.filter((function(s){return Object.getOwnPropertyDescriptor(e,s).enumerable}))),r.push.apply(r,a)}return r}function m(e){for(var s=1;s<arguments.length;s++){var r=null!=arguments[s]?arguments[s]:{};s%2?u(Object(r),!0).forEach((function(s){(0,l.Z)(e,s,r[s])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(s){Object.defineProperty(e,s,Object.getOwnPropertyDescriptor(r,s))}))}return e}function h(e){var s=(0,d.useState)(""),r=(s[0],s[1]),l=c.Ry({issue:c.Z_().required("Please enter issue"),subject:c.Z_().required("Please enter subject"),orderNumber:c.Z_().required("Please enter order number"),message:c.Z_().required("Please enter message"),image:c.Z_().required("Please enter image")}),u=(0,n.TA)({initialValues:{issue:"",subject:"",orderNumber:"",message:"",image:""},validationSchema:l,onSubmit:function(e){var s;console.log("submit",e),s=e,o.Z.helpdesk(s).then((function(e){t.Am.success(e.data.message)})).catch((function(e){t.Am.success(e),console.log(e)}))}}),h=(0,n.TA)({initialValues:{image:""},validationSchema:c.Ry({image:c.nK().required("You need to attach image").test("fileSize","The image is too large",(function(e){return void 0!=e&&null!=e&&(e&&e.size<=2e6)})).test("type","Only the following formats are accepted: .jpeg, .jpg, .bmp, .png",(function(e){if(void 0==e||null==e)return!1;var s=e.type;return e&&("image/jpeg"===s||"image/bmp"===s||"image/png"===s)}))}),onSubmit:function(e){console.log("submit",e),function(e){var s=new FormData;s.append("coverImage",e.image),o.Z.postUpload(s).then((function(e){r(e.data.data._id),u.setFieldValue("image",e.data.data._id)})).catch((function(e){t.Am.success(e),console.log(e)}))}(e)}});return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.Ix,{}),(0,a.jsx)(i.Z,{props:e,children:(0,a.jsx)("div",{className:"description_right",children:(0,a.jsx)("div",{className:"",children:(0,a.jsxs)("div",{className:"form_middle",children:[(0,a.jsx)("h5",{children:" Get Help  "}),(0,a.jsx)("div",{className:"comman_from",children:(0,a.jsxs)("form",{className:"raise_ticket",onSubmit:u.handleSubmit,children:[(0,a.jsxs)("div",{className:"mb-3",children:[(0,a.jsx)("label",{className:"form-label",children:"Define Your Issue*"}),(0,a.jsx)("input",m(m({type:"text"},u.getFieldProps("issue")),{},{className:"form-control",placeholder:"Enter  Your Issue"})),u.touched.issue&&u.errors.issue?(0,a.jsx)("div",{className:"errorMsg",children:u.errors.issue}):null]}),(0,a.jsxs)("div",{className:"mb-3",children:[(0,a.jsx)("label",{className:"form-label",children:"Order Number"}),(0,a.jsxs)("select",m(m({},u.getFieldProps("orderNumber")),{},{children:[(0,a.jsx)("option",{value:"volvo",children:"Enter Your Number"}),(0,a.jsx)("option",{value:"volvo",children:"Issue 01"}),(0,a.jsx)("option",{value:"saab",children:"Issue 02"})]}))]}),(0,a.jsxs)("div",{className:"mb-3",children:[(0,a.jsx)("label",{className:"form-label",children:"Subject*"}),(0,a.jsx)("input",m(m({type:"text"},u.getFieldProps("subject")),{},{className:"form-control",placeholder:"Enter  Subject"})),u.touched.subject&&u.errors.subject?(0,a.jsx)("div",{className:"errorMsg",children:u.errors.subject}):null]}),(0,a.jsxs)("div",{className:"mb-3",children:[(0,a.jsx)("label",{className:"form-label",children:"Message*"}),(0,a.jsx)("textarea",m(m({},u.getFieldProps("message")),{},{placeholder:"Enter Message"})),u.touched.message&&u.errors.message?(0,a.jsx)("div",{className:"errorMsg",children:u.errors.message}):null]}),(0,a.jsxs)("div",{className:"mb-3",children:[(0,a.jsx)("label",{className:"form-label",children:"Upload Attachments (*jpeg, *jpg, *png)"}),(0,a.jsx)("input",{type:"file",name:"image",onChange:function(e){return function(e){var s=e.target.files[0];if(void 0!=s||null!=s){h.setFieldValue("image",e.target.files[0]);var r=new FileReader;r.readAsDataURL(e.target.files[0]),r.onload=function(){h.handleSubmit()}}}(e)},className:"form-control",placeholder:"Enter Your Subject"}),h.touched.image&&h.errors.image?(0,a.jsx)("div",{className:"errorMsg",children:h.errors.image}):null]}),(0,a.jsx)("button",{type:"submit",className:"btn cus_btn custom01",children:"Submit"})]})})]})})})})]})}},2926:function(e,s,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/get-help",function(){return r(6405)}])}},function(e){e.O(0,[249,774,888,179],(function(){return s=2926,e(e.s=s);var s}));var s=e.O();_N_E=s}]);