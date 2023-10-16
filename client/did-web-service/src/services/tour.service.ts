import { User } from "@model/user/user";

const TOUR_TOOLTIP_STATE = "tour-tooltip-flag";

/**
 * Handling storage value for tour tooltips.
 * Tour tooltips should be displayed for user only first time.
 */
// function getTourState(): string[] {
//   const tour_state = localStorage.getItem(TOUR_TOOLTIP_STATE);
//   var state_arr: string[] = [];
//   try {
//     tour_state && (state_arr = JSON.parse(atob(tour_state)))
//     return state_arr;
//   } catch(e) {}
//   return state_arr;
// }

// export function setTourState(state: string): void {
//   const tour_state = localStorage.getItem(TOUR_TOOLTIP_STATE)
//   var state_arr: string[] = []
//   try {
//     tour_state && (state_arr = JSON.parse(atob(tour_state)))
//   } catch(e) {}
//   state_arr.push(state)
//   localStorage.setItem(TOUR_TOOLTIP_STATE, btoa(JSON.stringify(state_arr)));
// }

// export function checkTourState(state: string): boolean {
//   const state_arr = getTourState()
//   return state_arr.includes(state)
// }

export default class TourState {
  activeUser: User;

  constructor(user: User) {
    this.activeUser = user
  }

  private async getTourState(): Promise<string[]> {
    if(!this.activeUser)
      return [];
    const tour_state = await this.activeUser.get("storage").get(TOUR_TOOLTIP_STATE, null);
    var state_arr: string[] = [];
    try {
      tour_state && (state_arr = JSON.parse(atob(tour_state)))
      return state_arr;
    } catch(e) {}
    return state_arr;
  }

  public async setTourState(state: string): Promise<void> {
    if(!this.activeUser)
      return;
    const tour_state = await this.activeUser.get("storage").get(TOUR_TOOLTIP_STATE, null)
    var state_arr: string[] = []
    try {
      tour_state && (state_arr = JSON.parse(atob(tour_state)))
    } catch(e) {}
    state_arr.push(state)
    this.activeUser.get("storage").set(TOUR_TOOLTIP_STATE, btoa(JSON.stringify(state_arr)));
  }

  public async checkTourState(state: string): Promise<boolean> {
    if(!this.activeUser)
      return false;
    const state_arr = await this.getTourState()
    return state_arr.includes(state)
  }
}