(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[258],{856:function(e,r,s){"use strict";s.d(r,{Z:function(){return a}});var n=s(5893);function a(e){var r=e.totalItems||10,s=e.itemsPerPage||10,a=Math.ceil(r/s),i=e.currentPage||1,t=e.range||3,c=i-t,l=i+t;e.pageUrl;l>a&&(l=a),c<1&&(c=1);for(var d=[],o=function(r){d.push((0,n.jsx)("li",{className:i===r?"active":"",children:(0,n.jsx)("a",{title:"Page No ".concat(r),onClick:function(){e.pageChange(r)},children:(0,n.jsx)("span",{style:{color:"red"},children:(0,n.jsx)("b",{children:r})})})},r))},h=c;h<=l;h++)o(h);return(0,n.jsx)("div",{className:"table_botm_paging",children:(0,n.jsxs)("ul",{className:"pagination",children:[(0,n.jsx)("li",{children:(0,n.jsx)("a",{title:"First Page",onClick:function(){e.pageChange(1)},children:(0,n.jsx)("span",{children:(0,n.jsx)("i",{className:"fa fa-fast-backward"})})})}),(0,n.jsx)("li",{children:(0,n.jsx)("a",{title:"Previous Page",onClick:function(){e.pageChange(1===i?1:i-1)},children:(0,n.jsx)("span",{children:(0,n.jsx)("i",{className:"fa fa-step-backward"})})})}),d,(0,n.jsx)("li",{children:(0,n.jsx)("a",{title:"Next Page",onClick:function(){e.pageChange(i===a?a:i+1)},children:(0,n.jsx)("span",{children:(0,n.jsx)("i",{className:"fa fa-step-forward"})})})}),(0,n.jsx)("li",{children:(0,n.jsx)("a",{title:"Last Page",onClick:function(){e.pageChange(a)},children:(0,n.jsx)("i",{className:"fa fa-fast-forward"})})})]})})}},8332:function(e,r,s){"use strict";s.d(r,{Z:function(){return d}});var n=s(5893),a=s(1163),i=s(7294),t=s(4651),c=s(1664);function l(e){var r=(0,t.useRouter)();function s(e){if(e==r.pathname)return"active"}return(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)("div",{className:"dashbord_opction",children:[(0,n.jsx)("i",{className:"far fa-bars"}),(0,n.jsxs)("ul",{children:[(0,n.jsx)("li",{className:s("/profile"),children:(0,n.jsx)(c.default,{href:"/profile",children:"Profile"})}),(0,n.jsx)("li",{className:s("/my-orders"),children:(0,n.jsx)(c.default,{href:"/my-orders",children:"My Orders"})}),(0,n.jsx)("li",{className:s("/addresses"),children:(0,n.jsx)(c.default,{href:"/addresses",children:"My Addresses"})}),(0,n.jsx)("li",{className:s("/card"),children:(0,n.jsx)(c.default,{href:"/card",children:"Card"})}),(0,n.jsx)("li",{className:s("/id-card"),children:(0,n.jsx)(c.default,{href:"/id-card",children:"ID"})}),(0,n.jsx)("li",{className:s("/referral"),children:(0,n.jsx)(c.default,{href:"/referral",children:"Refer & Earn"})}),(0,n.jsx)("li",{className:s("/help"),children:(0,n.jsx)(c.default,{href:"/help",children:"Help"})}),(0,n.jsx)("li",{className:s("/change-password"),children:(0,n.jsx)(c.default,{href:"/change-password",children:"Change Password"})}),(0,n.jsx)("li",{children:(0,n.jsx)(c.default,{href:"/",children:"Sign Out"})})]})]})})}var d=function(e){var r=(0,i.useState)(),s=r[0],t=r[1],c=(0,a.useRouter)();return(0,i.useEffect)((function(){t(e.props.auth),0==s&&c.push("/sign-in")}),[s]),(0,n.jsx)(n.Fragment,{children:(0,n.jsx)("div",{className:"cus_dashbord_outer py-5",children:(0,n.jsx)("div",{className:"container",children:(0,n.jsx)("div",{className:"cus_dashbord_inner",children:(0,n.jsxs)("div",{className:"customer_profile_outer d-flex flex-wrap ",children:[(0,n.jsx)("div",{className:"opction_left",children:(0,n.jsx)(l,{props:e})}),!s&&(0,n.jsx)("div",{className:"loadingSren",children:"Loading"}),s&&e.children]})})})})})}},3537:function(e,r,s){"use strict";s.r(r),s.d(r,{default:function(){return x}});var n=s(5893),a=s(4942),i=s(1664),t=s(1163),c=s(7294),l=s(2788),d=s(6841),o=s(8332),h=s(6890),u=s(856);function f(e,r){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),s.push.apply(s,n)}return s}function j(e){for(var r=1;r<arguments.length;r++){var s=null!=arguments[r]?arguments[r]:{};r%2?f(Object(s),!0).forEach((function(r){(0,a.Z)(e,r,s[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):f(Object(s)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(s,r))}))}return e}function x(e){var r=(0,t.useRouter)(),s=(r.query||"").page||"",a=(0,c.useState)({list:[],activePage:parseInt(s)||1,itemsCountPerPage:10}),f=a[0],x=a[1],m=(0,c.useState)({page:parseInt(s)||1,perPage:10,status:"pending"}),p=m[0];m[1];return(0,c.useEffect)((function(){var e;e=p,h.Z.getOrdersAll(e).then((function(e){x(j(j({},f),{},{list:e.data.result}))})).catch((function(e){console.log(e)}))}),[]),(0,n.jsx)(n.Fragment,{children:(0,n.jsx)(o.Z,{props:e,children:(0,n.jsxs)("div",{className:"description_right",children:[(0,n.jsxs)("div",{className:"my_order_outer",children:[(0,n.jsx)("div",{className:"d-flex flex-wrap justify-content-between align-items-center mb-4",children:(0,n.jsx)("h6",{children:"My Orders "})}),(0,n.jsx)(l.Z,{defaultActiveKey:"tab1",id:"uncontrolled-tab-example",className:"mb-3",children:(0,n.jsx)(d.Z,{eventKey:"tab1",title:"Pending Orders",children:(0,n.jsx)("div",{className:"row",children:f.list.map((function(e,r){return(0,n.jsx)("div",{className:"col-lg-6 col-md-12 ",children:(0,n.jsxs)("div",{className:"my_order bg-white border rounded-3 p-3 mb-3",children:[(0,n.jsxs)("div",{className:"my_order01 d-flex flex-wrap justify-content-between align-items-center vendmrnadpr",children:[(0,n.jsxs)("div",{className:"d-flex flex-wrap justify-content-between align-items-center vendrodewrp",children:[(0,n.jsx)("div",{className:"my_order_img",children:(0,n.jsx)("img",{src:e.vendorId.image.path,alt:""})}),(0,n.jsx)("div",{className:"my_order_content px-2",children:(0,n.jsxs)("p",{children:[" ",(0,n.jsxs)("b",{children:[" ",e.vendorId.storeName," "]}),(0,n.jsx)("span",{children:e.vendorId.address})," "]})})]}),(0,n.jsxs)("div",{className:"vendrStats ".concat(e.status),href:"#",children:[" ",e.status," "]})]}),(0,n.jsxs)("ul",{className:"my_order02 d-flex flex-wrap justify-content-between align-items-center py-3 my-3",children:[(0,n.jsxs)("li",{children:[(0,n.jsx)("span",{children:" Ordered On "}),e.createdAt]}),(0,n.jsxs)("li",{children:[(0,n.jsx)("span",{children:" Scheduled For "}),"N/A"]})]}),(0,n.jsxs)("ul",{className:"my_order03 d-flex flex-wrap justify-content-between align-items-center ",children:[(0,n.jsxs)("li",{children:[" ",(0,n.jsxs)("a",{href:"#",children:[" $",e.payableAmount," "]})," "]}),(0,n.jsxs)("li",{children:[" ",(0,n.jsx)(i.default,{href:"/order-detail?orderId=".concat(e._id),children:"Track Details "})," "]})]})]})},r)}))})})})]}),(0,n.jsx)("div",{className:"table_botm_paging",children:(0,n.jsx)("div",{className:"table_border",children:(0,n.jsx)(u.Z,{totalItems:f.totalItemsCount,itemsPerPage:f.itemsCountPerPage,currentPage:f.activePage,range:3,pageChange:function(e){var s;(s=e)!==f.activePage&&(x(j(j({},f),{},{activePage:s,list:[]})),r.push({pathname:"/my-orders",query:values}))}})})})]})})})}},2983:function(e,r,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/my-orders",function(){return s(3537)}])}},function(e){e.O(0,[460,479,774,888,179],(function(){return r=2983,e(e.s=r);var r}));var r=e.O();_N_E=r}]);