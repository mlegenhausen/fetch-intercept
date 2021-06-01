// Typescript definition file
declare module 'fetch-intercept' {
  export interface FetchInterceptorResponse extends Response {
    request: Request;
  }

  export interface FetchInterceptor {
    request?(url: string, config: any): Promise<any[]> | any[];
    requestError?(error: any): Promise<any>;
    response?(response: FetchInterceptorResponse): FetchInterceptorResponse;
    responseError?(error: any): Promise<any>;
  }

  export function register(interceptor: FetchInterceptor): () => void;
  export function clear(): void;
}
