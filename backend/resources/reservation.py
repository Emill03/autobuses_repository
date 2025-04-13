from flask import request
from flask_restful import Resource, fields, marshal_with
from models import db, Reservation, Schedule
from datetime import date

reservation_fields = {
    'id': fields.Integer,
    'scheduleId': fields.Integer,
    'passengerName': fields.String,
    'seatNumber': fields.Integer,
    'reservationDate': fields.String

}

class ReservationListResource(Resource):
    @marshal_with(reservation_fields)
    def get(self):
        reservations = Reservation.query.all()
        return reservations

    def post(self):
        data = request.get_json()
        schedule_id = data.get('scheduleId')
        
        # Buscar el horario y sus reservas
        schedule = Schedule.query.get_or_404(schedule_id)
        
        # Obtener la capacidad del bus asociado al horario
        bus_capacity = schedule.bus.capacity
        # Contar las reservas ya realizadas para ese horario (puedes usar len o hacer una consulta de count)
        num_reservations = len(schedule.reservations)
        
        if num_reservations >= bus_capacity:
            return {'message': 'El horario está completo, no se pueden agregar más reservas'}, 400

        # Asignar el seat number automáticamente
        seat_number = num_reservations + 1
        
        reservation = Reservation(
            scheduleId=schedule_id,
            passengerName=data.get('passengerName'),
            seatNumber=seat_number,
            reservationDate=date.today()
        )
        db.session.add(reservation)
        db.session.commit()
        
        return {'message': 'Reserva creada', 'id': reservation.id}, 201

class ReservationResource(Resource):
    @marshal_with(reservation_fields)
    def get(self, id):
        reservation = Reservation.query.get_or_404(id)
        return reservation

    def delete(self, id):
        reservation = Reservation.query.get_or_404(id)
        db.session.delete(reservation)
        db.session.commit()
        return {'message': 'Reservation deleted'}