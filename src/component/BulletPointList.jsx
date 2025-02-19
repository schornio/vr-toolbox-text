import {Container, Text} from '@react-three/uikit';
import React from 'react';
import { Star } from '@react-three/uikit-lucide';
import MarkdownParser from '@/src/component/MarkdownParser';


export default function BulletPointList({ items, parseMarkdown = false }) {
  return (
    <Container flexDirection="column" marginLeft="10%" gap={5} marginBottom={10}>
      {items.map((item, index) => (
        <Container key={index} flexDirection="row" gap={10} alignItems="flex-start"
                   alignContent="flex-start">
          <Star width={16} height={16} />
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