import { User } from "@model/user/user";

const TOUR_TOOLTIP_STATE = "tour-tooltip-flag";

/**
 * Handling storage value of tour tooltip state to sandbox for active user.
 * Tour tooltips should be displayed for user only first time.
 */
export default class TourState {
  activeUser: User;

  constructor(user: User) {
    this.activeUser = user
  }

  private async getTourState(): Promise<string[]> {
    if(!this.activeUser)
      return [];
    const tour_state = await this.activeUser.get("storage").get(TOUR_TOOLTIP_STATE, null);
    let state_arr: string[] = [];
    try {
      tour_state && (state_arr = JSON.parse(atob(tour_state)))
      return state_arr;
    } catch(e) { console.error('Failed to getTourState().'); }
    return state_arr;
  }

  public async setTourState(state: string): Promise<void> {
    if(!this.activeUser)
      return;
    const tour_state = await this.activeUser.get("storage").get(TOUR_TOOLTIP_STATE, null)
    let state_arr: string[] = []
    try {
      tour_state && (state_arr = JSON.parse(atob(tour_state)))
    } catch(e) { console.error('Failed to setTourState().'); }
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