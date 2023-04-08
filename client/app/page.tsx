import { Col, Container, Row } from "~/common/components/reactstrap";
import { fetchServerSide } from "~/common/utils/fetchServerSide";
import { Chart } from "./Chart";

export default async function Home() {
  const fields = await fetchServerSide("/covid-log/fields");
  return (
    <Container>
      <Row>
        <Col>
          <Chart fields={fields} />
        </Col>
      </Row>
    </Container>
  );
}
