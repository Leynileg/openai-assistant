export interface ChatGPTFunction {
  name: string;
  description: string;
  parameters: {
    type: string;
    properties: {
      [key: string]: {
        type: string;
        format?: string;
        description?: string;
        enum?: string[];
      };
    };
    required?: string[];
  };
}
