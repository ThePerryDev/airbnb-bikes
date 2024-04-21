import { useContext } from "react";
import { AuthContext } from "../../context";
import styled from "styled-components";
import "@fontsource/jost";

function Projects() {
  const auth = useContext(AuthContext);

  return (
    <DivGeneral>
      <DivUp>
        <Title>Progresso do Projeto com o Tempo</Title>
      </DivUp>
      <DivDown>
        <DivLeft>
          <Title2>Novos Registros</Title2>
          <Text>Lorem Ipsum</Text>
          <Text>Lorem Ipsum</Text>
        </DivLeft>
        <DivRight>
          <Container>
            <ProjectTitle>Projeto Cruzeiro</ProjectTitle>
            <TeamTable>
              <thead>
                <TeamTableRow>
                  <TeamTableHeaderCell>Equipe</TeamTableHeaderCell>
                  <TeamTableHeaderCell>Cargo</TeamTableHeaderCell>
                </TeamTableRow>
              </thead>
              <tbody>
                <TeamMemberRow name="Willian G." cargo="Gestor" />
                <TeamMemberRow name="Willian G." cargo="Gestor" />
                <TeamMemberRow name="Willian G." cargo="Gestor" />
                <TeamMemberRow name="Willian G." cargo="Gestor" />
                <TeamMemberRow name="Willian G." cargo="Gestor" />
                <TeamMemberRow name="Willian G." cargo="Gestor" />
              </tbody>
            </TeamTable>
          </Container>
        </DivRight>
      </DivDown>
    </DivGeneral>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const ProjectTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const TeamTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-left: 40px;
  font-size: 20px;
`;

const TeamTableRow = styled.tr`
  margin-left: 0px ;
`;

const TeamTableCell = styled.td`
  padding: 8px;
`;

const TeamTableHeaderCell = styled(TeamTableCell)`
  font-weight: bold;
  text-align: center;
`;

const TeamMemberNameCell = styled(TeamTableCell)`
  text-align: left;
`;

const TeamMemberCargoCell = styled(TeamTableCell)`
  text-align: center;
`;

const TeamMemberRow = ({ name, cargo }:any) => (
  <TeamTableRow>
    <TeamMemberNameCell>{name}</TeamMemberNameCell>
    <TeamMemberCargoCell>{cargo}</TeamMemberCargoCell>
  </TeamTableRow>
);

export const DivInLeft = styled.table`
  display: flex;
  align-items: center;
  width: 100px;
`;

export const DivInRight = styled.table`
  display: flex;
  align-items: center;
`;

export const Text = styled.h3`
  margin-left: 25px;
`;
export const Title = styled.span`
  font-size: 24px;
  margin-left: 25px;
  font-weight: bold;
`;

export const Title2 = styled.h1`
  font-size: 24px;
  margin-left: 25px;
`;

export const DivGeneral = styled.div`
  position: fixed;
  color: #fff;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #121212;
  font-family: Jost;
`;

export const DivUp = styled.div`
  background-color: #373738;
  height: 416px;
  width: 1182px;
  border-radius: 25px;
  margin-left: 28px;
  margin-top: 0px;
  display: flex;
`;

export const DivDown = styled.div`
  display: flex;
  background-color: #121212;
  width: 100%;
  height: 100%;
  margin-top: 37px;
  margin-left: 28px;
`;

export const DivLeft = styled.div`
  background-color: #373738;
  height: 464px;
  width: 800px;
  border-radius: 25px;
`;

export const DivRight = styled.div`
  background-color: #373738;
  height: 464px;
  width: 350px;
  margin-left: 28px;
  border-radius: 25px;
  align-items: center;
  flex-direction: column;
  display: flex;
`;

export default Projects;
