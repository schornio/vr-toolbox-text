import {Container, FontFamilyProvider, Text} from '@react-three/uikit';
import React from 'react';


export default function Citation({ children }) {
  return (
    <Container
      marginLeft="10%"
      backgroundColor="#9fc8dd"
      padding={5}
      flexGrow={0}
    >
      <FontFamilyProvider italic={{ normal: 'InterTight-Italic-msdf.json' }}>
        <Text wordBreak="break-word"  fontFamily="italic" color="#0c5175">{children}</Text>
      </FontFamilyProvider>
    </Container>
  )
}