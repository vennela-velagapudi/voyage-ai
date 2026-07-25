/**
 * Global Express Error Handling Middleware
 */
export function errorHandler(err, req, res, _next) {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  console.error(`[Error] ${req.method} ${req.url} : ${err.stack || err.message}`);

  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}
