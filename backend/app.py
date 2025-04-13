from flask import Flask
from flask_restful import Api
from extensions import db
from resources.bus import BusListResource, BusResource
from resources.route import RouteListResource, RouteResource
from resources.schedule import ScheduleListResource, ScheduleResource
from resources.reservation import ReservationListResource, ReservationResource
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database with the app
db.init_app(app)

api = Api(app

# Buses
api.add_resource(BusListResource, '/buses')
api.add_resource(BusResource, '/buses/<int:id>')

# Rutas
api.add_resource(RouteListResource, '/routes')
api.add_resource(RouteResource, '/routes/<int:id>')

# Horarios
api.add_resource(ScheduleListResource, '/schedules')
api.add_resource(ScheduleResource, '/schedules/<int:id>')

# Reservas
api.add_resource(ReservationListResource, '/reservations')
api.add_resource(ReservationResource, '/reservations/<int:id>')

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)