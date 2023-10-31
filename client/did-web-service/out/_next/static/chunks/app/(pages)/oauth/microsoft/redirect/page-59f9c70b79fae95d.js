(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1716],{54611:function(n,t,e){Promise.resolve().then(e.bind(e,64098))},64098:function(n,t,e){"use strict";e.r(t),e.d(t,{default:function(){return page}});var i=e(57437),a=e(4778),o=e(73052),r=e(40471),u=e(63491),l=e(60230),s=e(36079),c=e(29748),g=e(91395),f=e(23965),d=e(11059);function _templateObject(){let n=(0,l._)(["\n        mutation OauthMSSignIn($input: MsSignInInput!) {\n          oauthMSSignIn(input: $input) { accessToken refreshToken }\n        }\n      "]);return _templateObject=function(){return n},n}function _templateObject1(){let n=(0,l._)(["\n        mutation OauthMSBindEmail($input: MsBindEmailInput!) {\n          oauthMSBindEmail(input: $input)\n        }\n      "]);return _templateObject1=function(){return n},n}async function oauthMSSignIn(n){s.k.log("user","oauth MS sign in.");let t={code:n},e=await (0,c.Pt)(async()=>(await (0,g.W)()).mutate({mutation:(0,f.Ps)(_templateObject()),variables:{input:t}}));if(null==e||!e.data||!e.data.oauthMSSignIn)return s.k.error("user","failed to oauth MS sign in."),null;{let{accessToken:n,refreshToken:t}=e.data.oauthMSSignIn;return(0,d.vz)(n,t)}}async function oauthMSBindEmail(n){s.k.log("user","oauth MS bind email.");let t={code:n},e=await (0,c.Pt)(async()=>(await (0,g.W)()).mutate({mutation:(0,f.Ps)(_templateObject1()),variables:{input:t}}));return(null==e?void 0:e.data)&&e.data.oauthMSBindEmail?(s.k.log("user","Oauth MS email bound successfully"),!0):(s.k.error("user","failed to oauth MS bind email."),!1)}var h=e(24033),p=e(2265),page=()=>{let n=(0,h.useRouter)(),t=(0,h.useSearchParams)(),e=t.get("code"),{navigateToPostSignInLandingPage:l}=(0,u.vX)(),s=!1;return(0,p.useEffect)(()=>{if(s)return;if(s=!0,!e){alert("MicrosoftRedirect: No code from Microsoft authentication callback.");return}let t=(0,u.Kt)();switch(t){case u.cX.OnBoardingEmailBinding:oauthMSBindEmail(e).then(t=>{t?n.push("/account/security"):((0,u.fK)(),n.push("/account/security?error=unknown"))}).catch(t=>{t&&t instanceof a.E?((0,u.fK)(),n.push("/account/security?error=emailExists")):((0,u.fK)(),n.push("/account/security?error=unknown"))});break;case u.cX.EmailSignIn:oauthMSSignIn(e).then(t=>{t?((0,u.fK)(),l()):((0,u.fK)(),n.push("/signin?error=unknown"))}).catch(t=>{t instanceof o.h&&((0,u.fK)(),n.push("/signin?error=oauthEmailNotExists"))});break;default:alert("Invalid operation, please try again.");return}},[e,n]),(0,i.jsx)("div",{className:"col-span-full",children:(0,i.jsxs)("div",{className:"flex flex-col w-full",children:[(0,i.jsx)("div",{className:"italic",children:"Checking authentication, hold on..."}),(0,i.jsx)(r.Z,{})]})})}},63491:function(n,t,e){"use strict";e.d(t,{$Y:function(){return setOnGoingFlowOperation},Ad:function(){return clearPostSignInUrl},Kt:function(){return getOnGoingFlowOperation},cX:function(){return a},fK:function(){return clearOnGoingFlowOperation},qC:function(){return setPostSignInUrl},vX:function(){return usePostSignInFlow}});var i,a,o=e(92e3),r=e(36079);(i=a||(a={}))[i.OnBoardingEmailBinding=0]="OnBoardingEmailBinding",i[i.OnBoardingBrowserBinding=1]="OnBoardingBrowserBinding",i[i.EmailSignIn=2]="EmailSignIn";let u="ongoingflowoperation",l="postsigninurl";function getOnGoingFlowOperation(){return a[localStorage.getItem(u)]}function setOnGoingFlowOperation(n){localStorage.setItem(u,a[n])}function clearOnGoingFlowOperation(){localStorage.removeItem(u)}function setPostSignInUrl(n){r.k.log("flow","Setting post sign in url to:",n),localStorage.setItem(l,n)}function clearPostSignInUrl(){r.k.log("flow","Clearing post sign in url"),localStorage.removeItem(l)}function usePostSignInFlow(){let n=(0,o.useRouter)();return{navigateToPostSignInLandingPage(t){let e=localStorage.getItem(l);if(e)r.k.log("flow","Navigating to post sign in landing page:",e),n.replace(e),clearPostSignInUrl();else{let e=t||"/dashboard";r.k.log("flow","Navigating to post sign in landing page ".concat(e)),n.push(e)}}}}}},function(n){n.O(0,[6990,9787,9443,8218,3988,395,6506,3824,1711,1396,2e3,2643,7056,2971,7864,1744],function(){return n(n.s=54611)}),_N_E=n.O()}]);