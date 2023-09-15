(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9530,5294],{46601:function(){},89214:function(){},75992:function(){},78110:function(){},52361:function(){},94616:function(){},82876:function(t,e,n){Promise.resolve().then(n.bind(n,90849))},25007:function(t,e,n){"use strict";n.d(e,{O:function(){return a}});var i=n(57437),r=n(40471),l=n(57042);let a=t=>{let{className:e}=t;return(0,i.jsxs)("div",{className:(0,l.Z)("flex flex-col w-full",e),children:[(0,i.jsx)("div",{className:"italic",children:"Preparing request, hold on..."}),(0,i.jsx)(r.Z,{})]})}},90849:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return B}});var i=n(57437),r=n(85688),l=n(24033),a=n(2265),s=n(25007),o=n(12131),c=n(89791),d=n(57135),u=n(26588),f=n(451),h=n(69144),x=n(13457),m=n(43226),j=n(3283),v=n(96556),g=n(53932),p=n(3883),y=n(53445),w=n(48727),Z=n(81344),S=n(49050),b=n(15133),I=n(14819),k=n(29872),C=n(35843),P=n(9177),N=n(16691),W=n.n(N);let q=(0,C.ZP)(k.Z)(t=>{let{theme:e}=t;return{backgroundColor:"#eeeeee",textAlign:"left",maxWidth:400}}),z=t=>{let{credential:e}=t,n=e.getValueItems(),r=e.isSensitiveCredential(),[l]=(0,f.V)(null==e?void 0:e.issuerInfo$);return(0,i.jsx)(x.Z,{alignItems:"center",children:(0,i.jsx)(b.Z,{sx:{mx:10,mt:4,mb:1,boxShadow:0,textAlign:"left",bgcolor:"#ffffff"},children:(0,i.jsxs)(x.Z,{spacing:2,direction:"row",px:2,py:2,minWidth:400,maxWidth:400,children:[(0,i.jsx)(I.Z,{sx:{fontSize:40}}),(0,i.jsxs)(x.Z,{alignItems:"left",children:[(0,i.jsx)(m.Z,{fontSize:18,gutterBottom:!0,children:(0,i.jsx)("b",{children:e.getDisplayableTitle()})}),null==n?void 0:n.map(t=>(0,i.jsx)(m.Z,{fontSize:16,gutterBottom:!0,children:null==t?void 0:t.value},t.name+"credentialcomponentitem")),r&&(0,i.jsx)(m.Z,{fontSize:14,color:"#FF6347",gutterBottom:!0,children:"Sensitive"}),(0,i.jsx)(q,{sx:{my:1,mx:"auto",p:2},children:(0,i.jsxs)(x.Z,{spacing:2,direction:"row",alignItems:"center",children:[(0,i.jsx)(x.Z,{children:(0,i.jsx)(W(),{unoptimized:!0,src:null==l?void 0:l.avatarIcon,width:30,height:30,style:{borderRadius:"50%"},alt:""})}),(0,i.jsx)(x.Z,{sx:{maxWidth:400},children:(0,i.jsx)(m.Z,{fontSize:13,noWrap:!0,children:l&&(0,P.Sy)(null==l?void 0:l.name,30)})})]})})]})]})})})},_=t=>{let{importedCredential:e}=t,[n,r]=(0,a.useState)(!1),[l,s]=(0,a.useState)(!1),[o,c]=(0,a.useState)(!1),d=()=>{s(!1)},u=()=>{s(!0)};return(0,i.jsxs)(x.Z,{alignItems:"center",children:[(0,i.jsx)(z,{credential:e.credential}),n&&(0,i.jsxs)(x.Z,{children:[(0,i.jsx)(S.Z,{variant:"text",onClick:()=>{r(!1)},children:"hide details"}),e.values.map(t=>(0,i.jsxs)(b.Z,{sx:{mx:10,my:1,boxShadow:0,textAlign:"left",bgcolor:"#ffffff"},children:[!l&&(0,i.jsx)(x.Z,{px:2,py:2,minWidth:400,alignItems:"left",children:(0,i.jsx)("div",{onClick:u,children:(0,i.jsxs)(x.Z,{direction:"row",alignItems:"right",children:[(0,i.jsx)(m.Z,{fontSize:16,minWidth:350,gutterBottom:!0,children:(0,i.jsx)("b",{children:t.name})}),(0,i.jsx)(Z.Z,{})]})})}),l&&(0,i.jsxs)(x.Z,{px:2,py:2,minWidth:400,alignItems:"left",children:[(0,i.jsx)("div",{onClick:d,children:(0,i.jsxs)(x.Z,{direction:"row",alignItems:"right",children:[(0,i.jsx)(m.Z,{fontSize:16,minWidth:350,gutterBottom:!0,children:(0,i.jsx)("b",{children:t.name})}),(0,i.jsx)(w.Z,{})]})}),(0,i.jsx)(m.Z,{fontSize:14,gutterBottom:!0,children:t.value})]})]},e.name+"-credentialcomponennt"))]}),!n&&(0,i.jsx)(x.Z,{direction:"row",children:(0,i.jsx)(S.Z,{variant:"text",onClick:()=>{r(!0)},children:"Show details"})})]})};var F=n(29281),V=n(69990);let A=t=>{let{intent:e}=t,[n]=(0,f.V)(g.B);null==n||n.get("profile");let l=null==n?void 0:n.get("credentials"),[s,w]=(0,a.useState)(!1),[Z]=(0,f.V)(null==l?void 0:l.credentials$),[S,b]=(0,a.useState)(null),[I,k]=(0,a.useState)(!1),[C,P]=(0,a.useState)(""),[N,W]=(0,a.useState)(""),{showErrorToast:q}=(0,v.p)(),{unlockerIsCancelled:z}=(0,d.NX)(),[A]=(0,f.V)(V.jU),B=e.requestPayload;(0,a.useEffect)(()=>{E(),O(),R(),B&&T(B.credentials).then(t=>{b(t)})},[B]);let E=()=>{k(!1)},O=()=>{P("")},R=()=>{W("Demo app")},T=async t=>{if(!t)return[];let e=[];for(let n of t){let t=u.VerifiableCredential.parse(n.toString()),i=t.getSubject().getProperties(),r=[];for(let t of Object.keys(i)){let e=i[t];if("id"==t||"displayable"==t)continue;let n={name:t,value:e.toString()};r.push(n)}let l={name:t.getId().getFragment(),values:r,credential:await (0,h.C)(t)};e.push(l)}return e},U=async()=>{w(!0);let t=[];S.map(e=>{t.push(e.credential.getId().toString())});let i=!1;try{for(let t of S)await l.importCredential(t.credential.verifiableCredential);i=await (0,r.h)(e.id,t)}catch(t){p.k.error("ImportCredential","Import credential error",t)}if(!i){q("Import credential error, Please retry after a while.");return}let a=await (null==A?void 0:A.get("activity").createActivity(F.T.VC_IMPORTED,{did:n.did}));a||p.k.warn("failed to create activity for VC created by ".concat(n.did));let s=(0,y.Q)(e.redirectUrl,"rid",e.id);window.location.href=s};return(0,i.jsxs)(i.Fragment,{children:[n&&(0,i.jsxs)("div",{className:" text-center",children:[(0,i.jsxs)(x.Z,{direction:"row",justifyContent:"center",children:[(0,i.jsx)(m.Z,{}),(0,i.jsx)(j.Z,{sx:{ml:2,width:120,height:120}})]}),(0,i.jsx)(m.Z,{mt:4,children:N}),(0,i.jsx)(m.Z,{mt:4,children:"You are going to attach some infomation provided by a third party to your identity."}),(0,i.jsx)(m.Z,{mt:1,children:"Please review the following data:"}),null==S?void 0:S.map((t,e)=>(0,i.jsx)(_,{importedCredential:t},e)),(0,i.jsx)(o.c,{onClick:U,busy:s,disabled:!Z,children:"Import this to my profile"}),z&&(0,i.jsx)(c.d,{className:"mt-2"})]}),!n&&"Make an identity active to continue"]})};var B=()=>{let t=(0,l.useSearchParams)(),e=t.get("rid"),[n,o]=(0,a.useState)(!0),[c,d]=(0,a.useState)(null);return(0,a.useEffect)(()=>{e&&(0,r.S)(e).then(t=>{o(!1),d(t)})},[e]),(0,i.jsxs)("div",{className:"col-span-full",children:[n&&(0,i.jsx)(s.O,{className:"mb-6"}),!n&&c&&(0,i.jsx)(A,{intent:c}),!n&&!c&&(0,i.jsx)("div",{children:"No matching request"})]})}},89791:function(t,e,n){"use strict";n.d(e,{d:function(){return s}});var i=n(57437),r=n(12131),l=n(57042),a=n(57135);let s=t=>{let{className:e}=t,{retryUnlock:n}=(0,a.lJ)();return(0,i.jsxs)("div",{className:(0,l.Z)("flex flex-row items-center gap-2",e),children:[(0,i.jsx)("div",{children:"This content could not be unlocked, please retry"}),(0,i.jsx)(r.c,{onClick:()=>{n()},children:"Unlock personal data"})]})}},96556:function(t,e,n){"use strict";n.d(e,{p:function(){return r}});var i=n(36953);function r(){let{enqueueSnackbar:t}=(0,i.Ds)();return{showSuccessToast:e=>{t(e,{variant:"success"})},showErrorToast:e=>{t(e,{variant:"error"})}}}},85688:function(t,e,n){"use strict";n.d(e,{S:function(){return u},h:function(){return f}});var i=n(60230),r=n(23965);class l{static async fromJson(t){let e=new l;return Object.assign(e,t),e.createdAt=new Date(t.createdAt),e}}var a=n(51385),s=n(76506),o=n(3883);function c(){let t=(0,i._)(["\n      query GetIntentRequest($intentId: String!) {\n        intent (id: $intentId) {\n          ","\n        }\n      }\n    "]);return c=function(){return t},t}function d(){let t=(0,i._)(["\n      mutation FulfilIntentRequest($input: FulfilIntentInput!) {\n        fulfilIntent (input: $input)\n      }\n    "]);return d=function(){return t},t}async function u(t){var e;let n=await (0,a.Pt)(async()=>(await (0,s.W)()).query({query:(0,r.Ps)(c(),"\n  id\n  createdAt\n  type\n  redirectUrl\n  requestPayload\n  responsePayload\n"),variables:{intentId:t}}));if(null==n?void 0:null===(e=n.data)||void 0===e?void 0:e.intent){let t=await l.fromJson(n.data.intent);return o.k.log("intents","Fetched intent:",t),t}return o.k.warn("intents","No intent found for id ".concat(t)),null}async function f(t,e){var n;let i=await (0,a.Pt)(async()=>(await (0,s.W)()).mutate({mutation:(0,r.Ps)(d()),variables:{input:{intentId:t,payload:e}}}));return(null==i?void 0:null===(n=i.data)||void 0===n?void 0:n.fulfilIntent)?(o.k.log("intents","Successfully fulfilled intent id ".concat(t)),!0):(o.k.warn("intents","Failed to fulfil intent id ".concat(t)),!1)}},53445:function(t,e,n){"use strict";function i(t,e,n){let i=new URL(t),r=new URLSearchParams(i.search);return r.set(e,n),i.search=r.toString(),i.toString()}n.d(e,{Q:function(){return i}})}},function(t){t.O(0,[6990,9787,9443,8218,6110,1510,8920,4057,6953,7998,3874,6701,1385,2971,596,1744],function(){return t(t.s=82876)}),_N_E=t.O()}]);