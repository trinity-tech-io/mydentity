export enum FlowOperation {
  // During the on boarding process right after creating an
  // account, binding email to user account for the first time.
  OnBoardingEmailBinding = 0,
  OnBoardingEmailSignIn = 1
}

const ONGOING_FLOW_OPERATION = 'ongoingflowoperation';

export function getOnGoingFlowOperation(): FlowOperation {
  return FlowOperation[localStorage.getItem(ONGOING_FLOW_OPERATION)];
}

export function setOnGoingFlowOperation(operation: FlowOperation) {
  localStorage.setItem(ONGOING_FLOW_OPERATION, operation.toString());
}

export function clearOnGoingFlowOperation() {
  localStorage.removeItem(ONGOING_FLOW_OPERATION);
}