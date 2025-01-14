import axios, { AxiosInstance, AxiosError } from 'axios';
import { DeepseekConfig, DeepseekError, DeepseekErrorCode } from '../types';

interface DeepseekErrorResponse {
  message: string;
  code?: string;
}

export class DeepseekClient {
  protected client: AxiosInstance;
  private config: DeepseekConfig;

  constructor(config: DeepseekConfig) {
    if (!config.apiKey || config.apiKey.trim() === '') {
      throw new DeepseekError(
        'API key is required. Please provide a valid Deepseek API key.',
        DeepseekErrorCode.AUTHENTICATION_FAILED,
        401
      );
    }

    this.config = config;
    this.client = axios.create({
      baseURL: config.baseURL || 'https://api.deepseek.com/v1',
      timeout: config.timeout || 30000,
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError<DeepseekErrorResponse>) => {
        const status = error.response?.status || 500;
        let message = '';

        switch (status) {
          case 400:
            message = 'Invalid request format. Please check your request parameters.';
            break;
          case 401:
            message = 'Authentication failed. Please check your API key.';
            break;
          case 402:
            message = 'Insufficient balance. Please top up your Deepseek account at https://platform.deepseek.com/billing';
            break;
          case 422:
            message = 'Invalid parameters. Please check your request parameters.';
            break;
          case 429:
            message = 'Rate limit exceeded. Please slow down your requests.';
            break;
          case 500:
            message = 'Server error. Please try again later.';
            break;
          case 503:
            message = 'Service temporarily unavailable. Server is overloaded.';
            break;
          default:
            message = error.response?.data?.message || error.message || 'Unknown error occurred';
        }

        throw new DeepseekError(
          message,
          status,
          status
        );
      }
    );
  }

  protected async get<T>(url: string, params?: any): Promise<T> {
    const response = await this.client.get<T>(url, { params });
    return response.data;
  }

  protected async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.post<T>(url, data);
    return response.data;
  }
} 