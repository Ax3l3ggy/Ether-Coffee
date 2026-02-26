// components/Sidebar.tsx
import React from 'react';
import { SideNavigation } from '@scale/scaleui-radix';
import { MagnifyingGlassIcon, HamburgerMenuIcon, UploadIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/router';

const Sidebar: React.FC = () => {
  const router = useRouter();

  return (
    <SideNavigation.Root>
      <SideNavigation.Content>
        <SideNavigation.Item icon={<MagnifyingGlassIcon />} onClick={() => router.push('/demo1')}>
          Demo Page 1
        </SideNavigation.Item>
        <SideNavigation.Item icon={<HamburgerMenuIcon />} onClick={() => router.push('/demo2')}>
          Demo Page 2
        </SideNavigation.Item>
        <SideNavigation.Item icon={<UploadIcon />} onClick={() => router.push('/demo3')}>
          Demo Page 3
        </SideNavigation.Item>
      </SideNavigation.Content>
    </SideNavigation.Root>
  );
};

export default Sidebar;
