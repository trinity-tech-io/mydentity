(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3152],{80984:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return o.createSvgIcon}});var o=n(43135)},43989:function(e,t,n){"use strict";n.d(t,{Z:function(){return K}});var o,r,i,a,s,l=n(13428),c=n(20791),f=n(2265),p=n(95137),u=n(1091),d=n(96278);function getWindow(e){if(null==e)return window;if("[object Window]"!==e.toString()){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function isElement(e){var t=getWindow(e).Element;return e instanceof t||e instanceof Element}function isHTMLElement(e){var t=getWindow(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function isShadowRoot(e){if("undefined"==typeof ShadowRoot)return!1;var t=getWindow(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}var m=Math.max,g=Math.min,h=Math.round;function getUAString(){var e=navigator.userAgentData;return null!=e&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(e){return e.brand+"/"+e.version}).join(" "):navigator.userAgent}function isLayoutViewport(){return!/^((?!chrome|android).)*safari/i.test(getUAString())}function getBoundingClientRect(e,t,n){void 0===t&&(t=!1),void 0===n&&(n=!1);var o=e.getBoundingClientRect(),r=1,i=1;t&&isHTMLElement(e)&&(r=e.offsetWidth>0&&h(o.width)/e.offsetWidth||1,i=e.offsetHeight>0&&h(o.height)/e.offsetHeight||1);var a=(isElement(e)?getWindow(e):window).visualViewport,s=!isLayoutViewport()&&n,l=(o.left+(s&&a?a.offsetLeft:0))/r,c=(o.top+(s&&a?a.offsetTop:0))/i,f=o.width/r,p=o.height/i;return{width:f,height:p,top:c,right:l+f,bottom:c+p,left:l,x:l,y:c}}function getWindowScroll(e){var t=getWindow(e);return{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function getNodeName(e){return e?(e.nodeName||"").toLowerCase():null}function getDocumentElement(e){return((isElement(e)?e.ownerDocument:e.document)||window.document).documentElement}function getWindowScrollBarX(e){return getBoundingClientRect(getDocumentElement(e)).left+getWindowScroll(e).scrollLeft}function getComputedStyle(e){return getWindow(e).getComputedStyle(e)}function isScrollParent(e){var t=getComputedStyle(e),n=t.overflow,o=t.overflowX,r=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+r+o)}function getLayoutRect(e){var t=getBoundingClientRect(e),n=e.offsetWidth,o=e.offsetHeight;return 1>=Math.abs(t.width-n)&&(n=t.width),1>=Math.abs(t.height-o)&&(o=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:o}}function getParentNode(e){return"html"===getNodeName(e)?e:e.assignedSlot||e.parentNode||(isShadowRoot(e)?e.host:null)||getDocumentElement(e)}function listScrollParents(e,t){void 0===t&&(t=[]);var n,o=function getScrollParent(e){return["html","body","#document"].indexOf(getNodeName(e))>=0?e.ownerDocument.body:isHTMLElement(e)&&isScrollParent(e)?e:getScrollParent(getParentNode(e))}(e),r=o===(null==(n=e.ownerDocument)?void 0:n.body),i=getWindow(o),a=r?[i].concat(i.visualViewport||[],isScrollParent(o)?o:[]):o,s=t.concat(a);return r?s:s.concat(listScrollParents(getParentNode(a)))}function getTrueOffsetParent(e){return isHTMLElement(e)&&"fixed"!==getComputedStyle(e).position?e.offsetParent:null}function getOffsetParent(e){for(var t=getWindow(e),n=getTrueOffsetParent(e);n&&["table","td","th"].indexOf(getNodeName(n))>=0&&"static"===getComputedStyle(n).position;)n=getTrueOffsetParent(n);return n&&("html"===getNodeName(n)||"body"===getNodeName(n)&&"static"===getComputedStyle(n).position)?t:n||function(e){var t=/firefox/i.test(getUAString());if(/Trident/i.test(getUAString())&&isHTMLElement(e)&&"fixed"===getComputedStyle(e).position)return null;var n=getParentNode(e);for(isShadowRoot(n)&&(n=n.host);isHTMLElement(n)&&0>["html","body"].indexOf(getNodeName(n));){var o=getComputedStyle(n);if("none"!==o.transform||"none"!==o.perspective||"paint"===o.contain||-1!==["transform","perspective"].indexOf(o.willChange)||t&&"filter"===o.willChange||t&&o.filter&&"none"!==o.filter)return n;n=n.parentNode}return null}(e)||t}var v="bottom",y="right",w="left",b="auto",x=["top",v,y,w],O="start",P="viewport",E="popper",S=x.reduce(function(e,t){return e.concat([t+"-"+O,t+"-end"])},[]),M=[].concat(x,[b]).reduce(function(e,t){return e.concat([t,t+"-"+O,t+"-end"])},[]),R=["beforeRead","read","afterRead","beforeMain","main","afterMain","beforeWrite","write","afterWrite"],T={placement:"bottom",modifiers:[],strategy:"absolute"};function areValidElements(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(e){return!(e&&"function"==typeof e.getBoundingClientRect)})}var C={passive:!0};function getBasePlacement(e){return e.split("-")[0]}function getVariation(e){return e.split("-")[1]}function getMainAxisFromPlacement(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function computeOffsets(e){var t,n=e.reference,o=e.element,r=e.placement,i=r?getBasePlacement(r):null,a=r?getVariation(r):null,s=n.x+n.width/2-o.width/2,l=n.y+n.height/2-o.height/2;switch(i){case"top":t={x:s,y:n.y-o.height};break;case v:t={x:s,y:n.y+n.height};break;case y:t={x:n.x+n.width,y:l};break;case w:t={x:n.x-o.width,y:l};break;default:t={x:n.x,y:n.y}}var c=i?getMainAxisFromPlacement(i):null;if(null!=c){var f="y"===c?"height":"width";switch(a){case O:t[c]=t[c]-(n[f]/2-o[f]/2);break;case"end":t[c]=t[c]+(n[f]/2-o[f]/2)}}return t}var j={top:"auto",right:"auto",bottom:"auto",left:"auto"};function mapToStyles(e){var t,n,o,r,i,a,s,l=e.popper,c=e.popperRect,f=e.placement,p=e.variation,u=e.offsets,d=e.position,m=e.gpuAcceleration,g=e.adaptive,b=e.roundOffsets,x=e.isFixed,O=u.x,P=void 0===O?0:O,E=u.y,S=void 0===E?0:E,M="function"==typeof b?b({x:P,y:S}):{x:P,y:S};P=M.x,S=M.y;var R=u.hasOwnProperty("x"),T=u.hasOwnProperty("y"),C=w,W="top",A=window;if(g){var B=getOffsetParent(l),D="clientHeight",L="clientWidth";B===getWindow(l)&&"static"!==getComputedStyle(B=getDocumentElement(l)).position&&"absolute"===d&&(D="scrollHeight",L="scrollWidth"),("top"===f||(f===w||f===y)&&"end"===p)&&(W=v,S-=(x&&B===A&&A.visualViewport?A.visualViewport.height:B[D])-c.height,S*=m?1:-1),(f===w||("top"===f||f===v)&&"end"===p)&&(C=y,P-=(x&&B===A&&A.visualViewport?A.visualViewport.width:B[L])-c.width,P*=m?1:-1)}var N=Object.assign({position:d},g&&j),Z=!0===b?(t={x:P,y:S},n=getWindow(l),o=t.x,r=t.y,{x:h(o*(i=n.devicePixelRatio||1))/i||0,y:h(r*i)/i||0}):{x:P,y:S};return(P=Z.x,S=Z.y,m)?Object.assign({},N,((s={})[W]=T?"0":"",s[C]=R?"0":"",s.transform=1>=(A.devicePixelRatio||1)?"translate("+P+"px, "+S+"px)":"translate3d("+P+"px, "+S+"px, 0)",s)):Object.assign({},N,((a={})[W]=T?S+"px":"",a[C]=R?P+"px":"",a.transform="",a))}var W={left:"right",right:"left",bottom:"top",top:"bottom"};function getOppositePlacement(e){return e.replace(/left|right|bottom|top/g,function(e){return W[e]})}var A={start:"end",end:"start"};function getOppositeVariationPlacement(e){return e.replace(/start|end/g,function(e){return A[e]})}function contains(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&isShadowRoot(n)){var o=t;do{if(o&&e.isSameNode(o))return!0;o=o.parentNode||o.host}while(o)}return!1}function rectToClientRect(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function getClientRectFromMixedType(e,t,n){var o,r,i,a,s,l,c,f,p,u;return t===P?rectToClientRect(function(e,t){var n=getWindow(e),o=getDocumentElement(e),r=n.visualViewport,i=o.clientWidth,a=o.clientHeight,s=0,l=0;if(r){i=r.width,a=r.height;var c=isLayoutViewport();(c||!c&&"fixed"===t)&&(s=r.offsetLeft,l=r.offsetTop)}return{width:i,height:a,x:s+getWindowScrollBarX(e),y:l}}(e,n)):isElement(t)?((o=getBoundingClientRect(t,!1,"fixed"===n)).top=o.top+t.clientTop,o.left=o.left+t.clientLeft,o.bottom=o.top+t.clientHeight,o.right=o.left+t.clientWidth,o.width=t.clientWidth,o.height=t.clientHeight,o.x=o.left,o.y=o.top,o):rectToClientRect((r=getDocumentElement(e),a=getDocumentElement(r),s=getWindowScroll(r),l=null==(i=r.ownerDocument)?void 0:i.body,c=m(a.scrollWidth,a.clientWidth,l?l.scrollWidth:0,l?l.clientWidth:0),f=m(a.scrollHeight,a.clientHeight,l?l.scrollHeight:0,l?l.clientHeight:0),p=-s.scrollLeft+getWindowScrollBarX(r),u=-s.scrollTop,"rtl"===getComputedStyle(l||a).direction&&(p+=m(a.clientWidth,l?l.clientWidth:0)-c),{width:c,height:f,x:p,y:u}))}function getFreshSideObject(){return{top:0,right:0,bottom:0,left:0}}function mergePaddingObject(e){return Object.assign({},getFreshSideObject(),e)}function expandToHashMap(e,t){return t.reduce(function(t,n){return t[n]=e,t},{})}function detectOverflow(e,t){void 0===t&&(t={});var n,o,r,i,a,s,l,c=t,f=c.placement,p=void 0===f?e.placement:f,u=c.strategy,d=void 0===u?e.strategy:u,h=c.boundary,w=c.rootBoundary,b=c.elementContext,O=void 0===b?E:b,S=c.altBoundary,M=c.padding,R=void 0===M?0:M,T=mergePaddingObject("number"!=typeof R?R:expandToHashMap(R,x)),C=e.rects.popper,j=e.elements[void 0!==S&&S?O===E?"reference":E:O],W=(n=isElement(j)?j:j.contextElement||getDocumentElement(e.elements.popper),s=(a=[].concat("clippingParents"===(o=void 0===h?"clippingParents":h)?(r=listScrollParents(getParentNode(n)),isElement(i=["absolute","fixed"].indexOf(getComputedStyle(n).position)>=0&&isHTMLElement(n)?getOffsetParent(n):n)?r.filter(function(e){return isElement(e)&&contains(e,i)&&"body"!==getNodeName(e)}):[]):[].concat(o),[void 0===w?P:w]))[0],(l=a.reduce(function(e,t){var o=getClientRectFromMixedType(n,t,d);return e.top=m(o.top,e.top),e.right=g(o.right,e.right),e.bottom=g(o.bottom,e.bottom),e.left=m(o.left,e.left),e},getClientRectFromMixedType(n,s,d))).width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l),A=getBoundingClientRect(e.elements.reference),B=computeOffsets({reference:A,element:C,strategy:"absolute",placement:p}),D=rectToClientRect(Object.assign({},C,B)),L=O===E?D:A,N={top:W.top-L.top+T.top,bottom:L.bottom-W.bottom+T.bottom,left:W.left-L.left+T.left,right:L.right-W.right+T.right},Z=e.modifiersData.offset;if(O===E&&Z){var H=Z[p];Object.keys(N).forEach(function(e){var t=[y,v].indexOf(e)>=0?1:-1,n=["top",v].indexOf(e)>=0?"y":"x";N[e]+=H[n]*t})}return N}function within(e,t,n){return m(e,g(t,n))}function getSideOffsets(e,t,n){return void 0===n&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function isAnySideFullyClipped(e){return["top",y,v,w].some(function(t){return e[t]>=0})}var B=(i=void 0===(r=(o={defaultModifiers:[{name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var t=e.state,n=e.instance,o=e.options,r=o.scroll,i=void 0===r||r,a=o.resize,s=void 0===a||a,l=getWindow(t.elements.popper),c=[].concat(t.scrollParents.reference,t.scrollParents.popper);return i&&c.forEach(function(e){e.addEventListener("scroll",n.update,C)}),s&&l.addEventListener("resize",n.update,C),function(){i&&c.forEach(function(e){e.removeEventListener("scroll",n.update,C)}),s&&l.removeEventListener("resize",n.update,C)}},data:{}},{name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,n=e.name;t.modifiersData[n]=computeOffsets({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},{name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,n=e.options,o=n.gpuAcceleration,r=n.adaptive,i=n.roundOffsets,a=void 0===i||i,s={placement:getBasePlacement(t.placement),variation:getVariation(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:void 0===o||o,isFixed:"fixed"===t.options.strategy};null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,mapToStyles(Object.assign({},s,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:void 0===r||r,roundOffsets:a})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,mapToStyles(Object.assign({},s,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:a})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}},{name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state;Object.keys(t.elements).forEach(function(e){var n=t.styles[e]||{},o=t.attributes[e]||{},r=t.elements[e];isHTMLElement(r)&&getNodeName(r)&&(Object.assign(r.style,n),Object.keys(o).forEach(function(e){var t=o[e];!1===t?r.removeAttribute(e):r.setAttribute(e,!0===t?"":t)}))})},effect:function(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(e){var o=t.elements[e],r=t.attributes[e]||{},i=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:n[e]).reduce(function(e,t){return e[t]="",e},{});isHTMLElement(o)&&getNodeName(o)&&(Object.assign(o.style,i),Object.keys(r).forEach(function(e){o.removeAttribute(e)}))})}},requires:["computeStyles"]},{name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,n=e.options,o=e.name,r=n.offset,i=void 0===r?[0,0]:r,a=M.reduce(function(e,n){var o,r,a,s,l,c;return e[n]=(o=t.rects,a=[w,"top"].indexOf(r=getBasePlacement(n))>=0?-1:1,l=(s="function"==typeof i?i(Object.assign({},o,{placement:n})):i)[0],c=s[1],l=l||0,c=(c||0)*a,[w,y].indexOf(r)>=0?{x:c,y:l}:{x:l,y:c}),e},{}),s=a[t.placement],l=s.x,c=s.y;null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=l,t.modifiersData.popperOffsets.y+=c),t.modifiersData[o]=a}},{name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,o=e.name;if(!t.modifiersData[o]._skip){for(var r=n.mainAxis,i=void 0===r||r,a=n.altAxis,s=void 0===a||a,l=n.fallbackPlacements,c=n.padding,f=n.boundary,p=n.rootBoundary,u=n.altBoundary,d=n.flipVariations,m=void 0===d||d,g=n.allowedAutoPlacements,h=t.options.placement,P=getBasePlacement(h)===h,E=l||(P||!m?[getOppositePlacement(h)]:function(e){if(getBasePlacement(e)===b)return[];var t=getOppositePlacement(e);return[getOppositeVariationPlacement(e),t,getOppositeVariationPlacement(t)]}(h)),R=[h].concat(E).reduce(function(e,n){var o,r,i,a,s,l,u,d,h,v,y,w;return e.concat(getBasePlacement(n)===b?(r=(o={placement:n,boundary:f,rootBoundary:p,padding:c,flipVariations:m,allowedAutoPlacements:g}).placement,i=o.boundary,a=o.rootBoundary,s=o.padding,l=o.flipVariations,d=void 0===(u=o.allowedAutoPlacements)?M:u,0===(y=(v=(h=getVariation(r))?l?S:S.filter(function(e){return getVariation(e)===h}):x).filter(function(e){return d.indexOf(e)>=0})).length&&(y=v),Object.keys(w=y.reduce(function(e,n){return e[n]=detectOverflow(t,{placement:n,boundary:i,rootBoundary:a,padding:s})[getBasePlacement(n)],e},{})).sort(function(e,t){return w[e]-w[t]})):n)},[]),T=t.rects.reference,C=t.rects.popper,j=new Map,W=!0,A=R[0],B=0;B<R.length;B++){var D=R[B],L=getBasePlacement(D),N=getVariation(D)===O,Z=["top",v].indexOf(L)>=0,H=Z?"width":"height",k=detectOverflow(t,{placement:D,boundary:f,rootBoundary:p,altBoundary:u,padding:c}),V=Z?N?y:w:N?v:"top";T[H]>C[H]&&(V=getOppositePlacement(V));var F=getOppositePlacement(V),_=[];if(i&&_.push(k[L]<=0),s&&_.push(k[V]<=0,k[F]<=0),_.every(function(e){return e})){A=D,W=!1;break}j.set(D,_)}if(W)for(var U=m?3:1,_loop=function(e){var t=R.find(function(t){var n=j.get(t);if(n)return n.slice(0,e).every(function(e){return e})});if(t)return A=t,"break"},q=U;q>0&&"break"!==_loop(q);q--);t.placement!==A&&(t.modifiersData[o]._skip=!0,t.placement=A,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}},{name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,o=e.name,r=n.mainAxis,i=n.altAxis,a=n.boundary,s=n.rootBoundary,l=n.altBoundary,c=n.padding,f=n.tether,p=void 0===f||f,u=n.tetherOffset,d=void 0===u?0:u,h=detectOverflow(t,{boundary:a,rootBoundary:s,padding:c,altBoundary:l}),b=getBasePlacement(t.placement),x=getVariation(t.placement),P=!x,E=getMainAxisFromPlacement(b),S="x"===E?"y":"x",M=t.modifiersData.popperOffsets,R=t.rects.reference,T=t.rects.popper,C="function"==typeof d?d(Object.assign({},t.rects,{placement:t.placement})):d,j="number"==typeof C?{mainAxis:C,altAxis:C}:Object.assign({mainAxis:0,altAxis:0},C),W=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,A={x:0,y:0};if(M){if(void 0===r||r){var B,D="y"===E?"top":w,L="y"===E?v:y,N="y"===E?"height":"width",Z=M[E],H=Z+h[D],k=Z-h[L],V=p?-T[N]/2:0,F=x===O?R[N]:T[N],_=x===O?-T[N]:-R[N],U=t.elements.arrow,q=p&&U?getLayoutRect(U):{width:0,height:0},I=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:getFreshSideObject(),X=I[D],z=I[L],Y=within(0,R[N],q[N]),G=P?R[N]/2-V-Y-X-j.mainAxis:F-Y-X-j.mainAxis,J=P?-R[N]/2+V+Y+z+j.mainAxis:_+Y+z+j.mainAxis,K=t.elements.arrow&&getOffsetParent(t.elements.arrow),Q=K?"y"===E?K.clientTop||0:K.clientLeft||0:0,$=null!=(B=null==W?void 0:W[E])?B:0,ee=Z+G-$-Q,et=Z+J-$,en=within(p?g(H,ee):H,Z,p?m(k,et):k);M[E]=en,A[E]=en-Z}if(void 0!==i&&i){var eo,er,ei="x"===E?"top":w,ea="x"===E?v:y,es=M[S],el="y"===S?"height":"width",ec=es+h[ei],ef=es-h[ea],ep=-1!==["top",w].indexOf(b),eu=null!=(er=null==W?void 0:W[S])?er:0,ed=ep?ec:es-R[el]-T[el]-eu+j.altAxis,em=ep?es+R[el]+T[el]-eu-j.altAxis:ef,eg=p&&ep?(eo=within(ed,es,em))>em?em:eo:within(p?ed:ec,es,p?em:ef);M[S]=eg,A[S]=eg-es}t.modifiersData[o]=A}},requiresIfExists:["offset"]},{name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,n,o=e.state,r=e.name,i=e.options,a=o.elements.arrow,s=o.modifiersData.popperOffsets,l=getBasePlacement(o.placement),c=getMainAxisFromPlacement(l),f=[w,y].indexOf(l)>=0?"height":"width";if(a&&s){var p=mergePaddingObject("number"!=typeof(t="function"==typeof(t=i.padding)?t(Object.assign({},o.rects,{placement:o.placement})):t)?t:expandToHashMap(t,x)),u=getLayoutRect(a),d="y"===c?"top":w,m="y"===c?v:y,g=o.rects.reference[f]+o.rects.reference[c]-s[c]-o.rects.popper[f],h=s[c]-o.rects.reference[c],b=getOffsetParent(a),O=b?"y"===c?b.clientHeight||0:b.clientWidth||0:0,P=p[d],E=O-u[f]-p[m],S=O/2-u[f]/2+(g/2-h/2),M=within(P,S,E);o.modifiersData[r]=((n={})[c]=M,n.centerOffset=M-S,n)}},effect:function(e){var t=e.state,n=e.options.element,o=void 0===n?"[data-popper-arrow]":n;null!=o&&("string"!=typeof o||(o=t.elements.popper.querySelector(o)))&&contains(t.elements.popper,o)&&(t.elements.arrow=o)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]},{name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,n=e.name,o=t.rects.reference,r=t.rects.popper,i=t.modifiersData.preventOverflow,a=detectOverflow(t,{elementContext:"reference"}),s=detectOverflow(t,{altBoundary:!0}),l=getSideOffsets(a,o),c=getSideOffsets(s,r,i),f=isAnySideFullyClipped(l),p=isAnySideFullyClipped(c);t.modifiersData[n]={referenceClippingOffsets:l,popperEscapeOffsets:c,isReferenceHidden:f,hasPopperEscaped:p},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":f,"data-popper-escaped":p})}}]}).defaultModifiers)?[]:r,s=void 0===(a=o.defaultOptions)?T:a,function(e,t,n){void 0===n&&(n=s);var o,r={placement:"bottom",orderedModifiers:[],options:Object.assign({},T,s),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},a=[],l=!1,c={state:r,setOptions:function(n){var o,l,f,p,u,d="function"==typeof n?n(r.options):n;cleanupModifierEffects(),r.options=Object.assign({},s,r.options,d),r.scrollParents={reference:isElement(e)?listScrollParents(e):e.contextElement?listScrollParents(e.contextElement):[],popper:listScrollParents(t)};var m=(l=Object.keys(o=[].concat(i,r.options.modifiers).reduce(function(e,t){var n=e[t.name];return e[t.name]=n?Object.assign({},n,t,{options:Object.assign({},n.options,t.options),data:Object.assign({},n.data,t.data)}):t,e},{})).map(function(e){return o[e]}),f=new Map,p=new Set,u=[],l.forEach(function(e){f.set(e.name,e)}),l.forEach(function(e){p.has(e.name)||function sort(e){p.add(e.name),[].concat(e.requires||[],e.requiresIfExists||[]).forEach(function(e){if(!p.has(e)){var t=f.get(e);t&&sort(t)}}),u.push(e)}(e)}),R.reduce(function(e,t){return e.concat(u.filter(function(e){return e.phase===t}))},[]));return r.orderedModifiers=m.filter(function(e){return e.enabled}),r.orderedModifiers.forEach(function(e){var t=e.name,n=e.options,o=e.effect;if("function"==typeof o){var i=o({state:r,name:t,instance:c,options:void 0===n?{}:n});a.push(i||function(){})}}),c.update()},forceUpdate:function(){if(!l){var e,t,n,o,i,a,s,f,p,u,d,m,g=r.elements,v=g.reference,y=g.popper;if(areValidElements(v,y)){r.rects={reference:(t=getOffsetParent(y),n="fixed"===r.options.strategy,o=isHTMLElement(t),f=isHTMLElement(t)&&(a=h((i=t.getBoundingClientRect()).width)/t.offsetWidth||1,s=h(i.height)/t.offsetHeight||1,1!==a||1!==s),p=getDocumentElement(t),u=getBoundingClientRect(v,f,n),d={scrollLeft:0,scrollTop:0},m={x:0,y:0},(o||!o&&!n)&&(("body"!==getNodeName(t)||isScrollParent(p))&&(d=(e=t)!==getWindow(e)&&isHTMLElement(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:getWindowScroll(e)),isHTMLElement(t)?(m=getBoundingClientRect(t,!0),m.x+=t.clientLeft,m.y+=t.clientTop):p&&(m.x=getWindowScrollBarX(p))),{x:u.left+d.scrollLeft-m.x,y:u.top+d.scrollTop-m.y,width:u.width,height:u.height}),popper:getLayoutRect(y)},r.reset=!1,r.placement=r.options.placement,r.orderedModifiers.forEach(function(e){return r.modifiersData[e.name]=Object.assign({},e.data)});for(var w=0;w<r.orderedModifiers.length;w++){if(!0===r.reset){r.reset=!1,w=-1;continue}var b=r.orderedModifiers[w],x=b.fn,O=b.options,P=void 0===O?{}:O,E=b.name;"function"==typeof x&&(r=x({state:r,options:P,name:E,instance:c})||r)}}}},update:function(){return o||(o=new Promise(function(e){Promise.resolve().then(function(){o=void 0,e(new Promise(function(e){c.forceUpdate(),e(r)}))})})),o},destroy:function(){cleanupModifierEffects(),l=!0}};if(!areValidElements(e,t))return c;function cleanupModifierEffects(){a.forEach(function(e){return e()}),a=[]}return c.setOptions(n).then(function(e){!l&&n.onFirstUpdate&&n.onFirstUpdate(e)}),c}),D=n(95600),L=n(57379),N=n(25702);function getPopperUtilityClass(e){return(0,N.Z)("MuiPopper",e)}(0,n(26520).Z)("MuiPopper",["root"]);var Z=n(94269),H=n(57437);let k=f.createContext({disableDefaultClasses:!1}),V=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],F=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function resolveAnchorEl(e){return"function"==typeof e?e():e}let useUtilityClasses=()=>(0,D.Z)({root:["root"]},function(e){let{disableDefaultClasses:t}=f.useContext(k);return n=>t?"":e(n)}(getPopperUtilityClass)),_={},U=f.forwardRef(function(e,t){var n;let{anchorEl:o,children:r,direction:i,disablePortal:a,modifiers:s,open:d,placement:m,popperOptions:g,popperRef:h,slotProps:v={},slots:y={},TransitionProps:w}=e,b=(0,c.Z)(e,V),x=f.useRef(null),O=(0,p.Z)(x,t),P=f.useRef(null),E=(0,p.Z)(P,h),S=f.useRef(E);(0,u.Z)(()=>{S.current=E},[E]),f.useImperativeHandle(h,()=>P.current,[]);let M=function(e,t){if("ltr"===t)return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}(m,i),[R,T]=f.useState(M),[C,j]=f.useState(resolveAnchorEl(o));f.useEffect(()=>{P.current&&P.current.forceUpdate()}),f.useEffect(()=>{o&&j(resolveAnchorEl(o))},[o]),(0,u.Z)(()=>{if(!C||!d)return;let handlePopperUpdate=e=>{T(e.placement)},e=[{name:"preventOverflow",options:{altBoundary:a}},{name:"flip",options:{altBoundary:a}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:e})=>{handlePopperUpdate(e)}}];null!=s&&(e=e.concat(s)),g&&null!=g.modifiers&&(e=e.concat(g.modifiers));let t=B(C,x.current,(0,l.Z)({placement:M},g,{modifiers:e}));return S.current(t),()=>{t.destroy(),S.current(null)}},[C,a,s,d,g,M]);let W={placement:R};null!==w&&(W.TransitionProps=w);let A=useUtilityClasses(),D=null!=(n=y.root)?n:"div",L=(0,Z.y)({elementType:D,externalSlotProps:v.root,externalForwardedProps:b,additionalProps:{role:"tooltip",ref:O},ownerState:e,className:A.root});return(0,H.jsx)(D,(0,l.Z)({},L,{children:"function"==typeof r?r(W):r}))}),q=f.forwardRef(function(e,t){let n;let{anchorEl:o,children:r,container:i,direction:a="ltr",disablePortal:s=!1,keepMounted:p=!1,modifiers:u,open:m,placement:g="bottom",popperOptions:h=_,popperRef:v,style:y,transition:w=!1,slotProps:b={},slots:x={}}=e,O=(0,c.Z)(e,F),[P,E]=f.useState(!0);if(!p&&!m&&(!w||P))return null;if(i)n=i;else if(o){let e=resolveAnchorEl(o);n=e&&void 0!==e.nodeType?(0,d.Z)(e).body:(0,d.Z)(null).body}let S=!m&&p&&(!w||P)?"none":void 0;return(0,H.jsx)(L.h,{disablePortal:s,container:n,children:(0,H.jsx)(U,(0,l.Z)({anchorEl:o,direction:a,disablePortal:s,modifiers:u,ref:t,open:w?!P:m,placement:g,popperOptions:h,popperRef:v,slotProps:b,slots:x},O,{style:(0,l.Z)({position:"fixed",top:0,left:0,display:S},y),TransitionProps:w?{in:m,onEnter:()=>{E(!1)},onExited:()=>{E(!0)}}:void 0,children:r}))})});var I=n(44809),X=n(35843),z=n(87927);let Y=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],G=(0,X.ZP)(q,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),J=f.forwardRef(function(e,t){var n;let o=(0,I.Z)(),r=(0,z.Z)({props:e,name:"MuiPopper"}),{anchorEl:i,component:a,components:s,componentsProps:f,container:p,disablePortal:u,keepMounted:d,modifiers:m,open:g,placement:h,popperOptions:v,popperRef:y,transition:w,slots:b,slotProps:x}=r,O=(0,c.Z)(r,Y),P=null!=(n=null==b?void 0:b.root)?n:null==s?void 0:s.Root,E=(0,l.Z)({anchorEl:i,container:p,disablePortal:u,keepMounted:d,modifiers:m,open:g,placement:h,popperOptions:v,popperRef:y,transition:w},O);return(0,H.jsx)(G,(0,l.Z)({as:a,direction:null==o?void 0:o.direction,slots:{root:P},slotProps:null!=x?x:f},E,{ref:t}))});var K=J},43135:function(e,t,n){"use strict";n.r(t),n.d(t,{capitalize:function(){return r.Z},createChainedFunction:function(){return i},createSvgIcon:function(){return a.Z},debounce:function(){return s.Z},deprecatedPropType:function(){return utils_deprecatedPropType},isMuiElement:function(){return l.Z},ownerDocument:function(){return c.Z},ownerWindow:function(){return f.Z},requirePropFactory:function(){return utils_requirePropFactory},setRef:function(){return p},unstable_ClassNameGenerator:function(){return y},unstable_useEnhancedEffect:function(){return u.Z},unstable_useId:function(){return d.Z},unsupportedProp:function(){return utils_unsupportedProp},useControlled:function(){return m.Z},useEventCallback:function(){return g.Z},useForkRef:function(){return h.Z},useIsFocusVisible:function(){return v.Z}});var o=n(25097),r=n(28702),i=n(62940).Z,a=n(59782),s=n(80494),utils_deprecatedPropType=function(e,t){return()=>null},l=n(10673),c=n(53931),f=n(26649);n(13428);var utils_requirePropFactory=function(e,t){return()=>null},p=n(13840).Z,u=n(88519),d=n(62916),utils_unsupportedProp=function(e,t,n,o,r){return null},m=n(73292),g=n(96),h=n(37663),v=n(53308);let y={configure:e=>{o.Z.configure(e)}}},26314:function(e){e.exports=function(e){return e&&e.__esModule?e:{default:e}},e.exports.__esModule=!0,e.exports.default=e.exports}}]);