import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/create-product.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'products'
      },
    },
  ],
};
