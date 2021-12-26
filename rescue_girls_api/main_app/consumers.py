import json

from channels.generic.websocket import AsyncWebsocketConsumer


class AlertConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['alert_uuid']
        self.room_group_name = 'alert_'+str(self.room_name)

        # join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def receive(self, text_data=None, bytes_data=None):
        # Called with either text_data or bytes_data for each frame
        # You can call:
        await self.send(text_data="Welcome")
        # Or, to send a binary frame:
        # await self.send(bytes_data="Hello world!")
        # Want to force-close the connection? Call:
        # await self.close()
        # Or add a custom WebSocket error code!
        # self.close(code=4123)

    async def send_location(self, event):
        # send message to WebSocket
        await self.send(text_data=event['data'])
