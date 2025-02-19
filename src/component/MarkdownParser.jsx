import { Container, Text, DefaultProperties } from '@react-three/uikit';
import { Separator } from '@react-three/uikit-default';
import React from 'react';
import BulletPointList from '@/src/component/BulletPointList';
import OrderedList from '@/src/component/OrderedList';

const MarkdownParser = ({ children, fontFamily }) => {
  const parseMarkdown = (text) => {
    const elements = [];
    const lines = text.split('\n').map((item) => item.trim());
    

    const parseInlineStyles = (text) => {
      let parts = [];
      let currentIndex = 0;

      while (currentIndex < text.length) {
        const boldMatch = text.slice(currentIndex).match(/(\*\*|__)(.*?)\1/);
        const italicMatch = text.slice(currentIndex).match(/(\*(?!\*)|_(?!_))(.*?)\1/);

        let match = null;
        let isBold = false;
        if (boldMatch && (!italicMatch || boldMatch.index < italicMatch.index)) {
          match = boldMatch;
          isBold = true;
        } else if (italicMatch) {
          match = italicMatch;
        }

        if (!match) {
          const displayText = text.slice(currentIndex);
          
          parts.push(
            <Text key={currentIndex} paddingRight={displayText.slice(-1) === ' ' ? 5 : 0} paddingLeft={displayText.slice(0, 1) === ' ' ? 5 : 0}>
              {displayText}
            </Text>
          );
          break;
        }

        if (match.index > 0) {
          const preText = text.slice(currentIndex, currentIndex + match.index);
          parts.push(
            <Text key={`pre-${currentIndex}`} paddingRight={preText.slice(-1) === ' ' ? 5 : 0} paddingLeft={preText.slice(0, 1) === ' ' ? 5 : 0}>
              {preText}
            </Text>
          );
        }

        const content = match[2];
        if (isBold) {
          parts.push(
            <DefaultProperties key={`bold-${currentIndex}`} fontWeight="bold">
                {parseInlineStyles(content)}
            </DefaultProperties>
          );
        } else {
          parts.push(
            <DefaultProperties key={`italic-${currentIndex}`} fontFamily="italic">
                {parseInlineStyles(content)}
            </DefaultProperties>
          );
        }

        currentIndex += match.index + match[0].length;
      }

      return (
        <Container flexDirection="row">
          {parts}
        </Container>
      );
    };

    let currentIndex = -1;

    lines.forEach((line, index) => {
      if (index <= currentIndex) {
        return;
      }

      // Headlines
      const h1Match = line.match(/^# (.+)/);
      const h2Match = line.match(/^## (.+)/);
      const h3Match = line.match(/^### (.+)/);
      const ulMatch = line.match(/^[\*\-\+]\s+(.+)/);
      const olMatch = line.match(/^\d+\.\s+(.+)/);
      const blockquoteMatch = line.match(/^>\s*(.+)/);
      const hrMatch = line.match(/^[\*\-_]{3,}$/);

      if (h1Match) {
        elements.push(
          <DefaultProperties 
            fontSize={24} 
            fontWeight="bold" 
            fontFamily={fontFamily}
          >
            <Container key={index} marginBottom={10}>
                {parseInlineStyles(h1Match[1])}
            </Container>
          </DefaultProperties>
        );
      } else if (h2Match) {
        elements.push(
          <DefaultProperties 
            fontSize={20} 
            fontWeight="bold" 
            fontFamily={fontFamily}
          >
            <Container key={index} marginBottom={8}>
                {parseInlineStyles(h2Match[1])}
            </Container>
          </DefaultProperties>
        );
      } else if (h3Match) {
        elements.push(
          <DefaultProperties 
            fontSize={16} 
            fontWeight="bold" 
            fontFamily={fontFamily}
          >
            <Container key={index} marginBottom={6}>
                {parseInlineStyles(h3Match[1])}
            </Container>
          </DefaultProperties>
        );
      } else if (ulMatch || olMatch) {

        const ulItems = [];
        const olItems = [];
        let currentList = null;
        currentIndex = index;
  
        while (currentIndex < lines.length) {
          const ulMatch = lines[currentIndex].match(/^[\*\-\+]\s+(.+)/);
          const olMatch = lines[currentIndex].match(/^\d+\.\s+(.+)/);
          
  
          if (ulMatch && (!currentList || currentList === 'ul')) {
            ulItems.push(ulMatch[1]);
            currentList = 'ul';
            currentIndex++;
          } else if (olMatch && (!currentList || currentList === 'ol')) {
            olItems.push(olMatch[1]);
            currentList = 'ol';
            currentIndex++;
          } else {
            break;
          }
        }
        

        if (ulItems.length > 0) {
            elements.push(<BulletPointList items={ulItems} />);    
        }
        if (olItems.length > 0) {
            elements.push(<OrderedList items={olItems} />);    
        }
      } else if (blockquoteMatch) {
        elements.push(
          <DefaultProperties
            fontSize={14}
            fontFamily={fontFamily}
          >
            <Container 
              key={index} 
              marginBottom={4} 
              marginLeft={20} 
              flexDirection="row"
            >
              <Container 
                width={4} 
                marginRight={10} 
                backgroundColor="#666666"
              />
              <Container flexGrow={1}>
                {parseInlineStyles(blockquoteMatch[1])}
              </Container>
            </Container>
          </DefaultProperties>
        );
      } else if (hrMatch) {
        elements.push(
          <Container key={index} marginVertical={10}>
            <Separator />
          </Container>
        );
      } else if (line.trim() !== '') {
        elements.push(
          <DefaultProperties  
            fontSize={14}
            fontFamily={fontFamily}
          >
            <Container key={index} marginBottom={4}>
                {parseInlineStyles(line)}
            </Container>
          </DefaultProperties >
        );
      }
    });

    return elements;
  };

  return (
    <Container
      flexDirection="column"
      gap={4}
      padding={10}
    >
      {parseMarkdown(children)}
    </Container>
  );
};

export default MarkdownParser; 