import { FunctionComponent, ReactNode } from 'react';
import { AppLayout as AppLayoutPolaris, ContentLayout } from '@cloudscape-design/components';
import { TopNavComponent } from '@/app/top-nav.tsx';

export interface Props {
  children: ReactNode;
}

const SELECTOR_HEADER: string = 'h';

const AppLayoutComponent: FunctionComponent<Props> = ({ children }: Props) => {
  return (
    <>
      {/* Top nav */}
      <div id={SELECTOR_HEADER}>
        <TopNavComponent />
      </div>

      {/* App layout */}
      <AppLayoutPolaris
        toolsHide={true}
        navigationHide={true}
        headerSelector={`#${SELECTOR_HEADER}`}
        content={<ContentLayout disableOverlap={true}>{children}</ContentLayout>}
      />
    </>
  );
};
export { AppLayoutComponent };
