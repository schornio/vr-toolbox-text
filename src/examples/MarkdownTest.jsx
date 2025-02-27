import {Canvas} from '@react-three/fiber';
import {Root, Container, FontFamilyProvider, DefaultProperties} from '@react-three/uikit';
import { PointerEvents } from '@react-three/xr';
import React from 'react';
import ScrollableContainer from '@/src/component/ScrollableContainer';
import MarkdownParser from '@/src/component/MarkdownParser';

export default function App() {
  return (
    <Canvas style={{ position: "absolute", touchAction: 'none' }} gl={{ localClippingEnabled: true }}>
      <PointerEvents />
      <Root backgroundColor="#42258d" sizeX={8} sizeY={6} flexDirection="row" borderRadius={10} padding={10} gap={10}>
        <FontFamilyProvider
          inter={{
              normal: 'inter-normal.json',
              bold: 'Inter_18pt-Bold-msdf.json',
              'semi-bold': 'Inter_18pt-SemiBold-msdf.json'
            }}
            italic={{
              normal: 'Inter_18pt-Italic-msdf.json',
              bold: 'Inter_18pt-BoldItalic-msdf.json'
            }}
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
                <MarkdownParser>
                  {`# Überschrift _italic text_
                  ## Unterüberschrift
                  Normaler Text hier. I just love **bold text**. Und noch einmal _italic + **bold** text_. Und das ganze nochmal ***gleichzeitig***.
                  
                  ---
                  
                  - Listenpunkt 1
                  - Listenpunkt 3
                  - Listenpunkt 2 **bold text**
                  
                  1. Listenpunkt 1
                  2. Listenpunkt 2 **bold text**
                  
                  das ist ein zwischen Text ![Test image](1694078376509.jpg) mit einem Bild
                  My favorite website is [schorn.io](https://www.schorn.io/de). Please test this link.

                  3. Listenpunkt 3
                  4. Listenpunkt 4
                  
                  > Zitat
                  > line 2 with **bold text**
                  
                  | Spalte 1 | Spalte 2 | Spalte 3 |
                  |----------|:--------:|---------:|
                  | Links    | Zentriert| Rechts   |
                  | Text     | Text     | Text     |
                  
                  | a | b | c | d |
                  | - | :- | -: | :-: |
                  | e | f |
                  | g | h | i | j | k |
                  `}
                </MarkdownParser>
              </ScrollableContainer>
            </Container>
          </DefaultProperties>
        </FontFamilyProvider>
      </Root>
    </Canvas>
  )
}