(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[763],{3692:function(e,n,r){"use strict";r.d(n,{Z:function(){return C}});var t=r(7757),a=r.n(t),s=r(5893),c=r(5861),l=r(4942),i=r(7294),o=r(5333),d=r(6890),u=r(9501),f=r(9249),h=r(4300),p=r(8986),m=r(5671),g=r(3144),x=r(7326),j=r(1424),v=r(425),y=r(1120);function b(e){var n=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,t=(0,y.Z)(e);if(n){var a=(0,y.Z)(this).constructor;r=Reflect.construct(t,arguments,a)}else r=t.apply(this,arguments);return(0,v.Z)(this,r)}}var N=function(e){(0,j.Z)(r,e);var n=b(r);function r(e){var t;return(0,m.Z)(this,r),t=n.call(this,e),(0,l.Z)((0,x.Z)(t),"onPlaceChanged",(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:t.props,n=e.map,r=e.addplace,a=t.autoComplete.getPlace();a.geometry&&(a.geometry.viewport?n.fitBounds(a.geometry.viewport):(n.setCenter(a.geometry.location),n.setZoom(17)),r(a),t.searchInput.blur())})),t.clearSearchBox=t.clearSearchBox.bind((0,x.Z)(t)),t}return(0,g.Z)(r,[{key:"componentDidMount",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.props,n=e.map,r=e.mapApi,t={types:["address"]};this.autoComplete=new r.places.Autocomplete(this.searchInput,t),this.autoComplete.addListener("place_changed",this.onPlaceChanged),this.autoComplete.bindTo("bounds",n)}},{key:"componentWillUnmount",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.props,n=e.mapApi;n.event.clearInstanceListeners(this.searchInput)}},{key:"clearSearchBox",value:function(){this.searchInput.value=""}},{key:"render",value:function(){var e=this;return(0,s.jsx)("div",{children:(0,s.jsx)("input",{className:"search-input",ref:function(n){e.searchInput=n},type:"text",onFocus:this.clearSearchBox,placeholder:"Enter a location"})})}}]),r}(i.Component);function _(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function w(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?_(Object(r),!0).forEach((function(n){(0,l.Z)(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):_(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}var A=function(e){e.text;return(0,s.jsx)("div",{className:"markerGoogle",children:(0,s.jsx)("img",{src:"/assets/images/marker.png",alt:""})})};function C(e){var n=(0,i.useState)(!1),r=n[0],t=n[1],l=(0,i.useState)({mapApiLoaded:!1,mapInstance:null,mapApi:null,geoCoder:null,places:[],zoom:11,address:"",draggable:!0,lat:52,lng:30,center:{lat:52,lng:30}}),m=l[0],g=l[1];function x(){return(x=(0,c.Z)(a().mark((function e(n){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return g(w(w({},m),{},{center:{lat:n.lat,lng:n.lng},lat:n.lat,lng:n.lng})),e.next=3,v(n);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var j=function(e){var n={lat:e.geometry.location.lat(),lng:e.geometry.location.lng()};g(w(w({},m),{},{places:[e],center:n,lat:n.lat,lng:n.lng})),v(n)};function v(e){var n=m.mapApi,r=e?{lat:e.lat,lng:e.lng}:{lat:m.lat,lng:m.lng};n&&(new n.Geocoder).geocode({location:r},(function(e,n){if("OK"===n)if(e[0]){var t=e[0].address_components.length,a="postal_code"==(t=e[0].address_components[t-1]).types[0]?t.long_name:"null";g(w(w({},m),{},{lat:r.lat,lng:r.lng,center:r,zipcode:a,address:e[0].formatted_address})),_.setFieldValue("lat",r.lat),_.setFieldValue("lng",r.lng),_.setFieldValue("address",e[0].formatted_address),_.setFieldValue("zipcode",a)}else window.alert("No results found");else window.alert("Geocoder failed due to: "+n)}))}var y=function(e){t(e)},b=u.Ry({lng:u.Z_().required("Please enter lang"),lat:u.Z_().required("Please enter lat"),address:u.Z_().required("Please enter address"),zipcode:u.Z_().required("Please enter zipcode")}),_=(0,h.TA)({initialValues:{lng:"",lat:"",address:"",zipcode:""},validationSchema:b,onSubmit:function(e){var n;console.log("submit",e),n=e,d.Z.addNewAddress(n).then((function(e){f.Am.success(e.data.message),y(!1)})).catch((function(e){f.Am.success(e),console.log(e)}))}});return(0,i.useEffect)((function(){g(w(w({},m),{},{lat:52,lng:30,center:{lat:52,lng:30}}))}),[]),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("a",{href:"#",className:e.className,onClick:function(){return y(!0)},children:" Add New "}),(0,s.jsx)(o.Z,{show:r,onHide:function(){y(!1)},backdrop:"static",keyboard:!1,className:"modal-gray",centered:!0,children:(0,s.jsx)("div",{className:"add_new_card",children:(0,s.jsxs)("div",{className:"add_new_card_contant bg-white p-5 rounded-3",children:[(0,s.jsx)("i",{className:"fal fa-times-circle",onClick:function(){return y(!1)}}),(0,s.jsx)("h5",{children:" Add New Location "}),(0,s.jsxs)("form",{className:" ",onSubmit:_.handleSubmit,children:[m.mapApiLoaded&&(0,s.jsx)("div",{className:"mapSearchinpt",children:(0,s.jsx)(N,{map:m.mapInstance,mapApi:m.mapApi,addplace:function(e){return j(e)}})}),m.address,(0,s.jsx)("div",{className:"mapviewWrapper",children:(0,s.jsx)(p.ZP,{center:m.center,zoom:m.zoom,draggable:m.draggable,onChange:function(e){return function(e){var n=e.center,r=e.zoom;g(w(w({},m),{},{center:n,zoom:r}))}(e)},onChildClick:function(){return console.log("child click")},onClick:function(e){return function(e){return x.apply(this,arguments)}(e)},bootstrapURLKeys:{key:"AIzaSyAh0d-fC-utW0ysuP8hQ13cMCwrEq5RFKw",libraries:["places","geometry"]},yesIWantToUseGoogleMapApiInternals:!0,onGoogleApiLoaded:function(e){return function(e,n){g(w(w({},m),{},{mapApiLoaded:!0,mapInstance:e,mapApi:n})),v()}(e.map,e.maps)},children:(0,s.jsx)(A,{lat:m.lat,lng:m.lng,text:"My Marker",addplace:function(e){return j(e)}})})}),(0,s.jsx)("button",{type:"submit",className:"btn cus_btn custom01",children:" Continue "})]})]})})})]})}},8332:function(e,n,r){"use strict";r.d(n,{Z:function(){return o}});var t=r(5893),a=r(1163),s=r(7294),c=r(4651),l=r(1664);function i(e){var n=(0,c.useRouter)();function r(e){if(e==n.pathname)return"active"}return(0,t.jsx)(t.Fragment,{children:(0,t.jsxs)("div",{className:"dashbord_opction",children:[(0,t.jsx)("i",{className:"far fa-bars"}),(0,t.jsxs)("ul",{children:[(0,t.jsx)("li",{className:r("/profile"),children:(0,t.jsx)(l.default,{href:"/profile",children:"Profile"})}),(0,t.jsx)("li",{className:r("/my-orders"),children:(0,t.jsx)(l.default,{href:"/my-orders",children:"My Orders"})}),(0,t.jsx)("li",{className:r("/addresses"),children:(0,t.jsx)(l.default,{href:"/addresses",children:"My Addresses"})}),(0,t.jsx)("li",{className:r("/card"),children:(0,t.jsx)(l.default,{href:"/card",children:"Card"})}),(0,t.jsx)("li",{className:r("/id-card"),children:(0,t.jsx)(l.default,{href:"/id-card",children:"ID"})}),(0,t.jsx)("li",{className:r("/referral"),children:(0,t.jsx)(l.default,{href:"/referral",children:"Refer & Earn"})}),(0,t.jsx)("li",{className:r("/help"),children:(0,t.jsx)(l.default,{href:"/help",children:"Help"})}),(0,t.jsx)("li",{className:r("/change-password"),children:(0,t.jsx)(l.default,{href:"/change-password",children:"Change Password"})}),(0,t.jsx)("li",{children:(0,t.jsx)(l.default,{href:"/",children:"Sign Out"})})]})]})})}var o=function(e){var n=(0,s.useState)(),r=n[0],c=n[1],l=(0,a.useRouter)();return(0,s.useEffect)((function(){c(e.props.auth),0==r&&l.push("/sign-in")}),[r]),(0,t.jsx)(t.Fragment,{children:(0,t.jsx)("div",{className:"cus_dashbord_outer py-5",children:(0,t.jsx)("div",{className:"container",children:(0,t.jsx)("div",{className:"cus_dashbord_inner",children:(0,t.jsxs)("div",{className:"customer_profile_outer d-flex flex-wrap ",children:[(0,t.jsx)("div",{className:"opction_left",children:(0,t.jsx)(i,{props:e})}),!r&&(0,t.jsx)("div",{className:"loadingSren",children:"Loading"}),r&&e.children]})})})})})}},2323:function(e,n,r){"use strict";r.r(n),r.d(n,{default:function(){return o}});var t=r(5893),a=r(8332),s=r(7294),c=r(6890);function l(e){var n=(0,s.useState)([]),r=n[0],a=n[1];return(0,s.useEffect)((function(){c.Z.getProfileData().then((function(e){a(e.data.data.address)})).catch((function(e){console.log(e)}))}),[e]),(0,t.jsx)(t.Fragment,{children:(0,t.jsx)("div",{className:"row",children:r&&r.map((function(e,n){return(0,t.jsx)("div",{className:"col-sm-6",children:(0,t.jsxs)("div",{className:"my_address border rounded-3 p-3",children:[(0,t.jsx)("h6",{children:"Home"}),(0,t.jsxs)("p",{children:[" ",e.address," "]}),(0,t.jsxs)("ul",{className:"d-flex flex-wrap justify-content-between align-items-center",children:[(0,t.jsxs)("li",{children:[(0,t.jsx)("a",{onClick:function(){return n=e._id,void console.log(n,"edit");var n},children:" Edit "})," "]}),(0,t.jsxs)("li",{children:[(0,t.jsx)("a",{onClick:function(){return n=e._id,void console.log(n,"address Default");var n},children:" Set As Default "})," "]})]})]})},n)}))})})}var i=r(3692);function o(e){return console.log(e),(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(a.Z,{props:e,children:(0,t.jsx)("div",{className:"description_right",children:(0,t.jsxs)("div",{className:"my_address_outer",children:[(0,t.jsxs)("div",{className:"d-flex flex-wrap justify-content-between align-items-center mb-4",children:[(0,t.jsx)("h6",{children:"My Addresses "}),(0,t.jsx)(i.Z,{type:"add"})]}),(0,t.jsx)(l,{})]})})})})}},4790:function(e,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/addresses",function(){return r(2323)}])}},function(e){e.O(0,[249,460,333,671,774,888,179],(function(){return n=4790,e(e.s=n);var n}));var n=e.O();_N_E=n}]);