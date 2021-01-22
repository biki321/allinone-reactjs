import axios from "axios";
import { apiurl } from "./apiurl";

interface AddLinkData {
  url: string;
  note?: string;
  remindat?: string;
  needRemind?: boolean;
}

export async function addLink(dataFields: AddLinkData, token: string) {
  try {
    await axios({
      method: "post",
      url: `${apiurl}/api/add`,
      headers: {
        "auth-token": token,
      },
      data: dataFields,
    });

    return { res: true };
  } catch (error) {
    throw error;
  }
}

export async function listOfbrands(token: string) {
  try {
    const { data } = await axios({
      method: "get",
      url: `${apiurl}/api/company`,
      headers: {
        "auth-token": token,
      },
    });

    return { res: true, data: data };
  } catch (error) {
    throw error;
  }
}
