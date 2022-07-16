import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import ProductsService from 'src/ProductsService';

import schema from './schema';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  try {
    const products = await ProductsService.getProducts();
    return formatJSONResponse(products);
  }
  catch (error) {
    return formatJSONResponse({ message: 'Unable to send products list.' }, 404);
  }
};

export const main = middyfy(getProductsList);
