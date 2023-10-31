(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7046],{47630:function(e,t,r){"use strict";function isHostComponent(e){return"string"==typeof e}r.d(t,{X:function(){return isHostComponent}})},46446:function(e,t,r){"use strict";var o=r(26314);t.Z=void 0;var n=o(r(80984)),i=r(57437),a=(0,n.default)((0,i.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}),"Delete");t.Z=a},22079:function(e,t,r){"use strict";var o=r(20791),n=r(13428),i=r(2265),a=r(57042),l=r(95600),s=r(33449),u=r(28702),p=r(26931),c=r(72261),d=r(29872),f=r(87927),h=r(35843),g=r(45525),m=r(57245),v=r(39350),T=r(41101),C=r(57437);let y=["aria-describedby","aria-labelledby","BackdropComponent","BackdropProps","children","className","disableEscapeKeyDown","fullScreen","fullWidth","maxWidth","onBackdropClick","onClose","open","PaperComponent","PaperProps","scroll","TransitionComponent","transitionDuration","TransitionProps"],b=(0,h.ZP)(v.Z,{name:"MuiDialog",slot:"Backdrop",overrides:(e,t)=>t.backdrop})({zIndex:-1}),useUtilityClasses=e=>{let{classes:t,scroll:r,maxWidth:o,fullWidth:n,fullScreen:i}=e,a={root:["root"],container:["container",`scroll${(0,u.Z)(r)}`],paper:["paper",`paperScroll${(0,u.Z)(r)}`,`paperWidth${(0,u.Z)(String(o))}`,n&&"paperFullWidth",i&&"paperFullScreen"]};return(0,l.Z)(a,g.D,t)},R=(0,h.ZP)(p.Z,{name:"MuiDialog",slot:"Root",overridesResolver:(e,t)=>t.root})({"@media print":{position:"absolute !important"}}),Z=(0,h.ZP)("div",{name:"MuiDialog",slot:"Container",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.container,t[`scroll${(0,u.Z)(r.scroll)}`]]}})(({ownerState:e})=>(0,n.Z)({height:"100%","@media print":{height:"auto"},outline:0},"paper"===e.scroll&&{display:"flex",justifyContent:"center",alignItems:"center"},"body"===e.scroll&&{overflowY:"auto",overflowX:"hidden",textAlign:"center","&:after":{content:'""',display:"inline-block",verticalAlign:"middle",height:"100%",width:"0"}})),x=(0,h.ZP)(d.Z,{name:"MuiDialog",slot:"Paper",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.paper,t[`scrollPaper${(0,u.Z)(r.scroll)}`],t[`paperWidth${(0,u.Z)(String(r.maxWidth))}`],r.fullWidth&&t.paperFullWidth,r.fullScreen&&t.paperFullScreen]}})(({theme:e,ownerState:t})=>(0,n.Z)({margin:32,position:"relative",overflowY:"auto","@media print":{overflowY:"visible",boxShadow:"none"}},"paper"===t.scroll&&{display:"flex",flexDirection:"column",maxHeight:"calc(100% - 64px)"},"body"===t.scroll&&{display:"inline-block",verticalAlign:"middle",textAlign:"left"},!t.maxWidth&&{maxWidth:"calc(100% - 64px)"},"xs"===t.maxWidth&&{maxWidth:"px"===e.breakpoints.unit?Math.max(e.breakpoints.values.xs,444):`max(${e.breakpoints.values.xs}${e.breakpoints.unit}, 444px)`,[`&.${g.Z.paperScrollBody}`]:{[e.breakpoints.down(Math.max(e.breakpoints.values.xs,444)+64)]:{maxWidth:"calc(100% - 64px)"}}},t.maxWidth&&"xs"!==t.maxWidth&&{maxWidth:`${e.breakpoints.values[t.maxWidth]}${e.breakpoints.unit}`,[`&.${g.Z.paperScrollBody}`]:{[e.breakpoints.down(e.breakpoints.values[t.maxWidth]+64)]:{maxWidth:"calc(100% - 64px)"}}},t.fullWidth&&{width:"calc(100% - 64px)"},t.fullScreen&&{margin:0,width:"100%",maxWidth:"100%",height:"100%",maxHeight:"none",borderRadius:0,[`&.${g.Z.paperScrollBody}`]:{margin:0,maxWidth:"100%"}})),D=i.forwardRef(function(e,t){let r=(0,f.Z)({props:e,name:"MuiDialog"}),l=(0,T.Z)(),u={enter:l.transitions.duration.enteringScreen,exit:l.transitions.duration.leavingScreen},{"aria-describedby":p,"aria-labelledby":h,BackdropComponent:g,BackdropProps:v,children:D,className:B,disableEscapeKeyDown:w=!1,fullScreen:E=!1,fullWidth:P=!1,maxWidth:M="sm",onBackdropClick:L,onClose:k,open:A,PaperComponent:S=d.Z,PaperProps:N={},scroll:_="paper",TransitionComponent:O=c.Z,transitionDuration:I=u,TransitionProps:W}=r,Q=(0,o.Z)(r,y),U=(0,n.Z)({},r,{disableEscapeKeyDown:w,fullScreen:E,fullWidth:P,maxWidth:M,scroll:_}),j=useUtilityClasses(U),H=i.useRef(),$=(0,s.Z)(h),F=i.useMemo(()=>({titleId:$}),[$]);return(0,C.jsx)(R,(0,n.Z)({className:(0,a.Z)(j.root,B),closeAfterTransition:!0,components:{Backdrop:b},componentsProps:{backdrop:(0,n.Z)({transitionDuration:I,as:g},v)},disableEscapeKeyDown:w,onClose:k,open:A,ref:t,onClick:e=>{H.current&&(H.current=null,L&&L(e),k&&k(e,"backdropClick"))},ownerState:U},Q,{children:(0,C.jsx)(O,(0,n.Z)({appear:!0,in:A,timeout:I,role:"presentation"},W,{children:(0,C.jsx)(Z,{className:(0,a.Z)(j.container),onMouseDown:e=>{H.current=e.target===e.currentTarget},ownerState:U,children:(0,C.jsx)(x,(0,n.Z)({as:S,elevation:24,role:"dialog","aria-describedby":p,"aria-labelledby":$},N,{className:(0,a.Z)(j.paper,N.className),ownerState:U,children:(0,C.jsx)(m.Z.Provider,{value:F,children:D})}))})}))}))});t.Z=D},57245:function(e,t,r){"use strict";var o=r(2265);let n=o.createContext({});t.Z=n},45525:function(e,t,r){"use strict";r.d(t,{D:function(){return getDialogUtilityClass}});var o=r(26520),n=r(25702);function getDialogUtilityClass(e){return(0,n.Z)("MuiDialog",e)}let i=(0,o.Z)("MuiDialog",["root","scrollPaper","scrollBody","container","paper","paperScrollPaper","paperScrollBody","paperWidthFalse","paperWidthXs","paperWidthSm","paperWidthMd","paperWidthLg","paperWidthXl","paperFullWidth","paperFullScreen"]);t.Z=i},42834:function(e,t,r){"use strict";r.d(t,{Z:function(){return m}});var o=r(20791),n=r(13428),i=r(2265),a=r(57042),l=r(95600),s=r(35843),u=r(87927),p=r(26520),c=r(25702);function getDialogActionsUtilityClass(e){return(0,c.Z)("MuiDialogActions",e)}(0,p.Z)("MuiDialogActions",["root","spacing"]);var d=r(57437);let f=["className","disableSpacing"],useUtilityClasses=e=>{let{classes:t,disableSpacing:r}=e;return(0,l.Z)({root:["root",!r&&"spacing"]},getDialogActionsUtilityClass,t)},h=(0,s.ZP)("div",{name:"MuiDialogActions",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,!r.disableSpacing&&t.spacing]}})(({ownerState:e})=>(0,n.Z)({display:"flex",alignItems:"center",padding:8,justifyContent:"flex-end",flex:"0 0 auto"},!e.disableSpacing&&{"& > :not(style) ~ :not(style)":{marginLeft:8}})),g=i.forwardRef(function(e,t){let r=(0,u.Z)({props:e,name:"MuiDialogActions"}),{className:i,disableSpacing:l=!1}=r,s=(0,o.Z)(r,f),p=(0,n.Z)({},r,{disableSpacing:l}),c=useUtilityClasses(p);return(0,d.jsx)(h,(0,n.Z)({className:(0,a.Z)(c.root,i),ownerState:p,ref:t},s))});var m=g},26337:function(e,t,r){"use strict";r.d(t,{Z:function(){return v}});var o=r(20791),n=r(13428),i=r(2265),a=r(57042),l=r(95600),s=r(35843),u=r(87927),p=r(26520),c=r(25702);function getDialogContentUtilityClass(e){return(0,c.Z)("MuiDialogContent",e)}(0,p.Z)("MuiDialogContent",["root","dividers"]);var d=r(92273),f=r(57437);let h=["className","dividers"],useUtilityClasses=e=>{let{classes:t,dividers:r}=e;return(0,l.Z)({root:["root",r&&"dividers"]},getDialogContentUtilityClass,t)},g=(0,s.ZP)("div",{name:"MuiDialogContent",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,r.dividers&&t.dividers]}})(({theme:e,ownerState:t})=>(0,n.Z)({flex:"1 1 auto",WebkitOverflowScrolling:"touch",overflowY:"auto",padding:"20px 24px"},t.dividers?{padding:"16px 24px",borderTop:`1px solid ${(e.vars||e).palette.divider}`,borderBottom:`1px solid ${(e.vars||e).palette.divider}`}:{[`.${d.Z.root} + &`]:{paddingTop:0}})),m=i.forwardRef(function(e,t){let r=(0,u.Z)({props:e,name:"MuiDialogContent"}),{className:i,dividers:l=!1}=r,s=(0,o.Z)(r,h),p=(0,n.Z)({},r,{dividers:l}),c=useUtilityClasses(p);return(0,f.jsx)(g,(0,n.Z)({className:(0,a.Z)(c.root,i),ownerState:p,ref:t},s))});var v=m},64173:function(e,t,r){"use strict";r.d(t,{Z:function(){return v}});var o=r(20791),n=r(13428),i=r(2265),a=r(57042),l=r(95600),s=r(35843),u=r(87927),p=r(43226),c=r(26520),d=r(25702);function getDialogContentTextUtilityClass(e){return(0,d.Z)("MuiDialogContentText",e)}(0,c.Z)("MuiDialogContentText",["root"]);var f=r(57437);let h=["children","className"],useUtilityClasses=e=>{let{classes:t}=e,r=(0,l.Z)({root:["root"]},getDialogContentTextUtilityClass,t);return(0,n.Z)({},t,r)},g=(0,s.ZP)(p.Z,{shouldForwardProp:e=>(0,s.FO)(e)||"classes"===e,name:"MuiDialogContentText",slot:"Root",overridesResolver:(e,t)=>t.root})({}),m=i.forwardRef(function(e,t){let r=(0,u.Z)({props:e,name:"MuiDialogContentText"}),{className:i}=r,l=(0,o.Z)(r,h),s=useUtilityClasses(l);return(0,f.jsx)(g,(0,n.Z)({component:"p",variant:"body1",color:"text.secondary",ref:t,ownerState:l,className:(0,a.Z)(s.root,i)},r,{classes:s}))});var v=m},91797:function(e,t,r){"use strict";var o=r(13428),n=r(20791),i=r(2265),a=r(57042),l=r(95600),s=r(43226),u=r(35843),p=r(87927),c=r(92273),d=r(57245),f=r(57437);let h=["className","id"],useUtilityClasses=e=>{let{classes:t}=e;return(0,l.Z)({root:["root"]},c.a,t)},g=(0,u.ZP)(s.Z,{name:"MuiDialogTitle",slot:"Root",overridesResolver:(e,t)=>t.root})({padding:"16px 24px",flex:"0 0 auto"}),m=i.forwardRef(function(e,t){let r=(0,p.Z)({props:e,name:"MuiDialogTitle"}),{className:l,id:s}=r,u=(0,n.Z)(r,h),c=useUtilityClasses(r),{titleId:m=s}=i.useContext(d.Z);return(0,f.jsx)(g,(0,o.Z)({component:"h2",className:(0,a.Z)(c.root,l),ownerState:r,ref:t,variant:"h6",id:null!=s?s:m},u))});t.Z=m},92273:function(e,t,r){"use strict";r.d(t,{a:function(){return getDialogTitleUtilityClass}});var o=r(26520),n=r(25702);function getDialogTitleUtilityClass(e){return(0,n.Z)("MuiDialogTitle",e)}let i=(0,o.Z)("MuiDialogTitle",["root"]);t.Z=i},78276:function(e,t,r){"use strict";r.d(t,{Z:function(){return A}});var o=r(20791),n=r(13428),i=r(2265),a=r(57042),l=r(95600),s=r(20202),u=r(89975),p=r(35843),c=r(41101),d=r(87927),f=r(28702),h=r(56176),g=r(43989),m=r(96),v=r(37663),T=r(62916),C=r(53308),y=r(73292),b=r(26520),R=r(25702);function getTooltipUtilityClass(e){return(0,R.Z)("MuiTooltip",e)}let Z=(0,b.Z)("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]);var x=r(57437);let D=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"],useUtilityClasses=e=>{let{classes:t,disableInteractive:r,arrow:o,touch:n,placement:i}=e,a={popper:["popper",!r&&"popperInteractive",o&&"popperArrow"],tooltip:["tooltip",o&&"tooltipArrow",n&&"touch",`tooltipPlacement${(0,f.Z)(i.split("-")[0])}`],arrow:["arrow"]};return(0,l.Z)(a,getTooltipUtilityClass,t)},B=(0,p.ZP)(g.Z,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.popper,!r.disableInteractive&&t.popperInteractive,r.arrow&&t.popperArrow,!r.open&&t.popperClose]}})(({theme:e,ownerState:t,open:r})=>(0,n.Z)({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!r&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${Z.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${Z.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${Z.arrow}`]:(0,n.Z)({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${Z.arrow}`]:(0,n.Z)({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),w=(0,p.ZP)("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.tooltip,r.touch&&t.touch,r.arrow&&t.tooltipArrow,t[`tooltipPlacement${(0,f.Z)(r.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>(0,n.Z)({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:(0,u.Fq)(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${Math.round(1e5*(16/14))/1e5}em`,fontWeight:e.typography.fontWeightRegular},{[`.${Z.popper}[data-popper-placement*="left"] &`]:(0,n.Z)({transformOrigin:"right center"},t.isRtl?(0,n.Z)({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):(0,n.Z)({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${Z.popper}[data-popper-placement*="right"] &`]:(0,n.Z)({transformOrigin:"left center"},t.isRtl?(0,n.Z)({marginRight:"14px"},t.touch&&{marginRight:"24px"}):(0,n.Z)({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${Z.popper}[data-popper-placement*="top"] &`]:(0,n.Z)({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${Z.popper}[data-popper-placement*="bottom"] &`]:(0,n.Z)({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),E=(0,p.ZP)("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:(0,u.Fq)(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}})),P=!1,M=null,L={x:0,y:0};function composeEventHandler(e,t){return r=>{t&&t(r),e(r)}}let k=i.forwardRef(function(e,t){var r,l,u,p,f,b,R,Z,k,A,S,N,_,O,I,W,Q,U,j;let H=(0,d.Z)({props:e,name:"MuiTooltip"}),{arrow:$=!1,children:F,components:z={},componentsProps:q={},describeChild:K=!1,disableFocusListener:X=!1,disableHoverListener:G=!1,disableInteractive:Y=!1,disableTouchListener:J=!1,enterDelay:V=100,enterNextDelay:ee=0,enterTouchDelay:et=700,followCursor:er=!1,id:eo,leaveDelay:en=0,leaveTouchDelay:ei=1500,onClose:ea,onOpen:el,open:es,placement:eu="bottom",PopperComponent:ep,PopperProps:ec={},slotProps:ed={},slots:ef={},title:eh,TransitionComponent:eg=h.Z,TransitionProps:em}=H,ev=(0,o.Z)(H,D),eT=i.isValidElement(F)?F:(0,x.jsx)("span",{children:F}),eC=(0,c.Z)(),ey="rtl"===eC.direction,[eb,eR]=i.useState(),[eZ,ex]=i.useState(null),eD=i.useRef(!1),eB=Y||er,ew=i.useRef(),eE=i.useRef(),eP=i.useRef(),eM=i.useRef(),[eL,ek]=(0,y.Z)({controlled:es,default:!1,name:"Tooltip",state:"open"}),eA=eL,eS=(0,T.Z)(eo),eN=i.useRef(),e_=i.useCallback(()=>{void 0!==eN.current&&(document.body.style.WebkitUserSelect=eN.current,eN.current=void 0),clearTimeout(eM.current)},[]);i.useEffect(()=>()=>{clearTimeout(ew.current),clearTimeout(eE.current),clearTimeout(eP.current),e_()},[e_]);let handleOpen=e=>{clearTimeout(M),P=!0,ek(!0),el&&!eA&&el(e)},eO=(0,m.Z)(e=>{clearTimeout(M),M=setTimeout(()=>{P=!1},800+en),ek(!1),ea&&eA&&ea(e),clearTimeout(ew.current),ew.current=setTimeout(()=>{eD.current=!1},eC.transitions.duration.shortest)}),handleEnter=e=>{eD.current&&"touchstart"!==e.type||(eb&&eb.removeAttribute("title"),clearTimeout(eE.current),clearTimeout(eP.current),V||P&&ee?eE.current=setTimeout(()=>{handleOpen(e)},P?ee:V):handleOpen(e))},handleLeave=e=>{clearTimeout(eE.current),clearTimeout(eP.current),eP.current=setTimeout(()=>{eO(e)},en)},{isFocusVisibleRef:eI,onBlur:eW,onFocus:eQ,ref:eU}=(0,C.Z)(),[,ej]=i.useState(!1),handleBlur=e=>{eW(e),!1===eI.current&&(ej(!1),handleLeave(e))},handleFocus=e=>{eb||eR(e.currentTarget),eQ(e),!0===eI.current&&(ej(!0),handleEnter(e))},detectTouchStart=e=>{eD.current=!0;let t=eT.props;t.onTouchStart&&t.onTouchStart(e)};i.useEffect(()=>{if(eA)return document.addEventListener("keydown",handleKeyDown),()=>{document.removeEventListener("keydown",handleKeyDown)};function handleKeyDown(e){("Escape"===e.key||"Esc"===e.key)&&eO(e)}},[eO,eA]);let eH=(0,v.Z)(eT.ref,eU,eR,t);eh||0===eh||(eA=!1);let e$=i.useRef(),eF={},ez="string"==typeof eh;K?(eF.title=eA||!ez||G?null:eh,eF["aria-describedby"]=eA?eS:null):(eF["aria-label"]=ez?eh:null,eF["aria-labelledby"]=eA&&!ez?eS:null);let eq=(0,n.Z)({},eF,ev,eT.props,{className:(0,a.Z)(ev.className,eT.props.className),onTouchStart:detectTouchStart,ref:eH},er?{onMouseMove:e=>{let t=eT.props;t.onMouseMove&&t.onMouseMove(e),L={x:e.clientX,y:e.clientY},e$.current&&e$.current.update()}}:{}),eK={};J||(eq.onTouchStart=e=>{detectTouchStart(e),clearTimeout(eP.current),clearTimeout(ew.current),e_(),eN.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",eM.current=setTimeout(()=>{document.body.style.WebkitUserSelect=eN.current,handleEnter(e)},et)},eq.onTouchEnd=e=>{eT.props.onTouchEnd&&eT.props.onTouchEnd(e),e_(),clearTimeout(eP.current),eP.current=setTimeout(()=>{eO(e)},ei)}),G||(eq.onMouseOver=composeEventHandler(handleEnter,eq.onMouseOver),eq.onMouseLeave=composeEventHandler(handleLeave,eq.onMouseLeave),eB||(eK.onMouseOver=handleEnter,eK.onMouseLeave=handleLeave)),X||(eq.onFocus=composeEventHandler(handleFocus,eq.onFocus),eq.onBlur=composeEventHandler(handleBlur,eq.onBlur),eB||(eK.onFocus=handleFocus,eK.onBlur=handleBlur));let eX=i.useMemo(()=>{var e;let t=[{name:"arrow",enabled:!!eZ,options:{element:eZ,padding:4}}];return null!=(e=ec.popperOptions)&&e.modifiers&&(t=t.concat(ec.popperOptions.modifiers)),(0,n.Z)({},ec.popperOptions,{modifiers:t})},[eZ,ec]),eG=(0,n.Z)({},H,{isRtl:ey,arrow:$,disableInteractive:eB,placement:eu,PopperComponentProp:ep,touch:eD.current}),eY=useUtilityClasses(eG),eJ=null!=(r=null!=(l=ef.popper)?l:z.Popper)?r:B,eV=null!=(u=null!=(p=null!=(f=ef.transition)?f:z.Transition)?p:eg)?u:h.Z,e1=null!=(b=null!=(R=ef.tooltip)?R:z.Tooltip)?b:w,e0=null!=(Z=null!=(k=ef.arrow)?k:z.Arrow)?Z:E,e4=(0,s.$)(eJ,(0,n.Z)({},ec,null!=(A=ed.popper)?A:q.popper,{className:(0,a.Z)(eY.popper,null==ec?void 0:ec.className,null==(S=null!=(N=ed.popper)?N:q.popper)?void 0:S.className)}),eG),e2=(0,s.$)(eV,(0,n.Z)({},em,null!=(_=ed.transition)?_:q.transition),eG),e5=(0,s.$)(e1,(0,n.Z)({},null!=(O=ed.tooltip)?O:q.tooltip,{className:(0,a.Z)(eY.tooltip,null==(I=null!=(W=ed.tooltip)?W:q.tooltip)?void 0:I.className)}),eG),e6=(0,s.$)(e0,(0,n.Z)({},null!=(Q=ed.arrow)?Q:q.arrow,{className:(0,a.Z)(eY.arrow,null==(U=null!=(j=ed.arrow)?j:q.arrow)?void 0:U.className)}),eG);return(0,x.jsxs)(i.Fragment,{children:[i.cloneElement(eT,eq),(0,x.jsx)(eJ,(0,n.Z)({as:null!=ep?ep:g.Z,placement:eu,anchorEl:er?{getBoundingClientRect:()=>({top:L.y,left:L.x,right:L.x,bottom:L.y,width:0,height:0})}:eb,popperRef:e$,open:!!eb&&eA,id:eS,transition:!0},eK,e4,{popperOptions:eX,children:({TransitionProps:e})=>(0,x.jsx)(eV,(0,n.Z)({timeout:eC.transitions.duration.shorter},e,e2,{children:(0,x.jsxs)(e1,(0,n.Z)({},e5,{children:[eh,$?(0,x.jsx)(e0,(0,n.Z)({},e6,{ref:ex})):null]}))}))}))]})});var A=k},72142:function(e,t,r){var o=r(99062);function QR8bitByte(e){this.mode=o.MODE_8BIT_BYTE,this.data=e}QR8bitByte.prototype={getLength:function(e){return this.data.length},write:function(e){for(var t=0;t<this.data.length;t++)e.put(this.data.charCodeAt(t),8)}},e.exports=QR8bitByte},60728:function(e){function QRBitBuffer(){this.buffer=[],this.length=0}QRBitBuffer.prototype={get:function(e){var t=Math.floor(e/8);return(this.buffer[t]>>>7-e%8&1)==1},put:function(e,t){for(var r=0;r<t;r++)this.putBit((e>>>t-r-1&1)==1)},getLengthInBits:function(){return this.length},putBit:function(e){var t=Math.floor(this.length/8);this.buffer.length<=t&&this.buffer.push(0),e&&(this.buffer[t]|=128>>>this.length%8),this.length++}},e.exports=QRBitBuffer},7909:function(e){e.exports={L:1,M:0,Q:3,H:2}},24844:function(e,t,r){var o=r(40876);function QRPolynomial(e,t){if(void 0==e.length)throw Error(e.length+"/"+t);for(var r=0;r<e.length&&0==e[r];)r++;this.num=Array(e.length-r+t);for(var o=0;o<e.length-r;o++)this.num[o]=e[o+r]}QRPolynomial.prototype={get:function(e){return this.num[e]},getLength:function(){return this.num.length},multiply:function(e){for(var t=Array(this.getLength()+e.getLength()-1),r=0;r<this.getLength();r++)for(var n=0;n<e.getLength();n++)t[r+n]^=o.gexp(o.glog(this.get(r))+o.glog(e.get(n)));return new QRPolynomial(t,0)},mod:function(e){if(this.getLength()-e.getLength()<0)return this;for(var t=o.glog(this.get(0))-o.glog(e.get(0)),r=Array(this.getLength()),n=0;n<this.getLength();n++)r[n]=this.get(n);for(var n=0;n<e.getLength();n++)r[n]^=o.gexp(o.glog(e.get(n))+t);return new QRPolynomial(r,0).mod(e)}},e.exports=QRPolynomial},19453:function(e,t,r){var o=r(72142),n=r(28111),i=r(60728),a=r(26846),l=r(24844);function QRCode(e,t){this.typeNumber=e,this.errorCorrectLevel=t,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}var s=QRCode.prototype;s.addData=function(e){var t=new o(e);this.dataList.push(t),this.dataCache=null},s.isDark=function(e,t){if(e<0||this.moduleCount<=e||t<0||this.moduleCount<=t)throw Error(e+","+t);return this.modules[e][t]},s.getModuleCount=function(){return this.moduleCount},s.make=function(){if(this.typeNumber<1){var e=1;for(e=1;e<40;e++){for(var t=n.getRSBlocks(e,this.errorCorrectLevel),r=new i,o=0,l=0;l<t.length;l++)o+=t[l].dataCount;for(var l=0;l<this.dataList.length;l++){var s=this.dataList[l];r.put(s.mode,4),r.put(s.getLength(),a.getLengthInBits(s.mode,e)),s.write(r)}if(r.getLengthInBits()<=8*o)break}this.typeNumber=e}this.makeImpl(!1,this.getBestMaskPattern())},s.makeImpl=function(e,t){this.moduleCount=4*this.typeNumber+17,this.modules=Array(this.moduleCount);for(var r=0;r<this.moduleCount;r++){this.modules[r]=Array(this.moduleCount);for(var o=0;o<this.moduleCount;o++)this.modules[r][o]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(e,t),this.typeNumber>=7&&this.setupTypeNumber(e),null==this.dataCache&&(this.dataCache=QRCode.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,t)},s.setupPositionProbePattern=function(e,t){for(var r=-1;r<=7;r++)if(!(e+r<=-1)&&!(this.moduleCount<=e+r))for(var o=-1;o<=7;o++)t+o<=-1||this.moduleCount<=t+o||(0<=r&&r<=6&&(0==o||6==o)||0<=o&&o<=6&&(0==r||6==r)||2<=r&&r<=4&&2<=o&&o<=4?this.modules[e+r][t+o]=!0:this.modules[e+r][t+o]=!1)},s.getBestMaskPattern=function(){for(var e=0,t=0,r=0;r<8;r++){this.makeImpl(!0,r);var o=a.getLostPoint(this);(0==r||e>o)&&(e=o,t=r)}return t},s.createMovieClip=function(e,t,r){var o=e.createEmptyMovieClip(t,r);this.make();for(var n=0;n<this.modules.length;n++)for(var i=1*n,a=0;a<this.modules[n].length;a++){var l=1*a;this.modules[n][a]&&(o.beginFill(0,100),o.moveTo(l,i),o.lineTo(l+1,i),o.lineTo(l+1,i+1),o.lineTo(l,i+1),o.endFill())}return o},s.setupTimingPattern=function(){for(var e=8;e<this.moduleCount-8;e++)null==this.modules[e][6]&&(this.modules[e][6]=e%2==0);for(var t=8;t<this.moduleCount-8;t++)null==this.modules[6][t]&&(this.modules[6][t]=t%2==0)},s.setupPositionAdjustPattern=function(){for(var e=a.getPatternPosition(this.typeNumber),t=0;t<e.length;t++)for(var r=0;r<e.length;r++){var o=e[t],n=e[r];if(null==this.modules[o][n])for(var i=-2;i<=2;i++)for(var l=-2;l<=2;l++)-2==i||2==i||-2==l||2==l||0==i&&0==l?this.modules[o+i][n+l]=!0:this.modules[o+i][n+l]=!1}},s.setupTypeNumber=function(e){for(var t=a.getBCHTypeNumber(this.typeNumber),r=0;r<18;r++){var o=!e&&(t>>r&1)==1;this.modules[Math.floor(r/3)][r%3+this.moduleCount-8-3]=o}for(var r=0;r<18;r++){var o=!e&&(t>>r&1)==1;this.modules[r%3+this.moduleCount-8-3][Math.floor(r/3)]=o}},s.setupTypeInfo=function(e,t){for(var r=this.errorCorrectLevel<<3|t,o=a.getBCHTypeInfo(r),n=0;n<15;n++){var i=!e&&(o>>n&1)==1;n<6?this.modules[n][8]=i:n<8?this.modules[n+1][8]=i:this.modules[this.moduleCount-15+n][8]=i}for(var n=0;n<15;n++){var i=!e&&(o>>n&1)==1;n<8?this.modules[8][this.moduleCount-n-1]=i:n<9?this.modules[8][15-n-1+1]=i:this.modules[8][15-n-1]=i}this.modules[this.moduleCount-8][8]=!e},s.mapData=function(e,t){for(var r=-1,o=this.moduleCount-1,n=7,i=0,l=this.moduleCount-1;l>0;l-=2)for(6==l&&l--;;){for(var s=0;s<2;s++)if(null==this.modules[o][l-s]){var u=!1;i<e.length&&(u=(e[i]>>>n&1)==1),a.getMask(t,o,l-s)&&(u=!u),this.modules[o][l-s]=u,-1==--n&&(i++,n=7)}if((o+=r)<0||this.moduleCount<=o){o-=r,r=-r;break}}},QRCode.PAD0=236,QRCode.PAD1=17,QRCode.createData=function(e,t,r){for(var o=n.getRSBlocks(e,t),l=new i,s=0;s<r.length;s++){var u=r[s];l.put(u.mode,4),l.put(u.getLength(),a.getLengthInBits(u.mode,e)),u.write(l)}for(var p=0,s=0;s<o.length;s++)p+=o[s].dataCount;if(l.getLengthInBits()>8*p)throw Error("code length overflow. ("+l.getLengthInBits()+">"+8*p+")");for(l.getLengthInBits()+4<=8*p&&l.put(0,4);l.getLengthInBits()%8!=0;)l.putBit(!1);for(;!(l.getLengthInBits()>=8*p)&&(l.put(QRCode.PAD0,8),!(l.getLengthInBits()>=8*p));)l.put(QRCode.PAD1,8);return QRCode.createBytes(l,o)},QRCode.createBytes=function(e,t){for(var r=0,o=0,n=0,i=Array(t.length),s=Array(t.length),u=0;u<t.length;u++){var p=t[u].dataCount,c=t[u].totalCount-p;o=Math.max(o,p),n=Math.max(n,c),i[u]=Array(p);for(var d=0;d<i[u].length;d++)i[u][d]=255&e.buffer[d+r];r+=p;var f=a.getErrorCorrectPolynomial(c),h=new l(i[u],f.getLength()-1).mod(f);s[u]=Array(f.getLength()-1);for(var d=0;d<s[u].length;d++){var g=d+h.getLength()-s[u].length;s[u][d]=g>=0?h.get(g):0}}for(var m=0,d=0;d<t.length;d++)m+=t[d].totalCount;for(var v=Array(m),T=0,d=0;d<o;d++)for(var u=0;u<t.length;u++)d<i[u].length&&(v[T++]=i[u][d]);for(var d=0;d<n;d++)for(var u=0;u<t.length;u++)d<s[u].length&&(v[T++]=s[u][d]);return v},e.exports=QRCode},28111:function(e,t,r){var o=r(7909);function QRRSBlock(e,t){this.totalCount=e,this.dataCount=t}QRRSBlock.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],QRRSBlock.getRSBlocks=function(e,t){var r=QRRSBlock.getRsBlockTable(e,t);if(void 0==r)throw Error("bad rs block @ typeNumber:"+e+"/errorCorrectLevel:"+t);for(var o=r.length/3,n=[],i=0;i<o;i++)for(var a=r[3*i+0],l=r[3*i+1],s=r[3*i+2],u=0;u<a;u++)n.push(new QRRSBlock(l,s));return n},QRRSBlock.getRsBlockTable=function(e,t){switch(t){case o.L:return QRRSBlock.RS_BLOCK_TABLE[(e-1)*4+0];case o.M:return QRRSBlock.RS_BLOCK_TABLE[(e-1)*4+1];case o.Q:return QRRSBlock.RS_BLOCK_TABLE[(e-1)*4+2];case o.H:return QRRSBlock.RS_BLOCK_TABLE[(e-1)*4+3];default:return}},e.exports=QRRSBlock},40876:function(e){for(var t={glog:function(e){if(e<1)throw Error("glog("+e+")");return t.LOG_TABLE[e]},gexp:function(e){for(;e<0;)e+=255;for(;e>=256;)e-=255;return t.EXP_TABLE[e]},EXP_TABLE:Array(256),LOG_TABLE:Array(256)},r=0;r<8;r++)t.EXP_TABLE[r]=1<<r;for(var r=8;r<256;r++)t.EXP_TABLE[r]=t.EXP_TABLE[r-4]^t.EXP_TABLE[r-5]^t.EXP_TABLE[r-6]^t.EXP_TABLE[r-8];for(var r=0;r<255;r++)t.LOG_TABLE[t.EXP_TABLE[r]]=r;e.exports=t},99062:function(e){e.exports={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8}},26846:function(e,t,r){var o=r(99062),n=r(24844),i=r(40876),a={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},l={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(e){for(var t=e<<10;l.getBCHDigit(t)-l.getBCHDigit(l.G15)>=0;)t^=l.G15<<l.getBCHDigit(t)-l.getBCHDigit(l.G15);return(e<<10|t)^l.G15_MASK},getBCHTypeNumber:function(e){for(var t=e<<12;l.getBCHDigit(t)-l.getBCHDigit(l.G18)>=0;)t^=l.G18<<l.getBCHDigit(t)-l.getBCHDigit(l.G18);return e<<12|t},getBCHDigit:function(e){for(var t=0;0!=e;)t++,e>>>=1;return t},getPatternPosition:function(e){return l.PATTERN_POSITION_TABLE[e-1]},getMask:function(e,t,r){switch(e){case a.PATTERN000:return(t+r)%2==0;case a.PATTERN001:return t%2==0;case a.PATTERN010:return r%3==0;case a.PATTERN011:return(t+r)%3==0;case a.PATTERN100:return(Math.floor(t/2)+Math.floor(r/3))%2==0;case a.PATTERN101:return t*r%2+t*r%3==0;case a.PATTERN110:return(t*r%2+t*r%3)%2==0;case a.PATTERN111:return(t*r%3+(t+r)%2)%2==0;default:throw Error("bad maskPattern:"+e)}},getErrorCorrectPolynomial:function(e){for(var t=new n([1],0),r=0;r<e;r++)t=t.multiply(new n([1,i.gexp(r)],0));return t},getLengthInBits:function(e,t){if(1<=t&&t<10)switch(e){case o.MODE_NUMBER:return 10;case o.MODE_ALPHA_NUM:return 9;case o.MODE_8BIT_BYTE:case o.MODE_KANJI:return 8;default:throw Error("mode:"+e)}else if(t<27)switch(e){case o.MODE_NUMBER:return 12;case o.MODE_ALPHA_NUM:return 11;case o.MODE_8BIT_BYTE:return 16;case o.MODE_KANJI:return 10;default:throw Error("mode:"+e)}else if(t<41)switch(e){case o.MODE_NUMBER:return 14;case o.MODE_ALPHA_NUM:return 13;case o.MODE_8BIT_BYTE:return 16;case o.MODE_KANJI:return 12;default:throw Error("mode:"+e)}else throw Error("type:"+t)},getLostPoint:function(e){for(var t=e.getModuleCount(),r=0,o=0;o<t;o++)for(var n=0;n<t;n++){for(var i=0,a=e.isDark(o,n),l=-1;l<=1;l++)if(!(o+l<0)&&!(t<=o+l))for(var s=-1;s<=1;s++)!(n+s<0)&&!(t<=n+s)&&(0!=l||0!=s)&&a==e.isDark(o+l,n+s)&&i++;i>5&&(r+=3+i-5)}for(var o=0;o<t-1;o++)for(var n=0;n<t-1;n++){var u=0;e.isDark(o,n)&&u++,e.isDark(o+1,n)&&u++,e.isDark(o,n+1)&&u++,e.isDark(o+1,n+1)&&u++,(0==u||4==u)&&(r+=3)}for(var o=0;o<t;o++)for(var n=0;n<t-6;n++)e.isDark(o,n)&&!e.isDark(o,n+1)&&e.isDark(o,n+2)&&e.isDark(o,n+3)&&e.isDark(o,n+4)&&!e.isDark(o,n+5)&&e.isDark(o,n+6)&&(r+=40);for(var n=0;n<t;n++)for(var o=0;o<t-6;o++)e.isDark(o,n)&&!e.isDark(o+1,n)&&e.isDark(o+2,n)&&e.isDark(o+3,n)&&e.isDark(o+4,n)&&!e.isDark(o+5,n)&&e.isDark(o+6,n)&&(r+=40);for(var p=0,n=0;n<t;n++)for(var o=0;o<t;o++)e.isDark(o,n)&&p++;return r+10*(Math.abs(100*p/t/t-50)/5)}};e.exports=l},38402:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},n=_interopRequireDefault(r(74275)),i=r(2265),a=_interopRequireDefault(i);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var l={bgColor:n.default.oneOfType([n.default.object,n.default.string]).isRequired,bgD:n.default.string.isRequired,fgColor:n.default.oneOfType([n.default.object,n.default.string]).isRequired,fgD:n.default.string.isRequired,size:n.default.number.isRequired,title:n.default.string,viewBoxSize:n.default.number.isRequired,xmlns:n.default.string},s=(0,i.forwardRef)(function(e,t){var r=e.bgColor,n=e.bgD,i=e.fgD,l=e.fgColor,s=e.size,u=e.title,p=e.viewBoxSize,c=function(e,t){var r={};for(var o in e)!(t.indexOf(o)>=0)&&Object.prototype.hasOwnProperty.call(e,o)&&(r[o]=e[o]);return r}(e,["bgColor","bgD","fgD","fgColor","size","title","viewBoxSize"]);return a.default.createElement("svg",o({},c,{height:s,ref:t,viewBox:"0 0 "+p+" "+p,width:s}),u?a.default.createElement("title",null,u):null,a.default.createElement("path",{d:n,fill:r}),a.default.createElement("path",{d:i,fill:l}))});s.displayName="QRCodeSvg",s.propTypes=l,s.defaultProps={title:void 0,xmlns:"http://www.w3.org/2000/svg"},t.default=s},7747:function(e,t,r){"use strict";var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},n=_interopRequireDefault(r(19453)),i=_interopRequireDefault(r(7909)),a=_interopRequireDefault(r(74275)),l=r(2265),s=_interopRequireDefault(l),u=_interopRequireDefault(r(38402));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var p={bgColor:a.default.oneOfType([a.default.object,a.default.string]),fgColor:a.default.oneOfType([a.default.object,a.default.string]),level:a.default.string,size:a.default.number,value:a.default.string.isRequired},c=(0,l.forwardRef)(function(e,t){var r=e.bgColor,a=e.fgColor,l=e.level,p=e.size,c=e.value,d=function(e,t){var r={};for(var o in e)!(t.indexOf(o)>=0)&&Object.prototype.hasOwnProperty.call(e,o)&&(r[o]=e[o]);return r}(e,["bgColor","fgColor","level","size","value"]),f=new n.default(-1,i.default[l]);f.addData(c),f.make();var h=f.modules;return s.default.createElement(u.default,o({},d,{bgColor:r,bgD:h.map(function(e,t){return e.map(function(e,r){return e?"":"M "+r+" "+t+" l 1 0 0 1 -1 0 Z"}).join(" ")}).join(" "),fgColor:a,fgD:h.map(function(e,t){return e.map(function(e,r){return e?"M "+r+" "+t+" l 1 0 0 1 -1 0 Z":""}).join(" ")}).join(" "),ref:t,size:p,viewBoxSize:h.length}))});c.displayName="QRCode",c.propTypes=p,c.defaultProps={bgColor:"#FFFFFF",fgColor:"#000000",level:"L",size:256},t.ZP=c}}]);