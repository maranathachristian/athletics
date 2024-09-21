import axios from "axios";
import { API_URL, VERSION } from "../constants";

interface Status {
    version: string
}

export const GetStatus = (): [boolean, string] => {
    axios.get<Status>(`${API_URL}/status`).then(status => {
        if (status.data.version != VERSION) {
            return [false, "test"]
        }

    }).catch(_error => {
        return [false, "Server is offline."];
    });

    return [true, ""];
}