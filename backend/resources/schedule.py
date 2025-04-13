from flask import request
from flask_restful import Resource, fields, marshal_with
from datetime import datetime
from models import db, Schedule

schedule_fields = {
    'id': fields.Integer,
    'busId': fields.Integer,
    'routeId': fields.Integer,
    'departureTime': fields.String(attribute=lambda s: s.departureTime.isoformat()),
    'arrivalTime': fields.String(attribute=lambda s: s.arrivalTime.isoformat()),
    'bus': fields.Nested({
        'id': fields.Integer,
        'busNumber': fields.String
    }),
    'route': fields.Nested({
        'id': fields.Integer,
        'routeName': fields.String
    })
}

class ScheduleListResource(Resource):
    @marshal_with(schedule_fields)
    def get(self):
        schedules = Schedule.query.all()
        return schedules

    def post(self):
        data = request.get_json()
        try:
            schedule = Schedule(
                busId=int(data.get('busId')),
                routeId=int(data.get('routeId')),
                departureTime=datetime.fromisoformat(data.get('departureTime')),
                arrivalTime=datetime.fromisoformat(data.get('arrivalTime'))
            )
            db.session.add(schedule)
            db.session.commit()
            return {'message': 'Schedule created', 'id': schedule.id}, 201
        except Exception as e:
            db.session.rollback()
            return {'message': f'Error al crear horario: {str(e)}'}, 400

class ScheduleResource(Resource):
    @marshal_with(schedule_fields)
    def get(self, id):
        schedule = Schedule.query.get_or_404(id)
        return schedule

    def put(self, id):
        schedule = Schedule.query.get_or_404(id)
        data = request.get_json()
        try:
            if 'busId' in data:
                schedule.busId = int(data['busId'])
            if 'routeId' in data:
                schedule.routeId = int(data['routeId'])
            if 'departureTime' in data:
                schedule.departureTime = datetime.fromisoformat(data['departureTime'])
            if 'arrivalTime' in data:
                schedule.arrivalTime = datetime.fromisoformat(data['arrivalTime'])

            db.session.commit()
            return {'message': 'Schedule updated'}
        except Exception as e:
            db.session.rollback()
            return {'message': f'Error al actualizar horario: {str(e)}'}, 400

    def delete(self, id):
        schedule = Schedule.query.get_or_404(id)
        db.session.delete(schedule)
        db.session.commit()
        return {'message': 'Schedule deleted'}
