import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { UserData } from "../../interfaces/auth.interface";
import { AdminModule } from "../../../modules/admin/admin.module";

@Injectable({providedIn : AdminModule})
export class AdminDashboardService {
    constructor(
        private http: HttpClient,
    ) { }

    getUserList() {
        return this.http.get<UserData[]>(`${environment.API_URL}/admin/users`)
    }
}