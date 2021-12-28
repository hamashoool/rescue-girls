import json

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer

from main_app.api.serializers import LocationCoordsSerializer, LocationSerializer
from main_app.models import Alert, Location


class AlertConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.user = self.scope['user']
        self.room_name = self.scope['url_route']['kwargs']['alert_uuid']
        self.room_group_name = 'alert_'+str(self.room_name)

        # join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

        if self.user.is_savior:
            self.first_location = await database_sync_to_async(self.get_first_location)()
            data = LocationCoordsSerializer(self.first_location, many=False).data
            await self.send(text_data=json.dumps(data))

    def get_first_location(self):
        return Location.objects.filter(alert_id=self.room_name).first()


class GirlConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.user = self.scope['user']
        self.alert_id = self.scope['url_route']['kwargs']['alert_uuid']
        self.alert = await self.get_alert()
        self.room_group_name = 'alert_'+str(self.alert_id)

        # join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        if self.user.is_girl:
            await self.accept()
        else:
            await self.close()

    async def receive(self, text_data=None, bytes_data=None):
        received_data = json.loads(text_data)
        self.data_received = received_data['coords']
        self.created_location = await self.create_location()
        serialized_location = LocationCoordsSerializer(self.created_location, many=False).data
        channel_layer = get_channel_layer()
        await channel_layer.send( self.room_group_name, {
            "type": "send_location",
            "data": serialized_location
        })
        print(serialized_location)
            # await self.send(text_data=json.dumps(serialized_location))

    @database_sync_to_async
    def create_location(self):
        received_data = self.data_received
        alert = self.alert
        return Location.objects.create(
            alert=alert,
            accuracy=received_data['accuracy'],
            altitude=received_data['altitude'],
            altitudeAccuracy=received_data['altitudeAccuracy'],
            heading=received_data['heading'],
            latitude=received_data['latitude'],
            longitude=received_data['longitude'],
            speed=received_data['speed'],
        )

    @database_sync_to_async
    def get_alert(self):
        return Alert.objects.get(uuid=self.alert_id)

    async def send_location(self, event):
        data = event['data']
        await self.send(text_data=json.dumps(data))
