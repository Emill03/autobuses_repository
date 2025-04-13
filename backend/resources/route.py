from flask import request
from flask_restful import Resource, fields, marshal_with
from models import db, Route

route_fields = {
    'id': fields.Integer,
    'routeName': fields.String,
    'origin': fields.String,
    'destination': fields.String,
    'distance': fields.Float
}

class RouteListResource(Resource):
    @marshal_with(route_fields)
    def get(self):
        routes = Route.query.all()
        return routes

    def post(self):
        data = request.get_json()
        route = Route(
            routeName=data.get('routeName'),
            origin=data.get('origin'),
            destination=data.get('destination'),
            distance=data.get('distance')
        )
        db.session.add(route)
        db.session.commit()
        return {'message': 'Route created', 'id': route.id}, 201

class RouteResource(Resource):
    @marshal_with(route_fields)
    def get(self, id):
        route = Route.query.get_or_404(id)
        return route

    def put(self, id):
        route = Route.query.get_or_404(id)
        data = request.get_json()
        route.routeName = data.get('routeName', route.routeName)
        route.origin = data.get('origin', route.origin)
        route.destination = data.get('destination', route.destination)
        route.distance = data.get('distance', route.distance)
        db.session.commit()
        return {'message': 'Route updated'}

    def delete(self, id):
        route = Route.query.get_or_404(id)
        db.session.delete(route)
        db.session.commit()
        return {'message': 'Route deleted'}