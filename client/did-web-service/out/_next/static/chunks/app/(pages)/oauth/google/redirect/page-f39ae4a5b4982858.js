(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2919],{5254:function(n,t,e){Promise.resolve().then(e.bind(e,76414))},76414:function(n,t,e){"use strict";e.r(t),e.d(t,{default:function(){return E}});var o=e(57437),i=e(4778),a=e(73052),r=e(40471),u=e(63491),l=e(60230),c=e(36079),s=e(29748),g=e(91395),f=e(23965),d=e(11059);function h(){let n=(0,l._)(["\n        mutation OauthGoogleSignIn($input: GoogleSignInInput!) {\n          oauthGoogleSignIn(input: $input) { accessToken refreshToken }\n        }\n      "]);return h=function(){return n},n}function m(){let n=(0,l._)(["\n        mutation OauthGoogleBindEmail($input: GoogleBindEmailInput!) {\n          oauthGoogleBindEmail(input: $input)\n        }\n      "]);return m=function(){return n},n}async function p(n){c.k.log("user","oauth Google sign in.");let t={code:n},e=await (0,s.Pt)(async()=>(await (0,g.W)()).mutate({mutation:(0,f.Ps)(h()),variables:{input:t}}));if(null==e||!e.data||!e.data.oauthGoogleSignIn)return c.k.error("user","failed to oauth Google sign in."),null;{let{accessToken:n,refreshToken:t}=e.data.oauthGoogleSignIn;return(0,d.vz)(n,t)}}async function k(n){c.k.log("user","oauth Google bind email.");let t={code:n},e=await (0,s.Pt)(async()=>(await (0,g.W)()).mutate({mutation:(0,f.Ps)(m()),variables:{input:t}}));return(null==e?void 0:e.data)&&e.data.oauthGoogleBindEmail?(c.k.log("user","Oauth Google email bound successfully"),!0):(c.k.error("user","failed to oauth Google bind email."),!1)}var v=e(24033),w=e(2265),E=()=>{let n=(0,v.useRouter)(),t=(0,v.useSearchParams)(),e=t.get("code"),{navigateToPostSignInLandingPage:l}=(0,u.vX)();return(0,w.useEffect)(()=>{if(!e){alert("GoogleRedirect: No code from Google authentication callback.");return}let t=(0,u.Kt)();switch(t){case u.cX.OnBoardingEmailBinding:k(e).then(t=>{t?n.push("/account/security"):((0,u.fK)(),n.push("/account/security?error=unknown"))}).catch(t=>{t&&t instanceof i.E?((0,u.fK)(),n.push("/account/security?error=emailExists")):((0,u.fK)(),n.push("/account/security?error=unknown"))});break;case u.cX.EmailSignIn:p(e).then(t=>{t?((0,u.fK)(),l()):((0,u.fK)(),n.push("/signin?error=unknownGoogle"))}).catch(t=>{t instanceof a.h&&((0,u.fK)(),n.push("/signin?error=oauthGoogleEmailNotExists"))});break;default:alert("Invalid operation, please try again.");return}},[e,n]),(0,o.jsx)("div",{className:"col-span-full",children:(0,o.jsxs)("div",{className:"flex flex-col w-full",children:[(0,o.jsx)("div",{className:"italic",children:"Checking authentication, hold on..."}),(0,o.jsx)(r.Z,{})]})})}},63491:function(n,t,e){"use strict";e.d(t,{$Y:function(){return s},Ad:function(){return d},Kt:function(){return c},cX:function(){return i},fK:function(){return g},qC:function(){return f},vX:function(){return h}});var o,i,a=e(92e3),r=e(36079);(o=i||(i={}))[o.OnBoardingEmailBinding=0]="OnBoardingEmailBinding",o[o.OnBoardingBrowserBinding=1]="OnBoardingBrowserBinding",o[o.EmailSignIn=2]="EmailSignIn";let u="ongoingflowoperation",l="postsigninurl";function c(){return i[localStorage.getItem(u)]}function s(n){localStorage.setItem(u,i[n])}function g(){localStorage.removeItem(u)}function f(n){r.k.log("flow","Setting post sign in url to:",n),localStorage.setItem(l,n)}function d(){r.k.log("flow","Clearing post sign in url"),localStorage.removeItem(l)}function h(){let n=(0,a.useRouter)();return{navigateToPostSignInLandingPage(t){let e=localStorage.getItem(l);if(e)r.k.log("flow","Navigating to post sign in landing page:",e),n.replace(e),d();else{let e=t||"/dashboard";r.k.log("flow","Navigating to post sign in landing page ".concat(e)),n.replace(e)}}}}}},function(n){n.O(0,[6990,9787,9443,8218,3988,395,8321,9152,1396,2e3,471,3262,2971,7864,1744],function(){return n(n.s=5254)}),_N_E=n.O()}]);