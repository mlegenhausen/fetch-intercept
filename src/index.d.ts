// Typescript definition file
declare module 'fetch-intercept' {
  export interface FetchInterceptor {
    request?(request: any, config?: any): Promise<any[]> | any[];
    requestError?(error: any): Promise<any>;
    response?(response: Response): Response;
    responseError?(error: any): Promise<any>;
  }

  export function register(interceptor: FetchInterceptor): () => void;
  export function clear(): void;
}
