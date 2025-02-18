import {Container, Text} from '@react-three/uikit';
import React from 'react';

// eslint-disable-next-line react/display-name
const MultiColumnText = React.forwardRef(({ children, columnCount, fontFamily }) => {
  const columnText = [];
  const columnLength = children.length / columnCount;
  let startIndex = 0;
  for (let i = 0; i < columnCount; i++) {
    const endIndex = i < columnCount - 1 ? children.indexOf(" ", (i + 1) * columnLength) : children.length;
    columnText.push(children.substring(startIndex, endIndex));
    startIndex = endIndex;
  }
  return (
    <Container
      flexGrow={0}
      flexDirection="row"
      gap={10}
    >
      {columnText.map((item, index) => (
        <Container key={index} flexDirection="row" gap={10} alignItems="flex-start"
                   alignContent="flex-start">
          <Text wordBreak="break-word" fontFamily={fontFamily}>
            {item}
          </Text>
        </Container>
      ))}
    </Container>
  )
});

export default MultiColumnText;