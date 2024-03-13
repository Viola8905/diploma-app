import React, { useEffect } from "react";
import { Button, Flex } from "antd";
import { HeroBackground, Section, Title, Wrapper } from "./StartPage.styles.js";

const StartPage = () => {
  return (
    <>
      <Wrapper>
        <HeroBackground>
          <Section>
            <Flex style={{height: "150px",width:"700px"}} gap="middle" align="center" justify="center" vertical>
              {/* <Title style={{ color: "black" }}>Find talents or</Title> */}
              <Title>Трекінг Відвідування Івентів!</Title>
              <Flex gap="middle" wrap="wrap">
                <Button type="primary"  size="large">
                  Створити
                </Button>
                <Button  size="large">
                  Відвідати
                </Button>
              </Flex>
            </Flex>
          </Section>
        </HeroBackground>
      </Wrapper>
    </>
  );
};

export default StartPage;
