import { Injectable } from '@angular/core';

@Injectable()
export class refreshService {
  private storageName: string = "Settings";

  constructor() { }

  // set the setting (localStorage)
  setSettings(data: any) {
    localStorage.setItem(this.storageName, JSON.stringify(data));
  }

  // get the settings of the user
  getUserSettings() {
    let data = localStorage.getItem(this.storageName);
    return JSON.parse(data);
  }

  // clear user settings 
  clearUserSettings() {
    localStorage.removeItem(this.storageName);
  }

  // clear the localStorage 
  cleanAll() {
    localStorage.clear()
  }

}
