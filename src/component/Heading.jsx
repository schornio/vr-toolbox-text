import {Container, Text} from '@react-three/uikit';
import React from 'react';


export default function Heading({ children, fontFamily }) {
  return (
    <Container
      flexGrow={0}
    >
      <Text fontWeight="bold" wordBreak="break-word" fontSize={24} fontFamily={fontFamily}>{children}</Text>
    </Container>
  )
}