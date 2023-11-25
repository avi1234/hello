from openai import OpenAI

conversation_history = []

client = OpenAI(
    api_key='key',
)

def chat(input:str) -> str:
    conversation_history.append(
        {'role':'user', 'content':input}
    )

    completion = client.chat.completions.create(
        model="text-embedding-ada-002",
        messages=conversation_history
    )

    response_message = completion.choices[0].message
    conversation_history.append(
        {'role': 'system', 'content': response_message}
    )

    return response_message

print("🙋‍♂️ Welcome to ChatGPT (type 'bye' to exit)")
print("-----------------------------------------")
while True:
    user_input = input('🧘 You: ')
    if(user_input.lower() == 'bye'):
        print("💤💤💤")
        break;
    ai_response = chat(user_input)
    print(f"💻 AI: {ai_response}")