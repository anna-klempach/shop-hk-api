//import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/get-products-list.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
        /* request: {
          schemas: {
            'application/json': schema,
          },
        }, */
      },
    },
  ],
};
