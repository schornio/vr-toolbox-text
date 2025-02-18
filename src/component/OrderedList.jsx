import {Container, Text} from '@react-three/uikit';
import React from 'react';


export default function OrderedList({ items }) {
  return (
    <Container flexDirection="column" marginLeft="10%" gap={5} marginBottom={10}>
      {items.map((item, index) => (
        <Container key={index} flexDirection="row" gap={10} alignItems="flex-start"
                   alignContent="flex-start">
          <Text>{`${index + 1}.`}</Text>
          <Text>
            {item}
          </Text>
        </Container>
      ))}
    </Container>
  )
}