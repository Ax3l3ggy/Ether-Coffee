import { Heading, Button, Flex } from '@scale/scaleui-radix';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Heading size="9" style={{ marginBottom: '40px' }}>
        Scale Vercel Template
      </Heading>

      <Flex direction="column" gap="4">
        <Link href="/demo1">
          <Button size="4">Demo Page 1 - Basic Routing</Button>
        </Link>

        <Link href="/demo2">
          <Button size="4">Demo Page 2 - Dynamic Routing</Button>
        </Link>

        <Link href="/demo3">
          <Button size="4">Demo Page 3 - File Upload</Button>
        </Link>
      </Flex>
    </>
  );
}
