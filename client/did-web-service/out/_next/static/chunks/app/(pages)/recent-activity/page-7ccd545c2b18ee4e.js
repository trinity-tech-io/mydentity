(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7409],{3283:function(e,t,r){"use strict";r.d(t,{Z:function(){return y}});var n=r(20791),a=r(13428),i=r(2265),o=r(57042),l=r(95600),s=r(35843),c=r(87927),u=r(59782),d=r(57437),f=(0,u.Z)((0,d.jsx)("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person"),v=r(26520),h=r(25702);function getAvatarUtilityClass(e){return(0,h.Z)("MuiAvatar",e)}(0,v.Z)("MuiAvatar",["root","colorDefault","circular","rounded","square","img","fallback"]);let m=["alt","children","className","component","imgProps","sizes","src","srcSet","variant"],useUtilityClasses=e=>{let{classes:t,variant:r,colorDefault:n}=e;return(0,l.Z)({root:["root",r,n&&"colorDefault"],img:["img"],fallback:["fallback"]},getAvatarUtilityClass,t)},p=(0,s.ZP)("div",{name:"MuiAvatar",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,t[r.variant],r.colorDefault&&t.colorDefault]}})(({theme:e,ownerState:t})=>(0,a.Z)({position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},"rounded"===t.variant&&{borderRadius:(e.vars||e).shape.borderRadius},"square"===t.variant&&{borderRadius:0},t.colorDefault&&(0,a.Z)({color:(e.vars||e).palette.background.default},e.vars?{backgroundColor:e.vars.palette.Avatar.defaultBg}:{backgroundColor:"light"===e.palette.mode?e.palette.grey[400]:e.palette.grey[600]}))),g=(0,s.ZP)("img",{name:"MuiAvatar",slot:"Img",overridesResolver:(e,t)=>t.img})({width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4}),x=(0,s.ZP)(f,{name:"MuiAvatar",slot:"Fallback",overridesResolver:(e,t)=>t.fallback})({width:"75%",height:"75%"}),Z=i.forwardRef(function(e,t){let r=(0,c.Z)({props:e,name:"MuiAvatar"}),{alt:l,children:s,className:u,component:f="div",imgProps:v,sizes:h,src:Z,srcSet:y,variant:b="circular"}=r,j=(0,n.Z)(r,m),k=null,w=function({crossOrigin:e,referrerPolicy:t,src:r,srcSet:n}){let[a,o]=i.useState(!1);return i.useEffect(()=>{if(!r&&!n)return;o(!1);let a=!0,i=new Image;return i.onload=()=>{a&&o("loaded")},i.onerror=()=>{a&&o("error")},i.crossOrigin=e,i.referrerPolicy=t,i.src=r,n&&(i.srcset=n),()=>{a=!1}},[e,t,r,n]),a}((0,a.Z)({},v,{src:Z,srcSet:y})),S=Z||y,N=S&&"error"!==w,A=(0,a.Z)({},r,{colorDefault:!N,component:f,variant:b}),C=useUtilityClasses(A);return k=N?(0,d.jsx)(g,(0,a.Z)({alt:l,src:Z,srcSet:y,sizes:h,ownerState:A,className:C.img},v)):null!=s?s:S&&l?l[0]:(0,d.jsx)(x,{ownerState:A,className:C.fallback}),(0,d.jsx)(p,(0,a.Z)({as:f,ownerState:A,className:(0,o.Z)(C.root,u),ref:t},j,{children:k}))});var y=Z},13457:function(e,t,r){"use strict";r.d(t,{Z:function(){return k}});var n=r(20791),a=r(13428),i=r(2265),o=r(57042),l=r(15959),s=r(95600),c=r(25702),u=r(39190),d=r(48153),f=r(43381),v=r(84775),h=r(65425),m=r(47508),p=r(57437);let g=["component","direction","spacing","divider","children","className","useFlexGap"],x=(0,v.Z)(),Z=(0,u.Z)("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,t)=>t.root});function useThemePropsDefault(e){return(0,d.Z)({props:e,name:"MuiStack",defaultTheme:x})}let getSideFromDirection=e=>({row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"})[e],style=({ownerState:e,theme:t})=>{let r=(0,a.Z)({display:"flex",flexDirection:"column"},(0,h.k9)({theme:t},(0,h.P$)({values:e.direction,breakpoints:t.breakpoints.values}),e=>({flexDirection:e})));if(e.spacing){let n=(0,m.hB)(t),a=Object.keys(t.breakpoints.values).reduce((t,r)=>(("object"==typeof e.spacing&&null!=e.spacing[r]||"object"==typeof e.direction&&null!=e.direction[r])&&(t[r]=!0),t),{}),i=(0,h.P$)({values:e.direction,base:a}),o=(0,h.P$)({values:e.spacing,base:a});"object"==typeof i&&Object.keys(i).forEach((e,t,r)=>{let n=i[e];if(!n){let n=t>0?i[r[t-1]]:"column";i[e]=n}}),r=(0,l.Z)(r,(0,h.k9)({theme:t},o,(t,r)=>e.useFlexGap?{gap:(0,m.NA)(n,t)}:{"& > :not(style):not(style)":{margin:0},"& > :not(style) ~ :not(style)":{[`margin${getSideFromDirection(r?i[r]:e.direction)}`]:(0,m.NA)(n,t)}}))}return(0,h.dt)(t.breakpoints,r)};var y=r(35843),b=r(87927);let j=function(e={}){let{createStyledComponent:t=Z,useThemeProps:r=useThemePropsDefault,componentName:l="MuiStack"}=e,useUtilityClasses=()=>(0,s.Z)({root:["root"]},e=>(0,c.Z)(l,e),{}),u=t(style),d=i.forwardRef(function(e,t){let l=r(e),s=(0,f.Z)(l),{component:c="div",direction:d="column",spacing:v=0,divider:h,children:m,className:x,useFlexGap:Z=!1}=s,y=(0,n.Z)(s,g),b=useUtilityClasses();return(0,p.jsx)(u,(0,a.Z)({as:c,ownerState:{direction:d,spacing:v,useFlexGap:Z},ref:t,className:(0,o.Z)(b.root,x)},y,{children:h?function(e,t){let r=i.Children.toArray(e).filter(Boolean);return r.reduce((e,n,a)=>(e.push(n),a<r.length-1&&e.push(i.cloneElement(t,{key:`separator-${a}`})),e),[])}(m,h):m}))});return d}({createStyledComponent:(0,y.ZP)("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,t)=>t.root}),useThemeProps:e=>(0,b.Z)({props:e,name:"MuiStack"})});var k=j},39190:function(e,t,r){"use strict";var n=r(61047);let a=(0,n.ZP)();t.Z=a},9406:function(e,t,r){Promise.resolve().then(r.bind(r,70393))},70393:function(e,t,r){"use strict";r.r(t);var n=r(57437),a=r(2265),i=r(43226),o=r(30666),l=r(98489),s=r(39830),c=r(40542),u=r(63491),d=r(14776),f=r(15707),v=r(83129),h=r(66267),m=r(19959),p=r(97716),g=r(39982),x=r(28451);t.default=()=>{let[e]=(0,c.V)(d.jU),[t]=(0,c.V)(null==e?void 0:e.get("activity").activities$),{mounted:r}=(0,p.s)();return(0,a.useEffect)(()=>{(0,u.fK)()},[]),(0,n.jsxs)("div",{className:"col-span-full",children:[(0,n.jsx)(f.Z,{title:"Recent Activity",description:"Stay informed about what's been happening. Explore a detailed overview of your recent activity for enhanced account security and gain valuable insights for better account management.",showBg:!0}),(0,n.jsx)(v.Z,{title:(0,n.jsxs)("div",{className:"flex items-center",children:[(0,n.jsx)(h.C,{children:(0,n.jsx)(s.JO,{icon:"akar-icons:wallet"})}),(0,n.jsx)(i.Z,{className:"flex-1",variant:"h6",fontWeight:600,sx:{ml:1},children:"Account Overview"})]}),able2ShowAll:!1,children:(0,n.jsx)("div",{className:"mb-1",children:(0,n.jsx)(m.J,{headCells:(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(o.Z,{children:"ACCOUNT ACTIVITY"}),(0,n.jsx)(o.Z,{align:"center",children:"DATE"}),(0,n.jsx)(o.Z,{width:0})]}),bodyRows:r&&t?(0,n.jsx)(n.Fragment,{children:t.length>0?t.map((e,t)=>(0,n.jsx)(x.p,{activity:e,needMoreAction:!0},t)):(0,n.jsx)(l.Z,{children:(0,n.jsx)(o.Z,{component:"th",colSpan:4,align:"center",children:(0,n.jsx)("span",{className:"text-base",children:"No activity found."})})})}):[,,,].fill(0).map((e,t)=>(0,n.jsx)(g.IT,{colSpan:3},t))})})})]})}},66267:function(e,t,r){"use strict";r.d(t,{C:function(){return l}});var n=r(57437),a=r(3283),i=r(43226),o=r(35843);let l=(0,o.ZP)(a.Z)(e=>{let{theme:t}=e;return{backgroundColor:"#9D3E3E",color:"white",width:36,height:36,padding:8}});t.Z=e=>{let{icon:t,title:r,description:a,className:o=""}=e;return(0,n.jsxs)("div",{className:"text-[#DDD] ".concat(o),children:[(0,n.jsx)("div",{className:"inline-flex pb-1",children:(0,n.jsx)(l,{children:t})}),(0,n.jsx)(i.Z,{variant:"body1",className:"underline underline-offset-2",children:r}),(0,n.jsx)(i.Z,{variant:"body2",children:a})]})}}},function(e){e.O(0,[6990,9787,9443,8218,3988,395,8321,9152,5295,1510,1396,6953,2e3,182,4241,8930,3262,9513,9950,2971,7864,1744],function(){return e(e.s=9406)}),_N_E=e.O()}]);