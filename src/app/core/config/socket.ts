
import { SocketIoConfig } from "ngx-socket-io";
import { environment } from "../../../environments/environment.development";



export const socketConfig: SocketIoConfig = {
	url: environment.socketUrl,
	options: {
		transports: ['websocket']
	}
}