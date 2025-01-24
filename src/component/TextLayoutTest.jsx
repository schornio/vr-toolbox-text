import {Canvas, useThree} from "@react-three/fiber";
import { Root, Container, Text } from "@react-three/uikit";
import data from '@/src/assets/data/randomText.json';
import { PointerEvents } from '@react-three/xr';
import React from 'react';

const textRef = React.createRef();
const scrollRef = [
  React.createRef(),
  React.createRef(),
  React.createRef()
];
let state = null;
const displayData = [];
let reloadCount = 0;

function ThreeState() {
  state = useThree();
}

function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

export default function App() {
  const getRandomTextIndex = () => {
    return data ? Math.round(Math.random() * data.length) : 0;
  };

  let [count, setCount] = React.useState(0);
  if (reloadCount === 0) {
    const updateScrollbar = async (scrollRefIndex, reloadHTML) => {
      const scrollItem = scrollRef[scrollRefIndex];
      if (scrollItem && scrollItem.current) {
        await delay(500);
        if (scrollItem.current && scrollItem.current.maxScrollPosition.value[1]) {
          if (reloadHTML) setCount(count++);
          await delay(100);
          if (scrollItem.current.scrollPosition.value[1] !== scrollItem.current.maxScrollPosition.value[1]) {
            scrollItem.current.scrollPosition.value[1] = scrollItem.current.maxScrollPosition.value[1];
          }
          if (reloadHTML) {
            await delay(100);
            setCount(count++);
          }
        }
      }
    }
    const simulateTyping = (index, scrollRefIndex = -1, scrollToEnd = true) => {
      const item = displayData[index];
      item.displayText = item.text.slice(0, item.displayText.length + 20);
      if (item.displayText.length < item.text.length) {
        if (count < item.displayText.length) {
          count = item.displayText.length;
          setCount(count);
        }
        if (scrollRefIndex > -1 && scrollToEnd) updateScrollbar(scrollRefIndex, false);
        setTimeout(() => simulateTyping(index, scrollRefIndex, scrollToEnd), 50);
      } else {
        setCount(count++);
        if (scrollRefIndex > -1 && scrollToEnd) {
          updateScrollbar(scrollRefIndex, true);
        }
      }
    };

    let index = 10;
    displayData.push({
      index: index,
      text: data[index],
      displayText: ''
    });
    simulateTyping(0, 1);
    index = 3;
    displayData.push({
      index: index,
      text: data[index],
      displayText: ''
    });
    simulateTyping(1, 2);
    index = 11;
    displayData.push({
      index: index,
      text: data[index],
      displayText: ''
    });
    simulateTyping(2);
    index = 6;
    displayData.push({
      index: index,
      text: data[index],
      displayText: ''
    });
    simulateTyping(3);
    index = getRandomTextIndex();
    displayData.push({
      index: index,
      text: data[index],
      displayText: ''
    });
    simulateTyping(4, 0, false);
  }
  reloadCount++;

  return (
    <Canvas style={{ position: "absolute", touchAction: 'none' }} gl={{ localClippingEnabled: true }}>
      <ThreeState />
      <PointerEvents />
      <Root backgroundColor="#42258d" sizeX={8} sizeY={4} flexDirection="row" borderRadius={10} padding={10} gap={10}>
        <Container flexGrow={1} backgroundColor="#9a398d" flexDirection="row" padding={10} gap={10}>
          <Container
            ref={scrollRef[0]}
            flexGrow={1}
            alignItems="flex-start"
            alignContent="flex-start"
            minWidth="10%"
            backgroundColor="white"
            backgroundOpacity={0.5}
            overflow="scroll"
            padding={10}
            paddingRight={20}
            paddingBottom={48}
            flexWrap="wrap"
            scrollbarColor="gray"
            scrollbarBorderRadius={10}
            flexDirection="row"
          >
            <Text wordBreak="break-word">{displayData[4].displayText}</Text>
          </Container>
          <Container
            ref={scrollRef[1]}
            flexGrow={1}
            minWidth="10%"
            backgroundColor="white"
            backgroundOpacity={0.5}
            overflow="scroll"
            padding={10}
            paddingRight={20}
            paddingBottom={48}
            alignItems="flex-start"
            alignContent="flex-start"
            flexWrap="wrap"
            scrollbarColor="gray"
            scrollbarBorderRadius={10}
            flexDirection="row"
          >
            <Text wordBreak="break-word">{displayData[0].displayText}</Text>
          </Container>
        </Container>
        <Container
          ref={scrollRef[2]}
          flexGrow={1}
          alignItems="flex-start"
          alignContent="flex-start"
          backgroundColor="#9a398d"
          minWidth={textRef.current && textRef.current.size.v ? textRef.current.size.v[0] + 30 : 30}
          maxWidth="30%"
          flexDirection="column"
          overflow="scroll"
          scrollbarColor="gray"
          scrollbarBorderRadius={10}
          paddingRight={10}
          paddingBottom={48}
        >
          <Container flexShrink={0} flexGrow={1} flexDirection="column" padding={10} gap={10} alignItems="flex-start" alignContent="flex-start">
            <Container
              flexGrow={0}
            >
              <Text name="header01" fontWeight="bold" wordBreak="break-word">{displayData[2].displayText}</Text>
            </Container>
            <Container
              flexGrow={0}
            >
              <Text name="intro01" fontWeight="semi-bold" wordBreak="break-word">{displayData[3].displayText}</Text>
            </Container>
            <Container
              flexGrow={0}
              minWidth={textRef.current && textRef.current.size.v ? textRef.current.size.v[0] : 10}
            >
              <Text ref={textRef} name="text2" wordBreak="break-word">{displayData[1].displayText}</Text>
            </Container>
          </Container>
        </Container>
      </Root>
    </Canvas>
  )
}