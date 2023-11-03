"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9265],{8424:function(e,t,n){n.d(t,{d:function(){return ClickAwayListener}});var r=n(2265),i=n(95137),o=n(78136),a=n(96278),l=n(57437);function mapEventPropToEvent(e){return e.substring(2).toLowerCase()}function ClickAwayListener(e){let{children:t,disableReactTree:n=!1,mouseEvent:s="onClick",onClickAway:u,touchEvent:c="onTouchEnd"}=e,d=r.useRef(!1),f=r.useRef(null),m=r.useRef(!1),v=r.useRef(!1);r.useEffect(()=>(setTimeout(()=>{m.current=!0},0),()=>{m.current=!1}),[]);let p=(0,i.Z)(t.ref,f),g=(0,o.Z)(e=>{let t=v.current;v.current=!1;let r=(0,a.Z)(f.current);if(m.current&&f.current&&(!("clientX"in e)||!(r.documentElement.clientWidth<e.clientX)&&!(r.documentElement.clientHeight<e.clientY))){if(d.current){d.current=!1;return}(e.composedPath?e.composedPath().indexOf(f.current)>-1:!r.documentElement.contains(e.target)||f.current.contains(e.target))||!n&&t||u(e)}}),createHandleSynthetic=e=>n=>{v.current=!0;let r=t.props[e];r&&r(n)},y={ref:p};return!1!==c&&(y[c]=createHandleSynthetic(c)),r.useEffect(()=>{if(!1!==c){let e=mapEventPropToEvent(c),t=(0,a.Z)(f.current),handleTouchMove=()=>{d.current=!0};return t.addEventListener(e,g),t.addEventListener("touchmove",handleTouchMove),()=>{t.removeEventListener(e,g),t.removeEventListener("touchmove",handleTouchMove)}}},[g,c]),!1!==s&&(y[s]=createHandleSynthetic(s)),r.useEffect(()=>{if(!1!==s){let e=mapEventPropToEvent(s),t=(0,a.Z)(f.current);return t.addEventListener(e,g),()=>{t.removeEventListener(e,g)}}},[g,s]),(0,l.jsx)(r.Fragment,{children:r.cloneElement(t,y)})}},57379:function(e,t,n){n.d(t,{h:function(){return u}});var r=n(2265),i=n(54887),o=n(95137),a=n(1091),l=n(13840),s=n(57437);let u=r.forwardRef(function(e,t){let{children:n,container:u,disablePortal:c=!1}=e,[d,f]=r.useState(null),m=(0,o.Z)(r.isValidElement(n)?n.ref:null,t);return((0,a.Z)(()=>{!c&&f(("function"==typeof u?u():u)||document.body)},[u,c]),(0,a.Z)(()=>{if(d&&!c)return(0,l.Z)(t,d),()=>{(0,l.Z)(t,null)}},[t,d,c]),c)?r.isValidElement(n)?r.cloneElement(n,{ref:m}):(0,s.jsx)(r.Fragment,{children:n}):(0,s.jsx)(r.Fragment,{children:d?i.createPortal(n,d):d})})},20202:function(e,t,n){n.d(t,{$:function(){return appendOwnerState}});var r=n(13428),i=n(47630);function appendOwnerState(e,t,n){return void 0===e||(0,i.X)(e)?t:(0,r.Z)({},t,{ownerState:(0,r.Z)({},t.ownerState,n)})}},55095:function(e,t,n){n.d(t,{_:function(){return extractEventHandlers}});function extractEventHandlers(e,t=[]){if(void 0===e)return{};let n={};return Object.keys(e).filter(n=>n.match(/^on[A-Z]/)&&"function"==typeof e[n]&&!t.includes(n)).forEach(t=>{n[t]=e[t]}),n}},9700:function(e,t,n){n.d(t,{x:function(){return resolveComponentProps}});function resolveComponentProps(e,t,n){return"function"==typeof e?e(t,n):e}},94269:function(e,t,n){n.d(t,{y:function(){return useSlotProps}});var r=n(13428),i=n(20791),o=n(95137),a=n(20202),l=n(57042),s=n(55095);function omitEventHandlers(e){if(void 0===e)return{};let t={};return Object.keys(e).filter(t=>!(t.match(/^on[A-Z]/)&&"function"==typeof e[t])).forEach(n=>{t[n]=e[n]}),t}var u=n(9700);let c=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function useSlotProps(e){var t;let{elementType:n,externalSlotProps:d,ownerState:f,skipResolvingSlotProps:m=!1}=e,v=(0,i.Z)(e,c),p=m?{}:(0,u.x)(d,f),{props:g,internalRef:y}=function(e){let{getSlotProps:t,additionalProps:n,externalSlotProps:i,externalForwardedProps:o,className:a}=e;if(!t){let e=(0,l.Z)(null==o?void 0:o.className,null==i?void 0:i.className,a,null==n?void 0:n.className),t=(0,r.Z)({},null==n?void 0:n.style,null==o?void 0:o.style,null==i?void 0:i.style),s=(0,r.Z)({},n,o,i);return e.length>0&&(s.className=e),Object.keys(t).length>0&&(s.style=t),{props:s,internalRef:void 0}}let u=(0,s._)((0,r.Z)({},o,i)),c=omitEventHandlers(i),d=omitEventHandlers(o),f=t(u),m=(0,l.Z)(null==f?void 0:f.className,null==n?void 0:n.className,a,null==o?void 0:o.className,null==i?void 0:i.className),v=(0,r.Z)({},null==f?void 0:f.style,null==n?void 0:n.style,null==o?void 0:o.style,null==i?void 0:i.style),p=(0,r.Z)({},f,n,d,c);return m.length>0&&(p.className=m),Object.keys(v).length>0&&(p.style=v),{props:p,internalRef:f.ref}}((0,r.Z)({},v,{externalSlotProps:p})),h=(0,o.Z)(y,null==p?void 0:p.ref,null==(t=e.additionalProps)?void 0:t.ref),Z=(0,a.$)(n,(0,r.Z)({},g,{ref:h}),f);return Z}},56176:function(e,t,n){var r=n(13428),i=n(20791),o=n(2265),a=n(10093),l=n(41101),s=n(4439),u=n(37663),c=n(57437);let d=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function getScale(e){return`scale(${e}, ${e**2})`}let f={entering:{opacity:1,transform:getScale(1)},entered:{opacity:1,transform:"none"}},m="undefined"!=typeof navigator&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),v=o.forwardRef(function(e,t){let{addEndListener:n,appear:v=!0,children:p,easing:g,in:y,onEnter:h,onEntered:Z,onEntering:b,onExit:x,onExited:C,onExiting:S,style:E,timeout:I="auto",TransitionComponent:k=a.ZP}=e,M=(0,i.Z)(e,d),w=o.useRef(),L=o.useRef(),T=(0,l.Z)(),R=o.useRef(null),$=(0,u.Z)(R,p.ref,t),normalizedTransitionCallback=e=>t=>{if(e){let n=R.current;void 0===t?e(n):e(n,t)}},P=normalizedTransitionCallback(b),F=normalizedTransitionCallback((e,t)=>{let n;(0,s.n)(e);let{duration:r,delay:i,easing:o}=(0,s.C)({style:E,timeout:I,easing:g},{mode:"enter"});"auto"===I?(n=T.transitions.getAutoHeightDuration(e.clientHeight),L.current=n):n=r,e.style.transition=[T.transitions.create("opacity",{duration:n,delay:i}),T.transitions.create("transform",{duration:m?n:.666*n,delay:i,easing:o})].join(","),h&&h(e,t)}),O=normalizedTransitionCallback(Z),N=normalizedTransitionCallback(S),H=normalizedTransitionCallback(e=>{let t;let{duration:n,delay:r,easing:i}=(0,s.C)({style:E,timeout:I,easing:g},{mode:"exit"});"auto"===I?(t=T.transitions.getAutoHeightDuration(e.clientHeight),L.current=t):t=n,e.style.transition=[T.transitions.create("opacity",{duration:t,delay:r}),T.transitions.create("transform",{duration:m?t:.666*t,delay:m?r:r||.333*t,easing:i})].join(","),e.style.opacity=0,e.style.transform=getScale(.75),x&&x(e)}),j=normalizedTransitionCallback(C);return o.useEffect(()=>()=>{clearTimeout(w.current)},[]),(0,c.jsx)(k,(0,r.Z)({appear:v,in:y,nodeRef:R,onEnter:F,onEntered:O,onEntering:P,onExit:H,onExited:j,onExiting:N,addEndListener:e=>{"auto"===I&&(w.current=setTimeout(e,L.current||0)),n&&n(R.current,e)},timeout:"auto"===I?null:I},M,{children:(e,t)=>o.cloneElement(p,(0,r.Z)({style:(0,r.Z)({opacity:0,transform:getScale(.75),visibility:"exited"!==e||y?void 0:"hidden"},f[e],E,p.props.style),ref:$},t))}))});v.muiSupportAuto=!0,t.Z=v},35266:function(e,t,n){n.d(t,{Z:function(){return y}});var r=n(20791),i=n(13428),o=n(2265),a=n(57042),l=n(95600),s=n(35843),u=n(87927),c=n(77820),d=n(26520),f=n(25702);function getListUtilityClass(e){return(0,f.Z)("MuiList",e)}(0,d.Z)("MuiList",["root","padding","dense","subheader"]);var m=n(57437);let v=["children","className","component","dense","disablePadding","subheader"],useUtilityClasses=e=>{let{classes:t,disablePadding:n,dense:r,subheader:i}=e;return(0,l.Z)({root:["root",!n&&"padding",r&&"dense",i&&"subheader"]},getListUtilityClass,t)},p=(0,s.ZP)("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,!n.disablePadding&&t.padding,n.dense&&t.dense,n.subheader&&t.subheader]}})(({ownerState:e})=>(0,i.Z)({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),g=o.forwardRef(function(e,t){let n=(0,u.Z)({props:e,name:"MuiList"}),{children:l,className:s,component:d="ul",dense:f=!1,disablePadding:g=!1,subheader:y}=n,h=(0,r.Z)(n,v),Z=o.useMemo(()=>({dense:f}),[f]),b=(0,i.Z)({},n,{component:d,dense:f,disablePadding:g}),x=useUtilityClasses(b);return(0,m.jsx)(c.Z.Provider,{value:Z,children:(0,m.jsxs)(p,(0,i.Z)({as:d,className:(0,a.Z)(x.root,s),ref:t,ownerState:b},h,{children:[y,l]}))})});var y=g},77820:function(e,t,n){var r=n(2265);let i=r.createContext({});t.Z=i},8864:function(e,t,n){var r=n(20791),i=n(13428),o=n(2265),a=n(57042),l=n(95600),s=n(35843),u=n(87927),c=n(78342),d=n(77820),f=n(57437);let m=["className"],useUtilityClasses=e=>{let{alignItems:t,classes:n}=e;return(0,l.Z)({root:["root","flex-start"===t&&"alignItemsFlexStart"]},c.f,n)},v=(0,s.ZP)("div",{name:"MuiListItemIcon",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,"flex-start"===n.alignItems&&t.alignItemsFlexStart]}})(({theme:e,ownerState:t})=>(0,i.Z)({minWidth:56,color:(e.vars||e).palette.action.active,flexShrink:0,display:"inline-flex"},"flex-start"===t.alignItems&&{marginTop:8})),p=o.forwardRef(function(e,t){let n=(0,u.Z)({props:e,name:"MuiListItemIcon"}),{className:l}=n,s=(0,r.Z)(n,m),c=o.useContext(d.Z),p=(0,i.Z)({},n,{alignItems:c.alignItems}),g=useUtilityClasses(p);return(0,f.jsx)(v,(0,i.Z)({className:(0,a.Z)(g.root,l),ownerState:p,ref:t},s))});t.Z=p},78342:function(e,t,n){n.d(t,{f:function(){return getListItemIconUtilityClass}});var r=n(26520),i=n(25702);function getListItemIconUtilityClass(e){return(0,i.Z)("MuiListItemIcon",e)}let o=(0,r.Z)("MuiListItemIcon",["root","alignItemsFlexStart"]);t.Z=o},69660:function(e,t,n){n.d(t,{L:function(){return getListItemTextUtilityClass}});var r=n(26520),i=n(25702);function getListItemTextUtilityClass(e){return(0,i.Z)("MuiListItemText",e)}let o=(0,r.Z)("MuiListItemText",["root","multiline","dense","inset","primary","secondary"]);t.Z=o},74309:function(e,t,n){n.d(t,{Z:function(){return I}});var r=n(20791),i=n(13428),o=n(2265),a=n(57042),l=n(95600),s=n(89975),u=n(35843),c=n(87927),d=n(77820),f=n(45295),m=n(88519),v=n(37663),p=n(55563),g=n(78342),y=n(69660),h=n(26520),Z=n(25702);function getMenuItemUtilityClass(e){return(0,Z.Z)("MuiMenuItem",e)}let b=(0,h.Z)("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]);var x=n(57437);let C=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex","className"],useUtilityClasses=e=>{let{disabled:t,dense:n,divider:r,disableGutters:o,selected:a,classes:s}=e,u=(0,l.Z)({root:["root",n&&"dense",t&&"disabled",!o&&"gutters",r&&"divider",a&&"selected"]},getMenuItemUtilityClass,s);return(0,i.Z)({},s,u)},S=(0,u.ZP)(f.Z,{shouldForwardProp:e=>(0,u.FO)(e)||"classes"===e,name:"MuiMenuItem",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,n.dense&&t.dense,n.divider&&t.divider,!n.disableGutters&&t.gutters]}})(({theme:e,ownerState:t})=>(0,i.Z)({},e.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!t.disableGutters&&{paddingLeft:16,paddingRight:16},t.divider&&{borderBottom:`1px solid ${(e.vars||e).palette.divider}`,backgroundClip:"padding-box"},{"&:hover":{textDecoration:"none",backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${b.selected}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:(0,s.Fq)(e.palette.primary.main,e.palette.action.selectedOpacity),[`&.${b.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:(0,s.Fq)(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}},[`&.${b.selected}:hover`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:(0,s.Fq)(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:(0,s.Fq)(e.palette.primary.main,e.palette.action.selectedOpacity)}},[`&.${b.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${b.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity},[`& + .${p.Z.root}`]:{marginTop:e.spacing(1),marginBottom:e.spacing(1)},[`& + .${p.Z.inset}`]:{marginLeft:52},[`& .${y.Z.root}`]:{marginTop:0,marginBottom:0},[`& .${y.Z.inset}`]:{paddingLeft:36},[`& .${g.Z.root}`]:{minWidth:36}},!t.dense&&{[e.breakpoints.up("sm")]:{minHeight:"auto"}},t.dense&&(0,i.Z)({minHeight:32,paddingTop:4,paddingBottom:4},e.typography.body2,{[`& .${g.Z.root} svg`]:{fontSize:"1.25rem"}}))),E=o.forwardRef(function(e,t){let n;let l=(0,c.Z)({props:e,name:"MuiMenuItem"}),{autoFocus:s=!1,component:u="li",dense:f=!1,divider:p=!1,disableGutters:g=!1,focusVisibleClassName:y,role:h="menuitem",tabIndex:Z,className:b}=l,E=(0,r.Z)(l,C),I=o.useContext(d.Z),k=o.useMemo(()=>({dense:f||I.dense||!1,disableGutters:g}),[I.dense,f,g]),M=o.useRef(null);(0,m.Z)(()=>{s&&M.current&&M.current.focus()},[s]);let w=(0,i.Z)({},l,{dense:k.dense,divider:p,disableGutters:g}),L=useUtilityClasses(l),T=(0,v.Z)(M,t);return l.disabled||(n=void 0!==Z?Z:-1),(0,x.jsx)(d.Z.Provider,{value:k,children:(0,x.jsx)(S,(0,i.Z)({ref:T,role:h,tabIndex:n,component:u,focusVisibleClassName:(0,a.Z)(L.focusVisible,y),className:(0,a.Z)(L.root,b)},E,{ownerState:w,classes:L}))})});var I=E},61994:function(e,t,n){n.d(t,{Z:function(){return v}});var r=n(13428),i=n(20791),o=n(2265);n(9176);var a=n(53931),l=n(35266),s=n(60878).Z,u=n(37663),c=n(88519),d=n(57437);let f=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function nextItem(e,t,n){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:n?null:e.firstChild}function previousItem(e,t,n){return e===t?n?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:n?null:e.lastChild}function textCriteriaMatches(e,t){if(void 0===t)return!0;let n=e.innerText;return void 0===n&&(n=e.textContent),0!==(n=n.trim().toLowerCase()).length&&(t.repeating?n[0]===t.keys[0]:0===n.indexOf(t.keys.join("")))}function moveFocus(e,t,n,r,i,o){let a=!1,l=i(e,t,!!t&&n);for(;l;){if(l===e.firstChild){if(a)return!1;a=!0}let t=!r&&(l.disabled||"true"===l.getAttribute("aria-disabled"));if(l.hasAttribute("tabindex")&&textCriteriaMatches(l,o)&&!t)return l.focus(),!0;l=i(e,l,n)}return!1}let m=o.forwardRef(function(e,t){let{actions:n,autoFocus:m=!1,autoFocusItem:v=!1,children:p,className:g,disabledItemsFocusable:y=!1,disableListWrap:h=!1,onKeyDown:Z,variant:b="selectedMenu"}=e,x=(0,i.Z)(e,f),C=o.useRef(null),S=o.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});(0,c.Z)(()=>{m&&C.current.focus()},[m]),o.useImperativeHandle(n,()=>({adjustStyleForScrollbar:(e,t)=>{let n=!C.current.style.width;if(e.clientHeight<C.current.clientHeight&&n){let n=`${s((0,a.Z)(e))}px`;C.current.style["rtl"===t.direction?"paddingLeft":"paddingRight"]=n,C.current.style.width=`calc(100% + ${n})`}return C.current}}),[]);let E=(0,u.Z)(C,t),I=-1;o.Children.forEach(p,(e,t)=>{if(!o.isValidElement(e)){I===t&&(I+=1)>=p.length&&(I=-1);return}e.props.disabled||("selectedMenu"===b&&e.props.selected?I=t:-1!==I||(I=t)),I===t&&(e.props.disabled||e.props.muiSkipListHighlight||e.type.muiSkipListHighlight)&&(I+=1)>=p.length&&(I=-1)});let k=o.Children.map(p,(e,t)=>{if(t===I){let t={};return v&&(t.autoFocus=!0),void 0===e.props.tabIndex&&"selectedMenu"===b&&(t.tabIndex=0),o.cloneElement(e,t)}return e});return(0,d.jsx)(l.Z,(0,r.Z)({role:"menu",ref:E,className:g,onKeyDown:e=>{let t=C.current,n=e.key,r=(0,a.Z)(t).activeElement;if("ArrowDown"===n)e.preventDefault(),moveFocus(t,r,h,y,nextItem);else if("ArrowUp"===n)e.preventDefault(),moveFocus(t,r,h,y,previousItem);else if("Home"===n)e.preventDefault(),moveFocus(t,null,h,y,nextItem);else if("End"===n)e.preventDefault(),moveFocus(t,null,h,y,previousItem);else if(1===n.length){let i=S.current,o=n.toLowerCase(),a=performance.now();i.keys.length>0&&(a-i.lastTime>500?(i.keys=[],i.repeating=!0,i.previousKeyMatched=!0):i.repeating&&o!==i.keys[0]&&(i.repeating=!1)),i.lastTime=a,i.keys.push(o);let l=r&&!i.repeating&&textCriteriaMatches(r,i);i.previousKeyMatched&&(l||moveFocus(t,r,!1,y,nextItem,i))?e.preventDefault():i.previousKeyMatched=!1}Z&&Z(e)},tabIndex:m?0:-1},x,{children:k}))});var v=m},29872:function(e,t,n){n.d(t,{Z:function(){return y}});var r=n(20791),i=n(13428),o=n(2265),a=n(57042),l=n(95600),s=n(89975),u=n(35843),styles_getOverlayAlpha=e=>((e<1?5.11916*e**2:4.5*Math.log(e+1)+2)/100).toFixed(2),c=n(87927),d=n(26520),f=n(25702);function getPaperUtilityClass(e){return(0,f.Z)("MuiPaper",e)}(0,d.Z)("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);var m=n(57437);let v=["className","component","elevation","square","variant"],useUtilityClasses=e=>{let{square:t,elevation:n,variant:r,classes:i}=e,o={root:["root",r,!t&&"rounded","elevation"===r&&`elevation${n}`]};return(0,l.Z)(o,getPaperUtilityClass,i)},p=(0,u.ZP)("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,t[n.variant],!n.square&&t.rounded,"elevation"===n.variant&&t[`elevation${n.elevation}`]]}})(({theme:e,ownerState:t})=>{var n;return(0,i.Z)({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},"outlined"===t.variant&&{border:`1px solid ${(e.vars||e).palette.divider}`},"elevation"===t.variant&&(0,i.Z)({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&"dark"===e.palette.mode&&{backgroundImage:`linear-gradient(${(0,s.Fq)("#fff",styles_getOverlayAlpha(t.elevation))}, ${(0,s.Fq)("#fff",styles_getOverlayAlpha(t.elevation))})`},e.vars&&{backgroundImage:null==(n=e.vars.overlays)?void 0:n[t.elevation]}))}),g=o.forwardRef(function(e,t){let n=(0,c.Z)({props:e,name:"MuiPaper"}),{className:o,component:l="div",elevation:s=1,square:u=!1,variant:d="elevation"}=n,f=(0,r.Z)(n,v),g=(0,i.Z)({},n,{component:l,elevation:s,square:u,variant:d}),y=useUtilityClasses(g);return(0,m.jsx)(p,(0,i.Z)({as:l,ownerState:g,className:(0,a.Z)(y.root,o),ref:t},f))});var y=g},41101:function(e,t,n){n.d(t,{Z:function(){return useTheme}}),n(2265);var r=n(95270),i=n(53794),o=n(53469);function useTheme(){let e=(0,r.Z)(i.Z);return e[o.Z]||e}},60878:function(e,t,n){n.d(t,{Z:function(){return getScrollbarSize}});function getScrollbarSize(e){let t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}},8236:function(e,t){Symbol.for("react.element"),Symbol.for("react.portal"),Symbol.for("react.fragment"),Symbol.for("react.strict_mode"),Symbol.for("react.profiler"),Symbol.for("react.provider"),Symbol.for("react.context"),Symbol.for("react.server_context"),Symbol.for("react.forward_ref"),Symbol.for("react.suspense"),Symbol.for("react.suspense_list"),Symbol.for("react.memo"),Symbol.for("react.lazy"),Symbol.for("react.offscreen"),Symbol.for("react.module.reference")},9176:function(e,t,n){n(8236)}}]);