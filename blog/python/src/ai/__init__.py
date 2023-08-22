from typing import Union
from util.path import join_path, format_filepath, nth_backtrack_path
from toml import load
import openai
from tiktoken import encoding_for_model as encoding_model
from copy import deepcopy
from json import loads

class Chat:
    SYSTEM = 'system'
    USER = 'user'
    ASSISTANT = 'assistant'

    def __init__(self) -> None:
        self.conversation = []
    
    def message(self, role: str, content: str) -> None:
        self.conversation.append({
            'role': role,
            'content': content
        })
    
    def contents(self) -> list:
        return [message['content'] for message in self.conversation]

class AI:
    def __init__(self, config_path: Union[tuple[str], list[str], str]) -> None:
        typeof = type(config_path)
        if typeof == tuple or typeof == list: config_path = join_path(*config_path)
        self.config_path = join_path(nth_backtrack_path(2, __file__), format_filepath(config_path, format = '.toml'))
        
        with open(self.config_path, 'r') as file:
            self.config = load(file)

        config = self.config['openai']
        
        self.model = config['model']
        self.encoder = encoding_model(self.model)
        
        self.max_tokens = config['max-tokens']
        
        self.api_key = config['api-key']
        openai.api_key = self.api_key
        
        roles = config['role']
        self.system_statement = roles['system']['statement']
        self.chat = Chat()
        self.chat.message(Chat.ASSISTANT, self.system_statement)

    def token_counter(self, *statements: tuple[str]) -> int:
        return sum([len(self.encoder.encode(statement)) for statement in statements])

    def is_over_max_tokens(self, statements: Union[list[str], tuple[str]], margin: float = 0.05) -> bool:
        return sum([self.token_counter(statement) for statement in statements]) / (self.max_tokens * (1 - margin)) >= 1

    def describe(self, blog: str, max_attempts: int = 5) -> dict:
        chat = deepcopy(self.chat)
        chat.message(Chat.USER, content = blog)

        description = {}
        if self.is_over_max_tokens(chat.contents()): return description
        
        attempt = 0
        while description == {} and attempt < max_attempts:
            attempt += 1
            try:
                completion = openai.ChatCompletion.create(
                    model = self.model,
                    messages = chat.conversation
                )
                choices = completion['choices']
                latest_message = choices[-1]['message']
                assistant_content = latest_message['content']
                
                description = loads(assistant_content)
            except:
                print(f'Attempt No. {attempt} of {max_attempts}')
        return description