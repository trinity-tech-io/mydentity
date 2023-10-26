(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[266],{2004:function(e,t,n){Promise.resolve().then(n.bind(n,60329))},60329:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return page}});var r=n(57437),i=n(2265),l=n(58991),s=n(13457),a=n(43226),o=n(81679),d=n(84081),c=n(96507),u=n(6438);n(64636);var h=n(40542),p=n(97716);let commonFilter=(e,t,n)=>{let r=null==e?void 0:e.getIssuer(),i=null==t?void 0:t.did.toString();return r===i===n},g={filter0:()=>!0,filter1:(e,t)=>commonFilter(e,t,!0),filter2:(e,t)=>commonFilter(e,t,!1),filter3:e=>e.isConform$.getValue(),filter4:e=>!e.isConform$.getValue()},filterCredentials=(e,t,n)=>t.filter(t=>{let r=g[e];return!r||r(t,n)});var f=n(62167),v=n(97870),m=n(52653),y=n(35266),x=n(69299),b=n(38212),C=n(4856),w=n(50480),j=n(96283),S=n(42464),T=n(70465),Z=n(57958),components_CredentialBox=e=>{let{id:t,credential:n,expanded:i,setExpanded:l,onClick:o}=e,[d]=(0,h.V)(null==n?void 0:n.requestingApplications$),[c]=(0,h.V)(null==n?void 0:n.isConform$),[u]=(0,h.V)(null==n?void 0:n.issuerInfo$),[p]=(0,h.V)(Z.Bx);return(0,r.jsxs)("div",{className:"relative h-full cursor-pointer",onClick:()=>{o(n)},children:[(0,r.jsxs)(w.m,{className:"h-full",elevation:0,sx:{pl:"12px",pr:"4px",py:"10px",display:"grid",verticalAlign:"middle"},children:[(0,r.jsxs)(s.Z,{direction:"row",alignItems:"center",overflow:"hidden",sx:{height:42},children:[(0,r.jsxs)(s.Z,{direction:"row",spacing:1,flexGrow:1,alignItems:"center",overflow:"hidden",children:[(0,r.jsxs)("div",{className:"relative",children:[(0,r.jsx)(j.J,{credential:n,width:32,height:32}),c&&(0,r.jsx)(T.O,{className:"absolute right-0 bottom-0 translate-x-[10%] translate-y-[20%]"})]}),(0,r.jsxs)(s.Z,{overflow:"hidden",children:[(0,r.jsx)(a.Z,{variant:"body2",fontWeight:600,noWrap:!0,children:n.getDisplayableTitle()}),(0,r.jsx)(a.Z,{variant:"caption",fontSize:"9pt",noWrap:!0,children:n.getDisplayValue()&&(0,r.jsx)(S.h,{data:n.getDisplayValue()})})]})]}),(0,r.jsx)("div",{children:(0,r.jsx)(m.Z,{size:"small",color:"inherit",onClick:e=>{e.stopPropagation(),l(e=>{let n=[...e],r=n.findIndex(e=>e===t);return r<0?1!=n.length?n.push(t):n=[t]:n.splice(r,1),n})},children:(0,r.jsx)(C.Z,{fontSize:"small"})})})]}),(0,r.jsx)(f.M,{initial:!1,children:i&&(0,r.jsx)(v.E.section,{initial:"collapsed",animate:"open",exit:"collapsed",variants:{open:{opacity:1,height:"auto"},collapsed:{opacity:0,height:0}},transition:{duration:.8,ease:[.04,.62,.23,.98]},children:(0,r.jsxs)(y.Z,{dense:!0,sx:{".MuiListItemText-root":{margin:0}},children:[(0,r.jsx)(x.ZP,{children:(0,r.jsx)(b.Z,{primary:"ISSUANCE DATE",secondary:n.verifiableCredential.issuanceDate.toLocaleString(),primaryTypographyProps:{fontSize:14,fontWeight:600},secondaryTypographyProps:{fontSize:11}})}),(0,r.jsx)(x.ZP,{children:(0,r.jsx)(b.Z,{primary:"EXPIRATION DATE",secondary:n.verifiableCredential.expirationDate.toLocaleString(),primaryTypographyProps:{fontSize:14,fontWeight:600},secondaryTypographyProps:{fontSize:11}})}),(0,r.jsx)(x.ZP,{children:(0,r.jsx)(b.Z,{primary:"CREATED BY",secondary:n.getCreatedBy(u,p),primaryTypographyProps:{fontSize:14,fontWeight:600},secondaryTypographyProps:{fontSize:11}})})]})},"content")})]}),(0,r.jsx)("div",{className:"inline-flex absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3",children:(0,r.jsx)(T.Z,{count:(null==d?void 0:d.length)||0})})]})},k=n(82057),N=n(15873),I=n(58768),A=n(26931),V=n(39350),D=n(72261),E=n(81344),P=n(28278),L=n(8349),F=n(39830),B=n(26371),W=n(66267);let K={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400,boxShadow:24,p:2,"&:focus-visible":{outline:"unset"},".swiper-button":{display:"flex",position:"absolute",top:"calc(50% - 12px)",zIndex:10,cursor:"pointer"},".swiper-button svg":{width:"1.5rem",height:"1.5rem"},".image-swiper-button-prev":{left:5},".image-swiper-button-next":{right:5},".swiper-button-disabled":{opacity:.5,pointerEvents:"none"},".swiper-pagination":{bottom:0,transform:"translateX(-50%) translateY(50%)",width:"auto",left:"50%",backdropFilter:"blur(5px)",fontWeight:600}},ListItemTextStyled=e=>{let{primary:t,secondary:n}=e;return(0,r.jsx)(b.Z,{primary:t,secondary:n,primaryTypographyProps:{fontSize:14,fontWeight:600},secondaryTypographyProps:{fontSize:11}})},O=(0,i.memo)(e=>{let{credential:t}=e,[n]=(0,h.V)(null==t?void 0:t.requestingApplications$),[i]=(0,h.V)(null==t?void 0:t.isConform$),[l]=(0,h.V)(null==t?void 0:t.issuerInfo$),o=null==t?void 0:t.getContentTree(),d=null==t?void 0:t.getValueItems(),[u]=(0,h.V)(Z.Bx);return(0,r.jsxs)(c.Z,{className:"p-1 relative",children:[(0,r.jsxs)(s.Z,{direction:"row",spacing:1,flexGrow:1,alignItems:"center",overflow:"hidden",className:"pb-1",children:[(0,r.jsxs)("div",{className:"relative",children:[(0,r.jsx)(j.J,{credential:t,width:32,height:32}),i&&(0,r.jsx)(T.O,{className:"absolute right-0 bottom-0 translate-x-[10%] translate-y-[20%]"})]}),(0,r.jsx)(a.Z,{flexGrow:1,variant:"body2",fontWeight:600,noWrap:!0,children:null==t?void 0:t.getDisplayableTitle()})]}),(0,r.jsxs)(y.Z,{dense:!0,sx:{pl:2,".MuiListItemText-root":{margin:0}},children:[null==d?void 0:d.map((e,n)=>"subfield"===e.name.toLowerCase()?o.subField&&(0,r.jsx)(x.ZP,{children:(0,r.jsx)(z,{subfield:o.subField})},n):(0,r.jsx)(x.ZP,{children:(0,r.jsx)(ListItemTextStyled,{primary:e.name.toUpperCase(),secondary:null==t?void 0:t.getDisplayValue()})},n)),(0,r.jsx)(x.ZP,{children:(0,r.jsx)(ListItemTextStyled,{primary:"ISSUANCE DATE",secondary:null==t?void 0:t.verifiableCredential.issuanceDate.toLocaleString()})}),(0,r.jsx)(x.ZP,{children:(0,r.jsx)(ListItemTextStyled,{primary:"EXPIRATION DATE",secondary:null==t?void 0:t.verifiableCredential.expirationDate.toLocaleString()})}),(0,r.jsx)(x.ZP,{children:(0,r.jsx)(ListItemTextStyled,{primary:"CREATED BY",secondary:t.getCreatedBy(l,u)})})]}),(0,r.jsx)("div",{className:"inline-flex absolute bottom-0 right-0",children:(0,r.jsx)(T.Z,{count:(null==n?void 0:n.length)||0})})]})});O.displayName="CredentialSliderContent";let z=(0,i.memo)(e=>{let{subfield:t}=e;return(0,r.jsxs)(k.Z,{className:"w-full",sx:{boxShadow:"unset"},defaultExpanded:!0,children:[(0,r.jsx)(N.Z,{expandIcon:(0,r.jsx)(E.Z,{}),sx:{p:0,minHeight:"auto !important",".MuiAccordionSummary-content, .MuiAccordionSummary-content.Mui-expanded":{my:.5}},children:(0,r.jsx)(a.Z,{variant:"body2",fontWeight:600,children:"SUBFIELD"})}),(0,r.jsx)(I.Z,{children:(0,r.jsx)(y.Z,{dense:!0,sx:{p:0,".MuiListItemText-root":{margin:0}},children:Object.keys(t).map((e,n)=>(0,r.jsx)(x.ZP,{children:(0,r.jsx)(ListItemTextStyled,{primary:e.toUpperCase(),secondary:t[e]})},n))})})]})});z.displayName="SubDetailAccordion";var M=(0,i.memo)(e=>{let{open:t,identityProfile:n,credentials:l,onClose:s}=e,[o,d]=(0,i.useState)(null),[c,u]=(0,i.useState)(0),[p]=(0,h.V)(null==n?void 0:n.activeCredential$),slideTo=e=>{null==o||o.slideTo(e,100)};return(0,i.useEffect)(()=>{if(l&&p&&!(null==o?void 0:o.destroyed)){let e=null==l?void 0:l.findIndex(e=>e.id==p.id);e<0&&(e=c),c!=e&&slideTo(e)}},[l,p,o]),(0,r.jsx)(A.Z,{open:t,onClose:s,closeAfterTransition:!0,"aria-labelledby":"credentials","aria-describedby":"credential-slider",slots:{backdrop:V.Z},slotProps:{backdrop:{timeout:200}},children:(0,r.jsx)(D.Z,{in:t,children:(0,r.jsxs)(w.m,{sx:K,elevation:0,children:[(0,r.jsxs)("div",{className:"inline-flex items-center pb-2",children:[(0,r.jsx)(W.C,{sx:{width:36,height:36},children:(0,r.jsx)("div",{className:"w-4 h-4 flex justify-center",children:(0,r.jsx)(B.Z,{})})}),(0,r.jsx)(a.Z,{variant:"body1",fontWeight:600,className:"pl-2",children:"Credential".concat((null==l?void 0:l.length)>1?"s":"")})]}),(0,r.jsx)("div",{className:"swiper-button image-swiper-button-prev",children:(0,r.jsx)(F.JO,{icon:"icon-park-outline:left-c"})}),(0,r.jsx)("div",{className:"swiper-button image-swiper-button-next",children:(0,r.jsx)(F.JO,{icon:"icon-park-outline:right-c"})}),(0,r.jsx)(P.tq,{initialSlide:c,effect:"creative",grabCursor:!0,autoHeight:!0,modules:[L.N1,L.tl,L.W_],className:"mySwiper w-full",spaceBetween:20,creativeEffect:{prev:{shadow:!0,translate:[0,0,-400]},next:{translate:["100%",0,0]}},pagination:{type:"fraction"},keyboard:{enabled:!0},navigation:{nextEl:".image-swiper-button-next",prevEl:".image-swiper-button-prev",disabledClass:"swiper-button-disabled"},onTransitionEnd:e=>{u(e.activeIndex)},onSwiper:d,style:{overflowY:"visible"},children:null==l?void 0:l.map(e=>(0,r.jsx)(P.o5,{className:"box-border",children:(0,r.jsx)(O,{credential:e})},e.id))})]})})})}),U=n(96479);let H=(0,u.WidthProvider)(u.Responsive),CredentialListWidget=e=>{let{openedDetail:t,selectedFilter:n,stringFilter:l,identity:s}=e,[o]=(0,h.V)(null==s?void 0:s.credentials().credentials$),d=(0,p.s)(),u=null==s?void 0:s.profile(),[g]=(0,h.V)(null==u?void 0:u.activeCredential$),[f,v]=(0,i.useState)(o),[m,y]=(0,i.useState)([]),[x,b]=(0,i.useState)(!1),C={lg:12,md:10,sm:6,xs:4,xxs:2},handleListItemClick=e=>{u.setActiveCredential(e),b(!0)};(0,i.useEffect)(()=>{o&&!g&&u.setActiveCredential(o[0])},[g,o]),(0,i.useEffect)(()=>{if(o){let e=filterCredentials(n,o,s).filter(e=>e.getDisplayableTitle().toLowerCase().includes(l.toLowerCase()));u.setActiveCredential(e[0]||null),v(e)}},[o,n,l,s]),(0,i.useEffect)(()=>{(null==f?void 0:f.length)&&y(e=>t?f.map(e=>e.id):[])},[t,f]);let w=(0,i.useCallback)(()=>{let e={};return Object.keys(C).forEach(t=>{let n=d&&f?f:[,,,].fill(0).map((e,t)=>({id:t.toString()}));e[t]=n.map((e,n)=>({i:e.id,x:2*n%C[t],y:Math.floor(2*n/C[t]),w:2,h:m.includes(e.id)?3:1}))}),e},[m,f,d]);return(0,r.jsxs)("div",{className:"col-span-full",children:[d&&f&&!f.length&&(0,r.jsx)(a.Z,{variant:"body1",align:"center",lineHeight:3,children:l?(0,r.jsxs)(r.Fragment,{children:["No results found for \xa0",(0,r.jsxs)("strong",{children:['"',l,'"']}),".",(0,r.jsx)("br",{})," Try checking for typos or using complete words."]}):"No credential found."}),(0,r.jsx)(H,{containerPadding:[0,0],margin:[16,16],className:"layout mb-2",isDraggable:!1,isResizable:!1,layouts:w(),cols:C,rowHeight:62,breakpoint:"",style:f&&!f.length?{height:0}:{},children:d&&f?f.map(e=>(0,r.jsx)(c.Z,{children:(0,r.jsx)(components_CredentialBox,{id:e.id,credential:e,expanded:m.includes(e.id),setExpanded:y,onClick:handleListItemClick})},e.id)):[,,,].fill(0).map((e,t)=>(0,r.jsx)(c.Z,{children:(0,r.jsx)(U.RZ,{},t)},t))}),(0,r.jsx)(M,{open:x,credentials:f,identityProfile:u,onClose:()=>{b(!1)}})]})};var $=n(15707),J=n(12861),R=n(66074),G=n(6207),_=n(83338),page=()=>{let[e]=(0,h.V)(Z.Bx),[t,n]=(0,i.useState)(!1),[c,u]=(0,i.useState)(""),[p,g]=(0,i.useState)("");return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{className:"col-span-full",children:(0,r.jsx)($.Z,{title:"Credentials",description:"Here is the comprehensive list of all your credentials, which are pieces of information related to you. These credentials may originate from your actions or other applications acting on your behalf, encompassing both your base identity profile and additional data.",showBg:!0})}),(0,r.jsxs)(s.Z,{direction:"row",spacing:2,marginBottom:2,children:[(0,r.jsxs)("div",{className:"bg-[#666666]/[.18] flex flex-col flex-1 gap-4 p-4 rounded-md",children:[(0,r.jsxs)("div",{className:"flex items-center gap-4",children:[(0,r.jsx)(T.O,{className:"mx-1"}),(0,r.jsx)(a.Z,{variant:"body2",fontWeight:600,className:"flex-1",children:"This credential conforms to a format published by its issuer and can be easily reused by multiple apps."})]}),(0,r.jsxs)("div",{className:"flex items-center gap-4",children:[(0,r.jsx)("div",{className:"w-4 h-4 inline-flex justify-center items-center p-2 text-[7pt] rounded-[4px] bg-[#9291A5]",children:"N"}),(0,r.jsx)(a.Z,{variant:"body2",fontWeight:600,className:"flex-1",children:"Number of shared apps"})]})]}),(0,r.jsxs)("div",{className:"flex flex-col items-end gap-1",children:[(0,r.jsxs)("div",{className:"flex",children:[(0,r.jsx)(J.Z,{id:"credential-search",size:"small",placeholder:"Search",className:"mr-4 rounded",onChange:e=>{g(e.target.value.trim())},startAdornment:(0,r.jsx)(o.Z,{position:"start",children:(0,r.jsx)(l.Z,{})})}),(0,r.jsx)(_.Z,{identity:e})]}),(0,r.jsx)("div",{className:"flex flex-col flex-1 justify-end",children:(0,r.jsxs)("div",{className:"inline-flex gap-2",children:[(0,r.jsxs)(s.Z,{direction:"row",spacing:1,alignItems:"center",children:[(0,r.jsx)(a.Z,{variant:"body2",className:"text-[#C4C4C4]",children:"Show Details"}),(0,r.jsx)(R.Z,{onChange:(e,t)=>{n(t)}})]}),(0,r.jsx)(d.Z,{children:(0,r.jsx)(G.Z,{valuePrefix:"filter",list:["All","Created by me","Created by others","Conform","Not conform"],onChange:e=>{u(e)}})})]})})]})]}),(0,r.jsx)(CredentialListWidget,{openedDetail:t,selectedFilter:c,stringFilter:p,identity:e})]})}},42464:function(e,t,n){"use strict";n.d(t,{h:function(){return JsonViewer}});var r=n(57437);function JsonViewer(e){let{data:t}=e,renderJson=e=>{if("object"!=typeof e||null===e)return(0,r.jsx)("span",{className:"json-value",children:String(e)});if(Array.isArray(e))return(0,r.jsx)("div",{className:"json-array",children:e.map((e,t)=>(0,r.jsx)("div",{children:renderJson(e)},t))});{let t=Object.keys(e);return(0,r.jsx)("div",{className:"json-object",children:t.map(t=>(0,r.jsxs)("div",{children:[(0,r.jsxs)("span",{className:"json-key",children:[t,"："]})," ",renderJson(e[t])]},t))})}};return(0,r.jsxs)("div",{className:"json-viewer truncate",style:{textAlign:"left"},children:[renderJson(t),(0,r.jsx)("style",{children:"\n          .json-viewer {\n            font-family: Arial, sans-serif;\n          }\n          .json-object, .json-array {\n            list-style: none;\n            padding-left: 20px;\n          }\n          .json-key {\n            font-weight: bold;\n          }\n        "})]})}n(2265)},70465:function(e,t,n){"use strict";n.d(t,{O:function(){return ConformBadge}});var r=n(57437),i=n(57042);let ConformBadge=e=>{let{className:t=""}=e;return(0,r.jsx)("div",{className:(0,i.Z)("bg-[#34A853] w-[10px] h-[10px] rounded-full",t)})};t.Z=e=>{let{count:t,isConform:n=!1}=e;return(0,r.jsx)("div",{className:(0,i.Z)("w-4 h-4 inline-flex justify-center items-center p-2 text-[7pt] rounded-[4px]",n?"bg-[#34A853]":"bg-[#9291A5]"),children:t})}},6207:function(e,t,n){"use strict";var r=n(57437),i=n(2265),l=n(49050),s=n(43989),a=n(8424),o=n(72261),d=n(29872),c=n(74309),u=n(48727),h=n(81344);t.Z=e=>{let{list:t,defaultValue:n=0,valuePrefix:p="",onChange:g=e=>{}}=e,[f,v]=(0,i.useState)(!1),[m,y]=(0,i.useState)(n),x=(0,i.useRef)(null),handleClick=e=>{y(e.currentTarget.value),g("".concat(p).concat(e.currentTarget.value)),v(!1)};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(l.Z,{ref:x,variant:"outlined",className:"opacity-80",endIcon:f?(0,r.jsx)(u.Z,{}):(0,r.jsx)(h.Z,{}),color:"inherit",sx:{transition:"opacity .1s ease-out","&:hover":{opacity:1},borderRadius:2},onClick:()=>v(!f),children:t[m]}),(0,r.jsx)(s.Z,{open:f,anchorEl:x.current,placement:"bottom-start",transition:!0,children:e=>{let{TransitionProps:n,placement:i}=e;return(0,r.jsx)(a.d,{onClickAway:()=>{v(!1)},children:(0,r.jsx)(o.Z,{...n,style:{transformOrigin:"bottom-start"===i?"left top":"left bottom"},children:(0,r.jsx)(d.Z,{sx:{py:1},children:t.map((e,t)=>(0,r.jsx)(c.Z,{value:t,onClick:handleClick,children:e},t))})})})}})]})}},66074:function(e,t,n){"use strict";var r=n(45421),i=n(35843);let l=(0,i.ZP)(r.Z)(e=>{let{theme:t}=e;return{width:52,height:32,padding:0,"& .MuiSwitch-switchBase":{padding:4},"& .MuiSwitch-thumb":{backgroundColor:"#fff !important",width:24,height:24},"& .MuiSwitch-track":{opacity:1,backgroundColor:"#3A3A3A",borderRadius:20,border:0},"& .Mui-checked+.MuiSwitch-track":{background:"linear-gradient(270deg, #089ecd 0%, #172232 100%)",opacity:"1 !important"}}});t.Z=l},47276:function(e,t,n){"use strict";n.d(t,{d:function(){return CredentialType}});let CredentialType=class CredentialType{setup(e){if(0>=e.indexOf("#"))this.shortType=e,this.context=null,this.longType=null;else{let t=e.split("#");this.context=t[0],this.shortType=t[1],this.longType=e}}getContext(){return this.context}getShortType(){return this.shortType}getLongType(){return this.longType}isLongType(){return!!this.longType}containedIn(e){return e.includes(this.getLongType())||e.includes(this.getShortType())}constructor(e){this.type=e,this.setup(e)}}},59898:function(e,t,n){"use strict";n.d(t,{Pr:function(){return findProfileInfoByKey},m7:function(){return findProfileInfoByTypes},yd:function(){return getAvailableProfileEntries}});var r=n(47276),i=n(59545);let CredentialValueConverter=class CredentialValueConverter{getInfo(e){return findProfileInfoByTypes(e.verifiableCredential.getType())}getEditionType(){return this.editionType}constructor(e){this.editionType=e}};var l=n(53386);let CredentialValueConverterString=class CredentialValueConverterString extends CredentialValueConverter{toEditableValue(e){return e.verifiableCredential.getSubject().getProperty(this.subjectKey)}toDisplayableValue(e){return e.verifiableCredential.getSubject().getProperty(this.subjectKey)}toSubject(e){return{[this.subjectKey]:e}}constructor(e){super(i.E.SingleLineString),this.subjectKey=e}};let s=[new i.h("name",new r.d("https://ns.elastos.org/credentials/profile/name/v1#NameCredential"),{converter:new CredentialValueConverterString("name")}),new i.h("avatar",new r.d("https://ns.elastos.org/credentials/profile/avatar/v1#AvatarCredential"),{converter:new class extends CredentialValueConverter{toEditableValue(e){return e.verifiableCredential.getSubject().getProperty(this.subjectKey)}toDisplayableValue(e){return null}toSubject(e){return this.buildAvatar(e.mimeType,"elastoshive",e.hiveDownloadScriptUrl)}buildAvatar(e,t,n){return{avatar:{"content-type":e,type:t,data:n}}}constructor(e){super(i.E.Undefined),this.subjectKey=e}}("avatar")}),new i.h("email",new r.d("https://ns.elastos.org/credentials/profile/email/v1#EmailCredential"),{multipleInstancesAllowed:!0,converter:new CredentialValueConverterString("email")}),new i.h("birthDate",new r.d("https://ns.elastos.org/credentials/profile/birthDate/v1#BirthDateCredential"),{converter:new class extends CredentialValueConverter{toEditableValue(e){let t=e.verifiableCredential.getSubject().getProperty(this.subjectKey);return new Date(t)}toDisplayableValue(e){return(0,l.r2)(e.verifiableCredential.getSubject().getProperty(this.subjectKey))}toSubject(e){return{[this.subjectKey]:e.toISOString()}}constructor(e){super(i.E.Date),this.subjectKey=e}}("birthDate")}),new i.h("nationality",new r.d("did://elastos/iUq76mi2inkZfqqbHkovbcDkzEkAh2dKrb/ISONationalityCredential#ISONationalityCredential"),{multipleInstancesAllowed:!0,converter:new class extends CredentialValueConverter{toEditableValue(e){return e.verifiableCredential.getSubject().getProperty(this.subjectKey)}toDisplayableValue(e){return e.verifiableCredential.getSubject().getProperty(this.subjectKey).label}toSubject(e){return{[this.subjectKey]:e}}constructor(e){super(i.E.Country),this.subjectKey=e}}("nationality")}),new i.h("gender",new r.d("https://ns.elastos.org/credentials/profile/gender/v1#GenderCredential"),{converter:new class extends CredentialValueConverter{toEditableValue(e){return(0,l.aD)(e.verifiableCredential.getSubject().getProperty(this.subjectKey))}toDisplayableValue(e){return(0,l.aD)(e.verifiableCredential.getSubject().getProperty(this.subjectKey))}toSubject(e){return{[this.subjectKey]:(0,l.OX)(e)}}constructor(e){super(i.E.Gender),this.subjectKey=e}}("gender")}),new i.h("telephone",new r.d("https://ns.elastos.org/credentials/profile/telephone/v1#TelephoneCredential"),{multipleInstancesAllowed:!0,converter:new CredentialValueConverterString("telephone")}),new i.h("nickname",new r.d("https://ns.elastos.org/credentials/profile/nickname/v1#NicknameCredential"),{converter:new CredentialValueConverterString("nickname")}),new i.h("birthPlace",new r.d("https://ns.elastos.org/credentials/profile/birthPlace/v1#BirthPlaceCredential"),{converter:new CredentialValueConverterString("birthPlace")}),new i.h("occupation",new r.d("https://ns.elastos.org/credentials/profile/occupation/v1#OccupationCredential"),{converter:new CredentialValueConverterString("occupation")}),new i.h("education",new r.d("https://ns.elastos.org/credentials/profile/education/v1#EducationCredential"),{converter:new CredentialValueConverterString("education")}),new i.h("interests",new r.d("https://ns.elastos.org/credentials/profile/interests/v1#InterestsCredential"),{converter:new CredentialValueConverterString("interests")}),new i.h("description",new r.d("https://ns.elastos.org/credentials/profile/description/v1#DescriptionCredential"),{converter:new CredentialValueConverterString("description")}),new i.h("url",new r.d("https://ns.elastos.org/credentials/profile/url/v1#URLCredential"),{multipleInstancesAllowed:!0,converter:new CredentialValueConverterString("url")}),new i.h("discord",new r.d("https://ns.elastos.org/credentials/social/discord/v1#DiscordCredential"),{converter:new CredentialValueConverterString("discord")}),new i.h("linkedin",new r.d("https://ns.elastos.org/credentials/social/linkedin/v1#LinkedinCredential"),{converter:new CredentialValueConverterString("linkedin")}),new i.h("facebook",new r.d("https://ns.elastos.org/credentials/social/facebook/v1#FacebookCredential"),{converter:new CredentialValueConverterString("facebook")}),new i.h("instagram",new r.d("https://ns.elastos.org/credentials/social/instagram/v1#InstagramCredential"),{converter:new CredentialValueConverterString("instagram")}),new i.h("twitter",new r.d("https://ns.elastos.org/credentials/social/twitter/v1#TwitterCredential"),{converter:new CredentialValueConverterString("twitter")}),new i.h("snapchat",new r.d("https://ns.elastos.org/credentials/social/snapchat/v1#SnapchatCredential"),{converter:new CredentialValueConverterString("snapchat")}),new i.h("telegram",new r.d("https://ns.elastos.org/credentials/social/telegram/v1#TelegramCredential"),{converter:new CredentialValueConverterString("telegram")}),new i.h("wechat",new r.d("https://ns.elastos.org/credentials/social/wechat/v1#WechatCredential"),{converter:new CredentialValueConverterString("wechat")}),new i.h("weibo",new r.d("https://ns.elastos.org/credentials/social/weibo/v1#WeiboCredential"),{converter:new CredentialValueConverterString("weibo")}),new i.h("twitch",new r.d("https://ns.elastos.org/credentials/social/twitch/v1#TwitchCredential"),{converter:new CredentialValueConverterString("twitch")}),new i.h("elaAddress",new r.d("https://ns.elastos.org/credentials/elaAddress/v1#ElaAddressCredential"),{multipleInstancesAllowed:!0,converter:new CredentialValueConverterString("elaAddress")}),new i.h("wallet",new r.d("https://ns.elastos.org/credentials/wallet/v1#WalletCredential"),{isSensitive:!0,multipleInstancesAllowed:!0,converter:new CredentialValueConverterString("wallet")})];function getAvailableProfileEntries(){return s}function findProfileInfoByTypes(e){return s.find(t=>{var n;return null===(n=t.type)||void 0===n?void 0:n.containedIn(e)})}function findProfileInfoByKey(e){return s.find(t=>t.key===e)}},59545:function(e,t,n){"use strict";n.d(t,{E:function(){return i},h:function(){return ProfileCredentialInfo}});var r,i,l=n(40218),s=n.n(l);(r=i||(i={}))[r.SingleLineString=0]="SingleLineString",r[r.MultiLineText=1]="MultiLineText",r[r.Date=2]="Date",r[r.Country=3]="Country",r[r.Gender=4]="Gender",r[r.Undefined=5]="Undefined";let a={defaultSubject:"",isSensitive:!1,multipleInstancesAllowed:!1,converter:null};let ProfileCredentialInfo=class ProfileCredentialInfo{getConverter(){return this.options.converter}typesForCreation(){return[this.type.getLongType()]}constructor(e,t,n={converter:null}){this.key=e,this.type=t,this.options=n,n=s()({},a,n)}}},57958:function(e,t,n){"use strict";n.d(t,{Bx:function(){return l},J9:function(){return awaitActiveIdentity}});var r=n(50676),i=n(70163);let l=new r.X(null);function awaitActiveIdentity(){return new Promise(e=>{l.pipe((0,i.h)(e=>!!e)).subscribe(t=>{e(t)})})}},36079:function(e,t,n){"use strict";n.d(t,{X:function(){return MydentityConnectivityLogger},k:function(){return s}});var r=n(62067),i=n.n(r);let l={default:"#008730",hive:"#5226af",did:"#06c4ce",identity:"#40C770","custodial-provider":"#40C770",connectivity:"#444444",security:"#bc3bef"};function getBackgroundColor(e){return l[e]||l.default}let s=new class{init(e){this.originalConsole=e,this.originalDebugLog=this.originalConsole.log,this.originalDebugWarn=this.originalConsole.warn,this.originalDebugErr=this.originalConsole.error}log(e){for(var t,n=arguments.length,r=Array(n>1?n-1:0),l=1;l<n;l++)r[l-1]=arguments[l];let s=getBackgroundColor(e);null===(t=this.originalDebugLog)||void 0===t||t.apply(this.originalConsole,["%c"+i()(new Date().getTime()).format("HH:mm:ss.SSS")+" "+e.toUpperCase()+"*","background: ".concat(s,"; color: #FFF; font-weight:bold; padding:5px;"),...r])}warn(e){for(var t,n=arguments.length,r=Array(n>1?n-1:0),l=1;l<n;l++)r[l-1]=arguments[l];let s=getBackgroundColor(e);null===(t=this.originalDebugWarn)||void 0===t||t.apply(this.originalConsole,["%c"+i()(new Date().getTime()).format("HH:mm:ss.SSS")+" "+e.toUpperCase()+"*","background: ".concat(s,"; color: #FFF; font-weight:bold; padding:5px;"),...r])}error(e){for(var t,n=arguments.length,r=Array(n>1?n-1:0),l=1;l<n;l++)r[l-1]=arguments[l];let s=getBackgroundColor(e);null===(t=this.originalDebugErr)||void 0===t||t.apply(this.originalConsole,["%c"+i()(new Date().getTime()).format("HH:mm:ss.SSS")+" "+e.toUpperCase()+"*","background: ".concat(s,"; color: #FFF; font-weight:bold; padding:5px;"),...r])}test(e){for(var t,n=arguments.length,r=Array(n>1?n-1:0),l=1;l<n;l++)r[l-1]=arguments[l];let s=getBackgroundColor(e);null===(t=this.originalDebugLog)||void 0===t||t.apply(this.originalConsole,["%c"+i()(new Date().getTime()).format("HH:mm:ss.SSS")+" "+e.toUpperCase()+"* TEST","background: ".concat(s,"; color: #FFF; font-weight:bold; padding:5px;"),...r])}constructor(){this.originalConsole=null}};let MydentityConnectivityLogger=class MydentityConnectivityLogger{log(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];s.log.apply(s,["connectivity",...t])}warn(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];s.warn.apply(s,["connectivity",...t])}error(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];s.error.apply(s,["connectivity",...t])}}},53386:function(e,t,n){"use strict";function capitalizeFirstLetter(e){return e.charAt(0).toUpperCase()+e.slice(1)}function shortenString(e,t){return(null==e?void 0:e.length)>t?e.substring(0,t/2-1)+"..."+e.substring(e.length-(t/2-1),e.length):e}function initialsString(e){return null==e?null:capitalizeFirstLetter(e.split(" ").map(e=>e[0]).join(""))}function convertUtcToLocaleDateTime(e){if(!/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z)$/.test(e))return e;let t=new Date(e),n=navigator.language,r=new Intl.DateTimeFormat(n),i=r.format(t);return i}function converGenderFullName(e){return null==e?null:"M"===e?"male":"F"===e?"female":e}function checkIfStringStartsWith(e,t){return t.some(t=>e.startsWith(t))}function checkIfStringEqualsWith(e,t){return t.some(t=>e==t)}n.d(t,{OX:function(){return initialsString},Sy:function(){return shortenString},aD:function(){return converGenderFullName},fm:function(){return capitalizeFirstLetter},pI:function(){return checkIfStringEqualsWith},pd:function(){return checkIfStringStartsWith},r2:function(){return convertUtcToLocaleDateTime}})}},function(e){e.O(0,[6990,395,8321,3824,1228,5295,1510,6953,1880,894,4558,4448,7998,1407,1869,1509,6563,3152,7870,251,4339,2481,2798,921,7291,5455,2971,7864,1744],function(){return e(e.s=2004)}),_N_E=e.O()}]);