/**
 * Centralized logging utility for error tracking and monitoring
 *
 * In production, this should integrate with services like Sentry, DataDog, or LogRocket
 * For development, logs are output to console
 */

export type LogLevel = "info" | "warn" | "error" | "debug";

export interface LogContext {
  userId?: string;
  component?: string;
  action?: string;
  metadata?: Record<string, unknown>;
  endpoint?: string;
  statusCode?: number;
  operation?: string;
  [key: string]: unknown;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === "development";

  /**
   * Log an error with context
   */
  error(message: string, error?: Error, context?: LogContext): void {
    if (this.isDevelopment) {
      console.error("[ERROR]", message, {
        error: error?.message,
        stack: error?.stack,
        ...context,
      });
    } else {
      // TODO: Send to Sentry or other error tracking service
      // Sentry.captureException(error, {
      //   tags: { component: context?.component },
      //   extra: { message, ...context },
      // });
    }
  }

  /**
   * Log a warning
   */
  warn(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.warn("[WARN]", message, context);
    } else {
      // TODO: Send to logging service
    }
  }

  /**
   * Log general information
   */
  info(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.info("[INFO]", message, context);
    } else {
      // TODO: Send to logging service
    }
  }

  /**
   * Log debug information (development only)
   */
  debug(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.debug("[DEBUG]", message, context);
    }
  }

  /**
   * Log API errors with request context
   */
  apiError(
    endpoint: string,
    error: Error,
    statusCode?: number,
    context?: LogContext
  ): void {
    this.error(`API Error: ${endpoint}`, error, {
      ...context,
      endpoint,
      statusCode,
    });
  }

  /**
   * Log authentication errors
   */
  authError(message: string, context?: LogContext): void {
    this.error(`Auth Error: ${message}`, undefined, {
      ...context,
      component: "auth",
    });
  }

  /**
   * Log database errors
   */
  dbError(operation: string, error: Error, context?: LogContext): void {
    this.error(`Database Error: ${operation}`, error, {
      ...context,
      component: "database",
      operation,
    });
  }
}

// Export singleton instance
export const logger = new Logger();
