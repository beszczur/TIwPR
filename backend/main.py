import json
import hashlib
import tornado.ioloop
import tornado.web
import database as db
from validators import validateEvent, validateTask, ifIdFiledExists

# TO-DO:
# ++  1. Etags in PUT & PATCH (& DELETE ?) requests
# +++ 2. CODES (200, 201, 302)
# +++ 3. Date validator, input validator
# +++ 4. Kasowanie taskow wraz z eventem (ON DELETE CASCADE)
# 5. Once exacly
# 6. Exampe usage bash

# /events                   (GET, POST)
# /events/{eid}             (GET, PUT, DELETE)
# /events/{eid}/tasks       (GET, POST)
# /events/{eid}/tasks/{tid} (GET, PUT, DELETE, PATCH)
# /tokens                   (POST)

statuses = {
    'OK': 200,
    'Created': 201,
    'BadRequest': 400,
    'NotFound': 404,
    'MethodNotAllowed': 405,
    'PreconditionFailed': 412
}


def computeEtag(data):
    hasher = hashlib.sha1()
    for part in data:
        hasher.update(part)
    return '"%s"' % hasher.hexdigest()


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write({'TO DO': 'LIST'})


class TokensHandler(tornado.web.RequestHandler):
    def post(self):  # DONE
        token = self.request.headers.get('token')
        if token:
            try:
                tokenId = db.addToken(token)
                self.write({'Token added, id:': tokenId})
                self.set_status(statuses['Created'])
            except db.sqlite.IntegrityError:
                self.write({'Token was existed': ':('})
        else:
            self.write({'Exception': 'Missing token in your request'})


class EventsCollectionHandler(tornado.web.RequestHandler):
    def get(self):  # DONE
        pageSize = self.get_argument('pageSize', db.defaultPageSize)
        startDate = self.get_argument('startDate', '')
        endDate = self.get_argument('endDate', '')
        page = self.get_argument('page', 0)
        self.write(json.dumps(db.getEvents(startDate, endDate, pageSize, page)))
        self.set_header('Content-Type', 'application/json')
        self.set_status(statuses['OK'])

    def post(self):  # DONE
        try:
            data = json.loads(self.request.body.decode('utf-8'))
            token = self.request.headers.get('token')
            if not token or not db.isTokenExists(token):
                self.write({'Exception': 'Missing or invalid token in your request'})
                self.set_status(statuses['BadRequest'])
            else:
                if validateEvent(data):
                    eid = db.addEventWithToken(data['name'], data['position'], data['date'], data['repeatId'], token)
                    self.write({'Event added, id:': eid})
                    self.set_header('location', '/events/' + `eid`)
                    self.set_status(statuses['Created'])
                else:
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
            data = json.loads(self.request.body.decode('utf-8'))
            if db.isEventExist(eid):
                if validateEvent(data) and ifIdFiledExists(data) and `data['id']` == eid:
                    if self.request.headers.get('If-Match') != computeEtag(json.dumps(db.getEventById(eid))):
                        self.write({'Exception': 'Etag doesn\'t match'})
                        self.set_status(statuses['PreconditionFailed'])
                        return
                    db.updateEvent(eid, data['name'], data['position'], data['date'], data['repeatId'])
                    self.write({'Event updated, id:': eid})
                    self.set_status(statuses['OK'])
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
            self.set_status(statuses['OK'])
        else:
            self.write({'Exception': 'Event doesn\'t exist , id: ' + `eid`})
            self.set_status(statuses['NotFound'])


