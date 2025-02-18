import {Container, Text} from '@react-three/uikit';
import React from 'react';

// eslint-disable-next-line react/display-name
const TextBlock = React.forwardRef(({ children, fontFamily }, ref) => {
  const textRef = ref ?? React.createRef();
  return (
    <Container
      flexGrow={0}
      minWidth={textRef.current && textRef.current.size.v ? textRef.current.size.v[0] : 10}
    >
      <Text ref={textRef} wordBreak="break-word" fontFamily={fontFamily}>{children}</Text>
    </Container>
  )
});

export default TextBlock;