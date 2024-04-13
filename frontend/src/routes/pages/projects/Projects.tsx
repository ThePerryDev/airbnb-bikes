import { useContext } from "react";
import { AuthContext } from "../../context";
import styled from "styled-components";

function Projects() {
  const auth = useContext(AuthContext);

  return (
    <Container>
        <DivLeft>aa</DivLeft>
        <DivRigth>
            <Row>aa</Row>
            <Row>
                <DivLeft2>aa</DivLeft2>
                <DivRigth2>aa</DivRigth2>
            </Row>
        </DivRigth>
    </Container>
  );
}

export const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: green;
`;

export const DivLeft = styled.div`
    display: flex;
    justify-content: center;
    background-color: pink;
    width: 15%;
    heigth: 100%;
`;

export const DivRigth = styled.div`
    display: flex;
    justify-content: center;
    background-color: red;
    width: 85%;
    heigth: 100%;
`;

export const DivLeft2 = styled.div`
    display: flex;
    justify-content: center;
    background-color: blue;
`;

export const DivRigth2 = styled.div`
    display: flex;
    justify-content: center;
    background-color: gray;
`;

export const Row = styled.div`
    background-color: yellow;
`;

export default Projects;
