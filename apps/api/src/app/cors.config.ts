export const isDevelopment = process.env['NODE_ENV'] === 'development';
export const cors = {
  origin: isDevelopment ? '*' : true,
  methods: ['GET', 'POST'],
  credentials: true,
};
