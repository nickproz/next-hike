import { FunctionComponent } from 'react';

export interface Props {
  coordinates: string;
}

// TODO: make env var
const MAPS_API_KEY: string = 'CHANGE_ME';

const HikeDirectionsComponent: FunctionComponent<Props> = ({ coordinates }: Props) => {
  if (!coordinates || !MAPS_API_KEY) {
    return <></>;
  }

  return (
    <iframe
      width="100%"
      height="100%"
      frameBorder="0"
      style={{ border: 'none', borderRadius: '16px' }}
      referrerPolicy="no-referrer-when-downgrade"
      src={`https://www.google.com/maps/embed/v1/directions?key=${MAPS_API_KEY}&origin=Current%20Location&destination=${coordinates}`}
      allowFullScreen
    ></iframe>
  );
};

export { HikeDirectionsComponent };
