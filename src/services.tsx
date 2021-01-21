import axios from "axios";

interface AddLinkData {
  url: string;
  note?: string;
  remindat?: string;
  needRemind?: boolean;
}

export async function addLink(dataFields: AddLinkData, token: string) {
  try {
    const { data } = await axios({
      method: "post",
      url: "http://localhost:8032/api/add",
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
      url: "http://localhost:8032/api/company",
      headers: {
        "auth-token": token,
      },
    });

    return { res: true, data: data };
  } catch (error) {
    throw error;
  }
}
