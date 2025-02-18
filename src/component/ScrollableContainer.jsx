import {Container} from '@react-three/uikit';
import React from 'react';

function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

// eslint-disable-next-line react/display-name
const ScrollableContainer = React.forwardRef((
  {
    children,
    backgroundColor,
    backgroundOpacity,
    minWidth,
    maxWidth,
    flexDirection,
    padding,
    scrollToEnd
  }, ref) => {
  if (!padding) padding = 0;
  const scrollRef = ref ?? React.createRef();
  const updateScrollbar = async () => {
    const scrollItem = scrollRef;
    if (scrollItem && scrollItem.current) {
      await delay(500);
      if (scrollItem.current && scrollItem.current.maxScrollPosition.value[1]) {
        await delay(100);
        if (scrollItem.current.scrollPosition.value[1] !== scrollItem.current.maxScrollPosition.value[1]) {
          scrollItem.current.scrollPosition.value[1] = scrollItem.current.maxScrollPosition.value[1];
        }
      }
    }
  }

  if (scrollToEnd) {
    updateScrollbar();
  }

  return (
    <Container
      ref={scrollRef}
      flexGrow={1}
      alignItems="flex-start"
      alignContent="flex-start"
      backgroundColor={backgroundColor}
      backgroundOpacity={backgroundOpacity ?? 1}
      minWidth={minWidth}
      maxWidth={maxWidth}
      flexDirection={flexDirection ?? "column"}
      flexWrap="wrap"
      overflow="scroll"
      scrollbarColor="gray"
      scrollbarBorderRadius={10}
      padding={padding}
      paddingRight={padding + 10}
      paddingBottom={48}
      gap={10}
    >
      {children}
    </Container>
  )
});

export default ScrollableContainer;