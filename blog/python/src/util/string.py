from typing import Union, Callable

def find_all(s: str, selectors: Union[str, tuple[str], list[str]], by: Callable = str.find, contiguous: bool = True) -> tuple[int]:
    if type(selectors) == str: selectors = [selectors]
    l = []
    for selector in selectors:
        i = 0
        for _ in range(s.count(selector)):
            j = i
            i = by(s, selector, i + 1)
            if not contiguous and abs(i - j) == 1: continue
            l.append(i)
    return l

def find_by(s: str, selectors: Union[tuple[str], list[str]], by: Callable = str.find) -> int:
    return [i for i in map(lambda selector: by(s, selector), selectors) if i != -1]

def __until__(s: str, selectors: Union[tuple[str], list[str], str], _range: Union[tuple[int], list[int]]) -> int:
    (start, stop, increment) = _range
    if type(selectors) == str: selectors = [selectors]
    i = start
    while i != stop and s[i] in selectors:
        i += increment
    return i

def count_all(s: str, selectors: Union[tuple[str], list[str]]) -> int:
    return sum([s.count(selector) for selector in selectors])