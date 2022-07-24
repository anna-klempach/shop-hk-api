export const eventLogger = () => {
  return {
    before: async ({ event, context }) => console.log(`${context.functionName}:`, event)
  }
};