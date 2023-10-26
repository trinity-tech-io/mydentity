(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9530],{44069:function(e,t,n){Promise.resolve().then(n.bind(n,55496))},77814:function(e,t,n){"use strict";n.d(t,{O:function(){return PreparingRequest}});var i=n(57437),r=n(40471),l=n(57042);let PreparingRequest=e=>{let{className:t}=e;return(0,i.jsxs)("div",{className:(0,l.Z)("flex flex-col w-full",t),children:[(0,i.jsx)("div",{className:"italic",children:"Preparing request, hold on..."}),(0,i.jsx)(r.Z,{})]})}},26188:function(e,t,n){"use strict";n.d(t,{O:function(){return RequestingApp}});var i=n(57437),r=n(4528),l=n(13457),s=n(3283),a=n(96507),o=n(43226),c=n(78596),u=n(16691),d=n.n(u),m=n(2265);let RequestingApp=e=>{let{applicationDID:t,className:n}=e,[u,f]=(0,m.useState)(null),[p,h]=(0,m.useState)(null),[x,g]=(0,m.useState)(!1),updateApplicationData=async()=>{if(t){let e=await c._.resolveDIDDocument(t);g(!0),e?(f(await e.getRepresentativeIcon()),h(await e.getRepresentativeOwnerName())):(f(null),h(null))}};return((0,m.useEffect)(()=>{updateApplicationData()},[t]),x&&t)?(0,i.jsxs)(l.Z,{className:n,justifyContent:"center",alignItems:"center",spacing:1.5,children:[(0,i.jsxs)(l.Z,{justifyContent:"center",alignItems:"center",spacing:.5,children:[(0,i.jsx)(s.Z,{sx:{width:96,height:96},children:u&&(0,i.jsx)(d(),{src:u,alt:"",width:120,height:120})}),(0,i.jsx)("div",{children:(0,i.jsx)(a.Z,{className:"rounded-[4px] text-[8px] px-2.5 py-1 inline-block text-white whitespace-nowrap bg-[#9291A5]",children:"APPLICATION"})})]}),(0,i.jsx)(o.Z,{variant:"h4",children:p})]}):(0,i.jsx)("div",{className:"flex items-center justify-center",children:(0,i.jsx)(r.a,{width:120,height:120})})}},55496:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return page}});var i=n(57437),r=n(40542),l=n(63491),s=n(57958),a=n(61568),o=n(14776),c=n(24033),u=n(2265),d=n(77814),m=n(9254),f=n(29439),p=n(70906),h=n(26588),x=n(69147),g=n(90726),j=n(43226),v=n(19739),w=n(36079),y=n(43639),S=n(26188),b=n(48727),I=n(81344),k=n(13457),C=n(49050),P=n(15133),Z=n(14819),N=n(29872),D=n(35843),E=n(53386),R=n(16691),U=n.n(R);(0,D.ZP)(N.Z)(e=>{let{theme:t}=e;return{backgroundColor:"#eeeeee",textAlign:"left",maxWidth:400}});let CredentialPreview=e=>{let{credential:t}=e,n=t.getValueItems(),l=t.isSensitiveCredential(),[s]=(0,r.V)(null==t?void 0:t.issuerInfo$);return(0,i.jsx)(k.Z,{alignItems:"center",children:(0,i.jsx)("div",{className:"mx-4 mb-1 mt-2 shadow text-left",children:(0,i.jsxs)("div",{className:"flex flex-row gap-2 p-2",style:{width:400},children:[(0,i.jsx)(Z.Z,{sx:{fontSize:40}}),(0,i.jsxs)(k.Z,{alignItems:"left",children:[(0,i.jsx)(j.Z,{fontSize:18,gutterBottom:!0,children:(0,i.jsx)("b",{children:t.getDisplayableTitle()})}),null==n?void 0:n.map(e=>(0,i.jsx)(j.Z,{fontSize:16,gutterBottom:!0,children:null==e?void 0:e.value},e.name+"credentialcomponentitem")),l&&(0,i.jsx)(j.Z,{fontSize:14,color:"#FF6347",gutterBottom:!0,children:"Sensitive"}),(0,i.jsxs)("div",{className:"flex flex-row gap-4 items-center w-full mt-4",children:[(null==s?void 0:s.avatarIcon)&&(0,i.jsx)(k.Z,{children:(0,i.jsx)(U(),{unoptimized:!0,src:null==s?void 0:s.avatarIcon,width:30,height:30,style:{borderRadius:"50%"},alt:""})}),(0,i.jsxs)("div",{className:"flex flex-col",children:[(0,i.jsx)(j.Z,{fontSize:10,fontWeight:300,noWrap:!0,children:"Issued by:"}),(0,i.jsx)(j.Z,{fontSize:13,noWrap:!0,children:s&&(0,E.Sy)(null==s?void 0:s.name,30)})]})]})]})]})})})},CredentialPreviewWithDetails=e=>{let{importedCredential:t}=e,[n,r]=(0,u.useState)(!1),[l,s]=(0,u.useState)(!1),[a,o]=(0,u.useState)(!1),handleHideDisplayable=()=>{s(!1)},handleShowDisplayable=()=>{s(!0)};return(0,i.jsxs)(k.Z,{alignItems:"center",children:[(0,i.jsx)(CredentialPreview,{credential:t.credential}),n&&(0,i.jsxs)(k.Z,{children:[(0,i.jsx)(C.Z,{variant:"text",onClick:()=>{r(!1)},children:"hide details"}),t.values.map(e=>(0,i.jsxs)(P.Z,{sx:{mx:10,my:1,boxShadow:0,textAlign:"left"},children:[!l&&(0,i.jsx)(k.Z,{px:2,py:2,minWidth:400,alignItems:"left",children:(0,i.jsx)("div",{onClick:handleShowDisplayable,children:(0,i.jsxs)(k.Z,{direction:"row",alignItems:"right",children:[(0,i.jsx)(j.Z,{fontSize:16,minWidth:350,gutterBottom:!0,children:(0,i.jsx)("b",{children:e.name})}),(0,i.jsx)(I.Z,{})]})})}),l&&(0,i.jsxs)(k.Z,{px:2,py:2,minWidth:400,alignItems:"left",children:[(0,i.jsx)("div",{onClick:handleHideDisplayable,children:(0,i.jsxs)(k.Z,{direction:"row",alignItems:"right",children:[(0,i.jsx)(j.Z,{fontSize:16,minWidth:350,gutterBottom:!0,children:(0,i.jsx)("b",{children:e.name})}),(0,i.jsx)(b.Z,{})]})}),(0,i.jsx)(j.Z,{fontSize:14,gutterBottom:!0,children:e.value})]})]},t.name+"-credentialcomponennt"))]}),!n&&(0,i.jsx)(k.Z,{direction:"row",children:(0,i.jsx)(C.Z,{variant:"text",onClick:()=>{r(!0)},children:"Show details"})})]})},RequestDetails=e=>{let{intent:t}=e,[n]=(0,r.V)(s.Bx);null==n||n.profile();let l=null==n?void 0:n.credentials(),[c,d]=(0,u.useState)(!1),[b]=(0,r.V)(null==l?void 0:l.credentials$),[I,k]=(0,u.useState)(null),[C,P]=(0,u.useState)(!1),[Z,N]=(0,u.useState)(""),[D,E]=(0,u.useState)(!1),[R,U]=(0,u.useState)(!1),{showErrorToast:O}=(0,v.p)(),{unlockerIsCancelled:A}=(0,p.NX)(),[T]=(0,r.V)(o.jU),[_]=(0,r.V)(null==T?void 0:T.get("identity").regularIdentities$),B=t.requestPayload,q=t.requestPayload.caller;(0,u.useEffect)(()=>{B&&_&&n&&organizeImportedCredentials(B.credentials).then(e=>{k(e)})},[B,_,n]);let organizeImportedCredentials=async e=>{if(!e)return[];let t=null,i=[];for(let r of e){let e=h.VerifiableCredential.parse(r.toString()),l=e.getSubject().getProperties(),s=e.id.getDid().toString(),a=_.findIndex(e=>e.did==s);-1==a&&P(!0),t?t!=s&&E(!0):t=s,t!=n.did&&U(!0);let o=[];for(let e of Object.keys(l)){let t=l[e];if("id"==e||"displayable"==e)continue;let n={name:e,value:t.toString()};o.push(n)}let c={name:e.getId().getFragment(),values:o,credential:await (0,g.C)(e)};i.push(c)}return N(t),i},approveRequest=async()=>{d(!0);let e=[];I.map(t=>{e.push(t.credential.getId().toString())});let n=!1;try{for(let e of I)await l.importCredential(e.credential.verifiableCredential,B.caller);n=await (0,a.h)(t.id,e)}catch(e){w.k.error("ImportCredential","Import credential error",e)}if(!n){O("Import credential error, Please retry after a while.");return}await (null==T?void 0:T.get("activity").createActivity({type:x.T.CREDENTIALS_IMPORTED,credentialsCount:I.length,appDid:q}));let i=(0,y.Q)(t.redirectUrl,"rid",t.id);window.location.href=i},rejectRequest=async()=>{await (0,a.h)(t.id,null);let e=(0,y.Q)(t.redirectUrl,"rid",t.id);window.location.href=e};return(0,i.jsxs)(i.Fragment,{children:[n&&(0,i.jsxs)("div",{className:"text-center",children:[(0,i.jsx)(S.O,{applicationDID:q}),(0,i.jsx)(j.Z,{mt:4,children:"You are going to attach some infomation provided by a third party to your identity."}),(0,i.jsx)(j.Z,{mt:1,children:"Please review the following data:"}),null==I?void 0:I.map((e,t)=>(0,i.jsx)(CredentialPreviewWithDetails,{importedCredential:e},t)),D&&(0,i.jsx)(j.Z,{my:4,children:"Import is only supported for one identity at a time for now."}),C&&(0,i.jsx)(j.Z,{my:4,children:"Is this credential really for you? It's not targeted at any of your existing identities..."}),(D||C)&&(0,i.jsx)(m.c,{onClick:rejectRequest,children:"Cancel"}),!C&&!D&&R&&(0,i.jsxs)("div",{children:[(0,i.jsx)(j.Z,{my:4,children:"The identity that will contain the imported information is:"}),(0,i.jsx)(j.Z,{fontSize:14,children:Z})]}),!C&&!D&&!R&&(0,i.jsxs)("div",{className:"flex items-center space-x-3",children:[(0,i.jsx)(m.c,{className:"w-1/2",onClick:rejectRequest,children:"Cancel"}),(0,i.jsx)(m.c,{className:"w-1/2",onClick:approveRequest,busy:c,disabled:!b,children:"Import this to my profile"})]}),A&&(0,i.jsx)(f.d,{className:"mt-2"})]}),!T&&"Please sign in or sign up to continue",T&&!n&&"Please make an identity active to continue"]})};var page=()=>{let e=(0,c.useSearchParams)(),t=e.get("rid"),[n,m]=(0,u.useState)(!0),[f,p]=(0,u.useState)(null),[h]=(0,r.V)(o.jU),[x]=(0,r.V)(s.Bx);return(0,u.useEffect)(()=>{t&&(0,a.S)(t).then(e=>{m(!1),p(e)})},[t]),(0,u.useEffect)(()=>{h&&x?(0,l.Ad)():(0,l.qC)(window.location.href)},[h,x]),(0,i.jsxs)("div",{className:"col-span-full",children:[n&&(0,i.jsx)(d.O,{className:"mb-6"}),!n&&f&&(0,i.jsx)(RequestDetails,{intent:f}),!n&&!f&&(0,i.jsx)("div",{children:"No matching request"})]})}},80072:function(e,t,n){"use strict";var i=n(57437),r=n(2265),l=n(35843),s=n(71711),a=n(52653),o=n(81679),c=n(49605),u=n(4193),d=n(57042);let m=(0,l.ZP)(s.Z)(e=>{let{theme:t}=e;return{input:{color:"white",marginTop:{xs:16,sm:20},[t.breakpoints.down("sm")]:{marginTop:16},[t.breakpoints.up("sm")]:{marginTop:20}}}}),f=(0,l.ZP)(a.Z)(e=>{let{theme:t}=e;return{color:"white"}});t.Z=e=>{let{outerProps:t={},inputProps:n={}}=e,[l,s]=r.useState(!1);return(0,i.jsx)(m,{...t,type:l?"input":"password",className:(0,d.Z)("password-input",!l&&"redacted"),inputProps:{maxLength:100,...n},startAdornment:(0,i.jsx)(o.Z,{position:"start",className:"absolute"}),endAdornment:(0,i.jsx)(o.Z,{position:"end",children:(0,i.jsx)(f,{size:"small","aria-label":"toggle password visibility",onClick:()=>s(e=>!e),onMouseDown:e=>{e.preventDefault()},children:l?(0,i.jsx)(u.Z,{sx:{fontSize:{xs:20,sm:24}}}):(0,i.jsx)(c.Z,{sx:{fontSize:{xs:20,sm:24}}})})})})}},66267:function(e,t,n){"use strict";n.d(t,{C:function(){return a}});var i=n(57437),r=n(3283),l=n(43226),s=n(35843);let a=(0,s.ZP)(r.Z)(e=>{let{theme:t}=e;return{backgroundColor:"#9D3E3E",color:"white",width:36,height:36,padding:8}});t.Z=e=>{let{icon:t,title:n,description:r,className:s=""}=e;return(0,i.jsxs)("div",{className:"text-[#DDD] ".concat(s),children:[(0,i.jsx)("div",{className:"inline-flex pb-1",children:(0,i.jsx)(a,{children:t})}),(0,i.jsx)(l.Z,{variant:"body1",className:"underline underline-offset-2",children:n}),(0,i.jsx)(l.Z,{variant:"body2",children:r})]})}},49017:function(e,t,n){"use strict";var i=n(35843),r=n(84081);let l=(0,i.ZP)(r.Z)(e=>{let{theme:t}=e;return{".MuiInput-root":{marginTop:0,"&:before, &:after":{opacity:.18,borderColor:"dark"==t.palette.mode?"white":t.palette.primary.main}},".MuiInputBase-root.MuiInput-root:hover:not(.Mui-disabled, .Mui-error)":{"&:before, &:after":{opacity:.18,borderColor:"dark"==t.palette.mode?"white":t.palette.primary.main}},".MuiInput-root.Mui-focused":{"&:before, &:after":{opacity:.3}},".MuiInputLabel-root, .MuiInputLabel-root.Mui-focused:not(.Mui-error)":{color:"white",fontSize:"10px",transform:"unset",WebkitTransform:"unset"},"#holder-name":{fontWeight:600,fontSize:"15pt",textAlign:"center",caretColor:"white",color:"rgb(255 255 255 / 65%)"},".password-input.redacted":{fontFamily:"Redacted Script"},".MuiFormHelperText-root":{marginLeft:0,display:"none"},".MuiFormHelperText-root.Mui-error, .MuiFormHelperText-root.visible":{display:"block"}}});t.Z=l},9254:function(e,t,n){"use strict";n.d(t,{c:function(){return MainButton}});var i=n(57437),r=n(6882),l=n(49050),s=n(57042);let MainButton=e=>{let{leftIcon:t,size:n="medium",mode:a="default",onClick:o,children:c,busy:u=!1,disabled:d=!1,className:m}=e,f=(0,i.jsx)(r.Z,{size:16});return(0,i.jsx)("div",{className:(0,s.Z)("flex",m),children:(0,i.jsx)(l.Z,{className:"flex-1",startIcon:u?f:t,disabled:u||d,size:n,color:"default"===a?"primary":"error",variant:"contained",onClick:o,children:c})})}},4528:function(e,t,n){"use strict";n.d(t,{a:function(){return LoadingCircle_LoadingCircle}});var i=n(57437),r=n(57042);let LoadingCircle_LoadingCircle=e=>{let{className:t,width:n,height:l}=e;return(0,i.jsx)("div",{className:(0,r.Z)("loading-circle",t),style:{...n&&{width:n},...l&&{height:l}},children:(0,i.jsx)("div",{className:"content",children:(0,i.jsx)("div",{className:"animated"})})})}},29439:function(e,t,n){"use strict";n.d(t,{d:function(){return UnlockRetrier}});var i=n(57437),r=n(9254),l=n(57042),s=n(70906);let UnlockRetrier=e=>{let{className:t}=e,{retryUnlock:n}=(0,s.lJ)();return(0,i.jsxs)("div",{className:(0,l.Z)("flex flex-row items-center gap-2",t),children:[(0,i.jsx)("div",{children:"This content could not be unlocked, please retry"}),(0,i.jsx)(r.c,{onClick:()=>{n()},children:"Unlock personal data"})]})}},70906:function(e,t,n){"use strict";n.d(t,{au:function(){return UnlockKeyPromptContextProvider},lJ:function(){return useUnlockKeyPrompt},NX:function(){return useUnlockPromptState}});var i=n(57437),r=n(39513),l=n(66267),s=n(14504),a=n(40542),o=n(95815),c=n(94025),u=n(5253),d=n(64101),m=n(56176),f=n(22079),p=n(43226),h=n(96507),x=n(35843),g=n(7482),j=n(36079),v=n(50707),w=n(14776),y=n(2265),S=n(39830),b=n(23785);let PasskeyPrompt=e=>{let{onConfirm:t,disabled:n}=e,[r]=(0,a.V)(w.jU),l=null==r?void 0:r.get("security"),onSubmit=async()=>{let e=await l.unlockPasskeyLocally();t(e)};return(0,i.jsx)(b.Kz,{id:"bind-ms",className:"w-11/12 sm:w-4/5",startIcon:(0,i.jsx)(S.JO,{icon:"material-symbols:passkey"}),disabled:n,onClick:onSubmit,children:"Unlock with passkey"})};var I=n(50819),k=n(49017),C=n(80072);let PasswordPrompt=e=>{let{onConfirm:t,disabled:n}=e,[r,l]=(0,y.useState)(""),s=(0,y.useRef)(null),submitPassword=e=>{if(e.preventDefault(),!s.current.value){s.current.focus();return}t(s.current.value)};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("form",{onSubmit:submitPassword,children:(0,i.jsxs)(k.Z,{fullWidth:!0,children:[(0,i.jsx)(I.Z,{htmlFor:"pw",children:"PASSWORD"}),(0,i.jsx)(C.Z,{outerProps:{autoFocus:!0,disabled:n,onChange:e=>{l(e.target.value)}},inputProps:{ref:s}})]})}),(0,i.jsx)("div",{className:"p-2 pt-3 sm:pt-4 pb-0 text-center",children:(0,i.jsx)(b.Kz,{id:"bind-ms",className:"w-11/12 sm:w-4/5",disabled:n||!r.length,onClick:submitPassword,children:"Continue"})})]})};var P=n(51894),Z=n(53946);let N=(0,y.createContext)({actions:null,setActions:null});function UnlockKeyPromptContextProvider(e){let[t,n]=(0,y.useState)(null);return(0,i.jsxs)(N.Provider,{value:{actions:t,setActions:n},children:[e.children,(0,i.jsx)(UnlockKeyPrompt,{})]})}let D=y.forwardRef(function(e,t){return(0,i.jsx)(m.Z,{ref:t,...e})}),E=(0,x.ZP)("div")(e=>{let{theme:t}=e;return{background:"linear-gradient(to right, #242424, #333 50%, transparent)"}}),UnlockKeyPrompt=()=>{let{actions:e,setActions:t}=(0,y.useContext)(N),[n]=(0,a.V)(w.jU),o=null==n?void 0:n.get("security"),[c]=(0,a.V)(null==o?void 0:o.passwordKeys$),[m]=(0,a.V)(null==o?void 0:o.passkeyKeys$),{promptMasterKeyUnlock:x}=useUnlockKeyPrompt(),hideDialog=()=>{t(null)};return(0,y.useEffect)(()=>{let e=Z.lw.subscribe(e=>{e&&!e.handled&&(e.handled=!0,callWithUnlockHandler(e,x))});return()=>e.unsubscribe()},[x]),(0,i.jsx)(f.Z,{open:!!e,disablePortal:!0,onClose:()=>{var t;null===(t=e.onUnlockKey)||void 0===t||t.call(e,null),hideDialog()},TransitionComponent:D,PaperProps:{sx:{backgroundImage:"none"}},children:(0,i.jsxs)("div",{className:"p-4 sm:p-6",children:[(0,i.jsxs)(E,{className:"flex items-center gap-x-2 px-4 py-2",children:[(0,i.jsx)(l.C,{children:(0,i.jsx)(d.Z,{fontSize:"small"})}),(0,i.jsx)(p.Z,{variant:"h6",className:"ml-4",children:"Screen content is locked!"})]}),(0,i.jsx)(p.Z,{variant:"body1",className:"px-4 py-2",children:"Enter password or authenticate passkey to unlock the screen."}),(0,i.jsx)(r.CA,{className:"relative w-full mt-4 md:pb-2",children:(0,i.jsx)("div",{className:"absolute inset-0 p-2",children:(0,i.jsx)("div",{className:"dashed-body w-full h-full rounded-2xl p-1.5 flex items-center",children:(0,i.jsx)(h.Z,{className:"w-full",sx:{px:{xs:1.5,sm:3},py:{xs:0,sm:4}},children:(0,i.jsxs)("div",{className:"flex flex-col",children:[(0,i.jsx)(PasswordPrompt,{onConfirm:t=>{var n;null===(n=e.onUnlockKey)||void 0===n||n.call(e,{type:u.J.PASSWORD,keyId:"unused-for-now-for-passwords",key:t}),hideDialog()},disabled:(null==c?void 0:c.length)==0}),(0,i.jsxs)("div",{className:"p-2 pt-0 text-center",children:[(0,i.jsx)(h.Z,{sx:{py:{xs:1,sm:2}},children:(0,i.jsx)(s.Z,{text:"or browser authentication"})}),(0,i.jsx)(PasskeyPrompt,{onConfirm:t=>{var n;null===(n=e.onUnlockKey)||void 0===n||n.call(e,t),hideDialog()},disabled:(null==m?void 0:m.length)==0})]})]})})})})})]})})};function useUnlockPromptState(){let[e]=(0,a.V)(Z.Mn),[t,n]=(0,y.useState)(!0),[i,r]=(0,y.useState)(!1);return(0,y.useEffect)(()=>{switch(e){case Z.xb.Idle:n(!0),r(!1);break;case Z.xb.UnlockCancelled:n(!1),r(!0)}},[e]),{unlockerIsIdle:t,unlockerIsCancelled:i}}let useUnlockKeyPrompt=()=>{let{setActions:e}=(0,y.useContext)(N),[t]=(0,a.V)(w.jU);return{promptMasterKeyUnlock:()=>new Promise(t=>{e({onUnlockKey:t})}),retryUnlock:()=>(0,P.H)(()=>t.get("security").checkRemoteUnlockStatus())}};async function callWithUnlockHandler(e,t){try{let t=await e.method();e.resolve(t)}catch(n){if(n instanceof o._){if((0,v.z)(n)){j.k.warn("security","This method call requires unlock authorization from the user. Prompting");let n=await t();if(n){await (0,g.wo)(n);let t=await (0,P.H)(e.method,e.silentCancellation,e.defaultValue,!1);e.resolve(t)}else Z.Mn.next(Z.xb.UnlockCancelled),j.k.warn("security","Unlock operation cancelled by user"),e.reject(o._.newClientError(c.XF.UnlockKeyCancelled,"CANCELLED"))}else e.reject(n)}else j.k.error("security","Unhandled callWithUnlock() non app exception (will get stuck):",n)}}},14504:function(e,t,n){"use strict";var i=n(57437),r=n(57042),l=n(54986),s=n(43226),a=n(35843);let o=(0,a.ZP)(l.Z)(e=>{let{theme:t}=e;return{"&:before, &:after":{borderTopColor:"#C4C4C4"}}});t.Z=e=>{let{text:t,textClassName:n=""}=e;return(0,i.jsx)(o,{children:(0,i.jsx)(s.Z,{variant:"caption",className:(0,r.Z)("px-4 font-bold text-white",n),children:t})})}},40542:function(e,t,n){"use strict";n.d(t,{V:function(){return useBehaviorSubject}});var i=n(2265);let useBehaviorSubject=e=>{let[t,n]=(0,i.useState)(null==e?void 0:e.getValue()),[r,l]=(0,i.useState)();return(0,i.useEffect)(()=>{if(!e){n(null);return}let t=e.subscribe({next:e=>{n(e)},error:l});return()=>t.unsubscribe()},[e]),[t]}},69147:function(e,t,n){"use strict";var i,r;n.d(t,{T:function(){return i}}),(r=i||(i={})).NEW_ACCOUNT="NEW_ACCOUNT",r.USER_SIGN_IN="USER_SIGN_IN",r.IDENTITY_CREATED="IDENTITY_CREATED",r.IDENTITY_DELETED="IDENTITY_DELETED",r.CREDENTIALS_IMPORTED="CREDENTIALS_IMPORTED",r.CREDENTIALS_SHARED="CREDENTIALS_SHARED",r.BIND_EMAIL="BIND_EMAIL",r.BIND_BROWSER="BIND_BROWSER",r.PASSWORD_CHANGED="PASSWORD_CHANGED"},63491:function(e,t,n){"use strict";n.d(t,{$Y:function(){return setOnGoingFlowOperation},Ad:function(){return clearPostSignInUrl},Kt:function(){return getOnGoingFlowOperation},cX:function(){return r},fK:function(){return clearOnGoingFlowOperation},qC:function(){return setPostSignInUrl},vX:function(){return usePostSignInFlow}});var i,r,l=n(92e3),s=n(36079);(i=r||(r={}))[i.OnBoardingEmailBinding=0]="OnBoardingEmailBinding",i[i.OnBoardingBrowserBinding=1]="OnBoardingBrowserBinding",i[i.EmailSignIn=2]="EmailSignIn";let a="ongoingflowoperation",o="postsigninurl";function getOnGoingFlowOperation(){return r[localStorage.getItem(a)]}function setOnGoingFlowOperation(e){localStorage.setItem(a,r[e])}function clearOnGoingFlowOperation(){localStorage.removeItem(a)}function setPostSignInUrl(e){s.k.log("flow","Setting post sign in url to:",e),localStorage.setItem(o,e)}function clearPostSignInUrl(){s.k.log("flow","Clearing post sign in url"),localStorage.removeItem(o)}function usePostSignInFlow(){let e=(0,l.useRouter)();return{navigateToPostSignInLandingPage(t){let n=localStorage.getItem(o);if(n)s.k.log("flow","Navigating to post sign in landing page:",n),e.replace(n),clearPostSignInUrl();else{let n=t||"/dashboard";s.k.log("flow","Navigating to post sign in landing page ".concat(n)),e.push(n)}}}}},61568:function(e,t,n){"use strict";n.d(t,{S:function(){return fetchIntent},h:function(){return fulfilIntentRequest}});var i=n(60230),r=n(23965);let Intent=class Intent{static async fromJson(e){let t=new Intent;return Object.assign(t,e),t.createdAt=new Date(e.createdAt),t}};var l=n(29748),s=n(91395),a=n(36079);function _templateObject(){let e=(0,i._)(["\n      query GetIntentRequest($intentId: String!) {\n        intent (id: $intentId) {\n          ","\n        }\n      }\n    "]);return _templateObject=function(){return e},e}function _templateObject1(){let e=(0,i._)(["\n      mutation FulfilIntentRequest($input: FulfilIntentInput!) {\n        fulfilIntent (input: $input)\n      }\n    "]);return _templateObject1=function(){return e},e}async function fetchIntent(e){var t;let n=await (0,l.Pt)(async()=>(await (0,s.W)()).query({query:(0,r.Ps)(_templateObject(),"\n  id\n  createdAt\n  type\n  redirectUrl\n  requestPayload\n  responsePayload\n"),variables:{intentId:e}}));if(null==n?void 0:null===(t=n.data)||void 0===t?void 0:t.intent){let e=await Intent.fromJson(n.data.intent);return a.k.log("intents","Fetched intent:",e),e}return a.k.warn("intents","No intent found for id ".concat(e)),null}async function fulfilIntentRequest(e,t){var n;let i=await (0,l.Pt)(async()=>(await (0,s.W)()).mutate({mutation:(0,r.Ps)(_templateObject1()),variables:{input:{intentId:e,payload:t}}}));return(null==i?void 0:null===(n=i.data)||void 0===n?void 0:n.fulfilIntent)?(a.k.log("intents","Successfully fulfilled intent id ".concat(e)),!0):(a.k.warn("intents","Failed to fulfil intent id ".concat(e)),!1)}},43639:function(e,t,n){"use strict";function setQueryParameter(e,t,n){let i=new URL(e),r=new URLSearchParams(i.search);return r.set(t,n),i.search=r.toString(),i.toString()}n.d(t,{Q:function(){return setQueryParameter}})}},function(e){e.O(0,[6990,9787,9443,8218,3988,395,8321,3824,6642,1228,5295,1510,8251,6953,2e3,1880,894,4558,4448,7998,1869,1241,3262,9513,2971,7864,1744],function(){return e(e.s=44069)}),_N_E=e.O()}]);