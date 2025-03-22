import { NextResponse } from 'next/server';

// 类型定义
interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatRequestBody {
  messages: Message[];
}

export async function POST(request: Request) {
  try {
    // 解析请求体
    const body: ChatRequestBody = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request body: messages is required and must be an array' },
        { status: 400 }
      );
    }

    // 确保最后一条消息是用户消息
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role !== 'user') {
      return NextResponse.json(
        { error: 'Last message must be from user' },
        { status: 400 }
      );
    }

    // 调用Together AI API
    // 获取API密钥（实际使用时应从环境变量获取）
    const apiKey = process.env.TOGETHER_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // 将消息转换为Together AI API期望的格式
    const formattedMessages = messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    // 添加系统消息，指导模型生成适当格式的响应
    const systemMessage = {
      role: 'system',
      content: 'You are a helpful assistant for a greyhound sanctuary website. Provide friendly and accurate information about greyhound breeds, adoption, and care. Format your responses using Markdown (including bold, lists, etc.) to make them easy to read, but keep your responses concise and to the point. Ensure all formatting is valid markdown that can be rendered properly in a React application.'
    };

    // 调用Together AI API
    const response = await fetch('https://api.together.xyz/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'meta-llama/Llama-3-70b-chat-hf', // 可以替换为其他可用模型
        messages: [systemMessage, ...formattedMessages],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Together AI API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to get response from AI provider' },
        { status: 502 }
      );
    }

    const data = await response.json();
    
    // 提取AI回复
    const aiResponse = data.choices[0].message.content;

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 