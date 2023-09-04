export enum FlowOperation {
  OnBoardingEmailBinding = 0, // We are binding user's email during the initial user creation on boarding
  OnBoardingBrowserBinding = 1, // We are binding the browser (passkey) during the initial user creation on boarding
  EmailSignIn = 2, // We are signing in with an email address (oauth, magic link)

}

const ONGOING_FLOW_OPERATION = 'ongoingflowoperation';

export function getOnGoingFlowOperation(): FlowOperation {
  return FlowOperation[localStorage.getItem(ONGOING_FLOW_OPERATION) as keyof typeof FlowOperation];
}

export function setOnGoingFlowOperation(operation: FlowOperation): void {
  localStorage.setItem(ONGOING_FLOW_OPERATION, FlowOperation[operation]);
}

export function clearOnGoingFlowOperation(): void {
  localStorage.removeItem(ONGOING_FLOW_OPERATION);
}