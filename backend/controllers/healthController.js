/**
 * Health Check Controller
 */
export function getHealth(req, res, next) {
  try {
    res.status(200).json({
      status: 'success',
      message: 'Voyage AI API server is healthy and running',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
}
