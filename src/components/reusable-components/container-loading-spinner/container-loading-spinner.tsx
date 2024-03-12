import { FunctionComponent } from 'react';
import { Box, Spinner } from '@cloudscape-design/components';

const ContainerLoadingSpinnerComponent: FunctionComponent = () => {
  return (
    <Box textAlign={'center'}>
      <Spinner size={'large'} />
    </Box>
  );
};

export { ContainerLoadingSpinnerComponent };
