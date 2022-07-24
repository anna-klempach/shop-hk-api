export const errorHandler = () => ({
  onError: ({ error }) => {
    return { message: error?.toString() || 'Oops, something went wrong...', statusCode: error?.statusCode || 500 }
  }
});