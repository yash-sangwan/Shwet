import React from "react";
import { Reclaim } from "@reclaimprotocol/js-sdk";
import QRCode from "react-qr-code";
import { log } from "three/webgpu";

const RequestProof = () => {
  const reclaimClient = new Reclaim.ProofRequest(
    import.meta.env.VITE_RECLAIM_APPLICATION_ID
  );

  // GET , endpoint - /proof/request-proof
  const sendGetReq = async () => {
    try {
      const response = await fetch(
        `http://localhost:5505/proof/request-proof?id=${0}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        // console.log(data);

        const requestUrl = data.requestUrl;
      }
    } catch (err) {console.log(err);
    }
  };

  sendGetReq()


  return (
    <>
      <div
        style={{
          height: "200px",
          margin: "0 auto",
          maxWidth: 300,
          width: "200px",
        }}
      >
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={"https://google.com"}
          viewBox={`0 0 256 256`}
        />
      </div>
    </>
  );
};

export default RequestProof;
