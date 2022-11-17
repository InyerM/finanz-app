import { Button, Card, Col, Grid, Row, Text } from '@nextui-org/react'
import { FC } from 'react'
import { INewData } from '../../interfaces'
import { dateFunctions } from '../../utils'


interface Props extends INewData {}

export const CardNew: FC<Props> = ({ category, country, description, image, title, published_at }) => {
  return (
    <Card className='max-w-4xl'>
      <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
        <Col>
          <Text size={12} weight="bold" transform="uppercase" color="white">
            { category }
          </Text>
          <Text h3 color="#eaeaea">
            { dateFunctions.formatDate(published_at, 'LLL', 'es') }
          </Text>
        </Col>
      </Card.Header>
      <Card.Body css={{ p: 0 }}>
        <Card.Image
          src={ image! }
          objectFit="cover"
          width="100%"
          height="100%"
          alt="Relaxing app background"
        />
      </Card.Body>
      <Card.Footer
        isBlurred
        css={{
          position: "absolute",
          bgBlur: "#0f111466",
          borderTop: "$borderWeights$light solid $gray800",
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Row>
          <Col>
            <Text color="#d1d1d1" size={15} transform='uppercase' weight='bold'>
              { category } - { country }
            </Text>
            <Text color="#d1d1d1" size={15}>
              { description }
            </Text>
          </Col>
        </Row>
      </Card.Footer>
    </Card>

  )
}