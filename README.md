## Technologies

**Suggested order of exploration**

- [React](https://react.dev/learn): JavaScript Library to build user interfaces

- [Next.js](https://nextjs.org/docs): React framework for building full-stack web applications

- [React-Three-Fiber](https://r3f.docs.pmnd.rs/getting-started/introduction): React-three-fiber is a React renderer for three.js.

- [React-XR](https://pmndrs.github.io/xr/docs/getting-started/introduction): 🤳 XR for react-three-fiber

- [UI Kit](https://pmndrs.github.io/uikit/docs/getting-started/introduction): Build performant 3D user interfaces for threejs using R3F and yoga.

## Objective

- Build a Text component for VR which is context-agnostic
- It should be able to scale correctly based on parent's size.

## Observations:

- The project uses Next.js 14 instead of the latest Next.js 15 because Next.js 14 relies on React 18, which provides greater stability with React-Three-Fiber compared to React 19 (used in Next.js 15).
- It's recommended to review the [UI Kit Text component](https://pmndrs.github.io/uikit/docs/getting-started/components-and-properties#text) to understand a well-established community solution and identify potential enhancements we could incorporate.
