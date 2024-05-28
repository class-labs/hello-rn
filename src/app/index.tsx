/* eslint-disable no-console */
import { Home } from '@tamagui/lucide-icons';
import { doc, getDoc } from 'firebase/firestore/lite';
import { Button, YStack } from 'tamagui';

import { db } from '../support/firebase';

async function getPost(postId: string) {
  return await getDoc(doc(db, 'posts', postId));
}

export default function App() {
  return (
    <YStack flex={1} justifyContent="center" alignItems="center">
      <Button
        icon={<Home />}
        onPress={() => {
          getPost('1')
            .then((post) => {
              const { id, path } = post.ref;
              console.log('>>', { id, path }, post.data());
            })
            .catch((error: unknown) => {
              console.error(error);
            });
        }}
      >
        Hello world!
      </Button>
    </YStack>
  );
}
