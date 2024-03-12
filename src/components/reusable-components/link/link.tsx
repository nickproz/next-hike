import { FunctionComponent, useContext } from 'react';
import { Link, LinkProps as CloudscapeLinkProps } from '@cloudscape-design/components';
import { AppData } from '@/app/app.context.tsx';

export type LinkProps = CloudscapeLinkProps;

const LinkComponent: FunctionComponent<LinkProps> = (props: CloudscapeLinkProps) => {
  const { onNavigate } = useContext(AppData).data;

  return <Link {...props} onFollow={(e) => !e.detail.external && onNavigate(e.detail.href!, undefined, e)} />;
};

export { LinkComponent };
