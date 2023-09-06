(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5334],{42834:function(e,t,n){"use strict";n.d(t,{Z:function(){return m}});var r=n(20791),i=n(13428),o=n(2265),a=n(57042),s=n(95600),l=n(35843),u=n(87927),c=n(26520),d=n(25702);function f(e){return(0,d.Z)("MuiDialogActions",e)}(0,c.Z)("MuiDialogActions",["root","spacing"]);var p=n(57437);let Z=["className","disableSpacing"],v=e=>{let{classes:t,disableSpacing:n}=e;return(0,s.Z)({root:["root",!n&&"spacing"]},f,t)},x=(0,l.ZP)("div",{name:"MuiDialogActions",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,!n.disableSpacing&&t.spacing]}})(({ownerState:e})=>(0,i.Z)({display:"flex",alignItems:"center",padding:8,justifyContent:"flex-end",flex:"0 0 auto"},!e.disableSpacing&&{"& > :not(:first-of-type)":{marginLeft:8}})),g=o.forwardRef(function(e,t){let n=(0,u.Z)({props:e,name:"MuiDialogActions"}),{className:o,disableSpacing:s=!1}=n,l=(0,r.Z)(n,Z),c=(0,i.Z)({},n,{disableSpacing:s}),d=v(c);return(0,p.jsx)(x,(0,i.Z)({className:(0,a.Z)(d.root,o),ownerState:c,ref:t},l))});var m=g},26337:function(e,t,n){"use strict";n.d(t,{Z:function(){return h}});var r=n(20791),i=n(13428),o=n(2265),a=n(57042),s=n(95600),l=n(35843),u=n(87927),c=n(26520),d=n(25702);function f(e){return(0,d.Z)("MuiDialogContent",e)}(0,c.Z)("MuiDialogContent",["root","dividers"]);var p=n(92273),Z=n(57437);let v=["className","dividers"],x=e=>{let{classes:t,dividers:n}=e;return(0,s.Z)({root:["root",n&&"dividers"]},f,t)},g=(0,l.ZP)("div",{name:"MuiDialogContent",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,n.dividers&&t.dividers]}})(({theme:e,ownerState:t})=>(0,i.Z)({flex:"1 1 auto",WebkitOverflowScrolling:"touch",overflowY:"auto",padding:"20px 24px"},t.dividers?{padding:"16px 24px",borderTop:`1px solid ${(e.vars||e).palette.divider}`,borderBottom:`1px solid ${(e.vars||e).palette.divider}`}:{[`.${p.Z.root} + &`]:{paddingTop:0}})),m=o.forwardRef(function(e,t){let n=(0,u.Z)({props:e,name:"MuiDialogContent"}),{className:o,dividers:s=!1}=n,l=(0,r.Z)(n,v),c=(0,i.Z)({},n,{dividers:s}),d=x(c);return(0,Z.jsx)(g,(0,i.Z)({className:(0,a.Z)(d.root,o),ownerState:c,ref:t},l))});var h=m},91797:function(e,t,n){"use strict";var r=n(13428),i=n(20791),o=n(2265),a=n(57042),s=n(95600),l=n(43226),u=n(35843),c=n(87927),d=n(92273),f=n(57245),p=n(57437);let Z=["className","id"],v=e=>{let{classes:t}=e;return(0,s.Z)({root:["root"]},d.a,t)},x=(0,u.ZP)(l.Z,{name:"MuiDialogTitle",slot:"Root",overridesResolver:(e,t)=>t.root})({padding:"16px 24px",flex:"0 0 auto"}),g=o.forwardRef(function(e,t){let n=(0,c.Z)({props:e,name:"MuiDialogTitle"}),{className:s,id:l}=n,u=(0,i.Z)(n,Z),d=v(n),{titleId:g=l}=o.useContext(f.Z);return(0,p.jsx)(x,(0,r.Z)({component:"h2",className:(0,a.Z)(d.root,s),ownerState:n,ref:t,variant:"h6",id:null!=l?l:g},u))});t.Z=g},92273:function(e,t,n){"use strict";n.d(t,{a:function(){return o}});var r=n(26520),i=n(25702);function o(e){return(0,i.Z)("MuiDialogTitle",e)}let a=(0,r.Z)("MuiDialogTitle",["root"]);t.Z=a},81646:function(e,t,n){Promise.resolve().then(n.bind(n,83331))},83331:function(e,t,n){"use strict";n.r(t);var r=n(57437),i=n(12131),o=n(451),a=n(42937),s=n(43226),l=n(35551),u=n(89394),c=n(42834),d=n(26337),f=n(91797),p=n(20879),Z=n(69990),v=n(16421),x=n(24033),g=n(2265);t.default=()=>{let e=(0,g.createRef)(),[t,n]=(0,g.useState)(!1),[m]=(0,o.V)((0,Z.jU)()),[h]=(0,o.V)(null==m?void 0:m.name$),{mounted:j}=(0,a.s)();(0,x.useRouter)(),(0,g.useEffect)(()=>{},[]);let w=()=>{n(!1)},N=async()=>{let t=e.current.value;if(t!=m.name$.value){if(!m){alert("please login first.");return}await m.updateUserName(t),await (0,v.HA)(m),n(!1)}};return(0,r.jsxs)("div",{className:"col-span-full",children:[(0,r.jsx)(s.Z,{variant:"h4",children:"Account profile"}),(0,r.jsx)("p",{children:"Here is your account profile."}),(0,r.jsxs)("p",{children:["Your name: ",(0,r.jsx)("span",{children:h})]}),(0,r.jsx)(i.c,{onClick:()=>{n(!0)},children:"Edit Name"}),(0,r.jsxs)(u.Z,{open:t,onClose:w,children:[(0,r.jsx)(f.Z,{children:"Reset New Name"}),(0,r.jsx)(d.Z,{children:(0,r.jsx)(p.Z,{inputRef:e,autoFocus:!0,margin:"dense",id:"name",label:"Please input new name",type:"email",fullWidth:!0,variant:"standard"})}),(0,r.jsxs)(c.Z,{children:[(0,r.jsx)(l.Z,{onClick:w,children:"Cancel"}),(0,r.jsx)(l.Z,{onClick:N,children:"Save"})]})]})]})}},42937:function(e,t,n){"use strict";n.d(t,{s:function(){return i}});var r=n(2265);let i=()=>{let[e,t]=(0,r.useState)(!1);return(0,r.useEffect)(()=>{t(!0)},[]),{mounted:e}}},24033:function(e,t,n){e.exports=n(68165)}},function(e){e.O(0,[6990,9787,9443,8218,1004,2361,3509,8077,9954,1375,2971,596,1744],function(){return e(e.s=81646)}),_N_E=e.O()}]);