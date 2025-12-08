// src/app/components/utils/analytics.ts
type AnalyticsEvent = {
    form_field_interaction: {
      field: string;
      hasValue: boolean;
    };
    form_checkbox_change: {
      field: string;
      checked: boolean;
    };
    form_validation_failed: {
      errors: Record<string, string>;
    };
    form_rate_limited: Record<string, never>;
    form_submission_started: Record<string, never>;
    form_submission_success: Record<string, never>;
    form_submission_error: {
      error: string;
    };
    form_error: {
      error: string;
      errorInfo?: unknown;
    };
  };
  
  export const logAnalytics = async <T extends keyof AnalyticsEvent>(
    event: T,
    data: AnalyticsEvent[T]
  ): Promise<void> => {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event,
          data,
          timestamp: new Date().toISOString()
        })
      });
    } catch (error) {
      console.error('Analytics error:', error);
    }
  };