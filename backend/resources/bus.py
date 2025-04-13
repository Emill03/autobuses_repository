from flask import request
from flask_restful import Resource, fields, marshal_with
from models import db, Bus

bus_fields = {
    'id': fields.Integer,
    'busNumber': fields.String,
    'model': fields.String,
    'capacity': fields.Integer,
    'year': fields.Integer,
    'status': fields.String,
}

class BusListResource(Resource):
    @marshal_with(bus_fields)
    def get(self):
        buses = Bus.query.all()
        return buses

    def post(self):
        data = request.get_json()
        bus = Bus(
            busNumber=data.get('busNumber'),
            model=data.get('model'),
            capacity=data.get('capacity'),
            year=data.get('year'),
            status=data.get('status')
        )
        db.session.add(bus)
        db.session.commit()
        return {'message': 'Bus created'}, 201

class BusResource(Resource):
    @marshal_with(bus_fields)
    def get(self, id):
        bus = Bus.query.get_or_404(id)
        return bus

    def put(self, id):
        bus = Bus.query.get_or_404(id)
        data = request.get_json()
        bus.busNumber = data.get('busNumber', bus.busNumber)
        bus.model = data.get('model', bus.model)
        bus.capacity = data.get('capacity', bus.capacity)
        bus.year = data.get('year', bus.year)
        bus.status = data.get('status', bus.status)
        db.session.commit()
        return {'message': 'Bus updated'}

    def delete(self, id):
        bus = Bus.query.get_or_404(id)
        db.session.delete(bus)
        db.session.commit()
        return {'message': 'Bus deleted'}