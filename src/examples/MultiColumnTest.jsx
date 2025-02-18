import {Canvas, useThree} from '@react-three/fiber';
import {Root, Container, Text, FontFamilyProvider, DefaultProperties} from '@react-three/uikit';
import { PointerEvents } from '@react-three/xr';
import React from 'react';
import MultiColumnText from '@/src/component/MultiColumnText';
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
  let [count, setCount] = React.useState(0);
  if (reloadCount === 0) {
    const reloadText = (text) => {
      if (count < text.length) {
        count = text.length;
        setCount(count);
      }
    };

    const dynamicTextIndexList = [
      10
    ];
    for (let i = 0; i < dynamicTextIndexList.length; i++) {
      displayData.push('');
      dynamicTextLoader(dynamicTextIndexList[i], (text) => {
        displayData[i] = text;
        reloadText(text);
      });
    }
  }
  reloadCount++;

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
                <MultiColumnText columnCount={3}>{displayData[0]}</MultiColumnText>
              </ScrollableContainer>
            </Container>
          </DefaultProperties>
        </FontFamilyProvider>
      </Root>
    </Canvas>
  )
}