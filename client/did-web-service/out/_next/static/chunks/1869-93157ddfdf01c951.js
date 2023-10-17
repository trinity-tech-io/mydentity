"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1869],{15084:function(e,t,n){n.d(t,{i:function(){return FocusTrap}});var r=n(2265),o=n(95137),i=n(96278),l=n(57437);function defaultGetTabbable(e){let t=[],n=[];return Array.from(e.querySelectorAll('input,select,textarea,a[href],button,[tabindex],audio[controls],video[controls],[contenteditable]:not([contenteditable="false"])')).forEach((e,r)=>{let o=function(e){let t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?"true"===e.contentEditable||("AUDIO"===e.nodeName||"VIDEO"===e.nodeName||"DETAILS"===e.nodeName)&&null===e.getAttribute("tabindex")?0:e.tabIndex:t}(e);-1===o||e.disabled||"INPUT"===e.tagName&&"hidden"===e.type||function(e){if("INPUT"!==e.tagName||"radio"!==e.type||!e.name)return!1;let getRadio=t=>e.ownerDocument.querySelector(`input[type="radio"]${t}`),t=getRadio(`[name="${e.name}"]:checked`);return t||(t=getRadio(`[name="${e.name}"]`)),t!==e}(e)||(0===o?t.push(e):n.push({documentOrder:r,tabIndex:o,node:e}))}),n.sort((e,t)=>e.tabIndex===t.tabIndex?e.documentOrder-t.documentOrder:e.tabIndex-t.tabIndex).map(e=>e.node).concat(t)}function defaultIsEnabled(){return!0}function FocusTrap(e){let{children:t,disableAutoFocus:n=!1,disableEnforceFocus:a=!1,disableRestoreFocus:s=!1,getTabbable:d=defaultGetTabbable,isEnabled:u=defaultIsEnabled,open:c}=e,f=r.useRef(!1),p=r.useRef(null),m=r.useRef(null),v=r.useRef(null),h=r.useRef(null),g=r.useRef(!1),y=r.useRef(null),b=(0,o.Z)(t.ref,y),E=r.useRef(null);r.useEffect(()=>{c&&y.current&&(g.current=!n)},[n,c]),r.useEffect(()=>{if(!c||!y.current)return;let e=(0,i.Z)(y.current);return!y.current.contains(e.activeElement)&&(y.current.hasAttribute("tabIndex")||y.current.setAttribute("tabIndex","-1"),g.current&&y.current.focus()),()=>{s||(v.current&&v.current.focus&&(f.current=!0,v.current.focus()),v.current=null)}},[c]),r.useEffect(()=>{if(!c||!y.current)return;let e=(0,i.Z)(y.current),loopFocus=t=>{E.current=t,!a&&u()&&"Tab"===t.key&&e.activeElement===y.current&&t.shiftKey&&(f.current=!0,m.current&&m.current.focus())},contain=()=>{let t=y.current;if(null===t)return;if(!e.hasFocus()||!u()||f.current){f.current=!1;return}if(t.contains(e.activeElement)||a&&e.activeElement!==p.current&&e.activeElement!==m.current)return;if(e.activeElement!==h.current)h.current=null;else if(null!==h.current)return;if(!g.current)return;let n=[];if((e.activeElement===p.current||e.activeElement===m.current)&&(n=d(y.current)),n.length>0){var r,o;let e=!!((null==(r=E.current)?void 0:r.shiftKey)&&(null==(o=E.current)?void 0:o.key)==="Tab"),t=n[0],i=n[n.length-1];"string"!=typeof t&&"string"!=typeof i&&(e?i.focus():t.focus())}else t.focus()};e.addEventListener("focusin",contain),e.addEventListener("keydown",loopFocus,!0);let t=setInterval(()=>{e.activeElement&&"BODY"===e.activeElement.tagName&&contain()},50);return()=>{clearInterval(t),e.removeEventListener("focusin",contain),e.removeEventListener("keydown",loopFocus,!0)}},[n,a,s,u,c,d]);let handleFocusSentinel=e=>{null===v.current&&(v.current=e.relatedTarget),g.current=!0};return(0,l.jsxs)(r.Fragment,{children:[(0,l.jsx)("div",{tabIndex:c?0:-1,onFocus:handleFocusSentinel,ref:p,"data-testid":"sentinelStart"}),r.cloneElement(t,{ref:b,onFocus:e=>{null===v.current&&(v.current=e.relatedTarget),g.current=!0,h.current=e.target;let n=t.props.onFocus;n&&n(e)}}),(0,l.jsx)("div",{tabIndex:c?0:-1,onFocus:handleFocusSentinel,ref:m,"data-testid":"sentinelEnd"})]})}},57379:function(e,t,n){n.d(t,{h:function(){return d}});var r=n(2265),o=n(54887),i=n(95137),l=n(1091),a=n(13840),s=n(57437);let d=r.forwardRef(function(e,t){let{children:n,container:d,disablePortal:u=!1}=e,[c,f]=r.useState(null),p=(0,i.Z)(r.isValidElement(n)?n.ref:null,t);return((0,l.Z)(()=>{!u&&f(("function"==typeof d?d():d)||document.body)},[d,u]),(0,l.Z)(()=>{if(c&&!u)return(0,a.Z)(t,c),()=>{(0,a.Z)(t,null)}},[t,c,u]),u)?r.isValidElement(n)?r.cloneElement(n,{ref:p}):(0,s.jsx)(r.Fragment,{children:n}):(0,s.jsx)(r.Fragment,{children:c?o.createPortal(n,c):c})})},20202:function(e,t,n){n.d(t,{$:function(){return appendOwnerState}});var r=n(13428),o=n(43655);function appendOwnerState(e,t,n){return void 0===e||(0,o.X)(e)?t:(0,r.Z)({},t,{ownerState:(0,r.Z)({},t.ownerState,n)})}},55095:function(e,t,n){n.d(t,{_:function(){return extractEventHandlers}});function extractEventHandlers(e,t=[]){if(void 0===e)return{};let n={};return Object.keys(e).filter(n=>n.match(/^on[A-Z]/)&&"function"==typeof e[n]&&!t.includes(n)).forEach(t=>{n[t]=e[t]}),n}},9700:function(e,t,n){n.d(t,{x:function(){return resolveComponentProps}});function resolveComponentProps(e,t,n){return"function"==typeof e?e(t,n):e}},94269:function(e,t,n){n.d(t,{y:function(){return useSlotProps}});var r=n(13428),o=n(20791),i=n(95137),l=n(20202),a=n(57042),s=n(55095);function omitEventHandlers(e){if(void 0===e)return{};let t={};return Object.keys(e).filter(t=>!(t.match(/^on[A-Z]/)&&"function"==typeof e[t])).forEach(n=>{t[n]=e[n]}),t}var d=n(9700);let u=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function useSlotProps(e){var t;let{elementType:n,externalSlotProps:c,ownerState:f,skipResolvingSlotProps:p=!1}=e,m=(0,o.Z)(e,u),v=p?{}:(0,d.x)(c,f),{props:h,internalRef:g}=function(e){let{getSlotProps:t,additionalProps:n,externalSlotProps:o,externalForwardedProps:i,className:l}=e;if(!t){let e=(0,a.Z)(null==i?void 0:i.className,null==o?void 0:o.className,l,null==n?void 0:n.className),t=(0,r.Z)({},null==n?void 0:n.style,null==i?void 0:i.style,null==o?void 0:o.style),s=(0,r.Z)({},n,i,o);return e.length>0&&(s.className=e),Object.keys(t).length>0&&(s.style=t),{props:s,internalRef:void 0}}let d=(0,s._)((0,r.Z)({},i,o)),u=omitEventHandlers(o),c=omitEventHandlers(i),f=t(d),p=(0,a.Z)(null==f?void 0:f.className,null==n?void 0:n.className,l,null==i?void 0:i.className,null==o?void 0:o.className),m=(0,r.Z)({},null==f?void 0:f.style,null==n?void 0:n.style,null==i?void 0:i.style,null==o?void 0:o.style),v=(0,r.Z)({},f,n,c,u);return p.length>0&&(v.className=p),Object.keys(m).length>0&&(v.style=m),{props:v,internalRef:f.ref}}((0,r.Z)({},m,{externalSlotProps:v})),y=(0,i.Z)(g,null==v?void 0:v.ref,null==(t=e.additionalProps)?void 0:t.ref),b=(0,l.$)(n,(0,r.Z)({},h,{ref:y}),f);return b}},39350:function(e,t,n){n.d(t,{Z:function(){return g}});var r=n(20791),o=n(13428),i=n(2265),l=n(57042),a=n(95600),s=n(35843),d=n(87927),u=n(72261),c=n(26520),f=n(25702);function getBackdropUtilityClass(e){return(0,f.Z)("MuiBackdrop",e)}(0,c.Z)("MuiBackdrop",["root","invisible"]);var p=n(57437);let m=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],useUtilityClasses=e=>{let{classes:t,invisible:n}=e;return(0,a.Z)({root:["root",n&&"invisible"]},getBackdropUtilityClass,t)},v=(0,s.ZP)("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,n.invisible&&t.invisible]}})(({ownerState:e})=>(0,o.Z)({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),h=i.forwardRef(function(e,t){var n,i,a;let s=(0,d.Z)({props:e,name:"MuiBackdrop"}),{children:c,className:f,component:h="div",components:g={},componentsProps:y={},invisible:b=!1,open:E,slotProps:Z={},slots:x={},TransitionComponent:k=u.Z,transitionDuration:R}=s,C=(0,r.Z)(s,m),T=(0,o.Z)({},s,{component:h,invisible:b}),S=useUtilityClasses(T),P=null!=(n=Z.root)?n:y.root;return(0,p.jsx)(k,(0,o.Z)({in:E,timeout:R},C,{children:(0,p.jsx)(v,(0,o.Z)({"aria-hidden":!0},P,{as:null!=(i=null!=(a=x.root)?a:g.Root)?i:h,className:(0,l.Z)(S.root,f,null==P?void 0:P.className),ownerState:(0,o.Z)({},T,null==P?void 0:P.ownerState),classes:S,ref:t,children:c}))}))});var g=h},72261:function(e,t,n){var r=n(13428),o=n(20791),i=n(2265),l=n(10093),a=n(41101),s=n(4439),d=n(37663),u=n(57437);let c=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],f={entering:{opacity:1},entered:{opacity:1}},p=i.forwardRef(function(e,t){let n=(0,a.Z)(),p={enter:n.transitions.duration.enteringScreen,exit:n.transitions.duration.leavingScreen},{addEndListener:m,appear:v=!0,children:h,easing:g,in:y,onEnter:b,onEntered:E,onEntering:Z,onExit:x,onExited:k,onExiting:R,style:C,timeout:T=p,TransitionComponent:S=l.ZP}=e,P=(0,o.Z)(e,c),w=i.useRef(null),N=(0,d.Z)(w,h.ref,t),normalizedTransitionCallback=e=>t=>{if(e){let n=w.current;void 0===t?e(n):e(n,t)}},I=normalizedTransitionCallback(Z),M=normalizedTransitionCallback((e,t)=>{(0,s.n)(e);let r=(0,s.C)({style:C,timeout:T,easing:g},{mode:"enter"});e.style.webkitTransition=n.transitions.create("opacity",r),e.style.transition=n.transitions.create("opacity",r),b&&b(e,t)}),O=normalizedTransitionCallback(E),A=normalizedTransitionCallback(R),H=normalizedTransitionCallback(e=>{let t=(0,s.C)({style:C,timeout:T,easing:g},{mode:"exit"});e.style.webkitTransition=n.transitions.create("opacity",t),e.style.transition=n.transitions.create("opacity",t),x&&x(e)}),F=normalizedTransitionCallback(k);return(0,u.jsx)(S,(0,r.Z)({appear:v,in:y,nodeRef:w,onEnter:M,onEntered:O,onEntering:I,onExit:H,onExited:F,onExiting:A,addEndListener:e=>{m&&m(w.current,e)},timeout:T},P,{children:(e,t)=>i.cloneElement(h,(0,r.Z)({style:(0,r.Z)({opacity:0,visibility:"exited"!==e||y?void 0:"hidden"},f[e],C,h.props.style),ref:N},t))}))});t.Z=p},56176:function(e,t,n){var r=n(13428),o=n(20791),i=n(2265),l=n(10093),a=n(41101),s=n(4439),d=n(37663),u=n(57437);let c=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function getScale(e){return`scale(${e}, ${e**2})`}let f={entering:{opacity:1,transform:getScale(1)},entered:{opacity:1,transform:"none"}},p="undefined"!=typeof navigator&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),m=i.forwardRef(function(e,t){let{addEndListener:n,appear:m=!0,children:v,easing:h,in:g,onEnter:y,onEntered:b,onEntering:E,onExit:Z,onExited:x,onExiting:k,style:R,timeout:C="auto",TransitionComponent:T=l.ZP}=e,S=(0,o.Z)(e,c),P=i.useRef(),w=i.useRef(),N=(0,a.Z)(),I=i.useRef(null),M=(0,d.Z)(I,v.ref,t),normalizedTransitionCallback=e=>t=>{if(e){let n=I.current;void 0===t?e(n):e(n,t)}},O=normalizedTransitionCallback(E),A=normalizedTransitionCallback((e,t)=>{let n;(0,s.n)(e);let{duration:r,delay:o,easing:i}=(0,s.C)({style:R,timeout:C,easing:h},{mode:"enter"});"auto"===C?(n=N.transitions.getAutoHeightDuration(e.clientHeight),w.current=n):n=r,e.style.transition=[N.transitions.create("opacity",{duration:n,delay:o}),N.transitions.create("transform",{duration:p?n:.666*n,delay:o,easing:i})].join(","),y&&y(e,t)}),H=normalizedTransitionCallback(b),F=normalizedTransitionCallback(k),j=normalizedTransitionCallback(e=>{let t;let{duration:n,delay:r,easing:o}=(0,s.C)({style:R,timeout:C,easing:h},{mode:"exit"});"auto"===C?(t=N.transitions.getAutoHeightDuration(e.clientHeight),w.current=t):t=n,e.style.transition=[N.transitions.create("opacity",{duration:t,delay:r}),N.transitions.create("transform",{duration:p?t:.666*t,delay:p?r:r||.333*t,easing:o})].join(","),e.style.opacity=0,e.style.transform=getScale(.75),Z&&Z(e)}),z=normalizedTransitionCallback(x);return i.useEffect(()=>()=>{clearTimeout(P.current)},[]),(0,u.jsx)(T,(0,r.Z)({appear:m,in:g,nodeRef:I,onEnter:A,onEntered:H,onEntering:O,onExit:j,onExited:z,onExiting:F,addEndListener:e=>{"auto"===C&&(P.current=setTimeout(e,w.current||0)),n&&n(I.current,e)},timeout:"auto"===C?null:C},S,{children:(e,t)=>i.cloneElement(v,(0,r.Z)({style:(0,r.Z)({opacity:0,transform:getScale(.75),visibility:"exited"!==e||g?void 0:"hidden"},f[e],R,v.props.style),ref:M},t))}))});m.muiSupportAuto=!0,t.Z=m},26931:function(e,t,n){n.d(t,{Z:function(){return w}});var r=n(20791),o=n(13428),i=n(2265),l=n(57042),a=n(94269),s=n(95137),d=n(96278),u=n(78136),c=n(62940),f=n(55095),p=n(88221),m=n(60878);function ariaHidden(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function getPaddingRight(e){return parseInt((0,p.Z)(e).getComputedStyle(e).paddingRight,10)||0}function ariaHiddenSiblings(e,t,n,r,o){let i=[t,n,...r];[].forEach.call(e.children,e=>{let t=-1===i.indexOf(e),n=!function(e){let t=-1!==["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName),n="INPUT"===e.tagName&&"hidden"===e.getAttribute("type");return t||n}(e);t&&n&&ariaHidden(e,o)})}function findIndexOf(e,t){let n=-1;return e.some((e,r)=>!!t(e)&&(n=r,!0)),n}let v=new class{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(e,t){let n=this.modals.indexOf(e);if(-1!==n)return n;n=this.modals.length,this.modals.push(e),e.modalRef&&ariaHidden(e.modalRef,!1);let r=function(e){let t=[];return[].forEach.call(e.children,e=>{"true"===e.getAttribute("aria-hidden")&&t.push(e)}),t}(t);ariaHiddenSiblings(t,e.mount,e.modalRef,r,!0);let o=findIndexOf(this.containers,e=>e.container===t);return -1!==o?this.containers[o].modals.push(e):this.containers.push({modals:[e],container:t,restore:null,hiddenSiblings:r}),n}mount(e,t){let n=findIndexOf(this.containers,t=>-1!==t.modals.indexOf(e)),r=this.containers[n];r.restore||(r.restore=function(e,t){let n=[],r=e.container;if(!t.disableScrollLock){let e;if(function(e){let t=(0,d.Z)(e);return t.body===e?(0,p.Z)(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}(r)){let e=(0,m.Z)((0,d.Z)(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${getPaddingRight(r)+e}px`;let t=(0,d.Z)(r).querySelectorAll(".mui-fixed");[].forEach.call(t,t=>{n.push({value:t.style.paddingRight,property:"padding-right",el:t}),t.style.paddingRight=`${getPaddingRight(t)+e}px`})}if(r.parentNode instanceof DocumentFragment)e=(0,d.Z)(r).body;else{let t=r.parentElement,n=(0,p.Z)(r);e=(null==t?void 0:t.nodeName)==="HTML"&&"scroll"===n.getComputedStyle(t).overflowY?t:r}n.push({value:e.style.overflow,property:"overflow",el:e},{value:e.style.overflowX,property:"overflow-x",el:e},{value:e.style.overflowY,property:"overflow-y",el:e}),e.style.overflow="hidden"}return()=>{n.forEach(({value:e,el:t,property:n})=>{e?t.style.setProperty(n,e):t.style.removeProperty(n)})}}(r,t))}remove(e,t=!0){let n=this.modals.indexOf(e);if(-1===n)return n;let r=findIndexOf(this.containers,t=>-1!==t.modals.indexOf(e)),o=this.containers[r];if(o.modals.splice(o.modals.indexOf(e),1),this.modals.splice(n,1),0===o.modals.length)o.restore&&o.restore(),e.modalRef&&ariaHidden(e.modalRef,t),ariaHiddenSiblings(o.container,e.mount,e.modalRef,o.hiddenSiblings,!1),this.containers.splice(r,1);else{let e=o.modals[o.modals.length-1];e.modalRef&&ariaHidden(e.modalRef,!1)}return n}isTopModal(e){return this.modals.length>0&&this.modals[this.modals.length-1]===e}};var h=n(95600),g=n(15084),y=n(57379),b=n(35843),E=n(87927),Z=n(39350),x=n(26520),k=n(25702);function getModalUtilityClass(e){return(0,k.Z)("MuiModal",e)}(0,x.Z)("MuiModal",["root","hidden","backdrop"]);var R=n(57437);let C=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],useUtilityClasses=e=>{let{open:t,exited:n,classes:r}=e;return(0,h.Z)({root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]},getModalUtilityClass,r)},T=(0,b.ZP)("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,!n.open&&n.exited&&t.hidden]}})(({theme:e,ownerState:t})=>(0,o.Z)({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),S=(0,b.ZP)(Z.Z,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),P=i.forwardRef(function(e,t){var n,p,m,h,b,Z;let x=(0,E.Z)({name:"MuiModal",props:e}),{BackdropComponent:k=S,BackdropProps:P,className:w,closeAfterTransition:N=!1,children:I,container:M,component:O,components:A={},componentsProps:H={},disableAutoFocus:F=!1,disableEnforceFocus:j=!1,disableEscapeKeyDown:z=!1,disablePortal:L=!1,disableRestoreFocus:D=!1,disableScrollLock:B=!1,hideBackdrop:U=!1,keepMounted:K=!1,onBackdropClick:$,open:_,slotProps:W,slots:Y}=x,q=(0,r.Z)(x,C),G=(0,o.Z)({},x,{closeAfterTransition:N,disableAutoFocus:F,disableEnforceFocus:j,disableEscapeKeyDown:z,disablePortal:L,disableRestoreFocus:D,disableScrollLock:B,hideBackdrop:U,keepMounted:K}),{getRootProps:V,getBackdropProps:X,getTransitionProps:J,portalRef:Q,isTopModal:ee,exited:et,hasTransition:en}=function(e){let{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:r=!1,manager:l=v,closeAfterTransition:a=!1,onTransitionEnter:p,onTransitionExited:m,children:h,onClose:g,open:y,rootRef:b}=e,E=i.useRef({}),Z=i.useRef(null),x=i.useRef(null),k=(0,s.Z)(x,b),[R,C]=i.useState(!y),T=!!h&&h.props.hasOwnProperty("in"),S=!0;("false"===e["aria-hidden"]||!1===e["aria-hidden"])&&(S=!1);let getDoc=()=>(0,d.Z)(Z.current),getModal=()=>(E.current.modalRef=x.current,E.current.mount=Z.current,E.current),handleMounted=()=>{l.mount(getModal(),{disableScrollLock:r}),x.current&&(x.current.scrollTop=0)},P=(0,u.Z)(()=>{let e=("function"==typeof t?t():t)||getDoc().body;l.add(getModal(),e),x.current&&handleMounted()}),w=i.useCallback(()=>l.isTopModal(getModal()),[l]),N=(0,u.Z)(e=>{Z.current=e,e&&(y&&w()?handleMounted():x.current&&ariaHidden(x.current,S))}),I=i.useCallback(()=>{l.remove(getModal(),S)},[S,l]);i.useEffect(()=>()=>{I()},[I]),i.useEffect(()=>{y?P():T&&a||I()},[y,I,T,a,P]);let createHandleKeyDown=e=>t=>{var r;null==(r=e.onKeyDown)||r.call(e,t),"Escape"===t.key&&w()&&!n&&(t.stopPropagation(),g&&g(t,"escapeKeyDown"))},createHandleBackdropClick=e=>t=>{var n;null==(n=e.onClick)||n.call(e,t),t.target===t.currentTarget&&g&&g(t,"backdropClick")};return{getRootProps:(t={})=>{let n=(0,f._)(e);delete n.onTransitionEnter,delete n.onTransitionExited;let r=(0,o.Z)({},n,t);return(0,o.Z)({role:"presentation"},r,{onKeyDown:createHandleKeyDown(r),ref:k})},getBackdropProps:(e={})=>(0,o.Z)({"aria-hidden":!0},e,{onClick:createHandleBackdropClick(e),open:y}),getTransitionProps:()=>({onEnter:(0,c.Z)(()=>{C(!1),p&&p()},null==h?void 0:h.props.onEnter),onExited:(0,c.Z)(()=>{C(!0),m&&m(),a&&I()},null==h?void 0:h.props.onExited)}),rootRef:k,portalRef:N,isTopModal:w,exited:R,hasTransition:T}}((0,o.Z)({},G,{rootRef:t})),er=(0,o.Z)({},G,{exited:et}),eo=useUtilityClasses(er),ei={};if(void 0===I.props.tabIndex&&(ei.tabIndex="-1"),en){let{onEnter:e,onExited:t}=J();ei.onEnter=e,ei.onExited=t}let el=null!=(n=null!=(p=null==Y?void 0:Y.root)?p:A.Root)?n:T,ea=null!=(m=null!=(h=null==Y?void 0:Y.backdrop)?h:A.Backdrop)?m:k,es=null!=(b=null==W?void 0:W.root)?b:H.root,ed=null!=(Z=null==W?void 0:W.backdrop)?Z:H.backdrop,eu=(0,a.y)({elementType:el,externalSlotProps:es,externalForwardedProps:q,getSlotProps:V,additionalProps:{ref:t,as:O},ownerState:er,className:(0,l.Z)(w,null==es?void 0:es.className,null==eo?void 0:eo.root,!er.open&&er.exited&&(null==eo?void 0:eo.hidden))}),ec=(0,a.y)({elementType:ea,externalSlotProps:ed,additionalProps:P,getSlotProps:e=>X((0,o.Z)({},e,{onClick:t=>{$&&$(t),null!=e&&e.onClick&&e.onClick(t)}})),className:(0,l.Z)(null==ed?void 0:ed.className,null==P?void 0:P.className,null==eo?void 0:eo.backdrop),ownerState:er});return K||_||en&&!et?(0,R.jsx)(y.h,{ref:Q,container:M,disablePortal:L,children:(0,R.jsxs)(el,(0,o.Z)({},eu,{children:[!U&&k?(0,R.jsx)(ea,(0,o.Z)({},ec)):null,(0,R.jsx)(g.i,{disableEnforceFocus:j,disableAutoFocus:F,disableRestoreFocus:D,isEnabled:ee,open:_,children:i.cloneElement(I,ei)})]}))}):null});var w=P},60878:function(e,t,n){n.d(t,{Z:function(){return getScrollbarSize}});function getScrollbarSize(e){let t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}}}]);