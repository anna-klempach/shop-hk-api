import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ErrorInfo, Product } from '@libs/models';
import ProductsService from 'src/products-service';

import schema from './schema';

const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { productId } = event.queryStringParameters;
  try {
    const product = await ProductsService.getProductById(productId);
    return formatJSONResponse<Product>(product);
  }
  catch ({ error, message }) {
    return formatJSONResponse<ErrorInfo>({ message }, error);
  }
};

export const main = middyfy(getProductsById);
