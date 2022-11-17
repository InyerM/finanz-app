import { useRouter } from 'next/router'
import { Card, Col, Text } from "@nextui-org/react"
import { INewData } from '../../interfaces'
import { FC } from 'react';
import { dateFunctions } from '../../utils';

interface Props extends INewData {}

export const CardHome: FC<Props> = ({ category, country, image, published_at, title, _id }) => {
  const { push } = useRouter()
  return (
    <Card isPressable isHoverable onPress={() => push(`/news/${_id}`)}>
      <Card.Header className='absolute z-10 top-5'>
        <Col>
          <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
            { category }
          </Text>
          <Text h4 color="white">
            { title }
          </Text>
        </Col>
      </Card.Header>
      <Card.Image
        src={ image || '' }
        objectFit="cover"
        width="100%"
        height={340}
        alt="Card image background"
        className='saturate-150'
      />
      <Card.Footer className='absolute z-10 bottom-2 flex gap-5'>
        <Text size={15} weight="bold" transform="uppercase" color="#ffffffAA">
          { country }
        </Text>
        <Text h4 color="white">
          { dateFunctions.formatDate(published_at, 'LLL', 'es') }
        </Text>
      </Card.Footer>
    </Card>
  )
}
