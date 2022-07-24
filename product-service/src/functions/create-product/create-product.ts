import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ErrorInfo, Product } from '@libs/models';
import PgService from 'src/pg-service';
import validator from '@middy/validator';
import schema from './schema';

const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const product = event.body as Product;
  if (!product) {
    return formatJSONResponse<ErrorInfo>({ message: 'No data provided.' }, 400);
  }
  try {
    const id = await PgService.postProduct(product);
    return formatJSONResponse<string>(id);
  }
  catch ({ error, message }) {
    return formatJSONResponse<ErrorInfo>({ message }, error ? error : 500);
  }
};

export const main = middyfy(createProduct).use(validator({ inputSchema: schema }));
