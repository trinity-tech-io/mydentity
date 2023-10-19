(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6401],{8809:function(e,s,t){Promise.resolve().then(t.bind(t,56898))},50480:function(e,s,t){"use strict";t.d(s,{m:function(){return m}});var n=t(57437),i=t(57042),r=t(15133),l=t(88469),o=t(96507),a=t(43226),c=t(35843),d=t(23785),u=t(66267),h=t(97716),x=t(39982);let m=(0,c.ZP)(r.Z)(e=>{let{theme:s}=e;return{border:"1px solid #FFFFFF55",borderRadius:"0.5rem",background:"#1D1D1D",position:"relative"}});s.Z=e=>{let{title:s,icon:t,children:r,className:c="",isSet:j,statusTitle:p,actionTitle:f,handleAction:g=()=>{}}=e,{mounted:y}=(0,h.s)();return(0,n.jsx)(m,{className:c,elevation:0,children:(0,n.jsxs)(l.Z,{className:"relative z-10 flex flex-col h-full",sx:{px:3,pt:1},children:[(0,n.jsxs)(o.Z,{className:"pb-4 pt-2 flex items-center",children:[(0,n.jsx)(u.C,{children:t}),(0,n.jsx)(a.Z,{className:"flex-1",variant:"h6",fontWeight:600,sx:{ml:1},children:s}),y&&(0,n.jsx)(o.Z,{className:(0,i.Z)("rounded-md text-[7pt] px-3 py-0.5 inline-block text-white whitespace-nowrap",j?"bg-[#34A853]":"bg-[#EA4335]"),children:p})]}),y?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("div",{className:"flex-1 pb-[5%]",children:r}),(0,n.jsx)(d.Kz,{onClick:g,children:f})]}):(0,n.jsx)(x.g4,{})]})})}},56898:function(e,s,t){"use strict";t.r(s),t.d(s,{default:function(){return page}});var n=t(57437),i=t(2265),r=t(24033),l=t(92e3),o=t(28874),a=t(43226),c=t(39830),d=t(40542),u=t(97716),h=t(14776),x=t(78723),m=t(11920),j=t(46446),p=t(52653),f=t(19739),g=t(50480),y=t(78276),b=t(3283),v=t(96507);let BrowserRow=e=>{let{browser:s}=e,[t]=(0,d.V)(null==s?void 0:s.activeShadowKey$),r=null==s?void 0:s.isCurrentBrowser(),[l]=(0,d.V)(h.jU),o=null==l?void 0:l.get("browser"),{showSuccessToast:u,showErrorToast:w}=(0,f.p)(),[Z,N]=(0,i.useState)(!1),handleCloseDialog=async e=>{if(N(!1),!e)return;let t=!1;try{t=await o.deleteBrowser(s.id)}catch(e){m.logger.error("Browser",e)}t?u("Browser has been deleted!"):w("Failed to delete the browser...")},onDeleteClicked=async(e,s)=>{e.stopPropagation(),e.preventDefault(),N(!0)};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(g.m,{className:"inline-block",children:(0,n.jsxs)("div",{className:"relative z-10 inline-flex gap-5 px-3 py-5",children:[(0,n.jsxs)("div",{className:"relative",children:[(0,n.jsx)(c.JO,{icon:"ic:round-computer",fontSize:40}),!!t&&(0,n.jsx)("div",{className:"absolute bottom-0 right-[-10%]",children:(0,n.jsx)(y.Z,{title:"Biometrics passkey is bound to this browser",arrow:!0,children:(0,n.jsx)(b.Z,{sx:{width:20,height:20,bgcolor:"#3A3A3A"},children:(0,n.jsx)(c.JO,{icon:"fluent:fingerprint-48-filled",fontSize:10,color:"white"})})})})]}),(0,n.jsxs)("div",{className:"flex flex-col flex-1",children:[(0,n.jsx)(a.Z,{variant:"body2",fontWeight:600,children:s.name}),(0,n.jsxs)(a.Z,{variant:"caption",fontStyle:"italic",children:["Last used: ",s.lastUsedAt.toLocaleString()]})]}),(0,n.jsx)("div",{className:"flex flex-col",children:r?(0,n.jsx)(v.Z,{className:"rounded-[4px] text-[7pt] px-3 py-0.5 inline-block text-white whitespace-nowrap bg-[#9291A5]",children:"CURRENT"}):(0,n.jsx)("div",{className:"text-right",children:(0,n.jsx)(p.Z,{"aria-label":"delete",onClick:e=>onDeleteClicked(e,s),children:(0,n.jsx)(j.Z,{style:{color:"red"}})})})})]})}),(0,n.jsx)(x.Z,{title:"Delete this Browser?",content:"Do you want to delete this Browser?",open:Z,onClose:handleCloseDialog})]})};var w=t(15707),page=()=>{let{mounted:e}=(0,u.s)(),[s]=(0,d.V)(h.jU),t=null==s?void 0:s.get("email"),[x]=(0,d.V)(null==t?void 0:t.userEmails$),m=null==s?void 0:s.get("security"),j=null==s?void 0:s.get("browser"),[p]=(0,d.V)(null==j?void 0:j.browsers$),[f]=(0,d.V)(null==m?void 0:m.shadowKeys$),y=null==m?void 0:m.isPasswordBound(),b=null==m?void 0:m.isThisBrowserBound(),v=(null==x?void 0:x.length)>0,Z=(0,l.useRouter)(),N=(0,r.useSearchParams)(),k=N.get("error"),[S,C]=(0,i.useState)(null);return(0,i.useEffect)(()=>{k&&""!==k&&("emailExists"===k?C("Email already exists"):C("Unknown error, please try again."))},[k]),(0,n.jsxs)("div",{className:"col-span-full",children:[(0,n.jsx)(w.Z,{title:"Security Center",description:"Many Web3 apps require you to manage complex cryptographic keys, which can sometimes lead to unsafe practices. Our service securely stores some keys for you, ensuring your control and security. Link multiple devices for future account recovery.",showBg:!0}),(0,n.jsxs)(o.ZP,{container:!0,spacing:3,children:[(0,n.jsx)(o.ZP,{item:!0,xs:12,md:6,children:(0,n.jsxs)(g.Z,{className:"h-full",icon:(0,n.jsx)(c.JO,{icon:"entypo:email"}),title:"Connect email address",statusTitle:"EMAIL ".concat(v?"":"NOT ","LINKED"),isSet:v,actionTitle:v?"Bind more":"VERIFY EMAIL",handleAction:()=>{Z.push("/account/security/bind-email")},children:[v?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(a.Z,{variant:"body2",children:"Email addresses already bound"}),(0,n.jsx)("div",{className:"flex flex-col mt-2",children:x.map(e=>(0,n.jsx)("div",{className:"info mb-2",children:e.email},e.id))})]}):(0,n.jsx)(a.Z,{variant:"body2",children:"Connecting your email to your account allows you to log in later. If you haven't linked an email, you can still log in using browser biometrics if it's set up."}),S&&(0,n.jsx)("div",{className:"text-red-500",children:S})]})}),(0,n.jsx)(o.ZP,{item:!0,xs:12,md:6,children:(0,n.jsx)(g.Z,{className:"h-full",icon:(0,n.jsx)(c.JO,{icon:"ic:round-password"}),title:"Set master password",statusTitle:"PASSWORD ".concat(y?"":"NOT ","SET"),isSet:y,actionTitle:y?"UPDATE PASSWORD":"BIND PASSWORD",handleAction:()=>{Z.push("/account/security/bind-password")},children:y?(0,n.jsx)(a.Z,{variant:"body2",children:"You've successfully set up your master password, which is like a key to your account's security. This important step helps keep your account safe and under your control."}):(0,n.jsxs)(a.Z,{variant:"body2",children:["By defining ",(0,n.jsx)("b",{children:"master password"}),", all your personal information stored in our service gets encrypted and can only be accessed with your approval. Note that this password can only changed if you have another encryption method defined, such as the browser biometrics."]})})}),(0,n.jsx)(o.ZP,{item:!0,xs:12,md:6,children:(0,n.jsx)(g.Z,{icon:(0,n.jsx)(c.JO,{icon:"fluent-mdl2:website"}),title:"Link browser via biometric passkey",statusTitle:"BROWSER ".concat(b?"":"NOT ","BOUND"),isSet:b,actionTitle:b?"BIND AGAIN":"SECURE BIOMETRICS",handleAction:()=>{Z.push("/account/security/bind-passkey")},children:b?(0,n.jsx)(a.Z,{variant:"body2",children:"Your browser is bound to your account."}):(0,n.jsx)(a.Z,{variant:"body2",children:"When you link your account to your browser's biometrics, you can only access this app from that specific browser. It also lets you unlock the encryption key, keeping your data safe from unauthorized access, even potential attackers."})})})]}),(0,n.jsxs)("div",{className:"",children:[(0,n.jsx)(a.Z,{variant:"h6",fontWeight:600,className:"py-3",children:"My Browsers"}),e&&(0,n.jsxs)(n.Fragment,{children:[(null==p?void 0:p.length)==0&&(0,n.jsx)(a.Z,{variant:"body2",children:"No browser used so far."}),p&&p.map((e,s)=>(0,n.jsx)(BrowserRow,{browser:e},s))]})]})]})}},66267:function(e,s,t){"use strict";t.d(s,{C:function(){return o}});var n=t(57437),i=t(3283),r=t(43226),l=t(35843);let o=(0,l.ZP)(i.Z)(e=>{let{theme:s}=e;return{backgroundColor:"#9D3E3E",color:"white",width:36,height:36,padding:8}});s.Z=e=>{let{icon:s,title:t,description:i,className:l=""}=e;return(0,n.jsxs)("div",{className:"text-[#DDD] ".concat(l),children:[(0,n.jsx)("div",{className:"inline-flex pb-1",children:(0,n.jsx)(o,{children:s})}),(0,n.jsx)(r.Z,{variant:"body1",className:"underline underline-offset-2",children:t}),(0,n.jsx)(r.Z,{variant:"body2",children:i})]})}},78723:function(e,s,t){"use strict";var n=t(57437),i=t(49050),r=t(22079),l=t(42834),o=t(26337),a=t(64173),c=t(91797);s.Z=e=>{let{title:s,content:t,open:d,onClose:u}=e,handleDisAgree=()=>{u(!1)};return(0,n.jsxs)(r.Z,{open:d,onClose:handleDisAgree,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[(0,n.jsx)(c.Z,{id:"alert-dialog-title",children:s}),(0,n.jsx)(o.Z,{children:(0,n.jsx)(a.Z,{id:"alert-dialog-description",children:t})}),(0,n.jsxs)(l.Z,{children:[(0,n.jsx)(i.Z,{onClick:handleDisAgree,children:"Disagree"}),(0,n.jsx)(i.Z,{onClick:()=>{u(!0)},autoFocus:!0,children:"Agree"})]})]})}},15707:function(e,s,t){"use strict";var n=t(57437),i=t(35843);let r=(0,i.ZP)("div")(e=>{let{showBg:s}=e;return{marginBottom:"1.5rem",background:s?"url('/headline-banner.png') no-repeat center center / cover":"none"}});s.Z=e=>{let{title:s,description:t,showBg:i=!1}=e;return(0,n.jsxs)(r,{showBg:i,className:i?"p-6 rounded-lg":"",children:[(0,n.jsx)("h3",{className:"w-full text-4xl font-bold pb-8",children:s}),(0,n.jsx)("span",{className:"mt-4",children:t})]})}},39982:function(e,s,t){"use strict";t.d(s,{Wo:function(){return loading_skeleton_Card},_H:function(){return loading_skeleton_ProfileInfo},g4:function(){return loading_skeleton_SecurityContent},IT:function(){return loading_skeleton_TableAvatarRow}});var n=t(57437),i=t(41101),r=t(98489),l=t(30666),o=t(50724);t(3436);let a={baseColor:"#333",highlightColor:"#4a4a4a"};var loading_skeleton_TableAvatarRow=e=>{let{colSpan:s=2}=e,t=(0,i.Z)(),c="dark"===t.palette.mode?a:{};return(0,n.jsx)(o.y,{...c,children:(0,n.jsxs)(r.Z,{className:"h-[3.5rem]",children:[(0,n.jsx)(l.Z,{children:(0,n.jsx)(o.Z,{width:36,height:36,circle:!0})}),(0,n.jsx)(l.Z,{colSpan:s,children:(0,n.jsx)("h5",{style:{flexGrow:1},children:(0,n.jsx)(o.Z,{count:1})})})]})})},c=t(13457),loading_skeleton_ProfileInfo=()=>{let e=(0,i.Z)(),s="dark"===e.palette.mode?a:{};return(0,n.jsx)(o.y,{...s,children:(0,n.jsxs)(c.Z,{direction:"row",spacing:2,className:"w-full",alignItems:"center",children:[(0,n.jsx)(o.Z,{width:80,height:80,circle:!0,containerClassName:"leading-none"}),(0,n.jsxs)("h5",{className:"flex-1",children:[(0,n.jsx)(o.Z,{count:1,height:25,style:{lineHeight:3}}),(0,n.jsx)(o.Z,{count:1,height:12,containerClassName:"leading-none"})]})]})})},loading_skeleton_SkelTheme=e=>{let{children:s}=e,t=(0,i.Z)(),r="dark"===t.palette.mode?a:{};return(0,n.jsx)(o.y,{...r,children:s})},loading_skeleton_SecurityContent=()=>(0,n.jsx)(loading_skeleton_SkelTheme,{children:(0,n.jsx)(c.Z,{direction:"row",spacing:2,className:"w-full",alignItems:"center",children:(0,n.jsx)("h5",{className:"flex-1",children:(0,n.jsx)(o.Z,{count:3})})})}),d=t(39513),loading_skeleton_Card=()=>(0,n.jsx)(loading_skeleton_SkelTheme,{children:(0,n.jsx)(d.Gt,{className:"w-[26rem] h-auto bg-neutral-950",waveIconVisible:!1,topRightSection:(0,n.jsx)("h5",{className:"w-[30%]",children:(0,n.jsx)(o.Z,{count:1,height:24})}),footer:(0,n.jsx)("h5",{children:(0,n.jsx)(o.Z,{count:1})}),children:(0,n.jsxs)("div",{className:"flex flex-col mb-[5%]",children:[(0,n.jsx)("label",{htmlFor:"holder-name",className:"text-white text-[10px]",children:"IDENTITY NAME"}),(0,n.jsx)("h4",{children:(0,n.jsx)(o.Z,{count:1,height:28})})]})})})},40542:function(e,s,t){"use strict";t.d(s,{V:function(){return useBehaviorSubject}});var n=t(2265);let useBehaviorSubject=e=>{let[s,t]=(0,n.useState)(null==e?void 0:e.getValue()),[i,r]=(0,n.useState)();return(0,n.useEffect)(()=>{if(!e){t(null);return}let s=e.subscribe({next:e=>{t(e)},error:r});return()=>s.unsubscribe()},[e]),[s]}},97716:function(e,s,t){"use strict";t.d(s,{s:function(){return useMounted}});var n=t(2265);let useMounted=()=>{let[e,s]=(0,n.useState)(!1);return(0,n.useEffect)(()=>{s(!0)},[]),{mounted:e}}}},function(e){e.O(0,[6990,9787,9443,8218,3988,395,8321,9152,5295,1510,1396,6953,2e3,182,2699,1869,3510,4852,9329,8943,3262,9513,2971,7864,1744],function(){return e(e.s=8809)}),_N_E=e.O()}]);