(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7112],{13457:function(e,t,r){"use strict";r.d(t,{Z:function(){return w}});var n=r(20791),i=r(13428),a=r(2265),o=r(57042),s=r(15959),l=r(95600),c=r(25702),u=r(39190),d=r(48153),p=r(43381),h=r(84775),y=r(65425),v=r(47508),f=r(57437);let m=["component","direction","spacing","divider","children","className","useFlexGap"],x=(0,h.Z)(),g=(0,u.Z)("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,t)=>t.root});function useThemePropsDefault(e){return(0,d.Z)({props:e,name:"MuiStack",defaultTheme:x})}let getSideFromDirection=e=>({row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"})[e],style=({ownerState:e,theme:t})=>{let r=(0,i.Z)({display:"flex",flexDirection:"column"},(0,y.k9)({theme:t},(0,y.P$)({values:e.direction,breakpoints:t.breakpoints.values}),e=>({flexDirection:e})));if(e.spacing){let n=(0,v.hB)(t),i=Object.keys(t.breakpoints.values).reduce((t,r)=>(("object"==typeof e.spacing&&null!=e.spacing[r]||"object"==typeof e.direction&&null!=e.direction[r])&&(t[r]=!0),t),{}),a=(0,y.P$)({values:e.direction,base:i}),o=(0,y.P$)({values:e.spacing,base:i});"object"==typeof a&&Object.keys(a).forEach((e,t,r)=>{let n=a[e];if(!n){let n=t>0?a[r[t-1]]:"column";a[e]=n}}),r=(0,s.Z)(r,(0,y.k9)({theme:t},o,(t,r)=>e.useFlexGap?{gap:(0,v.NA)(n,t)}:{"& > :not(style):not(style)":{margin:0},"& > :not(style) ~ :not(style)":{[`margin${getSideFromDirection(r?a[r]:e.direction)}`]:(0,v.NA)(n,t)}}))}return(0,y.dt)(t.breakpoints,r)};var b=r(35843),Z=r(87927);let j=function(e={}){let{createStyledComponent:t=g,useThemeProps:r=useThemePropsDefault,componentName:s="MuiStack"}=e,useUtilityClasses=()=>(0,l.Z)({root:["root"]},e=>(0,c.Z)(s,e),{}),u=t(style),d=a.forwardRef(function(e,t){let s=r(e),l=(0,p.Z)(s),{component:c="div",direction:d="column",spacing:h=0,divider:y,children:v,className:x,useFlexGap:g=!1}=l,b=(0,n.Z)(l,m),Z=useUtilityClasses();return(0,f.jsx)(u,(0,i.Z)({as:c,ownerState:{direction:d,spacing:h,useFlexGap:g},ref:t,className:(0,o.Z)(Z.root,x)},b,{children:y?function(e,t){let r=a.Children.toArray(e).filter(Boolean);return r.reduce((e,n,i)=>(e.push(n),i<r.length-1&&e.push(a.cloneElement(t,{key:`separator-${i}`})),e),[])}(v,y):v}))});return d}({createStyledComponent:(0,b.ZP)("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,t)=>t.root}),useThemeProps:e=>(0,Z.Z)({props:e,name:"MuiStack"})});var w=j},43226:function(e,t,r){"use strict";r.d(t,{Z:function(){return b}});var n=r(20791),i=r(13428),a=r(2265),o=r(57042),s=r(43381),l=r(95600),c=r(35843),u=r(87927),d=r(28702),p=r(26520),h=r(25702);function getTypographyUtilityClass(e){return(0,h.Z)("MuiTypography",e)}(0,p.Z)("MuiTypography",["root","h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","inherit","button","caption","overline","alignLeft","alignRight","alignCenter","alignJustify","noWrap","gutterBottom","paragraph"]);var y=r(57437);let v=["align","className","component","gutterBottom","noWrap","paragraph","variant","variantMapping"],useUtilityClasses=e=>{let{align:t,gutterBottom:r,noWrap:n,paragraph:i,variant:a,classes:o}=e,s={root:["root",a,"inherit"!==e.align&&`align${(0,d.Z)(t)}`,r&&"gutterBottom",n&&"noWrap",i&&"paragraph"]};return(0,l.Z)(s,getTypographyUtilityClass,o)},f=(0,c.ZP)("span",{name:"MuiTypography",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,r.variant&&t[r.variant],"inherit"!==r.align&&t[`align${(0,d.Z)(r.align)}`],r.noWrap&&t.noWrap,r.gutterBottom&&t.gutterBottom,r.paragraph&&t.paragraph]}})(({theme:e,ownerState:t})=>(0,i.Z)({margin:0},"inherit"===t.variant&&{font:"inherit"},"inherit"!==t.variant&&e.typography[t.variant],"inherit"!==t.align&&{textAlign:t.align},t.noWrap&&{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},t.gutterBottom&&{marginBottom:"0.35em"},t.paragraph&&{marginBottom:16})),m={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",subtitle1:"h6",subtitle2:"h6",body1:"p",body2:"p",inherit:"p"},x={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},transformDeprecatedColors=e=>x[e]||e,g=a.forwardRef(function(e,t){let r=(0,u.Z)({props:e,name:"MuiTypography"}),a=transformDeprecatedColors(r.color),l=(0,s.Z)((0,i.Z)({},r,{color:a})),{align:c="inherit",className:d,component:p,gutterBottom:h=!1,noWrap:x=!1,paragraph:g=!1,variant:b="body1",variantMapping:Z=m}=l,j=(0,n.Z)(l,v),w=(0,i.Z)({},l,{align:c,color:a,className:d,component:p,gutterBottom:h,noWrap:x,paragraph:g,variant:b,variantMapping:Z}),k=p||(g?"p":Z[b]||m[b])||"span",S=useUtilityClasses(w);return(0,y.jsx)(f,(0,i.Z)({as:k,ref:t,ownerState:w,className:(0,o.Z)(S.root,d)},j))});var b=g},41101:function(e,t,r){"use strict";r.d(t,{Z:function(){return useTheme}}),r(2265);var n=r(95270),i=r(53794),a=r(53469);function useTheme(){let e=(0,n.Z)(i.Z);return e[a.Z]||e}},43381:function(e,t,r){"use strict";r.d(t,{Z:function(){return extendSxProp}});var n=r(13428),i=r(20791),a=r(15959),o=r(58122);let s=["sx"],splitProps=e=>{var t,r;let n={systemProps:{},otherProps:{}},i=null!=(t=null==e||null==(r=e.theme)?void 0:r.unstable_sxConfig)?t:o.Z;return Object.keys(e).forEach(t=>{i[t]?n.systemProps[t]=e[t]:n.otherProps[t]=e[t]}),n};function extendSxProp(e){let t;let{sx:r}=e,o=(0,i.Z)(e,s),{systemProps:l,otherProps:c}=splitProps(o);return t=Array.isArray(r)?[l,...r]:"function"==typeof r?(...e)=>{let t=r(...e);return(0,a.P)(t)?(0,n.Z)({},l,t):l}:(0,n.Z)({},l,r),(0,n.Z)({},c,{sx:t})}},39190:function(e,t,r){"use strict";var n=r(61047);let i=(0,n.ZP)();t.Z=i},20100:function(e,t,r){Promise.resolve().then(r.bind(r,52586))},52586:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return page}});var n,i,a,o=r(57437),s=r(90952);function _extends(){return(_extends=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}var hive_cross=function(e){return s.createElement("svg",_extends({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 687 657"},e),n||(n=s.createElement("path",{fill:"url(#hive-cross_svg__a)",d:"M0 0v85.621l210.087 121.011v242.594L0 570.808v85.621l284.302-164.393V164.393L0 0Z"})),i||(i=s.createElement("path",{fill:"url(#hive-cross_svg__b)",d:"M686.777 85.621V0L402.475 164.393v328.214L686.777 657v-85.621L476.69 449.797V206.632l210.087-121.01Z"})),a||(a=s.createElement("defs",null,s.createElement("linearGradient",{id:"hive-cross_svg__a",x1:142.151,x2:142.151,y1:0,y2:656.429,gradientUnits:"userSpaceOnUse"},s.createElement("stop",{stopColor:"#FF8A00"}),s.createElement("stop",{offset:1})),s.createElement("linearGradient",{id:"hive-cross_svg__b",x1:544.626,x2:544.626,y1:0,y2:657,gradientUnits:"userSpaceOnUse"},s.createElement("stop",{stopColor:"#FF8A00"}),s.createElement("stop",{offset:1})))))},l=r(42463),c=r(40542),u=r(97716),d=r(13457),p=r(43226),h=r(28874),y=r(36126),v=r(57958),f=r(14776),m=r(61396),x=r.n(m),g=r(24033),b=r(2265),page=()=>{let{mounted:e}=(0,u.s)();(0,g.useRouter)();let[t]=(0,c.V)(f.jU),[r]=(0,c.V)(v.Bx),n=null==r?void 0:r.hive(),[i]=(0,c.V)(null==n?void 0:n.vaultStatus$),[a]=(0,c.V)(null==n?void 0:n.vaultAddress$),[s]=(0,c.V)(null==n?void 0:n.vaultInfo$),[m,Z]=(0,b.useState)(""),[j,w]=(0,b.useState)(""),getDisplayableStorageSizeMB=e=>parseFloat((e/1048576).toFixed(2));return((0,b.useEffect)(()=>{s&&(Z(getDisplayableStorageSizeMB(s.getStorageUsed())+" MB"),w(getDisplayableStorageSizeMB(s.getStorageQuota())+" MB"))},[s]),e)?(0,o.jsxs)("div",{className:"col-span-full flex flex-col",children:[(0,o.jsx)(l.O,{entries:["storage"]}),(0,o.jsx)(d.Z,{className:"p-4",direction:"row",justifyContent:"center",children:(0,o.jsx)(hive_cross,{width:80,height:80})}),(0,o.jsxs)(p.Z,{children:["We have associated your identity with an Elastos ",(0,o.jsx)("b",{children:"Hive Storage"}),". Hive is a decentralized network of independant servers that store data. You can choose to use a default vault provider, or your own vault storage at home. For now, only your identity avatar is stored on your hive vault."]}),(0,o.jsx)("div",{className:"font-bold mt-4",children:"Hive storage status"}),(0,o.jsxs)("div",{children:[i===y.V.NotChecked&&"Checking",i===y.V.Subscribing&&"Subscribing",i===y.V.ReadyToUse&&"Ready to use",i===y.V.UnknownError&&"Failed to retrieve status"]}),(0,o.jsx)("div",{className:"font-bold mt-4",children:"Information about your vault"}),s&&(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)(h.ZP,{container:!0,spacing:2,sx:{},children:[(0,o.jsx)(h.ZP,{item:!0,xs:6,children:(0,o.jsx)(p.Z,{variant:"body1",sx:{color:"text.secondary"},children:"Storage provider:"})}),(0,o.jsx)(h.ZP,{item:!0,xs:6,children:(0,o.jsx)(p.Z,{variant:"body1",sx:{color:"text.secondary"},children:a})}),(0,o.jsx)(h.ZP,{item:!0,xs:6,children:(0,o.jsx)(p.Z,{variant:"body1",sx:{color:"text.secondary"},children:"Max storage:"})}),(0,o.jsx)(h.ZP,{item:!0,xs:6,children:(0,o.jsx)(p.Z,{variant:"body1",sx:{color:"text.secondary"},children:j})}),(0,o.jsx)(h.ZP,{item:!0,xs:6,children:(0,o.jsx)(p.Z,{variant:"body1",sx:{color:"text.secondary"},children:"File storage in use:"})}),(0,o.jsx)(h.ZP,{item:!0,xs:6,children:(0,o.jsx)(p.Z,{variant:"body1",sx:{color:"text.secondary"},children:m})}),(0,o.jsx)(h.ZP,{item:!0,xs:6,children:(0,o.jsx)(p.Z,{variant:"body1",sx:{color:"text.secondary"},children:"Creation date:"})}),(0,o.jsx)(h.ZP,{item:!0,xs:6,children:(0,o.jsx)(p.Z,{variant:"body1",sx:{color:"text.secondary"},children:s.getStartTime().toDateString()})})]})}),(0,o.jsx)(x(),{target:"_blank",href:"https://hivehub.xyz/",className:"mt-4",children:"Manage my hive vault on hivehub.xyz"})]}):null}},42463:function(e,t,r){"use strict";r.d(t,{O:function(){return Breadcrumbs}});var n,i,a=r(57437),o=r(61396),s=r.n(o),l=r(90952);function _extends(){return(_extends=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function security_verified_extends(){return(security_verified_extends=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}let c=[{key:"dashboard",icon:(0,a.jsx)(function(e){return l.createElement("svg",_extends({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24"},e),n||(n=l.createElement("path",{fill:"currentColor",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6.5 20v-9H3l9-6 9 6h-3.5v9h-3v-3.5A1.5 1.5 0 0 0 13 15h-2a1.5 1.5 0 0 0-1.5 1.5V20h-3Z"})))},{}),title:"Dashboard",path:"/dashboard"},{key:"profile",title:"Profile",path:"/profile"},{key:"account-profile",title:"Account profile",path:"/account/profile"},{key:"security-center",icon:(0,a.jsx)(function(e){return l.createElement("svg",security_verified_extends({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 48 48"},e),i||(i=l.createElement("g",{"data-name":"Layer 2"},l.createElement("path",{fill:"none",d:"M0 0h48v48H0z","data-name":"invisible box"}),l.createElement("path",{fill:"currentColor",d:"M24 2S6 7.1 6 8v18.2c0 9.2 13.3 17.3 17 19.5a1.8 1.8 0 0 0 2 0c3.8-2.1 17-10.3 17-19.5V8c0-.9-18-6-18-6Zm9.4 16.4-11 11a1.9 1.9 0 0 1-2.8 0l-4.9-4.9a2.2 2.2 0 0 1-.4-2.7 2 2 0 0 1 3.1-.2l3.6 3.6 9.6-9.6a2 2 0 0 1 2.8 2.8Z","data-name":"icons Q2"}))))},{}),title:"Security center",path:"/account/security"},{key:"bind-browser",title:"Bind browser",path:"/account/security/bind-passkey"},{key:"bind-email",title:"Bind email",path:"/account/security/bind-email"},{key:"bind-password",title:"Bind password",path:"/account/security/bind-password"},{key:"credentials-list",title:"All credentials",path:"/account/credentials/list"},{key:"delete-identity",title:"Identity deletion",path:"/delete-identity"},{key:"storage",title:"Storage",path:"/storage"},{key:"applications",title:"Applications",path:"/applications"},{key:"developers",title:"Developers",path:"/developers"},{key:"application-details",title:"Application details"}];function bcEntryToItem(e){let t=c.find(t=>t.key===e);if(!t)throw Error("Unknown breadcrumbs item ".concat(e));return t}let BreadcrumbsElement=e=>{let{item:t}=e,{icon:r,title:n,path:i}=t;return(0,a.jsxs)("div",{className:"flex flex-row items-center justify-center",children:[r&&(0,a.jsx)("div",{className:"mr-1",style:{width:18,height:18,color:"var(--primary-color)"},children:r}),i&&(0,a.jsx)(s(),{href:i,className:" bg-gray-200 px-3 py-1 rounded-lg",style:{fontSize:14},children:n}),!i&&(0,a.jsx)("div",{children:n})]})},Separator=()=>(0,a.jsx)("div",{className:"mx-2",children:"/"}),Breadcrumbs=e=>{let{entries:t}=e,r=bcEntryToItem("dashboard"),n=[r,...t.map(e=>bcEntryToItem(e))];return(0,a.jsx)("div",{className:"flex flex-row items-center w-full justify-center",children:n.map((e,t)=>(0,a.jsxs)("div",{className:"flex flex-row items-center",children:[(0,a.jsx)(BreadcrumbsElement,{item:e}),t<n.length-1&&(0,a.jsx)(Separator,{})]},t))})}},40542:function(e,t,r){"use strict";r.d(t,{V:function(){return useBehaviorSubject}});var n=r(2265);let useBehaviorSubject=e=>{let[t,r]=(0,n.useState)(null==e?void 0:e.getValue()),[i,a]=(0,n.useState)();return(0,n.useEffect)(()=>{if(!e){r(null);return}let t=e.subscribe({next:e=>{r(e)},error:a});return()=>t.unsubscribe()},[e]),[t]}},97716:function(e,t,r){"use strict";r.d(t,{s:function(){return useMounted}});var n=r(2265);let useMounted=()=>{let[e,t]=(0,n.useState)(!1);return(0,n.useEffect)(()=>{t(!0)},[]),{mounted:e}}},24033:function(e,t,r){e.exports=r(20290)}},function(e){e.O(0,[6990,9787,9443,8218,3988,395,8321,3824,6642,1396,8874,3262,2971,7864,1744],function(){return e(e.s=20100)}),_N_E=e.O()}]);