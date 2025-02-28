import React from 'react';
import dynamicTextLoader from '@/src/services/dynamicTextLoader';
import { Text } from '@react-three/uikit';

// eslint-disable-next-line react/display-name
const DynamicText = React.forwardRef(({ dynamicTextIndex, fontFamily, onResize, scrollRef }, ref) => {
  const textRef = ref ?? React.createRef();
  let [dynamicText, setDynamicText] = React.useState('');
  let [size, setSize] = React.useState([0, 0]);

  React.useEffect(() => {
    if (textRef.current?.size.v) {
      if (scrollRef && scrollRef.current && size[1] < textRef.current.size.v[1] && scrollRef.current.scrollToEnd && scrollRef.current.updateScroll) {
        scrollRef.current.updateScroll();
      }
      if (size[0] !== textRef.current.size.v[0] || size[1] !== textRef.current.size.v[1]) {
        size = textRef.current.size.v;
        onResize?.(textRef.current.size.v[0], textRef.current.size.v[1]);
      }
    }
  }, [textRef.current?.size.v, onResize]);

  if (dynamicText === '') {
    const reloadText = (text) => {
      if (text !== dynamicText) {
        dynamicText = text;
        setDynamicText(text);
      }
    };
    dynamicTextLoader(dynamicTextIndex, (text) => {
      reloadText(text);
    });
  }

  return (
    <Text 
      ref={textRef} 
      wordBreak="break-word" 
      fontFamily={fontFamily}
    >
      {dynamicText}
    </Text>
  )
});

export default DynamicText;
