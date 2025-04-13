from extensions import db

class Bus(db.Model):
    __tablename__ = 'bus'
    id = db.Column(db.Integer, primary_key=True)
    busNumber = db.Column(db.String(20), unique=True, nullable=False)
    model = db.Column(db.String(50), nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    year = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(20), nullable=False)
    
    schedules = db.relationship('Schedule', backref='bus', lazy=True)

    def __repr__(self):
        return f"<Bus {self.busNumber} - {self.model}>"

class Route(db.Model):
    __tablename__ = 'route'
    id = db.Column(db.Integer, primary_key=True)
    routeName = db.Column(db.String(50), unique=True, nullable=False)
    origin = db.Column(db.String(50), nullable=False)
    destination = db.Column(db.String(50), nullable=False)
    distance = db.Column(db.Float, nullable=False)
    
    schedules = db.relationship('Schedule', backref='route', lazy=True)

    def __repr__(self):
        return f"<Route {self.routeName}: {self.origin} -> {self.destination}>"

class Schedule(db.Model):
    __tablename__ = 'schedule'
    id = db.Column(db.Integer, primary_key=True)
    busId = db.Column(db.Integer, db.ForeignKey('bus.id'), nullable=False)
    routeId = db.Column(db.Integer, db.ForeignKey('route.id'), nullable=False)
    departureTime = db.Column(db.DateTime, nullable=False)
    arrivalTime = db.Column(db.DateTime, nullable=False)
    
    reservations = db.relationship('Reservation', backref='schedule', lazy=True)

    def __repr__(self):
        return f"<Schedule Bus:{self.busId} Route:{self.routeId}>"

class Reservation(db.Model):
    __tablename__ = 'reservation'
    id = db.Column(db.Integer, primary_key=True)
    scheduleId = db.Column(db.Integer, db.ForeignKey('schedule.id'), nullable=False)
    passengerName = db.Column(db.String(100), nullable=False)
    seatNumber = db.Column(db.Integer, nullable=False)
    reservationDate = db.Column(db.Date, nullable=False)
    
    def __repr__(self):
        return f"<Reservation {self.passengerName} Seat:{self.seatNumber}>"