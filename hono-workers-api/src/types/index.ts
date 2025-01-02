export interface ClipRequest {
  url?: string;
  id?: string;
}

export interface ClipResponse {
  valid: boolean;
  src?: string;
  reasoning?: string;
}
