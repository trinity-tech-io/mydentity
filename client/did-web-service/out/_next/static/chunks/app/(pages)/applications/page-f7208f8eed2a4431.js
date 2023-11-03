(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2029],{97738:function(e,t,n){Promise.resolve().then(n.bind(n,40097))},40097:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return page}});var i=n(57437),r=n(2265),l=n(13457),a=n(81679),s=n(43226),o=n(84081),c=n(28874),d=n(58991),u=n(40542),h=n(57958),p=n(15707),x=n(96507),g=n(3283),j=n(81344),m=n(48727),v=n(16691),f=n.n(v),Z=n(62167),b=n(97870),y=n(50480),w=n(79673),C=n(23785),k=n(11290),N=n(13581),S=n(35843),A=n(12782),P=n(92277),M=n(96283),B=n(42464),components_CredentialBox=e=>{let{credential:t}=e;return(0,i.jsx)("div",{className:"relative h-full",children:(0,i.jsx)(y.m,{className:"h-full",elevation:0,sx:{pl:"12px",pr:"4px",py:"10px",display:"grid",verticalAlign:"middle"},children:(0,i.jsx)(l.Z,{direction:"row",alignItems:"center",overflow:"hidden",sx:{height:42},children:(0,i.jsxs)(l.Z,{direction:"row",spacing:1,flexGrow:1,alignItems:"center",overflow:"hidden",children:[(0,i.jsx)("div",{className:"relative",children:(0,i.jsx)(M.J,{credential:t,width:32,height:32})}),(0,i.jsxs)(l.Z,{overflow:"hidden",children:[(0,i.jsx)(s.Z,{variant:"body2",fontWeight:600,noWrap:!0,children:t.getDisplayableTitle()}),(0,i.jsx)(s.Z,{variant:"caption",fontSize:"9pt",noWrap:!0,children:t.getDisplayValue()&&(0,i.jsx)(B.h,{data:t.getDisplayValue()})})]})]})})})})};let T=(0,S.ZP)(A.Z)({background:"#a0a0a040",minHeight:"unset",borderRadius:".25rem","& .MuiTabs-indicator":{display:"flex",justifyContent:"center",backgroundColor:"transparent",paddingLeft:16,paddingRight:16},"& .MuiTabs-indicatorSpan":{width:"100%",backgroundColor:"#9D3E3E"}}),I=(0,S.ZP)(P.Z)(e=>{let{theme:t}=e;return{textTransform:"none",fontWeight:t.typography.fontWeightRegular,fontSize:t.typography.pxToRem(15),marginRight:t.spacing(1),minHeight:"unset",paddingTop:8,paddingBottom:8,color:"rgba(255, 255, 255, 0.7)","&.Mui-selected":{color:"#fff"},"&.Mui-focusVisible":{backgroundColor:"rgba(100, 95, 228, 0.32)"}}}),V=(0,S.ZP)(k.Z)(e=>{let{theme:t}=e;return{paddingTop:16,paddingBottom:0}});var components_CredentialTabContext=e=>{let{application:t}=e,[n,l]=(0,r.useState)("1"),[a]=(0,u.V)(null==t?void 0:t.requestedCredentials$),[s]=(0,u.V)(null==t?void 0:t.importedCredentials$);return(0,i.jsxs)(N.ZP,{value:n,children:[(0,i.jsxs)(T,{value:n,onChange:(e,t)=>{l(t)},TabIndicatorProps:{children:(0,i.jsx)("span",{className:"MuiTabs-indicatorSpan"})},variant:"fullWidth",centered:!0,children:[(0,i.jsx)(I,{value:"1",label:"".concat((null==a?void 0:a.length)||0," credential(s) shared to")}),(0,i.jsx)(I,{value:"2",label:"".concat((null==s?void 0:s.length)||0," credential(s) received from")})]}),(0,i.jsx)(V,{value:"1",children:(0,i.jsx)(c.ZP,{container:!0,spacing:2,children:null==a?void 0:a.map(e=>(0,i.jsx)(c.ZP,{item:!0,xs:6,children:(0,i.jsx)(components_CredentialBox,{credential:e.credential})},e.id))})}),(0,i.jsx)(V,{value:"2",children:(0,i.jsx)(c.ZP,{container:!0,spacing:2,children:null==s?void 0:s.map(e=>(0,i.jsx)(c.ZP,{item:!0,xs:6,children:(0,i.jsx)(components_CredentialBox,{credential:e})},e.id))})})]})},components_ApplicationBox=e=>{var t,n;let{application:r,id:a,expanded:o,setExpanded:c}=e,[d]=(0,u.V)(null==r?void 0:null===(t=r.interactingApplication)||void 0===t?void 0:t.name$),[h]=(0,u.V)(null==r?void 0:null===(n=r.interactingApplication)||void 0===n?void 0:n.icon$);return(0,i.jsx)(y.m,{elevation:0,children:(0,i.jsxs)(x.Z,{className:"relative z-10 flex flex-col h-full p-4",children:[(0,i.jsxs)(l.Z,{direction:"row",spacing:1.5,pb:1,alignItems:"center",children:[(0,i.jsx)(g.Z,{sx:{width:32,height:32},children:h&&(0,i.jsx)(f(),{src:h,alt:"",width:32,height:32})}),(0,i.jsxs)(l.Z,{flexGrow:1,children:[(0,i.jsx)(s.Z,{variant:"body2",fontWeight:600,children:d}),(0,i.jsx)(s.Z,{variant:"caption",fontStyle:"italic",fontSize:9,children:null==r?void 0:r.createdAt.toLocaleString()})]}),(0,i.jsx)("div",{children:(0,i.jsx)(C.UO,{size:"small",endIcon:o?(0,i.jsx)(m.Z,{}):(0,i.jsx)(j.Z,{}),onClick:e=>{e.stopPropagation(),c(e=>{let t=[...e],n=t.findIndex(e=>e===a);return n<0?1!=t.length?t.push(a):t=[a]:t.splice(n,1),t})},children:"Show credentials"})})]}),(0,i.jsx)(w.Z,{value:r.interactingApplication.did,outerProps:{readOnly:!0},inputProps:{className:"opacity-80",style:{fontSize:12}}}),(0,i.jsx)(Z.M,{initial:!1,children:o&&(0,i.jsx)(b.E.section,{initial:"collapsed",animate:"open",exit:"collapsed",variants:{open:{opacity:1,height:"auto"},collapsed:{opacity:0,height:0}},transition:{duration:.3,ease:[.04,.62,.23,.98]},children:(0,i.jsx)("div",{className:"mt-4",children:(0,i.jsx)(components_CredentialTabContext,{application:r})})},"content")})]})})},_=n(12861),E=n(66074),R=n(6207),W=n(29166),page=()=>{let[e]=(0,u.V)(h.Bx),[t]=(0,u.V)(null==e?void 0:e.applications().applications$),[n,x]=(0,r.useState)([]),[g,j]=(0,r.useState)(!1),[m,v]=(0,r.useState)(""),f=m?null==t?void 0:t.filter(e=>{var t,n;return null==e?void 0:null===(n=e.interactingApplication)||void 0===n?void 0:null===(t=n.name$.getValue())||void 0===t?void 0:t.toLowerCase().includes(m.toLowerCase())}):t;return(0,r.useEffect)(()=>{(null==t?void 0:t.length)&&x(e=>g?t.map(e=>e.id):[])},[g,t]),(0,i.jsxs)("div",{className:"col-span-full",children:[(0,i.jsx)(p.Z,{title:"Applications",description:"Applications that interacted with your identity. These applications are instrumental in communicating with the identity framework to provide enriched services and tailored experiences.",showBg:!0}),(0,i.jsxs)(l.Z,{direction:"row",className:"mb-4",children:[(0,i.jsx)(_.Z,{id:"credential-search",size:"small",placeholder:"Search",className:"mr-4 rounded",onChange:e=>{v(e.target.value.trim())},startAdornment:(0,i.jsx)(a.Z,{position:"start",children:(0,i.jsx)(d.Z,{})})}),(0,i.jsxs)(l.Z,{direction:"row",spacing:2,sx:{ml:"auto"},children:[(0,i.jsxs)(l.Z,{direction:"row",spacing:1,alignItems:"center",children:[(0,i.jsx)(s.Z,{variant:"body2",className:"text-[#C4C4C4]",children:"Show Details"}),(0,i.jsx)(E.Z,{onChange:(e,t)=>{j(t)}})]}),(0,i.jsx)(o.Z,{children:(0,i.jsx)(R.Z,{valuePrefix:"filter",list:["All"]})})]})]}),t?(0,i.jsxs)(i.Fragment,{children:[f&&!f.length&&(0,i.jsx)(s.Z,{variant:"h6",align:"center",sx:{pt:2},children:m?(0,i.jsxs)(i.Fragment,{children:["No results found for \xa0",(0,i.jsxs)("strong",{children:['"',m,'"']}),".",(0,i.jsx)("br",{})," Try checking for typos or using complete words."]}):"No application has interacted with this identity yet."}),(null==f?void 0:f.length)>0&&(0,i.jsx)(c.ZP,{container:!0,spacing:2,children:null==f?void 0:f.map((e,t)=>(0,i.jsx)(c.ZP,{item:!0,xs:12,sm:6,children:(0,i.jsx)(components_ApplicationBox,{application:e,id:e.id,expanded:n.includes(e.id),setExpanded:x})},t))})]}):(0,i.jsx)(c.ZP,{container:!0,spacing:2,children:(0,i.jsx)(c.ZP,{item:!0,xs:12,sm:6,children:(0,i.jsx)(W.kY,{})})})]})}},79673:function(e,t,n){"use strict";var i=n(57437);n(2265);var r=n(35843),l=n(90923),a=n(84081),s=n(81679),o=n(23785);let c=(0,r.ZP)(l.Z)(e=>{let{theme:t}=e;return{input:{color:"white"}}}),d=(0,r.ZP)(a.Z)(e=>{let{theme:t}=e;return{".MuiInputBase-root":{paddingRight:8},".MuiInputBase-root:hover:not(.Mui-disabled, .Mui-error)":{fieldset:{opacity:.4}},".MuiInputBase-root.Mui-focused":{fieldset:{opacity:.6,borderColor:"white"}}}});t.Z=e=>{let{value:t,outerProps:n={},inputProps:r={},disableCopy:l=!1}=e;return(0,i.jsx)(d,{children:(0,i.jsx)(c,{...n,value:t,size:"small",type:"input",inputProps:{...r},endAdornment:!l&&(0,i.jsx)(s.Z,{position:"end",children:(0,i.jsx)(o.qi,{text:t,iconWidth:18})})})})}},96283:function(e,t,n){"use strict";n.d(t,{J:function(){return CredentialAvatar}});var i=n(57437),r=n(57042),l=n(16691),a=n.n(l),s=n(22135),o=n(3283),c=n(41101),d=n(40542);let CredentialAvatar=e=>{let{credential:t,width:n=60,height:l=60,className:u}=e,[h]=(0,d.V)(null==t?void 0:t.representativeIcon$),p=(0,c.Z)(),x=(0,s.Z)(p.breakpoints.between("sm","md")),g=(0,s.Z)(p.breakpoints.down("sm")),j=g&&.75||x&&.9||1;return(0,i.jsx)(o.Z,{sx:{width:n*j,height:l*j,padding:"string"==typeof h?0:"".concat(.125*Math.floor(n*j/8),"rem"),backgroundColor:"#7575754d"},className:(0,r.Z)(u),children:"string"==typeof h?(0,i.jsx)(a(),{src:h,alt:"",width:n*j,height:l*j}):h})}},42464:function(e,t,n){"use strict";n.d(t,{h:function(){return JsonViewer}});var i=n(57437);function JsonViewer(e){let{data:t}=e,renderJson=e=>{if("object"!=typeof e||null===e)return(0,i.jsx)("span",{className:"json-value",children:String(e)});if(Array.isArray(e))return(0,i.jsx)("div",{className:"json-array",children:e.map((e,t)=>(0,i.jsx)("div",{children:renderJson(e)},t))});{let t=Object.keys(e);return(0,i.jsx)("div",{className:"json-object",children:t.map(t=>(0,i.jsxs)("div",{children:[(0,i.jsxs)("span",{className:"json-key",children:[t,"："]})," ",renderJson(e[t])]},t))})}};return(0,i.jsxs)("div",{className:"json-viewer truncate",style:{textAlign:"left"},children:[renderJson(t),(0,i.jsx)("style",{children:"\n          .json-viewer {\n            font-family: Arial, sans-serif;\n          }\n          .json-object, .json-array {\n            list-style: none;\n            padding-left: 20px;\n          }\n          .json-key {\n            font-weight: bold;\n          }\n        "})]})}n(2265)},12861:function(e,t,n){"use strict";var i=n(90923),r=n(35843);let l=(0,r.ZP)(i.Z)(e=>{let{theme:t,className:n}=e;return{borderRadius:(null==n?void 0:n.includes("rounded"))?8:4,input:{color:"white"},fieldset:{opacity:.6,borderColor:"white"},"&.Mui-focused, &:hover:not(.Mui-disabled, .Mui-error)":{fieldset:{opacity:.8,borderColor:"white !important"}},".Mui-disabled":{opacity:.5,input:{WebkitTextFillColor:"white",textFillColor:"white"},fieldset:{borderColor:"white"}}}});t.Z=l},15707:function(e,t,n){"use strict";var i=n(57437),r=n(35843),l=n(43226);let a=(0,r.ZP)("div")(e=>{let{showBg:t}=e;return{marginBottom:"1.5rem",background:t?"url('/headline-banner.png') no-repeat center center / cover":"none"}});t.Z=e=>{let{title:t,description:n,showBg:r=!1}=e;return(0,i.jsxs)(a,{showBg:r,className:r?"p-4 sm:p-6 rounded-lg":"",children:[(0,i.jsx)(l.Z,{className:"w-full pb-3 sm:pb-4 sm:pb-8",variant:"h3",color:"text.primary",children:t}),(0,i.jsx)(l.Z,{className:"mt-4",variant:"body1",color:"text.primary",children:n})]})}},6207:function(e,t,n){"use strict";var i=n(57437),r=n(2265),l=n(49050),a=n(43989),s=n(8424),o=n(72261),c=n(29872),d=n(74309),u=n(48727),h=n(81344);t.Z=e=>{let{list:t,defaultValue:n=0,valuePrefix:p="",onChange:x=e=>{}}=e,[g,j]=(0,r.useState)(!1),[m,v]=(0,r.useState)(n),f=(0,r.useRef)(null),handleClick=e=>{v(e.currentTarget.value),x("".concat(p).concat(e.currentTarget.value)),j(!1)};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(l.Z,{ref:f,variant:"outlined",className:"opacity-80",endIcon:g?(0,i.jsx)(u.Z,{}):(0,i.jsx)(h.Z,{}),color:"inherit",sx:{transition:"opacity .1s ease-out","&:hover":{opacity:1},borderRadius:2},onClick:()=>{j(!g)},children:t[m]}),(0,i.jsx)(a.Z,{open:g,anchorEl:f.current,placement:"bottom-start",transition:!0,children:e=>{let{TransitionProps:n,placement:r}=e;return(0,i.jsx)(s.d,{onClickAway:()=>{j(!1)},children:(0,i.jsx)(o.Z,{...n,style:{transformOrigin:"bottom-start"===r?"left top":"left bottom"},children:(0,i.jsx)(c.Z,{sx:{py:1},children:t.map((e,t)=>(0,i.jsx)(d.Z,{value:t,onClick:handleClick,children:e},t))})})})}})]})}},66074:function(e,t,n){"use strict";var i=n(45421),r=n(35843);let l=(0,r.ZP)(i.Z)(e=>{let{theme:t}=e;return{width:52,height:32,padding:0,"& .MuiSwitch-switchBase":{padding:4},"& .MuiSwitch-thumb":{backgroundColor:"#fff !important",width:24,height:24},"& .MuiSwitch-track":{opacity:1,backgroundColor:"#3A3A3A",borderRadius:20,border:0},"& .Mui-checked+.MuiSwitch-track":{background:"linear-gradient(270deg, #089ecd 0%, #172232 100%)",opacity:"1 !important"}}});t.Z=l},40542:function(e,t,n){"use strict";n.d(t,{V:function(){return useBehaviorSubject}});var i=n(2265);let useBehaviorSubject=e=>{let[t,n]=(0,i.useState)(null==e?void 0:e.getValue()),[r,l]=(0,i.useState)();return(0,i.useEffect)(()=>{if(!e){n(null);return}let t=e.subscribe({next:e=>{n(e)},error:l});return()=>t.unsubscribe()},[e]),[t]}},57958:function(e,t,n){"use strict";n.d(t,{Bx:function(){return r},IW:function(){return getActiveIdentity}});var i=n(50676);let r=new i.X(null);function getActiveIdentity(){return r.value}}},function(e){e.O(0,[3861,6506,9490,9830,1510,6953,378,5951,8599,3474,3451,8874,6691,3989,2602,4184,880,9267,567,2971,7864,1744],function(){return e(e.s=97738)}),_N_E=e.O()}]);