import { useContext } from "react";
import { AuthContext } from "../../context";
import styled from "styled-components";

function Projects() {
  const auth = useContext(AuthContext);

  return (
    <DivGeneral>
        <DivUp>a</DivUp>
        <DivDown>
            <DivLeft>a</DivLeft>
            <DivRight>a</DivRight>
        </DivDown>
    </DivGeneral>
  );
}

export const DivGeneral = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: green;
`;

export const DivUp = styled.div`
    background-color: pink;
    display: inline-block;
    height: 416px;
    width: 1182px;
`;

export const DivDown = styled.div`
    background-color: red;
    height: 416px;
    width: 1182px;
`;

export const DivLeft = styled.div`
    background-color: yellow;
    height: 464px;
    width: 800px;
    float: left;
`;

export const DivRight = styled.div`
    background-color: blue;
    height: 464px;
    float: right;
`;

export default Projects;
