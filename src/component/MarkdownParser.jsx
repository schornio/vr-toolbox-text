import { Container, Text, DefaultProperties } from '@react-three/uikit';
import { Separator } from '@react-three/uikit-default';
import React from 'react';
import BulletPointList from '@/src/component/BulletPointList';
import OrderedList from '@/src/component/OrderedList';
import Heading from '@/src/component/Heading';
import Citation from '@/src/component/Citation';
import ImageBlock from './ImageBlock';

const MarkdownParser = ({ children, fontFamily, formatNormalText = true }) => {
  const parseMarkdown = (text) => {
    const elements = [];
    const lines = text.split('\n').map((item) => item.trim());
    

    const parseInlineStyles = (text) => {
      let parts = [];
      let currentIndex = 0;

      while (currentIndex < text.length) {
        const boldAndItalicMatch = text.slice(currentIndex).match(/(\*\*\*|___)(.*?)\1/);
        const boldMatch = text.slice(currentIndex).match(/(\*\*(?!\*)|__(?!_))(.*?)\1/);
        const italicMatch = text.slice(currentIndex).match(/(\*(?!\*)|_(?!_))(.*?)\1/);
        const linkMatch = text.slice(currentIndex).match(/\[([^\]]+)\]\(([^)]+)\)/);
        const imageMatch = text.slice(currentIndex).match(/!\[([^\]]*)\]\(([^)]+)\)/);

        const boldItalicIndex = boldAndItalicMatch ? boldAndItalicMatch.index : text.length + 1;
        const boldIndex = boldMatch ? boldMatch.index : text.length + 1;
        const italicIndex = italicMatch ? italicMatch.index : text.length + 1;
        const linkIndex = linkMatch ? linkMatch.index : text.length + 1;
        const imageIndex = imageMatch ? imageMatch.index : text.length + 1;
        const minIndex = Math.min(boldIndex, italicIndex, boldItalicIndex, linkIndex, imageIndex);

        let match = null;
        let isBold = false;
        let isItalic = false;
        let isLink = false;
        let isImage = false;

        if (imageMatch && imageIndex === minIndex) {
          match = imageMatch;
          isImage = true;
        } else if (linkMatch && linkIndex === minIndex) {
          match = linkMatch;
          isLink = true;
        } else if (boldAndItalicMatch && boldItalicIndex === minIndex) {
          match = boldAndItalicMatch;
          isBold = true;
          isItalic = true;
        } else if (boldMatch && boldIndex === minIndex) {
          match = boldMatch;
          isBold = true;
        } else if (italicMatch && italicIndex === minIndex) {
          match = italicMatch;
          isItalic = true;
        }

        if (!match) {
          const displayText = text.slice(currentIndex);
          const right = displayText.slice(-1) === ' ' ? 5 : 0;
          const left = displayText.slice(0, 1) === ' ' ? 5 : 0;
          parts.push(
            <Text key={currentIndex} marginLeft={left} marginRight={right}>
              {displayText}
            </Text>
          );
          break;
        }

        const content = (isLink || isImage) ? match[1] : match[2];
        const url = (isLink || isImage) ? match[2] : null;

        if (match.index > 0) {
          const displayText = text.slice(currentIndex, currentIndex + match.index);
          const right = displayText.slice(-1) === ' ' ? 5 : 0;
          const left = displayText.slice(0, 1) === ' ' ? 5 : 0;
          parts.push(
            <Text key={`pre-${currentIndex}`} marginLeft={left} marginRight={right}>
              {displayText}
            </Text>
          );
        }

        if (isBold && isItalic) {
          parts.push(
            <DefaultProperties 
              key={`bold-italic-${currentIndex}`} 
              fontWeight="bold"
              fontFamily="italic"
            >
              {parseInlineStyles(content)}
            </DefaultProperties>
          );
        } else if (isBold) {
          parts.push(
            <DefaultProperties key={`bold-${currentIndex}`} fontWeight="bold">
                {parseInlineStyles(content)}
            </DefaultProperties>
          );
        } else if (isItalic) {
          parts.push(
            <DefaultProperties key={`italic-${currentIndex}`} fontFamily="italic">
                {parseInlineStyles(content)}
            </DefaultProperties>
          );
        } else if (isLink) {
          parts.push(
            <DefaultProperties 
              key={`link-${currentIndex}`} 
              color="#d81b60"
              textDecoration="underline"
            >
              <Container onClick={() => window.open(url, '_blank')} cursor="pointer">
                {parseInlineStyles(content)}
              </Container>
            </DefaultProperties>
          );
        } else if (isImage) {
          parts.push(
            <ImageBlock
              key={`image-${currentIndex}`}
              src={url}
              caption={content}
            />
          );
        }

        currentIndex += match.index + match[0].length;
      }

      return (
        <Container key={`inline-${currentIndex}`} flexDirection="row" flexWrap="wrap" alignItems="baseline">
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
      const h4Match = line.match(/^#### (.+)/);
      const h5Match = line.match(/^##### (.+)/);
      const h6Match = line.match(/^###### (.+)/);
      const ulMatch = line.match(/^[\*\-\+]\s+(.+)/);
      const olMatch = line.match(/^\d+\.\s+(.+)/);
      const blockquoteMatch = line.match(/^>\s*(.+)/);
      const hrMatch = line.match(/^[\*\-_]{3,}$/);

      if (h1Match) {
        elements.push(<Heading key={index} level={1} fontFamily={fontFamily} parseMarkdown>{h1Match[1]}</Heading>);
      } else if (h2Match) {
        elements.push(<Heading key={index} level={2} fontFamily={fontFamily} parseMarkdown>{h2Match[1]}</Heading>);
      } else if (h3Match) {
        elements.push(<Heading key={index} level={3} fontFamily={fontFamily} parseMarkdown>{h3Match[1]}</Heading>);
      } else if (h4Match) {
        elements.push(<Heading key={index} level={4} fontFamily={fontFamily} parseMarkdown>{h4Match[1]}</Heading>);
      } else if (h5Match) {
        elements.push(<Heading key={index} level={5} fontFamily={fontFamily} parseMarkdown>{h5Match[1]}</Heading>);
      } else if (h6Match) {
        elements.push(<Heading key={index} level={6} fontFamily={fontFamily} parseMarkdown>{h6Match[1]}</Heading>);
      } else if (ulMatch || olMatch) {

        const ulItems = [];
        const olItems = [];
        let currentList = null;
        currentIndex = index;
        const listLabel = parseInt(line.split('. ')[0]);
  
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
            elements.push(<BulletPointList key={`ul-${index}`} items={ulItems} parseMarkdown />);    
        }
        if (olItems.length > 0) {
            elements.push(<OrderedList key={`ol-${index}`} items={olItems} startIndex={listLabel} parseMarkdown />);    
        }
      } else if (blockquoteMatch) {

        let quoteText = '';
        currentIndex = index;
  
        while (currentIndex < lines.length) {
          const blockquoteMatch = lines[currentIndex].match(/^>\s*(.+)/);
  
          if (blockquoteMatch) {
            if (quoteText.length > 0) {
              quoteText += '\n';
            }
            quoteText += blockquoteMatch[1];
            currentIndex++;
          } else {
            break;
          }
        }

        elements.push(
          <Citation
            key={`citation-${index}`}
            parseMarkdown={true}
          >
            {quoteText}
          </Citation>
        );
      } else if (hrMatch) {
        elements.push(
          <Container key={`hr-container-${index}`} marginVertical={10}>
            <Separator key={`hr-${index}`} />
          </Container>
        );
      } else if (line.trim() !== '') {
        if (formatNormalText) {
          elements.push(
            <DefaultProperties  
              key={`normal-text-props-${index}`}
              fontSize={14}
              fontFamily={fontFamily}
            >
              <Container key={`normal-text-${index}`} marginBottom={4}>
                  {parseInlineStyles(line)}
              </Container>
            </DefaultProperties >
          );
        } else {
          elements.push(
            parseInlineStyles(line)
          );
        }
      }
    });

    return elements;
  };

  if (formatNormalText) {
    return (
      <Container
        key={`container-${children.length}`}
        flexDirection="column"
        gap={4}
        padding={10}
      >
        {parseMarkdown(children)}
      </Container>
    );
  } else {
    return parseMarkdown(children);
  }
};

export default MarkdownParser; 