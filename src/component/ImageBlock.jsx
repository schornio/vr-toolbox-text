import {Container, Image, Text} from '@react-three/uikit';
import React from 'react';


// eslint-disable-next-line react/display-name
const ImageBlock = React.forwardRef(({ src, caption }, ref) => {
  return (
    <Container ref={ref} flexDirection="column" alignItems="center" flexGrow={1}>
      <Image src={src} width={100} alt={caption} />
      <Text wordBreak="break-word" fontSize={10}>{caption}</Text>
    </Container>
  )
});

export default ImageBlock;