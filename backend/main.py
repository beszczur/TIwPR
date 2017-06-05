import json
import tornado.ioloop
import tornado.web
import database as db
from validators import validateEvent, validateTask, ifIdFiledExists


# TO-DO:
# 1. Etags in POST requests
# 2. CODES (200, 201, 302)
# ++ 3. Date validator, input validator
# 4. Kasowanie taskow wraz z eventem
# 5. Once exacly
# 6. Exampe usage bash

# /events                   (GET, POST)
# /events/{eid}             (GET, PUT, DELETE)
# /events/{eid}/tasks       (GET, POST)
# /events/{eid}/tasks/{tid} (GET, PUT, DELETE, PATCH)

# from tornado import httpserver
# from tornado import gen

statuses = {
    'OK': 200,
    'Created': 201,
    'BadRequest': 400,
    'NotFound': 404,
    'MethodNotAllowed': 405
}


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write({'TO DO': 'LIST'})


class EventsCollectionHandler(tornado.web.RequestHandler):
    def get(self):  # DONE
        self.write(json.dumps(db.getEvents()))
        self.set_header('Content-Type', 'application/json')

    def post(self):  # DONE
        try:
            data = json.loads(self.request.body.decode('utf-8'))
            if validateEvent(data):
                eid = db.addEvent(data['name'], data['position'], data['date'], data['repeatId'])
                self.write({'Event added, id:': eid})
                self.set_header('location', '/events/' + `eid`)
                self.set_status(statuses['Created'])
            else:
                print "Missing or incorrect data in request"
                self.write({'Exception': 'Missing or incorrect data in your request'})
                self.set_status(statuses['BadRequest'])
        except ValueError:
            self.write({'Exception': 'Invalid JSON'})
            self.set_status(statuses['BadRequest'])


class EventHandler(tornado.web.RequestHandler):
    def get(self, eid):  # DONE
        if db.isEventExist(eid):
            self.write(json.dumps(db.getEventById(eid)))
            self.set_etag_header()
            self.set_header('Content-Type', 'application/json')
        else:
            self.write({'Exception': 'Event doesn\'t exist , id: ' + `eid`})
            self.set_status(statuses['NotFound'])

    def put(self, eid):  # DONE
        try:
            if self.check_etag_header():
                self.set_status(304)
                return
            data = json.loads(self.request.body.decode('utf-8'))
            if db.isEventExist(eid):
                if validateEvent(data) and ifIdFiledExists(data) and `data['id']` == eid:
                    db.updateEvent(eid, data['name'], data['position'], data['date'], data['repeatId'])
                    self.write({'Event updated, id:': eid})
                else:
                    self.write({'Exception': 'Missing or incorrect data in your request'})
                    self.set_status(statuses['BadRequest'])
            else:
                self.write({'Exception': 'Event doesn\'t exist , id: ' + `eid`})
                self.set_status(statuses['NotFound'])
        except ValueError:
            self.write({'Exception': 'Invalid JSON'})
            self.set_status(statuses['BadRequest'])

    def delete(self, eid):  # DONE
        if db.isEventExist(eid):
            db.deleteEventById(eid)
            self.write({'DELETED EVENT': eid})
        else:
            self.write({'Exception': 'Event doesn\'t exist , id: ' + `eid`})
            self.set_status(statuses['NotFound'])


class TaskHandler(tornado.web.RequestHandler):
    def get(self, eid, tid):  # DONE
        if tid:
            self.write(json.dumps(db.getTaskByEidAndTid(eid, tid)))
        else:  # DONE
            if db.isEventExist(eid):
                self.write(json.dumps(db.getTasksByEid(eid)))
            else:
                self.write({'Exception': 'Event doesn\'t exist , id: ' + `eid`})
                self.set_status(statuses['NotFound'])

    def post(self, eid, tid):  # DONE
        try:
            if tid:
                raise tornado.web.HTTPError(statuses['MethodNotAllowed'])
            else:
                data = json.loads(self.request.body.decode('utf-8'))
                if validateTask(data):
                    if db.isEventExist(`data['eventId']`) and `data['eventId']` == eid:
                        tid = db.addTask(data['eventId'], data['name'], data['priority'],
                                         data['status'], data['repeatId'])
                        self.write({'Task added, id:': tid})
                        self.set_header('location', '/events/' + `data['eventId']` + '/tasks/' + `tid`)
                        self.set_status(statuses['Created'])
                    else:
                        print "Event Id doesn't exist"
                        self.write({'Exception': 'Incorrect Event Id in your request'})
                        self.set_status(statuses['NotFound'])
                else:
                    print "Missing or incorrect data in request"
                    self.write({'Exception': 'Missing or incorrect data in your request'})
                    self.set_status(statuses['BadRequest'])
        except ValueError:
            self.write({'Exception': 'Invalid JSON'})
            self.set_status(statuses['BadRequest'])

    def delete(self, eid, tid):  # DONE
        if tid:
            if db.isTaskExist(tid):
                db.deleteTaskById(tid)
                self.write({'DELETED TASK': tid})
            else:
                self.write({'Exception:': 'Task doesn\'t exist' + `tid`})
                self.set_status(statuses['NotFound'])
        else:
            raise tornado.web.HTTPError(statuses['MethodNotAllowed'])

    def patch(self, eid, tid):
        try:
            print "PATCH"
        except ValueError:
            self.write({'Exception': 'Invalid JSON'})
            self.set_status(statuses['BadRequest'])

    def put(self, eid, tid):
        try:
            print "PUT"
        except ValueError:
            self.write({'Exception': 'Invalid JSON'})
            self.set_status(statuses['BadRequest'])


if __name__ == "__main__":
    application = tornado.web.Application([
        (r"/", MainHandler),
        (r"/events", EventsCollectionHandler),
        (r"/events/(?P<eid>[0-9]+)", EventHandler),
        (r"/events/(?P<eid>[0-9]+)/tasks/?(?P<tid>[0-9]+)?", TaskHandler)
    ])
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
