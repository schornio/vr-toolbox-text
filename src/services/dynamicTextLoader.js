import data from '@/src/assets/data/randomText.json';

export default function dynamicTextLoader(index, updateCallback, bufferTime = 500) {
  const text = data[index];
  let displayText = "";
  let lastCallback = 0;

  const simulateTyping = () => {
    displayText = text.slice(0, displayText.length + 20);
    const now = Date.now();
    if (lastCallback + bufferTime < now) {
      lastCallback = now;
      updateCallback(displayText);
    }
    if (displayText.length < text.length) {
      setTimeout(() => simulateTyping(), 50);
    }
  };

  simulateTyping();
}

export const getRandomTextIndex = () => {
  return data ? Math.round(Math.random() * data.length) : 0;
};