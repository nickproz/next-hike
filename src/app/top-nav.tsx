import { FunctionComponent, useContext } from 'react';
import { TopNavigation } from '@cloudscape-design/components';
import Logo from '@/assets/mountains-invert.png';
import { AppData } from '@/app/app.context.tsx';

const TopNavComponent: FunctionComponent = () => {
  const { onNavigate } = useContext(AppData).data;

  return (
    <TopNavigation
      identity={{
        href: '/',
        title: 'Next Hike',
        logo: { src: Logo, alt: 'Service' },
        onFollow: (e) => onNavigate('/', undefined, e),
      }}
      utilities={[]}
    />
  );
};

export { TopNavComponent };
