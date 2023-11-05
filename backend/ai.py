import inspect, json
from inspect import Parameter
from pydantic import create_model
from openai import ChatCompletion, Completion

def schema(f):
    kw = {n:(o.annotation, ... if o.default==Parameter.empty else o.default)
          for n,o in inspect.signature(f).parameters.items()}
    s = create_model(f'Input for `{f.__name__}`', **kw).schema()

    return dict(name=f.__name__, description=f.__doc__, parameters=s)


def askgpt(query, system=None, model="gpt-3.5-turbo", **kwargs):
    msgs = []
    if system: 
        msgs.append({"role": "system", "content": system})
    msgs.append({"role": "user", "content": query})
    return ChatCompletion.create(model=model, messages=msgs, **kwargs)
