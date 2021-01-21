import React, { useEffect, useState } from "react";
import AddLink from "./AddLinkForm";
import BrandsNavs from "./BrandsNavs";
import LinksContainer from "./LinksContainer";
import { listOfbrands } from "../services";
import { Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

function Dashboard() {
  const [brandName, setBrand] = useState("");
  const { currentUser } = useAuth();

  //by default one brand will be automatically selected
  useEffect(() => {
    listOfbrands(currentUser!["auth-token"])
      .then(({ data }) => {
        if (data.length !== 0) {
          setBrand(data[0].company);
        }
      })
      .catch();
  }, []);

  //this hook is used to force refresh the app
  const [forceBit, forceRefresh] = useState(1);
  return (
    <Container className="d-flex align-items-center justify-content-center">
      <div className="App w-100">
        <AddLink forceRefresh={forceRefresh} forceBit={forceBit} />
        <BrandsNavs
          active={brandName}
          handleClick={setBrand}
          forceBit={forceBit}
        />
        <LinksContainer
          brandName={brandName}
          forceRefresh={forceRefresh}
          forceBit={forceBit}
        />
      </div>
    </Container>
  );
}

export default Dashboard;
