(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6279,925],{43226:function(e,t,n){"use strict";n.d(t,{Z:function(){return j}});var i=n(20791),r=n(13428),l=n(2265),o=n(57042),a=n(43381),s=n(95600),c=n(35843),u=n(87927),d=n(28702),h=n(26520),p=n(25702);function getTypographyUtilityClass(e){return(0,p.Z)("MuiTypography",e)}(0,h.Z)("MuiTypography",["root","h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","inherit","button","caption","overline","alignLeft","alignRight","alignCenter","alignJustify","noWrap","gutterBottom","paragraph"]);var m=n(57437);let f=["align","className","component","gutterBottom","noWrap","paragraph","variant","variantMapping"],useUtilityClasses=e=>{let{align:t,gutterBottom:n,noWrap:i,paragraph:r,variant:l,classes:o}=e,a={root:["root",l,"inherit"!==e.align&&`align${(0,d.Z)(t)}`,n&&"gutterBottom",i&&"noWrap",r&&"paragraph"]};return(0,s.Z)(a,getTypographyUtilityClass,o)},x=(0,c.ZP)("span",{name:"MuiTypography",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,n.variant&&t[n.variant],"inherit"!==n.align&&t[`align${(0,d.Z)(n.align)}`],n.noWrap&&t.noWrap,n.gutterBottom&&t.gutterBottom,n.paragraph&&t.paragraph]}})(({theme:e,ownerState:t})=>(0,r.Z)({margin:0},"inherit"===t.variant&&{font:"inherit"},"inherit"!==t.variant&&e.typography[t.variant],"inherit"!==t.align&&{textAlign:t.align},t.noWrap&&{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},t.gutterBottom&&{marginBottom:"0.35em"},t.paragraph&&{marginBottom:16})),g={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",subtitle1:"h6",subtitle2:"h6",body1:"p",body2:"p",inherit:"p"},v={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},transformDeprecatedColors=e=>v[e]||e,Z=l.forwardRef(function(e,t){let n=(0,u.Z)({props:e,name:"MuiTypography"}),l=transformDeprecatedColors(n.color),s=(0,a.Z)((0,r.Z)({},n,{color:l})),{align:c="inherit",className:d,component:h,gutterBottom:p=!1,noWrap:v=!1,paragraph:Z=!1,variant:j="body1",variantMapping:y=g}=s,w=(0,i.Z)(s,f),b=(0,r.Z)({},s,{align:c,color:l,className:d,component:h,gutterBottom:p,noWrap:v,paragraph:Z,variant:j,variantMapping:y}),N=h||(Z?"p":y[j]||g[j])||"span",S=useUtilityClasses(b);return(0,m.jsx)(x,(0,r.Z)({as:N,ref:t,ownerState:b,className:(0,o.Z)(S.root,d)},w))});var j=Z},41101:function(e,t,n){"use strict";n.d(t,{Z:function(){return useTheme}}),n(2265);var i=n(95270),r=n(53794),l=n(53469);function useTheme(){let e=(0,i.Z)(r.Z);return e[l.Z]||e}},22135:function(e,t,n){"use strict";n.d(t,{Z:function(){return useMediaQuery}});var i,r=n(2265),l=n(44809),o=n(51529),a=n(88519);let s=(i||(i=n.t(r,2))).useSyncExternalStore;function useMediaQuery(e,t={}){let n=(0,l.Z)(),i="undefined"!=typeof window&&void 0!==window.matchMedia,{defaultMatches:c=!1,matchMedia:u=i?window.matchMedia:null,ssrMatchMedia:d=null,noSsr:h=!1}=(0,o.Z)({name:"MuiUseMediaQuery",props:t,theme:n}),p="function"==typeof e?e(n):e;p=p.replace(/^@media( ?)/m,"");let m=(void 0!==s?function(e,t,n,i,l){let o=r.useCallback(()=>t,[t]),a=r.useMemo(()=>{if(l&&n)return()=>n(e).matches;if(null!==i){let{matches:t}=i(e);return()=>t}return o},[o,e,i,l,n]),[c,u]=r.useMemo(()=>{if(null===n)return[o,()=>()=>{}];let t=n(e);return[()=>t.matches,e=>(t.addListener(e),()=>{t.removeListener(e)})]},[o,n,e]),d=s(u,c,a);return d}:function(e,t,n,i,l){let[o,s]=r.useState(()=>l&&n?n(e).matches:i?i(e).matches:t);return(0,a.Z)(()=>{let t=!0;if(!n)return;let i=n(e),updateMatch=()=>{t&&s(i.matches)};return updateMatch(),i.addListener(updateMatch),()=>{t=!1,i.removeListener(updateMatch)}},[e,n]),o})(p,c,u,d,h);return m}},59782:function(e,t,n){"use strict";n.d(t,{Z:function(){return createSvgIcon}});var i=n(13428),r=n(2265),l=n(20791),o=n(57042),a=n(95600),s=n(28702),c=n(87927),u=n(35843),d=n(26520),h=n(25702);function getSvgIconUtilityClass(e){return(0,h.Z)("MuiSvgIcon",e)}(0,d.Z)("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);var p=n(57437);let m=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],useUtilityClasses=e=>{let{color:t,fontSize:n,classes:i}=e,r={root:["root","inherit"!==t&&`color${(0,s.Z)(t)}`,`fontSize${(0,s.Z)(n)}`]};return(0,a.Z)(r,getSvgIconUtilityClass,i)},f=(0,u.ZP)("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,"inherit"!==n.color&&t[`color${(0,s.Z)(n.color)}`],t[`fontSize${(0,s.Z)(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,i,r,l,o,a,s,c,u,d,h,p,m;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:null==(n=e.transitions)||null==(i=n.create)?void 0:i.call(n,"fill",{duration:null==(r=e.transitions)||null==(r=r.duration)?void 0:r.shorter}),fontSize:({inherit:"inherit",small:(null==(l=e.typography)||null==(o=l.pxToRem)?void 0:o.call(l,20))||"1.25rem",medium:(null==(a=e.typography)||null==(s=a.pxToRem)?void 0:s.call(a,24))||"1.5rem",large:(null==(c=e.typography)||null==(u=c.pxToRem)?void 0:u.call(c,35))||"2.1875rem"})[t.fontSize],color:null!=(d=null==(h=(e.vars||e).palette)||null==(h=h[t.color])?void 0:h.main)?d:({action:null==(p=(e.vars||e).palette)||null==(p=p.action)?void 0:p.active,disabled:null==(m=(e.vars||e).palette)||null==(m=m.action)?void 0:m.disabled,inherit:void 0})[t.color]}}),x=r.forwardRef(function(e,t){let n=(0,c.Z)({props:e,name:"MuiSvgIcon"}),{children:a,className:s,color:u="inherit",component:d="svg",fontSize:h="medium",htmlColor:x,inheritViewBox:g=!1,titleAccess:v,viewBox:Z="0 0 24 24"}=n,j=(0,l.Z)(n,m),y=r.isValidElement(a)&&"svg"===a.type,w=(0,i.Z)({},n,{color:u,component:d,fontSize:h,instanceFontSize:e.fontSize,inheritViewBox:g,viewBox:Z,hasSvgAsChild:y}),b={};g||(b.viewBox=Z);let N=useUtilityClasses(w);return(0,p.jsxs)(f,(0,i.Z)({as:d,className:(0,o.Z)(N.root,s),focusable:"false",color:x,"aria-hidden":!v||void 0,role:v?"img":void 0,ref:t},b,j,y&&a.props,{ownerState:w,children:[y?a.props.children:a,v?(0,p.jsx)("title",{children:v}):null]}))});function createSvgIcon(e,t){function Component(n,r){return(0,p.jsx)(x,(0,i.Z)({"data-testid":`${t}Icon`,ref:r},n,{children:e}))}return Component.muiName=x.muiName,r.memo(r.forwardRef(Component))}x.muiName="SvgIcon"},10673:function(e,t,n){"use strict";n.d(t,{Z:function(){return utils_isMuiElement}});var i=n(2265),utils_isMuiElement=function(e,t){var n,r;return i.isValidElement(e)&&-1!==t.indexOf(null!=(n=e.type.muiName)?n:null==(r=e.type)||null==(r=r._payload)||null==(r=r.value)?void 0:r.muiName)}},88519:function(e,t,n){"use strict";var i=n(1091);t.Z=i.Z},78078:function(e,t,n){"use strict";function debounce(e,t=166){let n;function debounced(...i){clearTimeout(n),n=setTimeout(()=>{e.apply(this,i)},t)}return debounced.clear=()=>{clearTimeout(n)},debounced}n.d(t,{Z:function(){return debounce}})},96278:function(e,t,n){"use strict";function ownerDocument(e){return e&&e.ownerDocument||document}n.d(t,{Z:function(){return ownerDocument}})},88221:function(e,t,n){"use strict";n.d(t,{Z:function(){return ownerWindow}});var i=n(96278);function ownerWindow(e){let t=(0,i.Z)(e);return t.defaultView||window}},54786:function(e,t,n){Promise.resolve().then(n.bind(n,18954))},50480:function(e,t,n){"use strict";n.d(t,{m:function(){return m}});var i=n(57437),r=n(35843),l=n(15133),o=n(88469),a=n(96507),s=n(43226),c=n(23785),u=n(66267),d=n(43753),h=n(29166),p=n(97716);let m=(0,r.ZP)(l.Z)(e=>{let{theme:t}=e;return{border:"1px solid #FFFFFF55",borderRadius:"0.5rem",position:"relative"}});t.Z=e=>{let{title:t,icon:n,children:r,className:l="",isSet:f=null,statusTitle:x,actionTitle:g,handleAction:v=()=>{},actionInProgress:Z=!1,disabledAction:j=!1,disabledSkel:y=!1,loaded:w=null}=e,{mounted:b}=(0,p.s)(),N=null!==w?w:b;return(0,i.jsx)(m,{className:l,elevation:0,children:(0,i.jsxs)(o.Z,{className:"relative z-10 flex flex-col h-full",sx:{px:3,pt:1},children:[(0,i.jsxs)(a.Z,{className:"pb-4 pt-2 flex items-center",children:[(0,i.jsx)(u.C,{children:n}),(0,i.jsx)(s.Z,{className:"flex-1",variant:"h6",fontWeight:600,sx:{ml:1},children:t}),b&&null!==f&&(0,i.jsx)(d.Z,{isPassed:f,title:x,size:d.V.SMALL})]}),y?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("div",{className:"flex-1 pb-[5%]",children:r}),(0,i.jsx)(c.Kz,{onClick:v,loading:!N||Z,disabled:j,children:N?g:"LOADING ..."})]}):(0,i.jsx)(i.Fragment,{children:N?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("div",{className:"flex-1 pb-[5%]",children:r}),(0,i.jsx)(c.Kz,{onClick:v,loading:Z,disabled:j,children:g})]}):(0,i.jsx)(h.g4,{})})]})})}},18954:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return page}});var i=n(57437),r=n(15707),l=n(40542),o=n(14776),a=n(2265),s=n(96507),c=n(13457),u=n(52653),d=n(43226),h=n(92e3),p=n(50480),m=n(96283),f=n(79673),components_AppSection=e=>{let{appIdentity:t}=e,[n]=(0,l.V)(null==t?void 0:t.credentials().credentials$),[r,o]=(0,a.useState)(null),[x,g]=(0,a.useState)(null),v=(0,h.useRouter)();return(0,a.useEffect)(()=>{o(null==t?void 0:t.credentials().getCredentialByType("ApplicationCredential"))},[t,n]),(0,a.useEffect)(()=>{r&&g(null==r?void 0:r.getSubject().getProperty("name"))},[r]),(0,i.jsx)(p.m,{elevation:0,children:(0,i.jsxs)(s.Z,{className:"relative z-10 flex flex-col h-full p-4",children:[(0,i.jsxs)(c.Z,{direction:"row",spacing:1.5,pb:1,children:[(0,i.jsx)(u.Z,{sx:{p:0},color:"inherit",onClick:()=>{v.push("/developers/application?did=".concat(t.did))},children:(0,i.jsx)(m.J,{credential:r,width:32,height:32})}),(0,i.jsxs)(c.Z,{children:[(0,i.jsx)(d.Z,{variant:"body2",fontWeight:600,children:x}),(0,i.jsx)(d.Z,{variant:"caption",fontStyle:"italic",fontSize:9,children:null==r?void 0:r.createdAt.toLocaleString()})]})]}),(0,i.jsx)(f.Z,{value:t.did,outerProps:{readOnly:!0},inputProps:{className:"opacity-80",style:{fontSize:12}}})]})})},x=n(28874),page=()=>{let[e]=(0,l.V)(o.jU),t=null==e?void 0:e.get("identity"),[n]=(0,l.V)(null==t?void 0:t.applicationIdentities$);return(0,i.jsxs)("div",{className:"col-span-full",children:[(0,i.jsx)(r.Z,{title:"Developer applications",description:"Developer applications that created with your identity. These applications are instrumental in communicating with the identity framework to provide enriched services and tailored experiences.",showBg:!0}),n&&(0,i.jsx)(x.ZP,{container:!0,spacing:2,children:n.map(e=>(0,i.jsx)(x.ZP,{item:!0,xs:12,sm:6,xl:4,children:(0,i.jsx)(components_AppSection,{appIdentity:e})},e.did))})]})}},79673:function(e,t,n){"use strict";var i=n(57437);n(2265);var r=n(35843),l=n(90923),o=n(84081),a=n(81679),s=n(23785);let c=(0,r.ZP)(l.Z)(e=>{let{theme:t}=e;return{input:{color:"white"}}}),u=(0,r.ZP)(o.Z)(e=>{let{theme:t}=e;return{".MuiInputBase-root":{paddingRight:8},".MuiInputBase-root:hover:not(.Mui-disabled, .Mui-error)":{fieldset:{opacity:.4}},".MuiInputBase-root.Mui-focused":{fieldset:{opacity:.6,borderColor:"white"}}}});t.Z=e=>{let{value:t,outerProps:n={},inputProps:r={}}=e;return(0,i.jsx)(u,{children:(0,i.jsx)(c,{...n,value:t,size:"small",type:"input",inputProps:{...r},endAdornment:(0,i.jsx)(a.Z,{position:"end",children:(0,i.jsx)(s.qi,{text:t,iconWidth:18})})})})}},96283:function(e,t,n){"use strict";n.d(t,{J:function(){return CredentialAvatar}});var i=n(57437),r=n(57042),l=n(16691),o=n.n(l),a=n(22135),s=n(3283),c=n(41101),u=n(40542);let CredentialAvatar=e=>{let{credential:t,width:n=60,height:l=60,className:d}=e,[h]=(0,u.V)(null==t?void 0:t.representativeIcon$),p=(0,c.Z)(),m=(0,a.Z)(p.breakpoints.between("sm","md")),f=(0,a.Z)(p.breakpoints.down("sm")),x=f&&.75||m&&.9||1;return(0,i.jsx)(s.Z,{sx:{width:n*x,height:l*x,padding:"string"==typeof h?0:"".concat(.125*Math.floor(n*x/8),"rem"),backgroundColor:"#7575754d"},className:(0,r.Z)(d),children:"string"==typeof h?(0,i.jsx)(o(),{src:h,alt:"",width:n*x,height:l*x}):h})}},66267:function(e,t,n){"use strict";n.d(t,{C:function(){return a}});var i=n(57437),r=n(3283),l=n(43226),o=n(35843);let a=(0,o.ZP)(r.Z)(e=>{let{theme:t}=e;return{backgroundColor:"#9D3E3E",color:"white",width:36,height:36,padding:8}});t.Z=e=>{let{icon:t,title:n,description:r,className:o=""}=e;return(0,i.jsxs)("div",{className:"text-[#DDD] ".concat(o),children:[(0,i.jsx)("div",{className:"inline-flex pb-1",children:(0,i.jsx)(a,{children:t})}),(0,i.jsx)(l.Z,{variant:"body1",className:"underline underline-offset-2",children:n}),(0,i.jsx)(l.Z,{variant:"body2",children:r})]})}},43753:function(e,t,n){"use strict";n.d(t,{V:function(){return r}});var i,r,l=n(57437),o=n(57042),a=n(96507);(i=r||(r={}))[i.SMALL=7]="SMALL",i[i.MEDIUM=8]="MEDIUM",i[i.LARGE=9]="LARGE",t.Z=e=>{let{isPassed:t,title:n,size:i=8}=e;return(0,l.jsx)(a.Z,{className:(0,o.Z)("rounded-md text-[".concat(i,"pt] px-3 py-0.5 inline-block text-white whitespace-nowrap"),t?"bg-[#34A853]":"bg-[#EA4335]"),children:n})}},15707:function(e,t,n){"use strict";var i=n(57437),r=n(35843),l=n(43226);let o=(0,r.ZP)("div")(e=>{let{showBg:t}=e;return{marginBottom:"1.5rem",background:t?"url('/headline-banner.png') no-repeat center center / cover":"none"}});t.Z=e=>{let{title:t,description:n,showBg:r=!1}=e;return(0,i.jsxs)(o,{showBg:r,className:r?"p-4 sm:p-6 rounded-lg":"",children:[(0,i.jsx)(l.Z,{className:"w-full pb-4 sm:pb-8",variant:"h3",color:"text.primary",children:t}),(0,i.jsx)(l.Z,{className:"mt-4",variant:"body1",color:"text.primary",children:n})]})}},23446:function(e,t,n){"use strict";var i=n(57437),r=n(50724),l=n(41101),o=n(75973);t.Z=e=>{let{children:t}=e,n=(0,l.Z)(),a="dark"===n.palette.mode?o.j:{};return(0,i.jsx)(r.y,{...a,children:t})}},29166:function(e,t,n){"use strict";n.d(t,{V$:function(){return loading_skeleton_AccountName},kY:function(){return loading_skeleton_ApplicationItem},GE:function(){return loading_skeleton_ApplicationCard},xG:function(){return loading_skeleton_ApplicationProfile},Wo:function(){return loading_skeleton_Card},RZ:function(){return loading_skeleton_CredentialItem},D4:function(){return loading_skeleton_OneLineText},_H:function(){return loading_skeleton_ProfileInfo},g4:function(){return loading_skeleton_SecurityContent},IT:function(){return loading_skeleton_TableAvatarRow}});var i=n(57437),r=n(41101),l=n(98489),o=n(30666),a=n(50724);n(3436);var s=n(75973),loading_skeleton_TableAvatarRow=e=>{let{colSpan:t=2}=e,n=(0,r.Z)(),c="dark"===n.palette.mode?s.j:{};return(0,i.jsx)(a.y,{...c,children:(0,i.jsxs)(l.Z,{className:"h-[3.5rem]",children:[(0,i.jsx)(o.Z,{children:(0,i.jsx)(a.Z,{width:36,height:36,circle:!0})}),(0,i.jsx)(o.Z,{colSpan:t,children:(0,i.jsx)("h5",{style:{flexGrow:1},children:(0,i.jsx)(a.Z,{count:1})})})]})})},c=n(13457),loading_skeleton_ProfileInfo=()=>{let e=(0,r.Z)(),t="dark"===e.palette.mode?s.j:{};return(0,i.jsx)(a.y,{...t,children:(0,i.jsxs)(c.Z,{direction:"row",spacing:2,className:"w-full",alignItems:"center",children:[(0,i.jsx)(a.Z,{width:80,height:80,circle:!0,containerClassName:"leading-none"}),(0,i.jsxs)("h5",{className:"flex-1",children:[(0,i.jsx)(a.Z,{count:1,height:25,style:{lineHeight:3}}),(0,i.jsx)(a.Z,{count:1,height:12,containerClassName:"leading-none"})]})]})})},u=n(23446),loading_skeleton_SecurityContent=()=>(0,i.jsx)(u.Z,{children:(0,i.jsx)(c.Z,{direction:"row",spacing:2,className:"w-full",alignItems:"center",children:(0,i.jsx)("h5",{className:"flex-1",children:(0,i.jsx)(a.Z,{count:3})})})}),d=n(99267),loading_skeleton_Card=()=>(0,i.jsx)(u.Z,{children:(0,i.jsx)(d.Gt,{className:"w-full h-auto bg-neutral-950",waveIconVisible:!1,topRightSection:(0,i.jsx)("h5",{className:"w-[30%]",children:(0,i.jsx)(a.Z,{count:1,height:24})}),footer:(0,i.jsx)("h5",{className:"w-full",children:(0,i.jsx)(a.Z,{count:1})}),children:(0,i.jsxs)("div",{className:"flex flex-col mb-[5%]",children:[(0,i.jsx)("label",{htmlFor:"holder-name",className:"text-white text-[10px]",children:"IDENTITY NAME"}),(0,i.jsx)("h4",{children:(0,i.jsx)(a.Z,{count:1,height:28})})]})})}),loading_skeleton_ApplicationCard=()=>(0,i.jsx)(u.Z,{children:(0,i.jsx)(d.Gt,{className:"w-full h-auto bg-neutral-950",waveIconVisible:!1,footer:(0,i.jsx)("h5",{className:"w-full",children:(0,i.jsx)(a.Z,{count:1})}),children:(0,i.jsx)("div",{className:"w-full mb-[5%]",children:(0,i.jsx)("h4",{children:(0,i.jsx)(a.Z,{count:1,height:28})})})})}),h=n(50480),loading_skeleton_CredentialItem=()=>(0,i.jsx)(u.Z,{children:(0,i.jsx)("div",{className:"relative h-full cursor-pointer",children:(0,i.jsx)(h.m,{className:"h-full",elevation:0,sx:{px:"12px",py:"10px",display:"grid",verticalAlign:"middle"},children:(0,i.jsxs)(c.Z,{direction:"row",spacing:1,alignItems:"center",overflow:"hidden",sx:{height:42},children:[(0,i.jsx)(a.Z,{width:32,height:32,circle:!0,containerClassName:"leading-none"}),(0,i.jsx)("h4",{className:"w-full",children:(0,i.jsx)(a.Z,{containerClassName:"leading-tight block",count:2,height:12})})]})})})}),loading_skeleton_AccountName=()=>(0,i.jsx)(u.Z,{children:(0,i.jsx)("h5",{children:(0,i.jsx)(a.Z,{count:1,height:28})})}),loading_skeleton_ApplicationItem=()=>(0,i.jsx)(u.Z,{children:(0,i.jsx)("div",{className:"relative h-full cursor-pointer",children:(0,i.jsxs)(h.m,{className:"h-full",elevation:0,sx:{px:"12px",py:"10px",display:"grid",verticalAlign:"middle"},children:[(0,i.jsxs)(c.Z,{direction:"row",spacing:1,alignItems:"center",overflow:"hidden",children:[(0,i.jsx)(a.Z,{width:32,height:32,circle:!0,containerClassName:"leading-none"}),(0,i.jsx)("h4",{className:"w-full",children:(0,i.jsx)(a.Z,{containerClassName:"leading-tight block",count:2,height:12})})]}),(0,i.jsx)("h4",{className:"w-full mt-2",children:(0,i.jsx)(a.Z,{containerClassName:"leading-tight block",height:20})})]})})}),loading_skeleton_ApplicationProfile=()=>(0,i.jsx)(u.Z,{children:(0,i.jsxs)(c.Z,{spacing:2,className:"w-full",alignItems:"center",children:[(0,i.jsx)(a.Z,{width:88,height:88,circle:!0,containerClassName:"leading-none"}),(0,i.jsx)("h5",{className:"w-full max-w-sm",children:(0,i.jsx)(a.Z,{count:1,height:25,style:{lineHeight:3}})})]})}),loading_skeleton_OneLineText=e=>{let{height:t=14}=e;return(0,i.jsx)(u.Z,{children:(0,i.jsx)("h5",{children:(0,i.jsx)(a.Z,{count:1,height:t})})})}},75973:function(e,t,n){"use strict";n.d(t,{j:function(){return i}});let i={baseColor:"#333",highlightColor:"#4a4a4a"}},40542:function(e,t,n){"use strict";n.d(t,{V:function(){return useBehaviorSubject}});var i=n(2265);let useBehaviorSubject=e=>{let[t,n]=(0,i.useState)(null==e?void 0:e.getValue()),[r,l]=(0,i.useState)();return(0,i.useEffect)(()=>{if(!e){n(null);return}let t=e.subscribe({next:e=>{n(e)},error:l});return()=>t.unsubscribe()},[e]),[t]}},97716:function(e,t,n){"use strict";n.d(t,{s:function(){return useMounted}});var i=n(2265);let useMounted=()=>{let[e,t]=(0,i.useState)(!1);return(0,i.useEffect)(()=>{t(!0)},[]),{mounted:e}}}},function(e){e.O(0,[6990,9787,9443,8218,3988,395,5295,6506,8644,1510,1711,5146,9830,378,1396,2e3,3691,4558,2917,6691,8874,2602,7056,9267,2971,7864,1744],function(){return e(e.s=54786)}),_N_E=e.O()}]);