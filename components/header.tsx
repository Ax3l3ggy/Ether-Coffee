import { Flex, Link, Text } from '@scale/scaleui-radix';
import { BrandLogo } from '@scale/scaleui-radix';

const Header = () => {
  return (
    <Flex
      gap="5"
      px="4"
      height="64px"
      align="center"
      className="border border-solid border-neutral-5"
    >
      <Flex gap="1" align="center">
        <BrandLogo size="3" className="m-1.5" />
        <Text size="5" weight="medium">
          App name
        </Text>
      </Flex>
      <Flex flexGrow="1" align="center" gap="6" justify="center">
        <Link href="/demo1" color="neutral">
          Demo Page 1
        </Link>
        <Link href="/demo2" color="neutral">
          Demo Page 2
        </Link>
        <Link href="/demo3" color="neutral">
          Demo Page 3
        </Link>
      </Flex>
    </Flex>
  );
};

export default Header;
