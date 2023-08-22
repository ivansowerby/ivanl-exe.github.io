from typing import Union, Optional
from collections import defaultdict
from util.path import format_filepath, backtrack_path, join_path, trace_filepath
from os.path import isfile, getctime, isdir
from ai import AI
from util.hash import hash
from json import load, dump

class Library:
    def __init__(self, library: Optional[dict] = None) -> None:
        self.library = []
        if type(library) == dict: self.load(library)
    
    def load(self, library: dict) -> None:
        library = defaultdict(list, library)
        self.library = library['library']

    def shelf(self, description: dict) -> None:
        self.library.append(description)

class Description:
    def __init__(self, description: Optional[dict] = None) -> None:
        self.filepath = ''
        self.title = ''
        self.author = ''
        self.blurb = ''
        self.timestamp = 0
        self.hash = ''
        if type(description) == dict: self.load(description) 
    
    def load(self, description: dict) -> None:
        for key, value in description.items():
            if key not in self.__dict__: continue
            self.__dict__[key] = value

CONFIG_PATH = ('toml', 'config.toml')

class Blogger:
    def __init__(self, filepath: Union[tuple[str], list[str], str]) -> None:
        typeof = type(filepath)
        if typeof == tuple or typeof == list: filepath = join_path(*filepath)
        self.filepath = format_filepath(filepath, format = '.md')
        if not isfile(self.filepath): raise FileExistsError(self.filepath)

        self.timestamp = getctime(self.filepath)
        with open(self.filepath, 'r') as file:
            self.blog = file.read()
        
        self.ai = AI(CONFIG_PATH)
    
    def describe(self, max_attempts: int = 5) -> dict:
        description = self.ai.describe(self.blog, max_attempts)
        return description
    
    def index(self, destination_path: Union[tuple[str], list[str], str], description: dict = {}, indent: int = 4) -> str:
        while not isdir(destination_path):
            destination_path = backtrack_path(destination_path)
        destination_path = join_path(destination_path, 'index.json')

        library = Library()
        if isfile(destination_path):
            with open(destination_path, 'r') as file:
                obj = load(file)
                library.load(obj)
        
        description = Description(description)
        description.filepath = trace_filepath(
            from_path = destination_path,
            to_path = self.filepath
        )
        description.timestamp = self.timestamp
        description.hash = hash(self.blog)

        library.shelf(vars(description))

        with open(destination_path, 'w') as file:
            dump(vars(library), file, indent = indent)

        return destination_path


