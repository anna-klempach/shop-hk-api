import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ErrorInfo, Product } from '@libs/models';
import ProductsService from 'src/products-service';

import schema from './schema';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  try {
    const products = await ProductsService.getProducts();
    return formatJSONResponse<Array<Product>>(products);
  }
  catch (error) {
    return formatJSONResponse<ErrorInfo>({ message: 'Unable to send products list.' }, 404);
  }
};

export const main = middyfy(getProductsList);
