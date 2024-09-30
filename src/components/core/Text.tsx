import { styled } from '@tamagui/web';
import { SizableText } from 'tamagui';

// Adapted from node_modules/@tamagui/text/src/Paragraph.tsx
export const Text = styled(SizableText, {
  name: 'Text',
  tag: 'p',
  color: '$color',
  size: '$true',
  whiteSpace: 'normal',
});
