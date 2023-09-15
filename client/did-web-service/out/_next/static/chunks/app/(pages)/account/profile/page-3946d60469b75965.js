(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1135],{42834:function(e,t,r){"use strict";r.d(t,{Z:function(){return g}});var n=r(20791),i=r(13428),o=r(2265),a=r(57042),l=r(95600),s=r(35843),c=r(87927),u=r(26520),d=r(25702);function f(e){return(0,d.Z)("MuiDialogActions",e)}(0,u.Z)("MuiDialogActions",["root","spacing"]);var p=r(57437);let h=["className","disableSpacing"],v=e=>{let{classes:t,disableSpacing:r}=e;return(0,l.Z)({root:["root",!r&&"spacing"]},f,t)},m=(0,s.ZP)("div",{name:"MuiDialogActions",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,!r.disableSpacing&&t.spacing]}})(({ownerState:e})=>(0,i.Z)({display:"flex",alignItems:"center",padding:8,justifyContent:"flex-end",flex:"0 0 auto"},!e.disableSpacing&&{"& > :not(:first-of-type)":{marginLeft:8}})),x=o.forwardRef(function(e,t){let r=(0,c.Z)({props:e,name:"MuiDialogActions"}),{className:o,disableSpacing:l=!1}=r,s=(0,n.Z)(r,h),u=(0,i.Z)({},r,{disableSpacing:l}),d=v(u);return(0,p.jsx)(m,(0,i.Z)({className:(0,a.Z)(d.root,o),ownerState:u,ref:t},s))});var g=x},26337:function(e,t,r){"use strict";r.d(t,{Z:function(){return Z}});var n=r(20791),i=r(13428),o=r(2265),a=r(57042),l=r(95600),s=r(35843),c=r(87927),u=r(26520),d=r(25702);function f(e){return(0,d.Z)("MuiDialogContent",e)}(0,u.Z)("MuiDialogContent",["root","dividers"]);var p=r(92273),h=r(57437);let v=["className","dividers"],m=e=>{let{classes:t,dividers:r}=e;return(0,l.Z)({root:["root",r&&"dividers"]},f,t)},x=(0,s.ZP)("div",{name:"MuiDialogContent",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,r.dividers&&t.dividers]}})(({theme:e,ownerState:t})=>(0,i.Z)({flex:"1 1 auto",WebkitOverflowScrolling:"touch",overflowY:"auto",padding:"20px 24px"},t.dividers?{padding:"16px 24px",borderTop:`1px solid ${(e.vars||e).palette.divider}`,borderBottom:`1px solid ${(e.vars||e).palette.divider}`}:{[`.${p.Z.root} + &`]:{paddingTop:0}})),g=o.forwardRef(function(e,t){let r=(0,c.Z)({props:e,name:"MuiDialogContent"}),{className:o,dividers:l=!1}=r,s=(0,n.Z)(r,v),u=(0,i.Z)({},r,{dividers:l}),d=m(u);return(0,h.jsx)(x,(0,i.Z)({className:(0,a.Z)(d.root,o),ownerState:u,ref:t},s))});var Z=g},91797:function(e,t,r){"use strict";var n=r(13428),i=r(20791),o=r(2265),a=r(57042),l=r(95600),s=r(43226),c=r(35843),u=r(87927),d=r(92273),f=r(57245),p=r(57437);let h=["className","id"],v=e=>{let{classes:t}=e;return(0,l.Z)({root:["root"]},d.a,t)},m=(0,c.ZP)(s.Z,{name:"MuiDialogTitle",slot:"Root",overridesResolver:(e,t)=>t.root})({padding:"16px 24px",flex:"0 0 auto"}),x=o.forwardRef(function(e,t){let r=(0,u.Z)({props:e,name:"MuiDialogTitle"}),{className:l,id:s}=r,c=(0,i.Z)(r,h),d=v(r),{titleId:x=s}=o.useContext(f.Z);return(0,p.jsx)(m,(0,n.Z)({component:"h2",className:(0,a.Z)(d.root,l),ownerState:r,ref:t,variant:"h6",id:null!=s?s:x},c))});t.Z=x},92273:function(e,t,r){"use strict";r.d(t,{a:function(){return o}});var n=r(26520),i=r(25702);function o(e){return(0,i.Z)("MuiDialogTitle",e)}let a=(0,n.Z)("MuiDialogTitle",["root"]);t.Z=a},96855:function(e,t,r){Promise.resolve().then(r.bind(r,24756))},24756:function(e,t,r){"use strict";r.r(t);var n=r(57437),i=r(23322),o=r(12131),a=r(451),l=r(42937),s=r(43226),c=r(49050),u=r(22079),d=r(42834),f=r(26337),p=r(91797),h=r(67212),v=r(69990),m=r(16421),x=r(24033),g=r(2265);t.default=()=>{let e=(0,g.createRef)(),[t,r]=(0,g.useState)(!1),[Z]=(0,a.V)(v.jU),[y]=(0,a.V)(null==Z?void 0:Z.name$),{mounted:j}=(0,l.s)();(0,x.useRouter)(),(0,g.useEffect)(()=>{},[]);let w=()=>{r(!1)},b=async()=>{let t=e.current.value;if(t!=Z.name$.value){if(!Z){alert("please login first.");return}await Z.updateUserName(t),await (0,m.HA)(Z),r(!1)}};return(0,n.jsxs)("div",{className:"col-span-full",children:[(0,n.jsx)(i.O,{entries:["account-profile"]}),(0,n.jsx)(s.Z,{variant:"h4",children:"Account profile"}),(0,n.jsx)("p",{children:"Here is your account profile."}),(0,n.jsxs)("p",{children:["Your name: ",(0,n.jsx)("span",{children:y})]}),(0,n.jsx)(o.c,{onClick:()=>{r(!0)},children:"Edit Name"}),(0,n.jsxs)(u.Z,{open:t,onClose:w,children:[(0,n.jsx)(p.Z,{children:"Reset New Name"}),(0,n.jsx)(f.Z,{children:(0,n.jsx)(h.Z,{inputRef:e,autoFocus:!0,margin:"dense",id:"name",label:"Please input new name",type:"email",fullWidth:!0,variant:"standard"})}),(0,n.jsxs)(d.Z,{children:[(0,n.jsx)(c.Z,{onClick:w,children:"Cancel"}),(0,n.jsx)(c.Z,{onClick:b,children:"Save"})]})]})]})}},23322:function(e,t,r){"use strict";r.d(t,{O:function(){return v}});var n,i,o=r(57437),a=r(61396),l=r.n(a),s=r(2265);function c(){return(c=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function u(){return(u=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}let d=[{key:"dashboard",icon:(0,o.jsx)(function(e){return s.createElement("svg",c({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24"},e),n||(n=s.createElement("path",{fill:"currentColor",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6.5 20v-9H3l9-6 9 6h-3.5v9h-3v-3.5A1.5 1.5 0 0 0 13 15h-2a1.5 1.5 0 0 0-1.5 1.5V20h-3Z"})))},{}),title:"Dashboard",path:"/dashboard"},{key:"profile",title:"Profile",path:"/profile"},{key:"account-profile",title:"Account profile",path:"/account/profile"},{key:"security-center",icon:(0,o.jsx)(function(e){return s.createElement("svg",u({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 48 48"},e),i||(i=s.createElement("g",{"data-name":"Layer 2"},s.createElement("path",{fill:"none",d:"M0 0h48v48H0z","data-name":"invisible box"}),s.createElement("path",{fill:"currentColor",d:"M24 2S6 7.1 6 8v18.2c0 9.2 13.3 17.3 17 19.5a1.8 1.8 0 0 0 2 0c3.8-2.1 17-10.3 17-19.5V8c0-.9-18-6-18-6Zm9.4 16.4-11 11a1.9 1.9 0 0 1-2.8 0l-4.9-4.9a2.2 2.2 0 0 1-.4-2.7 2 2 0 0 1 3.1-.2l3.6 3.6 9.6-9.6a2 2 0 0 1 2.8 2.8Z","data-name":"icons Q2"}))))},{}),title:"Security center",path:"/account/security"},{key:"bind-browser",title:"Bind browser",path:"/account/security/bind-passkey"},{key:"bind-email",title:"Bind email",path:"/account/security/bind-email"},{key:"bind-password",title:"Bind password",path:"/account/security/bind-password"},{key:"credentials-list",title:"All credentials",path:"/account/credentials/list"},{key:"delete-identity",title:"Identity deletion",path:"/delete-identity"},{key:"storage",title:"Storage",path:"/storage"}];function f(e){let t=d.find(t=>t.key===e);if(!t)throw Error("Unknown breadcrumbs item ".concat(e));return t}let p=e=>{let{item:t}=e,{icon:r,title:n,path:i}=t;return(0,o.jsxs)("div",{className:"flex flex-row items-center justify-center",children:[r&&(0,o.jsx)("div",{className:"mr-1",style:{width:18,height:18,color:"var(--primary-color)"},children:r}),(0,o.jsx)(l(),{href:i,className:" bg-gray-200 px-3 py-1 rounded-lg",style:{fontSize:14},children:n})]})},h=()=>(0,o.jsx)("div",{className:"mx-2",children:"/"}),v=e=>{let{entries:t}=e,r=f("dashboard"),n=[r,...t.map(e=>f(e))];return(0,o.jsx)("div",{className:"flex flex-row items-center w-full justify-center",children:n.map((e,t)=>(0,o.jsxs)("div",{className:"flex flex-row items-center",children:[(0,o.jsx)(p,{item:e}),t<n.length-1&&(0,o.jsx)(h,{})]},t))})}},42937:function(e,t,r){"use strict";r.d(t,{s:function(){return i}});var n=r(2265);let i=()=>{let[e,t]=(0,n.useState)(!1);return(0,n.useEffect)(()=>{t(!0)},[]),{mounted:e}}},61396:function(e,t,r){e.exports=r(46685)},24033:function(e,t,r){e.exports=r(68165)}},function(e){e.O(0,[6990,6110,1510,8920,4057,6685,1385,2971,596,1744],function(){return e(e.s=96855)}),_N_E=e.O()}]);