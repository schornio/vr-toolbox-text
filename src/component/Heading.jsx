import {Container, Text, DefaultProperties} from '@react-three/uikit';
import React from 'react';
import MarkdownParser from '@/src/component/MarkdownParser';

const HEADING_SIZES = {
  1: 24,
  2: 20,
  3: 16,
  4: 14,
  5: 12,
  6: 10
};

export default function Heading({ children, level = 1, fontFamily, parseMarkdown = false }) {
  const fontSize = HEADING_SIZES[level] || HEADING_SIZES[1];
  
  return (
    <Container
      flexGrow={0}
      marginBottom={level === 1 ? 10 : level === 2 ? 8 : 6}
    >
      {parseMarkdown ? (
        <DefaultProperties 
          fontWeight="bold" 
          wordBreak="break-word" 
          fontSize={fontSize} 
          fontFamily={fontFamily}
        >
          <MarkdownParser formatNormalText={false}>
            {children}
          </MarkdownParser>
        </DefaultProperties>
      ) : (
        <Text 
          fontWeight="bold" 
          wordBreak="break-word" 
          fontSize={fontSize} 
          fontFamily={fontFamily}
        >
          {children}
        </Text>
      )}
    </Container>
  )
}