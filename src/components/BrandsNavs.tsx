import React from "react";
import "../css/BrandsNavs.css";
import { useApi, apiStates } from "../hooks/useApi";
import { apiurl } from "../apiurl";

interface PropsI {
  active: string;
  handleClick: React.Dispatch<React.SetStateAction<string>>;
  forceBit: number;
}

export default function BrandsNavs({ active, handleClick, forceBit }: PropsI) {
  const { state, error, dataArray } = useApi(`${apiurl}/api/company`, forceBit);

  switch (state) {
    case apiStates.ERROR:
      return <p>ERROR: {error || "General error"}</p>;
    case apiStates.SUCCESS:
      return (
        <div className="Brands-nav-div">
          {dataArray.map(({ company }, i) => {
            // if (i === 0) {
            //   handleClick(company);
            // }
            return (
              <div
                key={i}
                className={active === company ? "active" : ""}
                onClick={() => handleClick(company)}
              >
                {company}
              </div>
            );
          })}
        </div>
      );
    default:
      return <p>loading..</p>;
  }
}