class TaskHandler(tornado.web.RequestHandler):
    def get(self, eid, tid):  # DONE
        if tid:
            if db.isEventExist(eid):
                if db.isTaskExist(tid):
                    self.write(json.dumps(db.getTaskByEidAndTid(eid, tid)))
                    self.set_status(statuses['OK'])
                else:
                    self.write({'Exception': 'Incorrect Task Id in your request (Task doesn\'t exist)'})
                    self.set_status(statuses['NotFound'])
            else:
                self.write({'Exception': 'Incorrect Event Id in your request (Event doesn\'t exist)'})
                self.set_status(statuses['NotFound'])
        else:  # DONE
            if db.isEventExist(eid):
                pageSize = self.get_argument('pageSize', db.defaultPageSize)
                page = self.get_argument('page', 0)
                self.write(json.dumps(db.getTasksByEid(eid, pageSize, page)))
                self.set_header('Content-Type', 'application/json')
                self.set_status(statuses['OK'])
            else:
                self.write({'Exception': 'Event doesn\'t exist , id: ' + `eid`})
                self.set_status(statuses['NotFound'])

    def post(self, eid, tid):  # DONE
        try:
            if tid:
                raise tornado.web.HTTPError(statuses['MethodNotAllowed'])
            else:
                token = self.request.headers.get('token')
                if not token or not db.isTokenExists(token):
                    self.write({'Exception': 'Missing token in your request'})
                    self.set_status(statuses['BadRequest'])
                else:
                    data = json.loads(self.request.body.decode('utf-8'))
                    if validateTask(data):
                        if db.isEventExist(`data['eventId']`) and `data['eventId']` == eid:
                            tid = db.addTaskWithToken(data['eventId'], data['name'], data['priority'], data['status'],
                                                      data['repeatId'], token)
                            self.write({'Task added, id:': tid})
                            self.set_header('location', '/events/' + `data['eventId']` + '/tasks/' + `tid`)
                            self.set_status(statuses['Created'])
                        else:
                            self.write({'Exception': 'Incorrect Event Id in your request'})
                            self.set_status(statuses['NotFound'])
                    else:
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
                self.set_status(statuses['OK'])
            else:
                self.write({'Exception:': 'Task doesn\'t exist' + `tid`})
                self.set_status(statuses['NotFound'])
        else:
            raise tornado.web.HTTPError(statuses['MethodNotAllowed'])

    def patch(self, eid, tid):
        try:
            if tid:
                data = json.loads(self.request.body.decode('utf-8'))
                if db.isEventExist(eid):
                    if db.isTaskExist(tid) and 'status' in data:
                        if self.request.headers.get('If-Match') != computeEtag(
                                json.dumps(db.getTaskByEidAndTid(eid, tid))):
                            self.write({'Exception': 'Etag doesn\'t match'})
                            self.set_status(statuses['PreconditionFailed'])
                            return
                        db.updateTaskStatus(tid, data['status'])
                        self.write({'Task status updated, id:': tid})
                        self.set_status(statuses['OK'])
                    else:
                        self.write({'Exception': 'Missing data in your request'})
                        self.set_status(statuses['BadRequest'])
                else:
                    self.write({'Exception': 'Incorrect Event Id in your request (Event doesn\'t exist)'})
                    self.set_status(statuses['NotFound'])
            else:
                raise tornado.web.HTTPError(statuses['MethodNotAllowed'])
        except ValueError:
            self.write({'Exception': 'Invalid JSON'})
            self.set_status(statuses['BadRequest'])

    def put(self, eid, tid):
        try:
            if not tid:
                raise tornado.web.HTTPError(statuses['MethodNotAllowed'])
            else:
                data = json.loads(self.request.body.decode('utf-8'))
                if validateTask(data) and ifIdFiledExists(data):
                    if db.isEventExist(`data['eventId']`) and `data['eventId']` == eid:
                        if db.isTaskExist(`data['id']`) and `data['id']` == tid:
                            if self.request.headers.get('If-Match') != computeEtag(
                                    json.dumps(db.getTaskByEidAndTid(eid, tid))):
                                self.write({'Exception': 'Etag doesn\'t match'})
                                self.set_status(statuses['PreconditionFailed'])
                                return
                            db.updateTask(data['id'], data['eventId'], data['name'], data['priority'],
                                          data['status'], data['repeatId'])
                            self.write({'Task updated, id:': tid})
                            self.set_status(statuses['OK'])
                        else:
                            self.write({'Exception': 'Incorrect Task Id in your request (Task doesn\'t exist)'})
                            self.set_status(statuses['NotFound'])
                    else:
                        self.write({'Exception': 'Incorrect Event Id in your request'})
                        self.set_status(statuses['NotFound'])
                else:
                    self.write({'Exception': 'Missing or incorrect data in your request'})
                    self.set_status(statuses['BadRequest'])
        except ValueError:
            self.write({'Exception': 'Invalid JSON'})
            self.set_status(statuses['BadRequest'])


if __name__ == "__main__":
    application = tornado.web.Application([
        (r"/", MainHandler),
        (r"/tokens", TokensHandler),
        (r"/events", EventsCollectionHandler),
        (r"/events/(?P<eid>[0-9]+)", EventHandler),
        (r"/events/(?P<eid>[0-9]+)/tasks/?(?P<tid>[0-9]+)?", TaskHandler)
    ])
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
