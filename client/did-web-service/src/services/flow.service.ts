import { useRouter } from "next13-progressbar";
//import { useRouter } from "next/navigation";
import { logger } from "./logger";

export enum FlowOperation {
  OnBoardingEmailBinding = 0, // We are binding user's email during the initial user creation on boarding
  OnBoardingBrowserBinding = 1, // We are binding the browser (passkey) during the initial user creation on boarding
  EmailSignIn = 2 // We are signing in with an email address (oauth, magic link)
}

const ONGOING_FLOW_OPERATION = 'ongoingflowoperation';
const POST_SIGN_IN_URL = 'postsigninurl';

export function getOnGoingFlowOperation(): FlowOperation {
  return FlowOperation[localStorage.getItem(ONGOING_FLOW_OPERATION) as keyof typeof FlowOperation];
}

/**
 * Remembers the on going operation, in local storage. This is helpful to know what we were
 * doing when coming back from redirections, so we can continue.
 */
export function setOnGoingFlowOperation(operation: FlowOperation): void {
  localStorage.setItem(ONGOING_FLOW_OPERATION, FlowOperation[operation]);
}

export function clearOnGoingFlowOperation(): void {
  localStorage.removeItem(ONGOING_FLOW_OPERATION);
}

/**
 * Remembers a url where user should be sent to at the end of the sign up/sign in flow.
 * Useful to make sure user returns to the original "intent" request from a dapp for example,
 * while he had to first sign up.
 */
export function setPostSignInUrl(url: string): void {
  logger.log("flow", "Setting post sign in url to:", url);
  localStorage.setItem(POST_SIGN_IN_URL, url);
}

export function getPostSignInUrl(): string {
  return localStorage.getItem(POST_SIGN_IN_URL);
}

export function clearPostSignInUrl(): void {
  logger.log("flow", "Clearing post sign in url");
  localStorage.removeItem(POST_SIGN_IN_URL);
}

/**
 * Hook to redirect the user to the right page after signing in.
 * Usually, this wil lbe the dashboard. But in case there is a post sign in url defined,
 * then the user is sent back to that url.
 */
export function usePostSignInFlow(): { navigateToPostSignInLandingPage: (defaultLanding?: string) => void } {
  const router = useRouter();

  return {
    navigateToPostSignInLandingPage(defaultLanding?: string): void {
      const postSignInUrl = getPostSignInUrl();
      if (postSignInUrl) {
        logger.log("flow", "Navigating to post sign in landing page:", postSignInUrl);
        router.replace(postSignInUrl);
        clearPostSignInUrl();
      }
      else {
        const targetPage = defaultLanding || "/dashboard";
        logger.log("flow", `Navigating to post sign in landing page ${targetPage}`);
        router.replace(targetPage);
      }
    }
  }
}