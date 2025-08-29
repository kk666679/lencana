import { useEffect, useRef, useState } from 'react';

/**
 * Hook for monitoring component performance and web vitals
 * @param {string} componentName - Name of the component for tracking
 * @returns {Object} Performance metrics and utilities
 */
export const usePerformance = (componentName = 'Unknown') => {
  const [metrics, setMetrics] = useState({
    renderTime: 0,
    mountTime: 0,
    updateCount: 0
  });
  
  const mountTimeRef = useRef(null);
  const renderStartRef = useRef(null);
  const updateCountRef = useRef(0);

  // Track component mount time
  useEffect(() => {
    mountTimeRef.current = performance.now();
    
    return () => {
      if (mountTimeRef.current) {
        const mountDuration = performance.now() - mountTimeRef.current;
        setMetrics(prev => ({ ...prev, mountTime: mountDuration }));
        
        // Log performance in development
        if (import.meta.env.DEV) {
          console.log(`[Performance] ${componentName} mount time: ${mountDuration.toFixed(2)}ms`);
        }
      }
    };
  }, [componentName]);

  // Track render performance
  useEffect(() => {
    renderStartRef.current = performance.now();
    updateCountRef.current += 1;
    
    // Use setTimeout to measure after render completion
    setTimeout(() => {
      if (renderStartRef.current) {
        const renderDuration = performance.now() - renderStartRef.current;
        setMetrics(prev => ({
          ...prev,
          renderTime: renderDuration,
          updateCount: updateCountRef.current
        }));
      }
    }, 0);
  });

  /**
   * Measure execution time of a function
   * @param {Function} fn - Function to measure
   * @param {string} label - Label for the measurement
   * @returns {Promise|any} Result of the function
   */
  const measureFunction = async (fn, label = 'Function') => {
    const start = performance.now();
    
    try {
      const result = await fn();
      const duration = performance.now() - start;
      
      if (import.meta.env.DEV) {
        console.log(`[Performance] ${componentName} - ${label}: ${duration.toFixed(2)}ms`);
      }
      
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      console.error(`[Performance] ${componentName} - ${label} failed after ${duration.toFixed(2)}ms:`, error);
      throw error;
    }
  };

  /**
   * Get Web Vitals metrics
   * @returns {Promise<Object>} Web Vitals data
   */
  const getWebVitals = () => {
    return new Promise((resolve) => {
      const vitals = {};
      
      // Largest Contentful Paint
      if ('PerformanceObserver' in window) {
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            vitals.lcp = lastEntry.startTime;
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
          
          // First Input Delay
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
              vitals.fid = entry.processingStart - entry.startTime;
            });
          });
          fidObserver.observe({ entryTypes: ['first-input'] });
          
          // Cumulative Layout Shift
          const clsObserver = new PerformanceObserver((list) => {
            let clsValue = 0;
            const entries = list.getEntries();
            entries.forEach((entry) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            });
            vitals.cls = clsValue;
          });
          clsObserver.observe({ entryTypes: ['layout-shift'] });
          
          setTimeout(() => resolve(vitals), 1000);
        } catch (error) {
          console.warn('Performance Observer not supported:', error);
          resolve(vitals);
        }
      } else {
        resolve(vitals);
      }
    });
  };

  return {
    metrics,
    measureFunction,
    getWebVitals,
    isSlowRender: metrics.renderTime > 16, // 60fps threshold
    isSlowMount: metrics.mountTime > 100,
    updateCount: metrics.updateCount
  };
};

export default usePerformance;