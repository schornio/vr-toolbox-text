import {Container, Text} from '@react-three/uikit';
import React from 'react';
import MarkdownParser from '@/src/component/MarkdownParser';

export default function OrderedList({ items, startIndex = 1, parseMarkdown = false }) {
  return (
    <Container flexDirection="column" marginLeft="10%" gap={5} marginBottom={10}>
      {items.map((item, index) => (
        <Container key={index} flexDirection="row" gap={10} alignItems="flex-start"
                   alignContent="flex-start">
          <Text width={15}>{`${index + startIndex}.`}</Text>
          {parseMarkdown ? (
            <MarkdownParser formatNormalText={false}>
              {item}
            </MarkdownParser>
          ) : (
            <Text>
              {item}
            </Text>
          )}
        </Container>
      ))}
    </Container>
  )
}