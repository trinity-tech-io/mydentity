(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[713],{34706:function(e,t,r){Promise.resolve().then(r.bind(r,3869))},3869:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return es}});var n,i=r(57437),l=r(451),a=r(43226),s=r(2265),o=r(53932);function c(){return(c=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}var d=function(e){return s.createElement("svg",c({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 36 36"},e),n||(n=s.createElement("g",{"data-name":"Component 942 \\u2013 1"},s.createElement("path",{fill:"currentColor",d:"M18 36a18 18 0 0 1-7.007-34.586 18 18 0 0 1 14.013 33.171A17.887 17.887 0 0 1 18 36zm-1.427-10.948v3.084h3.854v-3.084zM15.8 8.865l1.117 13.875h3.139L21.2 8.865h-5.4z","data-name":"Subtraction 2"}))))},u=r(20484),x=r(42937),p=r(5676),h=r(96507),f=r(13457),m=r(3283),g=r(20791),v=r(13428),b=r(57042),j=r(65425),y=r(43381),Z=r(95600),w=r(35843),k=r(87927),S=r(41101);let C=s.createContext();var $=r(26520),E=r(25702);function I(e){return(0,E.Z)("MuiGrid",e)}let N=["auto",!0,1,2,3,4,5,6,7,8,9,10,11,12],T=(0,$.Z)("MuiGrid",["root","container","item","zeroMinWidth",...[0,1,2,3,4,5,6,7,8,9,10].map(e=>`spacing-xs-${e}`),...["column-reverse","column","row-reverse","row"].map(e=>`direction-xs-${e}`),...["nowrap","wrap-reverse","wrap"].map(e=>`wrap-xs-${e}`),...N.map(e=>`grid-xs-${e}`),...N.map(e=>`grid-sm-${e}`),...N.map(e=>`grid-md-${e}`),...N.map(e=>`grid-lg-${e}`),...N.map(e=>`grid-xl-${e}`)]),D=["className","columns","columnSpacing","component","container","direction","item","rowSpacing","spacing","wrap","zeroMinWidth"];function P(e){let t=parseFloat(e);return`${t}${String(e).replace(String(t),"")||"px"}`}function W({breakpoints:e,values:t}){let r="";Object.keys(t).forEach(e=>{""===r&&0!==t[e]&&(r=e)});let n=Object.keys(e).sort((t,r)=>e[t]-e[r]);return n.slice(0,n.indexOf(r))}let M=(0,w.ZP)("div",{name:"MuiGrid",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e,{container:n,direction:i,item:l,spacing:a,wrap:s,zeroMinWidth:o,breakpoints:c}=r,d=[];n&&(d=function(e,t,r={}){if(!e||e<=0)return[];if("string"==typeof e&&!Number.isNaN(Number(e))||"number"==typeof e)return[r[`spacing-xs-${String(e)}`]];let n=[];return t.forEach(t=>{let i=e[t];Number(i)>0&&n.push(r[`spacing-${t}-${String(i)}`])}),n}(a,c,t));let u=[];return c.forEach(e=>{let n=r[e];n&&u.push(t[`grid-${e}-${String(n)}`])}),[t.root,n&&t.container,l&&t.item,o&&t.zeroMinWidth,...d,"row"!==i&&t[`direction-xs-${String(i)}`],"wrap"!==s&&t[`wrap-xs-${String(s)}`],...u]}})(({ownerState:e})=>(0,v.Z)({boxSizing:"border-box"},e.container&&{display:"flex",flexWrap:"wrap",width:"100%"},e.item&&{margin:0},e.zeroMinWidth&&{minWidth:0},"wrap"!==e.wrap&&{flexWrap:e.wrap}),function({theme:e,ownerState:t}){let r=(0,j.P$)({values:t.direction,breakpoints:e.breakpoints.values});return(0,j.k9)({theme:e},r,e=>{let t={flexDirection:e};return 0===e.indexOf("column")&&(t[`& > .${T.item}`]={maxWidth:"none"}),t})},function({theme:e,ownerState:t}){let{container:r,rowSpacing:n}=t,i={};if(r&&0!==n){let t;let r=(0,j.P$)({values:n,breakpoints:e.breakpoints.values});"object"==typeof r&&(t=W({breakpoints:e.breakpoints.values,values:r})),i=(0,j.k9)({theme:e},r,(r,n)=>{var i;let l=e.spacing(r);return"0px"!==l?{marginTop:`-${P(l)}`,[`& > .${T.item}`]:{paddingTop:P(l)}}:null!=(i=t)&&i.includes(n)?{}:{marginTop:0,[`& > .${T.item}`]:{paddingTop:0}}})}return i},function({theme:e,ownerState:t}){let{container:r,columnSpacing:n}=t,i={};if(r&&0!==n){let t;let r=(0,j.P$)({values:n,breakpoints:e.breakpoints.values});"object"==typeof r&&(t=W({breakpoints:e.breakpoints.values,values:r})),i=(0,j.k9)({theme:e},r,(r,n)=>{var i;let l=e.spacing(r);return"0px"!==l?{width:`calc(100% + ${P(l)})`,marginLeft:`-${P(l)}`,[`& > .${T.item}`]:{paddingLeft:P(l)}}:null!=(i=t)&&i.includes(n)?{}:{width:"100%",marginLeft:0,[`& > .${T.item}`]:{paddingLeft:0}}})}return i},function({theme:e,ownerState:t}){let r;return e.breakpoints.keys.reduce((n,i)=>{let l={};if(t[i]&&(r=t[i]),!r)return n;if(!0===r)l={flexBasis:0,flexGrow:1,maxWidth:"100%"};else if("auto"===r)l={flexBasis:"auto",flexGrow:0,flexShrink:0,maxWidth:"none",width:"auto"};else{let a=(0,j.P$)({values:t.columns,breakpoints:e.breakpoints.values}),s="object"==typeof a?a[i]:a;if(null==s)return n;let o=`${Math.round(r/s*1e8)/1e6}%`,c={};if(t.container&&t.item&&0!==t.columnSpacing){let r=e.spacing(t.columnSpacing);if("0px"!==r){let e=`calc(${o} + ${P(r)})`;c={flexBasis:e,maxWidth:e}}}l=(0,v.Z)({flexBasis:o,flexGrow:0,maxWidth:o},c)}return 0===e.breakpoints.values[i]?Object.assign(n,l):n[e.breakpoints.up(i)]=l,n},{})}),O=e=>{let{classes:t,container:r,direction:n,item:i,spacing:l,wrap:a,zeroMinWidth:s,breakpoints:o}=e,c=[];r&&(c=function(e,t){if(!e||e<=0)return[];if("string"==typeof e&&!Number.isNaN(Number(e))||"number"==typeof e)return[`spacing-xs-${String(e)}`];let r=[];return t.forEach(t=>{let n=e[t];if(Number(n)>0){let e=`spacing-${t}-${String(n)}`;r.push(e)}}),r}(l,o));let d=[];o.forEach(t=>{let r=e[t];r&&d.push(`grid-${t}-${String(r)}`)});let u={root:["root",r&&"container",i&&"item",s&&"zeroMinWidth",...c,"row"!==n&&`direction-xs-${String(n)}`,"wrap"!==a&&`wrap-xs-${String(a)}`,...d]};return(0,Z.Z)(u,I,t)},z=s.forwardRef(function(e,t){let r=(0,k.Z)({props:e,name:"MuiGrid"}),{breakpoints:n}=(0,S.Z)(),l=(0,y.Z)(r),{className:a,columns:o,columnSpacing:c,component:d="div",container:u=!1,direction:x="row",item:p=!1,rowSpacing:h,spacing:f=0,wrap:m="wrap",zeroMinWidth:j=!1}=l,Z=(0,g.Z)(l,D),w=h||f,$=c||f,E=s.useContext(C),I=u?o||12:E,N={},T=(0,v.Z)({},Z);n.keys.forEach(e=>{null!=Z[e]&&(N[e]=Z[e],delete T[e])});let P=(0,v.Z)({},l,{columns:I,container:u,direction:x,item:p,rowSpacing:w,columnSpacing:$,wrap:m,zeroMinWidth:j,spacing:f},N,{breakpoints:n.keys}),W=O(P);return(0,i.jsx)(C.Provider,{value:I,children:(0,i.jsx)(M,(0,v.Z)({ownerState:P,className:(0,b.Z)(W.root,a),as:d,ref:t},T))})});var F=r(72502),L=r(78342),V=r(77820);let B=["className"],R=e=>{let{alignItems:t,classes:r}=e;return(0,Z.Z)({root:["root","flex-start"===t&&"alignItemsFlexStart"]},L.f,r)},A=(0,w.ZP)("div",{name:"MuiListItemIcon",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,"flex-start"===r.alignItems&&t.alignItemsFlexStart]}})(({theme:e,ownerState:t})=>(0,v.Z)({minWidth:56,color:(e.vars||e).palette.action.active,flexShrink:0,display:"inline-flex"},"flex-start"===t.alignItems&&{marginTop:8})),G=s.forwardRef(function(e,t){let r=(0,k.Z)({props:e,name:"MuiListItemIcon"}),{className:n}=r,l=(0,g.Z)(r,B),a=s.useContext(V.Z),o=(0,v.Z)({},r,{alignItems:a.alignItems}),c=R(o);return(0,i.jsx)(A,(0,v.Z)({className:(0,b.Z)(c.root,n),ownerState:o,ref:t},l))});var _=r(46940),q=r(71557),H=r(4856),U=r(52653),J=r(74309),K=r(59500),Q=r(96556),X=r(89488),Y=r(3883),ee=e=>{let{onEdit:t,onDelete:r}=e,[n,a]=(0,s.useState)(null),[c]=(0,l.V)(o.B),d=null==c?void 0:c.get("profile"),[u,x]=(0,s.useState)(!1),[p,h]=(0,s.useState)(!1),[f,m]=(0,s.useState)(null),[g,v]=(0,s.useState)(null),[b,j]=(0,s.useState)(q.b.EDIT),[y,Z]=(0,s.useState)(t),{showSuccessToast:w,showErrorToast:k}=(0,Q.p)(),S="IdentityMenu",C=()=>{a(null)},$=async e=>{if(x(!1),!e)return;let t=!1;try{t=await d.deleteProfileCredential(y.verifiableCredential.getId().toString())}catch(e){Y.k.error(S,"Delete credential error: ",e)}t?w("Entry has been deleted!"):k("Failed to delete the entry...")},E=async e=>{if(h(!1),e&&e.value&&e.type==q.b.EDIT&&e.originCredential){let t=!1;try{t=await d.updateProfileCredential(e.originCredential,e.value).catch()}catch(e){Y.k.error(S,"Update credential error: ",e)}t?w("Entry has been updated!"):k("Failed to update the entry...")}};return(0,i.jsxs)("div",{children:[(0,i.jsx)(U.Z,{onClick:e=>{a(e.currentTarget)},children:(0,i.jsx)(H.Z,{})}),(0,i.jsxs)(K.ZP,{anchorEl:n,open:!!n,onClose:C,anchorOrigin:{vertical:"top",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"right"},PaperProps:{sx:{p:1,width:140,"& .MuiMenuItem-root":{px:1,typography:"body2",borderRadius:.75}}},children:[(0,i.jsx)(J.Z,{onClick:()=>{C(),h(!0);let e=(0,X.m)(y.verifiableCredential.getType());m(e);let t=y.verifiableCredential.getSubject().getProperty(e.key);v(t),j(b)},children:" Edit "}),(0,i.jsx)(J.Z,{sx:{color:"error.main"},onClick:()=>{x(!0),C()},children:" Delete "})]}),(0,i.jsx)(_.Z,{title:"Delete this Credential?",content:"Do you want to delete this Credential?",open:u,onClose:e=>$(e)}),(0,i.jsx)(q.Z,{credentialInfo:f,defaultValue:g,type:b,open:p,originCredential:y,onClose:E})]})};let et=e=>{let{selectedCredential:t}=e,r=t instanceof p.E,[n]=(0,l.V)(null==t?void 0:t.issuerInfo$),s=(0,x.s)(),[o]=(0,l.V)(null==t?void 0:t.isConform$);return(0,i.jsxs)("div",{className:"col-span-full xl:col-span-7 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700",children:[(!t||!s)&&(0,i.jsx)(u.q,{}),s&&t&&(0,i.jsxs)(h.Z,{sx:{px:2.5,pb:3},children:[(0,i.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"24px"},children:r&&(0,i.jsx)(ee,{onEdit:t,onDelete:t})}),(0,i.jsxs)(f.Z,{alignItems:"center",spacing:3,sx:{pt:5,borderRadius:2,position:"relative"},children:[(0,i.jsx)(m.Z,{src:"/assets/images/account.svg",sx:{ml:2,width:120,height:120}}),(0,i.jsxs)(h.Z,{sx:{textAlign:"left",width:"80%"},children:[(0,i.jsx)(a.Z,{gutterBottom:!0,variant:"h6",children:t.getDisplayableTitle()}),(0,i.jsx)(a.Z,{variant:"body1",sx:{color:"text.secondary"},children:t.getDisplayValue()}),(0,i.jsxs)(z,{container:!0,spacing:2,sx:{mt:1},children:[(0,i.jsx)(z,{item:!0,xs:6,children:(0,i.jsx)(a.Z,{variant:"body1",sx:{color:"text.secondary"},children:"Issuance date:"})}),(0,i.jsx)(z,{item:!0,xs:6,children:(0,i.jsx)(a.Z,{variant:"body1",sx:{color:"text.secondary"},children:t.verifiableCredential.issuanceDate.toLocaleDateString()})}),(0,i.jsx)(z,{item:!0,xs:6,children:(0,i.jsx)(a.Z,{variant:"body1",sx:{color:"text.secondary"},children:"Expiration date:"})}),(0,i.jsx)(z,{item:!0,xs:6,children:(0,i.jsx)(a.Z,{variant:"body1",sx:{color:"text.secondary"},children:t.verifiableCredential.expirationDate.toLocaleDateString()})}),!t.selfIssued()&&(null==n?void 0:n.isPublished)&&(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(z,{item:!0,children:(0,i.jsxs)(a.Z,{variant:"body1",sx:{color:"text.secondary"},children:["Created by ",null==n?void 0:n.name]})})}),(0,i.jsxs)(F.Z,{children:[(0,i.jsx)(G,{children:(0,i.jsx)(d,{width:30})}),o&&(0,i.jsx)(a.Z,{variant:"body1",sx:{color:"text.secondary"},children:"This credential is conform to a known type that can be shared by any application."}),!o&&(0,i.jsx)(a.Z,{variant:"body1",sx:{color:"text.secondary"},children:"This credential doesn't conform to known credential formats and can hardly be reused by many applications."})]})]})]})]})]})]})};var er=function(e){let{credential:t}=e,[r]=(0,l.V)(null==t?void 0:t.issuerInfo$);return(0,i.jsxs)(h.Z,{sx:{textAlign:"left",width:"50%"},children:[(0,i.jsx)(a.Z,{gutterBottom:!0,variant:"h6",children:t.getDisplayableTitle()}),(0,i.jsx)(a.Z,{variant:"body1",sx:{color:"text.secondary"},children:t.getDisplayValue()}),(0,i.jsxs)(z,{container:!0,spacing:2,sx:{mt:1},children:[t.isSensitiveCredential()&&(0,i.jsx)(a.Z,{fontSize:14,color:"#FF6347",children:"Sensitive"}),!t.selfIssued()&&(null==r?void 0:r.isPublished)&&(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(z,{item:!0,children:(0,i.jsxs)(a.Z,{fontSize:14,variant:"body1",sx:{color:"text.secondary"},children:["Created by ",null==r?void 0:r.name]})})})]})]})},en=r(49599),ei=r(54986),el=r(35266);let ea=e=>{let{onSelected:t}=e,[r]=(0,l.V)(o.B),[n]=(0,l.V)(null==r?void 0:r.get("credentials").credentials$),c=(0,x.s)(),d=null==r?void 0:r.get("profile"),[p]=(0,l.V)(null==d?void 0:d.activeCredential$),f=e=>{d.setActiveCredential(e),t(e)};return(0,s.useEffect)(()=>{if(p)for(let e=0;e<n.length;e++){let r=n[e];p.id==r.id&&t(r)}},[p,n,t]),(0,i.jsxs)("div",{className:"col-span-full xl:col-span-5 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700",children:[(0,i.jsx)(a.Z,{ml:2,my:3,variant:"subtitle1",children:"Credentials"}),(0,i.jsx)(ei.Z,{}),(0,i.jsxs)(h.Z,{sx:{width:"100%",bgcolor:"background.paper"},children:[(!n||!c)&&(0,i.jsx)(u.q,{}),c&&n&&(0,i.jsx)(el.Z,{component:"nav","aria-label":"main mailbox folders",children:n.map(e=>(0,i.jsxs)("div",{children:[(0,i.jsxs)(F.Z,{selected:p.id===e.id,onClick:()=>f(e),children:[(0,i.jsx)(G,{children:(0,i.jsx)(en.Z,{})}),(0,i.jsx)(er,{credential:e})]}),(0,i.jsx)(ei.Z,{})]},e.id))})]})]})};var es=()=>{let[e,t]=(0,s.useState)(null),[r]=(0,l.V)(o.B);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("div",{className:"col-span-full",children:[(0,i.jsx)(a.Z,{ml:2,my:3,variant:"h4",children:"All Credentials"}),(0,i.jsxs)(a.Z,{ml:2,my:3,children:["Below is the list of all your ",(0,i.jsx)("b",{children:"credentials"}),". Credentials are pieces of information about you. This information has been created either by you, or by other applications on your behalf. This full list of credentials contains credentials from your base identity profile, plus everything else."]})]}),(0,i.jsx)(ea,{onSelected:e=>{t(e)}}),(0,i.jsx)(et,{selectedCredential:e})]})}},46940:function(e,t,r){"use strict";var n=r(57437);r(2265);var i=r(35551),l=r(89394),a=r(42834),s=r(26337),o=r(64173),c=r(91797);t.Z=function(e){let{title:t,content:r,open:d,onClose:u}=e,x=()=>{u(!1)};return(0,n.jsxs)(l.Z,{open:d,onClose:x,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[(0,n.jsx)(c.Z,{id:"alert-dialog-title",children:t}),(0,n.jsx)(s.Z,{children:(0,n.jsx)(o.Z,{id:"alert-dialog-description",children:r})}),(0,n.jsxs)(a.Z,{children:[(0,n.jsx)(i.Z,{onClick:x,children:"Disagree"}),(0,n.jsx)(i.Z,{onClick:()=>{u(!0)},autoFocus:!0,children:"Agree"})]})]})}},71557:function(e,t,r){"use strict";r.d(t,{b:function(){return i}});var n,i,l=r(57437),a=r(89394),s=r(91797),o=r(26337),c=r(20879),d=r(42834),u=r(35551),x=r(57969),p=r(2265);(n=i||(i={}))[n.EDIT=0]="EDIT",n[n.NEW=1]="NEW",t.Z=function(e){let{credentialInfo:t,defaultValue:r,open:n,type:h,originCredential:f,onClose:m}=e,[g,v]=(0,p.useState)(null),b=(0,p.useRef)(null);(0,p.useEffect)(()=>{n&&v(t.getConverter().getEditionType())},[t,n]);let j=(0,p.createRef)();return(0,l.jsxs)(a.Z,{sx:{"& .MuiDialog-paper":{width:"80%",maxHeight:435}},maxWidth:"xs",TransitionProps:{onEntering:()=>{null!=b.current&&b.current.focus()}},open:n,children:[h==i.EDIT&&(0,l.jsx)(s.Z,{children:"Edit Item"}),h==i.NEW&&(0,l.jsx)(s.Z,{children:"Add Item"}),(0,l.jsxs)(o.Z,{dividers:!0,children:[g==x.E.SingleLineString&&(0,l.jsx)(c.Z,{fullWidth:!0,label:t.key,defaultValue:r,inputRef:j,variant:"outlined",size:"small",InputLabelProps:{shrink:!0},autoFocus:!0}),g!=x.E.SingleLineString&&(0,l.jsx)("div",{children:"TODO"})]}),(0,l.jsxs)(d.Z,{children:[(0,l.jsx)(u.Z,{autoFocus:!0,onClick:()=>{m(null)},children:"Cancel"}),(0,l.jsx)(u.Z,{onClick:()=>{let e=j.current.value;m({info:t,value:e,type:h,originCredential:f})},children:"Ok"})]})]})}},20484:function(e,t,r){"use strict";r.d(t,{q:function(){return l}});var n=r(57437),i=r(57042);r(26435);let l=e=>{let{className:t}=e;return(0,n.jsx)("div",{className:(0,i.Z)("vertical-stack-loading-card",t),children:(0,n.jsxs)("div",{className:"content",children:[(0,n.jsx)("p",{}),(0,n.jsx)("h2",{}),(0,n.jsx)("h2",{})]})})}},42937:function(e,t,r){"use strict";r.d(t,{s:function(){return i}});var n=r(2265);let i=()=>{let[e,t]=(0,n.useState)(!1);return(0,n.useEffect)(()=>{t(!0)},[]),{mounted:e}}},96556:function(e,t,r){"use strict";r.d(t,{p:function(){return i}});var n=r(36953);function i(){let{enqueueSnackbar:e}=(0,n.Ds)();return{showSuccessToast:t=>{e(t,{variant:"success"})},showErrorToast:t=>{e(t,{variant:"error"})}}}},26435:function(){}},function(e){e.O(0,[6990,9787,9443,8218,1004,2361,3509,8077,9954,6953,438,6577,1375,2971,596,1744],function(){return e(e.s=34706)}),_N_E=e.O()}]);