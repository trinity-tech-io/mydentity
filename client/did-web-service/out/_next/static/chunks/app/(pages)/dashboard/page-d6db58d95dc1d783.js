(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2340],{89396:function(e,t,s){"use strict";var n=s(26314);t.Z=void 0;var i=n(s(80984)),r=s(57437),l=(0,i.default)((0,r.jsx)("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}),"Add");t.Z=l},60289:function(e,t,s){"use strict";var n=s(26314);t.Z=void 0;var i=n(s(80984)),r=s(57437),l=(0,i.default)((0,r.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"}),"Error");t.Z=l},14819:function(e,t,s){"use strict";var n=s(26314);t.Z=void 0;var i=n(s(80984)),r=s(57437),l=(0,i.default)((0,r.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"}),"Info");t.Z=l},64101:function(e,t,s){"use strict";var n=s(26314);t.Z=void 0;var i=n(s(80984)),r=s(57437),l=(0,i.default)((0,r.jsx)("path",{d:"M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"}),"Security");t.Z=l},52727:function(e){e.exports=function(e){return null==e}},90913:function(e,t,s){Promise.resolve().then(s.bind(s,9614))},5796:function(e,t,s){"use strict";s.d(t,{S:function(){return u},X:function(){return i}});var n,i,r=s(57437),l=s(60289),o=s(14819),a=s(39830);(n=i||(i={}))[n.Unknown=0]="Unknown",n[n.Good=1]="Good",n[n.Average=2]="Average",n[n.Bad=3]="Bad";let c={[i.Unknown]:"#3A3A3A",[i.Good]:"#34A853",[i.Average]:"#ED6C02",[i.Bad]:"#EA4335"},d={[i.Unknown]:(0,r.jsx)(a.JO,{icon:"fluent-mdl2:unknown-solid",fontSize:24}),[i.Good]:(0,r.jsx)(a.JO,{icon:"carbon:checkmark-filled",fontSize:24}),[i.Average]:(0,r.jsx)(o.Z,{}),[i.Bad]:(0,r.jsx)(l.Z,{})},u=e=>{let{state:t,advice:s}=e;return(0,r.jsxs)("div",{className:"flex rounded-lg px-2 py-4 flex gap-2",style:{background:c[t]},children:[(0,r.jsx)("span",{className:"text-white",children:d[t]}),(0,r.jsx)("span",{className:"text-white text-[13px] leading-[1.4] font-semibold",children:s})]})}},9614:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return L}});var n=s(57437),i=s(2265),r=s(28874),l=s(97716),o=s(63491),a=s(15707);let c=e=>(0,n.jsx)(a.Z,{title:"Explore your Web3-powered identity experience.",description:"Unlock the full potential of your digital identity by seamlessly integrating it across an extensive array of platforms and services. This harmonious synergy simplifies your online engagement, ensuring a comprehensive and interconnected digital experience.",showBg:!0});var d=s(52727),u=s.n(d),h=s(92e3),x=s(30666),m=s(64101),p=s(40542),j=s(14776),y=s(5796),g=s(83129),f=s(19959),v=s(39830),w=s(35843),b=s(3283),Z=s(38212),N=s(96507),A=e=>{let{turnedOn:t,width:s=24}=e;return(0,n.jsx)(m.Z,{width:s,sx:{color:t?"#34A853":"#EA4335"}})},S=s(57042);let T=(0,w.ZP)(b.Z)(e=>{let{theme:t}=e;return{backgroundColor:"#3A3A3A",color:"#DDD",width:36,height:36,padding:8}}),k={email:{title:"Sign in with email address",icon:"entypo:email",action:"LINKED"},browser:{title:"Sign in with this browser",icon:"fluent-mdl2:website",action:"BOUND"}},C=e=>{let{method:t,secondaryDetail:s,isSet:i}=e;return(0,n.jsx)(f.m,{className:"h-[3.5rem]",avatar:(0,n.jsx)(T,{children:(0,n.jsx)(v.JO,{icon:k[t].icon})}),rowCells:(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(x.Z,{children:(0,n.jsx)(Z.Z,{className:"flex-1",primary:(0,n.jsxs)("div",{className:"flex items-center gap-1",children:[(0,n.jsx)("span",{className:(0,S.Z)("font-medium text-[11pt]",i?"":"text-[#9291A5]"),children:k[t].title}),(0,n.jsx)(A,{turnedOn:i})]}),secondary:(0,n.jsx)("span",{className:(0,S.Z)("text-[8pt]",i?"":"text-[#9291A5]"),children:s}),sx:{my:0},primaryTypographyProps:{sx:{lineHeight:1.3}},secondaryTypographyProps:{sx:{lineHeight:1}}})}),(0,n.jsx)(x.Z,{sx:{padding:0},children:(0,n.jsx)(N.Z,{className:(0,S.Z)("rounded-md text-[8pt] px-3 py-0.5 inline-block text-white whitespace-nowrap",i?"bg-[#34A853]":"bg-[#EA4335]"),children:"".concat(t.toUpperCase()," ").concat(i?"":"NOT ").concat(k[t].action)})})]})})};var E=s(10146),V=s(39982);let D=e=>{var t;let[s]=(0,p.V)(j.jU),[r]=(0,p.V)(null==s?void 0:s.get("activity").activities$),{mounted:o}=(0,l.s)(),[a]=(0,p.V)(null==s?void 0:s.get("email").userEmails$),[c]=(0,p.V)(null==s?void 0:s.get("security").passkeyKeys$),[d,v]=(0,i.useState)(y.X.Unknown),[w,b]=(0,i.useState)(null),[Z,N]=(0,i.useState)(!1),A=(0,h.useRouter)();return console.log(r,999),(0,i.useEffect)(()=>{if(N(!1),u()(a)||u()(c)){v(y.X.Unknown),b("Checking status...");return}if(a.length>0){if(c.length>0){v(y.X.Good),b("Perfect, you will be able to sign in to your account with your email or with your browser");return}v(y.X.Good),b("All good, you will be able to sign in to your account with your email. You could also bind one or more browsers for faster access");return}if(c.length>0){v(y.X.Average),b("Only 1 browser bound but no email address. You will loose your account if you loose access to the browser."),N(!0);return}v(y.X.Bad),b("No email nor browser bound to your account yet, you won't be able to sign in to your account. Please check the security center soon."),N(!0)},[a,c]),(0,n.jsxs)(g.Z,{className:"h-full",title:"Account Access",able2ShowAll:!1,children:[(0,n.jsx)(f.J,{headCells:(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(x.Z,{children:"SIGN IN METHOD"}),(0,n.jsx)(x.Z,{children:"STATUS"})]}),bodyRows:!o||u()(a)||u()(c)?[,,].fill(0).map((e,t)=>(0,n.jsx)(V.IT,{},t)):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(C,{method:"email",secondaryDetail:(null==a?void 0:a.length)>0?a[0].email:"No available email address found",isSet:(null==a?void 0:a.length)>0}),(0,n.jsx)(C,{method:"browser",secondaryDetail:null===(t=r[0])||void 0===t?void 0:t.browserNameStr,isSet:(null==c?void 0:c.length)>0})]})}),!!w&&(0,n.jsx)(y.S,{state:d,advice:w}),Z&&(0,n.jsx)("div",{className:"mt-[6%]",children:(0,n.jsx)(E.Kz,{startIcon:(0,n.jsx)(m.Z,{}),className:"w-full",onClick:()=>{A.push("/account/security")},children:"Go to security center"})})]})},I=(0,w.ZP)(b.Z)(e=>{let{theme:t}=e;return{backgroundColor:"#3A3A3A",color:"#DDD",width:36,height:36,padding:8}}),U={password:{title:"Decrypt data using password",icon:"ic:round-password",action:"SET"},biometrics:{title:"Decrypt data using browser's biometrics",icon:"fluent:fingerprint-48-filled",action:"SET"}},O=e=>{let{method:t,secondaryDetail:s,isSet:i}=e;return(0,n.jsx)(f.m,{className:"h-[3.5rem]",avatar:(0,n.jsx)(I,{children:(0,n.jsx)(v.JO,{icon:U[t].icon})}),rowCells:(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(x.Z,{children:(0,n.jsx)(Z.Z,{className:"flex-1",primary:(0,n.jsxs)("div",{className:"flex items-center gap-1",children:[(0,n.jsx)("span",{className:"font-medium text-[11pt] text-[#9291A5]",children:U[t].title}),(0,n.jsx)(A,{turnedOn:i})]}),secondary:(0,n.jsx)("span",{className:"text-[8pt] text-[#9291A5]",children:s}),sx:{my:0},primaryTypographyProps:{sx:{lineHeight:1.3}},secondaryTypographyProps:{sx:{lineHeight:1}}})}),(0,n.jsx)(x.Z,{sx:{padding:0},children:(0,n.jsx)(N.Z,{className:(0,S.Z)("rounded-md text-[8pt] px-3 py-0.5 inline-block text-white whitespace-nowrap",i?"bg-[#34A853]":"bg-[#EA4335]"),children:"".concat(t.toUpperCase()," ").concat(i?"":"NOT ").concat(U[t].action)})})]})})},P=e=>{var t;let[s]=(0,p.V)(j.jU),[r]=(0,p.V)(null==s?void 0:s.get("activity").activities$),[o]=(0,p.V)(null==s?void 0:s.get("security").passkeyKeys$),[a]=(0,p.V)(null==s?void 0:s.get("security").passwordKeys$),[c,d]=(0,i.useState)(y.X.Unknown),[v,w]=(0,i.useState)(null),[b,Z]=(0,i.useState)(!1),{mounted:N}=(0,l.s)(),A=(0,h.useRouter)();return(0,i.useEffect)(()=>{if(Z(!1),u()(a)||u()(o)){d(y.X.Unknown),w("Checking status...");return}if(a.length>0){if(o.length>0){d(y.X.Good),w("Perfect, you will be able to unlock your encrypted data with your password or with your browser.");return}d(y.X.Good),w("All good, you will be able to unlock your encrypted data with your password. You could also bind one or more browsers for faster access");return}if(o.length>0){d(y.X.Average),w("Only 1 browser bound but no password. You will loose your account if you loose access to the password. Remember that the password cannot be recovered, there is no 'password lost' service."),Z(!0);return}d(y.X.Bad),w("No email nor password bound to your account yet, you don't have access to all the features that use encrypted data such as identities."),Z(!0)},[a,o]),(0,n.jsxs)(g.Z,{className:"h-full",title:"Encrypted Content Access",able2ShowAll:!1,children:[(0,n.jsx)(f.J,{headCells:(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(x.Z,{children:"DECRYPTION METHOD"}),(0,n.jsx)(x.Z,{children:"STATUS"})]}),bodyRows:!N||u()(a)||u()(o)?[,,].fill(0).map((e,t)=>(0,n.jsx)(V.IT,{},t)):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(O,{method:"password",secondaryDetail:(null==a?void 0:a.length)>0?"**********":"No password set",isSet:(null==a?void 0:a.length)>0}),(0,n.jsx)(O,{method:"biometrics",secondaryDetail:null===(t=r[0])||void 0===t?void 0:t.browserNameStr,isSet:(null==o?void 0:o.length)>0})]})}),!!v&&(0,n.jsx)(y.S,{state:c,advice:v}),b&&(0,n.jsx)("div",{className:"mt-[6%]",children:(0,n.jsx)(E.Kz,{startIcon:(0,n.jsx)(m.Z,{}),className:"w-full",onClick:()=>{A.push("/account/security")},children:"Go to security center"})})]})};var z=s(24033),F=s(89396),R=s(98489),X=s(69991),$=s(66615),G=s(38651),H=s(57958),B=s(19739),Y=s(36966);let J=e=>{let{identity:t}=e,[s]=(0,p.V)(t.profile().name$),[i]=(0,p.V)(H.Bx),{showSuccessToast:r}=(0,B.p)(),l=(0,h.useRouter)(),o=e=>{if(e!==i){let t=(0,$.L)(e.did,8);r("Your current active identity is: "+s+"("+t+")")}Y.D.setActiveIdentity(e),l.push("/profile")};return(0,n.jsx)(f.m,{props:{hover:!0},onClick:()=>o(t),className:"h-[3.5rem] cursor-pointer",avatar:(0,n.jsx)(X.i,{identity:t,width:36,height:36}),rowCells:(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(x.Z,{children:(0,n.jsx)(Z.Z,{className:"flex-1",primary:(0,n.jsx)("span",{className:"font-medium",children:s}),secondary:(0,n.jsx)("span",{className:"text-[8pt]",children:(0,$.L)(t.did,8)}),sx:{my:0},primaryTypographyProps:{sx:{lineHeight:1.3}},secondaryTypographyProps:{sx:{lineHeight:1.2}}})}),(0,n.jsx)(x.Z,{children:(0,G.x)(t.createdAt)})]})})},K=e=>{let[t]=(0,p.V)(j.jU),[s]=(0,p.V)(null==t?void 0:t.get("identity").regularIdentities$),{mounted:i}=(0,l.s)(),r=(0,z.useRouter)(),o=s&&[...s].sort((e,t)=>{let s=e.lastUsedAt$.getValue().getTime(),n=t.lastUsedAt$.getValue().getTime();return n-s});return(0,n.jsx)(g.Z,{className:"h-full",title:"My Identities",showAllAction:()=>{r.push("/identities")},children:(0,n.jsxs)("div",{className:"mb-1",children:[(0,n.jsx)(f.J,{headCells:(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(x.Z,{children:"IDENTITY"}),(0,n.jsx)(x.Z,{children:"CREATED"})]}),bodyRows:i&&o?(0,n.jsx)(n.Fragment,{children:o.length?o.slice(0,4).map((e,t)=>(0,n.jsx)(J,{identity:e},t)):(0,n.jsx)(n.Fragment,{children:(0,n.jsx)(R.Z,{children:(0,n.jsx)(x.Z,{component:"th",colSpan:3,align:"center",children:(0,n.jsx)("span",{className:"text-base",children:"No identity yet."})})})})}):[,,].fill(0).map((e,t)=>(0,n.jsx)(V.IT,{},t))}),(0,n.jsx)("div",{className:"w-full mt-2",children:(0,n.jsx)(E.Kz,{startIcon:(0,n.jsx)(F.Z,{}),onClick:()=>{r.push("/new-identity")},className:"w-full mt-4",children:"CREATE IDENTITY"})})]})})};var M=s(28451);let _=e=>{let[t]=(0,p.V)(j.jU),{mounted:s}=(0,l.s)(),i=(0,h.useRouter)(),[r]=(0,p.V)(null==t?void 0:t.get("activity").activities$),o=null==r?void 0:r.slice(0,5);return(0,n.jsx)(g.Z,{className:"h-full",title:"Recent Activity",showAllAction:()=>{i.push("/recent-activity")},children:(0,n.jsx)("div",{className:"mb-1",children:(0,n.jsx)(f.J,{headCells:(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(x.Z,{children:"ACCOUNT ACTIVITY"}),(0,n.jsx)(x.Z,{children:"DATE"})]}),bodyRows:s&&o?(0,n.jsx)(n.Fragment,{children:o.length>0?o.map((e,t)=>(0,n.jsx)(M.p,{activity:e},t)):(0,n.jsx)(R.Z,{children:(0,n.jsx)(x.Z,{component:"th",colSpan:3,align:"center",children:(0,n.jsx)("span",{className:"text-base",children:"No activity found."})})})}):[,,,].fill(0).map((e,t)=>(0,n.jsx)(V.IT,{},t))})})})};var L=()=>{let{mounted:e}=(0,l.s)();return(0,i.useEffect)(()=>{(0,o.fK)()},[]),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("div",{className:"col-span-full",children:(0,n.jsx)(c,{})}),(0,n.jsxs)(r.ZP,{container:!0,spacing:3,children:[(0,n.jsx)(r.ZP,{item:!0,xs:12,md:6,children:(0,n.jsx)(_,{})}),(0,n.jsx)(r.ZP,{item:!0,xs:12,md:6,children:(0,n.jsx)(K,{})}),(0,n.jsx)(r.ZP,{item:!0,xs:12,md:6,children:(0,n.jsx)(D,{})}),(0,n.jsx)(r.ZP,{item:!0,xs:12,md:6,children:(0,n.jsx)(P,{})})]})]})}},69991:function(e,t,s){"use strict";s.d(t,{i:function(){return u}});var n=s(57437),i=s(7045);let r=e=>{let{text:t,width:s=40,height:i=40}=e;return(0,n.jsx)("div",{className:"bg-indigo-400 p-2 rounded-sm overflow-hidden",style:{width:"".concat(s,"px"),height:"".concat(i,"px"),borderRadius:"50%",display:"flex",justifyContent:"center",alignItems:"center",color:"white",fontSize:"16px",lineHeight:1},children:t})};var l=s(40542),o=s(3283),a=s(53386),c=s(16691),d=s.n(c);let u=e=>{let{identity:t,width:s=60,height:c=60}=e,[u]=(0,l.V)(null==t?void 0:t.profile().name$),[h]=(0,l.V)(null==t?void 0:t.profile().icon$);return(0,n.jsx)(n.Fragment,{children:h?(0,n.jsx)(o.Z,{sx:{width:s,height:c},children:h&&(0,n.jsx)(d(),{src:h,alt:"",width:s,height:c})}):(0,n.jsxs)(n.Fragment,{children:[!u&&(0,n.jsx)(i.Z,{width:s,height:c}),u&&(0,n.jsx)(r,{width:s,height:c,text:(0,a.OX)(u)})]})})}},66615:function(e,t,s){"use strict";function n(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:5,s=e.split(":");if(s.length<3)return e;let n=s[2];if(n.length<=2*t)return e;let i="".concat(n.substr(0,t),"...").concat(n.substr(-t));return"".concat(s[0],":").concat(s[1],":").concat(i)}s.d(t,{L:function(){return n}})}},function(e){e.O(0,[6990,9787,9443,8218,3988,395,8321,9152,5295,1396,1510,9930,2e3,2178,7998,3510,4241,8045,3262,3978,9950,2971,7864,1744],function(){return e(e.s=90913)}),_N_E=e.O()}]);