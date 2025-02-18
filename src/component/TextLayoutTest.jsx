import {Canvas, useThree} from '@react-three/fiber';
import {Root, Container, Text, FontFamilyProvider, DefaultProperties} from '@react-three/uikit';
import data from '@/src/assets/data/randomText.json';
import { PointerEvents } from '@react-three/xr';
import React from 'react';
import { Separator, Accordion, AccordionContent, AccordionItem, AccordionTrigger, Tooltip, TooltipContent, TooltipTrigger } from '@react-three/uikit-default';
import BulletPointList from '@/src/component/BulletPointList';
import Heading from '@/src/component/Heading';
import Subtitle from '@/src/component/Subtitle';
import TextBlock from '@/src/component/TextBlock';
import ImageBlock from '@/src/component/ImageBlock';
import Citation from '@/src/component/Citation';
import ScrollableContainer from '@/src/component/ScrollableContainer';
import dynamicTextLoader from '@/src/services/dynamicTextLoader';

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

export default function App() {
  const getRandomTextIndex = () => {
    return data ? Math.round(Math.random() * data.length) : 0;
  };

  let [count, setCount] = React.useState(0);
  if (reloadCount === 0) {
    const reloadText = (text) => {
      if (count < text.length) {
        count = text.length;
        setCount(count);
      }
    };

    let index = 10;
    displayData.push({
      index: index,
      text: data[index],
      displayText: ''
    });
    dynamicTextLoader(index, (text) => {
      displayData[0].displayText = text;
      reloadText(text);
    });
    index = 3;
    displayData.push({
      index: index,
      text: data[index],
      displayText: ''
    });
    dynamicTextLoader(index, (text) => {
      displayData[1].displayText = text;
      reloadText(text);
    });
    index = 11;
    displayData.push({
      index: index,
      text: data[index],
      displayText: ''
    });
    dynamicTextLoader(index, (text) => {
      displayData[2].displayText = text;
      reloadText(text);
    });
    index = 6;
    displayData.push({
      index: index,
      text: data[index],
      displayText: ''
    });
    dynamicTextLoader(index, (text) => {
      displayData[3].displayText = text;
      reloadText(text);
    });
    index = getRandomTextIndex();
    displayData.push({
      index: index,
      text: data[index],
      displayText: ''
    });
    dynamicTextLoader(index, (text) => {
      displayData[4].displayText = text;
      reloadText(text);
    });
  }
  reloadCount++;

  const items = [
    "1234567890",
    "fsjldfskjs lfdsdljsfdl kjsdfl kjsdlsdk sflkj dsf jl",
    "ds fdkjsf lksdflj"
  ];

  return (
    <Canvas style={{ position: "absolute", touchAction: 'none' }} gl={{ localClippingEnabled: true }}>
      <ThreeState />
      <PointerEvents />
      <Root backgroundColor="#42258d" sizeX={8} sizeY={6} flexDirection="row" borderRadius={10} padding={10} gap={10}>
        <FontFamilyProvider inter={{ normal: 'inter-normal.json', bold: 'Inter_18pt-Bold-msdf.json', 'semi-bold': 'Inter_18pt-SemiBold-msdf.json' }} italic={{ normal: 'InterTight-Italic-msdf.json' }}>
          <DefaultProperties fontFamily="inter">
            <Container flexGrow={1} backgroundColor="#9a398d" flexDirection="row" padding={10} gap={10}>
              <ScrollableContainer
                minWidth="10%"
                backgroundColor="white"
                backgroundOpacity={0.5}
                padding={10}
                flexDirection="row"
              >
                <Heading fontFamily="italic">Custom Font Test 123!</Heading>
                <ImageBlock src="1694078376509.jpg" caption="Image Description"></ImageBlock>
                <BulletPointList items={items} />
                <Separator />
                <Citation>&#34;Citation text&#34;</Citation>
                <Separator />
                <TextBlock>{displayData[4].displayText}</TextBlock>
              </ScrollableContainer>
              <ScrollableContainer
                ref={scrollRef[1]}
                minWidth="10%"
                backgroundColor="white"
                backgroundOpacity={0.5}
                padding={10}
                flexDirection="row"
                scrollToEnd={true}
              >
                <Container flexDirection="column" flexGrow={1}>
                  <Accordion flexGrow={1} marginBottom={15} >
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        <Text>Is it accessible?</Text>
                      </AccordionTrigger>
                      <AccordionContent>
                        <Text>Yes. It adheres to the WAI-ARIA design pattern.</Text>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>
                        <Text>Is it styled?</Text>
                      </AccordionTrigger>
                      <AccordionContent>
                        <Text>Yes. It comes with default styles that matches the other components&apos; aesthetic.</Text>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>
                        <Text>Is it animated?</Text>
                      </AccordionTrigger>
                      <AccordionContent>
                        <Text>Yes. It&apos;s animated by default, but you can disable it if you prefer.</Text>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Tooltip>
                    <TooltipTrigger>
                      <Text color="#0c5175">Hover</Text>
                    </TooltipTrigger>
                    <TooltipContent>
                      <Text>Hover Tooltip</Text>
                    </TooltipContent>
                  </Tooltip>
                </Container>
                <TextBlock>{displayData[0].displayText}</TextBlock>
              </ScrollableContainer>
            </Container>
            <ScrollableContainer
              ref={scrollRef[2]}
              backgroundColor="#9a398d"
              minWidth={textRef.current && textRef.current.size.v ? textRef.current.size.v[0] + 30 : 30}
              maxWidth="30%"
              scrollToEnd={true}
            >
              <Container flexShrink={0} flexGrow={1} flexDirection="column" padding={10} gap={10} alignItems="flex-start" alignContent="flex-start">
                <Heading>{displayData[2].displayText}</Heading>
                <Subtitle>{displayData[3].displayText}</Subtitle>
                <TextBlock ref={textRef}>{displayData[1].displayText}</TextBlock>
              </Container>
            </ScrollableContainer>
          </DefaultProperties>
        </FontFamilyProvider>
      </Root>
    </Canvas>
  )
}