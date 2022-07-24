export default {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        count: { type: 'number', minimum: 0 },
        price: { type: 'number', minimum: 0 }
      },
      required: ['title']
    }
  }
}