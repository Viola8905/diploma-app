import React from "react";
import { QrReader } from "react-qr-reader";

export const VisitEventQRScanner = () => {
  const [data, setData] = React.useState("No result");
  console.log(data);
  return (
    <div style={{ width: "400px" }}>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: "100%" }}
      />
      <p>{data}</p>
    </div>
  );
};
