import { useEffect } from 'react';
import {Container, Text} from '@react-three/uikit';
import React from 'react';

// eslint-disable-next-line react/display-name
const TextBlock = React.forwardRef(({ children, fontFamily, onResize }, ref) => {
  const textRef = ref ?? React.createRef();
  let [width, setWidth] = React.useState(10);
  let [height, setHeight] = React.useState(10);
  if (textRef.current && textRef.current.size.v) {
    width = textRef.current.size.v[0];
    height = textRef.current.size.v[1];
  }
  const isTextOnly = typeof children === 'string' || typeof children === 'number';

  const handleResize = React.useCallback((newWidth, newHeight) => {
    if (newWidth !== width) {
      width = newWidth;
      setWidth(width);
    }
    /*if (newHeight !== height) {
      height = newHeight;
      setHeight(height);
    }*/
  }, []);

  useEffect(() => {
    onResize?.(width, height);
  }, [width, height, onResize]);
  
  return (
    <Container
      flexGrow={0}
      minWidth={width}
      minHeight={height}
    >
      {isTextOnly ? (
        <Text ref={textRef} wordBreak="break-word" fontFamily={fontFamily}>
          {children}
        </Text>
      ) : (
        React.cloneElement(children, {
          ref: textRef, 
          onResize: handleResize
        })
      )}
    </Container>
  )
});

export default TextBlock;