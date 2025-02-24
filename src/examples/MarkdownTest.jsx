import { Canvas } from "@react-three/fiber";
import {
  Root,
  Container,
  FontFamilyProvider,
  DefaultProperties,
} from "@react-three/uikit";
import { Handle, HandleTarget } from "@react-three/handle";
import { PointerEvents, XR } from "@react-three/xr";
import React from "react";
import ScrollableContainer from "@/src/component/ScrollableContainer";
import MarkdownParser from "@/src/component/MarkdownParser";
import { xrStore } from "../services/xrStore";

export default function App() {
  return (
    <Canvas
      style={{ position: "absolute", touchAction: "none" }}
      gl={{ localClippingEnabled: true }}
    >
      <XR store={xrStore}>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <PointerEvents />
        <HandleTarget>
          <Root
            backgroundColor="#42258d"
            sizeX={8}
            sizeY={6}
            flexDirection="row"
            borderRadius={10}
            padding={10}
            gap={10}
          >
            <FontFamilyProvider
              inter={{
                normal: "inter-normal.json",
                bold: "Inter_18pt-Bold-msdf.json",
                "semi-bold": "Inter_18pt-SemiBold-msdf.json",
              }}
              italic={{
                normal: "Inter_18pt-Italic-msdf.json",
                bold: "Inter_18pt-BoldItalic-msdf.json",
              }}
            >
              <DefaultProperties fontFamily="inter">
                <Container
                  flexGrow={1}
                  backgroundColor="#9a398d"
                  flexDirection="row"
                  padding={10}
                  gap={10}
                >
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
                    > line 2 with **bold text**`}
                    </MarkdownParser>
                  </ScrollableContainer>
                </Container>
              </DefaultProperties>
            </FontFamilyProvider>
          </Root>
          <Handle targetRef="from-context" rotate={false} scale={false}>
            <mesh position={[0, -3, 0]}>
              <boxGeometry args={[3, 0.2, 0.2]} />
              <meshStandardMaterial color="hotpink" />
            </mesh>
          </Handle>
          <Handle
            targetRef="from-context"
            scale={{ uniform: true }}
            multitouch={false}
            translate="as-scale"
            rotate={false}
          >
            <mesh position={[4, -3, 0]}>
              <boxGeometry args={[0.2, 0.2, 0.2]} />
              <meshStandardMaterial color="purple" />
            </mesh>
          </Handle>
        </HandleTarget>
      </XR>
    </Canvas>
  );
}
