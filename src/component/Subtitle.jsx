import {Container, Text} from '@react-three/uikit';
import React from 'react';

const HEADING_SIZES = {
  1: 24,
  2: 20,
  3: 16,
  4: 14,
  5: 12,
  6: 10
};

export default function Subtitle({ children, level = 2, fontFamily }) {
  const fontSize = HEADING_SIZES[level] || HEADING_SIZES[1];
  return (
    <Container
      flexGrow={0}
      marginBottom={level === 1 ? 10 : level === 2 ? 8 : 6}
    >
      <Text fontWeight="semi-bold" wordBreak="break-word" fontSize={fontSize} fontFamily={fontFamily}>{children}</Text>
    </Container>
  )
}