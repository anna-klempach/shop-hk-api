import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/get-products-by-id.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/{productId}'
      },
    },
  ],
};
