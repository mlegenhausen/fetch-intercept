// Typescript definition file
declare module 'fetch-intercept' {
  export interface FetchRequest {
    input: RequestInfo;
    init?: RequestInit;
  }
  
  export interface FetchInterceptor {
    request?(url: string, config: any): Promise<any[]> | any[];
    requestError?(error: any): Promise<any>;
    response?(response: Response, request: FetchRequest): Response;
    responseError?(error: any, request: FetchRequest): Promise<any>;
  }

  export function register(interceptor: FetchInterceptor): () => void;
  export function clear(): void;
}
