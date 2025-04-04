import openai
import os

openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_code_review(prompt):
    response = openai.ChatCompletion.create(
        model="gpt-4",
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
    return response['choices'][0]['message']['content']
