(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7409],{3283:function(e,t,r){"use strict";r.d(t,{Z:function(){return b}});var a=r(20791),l=r(13428),i=r(2265),n=r(57042),s=r(95600),o=r(35843),c=r(87927),u=r(59782),d=r(57437),f=(0,u.Z)((0,d.jsx)("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person"),h=r(26520),v=r(25702);function getAvatarUtilityClass(e){return(0,v.Z)("MuiAvatar",e)}(0,h.Z)("MuiAvatar",["root","colorDefault","circular","rounded","square","img","fallback"]);let m=["alt","children","className","component","imgProps","sizes","src","srcSet","variant"],useUtilityClasses=e=>{let{classes:t,variant:r,colorDefault:a}=e;return(0,s.Z)({root:["root",r,a&&"colorDefault"],img:["img"],fallback:["fallback"]},getAvatarUtilityClass,t)},g=(0,o.ZP)("div",{name:"MuiAvatar",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,t[r.variant],r.colorDefault&&t.colorDefault]}})(({theme:e,ownerState:t})=>(0,l.Z)({position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},"rounded"===t.variant&&{borderRadius:(e.vars||e).shape.borderRadius},"square"===t.variant&&{borderRadius:0},t.colorDefault&&(0,l.Z)({color:(e.vars||e).palette.background.default},e.vars?{backgroundColor:e.vars.palette.Avatar.defaultBg}:{backgroundColor:"light"===e.palette.mode?e.palette.grey[400]:e.palette.grey[600]}))),p=(0,o.ZP)("img",{name:"MuiAvatar",slot:"Img",overridesResolver:(e,t)=>t.img})({width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4}),x=(0,o.ZP)(f,{name:"MuiAvatar",slot:"Fallback",overridesResolver:(e,t)=>t.fallback})({width:"75%",height:"75%"}),j=i.forwardRef(function(e,t){let r=(0,c.Z)({props:e,name:"MuiAvatar"}),{alt:s,children:o,className:u,component:f="div",imgProps:h,sizes:v,src:j,srcSet:b,variant:Z="circular"}=r,y=(0,a.Z)(r,m),w=null,A=function({crossOrigin:e,referrerPolicy:t,src:r,srcSet:a}){let[l,n]=i.useState(!1);return i.useEffect(()=>{if(!r&&!a)return;n(!1);let l=!0,i=new Image;return i.onload=()=>{l&&n("loaded")},i.onerror=()=>{l&&n("error")},i.crossOrigin=e,i.referrerPolicy=t,i.src=r,a&&(i.srcset=a),()=>{l=!1}},[e,t,r,a]),l}((0,l.Z)({},h,{src:j,srcSet:b})),k=j||b,C=k&&"error"!==A,N=(0,l.Z)({},r,{colorDefault:!C,component:f,variant:Z}),S=useUtilityClasses(N);return w=C?(0,d.jsx)(p,(0,l.Z)({alt:s,src:j,srcSet:b,sizes:v,ownerState:N,className:S.img},h)):null!=o?o:k&&s?s[0]:(0,d.jsx)(x,{ownerState:N,className:S.fallback}),(0,d.jsx)(g,(0,l.Z)({as:f,ownerState:N,className:(0,n.Z)(S.root,u),ref:t},y,{children:w}))});var b=j},9406:function(e,t,r){Promise.resolve().then(r.bind(r,70393))},70393:function(e,t,r){"use strict";r.r(t);var a=r(57437),l=r(2265),i=r(43226),n=r(30666),s=r(98489),o=r(39830),c=r(40542),u=r(63491),d=r(14776),f=r(15707),h=r(83129),v=r(66267),m=r(19959),g=r(97716),p=r(96479),x=r(28451);t.default=()=>{let[e]=(0,c.V)(d.jU),[t]=(0,c.V)(null==e?void 0:e.get("activity").activities$),{mounted:r}=(0,g.s)();return(0,l.useEffect)(()=>{(0,u.fK)()},[]),(0,a.jsxs)("div",{className:"col-span-full",children:[(0,a.jsx)(f.Z,{title:"Recent Activity",description:"Stay informed about what's been happening. Explore a detailed overview of your recent activity for enhanced account security and gain valuable insights for better account management.",showBg:!0}),(0,a.jsx)(h.Z,{title:(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)(v.C,{children:(0,a.jsx)(o.JO,{icon:"akar-icons:wallet"})}),(0,a.jsx)(i.Z,{className:"flex-1",variant:"h6",fontWeight:600,sx:{ml:1},children:"Account Overview"})]}),able2ShowAll:!1,children:(0,a.jsx)("div",{className:"mb-1",children:(0,a.jsx)(m.J,{headCells:(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.Z,{children:"ACCOUNT ACTIVITY"}),(0,a.jsx)(n.Z,{align:"center",children:"DATE"}),(0,a.jsx)(n.Z,{width:0})]}),bodyRows:r&&t?(0,a.jsx)(a.Fragment,{children:t.length>0?t.map((e,t)=>(0,a.jsx)(x.p,{activity:e,needMoreAction:!0},t)):(0,a.jsx)(s.Z,{children:(0,a.jsx)(n.Z,{component:"th",colSpan:4,align:"center",children:(0,a.jsx)("span",{className:"text-base",children:"No activity found."})})})}):[,,,].fill(0).map((e,t)=>(0,a.jsx)(p.IT,{colSpan:3},t))})})})]})}}},function(e){e.O(0,[6990,9787,9443,8218,3988,395,8321,3824,6642,1228,5295,1510,1396,6953,2e3,182,3691,1621,2355,3262,9513,4445,2971,7864,1744],function(){return e(e.s=9406)}),_N_E=e.O()}]);