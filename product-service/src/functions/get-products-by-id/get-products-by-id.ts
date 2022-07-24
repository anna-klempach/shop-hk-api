import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ErrorInfo, ProductFull } from '@libs/models';
import PgService from 'src/pg-service';

import schema from './schema';

const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { productId } = event.pathParameters;
  try {
    const products = await PgService.getProductsById(productId);
    if (products.length === 0) {
      return formatJSONResponse<ErrorInfo>({ message: 'Product not found' }, 404);
    }
    return formatJSONResponse<ProductFull>(products[0]);
  }
  catch ({ error, message }) {
    return formatJSONResponse<ErrorInfo>({ message }, error ? error : 500);
  }
};

export const main = middyfy(getProductsById);
