const APP_CONFIG = {
  gemini: {
    key: "AIzaSyDw-pIM3h4rBg8YwwAuHcnTaS6-1lRWfBA",
    endpoint: "https://generativelanguage.googleapis.com/v1beta/models/",
    models: [
      { id: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash' },
      { id: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash' }
    ]
  },
  kilo: {
    key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnYiOiJwcm9kdWN0aW9uIiwia2lsb1VzZXJJZCI6IjE4Y2ViNjdiLTc0YTgtNDI0Zi05YzdmLWU2YWYxMDRjNmJlZiIsImFwaVRva2VuUGVwcGVyIjpudWxsLCJ2ZXJzaW9uIjozLCJpYXQiOjE3NzE5NTEyMTIsImV4cCI6MTkyOTYzMTIxMn0.60yxYHXuUxIK5oMOqsSdIlNySsil5srO71qqd3zEKjE",
    endpoint: "https://api.kilo.ai/v1/chat/completions",
    models: [
      { id: 'meta-llama/Llama-3.3-70B-Instruct', label: 'Llama 3.3 70B' },
      { id: 'Qwen/Qwen2.5-72B-Instruct', label: 'Qwen 2.5 72B' }
    ]
  },
  nvidia: {
    key: "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",
    endpoint: "https://integrate.api.nvidia.com/v1/chat/completions",
    models: [
      { id: 'deepseek-ai/deepseek-v3.2', label: 'DeepSeek V3.2' },
      { id: 'minimaxai/minimax-m2.1', label: 'MiniMax M2.1' }
    ]
  },
  openrouter: {
    key: "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",
    endpoint: "https://openrouter.ai/api/v1/chat/completions",
    models: [
      { id: 'arcee-ai/trinity-large-preview:free', label: 'Trinity Large' },
      { id: 'deepseek/deepseek-r1:free', label: 'DeepSeek R1' }
    ]
  }
};

window.APP_CONFIG = APP_CONFIG;
