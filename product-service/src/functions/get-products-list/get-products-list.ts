import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ErrorInfo, ProductFull } from '@libs/models';
import PgService from 'src/pg-service';

import schema from './schema';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  try {
    const products = await PgService.getProducts();
    return formatJSONResponse<Array<ProductFull>>(products);
  }
  catch (error) {
    return formatJSONResponse<ErrorInfo>({ message: 'Unable to send products list.' }, 404);
  }
};

export const main = middyfy(getProductsList);
