(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3777],{40649:function(e,t,i){Promise.resolve().then(i.bind(i,62197))},62197:function(e,t,i){"use strict";i.r(t),i.d(t,{default:function(){return eb}});var l,n,r=i(57437),a=i(23322),s=i(77795),o=i(46940),d=i(66988),c=i(98489),u=i(30666),h=i(95781),p=i(96507);let x={border:0,margin:-1,padding:0,width:"1px",height:"1px",overflow:"hidden",position:"absolute",whiteSpace:"nowrap",clip:"rect(0 0 0 0)"};var g=e=>{let{order:t,orderBy:i,rowCount:l,headLabel:n,numSelected:a,onRequestSort:s,onSelectAllClick:o}=e,g=e=>t=>{s(t,e)};return(0,r.jsx)(d.Z,{children:(0,r.jsx)(c.Z,{children:n.map(e=>(0,r.jsx)(u.Z,{align:e.alignRight?"right":"left",sortDirection:i===e.id&&t,children:(0,r.jsxs)(h.Z,{hideSortIcon:!0,active:i===e.id,direction:i===e.id?t:"asc",onClick:g(e.id),children:[e.label,i===e.id?(0,r.jsx)(p.Z,{sx:{...x},children:"desc"===t?"sorted descending":"sorted ascending"}):null]})},e.id))})})},j=i(46446),v=i(58991),m=i(34989),f=i(90923),y=i(43226),Z=i(81679),b=i(78276),C=i(52653),w=i(35843),S=i(89975);let k=(0,w.ZP)(m.Z)(e=>{let{theme:t}=e;return{height:96,display:"flex",justifyContent:"space-between",padding:t.spacing(0,1,0,3)}}),N=(0,w.ZP)(f.Z)(e=>{let{theme:t}=e;return{width:240,transition:t.transitions.create(["box-shadow","width"],{easing:t.transitions.easing.easeInOut,duration:t.transitions.duration.shorter}),"&.Mui-focused":{width:320,boxShadow:"0 8px 16px 0 ".concat((0,S.Fq)("#919EAB",.16))},"& fieldset":{borderWidth:"1px !important",borderColor:"".concat((0,S.Fq)(t.palette.grey[500],.32)," !important")}}});var D=e=>{let{numSelected:t,filterName:i,onFilterName:l}=e;return(0,r.jsxs)(k,{sx:{...t>0&&{color:"primary.main",bgcolor:"primary.lighter"}},children:[t>0?(0,r.jsxs)(y.Z,{component:"div",variant:"subtitle1",children:[t," selected"]}):(0,r.jsx)(N,{value:i,onChange:l,placeholder:"Search profile...",startAdornment:(0,r.jsx)(Z.Z,{position:"start",children:(0,r.jsx)(v.Z,{})})}),t>0?(0,r.jsx)(b.Z,{title:"Delete",onClick:()=>{},children:(0,r.jsx)(C.Z,{children:(0,r.jsx)(j.Z,{})})}):(0,r.jsx)(r.Fragment,{})]})},P=i(12131),I=i(49599),E=i(54986),V=i(3283),F=i(22079),A=i(91797),T=i(35266),R=i(69299),O=i(73393),W=i(72502),_=i(38212),L=i(35511),M=i(9177),B=e=>{let{onClose:t,open:i,availableItemsForAddition:l}=e,n=e=>{t(e)};return(0,r.jsxs)(F.Z,{fullWidth:!0,maxWidth:"sm",onClose:()=>{t(null)},open:i,children:[(0,r.jsx)(A.Z,{children:"Add profile information"}),(0,r.jsx)(E.Z,{}),(0,r.jsx)(T.Z,{sx:{pt:0},children:null==l?void 0:l.map((e,t)=>(0,r.jsx)(R.ZP,{disableGutters:!0,children:(0,r.jsxs)(W.Z,{onClick:()=>n(e),children:[(0,r.jsx)(O.Z,{children:(0,r.jsx)(V.Z,{sx:{bgcolor:L.Z[100],color:L.Z[600]},children:(0,r.jsx)(I.Z,{})})}),(0,r.jsx)(_.Z,{primary:(0,M.fm)(e.key)})]})},t))})]})},q=i(12854),U=i(20484),z=i(89791),J=i(57135),G=i(451),H=i(42937),$=i(89396),X=i(4856),K=i(13457),Q=i(88938),Y=i(15133),ee=i(15795),et=i(73701),ei=i(39279),el=i(19464),en=i(59500),er=i(74309),ea=i(7175),es=i(96556),eo=i(59606),ed=i(53932),ec=i(3883),eu=i(77434),eh=i.n(eu),ep=i(61396),ex=i.n(ep),eg=i(24033),ej=i(2265),ev=i(57042);i(70874);let em=e=>{let{className:t}=e;return(0,r.jsx)("div",{className:(0,ev.Z)("loading-circle",t),children:(0,r.jsx)("div",{className:"content",children:(0,r.jsx)("div",{className:"animated"})})})};var ef=i(22440);let ey=e=>{let{credential:t,onFileUpload:i,width:l,height:n,updating:a=!1,disabled:o=!1}=e,d=async e=>{if(!o&&(null==e?void 0:e.length)>0){let t=e[0];i(t)}},{getRootProps:c,getInputProps:u,isDragActive:h,isDragReject:p,fileRejections:x}=(0,ef.uI)({multiple:!1,maxFiles:1,onDrop:d});return(0,r.jsxs)("div",{...!o&&c(),style:{...h&&{opacity:.72}},className:(0,ev.Z)(!o&&"cursor-pointer"),children:[!o&&(0,r.jsx)("input",{...u()}),(0,r.jsxs)("div",{className:"relative",children:[(0,r.jsx)(s.J,{credential:t,width:l,height:n}),a&&(0,r.jsx)(em,{className:"absolute top-0 bottom-0 left-0 right-0"})]})]})};(l=n||(n={})).NAME="name",l.VALUE="value";let eZ=[{id:"name",label:"Profile item",alignRight:!1},{id:"value",label:"Value",alignRight:!1},{id:"",alignRight:!1}];var eb=()=>{var e;let t="ProfilePage",[i]=(0,G.V)(ed.B),l=null==i?void 0:i.get("credentials"),d=null==i?void 0:i.get("profile"),[h]=(0,G.V)(null==d?void 0:d.profileCredentials$),{mounted:x}=(0,H.s)(),j=(0,eg.useRouter)(),[v]=(0,G.V)(null==d?void 0:d.avatarCredential$),{unlockerIsIdle:m,unlockerIsCancelled:f}=(0,J.NX)(),[Z,b]=(0,ej.useState)(null),[w,S]=(0,ej.useState)([]),[k,N]=(0,ej.useState)(!1),[I,E]=(0,ej.useState)(!1),[V,F]=(0,ej.useState)(null),[A,T]=(0,ej.useState)(""),[R,O]=(0,ej.useState)(q.b1.NEW),{showSuccessToast:W,showErrorToast:_}=(0,es.p)(),[L,M]=(0,ej.useState)(null),[eu,ep]=(0,ej.useState)(0),[ev,em]=(0,ej.useState)("asc"),[ef,eb]=(0,ej.useState)([]),[eC,ew]=(0,ej.useState)(n.NAME),[eS,ek]=(0,ej.useState)(""),[eN,eD]=(0,ej.useState)(5),[eP,eI]=(0,ej.useState)(!1),[eE,eV]=(0,ej.useState)(!1),eF=(0,eo.yd)(),eA=i&&"https://eid.elastos.io/did?did=".concat(encodeURIComponent(i.did),"&is_did=true"),eT=()=>{let e=null==eF?void 0:eF.filter(e=>e.options.multipleInstancesAllowed||!(null==h?void 0:h.find(t=>{var i;return t.verifiableCredential.type.includes(null===(i=e.type)||void 0===i?void 0:i.getShortType())})));S(e)};(0,ej.useEffect)(()=>{eT()},[h]);let eR=(e,t,i)=>{e?W(t):_(i)},eO=async e=>{if(E(!1),e&&e.value){if(e.type==q.b1.EDIT&&e.originCredential){let i=!1;try{i=await d.updateProfileCredential(e.originCredential,e.value)}catch(e){ec.k.error(t,"Update credential error",e)}eR(i,"Entry has been updated!","Failed to update the entry...")}if(e.type==q.b1.NEW&&!Z){let i=!1;try{i=await (0,J.HL)(async()=>!!await d.createProfileCredential("",e.info.typesForCreation(),e.info.key,e.value))}catch(e){ec.k.error(t,"Create credential error",e)}eR(i,"Entry has been created!","Failed to create the entry...")}}},eW=(e,t)=>{e.stopPropagation(),e.preventDefault(),M(e.currentTarget),b(t)},e_=()=>{M(null)},eL=async e=>{eV(!0),await (0,J.HL)(()=>d.upsertIdentityAvatar(e)),eV(!1)};function eM(e,t,i){switch(i){case"name":return t.getDisplayableTitle().localeCompare(e.getDisplayableTitle());case"value":{var l,n;let i=(null===(l=e.getDisplayValue())||void 0===l?void 0:l.label)?e.getDisplayValue().label:e.getDisplayValue(),r=(null===(n=t.getDisplayValue())||void 0===n?void 0:n.label)?t.getDisplayValue().label:t.getDisplayValue();return null==r?void 0:r.localeCompare(i)}}}let eB=eu>0?Math.max(0,(1+eu)*eN-(null==h?void 0:h.length)):0,eq=function(e,t,i){let l=null==e?void 0:e.filter(e=>{let t=e.getFragment();return"avatar"!==t}),n=null==l?void 0:l.map((e,t)=>[e,t]);return(null==n||n.sort((e,i)=>{let l=t(e[0],i[0]);return 0!==l?l:e[1]-i[1]}),i)?eh()(l,e=>-1!==e.verifiableCredential.getId().getFragment().toLowerCase().indexOf(i.toLowerCase())):null==n?void 0:n.map(e=>e[0])}(h,"desc"===ev?(e,t)=>eM(e,t,eC):(e,t)=>-eM(e,t,eC),eS),eU=!(null==eq?void 0:eq.length)&&!!eS,ez=async e=>{if(eI(!1),!e)return;let i=!1;try{i=await l.deleteCredential(Z)}catch(e){ec.k.error(t,e)}eR(i,"Entry has been deleted","Failed to delete the entry...")},eJ=e=>{d.setActiveCredential(e),j.push("/credentials/list")};return(0,r.jsxs)("div",{className:"col-span-full",children:[(0,r.jsx)(a.O,{entries:["profile"]}),(0,r.jsx)(p.Z,{component:"form",sx:{"& .MuiTextField-root":{m:1,width:"25ch"}},noValidate:!0,autoComplete:"off",children:(0,r.jsxs)(K.Z,{alignItems:"center",spacing:3,sx:{pt:5,borderRadius:2,position:"relative"},children:[(0,r.jsxs)(y.Z,{variant:"body2",onClick:()=>{var e;let t=null==i?void 0:null===(e=i.did)||void 0===e?void 0:e.toString();navigator.clipboard.writeText(t),W("DID copied to clipboard.")},sx:{textDecoration:"none",cursor:"pointer","&:hover":{color:"blue"}},children:[null==i?void 0:null===(e=i.did)||void 0===e?void 0:e.toString(),(0,r.jsx)(ea.Z,{style:{fontSize:16,marginLeft:5}})]}),(0,r.jsx)(ey,{credential:v,width:100,height:100,onFileUpload:eL,updating:eE,disabled:!h})]})}),(0,r.jsxs)(Q.Z,{children:[(0,r.jsxs)(K.Z,{direction:"row",alignItems:"center",justifyContent:"space-between",children:[(0,r.jsx)(y.Z,{variant:"h4",gutterBottom:!0,children:"About me"}),(0,r.jsx)(P.c,{leftIcon:(0,r.jsx)($.Z,{}),disabled:!h,onClick:()=>{N(!0)},children:"New profile item"})]}),(0,r.jsxs)(y.Z,{gutterBottom:!0,children:[(0,r.jsx)("i",{children:"Good to know"}),": every item in the list below is stored in your identity as an individual ",(0,r.jsx)("b",{children:"credential"}),". Credentials can later be shared to apps that request them, with your consent. Credentials are always signed with your own signature so no matter where they are shared, one can always make sure that ",(0,r.jsx)("b",{children:"the information inside was created by you, and not modified"}),"."]}),m&&(!h||!x)&&(0,r.jsx)(U.q,{}),f&&(!h||!x)&&(0,r.jsx)(z.d,{className:"mt-4"}),h&&x&&(0,r.jsxs)(Y.Z,{children:[(0,r.jsx)(D,{numSelected:ef.length,filterName:eS,onFilterName:e=>{ep(0),ek(e.target.value)}}),(0,r.jsx)(ee.Z,{sx:{maxWidth:1200},children:(0,r.jsxs)(et.Z,{children:[(0,r.jsx)(g,{order:ev,orderBy:eC,headLabel:eZ,rowCount:h?h.length:0,numSelected:ef?ef.length:0,onRequestSort:(e,t)=>{let i=eC===t&&"asc"===ev;em(i?"desc":"asc"),ew(t)},onSelectAllClick:()=>{}}),(0,r.jsxs)(ei.Z,{children:[null==eq?void 0:eq.slice(eu*eN,eu*eN+eN).map(e=>{let t=e.id;return(0,r.jsxs)(c.Z,{hover:!0,tabIndex:-1,onClick:()=>eJ(e),className:"cursor-pointer",children:[(0,r.jsx)(u.Z,{component:"th",scope:"row",padding:"none",children:(0,r.jsxs)(K.Z,{ml:1,direction:"row",alignItems:"center",spacing:2,children:[(0,r.jsx)(s.J,{credential:e,width:60,height:60}),(0,r.jsx)(y.Z,{variant:"subtitle2",noWrap:!0,children:e.getDisplayableTitle()})]})}),(0,r.jsx)(u.Z,{align:"left",children:e.getDisplayValue()}),(0,r.jsx)(u.Z,{align:"right",children:(0,r.jsx)(C.Z,{size:"large",color:"inherit",onClick:t=>{eW(t,e)},children:(0,r.jsx)(X.Z,{})})})]},t)}),eB>0&&(0,r.jsx)(c.Z,{style:{height:53*eB},children:(0,r.jsx)(u.Z,{colSpan:6})})]}),eU&&(0,r.jsx)(ei.Z,{children:(0,r.jsx)(c.Z,{children:(0,r.jsx)(u.Z,{align:"center",colSpan:6,sx:{py:3},children:(0,r.jsxs)("div",{className:"text-center",children:[(0,r.jsx)(y.Z,{variant:"h6",paragraph:!0,children:"Not found"}),(0,r.jsxs)(y.Z,{variant:"body2",children:["No results found for \xa0",(0,r.jsxs)("strong",{children:['"',eS,'"']}),".",(0,r.jsx)("br",{})," Try checking for typos or using complete words."]})]})})})})]})}),(0,r.jsx)(el.Z,{rowsPerPageOptions:[5,10,25],component:"div",count:h?h.length:0,rowsPerPage:eN,page:eu,onPageChange:(e,t)=>{ep(t)},onRowsPerPageChange:e=>{ep(0),eD(parseInt(e.target.value,10))}})]}),(0,r.jsx)("div",{className:"mt-4",children:(0,r.jsx)(y.Z,{variant:"h4",gutterBottom:!0,children:"Advanced"})}),eA&&(0,r.jsx)(ex(),{target:"_blank",href:eA,children:"View identity's DID on blockchain explorer"})]}),(0,r.jsxs)(en.ZP,{open:!!L,anchorEl:L,onClose:e_,anchorOrigin:{vertical:"top",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"right"},PaperProps:{sx:{p:1,width:140,"& .MuiMenuItem-root":{px:1,typography:"body2",borderRadius:.75}}},children:[(0,r.jsx)(er.Z,{onClick:()=>{e_(),E(!0);let e=(0,eo.m7)(Z.verifiableCredential.getType());F(e),T(Z.verifiableCredential.getSubject().getProperty(e.key)),O(q.b1.EDIT)},children:"Edit"}),(0,r.jsx)(er.Z,{sx:{color:"error.main"},onClick:()=>{e_(),eI(!0)},children:"Delete"})]}),(0,r.jsx)(o.Z,{title:"Delete this Credential?",content:"Do you want to delete this Credential?",open:eP,onClose:ez}),(0,r.jsx)(B,{open:k,onClose:e=>{N(!1),e&&(E(!0),F(e),T(""),O(q.b1.NEW),b(null))},availableItemsForAddition:w}),(0,r.jsx)(q.ZP,{credentialInfo:V,defaultValue:A,type:R,open:I,originCredential:Z,onClose:eO})]})}},89791:function(e,t,i){"use strict";i.d(t,{d:function(){return s}});var l=i(57437),n=i(12131),r=i(57042),a=i(57135);let s=e=>{let{className:t}=e,{retryUnlock:i}=(0,a.lJ)();return(0,l.jsxs)("div",{className:(0,r.Z)("flex flex-row items-center gap-2",t),children:[(0,l.jsx)("div",{children:"This content could not be unlocked, please retry"}),(0,l.jsx)(n.c,{onClick:()=>{i()},children:"Unlock personal data"})]})}},70874:function(){}},function(e){e.O(0,[6990,6110,1510,8920,4057,6685,6953,7998,2077,4882,5197,1947,1385,2955,2971,596,1744],function(){return e(e.s=40649)}),_N_E=e.O()}]);