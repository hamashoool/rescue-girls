from urllib.parse import parse_qs

from channels.db import database_sync_to_async
from channels.auth import AuthMiddlewareStack
from django.contrib.auth.models import AnonymousUser
from rest_framework.authtoken.models import Token


@database_sync_to_async
def get_user(scope):
    try:
        token_key = parse_qs(scope["query_string"].decode("utf8"))["token"][0]
        token = Token.objects.get(key=token_key)
        return token.user
    except Exception as e:
        return AnonymousUser()


class TokenAuthMiddleware:
    def __init__(self, inner):
        self.inner = inner

    def __call__(self, scope):
        return TokenAuthMiddlewareInstance(scope, self)


class TokenAuthMiddlewareInstance:
    def __init__(self, scope, middleware):
        self.scope = dict(scope)
        self.inner = middleware.inner

    async def __call__(self, receive, send, *args, **kwargs):
        self.scope['user'] = await get_user(self.scope)
        inner = self.inner(self.scope, receive, send)
        return await inner
