import { faker } from '@faker-js/faker';
import { googleMatrixClient } from '../../clients';
import { IsraelCitiesCoordinates } from './israel-cities-coordinates';

export const fakeNearByLocation = () => {
  const centralLocation = faker.helpers.arrayElement(IsraelCitiesCoordinates);
  const nearbyGPSCoordinate = faker.address.nearbyGPSCoordinate(centralLocation, 5, true);
  return googleMatrixClient.getFullLocation({
    latitude: parseFloat(nearbyGPSCoordinate[0]),
    longitude: parseFloat(nearbyGPSCoordinate[1]),
  });
};
