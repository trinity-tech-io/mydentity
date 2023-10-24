(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1135],{13362:function(e,t,r){"use strict";var n=r(26314);t.Z=void 0;var l=n(r(80984)),i=r(57437),a=(0,l.default)((0,i.jsx)("path",{d:"M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"}),"KeyboardArrowRight");t.Z=a},3283:function(e,t,r){"use strict";r.d(t,{Z:function(){return b}});var n=r(20791),l=r(13428),i=r(2265),a=r(57042),s=r(95600),o=r(35843),c=r(87927),d=r(59782),u=r(57437),h=(0,d.Z)((0,u.jsx)("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person"),m=r(26520),f=r(25702);function getAvatarUtilityClass(e){return(0,f.Z)("MuiAvatar",e)}(0,m.Z)("MuiAvatar",["root","colorDefault","circular","rounded","square","img","fallback"]);let x=["alt","children","className","component","imgProps","sizes","src","srcSet","variant"],useUtilityClasses=e=>{let{classes:t,variant:r,colorDefault:n}=e;return(0,s.Z)({root:["root",r,n&&"colorDefault"],img:["img"],fallback:["fallback"]},getAvatarUtilityClass,t)},g=(0,o.ZP)("div",{name:"MuiAvatar",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,t[r.variant],r.colorDefault&&t.colorDefault]}})(({theme:e,ownerState:t})=>(0,l.Z)({position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},"rounded"===t.variant&&{borderRadius:(e.vars||e).shape.borderRadius},"square"===t.variant&&{borderRadius:0},t.colorDefault&&(0,l.Z)({color:(e.vars||e).palette.background.default},e.vars?{backgroundColor:e.vars.palette.Avatar.defaultBg}:{backgroundColor:"light"===e.palette.mode?e.palette.grey[400]:e.palette.grey[600]}))),p=(0,o.ZP)("img",{name:"MuiAvatar",slot:"Img",overridesResolver:(e,t)=>t.img})({width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4}),v=(0,o.ZP)(h,{name:"MuiAvatar",slot:"Fallback",overridesResolver:(e,t)=>t.fallback})({width:"75%",height:"75%"}),j=i.forwardRef(function(e,t){let r=(0,c.Z)({props:e,name:"MuiAvatar"}),{alt:s,children:o,className:d,component:h="div",imgProps:m,sizes:f,src:j,srcSet:b,variant:Z="circular"}=r,y=(0,n.Z)(r,x),N=null,w=function({crossOrigin:e,referrerPolicy:t,src:r,srcSet:n}){let[l,a]=i.useState(!1);return i.useEffect(()=>{if(!r&&!n)return;a(!1);let l=!0,i=new Image;return i.onload=()=>{l&&a("loaded")},i.onerror=()=>{l&&a("error")},i.crossOrigin=e,i.referrerPolicy=t,i.src=r,n&&(i.srcset=n),()=>{l=!1}},[e,t,r,n]),l}((0,l.Z)({},m,{src:j,srcSet:b})),k=j||b,C=k&&"error"!==w,_=(0,l.Z)({},r,{colorDefault:!C,component:h,variant:Z}),A=useUtilityClasses(_);return N=C?(0,u.jsx)(p,(0,l.Z)({alt:s,src:j,srcSet:b,sizes:f,ownerState:_,className:A.img},m)):null!=o?o:k&&s?s[0]:(0,u.jsx)(v,{ownerState:_,className:A.fallback}),(0,u.jsx)(g,(0,l.Z)({as:h,ownerState:_,className:(0,a.Z)(A.root,d),ref:t},y,{children:N}))});var b=j},56176:function(e,t,r){"use strict";var n=r(13428),l=r(20791),i=r(2265),a=r(10093),s=r(41101),o=r(4439),c=r(37663),d=r(57437);let u=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function getScale(e){return`scale(${e}, ${e**2})`}let h={entering:{opacity:1,transform:getScale(1)},entered:{opacity:1,transform:"none"}},m="undefined"!=typeof navigator&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),f=i.forwardRef(function(e,t){let{addEndListener:r,appear:f=!0,children:x,easing:g,in:p,onEnter:v,onEntered:j,onEntering:b,onExit:Z,onExited:y,onExiting:N,style:w,timeout:k="auto",TransitionComponent:C=a.ZP}=e,_=(0,l.Z)(e,u),A=i.useRef(),E=i.useRef(),S=(0,s.Z)(),M=i.useRef(null),T=(0,c.Z)(M,x.ref,t),normalizedTransitionCallback=e=>t=>{if(e){let r=M.current;void 0===t?e(r):e(r,t)}},I=normalizedTransitionCallback(b),R=normalizedTransitionCallback((e,t)=>{let r;(0,o.n)(e);let{duration:n,delay:l,easing:i}=(0,o.C)({style:w,timeout:k,easing:g},{mode:"enter"});"auto"===k?(r=S.transitions.getAutoHeightDuration(e.clientHeight),E.current=r):r=n,e.style.transition=[S.transitions.create("opacity",{duration:r,delay:l}),S.transitions.create("transform",{duration:m?r:.666*r,delay:l,easing:i})].join(","),v&&v(e,t)}),z=normalizedTransitionCallback(j),F=normalizedTransitionCallback(N),D=normalizedTransitionCallback(e=>{let t;let{duration:r,delay:n,easing:l}=(0,o.C)({style:w,timeout:k,easing:g},{mode:"exit"});"auto"===k?(t=S.transitions.getAutoHeightDuration(e.clientHeight),E.current=t):t=r,e.style.transition=[S.transitions.create("opacity",{duration:t,delay:n}),S.transitions.create("transform",{duration:m?t:.666*t,delay:m?n:n||.333*t,easing:l})].join(","),e.style.opacity=0,e.style.transform=getScale(.75),Z&&Z(e)}),P=normalizedTransitionCallback(y);return i.useEffect(()=>()=>{clearTimeout(A.current)},[]),(0,d.jsx)(C,(0,n.Z)({appear:f,in:p,nodeRef:M,onEnter:R,onEntered:z,onEntering:I,onExit:D,onExited:P,onExiting:F,addEndListener:e=>{"auto"===k&&(A.current=setTimeout(e,E.current||0)),r&&r(M.current,e)},timeout:"auto"===k?null:k},_,{children:(e,t)=>i.cloneElement(x,(0,n.Z)({style:(0,n.Z)({opacity:0,transform:getScale(.75),visibility:"exited"!==e||p?void 0:"hidden"},h[e],w,x.props.style),ref:T},t))}))});f.muiSupportAuto=!0,t.Z=f},96855:function(e,t,r){Promise.resolve().then(r.bind(r,58595))},58595:function(e,t,r){"use strict";r.r(t);var n=r(57437),l=r(2265),i=r(92e3),a=r(71711),s=r(81679),o=r(56176),c=r(49050),d=r(23785),u=r(39513),h=r(49017),m=r(15707),f=r(40542),x=r(97716),g=r(13362),p=r(14776),v=r(11059),j=r(96479),b=r(19739);t.default=()=>{let[e,t]=(0,l.useState)(""),[r,Z]=(0,l.useState)(!1),[y]=(0,f.V)(p.jU),[N]=(0,f.V)(null==y?void 0:y.name$),{showErrorToast:w,showSuccessToast:k}=(0,b.p)(),{mounted:C}=(0,x.s)(),_=(0,i.useRouter)(),A=e&&e!==N;(0,l.useEffect)(()=>{N&&t(N)},[N]);let onUpdateUserName=async()=>{if(Z(!0),N===e){Z(!1);return}if(!y){w("Please login first."),Z(!1);return}await y.updateUserName(e),await (0,v.HA)(y),k("Account name successfully updated"),Z(!1)};return(0,n.jsxs)("div",{className:"col-span-full",children:[(0,n.jsx)(m.Z,{title:"Account Profile",description:"You have the flexibility to modify your account profile name at any time, allowing you to adapt and personalize it as often as you prefer to better suit your needs.",showBg:!0}),(0,n.jsx)("div",{className:"w-full flex justify-center py-4",children:(0,n.jsxs)("div",{className:"w-full sm:w-2/3 md:w-3/5 max-w-lg",children:[(0,n.jsx)(u.CA,{className:"relative w-full md:pb-2",children:(0,n.jsx)("div",{className:"absolute w-full h-full p-2",children:(0,n.jsx)("div",{className:"dashed-body w-full h-full rounded-2xl p-1.5",children:(0,n.jsxs)("div",{className:"flex flex-col h-full",children:[(0,n.jsx)("div",{className:"basis-[11%] overflow-hidden",children:(0,n.jsx)(u.Gt,{className:"w-full bg-[#523E21]"})}),(0,n.jsxs)("div",{className:"basis-[89%] overflow-hidden pt-2 relative",children:[(0,n.jsx)(u.Gt,{className:"w-full bg-neutral-950"}),(0,n.jsx)("div",{className:"compartment-top absolute bottom-[45%]"}),(0,n.jsx)("div",{className:"compartment absolute bottom-0 h-[45%] flex items-center",children:(0,n.jsx)("div",{className:"px-[10%] py-4 w-full",children:(0,n.jsxs)(h.Z,{fullWidth:!0,children:[(0,n.jsx)("label",{htmlFor:"holder-name",className:"text-white text-[10px] text-center",children:"ACCOUNT NAME"}),C&&y?(0,n.jsx)(a.Z,{id:"holder-name",autoFocus:!0,defaultValue:y.name$.getValue(),inputProps:{maxLength:30},startAdornment:(0,n.jsx)(s.Z,{position:"start"}),onChange:e=>{t(e.target.value)}}):(0,n.jsx)("div",{className:"pt-2",children:(0,n.jsx)(j.V$,{})})]})})})]})]})})})}),(0,n.jsxs)("div",{className:"flex items-center flex-col gap-4 w-full p-8",children:[C&&y&&(0,n.jsx)(o.Z,{in:!0,children:(0,n.jsx)(d.Kz,{loading:r,className:"w-full",onClick:onUpdateUserName,disabled:!A,children:"UPDATE NAME"})}),(0,n.jsx)(c.Z,{sx:{color:"#9D3E3E",textDecoration:"underline"},endIcon:(0,n.jsx)(g.Z,{}),onClick:()=>{_.push("/account/security/bind-email")},children:"Do you wish to update your email address instead?"})]})]})})]})}},50480:function(e,t,r){"use strict";r.d(t,{m:function(){return f}});var n=r(57437),l=r(23785),i=r(66267),a=r(96479),s=r(97716),o=r(15133),c=r(88469),d=r(96507),u=r(43226),h=r(35843),m=r(57042);let f=(0,h.ZP)(o.Z)(e=>{let{theme:t}=e;return{border:"1px solid #FFFFFF55",borderRadius:"0.5rem",position:"relative"}});t.Z=e=>{let{title:t,icon:r,children:o,className:h="",isSet:x=null,statusTitle:g,actionTitle:p,handleAction:v=()=>{},actionInProgress:j=!1,disabledAction:b=!1,disabledSkel:Z=!1,loaded:y=null}=e,{mounted:N}=(0,s.s)(),w=null!==y?y:N;return(0,n.jsx)(f,{className:h,elevation:0,children:(0,n.jsxs)(c.Z,{className:"relative z-10 flex flex-col h-full",sx:{px:3,pt:1},children:[(0,n.jsxs)(d.Z,{className:"pb-4 pt-2 flex items-center",children:[(0,n.jsx)(i.C,{children:r}),(0,n.jsx)(u.Z,{className:"flex-1",variant:"h6",fontWeight:600,sx:{ml:1},children:t}),N&&null!==x&&(0,n.jsx)(d.Z,{className:(0,m.Z)("rounded-md text-[7pt] px-3 py-0.5 inline-block text-white whitespace-nowrap",x?"bg-[#34A853]":"bg-[#EA4335]"),children:g})]}),Z?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("div",{className:"flex-1 pb-[5%]",children:o}),(0,n.jsx)(l.Kz,{onClick:v,loading:!w||j,disabled:b,children:w?p:"LOADING ..."})]}):(0,n.jsx)(n.Fragment,{children:w?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("div",{className:"flex-1 pb-[5%]",children:o}),(0,n.jsx)(l.Kz,{onClick:v,loading:j,disabled:b,children:p})]}):(0,n.jsx)(a.g4,{})})]})})}},66267:function(e,t,r){"use strict";r.d(t,{C:function(){return s}});var n=r(57437),l=r(3283),i=r(43226),a=r(35843);let s=(0,a.ZP)(l.Z)(e=>{let{theme:t}=e;return{backgroundColor:"#9D3E3E",color:"white",width:36,height:36,padding:8}});t.Z=e=>{let{icon:t,title:r,description:l,className:a=""}=e;return(0,n.jsxs)("div",{className:"text-[#DDD] ".concat(a),children:[(0,n.jsx)("div",{className:"inline-flex pb-1",children:(0,n.jsx)(s,{children:t})}),(0,n.jsx)(i.Z,{variant:"body1",className:"underline underline-offset-2",children:r}),(0,n.jsx)(i.Z,{variant:"body2",children:l})]})}},49017:function(e,t,r){"use strict";var n=r(35843),l=r(84081);let i=(0,n.ZP)(l.Z)(e=>{let{theme:t}=e;return{".MuiInput-root":{marginTop:0,"&:before, &:after":{opacity:.18,borderColor:"dark"==t.palette.mode?"white":t.palette.primary.main}},".MuiInputBase-root.MuiInput-root:hover:not(.Mui-disabled, .Mui-error)":{"&:before, &:after":{opacity:.18,borderColor:"dark"==t.palette.mode?"white":t.palette.primary.main}},".MuiInput-root.Mui-focused":{"&:before, &:after":{opacity:.3}},".MuiInputLabel-root, .MuiInputLabel-root.Mui-focused:not(.Mui-error)":{color:"white",fontSize:"10px",transform:"unset",WebkitTransform:"unset"},"#holder-name":{fontWeight:600,fontSize:"15pt",textAlign:"center",caretColor:"white",color:"rgb(255 255 255 / 65%)"},".password-input.redacted":{fontFamily:"Redacted Script"},".MuiFormHelperText-root":{marginLeft:0,display:"none"},".MuiFormHelperText-root.Mui-error, .MuiFormHelperText-root.visible":{display:"block"}}});t.Z=i},15707:function(e,t,r){"use strict";var n=r(57437),l=r(35843),i=r(43226);let a=(0,l.ZP)("div")(e=>{let{showBg:t}=e;return{marginBottom:"1.5rem",background:t?"url('/headline-banner.png') no-repeat center center / cover":"none"}});t.Z=e=>{let{title:t,description:r,showBg:l=!1}=e;return(0,n.jsxs)(a,{showBg:l,className:l?"p-6 rounded-lg":"",children:[(0,n.jsx)(i.Z,{className:"w-full pb-8",variant:"h3",color:"text.primary",children:t}),(0,n.jsx)(i.Z,{className:"mt-4",variant:"body1",color:"text.primary",children:r})]})}},96479:function(e,t,r){"use strict";r.d(t,{V$:function(){return loading_skeleton_AccountName},Wo:function(){return loading_skeleton_Card},RZ:function(){return loading_skeleton_CredentialItem},_H:function(){return loading_skeleton_ProfileInfo},g4:function(){return loading_skeleton_SecurityContent},IT:function(){return loading_skeleton_TableAvatarRow}});var n=r(57437),l=r(41101),i=r(98489),a=r(30666),s=r(50724);r(3436);let o={baseColor:"#333",highlightColor:"#4a4a4a"};var loading_skeleton_TableAvatarRow=e=>{let{colSpan:t=2}=e,r=(0,l.Z)(),c="dark"===r.palette.mode?o:{};return(0,n.jsx)(s.y,{...c,children:(0,n.jsxs)(i.Z,{className:"h-[3.5rem]",children:[(0,n.jsx)(a.Z,{children:(0,n.jsx)(s.Z,{width:36,height:36,circle:!0})}),(0,n.jsx)(a.Z,{colSpan:t,children:(0,n.jsx)("h5",{style:{flexGrow:1},children:(0,n.jsx)(s.Z,{count:1})})})]})})},c=r(13457),loading_skeleton_ProfileInfo=()=>{let e=(0,l.Z)(),t="dark"===e.palette.mode?o:{};return(0,n.jsx)(s.y,{...t,children:(0,n.jsxs)(c.Z,{direction:"row",spacing:2,className:"w-full",alignItems:"center",children:[(0,n.jsx)(s.Z,{width:80,height:80,circle:!0,containerClassName:"leading-none"}),(0,n.jsxs)("h5",{className:"flex-1",children:[(0,n.jsx)(s.Z,{count:1,height:25,style:{lineHeight:3}}),(0,n.jsx)(s.Z,{count:1,height:12,containerClassName:"leading-none"})]})]})})},loading_skeleton_SkelTheme=e=>{let{children:t}=e,r=(0,l.Z)(),i="dark"===r.palette.mode?o:{};return(0,n.jsx)(s.y,{...i,children:t})},loading_skeleton_SecurityContent=()=>(0,n.jsx)(loading_skeleton_SkelTheme,{children:(0,n.jsx)(c.Z,{direction:"row",spacing:2,className:"w-full",alignItems:"center",children:(0,n.jsx)("h5",{className:"flex-1",children:(0,n.jsx)(s.Z,{count:3})})})}),d=r(39513),loading_skeleton_Card=()=>(0,n.jsx)(loading_skeleton_SkelTheme,{children:(0,n.jsx)(d.Gt,{className:"w-[26rem] h-auto bg-neutral-950",waveIconVisible:!1,topRightSection:(0,n.jsx)("h5",{className:"w-[30%]",children:(0,n.jsx)(s.Z,{count:1,height:24})}),footer:(0,n.jsx)("h5",{children:(0,n.jsx)(s.Z,{count:1})}),children:(0,n.jsxs)("div",{className:"flex flex-col mb-[5%]",children:[(0,n.jsx)("label",{htmlFor:"holder-name",className:"text-white text-[10px]",children:"IDENTITY NAME"}),(0,n.jsx)("h4",{children:(0,n.jsx)(s.Z,{count:1,height:28})})]})})}),u=r(50480),loading_skeleton_CredentialItem=()=>(0,n.jsx)(loading_skeleton_SkelTheme,{children:(0,n.jsx)("div",{className:"relative h-full cursor-pointer",children:(0,n.jsx)(u.m,{className:"h-full",elevation:0,sx:{px:"12px",py:"10px",display:"grid",verticalAlign:"middle"},children:(0,n.jsxs)(c.Z,{direction:"row",spacing:1,alignItems:"center",overflow:"hidden",sx:{height:42},children:[(0,n.jsx)(s.Z,{width:32,height:32,circle:!0,containerClassName:"leading-none"}),(0,n.jsx)("h4",{className:"w-full",children:(0,n.jsx)(s.Z,{containerClassName:"leading-tight block",count:2,height:12})})]})})})}),loading_skeleton_AccountName=()=>(0,n.jsx)(loading_skeleton_SkelTheme,{children:(0,n.jsx)("h5",{children:(0,n.jsx)(s.Z,{count:1,height:28})})})},40542:function(e,t,r){"use strict";r.d(t,{V:function(){return useBehaviorSubject}});var n=r(2265);let useBehaviorSubject=e=>{let[t,r]=(0,n.useState)(null==e?void 0:e.getValue()),[l,i]=(0,n.useState)();return(0,n.useEffect)(()=>{if(!e){r(null);return}let t=e.subscribe({next:e=>{r(e)},error:i});return()=>t.unsubscribe()},[e]),[t]}},97716:function(e,t,r){"use strict";r.d(t,{s:function(){return useMounted}});var n=r(2265);let useMounted=()=>{let[e,t]=(0,n.useState)(!1);return(0,n.useEffect)(()=>{t(!0)},[]),{mounted:e}}}},function(e){e.O(0,[6990,9787,9443,8218,3988,395,8321,3824,6642,1228,5295,1396,1510,2e3,6953,2503,894,4558,8641,6133,1621,3262,9513,2971,7864,1744],function(){return e(e.s=96855)}),_N_E=e.O()}]);