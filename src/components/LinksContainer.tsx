import React from "react";
import "../css/LinksContainer.css";
import Link, { LinkI } from "./Link";
import { apiStates, useApi } from "../hooks/useApi";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { apiurl } from "../apiurl";

interface PropsI {
  //   links: LinkI[];
  brandName: string;
  forceBit: number;
  forceRefresh: React.Dispatch<React.SetStateAction<number>>;
}

const deleteLink = async (
  id: number,
  token: string
): Promise<{ res: boolean }> => {
  const url = `${apiurl}/api/delete/${id}`;
  try {
    //eslint-disable-next-line
    const { data } = await axios({
      url: url,
      method: "delete",
      headers: {
        "auth-token": token,
      },
    });
    return { res: true };
  } catch (error) {
    // console.log(error);
    return { res: false };
  }
};

export default function LinksContainer({
  brandName,
  forceRefresh,
  forceBit,
}: PropsI) {
  const { state, error, dataArray } = useApi(
    `${apiurl}/api/links/${brandName}`,
    forceBit
  );

  const { currentUser } = useAuth();

  const handleDelLink = async (id: number) => {
    const { res } = await deleteLink(id, currentUser!["auth-token"]);
    if (res) {
      forceRefresh((prevState) => prevState + 1);
    } else {
    }
  };

  switch (state) {
    case apiStates.ERROR:
      return <p>ERROR: {error || "General error"}</p>;
    case apiStates.SUCCESS:
      return (
        <div className="LinksContainer-div">
          {dataArray.map((link: LinkI) => (
            <Link link={link} key={link.id} handleDel={handleDelLink} />
          ))}
        </div>
      );
    default:
      return <p>loading..</p>;
  }
}
