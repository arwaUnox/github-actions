import openai
import os

# client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Create the client instance with Together.ai's endpoint
client = openai.OpenAI(
    api_key="b5f2f47668eba0617301fda1650c426327dbeed73a928ae36fe5f3e8c2ac3bd5",
    base_url="https://api.together.xyz/v1"
)


def generate_code_review(prompt):
    response = client.chat.completions.create(
        # model="gpt-3.5-turbo",
        # model="mistralai/Mixtral-8x7B-Instruct-v0.1",
        model = 'meta-llama/Llama-3.3-70B-Instruct-Turbo',
        messages=[
            {
                "role": "system",
                "content": "You are a senior software engineer doing a code review. Point out issues, suggest improvements, and highlight best practices."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.5,
        max_tokens=500
    )
    return response.choices[0].message.content