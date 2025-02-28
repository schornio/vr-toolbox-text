import {Canvas} from '@react-three/fiber';
import {Root, Container, Text, FontFamilyProvider, DefaultProperties} from '@react-three/uikit';
import { PointerEvents } from '@react-three/xr';
import React from 'react';
import { Separator, Accordion, AccordionContent, AccordionItem, AccordionTrigger, Tooltip, TooltipContent, TooltipTrigger } from '@react-three/uikit-default';
import BulletPointList from '@/src/component/BulletPointList';
import OrderedList from '@/src/component/OrderedList';
import Heading from '@/src/component/Heading';
import Subtitle from '@/src/component/Subtitle';
import TextBlock from '@/src/component/TextBlock';
import ImageBlock from '@/src/component/ImageBlock';
import Citation from '@/src/component/Citation';
import ScrollableContainer from '@/src/component/ScrollableContainer';
import DynamicText from '@/src/component/DynamicText';
import {getRandomTextIndex} from '@/src/services/dynamicTextLoader';

export default function App() {
  const scrollRef = [
    React.useRef(null),
    React.useRef(null),
    React.useRef(null)
  ];
  let [widthColumn1, setWidthColumn1] = React.useState(10);
  const handleResizeColumn1 = React.useCallback((newWidth) => {
    widthColumn1 = newWidth;
    setWidthColumn1(widthColumn1);
  }, []);
  let [widthColumn2, setWidthColumn2] = React.useState(10);
  const handleResizeColumn2 = React.useCallback((newWidth) => {
    widthColumn2 = newWidth;
    setWidthColumn2(widthColumn2);
  }, []);
  let [widthColumn3, setWidthColumn3] = React.useState(10);
  const handleResizeColumn3 = React.useCallback((newWidth) => {
    widthColumn3 = newWidth;
    setWidthColumn3(widthColumn3);
  }, []);

  const items = [
    "1234567890",
    "fsjldfskjs lfdsdljsfdl kjsdfl kjsdlsdk sflkj dsf jl",
    "ds fdkjsf lksdflj"
  ];

  return (
    <Canvas style={{ position: "absolute", touchAction: 'none' }} gl={{ localClippingEnabled: true }}>
      <PointerEvents />
      <Root backgroundColor="#42258d" sizeX={8} sizeY={6} flexDirection="row" borderRadius={10} padding={10} gap={10}>
        <FontFamilyProvider inter={{ normal: 'inter-normal.json', bold: 'Inter_18pt-Bold-msdf.json', 'semi-bold': 'Inter_18pt-SemiBold-msdf.json' }} italic={{ normal: 'InterTight-Italic-msdf.json' }}>
          <DefaultProperties fontFamily="inter">
            <Container flexGrow={1} backgroundColor="#9a398d" flexDirection="row" padding={10} gap={10}>
              <ScrollableContainer
                ref={scrollRef[0]}
                minWidth={widthColumn1 + 30}
                maxWidth="49%"
                backgroundColor="white"
                backgroundOpacity={0.5}
                padding={10}
                flexDirection="row"
              >
                <Heading fontFamily="italic">Custom Font Test 123!</Heading>
                <ImageBlock src="1694078376509.jpg" caption="Image Description"></ImageBlock>
                <BulletPointList items={items} />
                <Separator />
                <OrderedList items={items} />
                <Separator />
                <OrderedList items={items} startIndex={4} />
                <Separator />
                <Citation>&#34;Citation text&#34;</Citation>
                <Separator />
                <Container flexGrow={1}>
                  <TextBlock onResize={handleResizeColumn1}><DynamicText dynamicTextIndex={getRandomTextIndex()} scrollRef={scrollRef[0]} /></TextBlock>
                </Container>
              </ScrollableContainer>
              <ScrollableContainer
                ref={scrollRef[1]}
                minWidth={widthColumn2 + 30}
                maxWidth="49%"
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
                <Container flexGrow={1}>
                  <TextBlock onResize={handleResizeColumn2}><DynamicText dynamicTextIndex={10} scrollRef={scrollRef[1]} /></TextBlock>
                </Container>
              </ScrollableContainer>
            </Container>
            <ScrollableContainer
              ref={scrollRef[2]}
              backgroundColor="#9a398d"
              minWidth={widthColumn3 + 30}
              maxWidth="30%"
              scrollToEnd={true}
            >
              <Container flexShrink={0} flexGrow={1} flexDirection="column" padding={10} gap={10} alignItems="flex-start" alignContent="flex-start">
                <Heading><DynamicText dynamicTextIndex={11} scrollRef={scrollRef[2]} /></Heading>
                <Heading level={3}>Heading Level 3</Heading>
                <Subtitle><DynamicText dynamicTextIndex={6} scrollRef={scrollRef[2]} /></Subtitle>
                <TextBlock onResize={handleResizeColumn3}><DynamicText dynamicTextIndex={3} scrollRef={scrollRef[2]} /></TextBlock>
              </Container>
            </ScrollableContainer>
          </DefaultProperties>
        </FontFamilyProvider>
      </Root>
    </Canvas>
  )
}