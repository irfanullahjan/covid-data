import { Col, Container, Row } from "~/common/components/reactstrap";
import { fetchServerSide } from "~/common/utils/fetchServerSide";
import { Chart } from "./Chart";

export default async function Home() {
  const user = await fetchServerSide("/auth/current-user");
  return (
    <Container>
      <Row>
        <Col>
          <Chart />
        </Col>
      </Row>
    </Container>
  );
}
