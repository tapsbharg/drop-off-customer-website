(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[233],{856:function(e,s,r){"use strict";r.d(s,{Z:function(){return i}});var n=r(5893);function i(e){var s=e.totalItems||10,r=e.itemsPerPage||10,i=Math.ceil(s/r),l=e.currentPage||1,a=e.range||3,c=l-a,t=l+a;e.pageUrl;t>i&&(t=i),c<1&&(c=1);for(var d=[],h=function(s){d.push((0,n.jsx)("li",{className:l===s?"active":"",children:(0,n.jsx)("a",{title:"Page No ".concat(s),onClick:function(){e.pageChange(s)},children:(0,n.jsx)("span",{style:{color:"red"},children:(0,n.jsx)("b",{children:s})})})},s))},o=c;o<=t;o++)h(o);return(0,n.jsx)("div",{className:"table_botm_paging",children:(0,n.jsxs)("ul",{className:"pagination",children:[(0,n.jsx)("li",{children:(0,n.jsx)("a",{title:"First Page",onClick:function(){e.pageChange(1)},children:(0,n.jsx)("span",{children:(0,n.jsx)("i",{className:"fa fa-fast-backward"})})})}),(0,n.jsx)("li",{children:(0,n.jsx)("a",{title:"Previous Page",onClick:function(){e.pageChange(1===l?1:l-1)},children:(0,n.jsx)("span",{children:(0,n.jsx)("i",{className:"fa fa-step-backward"})})})}),d,(0,n.jsx)("li",{children:(0,n.jsx)("a",{title:"Next Page",onClick:function(){e.pageChange(l===i?i:l+1)},children:(0,n.jsx)("span",{children:(0,n.jsx)("i",{className:"fa fa-step-forward"})})})}),(0,n.jsx)("li",{children:(0,n.jsx)("a",{title:"Last Page",onClick:function(){e.pageChange(i)},children:(0,n.jsx)("i",{className:"fa fa-fast-forward"})})})]})})}},8332:function(e,s,r){"use strict";r.d(s,{Z:function(){return d}});var n=r(5893),i=r(1163),l=r(7294),a=r(4651),c=r(1664);function t(e){var s=(0,a.useRouter)();function r(e){if(e==s.pathname)return"active"}return(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)("div",{className:"dashbord_opction",children:[(0,n.jsx)("i",{className:"far fa-bars"}),(0,n.jsxs)("ul",{children:[(0,n.jsx)("li",{className:r("/profile"),children:(0,n.jsx)(c.default,{href:"/profile",children:"Profile"})}),(0,n.jsx)("li",{className:r("/my-orders"),children:(0,n.jsx)(c.default,{href:"/my-orders",children:"My Orders"})}),(0,n.jsx)("li",{className:r("/addresses"),children:(0,n.jsx)(c.default,{href:"/addresses",children:"My Addresses"})}),(0,n.jsx)("li",{className:r("/card"),children:(0,n.jsx)(c.default,{href:"/card",children:"Card"})}),(0,n.jsx)("li",{className:r("/id-card"),children:(0,n.jsx)(c.default,{href:"/id-card",children:"ID"})}),(0,n.jsx)("li",{className:r("/referral"),children:(0,n.jsx)(c.default,{href:"/referral",children:"Refer & Earn"})}),(0,n.jsx)("li",{className:r("/help"),children:(0,n.jsx)(c.default,{href:"/help",children:"Help"})}),(0,n.jsx)("li",{className:r("/change-password"),children:(0,n.jsx)(c.default,{href:"/change-password",children:"Change Password"})}),(0,n.jsx)("li",{children:(0,n.jsx)(c.default,{href:"/",children:"Sign Out"})})]})]})})}var d=function(e){var s=(0,l.useState)(),r=s[0],a=s[1],c=(0,i.useRouter)();return(0,l.useEffect)((function(){a(e.props.auth),0==r&&c.push("/sign-in")}),[r]),(0,n.jsx)(n.Fragment,{children:(0,n.jsx)("div",{className:"cus_dashbord_outer py-5",children:(0,n.jsx)("div",{className:"container",children:(0,n.jsx)("div",{className:"cus_dashbord_inner",children:(0,n.jsxs)("div",{className:"customer_profile_outer d-flex flex-wrap ",children:[(0,n.jsx)("div",{className:"opction_left",children:(0,n.jsx)(t,{props:e})}),!r&&(0,n.jsx)("div",{className:"loadingSren",children:"Loading"}),r&&e.children]})})})})})}},5280:function(e,s,r){"use strict";r.r(s),r.d(s,{default:function(){return f}});var n=r(5893),i=r(4942),l=r(1664),a=r(2788),c=r(6841),t=r(8332),d=r(1163),h=r(7294),o=r(6890),u=r(856);function j(e,s){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);s&&(n=n.filter((function(s){return Object.getOwnPropertyDescriptor(e,s).enumerable}))),r.push.apply(r,n)}return r}function x(e){for(var s=1;s<arguments.length;s++){var r=null!=arguments[s]?arguments[s]:{};s%2?j(Object(r),!0).forEach((function(s){(0,i.Z)(e,s,r[s])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):j(Object(r)).forEach((function(s){Object.defineProperty(e,s,Object.getOwnPropertyDescriptor(r,s))}))}return e}function f(e){var s=(0,d.useRouter)(),r=(s.query||"").page||"",i=(0,h.useState)({list:[],activePage:parseInt(r)||1,itemsCountPerPage:10}),j=i[0],f=i[1],p=(0,h.useState)({page:parseInt(r)||1,perPage:10}),g=p[0];p[1];return(0,h.useEffect)((function(){var e;e=g,o.Z.getHelpdeskClose(e).then((function(e){f(x(x({},j),{},{list:e.data.result}))})).catch((function(e){console.log(e)}))}),[]),(0,n.jsx)(n.Fragment,{children:(0,n.jsx)(t.Z,{props:e,children:(0,n.jsx)("div",{className:"description_right",children:(0,n.jsxs)("div",{className:"help_outer p-3 tabs03",children:[(0,n.jsxs)("div",{className:"d-flex justify-content-between align-items-center",children:[(0,n.jsx)("h6",{children:" Help "}),(0,n.jsx)(l.default,{href:"/get-help",children:(0,n.jsx)("span",{className:"btn cus_btn custom01",children:" Get Help "})})]}),(0,n.jsxs)(a.Z,{defaultActiveKey:"tab1",id:"nav-tab",className:"nav nav-tabs my-4",children:[(0,n.jsx)(c.Z,{eventKey:"tab1",title:"Active",children:(0,n.jsxs)("div",{className:"orddeislWRp",children:[(0,n.jsxs)("div",{className:"order_loop my-3 px-3 py-2 bg-light02",children:[(0,n.jsxs)("ul",{children:[(0,n.jsxs)("li",{children:[" ",(0,n.jsx)("b",{children:" Ticket No. "}),": 151515151 "]}),(0,n.jsxs)("li",{children:[" ",(0,n.jsx)("b",{children:" Define Your Issue"})," : Order Issue "]}),(0,n.jsxs)("li",{children:[" ",(0,n.jsx)("b",{children:" Order Number "}),": 51515151 "]}),(0,n.jsxs)("li",{children:[" ",(0,n.jsx)("b",{children:" Subject "})," : Wrong Order Received "]}),(0,n.jsxs)("li",{children:[" ",(0,n.jsx)("b",{children:" Message "})," : I want refund "]})]}),(0,n.jsx)(l.default,{href:"/reply/13256",children:(0,n.jsx)("span",{className:"btn cus_btn custom01",children:" Reply "})})]}),(0,n.jsxs)("div",{className:"order_loop my-3 p-4 bg-light02",children:[(0,n.jsxs)("ul",{children:[(0,n.jsxs)("li",{children:[" ",(0,n.jsx)("b",{children:" Ticket No. "}),": 151515151 "]}),(0,n.jsxs)("li",{children:[" ",(0,n.jsx)("b",{children:" Define Your Issue"})," : Order Issue "]}),(0,n.jsxs)("li",{children:[" ",(0,n.jsx)("b",{children:" Order Number "}),": 51515151 "]}),(0,n.jsxs)("li",{children:[" ",(0,n.jsx)("b",{children:" Subject "})," : Wrong Order Received "]}),(0,n.jsxs)("li",{children:[" ",(0,n.jsx)("b",{children:" Message "})," : I want refund "]})]}),(0,n.jsx)(l.default,{href:"/reply/13256",children:(0,n.jsx)("span",{className:"btn cus_btn custom01",children:" Reply "})})]})]})}),(0,n.jsx)(c.Z,{eventKey:"tab2",title:"Closed",children:(0,n.jsxs)("div",{className:"order_loop my-3 p-4 bg-light02",children:[(0,n.jsxs)("ul",{children:[(0,n.jsxs)("li",{children:[" ",(0,n.jsx)("b",{children:" Ticket No. "}),": 151515151 "]}),(0,n.jsxs)("li",{children:[" ",(0,n.jsx)("b",{children:" Define Your Issue"})," : Order Issue "]}),(0,n.jsxs)("li",{children:[" ",(0,n.jsx)("b",{children:" Order Number "}),": 51515151 "]}),(0,n.jsxs)("li",{children:[" ",(0,n.jsx)("b",{children:" Subject "})," : Wrong Order Received "]}),(0,n.jsxs)("li",{children:[" ",(0,n.jsx)("b",{children:" Message "})," : I want refund "]})]}),(0,n.jsx)(l.default,{href:"/reply/13256",children:(0,n.jsx)("span",{className:"btn cus_btn custom01",children:" Reply "})})]})})]}),(0,n.jsx)("div",{className:"table_botm_paging",children:(0,n.jsx)("div",{className:"table_border",children:(0,n.jsx)(u.Z,{totalItems:j.totalItemsCount,itemsPerPage:j.itemsCountPerPage,currentPage:j.activePage,range:3,pageChange:function(e){var r;(r=e)!==j.activePage&&(f(x(x({},j),{},{activePage:r,list:[]})),s.push({pathname:"/my-orders",query:values}))}})})})]})})})})}},8211:function(e,s,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/help",function(){return r(5280)}])}},function(e){e.O(0,[460,479,774,888,179],(function(){return s=8211,e(e.s=s);var s}));var s=e.O();_N_E=s}]);