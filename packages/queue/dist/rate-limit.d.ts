import type { Redis } from "ioredis";
export interface RateLimitConfig {
    limit: number;
    window: number;
    keyPrefix?: string;
}
export interface RateLimitResult {
    allowed: boolean;
    remaining: number;
    resetTime: number;
    limit: number;
}
/**
 * Redis-based sliding window rate limiter
 *
 * Features:
 * - Sliding window algorithm for accurate rate limiting
 * - Atomic operations using Redis pipeline
 * - Automatic cleanup of expired keys
 * - Fail-open strategy (allows requests if Redis is down)
 * - Support for multiple rate limit tiers
 *
 * @param redis - Redis connection instance
 * @param key - Unique identifier (e.g., IP address, user ID)
 * @param config - Rate limit configuration
 * @returns Rate limit result with allowed status and metadata
 */
export declare function checkRateLimit(redis: Redis, key: string, config: RateLimitConfig): Promise<RateLimitResult>;
/**
 * Advanced rate limiter with multiple tiers
 *
 * Example usage:
 * - Tier 1: 100 requests per minute (general users)
 * - Tier 2: 10 requests per second (burst protection)
 * - Tier 3: 1000 requests per hour (hourly cap)
 *
 * @param redis - Redis connection instance
 * @param key - Unique identifier
 * @param tiers - Array of rate limit configurations
 * @returns Combined rate limit result (most restrictive tier)
 */
export declare function checkMultiTierRateLimit(redis: Redis, key: string, tiers: RateLimitConfig[]): Promise<RateLimitResult>;
/**
 * Get current rate limit status without incrementing
 * Useful for checking limits before performing expensive operations
 *
 * @param redis - Redis connection instance
 * @param key - Unique identifier
 * @param config - Rate limit configuration
 * @returns Current rate limit status
 */
export declare function getRateLimitStatus(redis: Redis, key: string, config: RateLimitConfig): Promise<RateLimitResult>;
/**
 * Reset rate limit for a specific key
 * Useful for testing or manual admin actions
 *
 * @param redis - Redis connection instance
 * @param key - Unique identifier
 * @param config - Rate limit configuration
 */
export declare function resetRateLimit(redis: Redis, key: string, config: RateLimitConfig): Promise<void>;
//# sourceMappingURL=rate-limit.d.ts.map