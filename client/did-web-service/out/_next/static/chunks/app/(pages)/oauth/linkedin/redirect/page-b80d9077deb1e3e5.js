(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4638],{57139:function(n,t,i){Promise.resolve().then(i.bind(i,10917))},10917:function(n,t,i){"use strict";i.r(t),i.d(t,{default:function(){return page}});var e=i(57437),a=i(4778),o=i(73052),r=i(40471),u=i(63491),l=i(60230),s=i(36079),c=i(29748),g=i(91395),d=i(23965),f=i(11059);function _templateObject(){let n=(0,l._)(["\n        mutation OauthLinkedinSignIn($input: LinkedinSignInInput!) {\n          oauthLinkedinSignIn(input: $input) { accessToken refreshToken }\n        }\n      "]);return _templateObject=function(){return n},n}function _templateObject1(){let n=(0,l._)(["\n        mutation OauthLinkedBindEmail($input: LinkedinBindEmailInput!) {\n          oauthLinkedBindEmail(input: $input)\n        }\n      "]);return _templateObject1=function(){return n},n}async function oauthLinkedinSignIn(n){s.k.log("user","oauth Linkedin sign in.");let t={code:n},i=await (0,c.Pt)(async()=>(await (0,g.W)()).mutate({mutation:(0,d.Ps)(_templateObject()),variables:{input:t}}));if(null==i||!i.data||!i.data.oauthLinkedinSignIn)return s.k.error("user","failed to oauth Linkedin sign in."),null;{let{accessToken:n,refreshToken:t}=i.data.oauthLinkedinSignIn;return(0,f.vz)(n,t)}}async function oauthLinkedinBindEmail(n){s.k.log("user","oauth Linkedin bind email.");let t={code:n},i=await (0,c.Pt)(async()=>(await (0,g.W)()).mutate({mutation:(0,d.Ps)(_templateObject1()),variables:{input:t}}));return(null==i?void 0:i.data)&&i.data.oauthLinkedBindEmail?(s.k.log("user","Oauth Linkedin email bound successfully"),!0):(s.k.error("user","failed to oauth Linkedin bind email."),!1)}var h=i(24033),p=i(2265),page=()=>{let n=(0,h.useRouter)(),t=(0,h.useSearchParams)(),i=t.get("code"),{navigateToPostSignInLandingPage:l}=(0,u.vX)();return(0,p.useEffect)(()=>{if(!i){alert("GoogleRedirect: No code from Linked authentication callback.");return}let t=(0,u.Kt)();switch(t){case u.cX.OnBoardingEmailBinding:oauthLinkedinBindEmail(i).then(t=>{t?n.push("/account/security"):((0,u.fK)(),n.push("/account/security?error=unknown"))}).catch(t=>{t&&t instanceof a.E?((0,u.fK)(),n.push("/account/security?error=emailExists")):((0,u.fK)(),n.push("/account/security?error=unknown"))});break;case u.cX.EmailSignIn:oauthLinkedinSignIn(i).then(t=>{t?((0,u.fK)(),l()):((0,u.fK)(),n.push("/signin?error=unknownLinkedin"))}).catch(t=>{t instanceof o.h&&((0,u.fK)(),n.push("/signin?error=oauthLinkedinEmailNotExists"))});break;default:alert("Invalid operation, please try again.");return}},[i,n]),(0,e.jsx)("div",{className:"col-span-full",children:(0,e.jsxs)("div",{className:"flex flex-col w-full",children:[(0,e.jsx)("div",{className:"italic",children:"Checking authentication, hold on..."}),(0,e.jsx)(r.Z,{})]})})}},63491:function(n,t,i){"use strict";i.d(t,{$Y:function(){return setOnGoingFlowOperation},Ad:function(){return clearPostSignInUrl},Kt:function(){return getOnGoingFlowOperation},cX:function(){return a},fK:function(){return clearOnGoingFlowOperation},qC:function(){return setPostSignInUrl},vX:function(){return usePostSignInFlow}});var e,a,o=i(92e3),r=i(36079);(e=a||(a={}))[e.OnBoardingEmailBinding=0]="OnBoardingEmailBinding",e[e.OnBoardingBrowserBinding=1]="OnBoardingBrowserBinding",e[e.EmailSignIn=2]="EmailSignIn";let u="ongoingflowoperation",l="postsigninurl";function getOnGoingFlowOperation(){return a[localStorage.getItem(u)]}function setOnGoingFlowOperation(n){localStorage.setItem(u,a[n])}function clearOnGoingFlowOperation(){localStorage.removeItem(u)}function setPostSignInUrl(n){r.k.log("flow","Setting post sign in url to:",n),localStorage.setItem(l,n)}function clearPostSignInUrl(){r.k.log("flow","Clearing post sign in url"),localStorage.removeItem(l)}function usePostSignInFlow(){let n=(0,o.useRouter)();return{navigateToPostSignInLandingPage(t){let i=localStorage.getItem(l);if(i)r.k.log("flow","Navigating to post sign in landing page:",i),n.replace(i),clearPostSignInUrl();else{let i=t||"/dashboard";r.k.log("flow","Navigating to post sign in landing page ".concat(i)),n.push(i)}}}}}},function(n){n.O(0,[6990,9787,9443,8218,3988,395,8321,3824,6642,1396,2e3,5361,3262,2971,7864,1744],function(){return n(n.s=57139)}),_N_E=n.O()}]);