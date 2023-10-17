(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2340],{89396:function(e,t,s){"use strict";var n=s(26314);t.Z=void 0;var i=n(s(80984)),r=s(57437),l=(0,i.default)((0,r.jsx)("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}),"Add");t.Z=l},60289:function(e,t,s){"use strict";var n=s(26314);t.Z=void 0;var i=n(s(80984)),r=s(57437),l=(0,i.default)((0,r.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"}),"Error");t.Z=l},14819:function(e,t,s){"use strict";var n=s(26314);t.Z=void 0;var i=n(s(80984)),r=s(57437),l=(0,i.default)((0,r.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"}),"Info");t.Z=l},64101:function(e,t,s){"use strict";var n=s(26314);t.Z=void 0;var i=n(s(80984)),r=s(57437),l=(0,i.default)((0,r.jsx)("path",{d:"M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"}),"Security");t.Z=l},52727:function(e){e.exports=function(e){return null==e}},90913:function(e,t,s){Promise.resolve().then(s.bind(s,9614))},5796:function(e,t,s){"use strict";s.d(t,{S:function(){return SecurityStatus},X:function(){return i}});var n,i,r=s(57437),l=s(60289),o=s(14819),c=s(39830);(n=i||(i={}))[n.Unknown=0]="Unknown",n[n.Good=1]="Good",n[n.Average=2]="Average",n[n.Bad=3]="Bad";let a={0:"#3A3A3A",1:"#34A853",2:"#ED6C02",3:"#EA4335"},d={0:(0,r.jsx)(c.JO,{icon:"fluent-mdl2:unknown-solid",fontSize:24}),1:(0,r.jsx)(c.JO,{icon:"carbon:checkmark-filled",fontSize:24}),2:(0,r.jsx)(o.Z,{}),3:(0,r.jsx)(l.Z,{})},SecurityStatus=e=>{let{state:t,advice:s}=e;return(0,r.jsxs)("div",{className:"flex rounded-lg px-2 py-4 flex gap-2",style:{background:a[t]},children:[(0,r.jsx)("span",{className:"text-white",children:d[t]}),(0,r.jsx)("span",{className:"text-white text-[13px] leading-[1.4] font-semibold",children:s})]})}},9614:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return page}});var n=s(57437),i=s(2265),r=s(28874),l=s(63491),o=s(15707);let WelcomeBanner=e=>(0,n.jsx)(o.Z,{title:"Explore your Web3-powered identity experience.",description:"Unlock the full potential of your digital identity by seamlessly integrating it across an extensive array of platforms and services. This harmonious synergy simplifies your online engagement, ensuring a comprehensive and interconnected digital experience.",showBg:!0});var c=s(52727),a=s.n(c),d=s(92e3),u=s(30666),h=s(64101),x=s(40542),m=s(14776),p=s(5796),y=s(83129),j=s(19959),g=s(39830),v=s(3283),f=s(38212),w=s(96507),A=s(35843),SecurityIcon=e=>{let{turnedOn:t,width:s=24}=e;return(0,n.jsx)(h.Z,{width:s,sx:{color:t?"#34A853":"#EA4335"}})},b=s(57042);let Z=(0,A.ZP)(v.Z)(e=>{let{theme:t}=e;return{backgroundColor:"#3A3A3A",color:"#DDD",width:36,height:36,padding:8}}),N={email:{title:"Sign in with email address",icon:"entypo:email",action:"LINKED"},browser:{title:"Sign in with this browser",icon:"fluent-mdl2:website",action:"BOUND"}},AccountAccessRow=e=>{let{method:t,secondaryDetail:s,isSet:i}=e;return(0,n.jsx)(j.m,{className:"h-[3.5rem]",avatar:(0,n.jsx)(Z,{children:(0,n.jsx)(g.JO,{icon:N[t].icon})}),rowCells:(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(u.Z,{children:(0,n.jsx)(f.Z,{className:"flex-1",primary:(0,n.jsxs)("div",{className:"flex items-center gap-1",children:[(0,n.jsx)("span",{className:(0,b.Z)("font-medium text-[11pt]",i?"":"text-[#9291A5]"),children:N[t].title}),(0,n.jsx)(SecurityIcon,{turnedOn:i})]}),secondary:(0,n.jsx)("span",{className:(0,b.Z)("text-[8pt]",i?"":"text-[#9291A5]"),children:s}),sx:{my:0},primaryTypographyProps:{sx:{lineHeight:1.3}},secondaryTypographyProps:{sx:{lineHeight:1}}})}),(0,n.jsx)(u.Z,{sx:{padding:0},children:(0,n.jsx)(w.Z,{className:(0,b.Z)("rounded-md text-[8pt] px-3 py-0.5 inline-block text-white whitespace-nowrap",i?"bg-[#34A853]":"bg-[#EA4335]"),children:"".concat(t.toUpperCase()," ").concat(i?"":"NOT ").concat(N[t].action)})})]})})};var S=s(23785),k=s(97716),C=s(39982);let AccountAccess=e=>{var t;let[s]=(0,x.V)(m.jU),[r]=(0,x.V)(null==s?void 0:s.get("activity").activities$),{mounted:l}=(0,k.s)(),[o]=(0,x.V)(null==s?void 0:s.get("email").userEmails$),[c]=(0,x.V)(null==s?void 0:s.get("security").passkeyKeys$),[g,v]=(0,i.useState)(p.X.Unknown),[f,w]=(0,i.useState)(null),[A,b]=(0,i.useState)(!1),Z=(0,d.useRouter)();return(0,i.useEffect)(()=>{if(b(!1),a()(o)||a()(c)){v(p.X.Unknown),w("Checking status...");return}if(o.length>0){if(c.length>0){v(p.X.Good),w("Perfect, you will be able to sign in to your account with your email or with your browser");return}v(p.X.Good),w("All good, you will be able to sign in to your account with your email. You could also bind one or more browsers for faster access");return}if(c.length>0){v(p.X.Average),w("Only 1 browser bound but no email address. You will loose your account if you loose access to the browser."),b(!0);return}v(p.X.Bad),w("No email nor browser bound to your account yet, you won't be able to sign in to your account. Please check the security center soon."),b(!0)},[o,c]),(0,n.jsxs)(y.Z,{className:"h-full",title:"Account Access",able2ShowAll:!1,children:[(0,n.jsx)(j.J,{headCells:(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(u.Z,{children:"SIGN IN METHOD"}),(0,n.jsx)(u.Z,{children:"STATUS"})]}),bodyRows:!l||a()(o)||a()(c)?[,,].fill(0).map((e,t)=>(0,n.jsx)(C.IT,{},t)):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(AccountAccessRow,{method:"email",secondaryDetail:(null==o?void 0:o.length)>0?o[0].email:"No available email address found",isSet:(null==o?void 0:o.length)>0}),(0,n.jsx)(AccountAccessRow,{method:"browser",secondaryDetail:null===(t=r[0])||void 0===t?void 0:t.browserNameStr,isSet:(null==c?void 0:c.length)>0})]})}),!!f&&(0,n.jsx)(p.S,{state:g,advice:f}),A&&(0,n.jsx)("div",{className:"mt-[6%]",children:(0,n.jsx)(S.Kz,{startIcon:(0,n.jsx)(h.Z,{}),className:"w-full",onClick:()=>{Z.push("/account/security")},children:"Go to security center"})})]})},T=(0,A.ZP)(v.Z)(e=>{let{theme:t}=e;return{backgroundColor:"#3A3A3A",color:"#DDD",width:36,height:36,padding:8}}),I={password:{title:"Decrypt data using password",icon:"ic:round-password",action:"SET"},biometrics:{title:"Decrypt data using browser's biometrics",icon:"fluent:fingerprint-48-filled",action:"SET"}},EncryptAccessRow=e=>{let{method:t,secondaryDetail:s,isSet:i}=e;return(0,n.jsx)(j.m,{className:"h-[3.5rem]",avatar:(0,n.jsx)(T,{children:(0,n.jsx)(g.JO,{icon:I[t].icon})}),rowCells:(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(u.Z,{children:(0,n.jsx)(f.Z,{className:"flex-1",primary:(0,n.jsxs)("div",{className:"flex items-center gap-1",children:[(0,n.jsx)("span",{className:"font-medium text-[11pt] text-[#9291A5]",children:I[t].title}),(0,n.jsx)(SecurityIcon,{turnedOn:i})]}),secondary:(0,n.jsx)("span",{className:"text-[8pt] text-[#9291A5]",children:s}),sx:{my:0},primaryTypographyProps:{sx:{lineHeight:1.3}},secondaryTypographyProps:{sx:{lineHeight:1}}})}),(0,n.jsx)(u.Z,{sx:{padding:0},children:(0,n.jsx)(w.Z,{className:(0,b.Z)("rounded-md text-[8pt] px-3 py-0.5 inline-block text-white whitespace-nowrap",i?"bg-[#34A853]":"bg-[#EA4335]"),children:"".concat(t.toUpperCase()," ").concat(i?"":"NOT ").concat(I[t].action)})})]})})},AccountUnlock=e=>{var t;let[s]=(0,x.V)(m.jU),[r]=(0,x.V)(null==s?void 0:s.get("activity").activities$),[l]=(0,x.V)(null==s?void 0:s.get("security").passkeyKeys$),[o]=(0,x.V)(null==s?void 0:s.get("security").passwordKeys$),[c,g]=(0,i.useState)(p.X.Unknown),[v,f]=(0,i.useState)(null),[w,A]=(0,i.useState)(!1),{mounted:b}=(0,k.s)(),Z=(0,d.useRouter)();return(0,i.useEffect)(()=>{if(A(!1),a()(o)||a()(l)){g(p.X.Unknown),f("Checking status...");return}if(o.length>0){if(l.length>0){g(p.X.Good),f("Perfect, you will be able to unlock your encrypted data with your password or with your browser.");return}g(p.X.Good),f("All good, you will be able to unlock your encrypted data with your password. You could also bind one or more browsers for faster access");return}if(l.length>0){g(p.X.Average),f("Only 1 browser bound but no password. You will loose your account if you loose access to the password. Remember that the password cannot be recovered, there is no 'password lost' service."),A(!0);return}g(p.X.Bad),f("No email nor password bound to your account yet, you don't have access to all the features that use encrypted data such as identities."),A(!0)},[o,l]),(0,n.jsxs)(y.Z,{className:"h-full",title:"Encrypted Content Access",able2ShowAll:!1,children:[(0,n.jsx)(j.J,{headCells:(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(u.Z,{children:"DECRYPTION METHOD"}),(0,n.jsx)(u.Z,{children:"STATUS"})]}),bodyRows:!b||a()(o)||a()(l)?[,,].fill(0).map((e,t)=>(0,n.jsx)(C.IT,{},t)):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(EncryptAccessRow,{method:"password",secondaryDetail:(null==o?void 0:o.length)>0?"**********":"No password set",isSet:(null==o?void 0:o.length)>0}),(0,n.jsx)(EncryptAccessRow,{method:"biometrics",secondaryDetail:null===(t=r[0])||void 0===t?void 0:t.browserNameStr,isSet:(null==l?void 0:l.length)>0})]})}),!!v&&(0,n.jsx)(p.S,{state:c,advice:v}),w&&(0,n.jsx)("div",{className:"mt-[6%]",children:(0,n.jsx)(S.Kz,{startIcon:(0,n.jsx)(h.Z,{}),className:"w-full",onClick:()=>{Z.push("/account/security")},children:"Go to security center"})})]})};var E=s(24033),D=s(89396),R=s(98489),V=s(69991),U=s(66615),O=s(38651),P=s(57958),z=s(19739),F=s(63429);let IdentityRow=e=>{let{identity:t}=e,[s]=(0,x.V)(t.profile().name$),[i]=(0,x.V)(P.Bx),{showSuccessToast:r}=(0,z.p)(),l=(0,d.useRouter)(),handleCellClick=e=>{if(e!==i){let t=(0,U.L)(e.did,8);r("Your current active identity is: "+s+"("+t+")")}F.D.setActiveIdentity(e),l.push("/profile")};return(0,n.jsx)(j.m,{props:{hover:!0},onClick:()=>handleCellClick(t),className:"h-[3.5rem] cursor-pointer",avatar:(0,n.jsx)(V.i,{identity:t,width:36,height:36}),rowCells:(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(u.Z,{children:(0,n.jsx)(f.Z,{className:"flex-1",primary:(0,n.jsx)("span",{className:"font-medium",children:s||"Unnamed identity"}),secondary:(0,n.jsx)("span",{className:"text-[8pt]",children:(0,U.L)(t.did,8)}),sx:{my:0},primaryTypographyProps:{sx:{lineHeight:1.3}},secondaryTypographyProps:{sx:{lineHeight:1.2}}})}),(0,n.jsx)(u.Z,{children:(0,O.x)(t.createdAt)})]})})},IdentityListWidget=e=>{let[t]=(0,x.V)(m.jU),[s]=(0,x.V)(null==t?void 0:t.get("identity").regularIdentities$),{mounted:i}=(0,k.s)(),r=(0,E.useRouter)(),l=s&&[...s].sort((e,t)=>{let s=e.lastUsedAt$.getValue().getTime(),n=t.lastUsedAt$.getValue().getTime();return n-s});return(0,n.jsx)(y.Z,{className:"h-full",title:"My Identities",showAllAction:()=>{r.push("/identities")},children:(0,n.jsxs)("div",{className:"mb-1",children:[(0,n.jsx)(j.J,{headCells:(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(u.Z,{children:"IDENTITY"}),(0,n.jsx)(u.Z,{children:"CREATED"})]}),bodyRows:i&&l?(0,n.jsx)(n.Fragment,{children:l.length?l.slice(0,4).map((e,t)=>(0,n.jsx)(IdentityRow,{identity:e},t)):(0,n.jsx)(n.Fragment,{children:(0,n.jsx)(R.Z,{children:(0,n.jsx)(u.Z,{component:"th",colSpan:3,align:"center",children:(0,n.jsx)("span",{className:"text-base",children:"No identity yet."})})})})}):[,,].fill(0).map((e,t)=>(0,n.jsx)(C.IT,{},t))}),(0,n.jsx)("div",{className:"w-full mt-2",children:(0,n.jsx)(S.Kz,{startIcon:(0,n.jsx)(D.Z,{}),onClick:()=>{r.push("/new-identity")},className:"w-full mt-4",children:"CREATE IDENTITY"})})]})})};var X=s(28451);let RecentActivityWidget=e=>{let[t]=(0,x.V)(m.jU),{mounted:s}=(0,k.s)(),i=(0,d.useRouter)(),[r]=(0,x.V)(null==t?void 0:t.get("activity").activities$),l=null==r?void 0:r.slice(0,5);return(0,n.jsx)(y.Z,{className:"h-full",title:"Recent Activity",showAllAction:()=>{i.push("/recent-activity")},children:(0,n.jsx)("div",{className:"mb-1",children:(0,n.jsx)(j.J,{headCells:(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(u.Z,{children:"ACCOUNT ACTIVITY"}),(0,n.jsx)(u.Z,{children:"DATE"})]}),bodyRows:s&&l?(0,n.jsx)(n.Fragment,{children:l.length>0?l.map((e,t)=>(0,n.jsx)(X.p,{activity:e},t)):(0,n.jsx)(R.Z,{children:(0,n.jsx)(u.Z,{component:"th",colSpan:3,align:"center",children:(0,n.jsx)("span",{className:"text-base",children:"No activity found."})})})}):[,,,].fill(0).map((e,t)=>(0,n.jsx)(C.IT,{},t))})})})};var page=()=>((0,i.useEffect)(()=>{(0,l.fK)()},[]),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("div",{className:"col-span-full",children:(0,n.jsx)(WelcomeBanner,{})}),(0,n.jsxs)(r.ZP,{container:!0,spacing:3,children:[(0,n.jsx)(r.ZP,{item:!0,xs:12,md:6,children:(0,n.jsx)(RecentActivityWidget,{})}),(0,n.jsx)(r.ZP,{item:!0,xs:12,md:6,children:(0,n.jsx)(IdentityListWidget,{})}),(0,n.jsx)(r.ZP,{item:!0,xs:12,md:6,children:(0,n.jsx)(AccountAccess,{})}),(0,n.jsx)(r.ZP,{item:!0,xs:12,md:6,children:(0,n.jsx)(AccountUnlock,{})})]})]}))},69991:function(e,t,s){"use strict";s.d(t,{i:function(){return IdentityAvatar}});var n=s(57437),i=s(7045);let LettersAvatar=e=>{let{text:t,width:s=40,height:i=40}=e;return(0,n.jsx)("div",{className:"bg-indigo-400 p-2 rounded-sm overflow-hidden",style:{width:"".concat(s,"px"),height:"".concat(i,"px"),borderRadius:"50%",display:"flex",justifyContent:"center",alignItems:"center",color:"white",fontSize:"16px",lineHeight:1},children:t})};var r=s(40542),l=s(3283),o=s(53386),c=s(16691),a=s.n(c);let IdentityAvatar=e=>{let{identity:t,width:s=60,height:c=60}=e,[d]=(0,r.V)(null==t?void 0:t.profile().name$),[u]=(0,r.V)(null==t?void 0:t.profile().icon$);return(0,n.jsx)(n.Fragment,{children:u?(0,n.jsx)(l.Z,{sx:{width:s,height:c},children:u&&(0,n.jsx)(a(),{src:u,alt:"",width:s,height:c})}):(0,n.jsxs)(n.Fragment,{children:[!d&&(0,n.jsx)(i.Z,{width:s,height:c}),d&&(0,n.jsx)(LettersAvatar,{width:s,height:c,text:(0,o.OX)(d)})]})})}},66615:function(e,t,s){"use strict";function shortenDID(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:5,s=e.split(":");if(s.length<3)return e;let n=s[2];if(n.length<=2*t)return e;let i="".concat(n.substr(0,t),"...").concat(n.substr(-t));return"".concat(s[0],":").concat(s[1],":").concat(i)}s.d(t,{L:function(){return shortenDID}})}},function(e){e.O(0,[6990,9787,9443,8218,3988,395,8321,9152,5295,1510,1396,6953,2e3,182,7998,3510,4241,8930,3262,9513,9950,2971,7864,1744],function(){return e(e.s=90913)}),_N_E=e.O()}]);