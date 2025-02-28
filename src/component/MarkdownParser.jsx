import { Container, Text, DefaultProperties } from '@react-three/uikit';
import { Separator } from '@react-three/uikit-default';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { gfmTable } from 'micromark-extension-gfm-table';
import { gfmTableFromMarkdown } from 'mdast-util-gfm-table';
import React from 'react';
import BulletPointList from '@/src/component/BulletPointList';
import OrderedList from '@/src/component/OrderedList';
import Heading from '@/src/component/Heading';
import Citation from '@/src/component/Citation';
import ImageBlock from '@/src/component/ImageBlock';

const MarkdownParser = ({ children, fontFamily, formatNormalText = true }) => {
  const generateKey = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  const setKey = (node) => {
    node.key = generateKey();
    if (node.children) {
      for (const child of node.children) {
        setKey(child);
      }
    }
  }
  
  const parseMarkdown = (text) => {
    const tree = fromMarkdown(text, {
      extensions: [gfmTable()],
      mdastExtensions: [gfmTableFromMarkdown()]
    });
    setKey(tree);
    return renderNode(tree, text);
  }

  const renderNode = (node, input, parent = null, index = null) => {
    const nodeText = node.children ?
      node.children.map((item) => input.slice(item.position.start.offset, item.position.end.offset)).join('') :
      input.slice(node.position.start.offset, node.position.end.offset);
    
    const getContent = (contentNode = node) => {
      const content = [];
      if (contentNode.children) {
        contentNode.children.forEach((child, childIndex) => {
          content.push(renderNode(child, input, contentNode, childIndex));
        });
      }
      return content;
    }
    switch (node.type) {
      case 'root':
        return getContent();

      case 'heading':
        return (
          <Heading 
            key={`heading-${node.key}`} 
            level={node.depth} 
            fontFamily={fontFamily}
          >
            {getContent()}
          </Heading>
        );

      case 'list':
        const items = node.children.map(item => 
          item.children.map(child => input.slice(child.position.start.offset, child.position.end.offset)).join('')
        );
        return node.ordered ? (
          <OrderedList 
            key={`ordered-${node.key}`} 
            items={items} 
            startIndex={node.start || 1}
            parseMarkdown
          />
        ) : (
          <BulletPointList 
            key={`unordered-${node.key}`} 
            items={items}
            parseMarkdown
          />
        );

      case 'blockquote':
        return (
          <Citation key={`citation-${node.key}`} parseMarkdown>
            {nodeText.replace('\n> ', '\n')}
          </Citation>
        );

      case 'paragraph':
        const lineContent = [];
        let flexDirection = 'row';
        if (nodeText.includes('\n')) {
          flexDirection = 'column';
          const lines = nodeText.split('\n');
          for (const line of lines) {
            lineContent.push(parseMarkdown(line));
          }
        } else {
          lineContent.push(...getContent());
        }
        const output = (
          <Container
            key={`container-${node.key}`}
            flexDirection={flexDirection}
            flexWrap="wrap"
            alignItems="baseline"
            gapRow={4}
          >
            {lineContent}
          </Container>
        );
        if (formatNormalText) {
            return (
            <DefaultProperties 
              key={`paragraph-${node.key}`}
              fontSize={14}
              fontFamily={fontFamily}
            >
              <Container key={`margin-${node.key}`} marginBottom={4}>
                {output}
              </Container>
            </DefaultProperties>
          );
        }
        return output;

      case 'image':
        return (
          <ImageBlock
            key={`image-${node.key}`}
            src={node.url}
            caption={node.alt}
          />
        );

      case 'strong':
        return (
          <DefaultProperties key={`strong-${node.key}`} fontWeight="bold">
            {getContent()}
          </DefaultProperties>
        );

      case 'emphasis':
        return (
          <DefaultProperties key={`italic-${node.key}`} fontFamily="italic">
            {getContent()}
          </DefaultProperties>
        );

      case 'link':
        return (
          <DefaultProperties 
            key={`link-${node.key}`}
            color="#ec407a"
            textDecoration="underline"
            onClick={() => window.open(node.url, '_blank')}
            cursor="pointer"
          >
            {getContent()}
          </DefaultProperties>
        );

      case 'text':
        const right = nodeText.slice(-1) === ' ' ? 5 : 0;
        const left = nodeText.slice(0, 1) === ' ' ? 5 : 0;
        return (<Text key={`text-${node.key}`} marginLeft={left} marginRight={right}  >{node.value}</Text>);

      case 'thematicBreak':
        return (
          <Container key={`container-${node.key}`} marginVertical={10}>
            <Separator />
          </Container>
        );

      case 'table':
        let columnCount = node.children[0].children.length;
        for (const row of node.children) {
          if (row.children.length > columnCount) {
            columnCount = row.children.length;
          }
        }
        let borderType = 'all';
        let headerColor = '#fce4ec';
        const infoCell = node.children[0].children[0].children;
        const infoIndex = infoCell.findIndex(child => child.type === 'html' && child.value === '<border>');
        const headerIndex = infoCell.findIndex(child => child.type === 'html' && child.value === '<header>');
        if (
          infoIndex !== -1 &&
          infoCell.length > infoIndex + 1
        ) {
          borderType = infoCell[infoIndex + 1].value;
        }
        if (
          headerIndex !== -1 &&
          infoCell.length > headerIndex + 1
        ) {
          headerColor = infoCell[headerIndex + 1].value;
        }
        return (
          <Container 
            key={`table-${node.key}`} 
            flexDirection="column"
            marginVertical={10}
            borderXWidth={borderType === 'column' || borderType === 'all' ? 0.6 : borderType === 'outline' ? 1 : 0}
            borderYWidth={borderType === 'row' || borderType === 'all' ? 0.6 : borderType === 'outline' ? 1 : 0}
            borderColor="#ec407a"
          >
            {node.children.map((row, rowIndex) => (
              <Container 
                key={`row-${node.key}-${rowIndex}`}
                flexDirection="row"
                backgroundColor={rowIndex === 0 && headerColor !== 'transparent' ? headerColor : undefined}
              >
                {Array.from({ length: columnCount }, (_, cellIndex) => (
                  <Container
                    key={`cell-${node.key}-${rowIndex}-${cellIndex}`}
                    paddingX={10}
                    paddingY={5}
                    borderXWidth={borderType === 'column' || borderType === 'all' ? 0.6 : 0}
                    borderYWidth={borderType === 'row' || borderType === 'all' ? 0.6 : 0}
                    borderColor="#ec407a"
                    justifyContent={node.align?.[cellIndex]?.replace('left', 'flex-start')?.replace('right', 'flex-end') || 'flex-start'}
                    width={`${100 / columnCount}%`}
                  >
                    <DefaultProperties
                      fontSize={14}
                      fontFamily={fontFamily}
                      fontWeight={rowIndex === 0 ? "bold" : "normal"}
                    >
                      {getContent(row.children[cellIndex])}
                    </DefaultProperties>
                  </Container>
                ))}
              </Container>
            ))}
          </Container>
        );

      case 'html':
        const wrapInner = () => {
          if (parent && parent.children.length > index + 1) {
            for (let i = index + 1; i < parent.children.length; i++) {
              const nextNode = parent.children[i];
              if (nextNode.type === 'html' && nextNode.value.includes('</u>')) {
                break;
              }
              if (!node.children) node.children = [];
              node.children.push(nextNode);
            }
            const content = getContent();
            for (const child of node.children) {
              child.type = 'hidden';
            }
            return content;
          }
        };
        if (node.value.includes('<u>')) {
          const content = wrapInner();
          return (
            <Container key={`underline-${node.key}`} flexDirection="row" flexWrap="wrap" borderBottomWidth={1} borderColor="#ec407a">
              {content}
            </Container>
          );
        }
        if (node.value.includes('<border>') || node.value.includes('<header>')) {
          wrapInner();
        }
        return null;

      case 'hidden':
        return null;

      default:
        console.warn('Unhandled node type:', node.type);
        return null;
    }
  };

  const lines = children.split('\n').map((item) => item.trim()).join('\n');
  const content = parseMarkdown(lines);
  
  if (formatNormalText) {
    return (
      <Container
        key={`container-${lines.length}`}
        flexDirection="column"
        gap={4}
        padding={10}
      >
        {content}
      </Container>
    );
  }
  
  return content;
};

export default MarkdownParser; 