import { Observable } from "rxjs";
import { CanDeactivate } from "@angular/router";

export interface AlertUserClass{
    alertUserFunction: () => boolean | Observable<boolean>;
}

export class LeavePageWarningGuard implements CanDeactivate<AlertUserClass>{
    canDeactivate(component: AlertUserClass): Observable<boolean> | boolean{
        // check if function is set
        return component.alertUserFunction ? component.alertUserFunction() : true;
    }
}