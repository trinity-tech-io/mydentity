(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6401,9513],{16624:function(e,t,i){Promise.resolve().then(i.bind(i,56898))},50480:function(e,t,i){"use strict";i.d(t,{m:function(){return m}});var r=i(57437),n=i(23785),s=i(66267),l=i(96479),a=i(97716),o=i(15133),c=i(88469),d=i(96507),u=i(43226),h=i(35843),x=i(57042);let m=(0,h.ZP)(o.Z)(e=>{let{theme:t}=e;return{border:"1px solid #FFFFFF55",borderRadius:"0.5rem",position:"relative"}});t.Z=e=>{let{title:t,icon:i,children:o,className:h="",isSet:p=null,statusTitle:f,actionTitle:g,handleAction:b=()=>{},actionInProgress:v=!1,disabledAction:j=!1,disabledSkel:w=!1,loaded:y=null}=e,{mounted:k}=(0,a.s)(),Z=null!==y?y:k;return(0,r.jsx)(m,{className:h,elevation:0,children:(0,r.jsxs)(c.Z,{className:"relative z-10 flex flex-col h-full",sx:{px:3,pt:1},children:[(0,r.jsxs)(d.Z,{className:"pb-4 pt-2 flex items-center",children:[(0,r.jsx)(s.C,{children:i}),(0,r.jsx)(u.Z,{className:"flex-1",variant:"h6",fontWeight:600,sx:{ml:1},children:t}),k&&null!==p&&(0,r.jsx)(d.Z,{className:(0,x.Z)("rounded-md text-[7pt] px-3 py-0.5 inline-block text-white whitespace-nowrap",p?"bg-[#34A853]":"bg-[#EA4335]"),children:f})]}),w?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{className:"flex-1 pb-[5%]",children:o}),(0,r.jsx)(n.Kz,{onClick:b,loading:!Z||v,disabled:j,children:Z?g:"LOADING ..."})]}):(0,r.jsx)(r.Fragment,{children:Z?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{className:"flex-1 pb-[5%]",children:o}),(0,r.jsx)(n.Kz,{onClick:b,loading:v,disabled:j,children:g})]}):(0,r.jsx)(l.g4,{})})]})})}},56898:function(e,t,i){"use strict";i.r(t),i.d(t,{default:function(){return page}});var r=i(57437),n=i(23785),s=i(15707),l=i(40542),a=i(97716),o=i(39830),c=i(28874),d=i(43226),u=i(13457),h=i(14776),x=i(24033),m=i(92e3),p=i(2265),f=i(7747),g=i(1460),b=i(11920),v=i(46446),j=i(52653),w=i(19739),y=i(50480),k=i(78276),Z=i(3283),N=i(96507);let BrowserRow=e=>{let{browser:t}=e,[i]=(0,l.V)(null==t?void 0:t.activeShadowKey$),n=null==t?void 0:t.isCurrentBrowser(),[s]=(0,l.V)(h.jU),a=null==s?void 0:s.get("browser"),{showSuccessToast:c,showErrorToast:u}=(0,w.p)(),[x,m]=(0,p.useState)(!1),handleCloseDialog=async e=>{if(m(!1),!e)return;let i=!1;try{i=await a.deleteBrowser(t.id)}catch(e){b.logger.error("Browser",e)}i?c("Browser has been deleted!"):u("Failed to delete the browser...")},onDeleteClicked=async(e,t)=>{e.stopPropagation(),e.preventDefault(),m(!0)};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(y.m,{className:"inline-block",children:(0,r.jsxs)("div",{className:"relative z-10 inline-flex gap-5 px-3 py-5",children:[(0,r.jsxs)("div",{className:"relative",children:[(0,r.jsx)(o.JO,{icon:"ic:round-computer",fontSize:40}),!!i&&(0,r.jsx)("div",{className:"absolute bottom-0 right-[-10%]",children:(0,r.jsx)(k.Z,{title:"Biometrics passkey is bound to this browser",arrow:!0,children:(0,r.jsx)(Z.Z,{sx:{width:20,height:20,bgcolor:"#3A3A3A"},children:(0,r.jsx)(o.JO,{icon:"fluent:fingerprint-48-filled",fontSize:10,color:"white"})})})})]}),(0,r.jsxs)("div",{className:"flex flex-col flex-1",children:[(0,r.jsx)(d.Z,{variant:"body2",fontWeight:600,children:t.name}),(0,r.jsxs)(d.Z,{variant:"caption",fontStyle:"italic",children:["Last used: ",t.lastUsedAt.toLocaleString()]})]}),(0,r.jsx)("div",{className:"flex flex-col",children:n?(0,r.jsx)(N.Z,{className:"rounded-[4px] text-[7pt] px-3 py-0.5 inline-block text-white whitespace-nowrap bg-[#9291A5]",children:"CURRENT"}):(0,r.jsx)("div",{className:"text-right",children:(0,r.jsx)(j.Z,{"aria-label":"delete",onClick:e=>onDeleteClicked(e,t),children:(0,r.jsx)(v.Z,{style:{color:"red"}})})})})]})}),(0,r.jsx)(g.Z,{title:"Delete this Browser?",content:"Do you want to delete this Browser?",open:x,onClose:handleCloseDialog})]})};var page=()=>{let{mounted:e}=(0,a.s)(),[t]=(0,l.V)(h.jU),i=null==t?void 0:t.get("email"),[g]=(0,l.V)(null==i?void 0:i.userEmails$),b=null==t?void 0:t.get("security"),v=null==t?void 0:t.get("browser"),[j]=(0,l.V)(null==v?void 0:v.browsers$),[w]=(0,l.V)(null==b?void 0:b.shadowKeys$),k=null==b?void 0:b.isPasswordBound(),Z=null==b?void 0:b.isThisBrowserBound(),N=(0,m.useRouter)(),_=(0,x.useSearchParams)(),C=_.get("error"),[E,O]=(0,p.useState)(null),[S,T]=(0,p.useState)(!1),[I,A]=(0,p.useState)(null),[B,P]=(0,p.useState)(null);return(0,p.useEffect)(()=>{C&&""!==C&&("emailExists"===C?O("Email already exists"):O("Unknown error, please try again."))},[C]),(0,r.jsxs)("div",{className:"col-span-full",children:[(0,r.jsx)(s.Z,{title:"Security Center",description:"Many Web3 apps require you to manage complex cryptographic keys, which can sometimes lead to unsafe practices. Our service securely stores some keys for you, ensuring your control and security. Link multiple devices for future account recovery.",showBg:!0}),(0,r.jsxs)(c.ZP,{container:!0,spacing:3,children:[(0,r.jsx)(c.ZP,{item:!0,xs:12,md:6,children:(0,r.jsxs)(y.Z,{className:"h-full",icon:(0,r.jsx)(o.JO,{icon:"entypo:email"}),title:"Connect email address",statusTitle:"EMAIL ".concat((null==g?void 0:g.length)?"":"NOT ","LINKED"),isSet:(null==g?void 0:g.length)&&(null==g?void 0:g.length)>0,actionTitle:(null==g?void 0:g.length)?"BIND MORE":"VERIFY EMAIL",handleAction:()=>{N.push("/account/security/bind-email")},children:[(null==g?void 0:g.length)?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(d.Z,{variant:"body2",children:"Email addresses already bound"}),(0,r.jsx)("div",{className:"flex flex-col mt-2",children:g.map(e=>(0,r.jsx)("div",{className:"info mb-2",children:e.email},e.id))})]}):(0,r.jsx)(d.Z,{variant:"body2",children:"Connecting your email to your account allows you to log in later. If you haven't linked an email, you can still log in using browser biometrics if it's set up."}),E&&(0,r.jsx)("div",{className:"text-red-500",children:E})]})}),(0,r.jsx)(c.ZP,{item:!0,xs:12,md:6,children:(0,r.jsx)(y.Z,{className:"h-full",icon:(0,r.jsx)(o.JO,{icon:"ic:round-password"}),title:"Set master password",statusTitle:"PASSWORD ".concat(k?"":"NOT ","SET"),isSet:k,actionTitle:k?"UPDATE PASSWORD":"BIND PASSWORD",handleAction:()=>{N.push("/account/security/bind-password")},children:k?(0,r.jsx)(d.Z,{variant:"body2",children:"You've successfully set up your master password, which is like a key to your account's security. This important step helps keep your account safe and under your control."}):(0,r.jsxs)(d.Z,{variant:"body2",children:["By defining ",(0,r.jsx)("b",{children:"master password"}),", all your personal information stored in our service gets encrypted and can only be accessed with your approval. Note that this password can only changed if you have another encryption method defined, such as the browser biometrics."]})})}),(0,r.jsx)(c.ZP,{item:!0,xs:12,md:6,children:(0,r.jsx)(y.Z,{className:"h-full",icon:(0,r.jsx)(o.JO,{icon:"fluent:fingerprint-48-filled"}),title:"Link browser via biometric passkey",statusTitle:"BROWSER ".concat(Z?"":"NOT ","BOUND"),isSet:Z,actionTitle:Z?"BIND AGAIN":"SECURE BIOMETRICS",handleAction:()=>{N.push("/account/security/bind-passkey")},children:Z?(0,r.jsx)(d.Z,{variant:"body2",children:"Your browser is bound to your account."}):(0,r.jsx)(d.Z,{variant:"body2",children:"When you link your account to your browser's biometrics, you can only access this app from that specific browser. It also lets you unlock the encryption key, keeping your data safe from unauthorized access, even potential attackers."})})}),(0,r.jsx)(c.ZP,{item:!0,xs:12,md:6,children:(0,r.jsxs)(y.Z,{className:"h-full",icon:(0,r.jsx)(o.JO,{icon:"fluent-mdl2:website"}),title:"Sign in from another browser",actionTitle:"CREATE A SIGN IN LINK",statusTitle:null,handleAction:()=>{T(!0),t.get("security").requestTemporaryAuthenticationUrl().then(e=>{e&&(A(e.url),P(e.pinCode)),T(!1)})},actionInProgress:S,children:[!I&&(0,r.jsx)(d.Z,{variant:"body2",children:"You can create a temporary url to sign in from another browser on your computer or mobile phone."}),I&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(d.Z,{variant:"body2",children:["Send the following url to your another browser to sign in from there. Use PIN code ",(0,r.jsx)("b",{children:B})," when asked. This link is valid for 10 minutes."]}),(0,r.jsxs)(u.Z,{direction:"row",alignItems:"center",className:"mt-2",spacing:1,children:[(0,r.jsx)(d.Z,{variant:"body2",className:"break-all",children:I}),(0,r.jsx)("div",{className:"inline",children:(0,r.jsx)(n.qi,{text:I})})]}),(0,r.jsx)("div",{className:"p-8 mt-4 bg-white flex items-center justify-center",children:(0,r.jsx)(f.ZP,{value:I})})]})]})})]}),(0,r.jsxs)("div",{className:"",children:[(0,r.jsx)(d.Z,{variant:"h6",fontWeight:600,className:"py-3",children:"My Browsers"}),e&&(0,r.jsxs)(r.Fragment,{children:[(null==j?void 0:j.length)==0&&(0,r.jsx)(d.Z,{variant:"body2",children:"No browser used so far."}),j&&(0,r.jsx)(c.ZP,{container:!0,spacing:2,children:j.map((e,t)=>(0,r.jsx)(c.ZP,{item:!0,children:(0,r.jsx)(BrowserRow,{browser:e})},t))})]})]})]})}},23785:function(e,t,i){"use strict";i.d(t,{Yd:function(){return v},hO:function(){return l},qi:function(){return button_CopyButton},Kz:function(){return o},UO:function(){return f}});var r=i(35843),n=i(44551);let s=(0,r.ZP)(n.Z)(e=>{let{theme:t}=e;return{background:"#000 !important",borderRadius:4,color:"white","&:disabled":{opacity:"0.7 !important",backgroundColor:"#343434 !important",color:"#fff !important"},"&:hover":{background:"#222 !important"},[t.breakpoints.down("md")]:{fontSize:12,padding:"6px 14px"},".MuiLoadingButton-loadingIndicator":{position:"unset",color:"white",visibility:"inherit"}}});var l=s;let a=(0,r.ZP)(n.Z)(e=>{let{theme:t,className:i}=e;return{background:"#323B45 !important",borderRadius:(null==i?void 0:i.includes("rounded"))?8:4,color:"white",textTransform:"capitalize","&:disabled":{opacity:"0.7 !important",backgroundColor:"#555 !important",color:"#fff !important"},"&:hover":{background:"#666e76 !important"},[t.breakpoints.down("md")]:{fontSize:12,padding:"6px 14px"},".MuiLoadingButton-loadingIndicator":{position:"unset",color:"white",visibility:"inherit"}}});var o=a,c=i(57437);i(2265);var d=i(86781),u=i(39830),h=i(52653),x=i(19739),button_CopyButton=e=>{let{text:t,iconWidth:i="17px"}=e,{showSuccessToast:r}=(0,x.p)();return(0,c.jsx)(d.CopyToClipboard,{text:t,onCopy:()=>{r("Copied to clipboard")},children:(0,c.jsx)(h.Z,{type:"button",sx:{p:"5px"},"aria-label":"link",onClick:e=>{e.preventDefault(),e.stopPropagation()},color:"primary",children:(0,c.jsx)(u.JO,{icon:"material-symbols:content-copy-rounded",width:i})})})},m=i(49050);let p=(0,r.ZP)(m.Z)(e=>{let{theme:t}=e;return{color:"dark"===t.palette.mode?"white":"black"}});var f=p,g=i(45295);let b=(0,r.ZP)(g.Z)(e=>{let{theme:t}=e;return{borderRadius:"4px",overflow:"hidden","&:after":{background:"#fff",content:"''",height:155,left:-75,opacity:.2,position:"absolute",top:-50,width:50,WebkitTransition:"all 550ms cubic-bezier(0.19, 1, 0.22, 1)",transition:"all 550ms cubic-bezier(0.19, 1, 0.22, 1)",WebkitTransform:"rotate(35deg)",MsTransform:"rotate(35deg)",transform:"rotate(35deg)",zIndex:-10},"&:hover":{boxShadow:"0px 0px 7px #999999","&:after":{left:"120%",WebkitTransition:"all 550ms cubic-bezier(0.19, 1, 0.22, 1)",transition:"all 550ms cubic-bezier(0.19, 1, 0.22, 1)"}}}});var v=b},39513:function(e,t,i){"use strict";i.d(t,{CA:function(){return v},SN:function(){return b},Gt:function(){return card_LandingCard},TJ:function(){return card_PortraitCard}});var r,n,s,l,a,o=i(57437),c=i(96507),d=i(54986),u=i(35843),h=i(57042),x=i(90952);function _extends(){return(_extends=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r])}return e}).apply(this,arguments)}var chip=function(e){return x.createElement("svg",_extends({xmlns:"http://www.w3.org/2000/svg",width:50,height:38,fill:"none"},e),r||(r=x.createElement("g",{stroke:"#fff",strokeWidth:1.4,opacity:.7},x.createElement("rect",{width:48.144,height:36.348,x:.7,y:.7,fill:"#fff",fillOpacity:.26,rx:6.55}),x.createElement("path",{d:"M.774 11.612h12.632a3.625 3.625 0 0 1 3.625 3.625v5.471m0 16.296v-7.2m0 0v-9.096m0 9.096H.774m16.257-9.096H.774M48.77 11.612H33.288m0 0v9.096m0-9.096V.774m0 36.23v-7.2m0 0v-9.096m0 9.096H48.77m-15.482-9.096H48.77"}))))};function wave_logo_extends(){return(wave_logo_extends=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r])}return e}).apply(this,arguments)}var wave_logo=function(e){return x.createElement("svg",wave_logo_extends({xmlns:"http://www.w3.org/2000/svg",width:32,height:40,fill:"none"},e),n||(n=x.createElement("path",{fill:"url(#wave-logo_svg__a)",fillRule:"evenodd",d:"m2.317 26.858-.007.009-.006.008c-.343.486-1.11.628-1.711.204-.481-.34-.626-1.096-.216-1.694.61-.778 1.054-1.689 1.346-2.579.303-.926.444-1.979.439-3.011-.006-1.033-.158-2.084-.471-3.007-.301-.887-.755-1.792-1.374-2.564-.415-.594-.279-1.352.198-1.697.596-.43 1.366-.296 1.714.186l.006.009.006.008c.771 1.016 1.403 2.145 1.78 3.253.398 1.303.651 2.563.658 3.798.007 1.3-.117 2.53-.594 3.742-.52 1.32-1.023 2.33-1.768 3.335Zm5.571 2.413.015-.021.014-.022a17.795 17.795 0 0 0-.1-18.925c-.376-.596-.207-1.302.427-1.76.426-.308 1.226-.199 1.7.437 1.96 3.11 3.144 6.87 3.165 10.756.021 4.02-1.122 7.658-3.05 10.79-.446.614-1.13.786-1.718.438-.639-.467-.756-1.264-.453-1.693Zm9.998-24.379.016.034.02.031c2.656 4.33 4.132 9.325 4.16 14.732.03 5.404-1.392 10.412-4 14.768-.4.643-1.074.824-1.758.506-.623-.406-.79-1.078-.465-1.758 2.217-3.938 3.596-8.578 3.57-13.502-.026-4.902-1.308-9.535-3.718-13.474-.327-.672-.165-1.342.45-1.752.743-.355 1.466-.095 1.724.415ZM25.75.772l.011.022.013.022c3.219 5.564 5.11 11.924 5.146 18.826.037 6.894-1.782 13.268-4.936 18.862-.4.635-1.072.813-1.753.496-.62-.405-.789-1.074-.467-1.751 3.037-5.185 4.673-11.19 4.639-17.594-.034-6.42-1.878-12.403-4.823-17.536-.369-.75-.109-1.483.406-1.744.756-.383 1.5-.123 1.764.397Z",clipRule:"evenodd"})),s||(s=x.createElement("defs",null,x.createElement("linearGradient",{id:"wave-logo_svg__a",x1:15.408,x2:15.616,y1:.242,y2:39.203,gradientUnits:"userSpaceOnUse"},x.createElement("stop",{stopColor:"#fff",stopOpacity:.73}),x.createElement("stop",{offset:1,stopColor:"#fff"})))))};function circle_extends(){return(circle_extends=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r])}return e}).apply(this,arguments)}var circle=function(e){return x.createElement("svg",circle_extends({xmlns:"http://www.w3.org/2000/svg",width:349,height:354,fill:"none"},e),l||(l=x.createElement("path",{fill:"url(#circle_svg__a)",fillOpacity:.2,d:"M38.09 18.611C-74.07 67.46-125.398 197.992-76.55 310.152c48.848 112.159 179.382 163.487 291.541 114.639 112.159-48.848 163.488-179.381 114.64-291.54-48.848-112.16-179.382-163.488-291.54-114.64Zm144.437 331.64A140.216 140.216 0 0 1-2.009 277.687a140.212 140.212 0 1 1 184.536 72.564Z"})),a||(a=x.createElement("defs",null,x.createElement("linearGradient",{id:"circle_svg__a",x1:38.09,x2:214.991,y1:18.611,y2:424.791,gradientUnits:"userSpaceOnUse"},x.createElement("stop",{stopColor:"#fff"}),x.createElement("stop",{offset:.421,stopColor:"#fff",stopOpacity:0}),x.createElement("stop",{offset:1,stopColor:"#fff",stopOpacity:0})))))},m=i(23785);let p=(0,u.ZP)(c.Z)(e=>{let{theme:t}=e;return{borderRadius:"6.329% / 10%",boxShadow:"inset 0 0 0 1.5px #FFFFFF4C",overflow:"hidden","&:after":{paddingTop:"63.29%",display:"block",content:"''",background:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)'/%3E%3C/svg%3E\")",opacity:.15,zIndex:-1,position:"relative"},".body":{position:"absolute",top:0,bottom:0,right:0,left:0},".noise-bg":{background:"url('/noise1.png') repeat center center"},".circle-bottom-box":{left:"37%",top:"62%",transform:"rotate(335deg)"},hr:{borderColor:"rgb(250 250 250 / 0.2)"}}});var card_LandingCard=e=>{let{className:t="",waveIconVisible:i=!0,position:r="relative",dividerVisible:n=!0,topRightSection:s=null,chipClickable:l=!1,handleClickChip:a=e=>{},children:c,footer:u}=e;return(0,o.jsx)(p,{className:(0,h.Z)("inline-block drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]",t,r),children:(0,o.jsxs)("div",{className:"body px-[5%] py-[5%]",children:[(0,o.jsx)("div",{className:"absolute w-4/6 top-[1.5px] left-[1.5px]",children:(0,o.jsx)(circle,{width:"100%",height:"100%",viewBox:"0 0 349 354"})}),(0,o.jsx)("div",{className:"absolute w-full circle-bottom-box",children:(0,o.jsx)(circle,{width:"100%",height:"100%",viewBox:"0 0 349 354"})}),(0,o.jsxs)("div",{className:" flex flex-col h-full",children:[(0,o.jsxs)("div",{className:"flex mb-7",children:[(0,o.jsx)("div",{className:"w-[10%]",children:l?(0,o.jsx)(m.Yd,{onClick:a,children:(0,o.jsx)(chip,{width:"100%",height:"100%",viewBox:"0 0 50 38"})}):(0,o.jsx)("div",{className:"chip-item",children:(0,o.jsx)(chip,{width:"100%",height:"100%",viewBox:"0 0 50 38"})})}),(0,o.jsx)("div",{className:"flex-1"}),i?(0,o.jsx)("div",{className:"w-[7%]",children:(0,o.jsx)(wave_logo,{width:"100%",height:"100%",viewBox:"0 0 32 40"})}):s]}),(0,o.jsx)("div",{className:"flex flex-1 items-end",children:c}),n&&(0,o.jsx)(d.Z,{}),(0,o.jsx)("div",{className:"h-[15%] flex items-end",children:u})]})]})})},f=i(15133);let g=(0,u.ZP)(f.Z)(e=>{let{theme:t}=e;return{maxWidth:300,minWidth:180,backgroundColor:"black",borderRadius:"1.5rem","&:after":{paddingTop:"158%",display:"block",content:"''"},".noise-bg":{background:"url('./noise2.png') repeat center center"},".body":{position:"absolute",top:0,bottom:0,right:0,left:0,"&:before, &:after":{opacity:.2,content:"''",position:"absolute",width:"70%",height:"100%",background:"linear-gradient(to bottom, rgba(255, 255, 255, 100%), rgba(255, 255, 255, 25%), transparent)",transform:"rotate(-50deg)",zIndex:-1},"&:before":{top:"-40%",left:0},"&:after":{top:"-20%",left:"-10%",transform:"rotate(-47deg)"},".ellipse":{bottom:"20%",width:"100%",height:"42%",background:"linear-gradient(to bottom, rgba(255, 211, 187, 100%), rgba(255, 211, 187, 40%), transparent)",borderTopLeftRadius:"100%"}}}});var card_PortraitCard=e=>{let{content:t,footer:i,logo:r}=e;return(0,o.jsx)(g,{className:"inline-block w-[45%] xl:w-[40%] md:w-[25%] h-full border-white border-opacity-30 border-2 rounded-3xl relative drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]",children:(0,o.jsxs)("div",{className:"body noise-bg",children:[(0,o.jsx)("div",{className:"absolute opacity-20 ellipse"}),(0,o.jsxs)("div",{className:"px-4 py-6 md:px-6 md:py-8 h-full flex flex-col",children:[(0,o.jsxs)("div",{className:"flex pb-4 md:pb-7",children:[(0,o.jsx)("div",{className:"flex-1 relative",children:r}),(0,o.jsx)("div",{className:"h-6 md:h-9",children:(0,o.jsx)(chip,{width:"100%",height:"100%",viewBox:"0 0 50 38"})})]}),(0,o.jsx)("div",{className:"flex flex-1",children:(0,o.jsx)("div",{className:"text-left",children:t})}),(0,o.jsx)("div",{className:"flex justify-center",children:i})]})]})})};let b=(0,u.ZP)(c.Z)(e=>{let{theme:t}=e;return{minWidth:180,perspective:600,borderRadius:"1.5rem","&:after":{paddingTop:"73%",display:"block",content:"''"},".card":{position:"relative",width:"100%",height:"100%",cursor:"pointer",transformStyle:"preserve-3d",transformOrigin:"center right",transition:"transform 0.5s",".card-face":{position:"absolute",width:"100%",height:"100%",backfaceVisibility:"hidden"},".back":{transform:"rotateY(180deg)"}},".card.is-flipped":{transform:"translateX(-100%) rotateY(-180deg)"}}}),v=(0,u.ZP)(f.Z)(e=>{let{theme:t}=e;return{minWidth:180,cursor:"initial",backgroundImage:"url('/dark-leather.png')",backgroundColor:"black",borderRadius:"1.5rem",overflow:"visible","&:after":{paddingTop:"73%",display:"block",content:"''"},".dashed-body":{border:"2px dashed rgb(50 38 38)",[t.breakpoints.down("sm")]:{borderWidth:1}},".compartment, .compartment-top":{backgroundImage:"url('/dark-leather.png')",backgroundColor:"black",width:"100%"},".compartment-top":{height:"18%","--mask1":"radial-gradient(circle at 50% -20%, transparent 25%, black 25.5%)",WebkitMaskImage:"var(--mask1)",maskImage:"var(--mask1)"},"@keyframes fadeOut":{"0%":{visibility:"visible"},"55%":{visibility:"visible"},"56%, 100%":{visibility:"hidden"}},".fade-out":{animation:"fadeOut 1s ".concat(t.transitions.easing.easeInOut," forwards"),MsAnimation:"fadeOut 1s ".concat(t.transitions.easing.easeInOut," forwards"),WebkitAnimation:"fadeOut 1s ".concat(t.transitions.easing.easeInOut," forwards"),MozAnimation:"fadeOut 1s ".concat(t.transitions.easing.easeInOut," forwards")}}})},66267:function(e,t,i){"use strict";i.d(t,{C:function(){return a}});var r=i(57437),n=i(3283),s=i(43226),l=i(35843);let a=(0,l.ZP)(n.Z)(e=>{let{theme:t}=e;return{backgroundColor:"#9D3E3E",color:"white",width:36,height:36,padding:8}});t.Z=e=>{let{icon:t,title:i,description:n,className:l=""}=e;return(0,r.jsxs)("div",{className:"text-[#DDD] ".concat(l),children:[(0,r.jsx)("div",{className:"inline-flex pb-1",children:(0,r.jsx)(a,{children:t})}),(0,r.jsx)(s.Z,{variant:"body1",className:"underline underline-offset-2",children:i}),(0,r.jsx)(s.Z,{variant:"body2",children:n})]})}},1460:function(e,t,i){"use strict";var r=i(57437),n=i(44551),s=i(49050),l=i(22079),a=i(42834),o=i(26337),c=i(64173),d=i(91797),u=i(2265);t.Z=e=>{let{title:t,content:i,open:h,onClose:x}=e,[m,p]=(0,u.useState)(!1);(0,u.useEffect)(()=>{p(!1)},[h]);let handleDisAgree=()=>{x(!1)};return(0,r.jsxs)(l.Z,{open:h,onClose:handleDisAgree,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[(0,r.jsx)(d.Z,{id:"alert-dialog-title",children:t}),(0,r.jsx)(o.Z,{children:(0,r.jsx)(c.Z,{id:"alert-dialog-description",children:i})}),(0,r.jsxs)(a.Z,{children:[(0,r.jsx)(s.Z,{variant:"outlined",onClick:handleDisAgree,children:"Disagree"}),(0,r.jsx)(n.Z,{color:"info",variant:"contained",loading:m,onClick:()=>{p(!0),x(!0)},autoFocus:!0,children:"Agree"})]})]})}},15707:function(e,t,i){"use strict";var r=i(57437),n=i(35843),s=i(43226);let l=(0,n.ZP)("div")(e=>{let{showBg:t}=e;return{marginBottom:"1.5rem",background:t?"url('/headline-banner.png') no-repeat center center / cover":"none"}});t.Z=e=>{let{title:t,description:i,showBg:n=!1}=e;return(0,r.jsxs)(l,{showBg:n,className:n?"p-6 rounded-lg":"",children:[(0,r.jsx)(s.Z,{className:"w-full pb-8",variant:"h3",color:"text.primary",children:t}),(0,r.jsx)(s.Z,{className:"mt-4",variant:"body1",color:"text.primary",children:i})]})}},96479:function(e,t,i){"use strict";i.d(t,{V$:function(){return loading_skeleton_AccountName},Wo:function(){return loading_skeleton_Card},RZ:function(){return loading_skeleton_CredentialItem},_H:function(){return loading_skeleton_ProfileInfo},g4:function(){return loading_skeleton_SecurityContent},IT:function(){return loading_skeleton_TableAvatarRow}});var r=i(57437),n=i(41101),s=i(98489),l=i(30666),a=i(50724);i(3436);let o={baseColor:"#333",highlightColor:"#4a4a4a"};var loading_skeleton_TableAvatarRow=e=>{let{colSpan:t=2}=e,i=(0,n.Z)(),c="dark"===i.palette.mode?o:{};return(0,r.jsx)(a.y,{...c,children:(0,r.jsxs)(s.Z,{className:"h-[3.5rem]",children:[(0,r.jsx)(l.Z,{children:(0,r.jsx)(a.Z,{width:36,height:36,circle:!0})}),(0,r.jsx)(l.Z,{colSpan:t,children:(0,r.jsx)("h5",{style:{flexGrow:1},children:(0,r.jsx)(a.Z,{count:1})})})]})})},c=i(13457),loading_skeleton_ProfileInfo=()=>{let e=(0,n.Z)(),t="dark"===e.palette.mode?o:{};return(0,r.jsx)(a.y,{...t,children:(0,r.jsxs)(c.Z,{direction:"row",spacing:2,className:"w-full",alignItems:"center",children:[(0,r.jsx)(a.Z,{width:80,height:80,circle:!0,containerClassName:"leading-none"}),(0,r.jsxs)("h5",{className:"flex-1",children:[(0,r.jsx)(a.Z,{count:1,height:25,style:{lineHeight:3}}),(0,r.jsx)(a.Z,{count:1,height:12,containerClassName:"leading-none"})]})]})})},loading_skeleton_SkelTheme=e=>{let{children:t}=e,i=(0,n.Z)(),s="dark"===i.palette.mode?o:{};return(0,r.jsx)(a.y,{...s,children:t})},loading_skeleton_SecurityContent=()=>(0,r.jsx)(loading_skeleton_SkelTheme,{children:(0,r.jsx)(c.Z,{direction:"row",spacing:2,className:"w-full",alignItems:"center",children:(0,r.jsx)("h5",{className:"flex-1",children:(0,r.jsx)(a.Z,{count:3})})})}),d=i(39513),loading_skeleton_Card=()=>(0,r.jsx)(loading_skeleton_SkelTheme,{children:(0,r.jsx)(d.Gt,{className:"w-[26rem] h-auto bg-neutral-950",waveIconVisible:!1,topRightSection:(0,r.jsx)("h5",{className:"w-[30%]",children:(0,r.jsx)(a.Z,{count:1,height:24})}),footer:(0,r.jsx)("h5",{children:(0,r.jsx)(a.Z,{count:1})}),children:(0,r.jsxs)("div",{className:"flex flex-col mb-[5%]",children:[(0,r.jsx)("label",{htmlFor:"holder-name",className:"text-white text-[10px]",children:"IDENTITY NAME"}),(0,r.jsx)("h4",{children:(0,r.jsx)(a.Z,{count:1,height:28})})]})})}),u=i(50480),loading_skeleton_CredentialItem=()=>(0,r.jsx)(loading_skeleton_SkelTheme,{children:(0,r.jsx)("div",{className:"relative h-full cursor-pointer",children:(0,r.jsx)(u.m,{className:"h-full",elevation:0,sx:{px:"12px",py:"10px",display:"grid",verticalAlign:"middle"},children:(0,r.jsxs)(c.Z,{direction:"row",spacing:1,alignItems:"center",overflow:"hidden",sx:{height:42},children:[(0,r.jsx)(a.Z,{width:32,height:32,circle:!0,containerClassName:"leading-none"}),(0,r.jsx)("h4",{className:"w-full",children:(0,r.jsx)(a.Z,{containerClassName:"leading-tight block",count:2,height:12})})]})})})}),loading_skeleton_AccountName=()=>(0,r.jsx)(loading_skeleton_SkelTheme,{children:(0,r.jsx)("h5",{children:(0,r.jsx)(a.Z,{count:1,height:28})})})},40542:function(e,t,i){"use strict";i.d(t,{V:function(){return useBehaviorSubject}});var r=i(2265);let useBehaviorSubject=e=>{let[t,i]=(0,r.useState)(null==e?void 0:e.getValue()),[n,s]=(0,r.useState)();return(0,r.useEffect)(()=>{if(!e){i(null);return}let t=e.subscribe({next:e=>{i(e)},error:s});return()=>t.unsubscribe()},[e]),[t]}},97716:function(e,t,i){"use strict";i.d(t,{s:function(){return useMounted}});var r=i(2265);let useMounted=()=>{let[e,t]=(0,r.useState)(!1);return(0,r.useEffect)(()=>{t(!0)},[]),{mounted:e}}},19739:function(e,t,i){"use strict";i.d(t,{p:function(){return useToast}});var r=i(36953);function useToast(){let{enqueueSnackbar:e}=(0,r.Ds)();return{showSuccessToast:t=>{e(t,{variant:"success"})},showErrorToast:t=>{e(t,{variant:"error"})}}}}},function(e){e.O(0,[6990,9787,9443,8218,3988,395,8321,3824,6642,1228,5295,1510,8251,6953,2e3,1880,894,4448,1407,1869,8874,3152,8773,3262,2971,7864,1744],function(){return e(e.s=16624)}),_N_E=e.O()}]);