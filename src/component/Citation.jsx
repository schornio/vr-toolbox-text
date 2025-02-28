import {Container, Text, FontFamilyProvider, DefaultProperties} from '@react-three/uikit';
import React from 'react';
import MarkdownParser from '@/src/component/MarkdownParser';

export default function Citation({ children, parseMarkdown = false }) {
  const isTextOnly = typeof children === 'string' || typeof children === 'number';
  return (
    <Container
      flexGrow={0}
      marginLeft={20}
      marginBottom={4}
      flexDirection="row"
      backgroundColor="#fce4ec"
      padding={5}
    >
      <Container width={4} marginRight={10} backgroundColor="#ec407a" />
      <Container flexGrow={1} flexDirection="column">
        <FontFamilyProvider
          italic={{
            normal: 'Inter_18pt-Italic-msdf.json',
            bold: 'Inter_18pt-BoldItalic-msdf.json'
          }}
        >
          <DefaultProperties fontFamily="italic" color="#d81b60" wordBreak="break-word">
            {
              !isTextOnly ? (
                children
              ) : (
                parseMarkdown ? (
                  <MarkdownParser formatNormalText={false}>
                    {children}
                  </MarkdownParser>
                ) : (
                  <Text>
                    {children}
                  </Text>
                )
              )
            }
          </DefaultProperties>
        </FontFamilyProvider>
      </Container>
    </Container>
  )
}