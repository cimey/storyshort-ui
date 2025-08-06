export interface generateTextResponse {
  id:string;
  title: string;
  sections: videoSection[];
}

export interface videoSection {
  description: string;
  start: number;
  end: number;
  prompt: string;
} 

export interface generateVideoRequest{
    requestId: string;
    input: generateTextResponse;
}

export interface textGenerationWrapper {
  success: boolean;
  data: generateTextResponse;
  error: string;
}