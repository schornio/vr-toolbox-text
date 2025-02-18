import data from '@/src/assets/data/randomText.json';

export default function dynamicTextLoader(index, updateCallback) {
  const text = data[index];
  let displayText = "";

  const simulateTyping = () => {
    displayText = text.slice(0, displayText.length + 20);
    updateCallback(displayText);
    if (displayText.length < text.length) {
      setTimeout(() => simulateTyping(), 50);
    }
  };

  simulateTyping();
}