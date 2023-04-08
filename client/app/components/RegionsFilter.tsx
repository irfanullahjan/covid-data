import { Col, Row } from "reactstrap";
import { FormikInput } from "~/common/components/FormikInput";

type Props = {
  regions: string[];
  comparison?: boolean;
};

export function RegionsFilter({ regions, comparison }: Props) {
  const regionInputs = comparison ? Array.from({ length: 2 }) : [null];

  return (
    <Row>
      {regionInputs.map((_, index) => (
        <Col key={index}>
          <FormikInput name="regions[]" label="Region" type="select">
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </FormikInput>
        </Col>
      ))}
    </Row>
  );
}
