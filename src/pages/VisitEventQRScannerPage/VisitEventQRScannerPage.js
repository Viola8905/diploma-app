import React from "react";
import { QrReader } from "react-qr-reader";
import { Card, Row, Col } from "antd";
import { userMock, eventMock } from "../../Data";

export const VisitEventQRScannerPage = () => {
  const [data, setData] = React.useState("No result");
  const [eventData, setEventData] = React.useState(eventMock);

  return (
    <Row justify="center" style={{ padding: " 100px 10px 20px 10px" }}>
      <Col xs={24} sm={12} md={8} lg={12}>
        <Card
          bordered={false}
          style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2>{eventMock.title}</h2>
            <p>Start Date: {eventMock.startDate}</p>
            <p>End Date: {eventMock.endDate}</p>
            <p>Creator: {eventMock.creator.firstName}</p>
            <p>Description: {eventMock.description}</p>
          </div>
          <div style={{}}>
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
        </Card>
      </Col>
    </Row>
  );
};
