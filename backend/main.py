import json
import tornado.ioloop
import tornado.web
import database as db
from validators import validateEvent, validateTask


# TO-DO:
# 1. Etags in POST requests
# -- 2. CODES (200, 201, 302)
# 3. Date validator, input validator
# 4. Kasowanie taskow wraz z eventem
# 5. Once exacly
# 6. Exampe usage bash

# /events                   (GET, POST)
# /events/{eid}             (GET, PUT, DELETE)
# /events/{eid}/tasks       (GET, POST)
# /events/{eid}/tasks/{tid} (GET, PUT, DELETE, PATCH)

# from tornado import httpserver
# from tornado import gen

class Event:
    def __init__(self, id, name, position, date, repeatId):
        self.id = id
        self.name = name
        self.position = position
        self.date = date
        self.repeatOptions = repeatId


class Task:
    def __init__(self, id, eventId, name, priority, status, repeatId):
        self.id = id
        self.eventId = eventId
        self.name = name
        self.priority = priority
        self.status = status
        self.repeatOptions = repeatId


######################################## REST ####################################################
class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write({'TO DO': 'LIST'})


class EventsCollectionHandler(tornado.web.RequestHandler):
    def get(self):  # DONE
        self.write(json.dumps(db.getEvents()))
        self.set_header('Content-Type', 'application/json')

    def post(self):  # DONE
        data = json.loads(self.request.body.decode('utf-8'))
        if validateEvent(data):
            eid = db.addEvent(data['name'], data['position'], data['date'], data['repeatId'])
            self.write({'Event added, id:': eid})
            self.set_header('location', '/events/' + `eid`)
        else:
            print "Missing or incorrect data in request"
            self.write({'Exception': 'Missing or incorrect data in your request'})


class EventHandler(tornado.web.RequestHandler):
    def get(self, eid):  # DONE
        if db.isEventExist(eid):
            self.write(json.dumps(db.getEventById(eid)))
            self.set_etag_header()
            self.set_header('Content-Type', 'application/json')
        else:
            self.write({'Exception' : 'Event doesn\'t exist , id: '+`eid`})

    def put(self, eid):  # DONE
        if self.check_etag_header():
            self.set_status(304)
            return
        data = json.loads(self.request.body.decode('utf-8'))
        if db.isEventExist(eid):
            if validateEvent(data):
                db.updateEvent(eid, data['name'], data['position'], data['date'], data['repeatId'])
                self.write({'Event updated, id:': eid})
            else:
                self.write({'Exception': 'Missing or incorrect data in your request'})
        else:
            self.write({'Exception': 'Event doesn\'t exist , id: ' + `eid`})

    def delete(self, eid):  # DONE
        if db.isEventExist(eid):
            db.deleteEventById(eid)
            self.write({'DELETED EVENT': eid})
        else:
            self.write({'Exception': 'Event doesn\'t exist , id: ' + `eid`})


class TaskHandler(tornado.web.RequestHandler):
    def get(self, eid, tid):  # DONE
        if tid:
            self.write(json.dumps(db.getTaskByEidAndTid(eid, tid)))
        else:  # DONE
            if db.isEventExist(eid):
                self.write(json.dumps(db.getTasksByEid(eid)))
            else:
                self.write({'Exception': 'Event doesn\'t exist , id: ' + `eid`})

    def post(self, eid, tid):  # DONE
        if tid:
            raise tornado.web.HTTPError(405)
        else:
            data = json.loads(self.request.body.decode('utf-8'))
            if validateTask(data):
                if db.isEventExist(`data['eventId']`) and `data['eventId']` == eid:
                    tid = db.addTask(data['eventId'], data['name'], data['priority'],
                                     data['status'], data['repeatId'])
                    self.write({'Task added, id:': tid})
                    self.set_header('location', '/events/' + `data['eventId']` + '/tasks/' + `tid`)
                else:
                    print "Event Id doesn't exist"
                    self.write({'Exception': 'Incorrect Event Id in your request'})
            else:
                print "Missing or incorrect data in request"
                self.write({'Exception': 'Missing or incorrect data in your request'})

    def delete(self, eid, tid):  # DONE
        if tid:
            if db.isTaskExist(tid):
                db.deleteTaskById(tid)
                self.write({'DELETED TASK': tid})
            else:
                self.write({'Exception:': 'Task doesn\'t exist'+`tid`})
        else:
            raise tornado.web.HTTPError(405)

    def patch(self, eid, tid):
        print "PATCH"

    def put(self, eid, tid):
        print "PUT"


if __name__ == "__main__":
    application = tornado.web.Application([
        (r"/", MainHandler),
        (r"/events", EventsCollectionHandler),
        (r"/events/(?P<eid>[0-9]+)", EventHandler),
        (r"/events/(?P<eid>[0-9]+)/tasks/?(?P<tid>[0-9]+)?", TaskHandler)
    ])
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
