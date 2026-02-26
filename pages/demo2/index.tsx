import { Button, Flex } from '@scale/scaleui-radix';
import Link from 'next/link';

export default function Demo2Index() {
  return (
    <>
      <h1 style={{ marginBottom: '20px' }}>Files List</h1>

      <Flex direction="column" gap="4">
        <Link href="/demo2/123">
          <Button size="4">View ID: 123</Button>
        </Link>

        <Link href="/demo2/abc">
          <Button size="4">View ID: abc</Button>
        </Link>

        <Link href="/">
          <Button size="4" variant="soft">
            Back to Home
          </Button>
        </Link>
      </Flex>
    </>
  );
}
