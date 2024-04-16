import styled from "styled-components";

import heroBackground from "../../assets/hero-bg2.webp";

export const Wrapper = styled.section`
  height: 100vh;
  width: 100vw;
  margin-top:30px;
`;
export const HeroBackground = styled.div`
  position: relative;
  background: url(${heroBackground}) center/cover no-repeat;
  height: 100%;
}
`;

export const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items:center;
  padding: 0 3px;
  height: 100%;
  width: 100%;
  color: white;
  margin: 0 auto;
`;

export const Title = styled.div`
  color: black;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  
   
`;