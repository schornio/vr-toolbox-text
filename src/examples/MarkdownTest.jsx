import {Canvas, useThree} from '@react-three/fiber';
import {Root, Container, FontFamilyProvider, DefaultProperties} from '@react-three/uikit';
import { PointerEvents } from '@react-three/xr';
import React from 'react';
import ScrollableContainer from '@/src/component/ScrollableContainer';
import MarkdownParser from '@/src/component/MarkdownParser';


let state = null;

function ThreeState() {
  state = useThree();
}

export default function App() {
  return (
    <Canvas style={{ position: "absolute", touchAction: 'none' }} gl={{ localClippingEnabled: true }}>
      <ThreeState />
      <PointerEvents />
      <Root backgroundColor="#42258d" sizeX={8} sizeY={6} flexDirection="row" borderRadius={10} padding={10} gap={10}>
        <FontFamilyProvider
          inter={{
              normal: 'inter-normal.json',
              bold: 'Inter_18pt-Bold-msdf.json',
              'semi-bold': 'Inter_18pt-SemiBold-msdf.json'
            }}
            italic={{ normal: 'Inter_18pt-Italic-msdf.json' }}
        >
          <DefaultProperties fontFamily="inter">
            <Container flexGrow={1} backgroundColor="#9a398d" flexDirection="row" padding={10} gap={10}>
              <ScrollableContainer
                minWidth="10%"
                backgroundColor="white"
                backgroundOpacity={0.5}
                padding={10}
                flexDirection="row"
                scrollToEnd={false}
              >
                <MarkdownParser 
                  markdown={
                    "# Überschrift\n## Unterüberschrift\nNormaler Text hier. I just love **bold text**. Und noch einmal _italic text_.\n\n- Listenpunkt 1\n- Listenpunkt 2\n- Listenpunkt 3\n\n1. Listenpunkt 1\n2. Listenpunkt 2\n3. Listenpunkt 3 \n\n das ist ein zwischen Text \n---\n\n> Zitat"
                  }
                />
              </ScrollableContainer>
            </Container>
          </DefaultProperties>
        </FontFamilyProvider>
      </Root>
    </Canvas>
  )
}