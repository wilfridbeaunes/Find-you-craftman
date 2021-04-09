import {Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
 export class Authservice{

    private readonly _isConnected = new BehaviorSubject<boolean>(false); //define _isConnected as a boolean value
    readonly isConnected$ = this._isConnected.asObservable(); //i see how _isConnected beheave

    private readonly _userId= new BehaviorSubject<number>(null);
    readonly userId$ = this._userId.asObservable(); //i see how my value userId behave
    
    //getting the boolean value
    get isConnected(): boolean{
        return this._isConnected.getValue();
    }
    
    //catch the boolean set value that i add in login.componet.ts
    set isConnected(newvalue: boolean) {
        this._isConnected.next(newvalue);
    }

    //get the user id when log in   // for user the getted value u can do "authenticate.userID" in a new component
    get userId():number{
        return this._userId.getValue();
    }
    //set the user id
    set userId(newvalue:number){
        this._userId.next(newvalue);
    }
}
