(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[603],{1971:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return v}});var a=r(5893),n=r(4942),c=r(4651),s=r(1664),i=r(7294),o=r(6890),d=r(9501),u=r(4300),l=r(320),h=r(9249);r(9008);function f(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function m(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?f(Object(r),!0).forEach((function(t){(0,n.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function v(e){var t=(0,i.useState)([]),r=t[0],n=t[1],f=(0,i.useState)([]),v=f[0],p=f[1],g=(0,i.useState)([]),j=g[0],x=g[1],y=(0,i.useState)([]),b=y[0],_=y[1],N=(0,i.useState)(!1),S=(N[0],N[1]),w=(0,i.useState)(null),O=w[0],I=w[1],P=(0,c.useRouter)(),q=P.query||"",k=q.search||"",C=q.category||"";function D(t,r){if(O){var a={guestId:O,vendorId:r,quantity:1};o.Z.addTocartGuest(a,t).then((function(t){e.getCart()})).catch((function(e){h.Am.error(e.message),console.log(e.message)}))}else{var n={vendorId:r,quantity:1};o.Z.addTocart(n,t).then((function(t){e.getCart()})).catch((function(e){h.Am.error(e.message),console.log(e)}))}}function E(e,t){for(var r={},a=0;a<t.length;a++)e._id==t[a].id&&(r=m(m({},e),{},{cartStatus:t[a].qty>0,cartQty:t[a].qty}));return r.cartStatus||(r=m(m({},e),{},{cartStatus:!1})),r}(0,i.useEffect)((function(){!function(e){S(e)}(l.a.get("token")),function(e){if(e.cartData){for(var t=[],r=0;r<e.cartData.cart.length;r++){if(e.cartData.cart[r].productId){var a={};a={id:e.cartData.cart[r].productId._id,qty:e.cartData.cart[r].quantity}}t.push(a)}_(t)}}(e),o.Z.preference().then((function(e){n(e.data.data.vendorCategory)})).catch((function(e){console.log(e)}));var t,r={searchString:k,sortingBy:1};r.searchString&&(t=r,o.Z.searchProductData(t).then((function(e){p(e.data.data)})).catch((function(e){console.log(e)}))),T.setFieldValue("search",k),T.setFieldValue("category",C)}),[k,e]),(0,i.useEffect)((function(){}),[]),(0,i.useEffect)((function(){!function(e,t){var r=b,a=[];if(e)for(var n=0;n<e.length;n++)a.push(E(e[n],r));x(a)}(v);var e=l.a.get("token"),t=l.a.get("guestid");e||t?I(t):function(){var e=l.a.get("guestid");setGuestid(e)}()}),[e,b,v]);var Z=d.Ry({search:d.Z_().required("Please enter keyword"),category:d.Z_()}),T=(0,u.TA)({initialValues:{search:"",category:""},validationSchema:Z,onSubmit:function(e){console.log("submit",e),P.push({pathname:"/search",query:e})}});return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(h.Ix,{}),(0,a.jsx)("div",{className:"search_outer ",children:(0,a.jsx)("div",{className:"container",children:(0,a.jsxs)("div",{className:"search_inner my-5",children:[(0,a.jsx)("form",{onSubmit:T.handleSubmit,className:"mb-4",children:(0,a.jsxs)("div",{children:[(0,a.jsx)("i",{className:"far fa-search"}),(0,a.jsx)("input",m(m({type:"search",className:"form-control"},T.getFieldProps("search")),{},{placeholder:"Search Item...","aria-label":"Search"})),(0,a.jsx)("i",{className:"far fa-exchange"}),(0,a.jsxs)("ul",{className:"low_high_price bg-white p-3 rounded-3",children:[(0,a.jsxs)("li",{children:[" ",(0,a.jsx)("a",{href:"#",children:" Price Low to High "})," "]}),(0,a.jsxs)("li",{children:[" ",(0,a.jsx)("a",{href:"#",children:" Price High to Low "})," "]})]}),T.touched.search&&T.errors.search?(0,a.jsx)("div",{className:"errorMsg",children:T.errors.search}):null]})}),(0,a.jsx)("nav",{className:"mb-4",children:(0,a.jsx)("div",{className:"nav nav-tabs",id:"nav-tab",role:"tablist",children:r.map((function(e,t){return(0,a.jsxs)("button",{className:"nav-link ".concat(C==e._id?"active":""),onClick:function(){return t=e._id,T.setFieldValue("category",t),void T.handleSubmit();var t},children:[" ",e.name]},t)}))})}),(0,a.jsx)("div",{className:"searcCosngpp",children:j.map((function(t,r){return(0,a.jsx)("div",{children:t.vendorId.storeType==C&&(0,a.jsx)("div",{className:"product_grpup",children:(0,a.jsxs)("div",{className:"product_informaction d-flex flex-wrap align-items-center bg-white mb-3",children:[(0,a.jsx)("div",{className:"product_img",children:t.defaultImage&&(0,a.jsx)("img",{src:t.defaultImage.path,alt:""})}),(0,a.jsxs)("div",{className:"product_content px-3",children:[(0,a.jsxs)("div",{className:"producliscont",children:[(0,a.jsx)("h6",{children:(0,a.jsx)("b",{children:t.name})}),(0,a.jsx)("div",{className:"price",children:(0,a.jsxs)("h6",{children:[" $",t.price," "]})}),(0,a.jsx)(s.default,{href:"/store-view?id=".concat(t.vendorId._id),children:(0,a.jsxs)("span",{children:[" ",t.vendorId.storeName," "]})})]}),(0,a.jsxs)("div",{className:"prolislbtn ".concat(t.cartStatus?"active":"deactive"),children:[t.cartStatus&&(0,a.jsxs)("div",{className:"quntityPls",children:[(0,a.jsx)("button",{type:"button",onClick:function(){return function(t,r){if(O){var a={guestId:O,vendorId:r,quantity:-1};o.Z.addTocartGuest(a,t).then((function(t){e.getCart()})).catch((function(e){console.log(e)}))}else{var n={vendorId:r,quantity:-1};o.Z.addTocart(n,t).then((function(t){e.getCart()})).catch((function(e){console.log(e)}))}}(t._id,t.vendorId._id)},className:"qty-minus",children:"-"}),(0,a.jsx)("input",{type:"number",readOnly:!0,className:"qty",value:t.cartQty}),(0,a.jsx)("button",{type:"button",onClick:function(){return D(t._id,t.vendorId._id)},className:"qty-plus",children:"+"})]}),!t.cartStatus&&(0,a.jsxs)("a",{className:"add_product",onClick:function(){return D(t._id,t.vendorId._id)},children:[" add  ",(0,a.jsx)("i",{className:"far fa-plus",children:" "})," "]})]})]})]})})},r)}))})]})})})]})}},8161:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/search",function(){return r(1971)}])}},function(e){e.O(0,[249,774,888,179],(function(){return t=8161,e(e.s=t);var t}));var t=e.O();_N_E=t}]);