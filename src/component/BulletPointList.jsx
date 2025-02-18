import {Container, Text} from '@react-three/uikit';
import React from 'react';
import { Star } from '@react-three/uikit-lucide';


export default function BulletPointList({ items }) {
  return (
    <Container flexDirection="column" marginLeft="10%" gap={5}>
      {items.map((item, index) => (
        <Container key={index} flexDirection="row" gap={10} alignItems="flex-start"
                   alignContent="flex-start">
          <Star width={16} height={16} />
          <Text color="black">
            {item}
          </Text>
        </Container>
      ))}
    </Container>
  )
}