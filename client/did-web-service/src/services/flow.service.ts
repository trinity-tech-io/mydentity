export enum FlowOperation {
  // During the on boarding process right after creating an
  // account, binding email to user account for the first time.
  OnBoardingEmailBinding
}

export function getOnGoingFlowOperation(): FlowOperation {
  return FlowOperation[localStorage.getItem("ongoingflowoperation")];
}

export function setOnGoingFlowOperation(operation: FlowOperation) {
  localStorage.setItem("ongoingflowoperation", operation.toString());
}

export function clearOnGoingFlowOperation(operation: FlowOperation) {
  localStorage.removeItem("ongoingflowoperation");
}