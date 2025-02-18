import {Container, Text} from '@react-three/uikit';
import React from 'react';


export default function Subtitle({ children, fontFamily }) {
  return (
    <Container
      flexGrow={0}
    >
      <Text fontWeight="semi-bold" wordBreak="break-word" fontSize={18} fontFamily={fontFamily}>{children}</Text>
    </Container>
  )
}