import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import ProductsService from 'src/ProductsService';

import schema from './schema';

const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { productId } = event.queryStringParameters;
  try {
    const product = await ProductsService.getProductById(productId);
    return formatJSONResponse(product);
  }
  catch ({error, message}) {
    return formatJSONResponse({message}, error);
  }
};

export const main = middyfy(getProductsById);
