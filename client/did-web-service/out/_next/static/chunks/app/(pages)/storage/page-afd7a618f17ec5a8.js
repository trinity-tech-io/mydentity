(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7112],{13457:function(e,t,r){"use strict";r.d(t,{Z:function(){return S}});var n=r(20791),i=r(13428),s=r(2265),o=r(57042),a=r(15959),l=r(95600),c=r(25702),d=r(39190),u=r(48153),p=r(43381),h=r(84775),f=r(65425),v=r(47508),x=r(57437);let m=["component","direction","spacing","divider","children","className","useFlexGap"],y=(0,h.Z)(),g=(0,d.Z)("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,t)=>t.root});function b(e){return(0,u.Z)({props:e,name:"MuiStack",defaultTheme:y})}let j=e=>({row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"})[e],k=({ownerState:e,theme:t})=>{let r=(0,i.Z)({display:"flex",flexDirection:"column"},(0,f.k9)({theme:t},(0,f.P$)({values:e.direction,breakpoints:t.breakpoints.values}),e=>({flexDirection:e})));if(e.spacing){let n=(0,v.hB)(t),i=Object.keys(t.breakpoints.values).reduce((t,r)=>(("object"==typeof e.spacing&&null!=e.spacing[r]||"object"==typeof e.direction&&null!=e.direction[r])&&(t[r]=!0),t),{}),s=(0,f.P$)({values:e.direction,base:i}),o=(0,f.P$)({values:e.spacing,base:i});"object"==typeof s&&Object.keys(s).forEach((e,t,r)=>{let n=s[e];if(!n){let n=t>0?s[r[t-1]]:"column";s[e]=n}}),r=(0,a.Z)(r,(0,f.k9)({theme:t},o,(t,r)=>e.useFlexGap?{gap:(0,v.NA)(n,t)}:{"& > :not(style):not(style)":{margin:0},"& > :not(style) ~ :not(style)":{[`margin${j(r?s[r]:e.direction)}`]:(0,v.NA)(n,t)}}))}return(0,f.dt)(t.breakpoints,r)};var w=r(35843),Z=r(87927);let E=function(e={}){let{createStyledComponent:t=g,useThemeProps:r=b,componentName:a="MuiStack"}=e,d=()=>(0,l.Z)({root:["root"]},e=>(0,c.Z)(a,e),{}),u=t(k),h=s.forwardRef(function(e,t){let a=r(e),l=(0,p.Z)(a),{component:c="div",direction:h="column",spacing:f=0,divider:v,children:y,className:g,useFlexGap:b=!1}=l,j=(0,n.Z)(l,m),k=d();return(0,x.jsx)(u,(0,i.Z)({as:c,ownerState:{direction:h,spacing:f,useFlexGap:b},ref:t,className:(0,o.Z)(k.root,g)},j,{children:v?function(e,t){let r=s.Children.toArray(e).filter(Boolean);return r.reduce((e,n,i)=>(e.push(n),i<r.length-1&&e.push(s.cloneElement(t,{key:`separator-${i}`})),e),[])}(y,v):y}))});return h}({createStyledComponent:(0,w.ZP)("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,t)=>t.root}),useThemeProps:e=>(0,Z.Z)({props:e,name:"MuiStack"})});var S=E},39190:function(e,t,r){"use strict";var n=r(61047);let i=(0,n.ZP)();t.Z=i},20100:function(e,t,r){Promise.resolve().then(r.bind(r,903))},903:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return b}});var n,i,s,o=r(57437),a=r(2265);function l(){return(l=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}var c=function(e){return a.createElement("svg",l({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 687 657"},e),n||(n=a.createElement("path",{fill:"url(#hive-cross_svg__a)",d:"M0 0v85.621l210.087 121.011v242.594L0 570.808v85.621l284.302-164.393V164.393L0 0Z"})),i||(i=a.createElement("path",{fill:"url(#hive-cross_svg__b)",d:"M686.777 85.621V0L402.475 164.393v328.214L686.777 657v-85.621L476.69 449.797V206.632l210.087-121.01Z"})),s||(s=a.createElement("defs",null,a.createElement("linearGradient",{id:"hive-cross_svg__a",x1:142.151,x2:142.151,y1:0,y2:656.429,gradientUnits:"userSpaceOnUse"},a.createElement("stop",{stopColor:"#FF8A00"}),a.createElement("stop",{offset:1})),a.createElement("linearGradient",{id:"hive-cross_svg__b",x1:544.626,x2:544.626,y1:0,y2:657,gradientUnits:"userSpaceOnUse"},a.createElement("stop",{stopColor:"#FF8A00"}),a.createElement("stop",{offset:1})))))},d=r(23322),u=r(451),p=r(42937),h=r(13457),f=r(28874),v=r(43226),x=r(7845),m=r(53932),y=r(69990),g=r(24033),b=()=>{let{mounted:e}=(0,p.s)();(0,g.useRouter)();let[t]=(0,u.V)(y.jU),[r]=(0,u.V)(m.B),n=null==r?void 0:r.get("hive"),[i]=(0,u.V)(null==n?void 0:n.vaultStatus$),[s]=(0,u.V)(null==n?void 0:n.vaultAddress$),[l]=(0,u.V)(null==n?void 0:n.vaultInfo$),[b,j]=(0,a.useState)(""),[k,w]=(0,a.useState)(""),Z=e=>parseFloat((e/1048576).toFixed(2));return((0,a.useEffect)(()=>{l&&(j(Z(l.getStorageUsed())+" MB"),w(Z(l.getStorageQuota())+" MB"))},[l]),e)?(0,o.jsxs)("div",{className:"col-span-full flex flex-col",children:[(0,o.jsx)(d.O,{entries:["storage"]}),(0,o.jsx)(h.Z,{className:"p-4",direction:"row",justifyContent:"center",children:(0,o.jsx)(c,{width:80,height:80})}),(0,o.jsx)("div",{className:"font-bold",children:"Hive storage status"}),(0,o.jsxs)("div",{children:[i===x.V.NotChecked&&"Checking",i===x.V.Subscribing&&"Subscribing",i===x.V.ReadyToUse&&"Ready to use",i===x.V.UnknownError&&"Failed to retrieve status"]}),l&&(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)(f.ZP,{container:!0,spacing:2,sx:{mt:1},children:[(0,o.jsx)(f.ZP,{item:!0,xs:6,children:(0,o.jsx)(v.Z,{variant:"body1",sx:{color:"text.secondary"},children:"Max storage:"})}),(0,o.jsx)(f.ZP,{item:!0,xs:6,children:(0,o.jsx)(v.Z,{variant:"body1",sx:{color:"text.secondary"},children:k})}),(0,o.jsx)(f.ZP,{item:!0,xs:6,children:(0,o.jsx)(v.Z,{variant:"body1",sx:{color:"text.secondary"},children:"File storage in use:"})}),(0,o.jsx)(f.ZP,{item:!0,xs:6,children:(0,o.jsx)(v.Z,{variant:"body1",sx:{color:"text.secondary"},children:b})}),(0,o.jsx)(f.ZP,{item:!0,xs:6,children:(0,o.jsx)(v.Z,{variant:"body1",sx:{color:"text.secondary"},children:"Started time:"})}),(0,o.jsx)(f.ZP,{item:!0,xs:6,children:(0,o.jsx)(v.Z,{variant:"body1",sx:{color:"text.secondary"},children:l.getStartTime().toDateString()})})]})}),(0,o.jsx)("div",{className:"font-bold mt-4",children:"Storage provider"}),(0,o.jsx)("div",{children:s})]}):null}},23322:function(e,t,r){"use strict";r.d(t,{O:function(){return v}});var n,i,s=r(57437),o=r(61396),a=r.n(o),l=r(2265);function c(){return(c=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function d(){return(d=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}let u=[{key:"dashboard",icon:(0,s.jsx)(function(e){return l.createElement("svg",c({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24"},e),n||(n=l.createElement("path",{fill:"currentColor",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6.5 20v-9H3l9-6 9 6h-3.5v9h-3v-3.5A1.5 1.5 0 0 0 13 15h-2a1.5 1.5 0 0 0-1.5 1.5V20h-3Z"})))},{}),title:"Dashboard",path:"/dashboard"},{key:"profile",title:"Profile",path:"/profile"},{key:"account-profile",title:"Account profile",path:"/account/profile"},{key:"security-center",icon:(0,s.jsx)(function(e){return l.createElement("svg",d({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 48 48"},e),i||(i=l.createElement("g",{"data-name":"Layer 2"},l.createElement("path",{fill:"none",d:"M0 0h48v48H0z","data-name":"invisible box"}),l.createElement("path",{fill:"currentColor",d:"M24 2S6 7.1 6 8v18.2c0 9.2 13.3 17.3 17 19.5a1.8 1.8 0 0 0 2 0c3.8-2.1 17-10.3 17-19.5V8c0-.9-18-6-18-6Zm9.4 16.4-11 11a1.9 1.9 0 0 1-2.8 0l-4.9-4.9a2.2 2.2 0 0 1-.4-2.7 2 2 0 0 1 3.1-.2l3.6 3.6 9.6-9.6a2 2 0 0 1 2.8 2.8Z","data-name":"icons Q2"}))))},{}),title:"Security center",path:"/account/security"},{key:"bind-browser",title:"Bind browser",path:"/account/security/bind-passkey"},{key:"bind-email",title:"Bind email",path:"/account/security/bind-email"},{key:"bind-password",title:"Bind password",path:"/account/security/bind-password"},{key:"credentials-list",title:"All credentials",path:"/account/credentials/list"},{key:"delete-identity",title:"Identity deletion",path:"/delete-identity"},{key:"storage",title:"Storage",path:"/storage"},{key:"applications",title:"Applications",path:"/applications"}];function p(e){let t=u.find(t=>t.key===e);if(!t)throw Error("Unknown breadcrumbs item ".concat(e));return t}let h=e=>{let{item:t}=e,{icon:r,title:n,path:i}=t;return(0,s.jsxs)("div",{className:"flex flex-row items-center justify-center",children:[r&&(0,s.jsx)("div",{className:"mr-1",style:{width:18,height:18,color:"var(--primary-color)"},children:r}),(0,s.jsx)(a(),{href:i,className:" bg-gray-200 px-3 py-1 rounded-lg",style:{fontSize:14},children:n})]})},f=()=>(0,s.jsx)("div",{className:"mx-2",children:"/"}),v=e=>{let{entries:t}=e,r=p("dashboard"),n=[r,...t.map(e=>p(e))];return(0,s.jsx)("div",{className:"flex flex-row items-center w-full justify-center",children:n.map((e,t)=>(0,s.jsxs)("div",{className:"flex flex-row items-center",children:[(0,s.jsx)(h,{item:e}),t<n.length-1&&(0,s.jsx)(f,{})]},t))})}},42937:function(e,t,r){"use strict";r.d(t,{s:function(){return i}});var n=r(2265);let i=()=>{let[e,t]=(0,n.useState)(!1);return(0,n.useEffect)(()=>{t(!0)},[]),{mounted:e}}},24033:function(e,t,r){e.exports=r(68165)}},function(e){e.O(0,[6990,3988,395,5295,1510,4440,6171,8098,1396,8874,1385,2971,596,1744],function(){return e(e.s=20100)}),_N_E=e.O()}]);