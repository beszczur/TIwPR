import json
import tornado.ioloop
import tornado.web
import sqlite3 as sqlite

# TO-DO:
# 1. Etags in POST requests
# 2. CODES (200, 201, 302)
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

statuses = {
    'OK': 200,
    'Created': 201
}


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


########################################### DATABASE #############################################
def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


conn = sqlite.connect('todo.db')
conn.row_factory = dict_factory
c = conn.cursor()


def addEvent(name, position, date, repeatId):
    c.execute('INSERT INTO events VALUES (NULL,?,?,?,?)', (name, position, date, repeatId))
    conn.commit()
    return c.lastrowid


def updateEvent(eid, name, position, date, repeatId):
    c.execute('UPDATE events SET name=?, position=?, date=?, repeatId=? WHERE id=?',
              (name, position, date, repeatId, eid))
    conn.commit()
    return c.lastrowid


def addTask(eventId, name, priority, status, repeatId):
    c.execute('INSERT INTO tasks VALUES (NULL,?,?,?,?,?)', (eventId, name, priority, status, repeatId))
    conn.commit()
    return c.lastrowid


def eventKeysExists(data):
    keys = ['name', 'position', 'date', 'repeatId']
    for key in keys:
        if not key in data:
            return False
    return True


def taskKeysExists(data):
    keys = ['eventId', 'name', 'priority', 'status', 'repeatId']
    for key in keys:
        if not key in data:
            return False
    return True


def isEventExist(eid):
    c.execute('SELECT count(*) from events where id=' + eid)
    exists = c.fetchone()['count(*)']
    if exists == 0:
        return False
    else:
        return True


def isTaskExist(tid):
    c.execute('SELECT count(*) from tasks where id=' + tid)
    exists = c.fetchone()['count(*)']
    if exists == 0:
        return False
    else:
        return True


######################################## REST ####################################################
class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write({'TO DO': 'LIST'})


# class MainHandler(tornado.web.RequestHandler):
#     def get(self):
#         print("STH")
#         self.write('<html><body><form action="/articles" method="post">'
#             '<input type="text" name="message">'
#             '<input type="submit" value="Add">'
#             '</form></body></html>')
#
# class ArticleHandler(tornado.web.RequestHandler):
#     articles = []
#     def get(self):
#         self.render("07-articles.html", title="List of articles",
#                 articles=self.articles)
#     def post(self):
#         self.articles.append(self.get_argument("message"))
#         self.write("OK")

class EventsCollectionHandler(tornado.web.RequestHandler):
    def get(self):  # DONE
        c.execute('SELECT * from events')
        result_set = c.fetchall()
        self.set_header('Content-Type', 'application/json')
        self.write(json.dumps(result_set))

    def post(self):  # DONE
        data = json.loads(self.request.body.decode('utf-8'))
        if eventKeysExists(data):
            eid = addEvent(data['name'], data['position'], data['date'], data['repeatId'])
            self.write({'Event added, id:': eid})
            self.set_status(statuses['Created'])
            self.set_header('location', '/events/' + `eid`)
        else:
            print "Missing data in request"
            self.write({'Missing data': 'in your request'})


class EventHandler(tornado.web.RequestHandler):
    def get(self, eid):  # DONE
        c.execute('SELECT * from events where id=' + eid)
        result_set = c.fetchall()
        self.write(json.dumps(result_set))
        self.set_etag_header()
        # Should I return 404 if id doesn't exist in database ?

    def put(self, eid):  # DONE
        if self.check_etag_header():
            self.set_status(304)
            return
        data = json.loads(self.request.body.decode('utf-8'))
        if isEventExist(eid):
            if eventKeysExists(data):
                updateEvent(eid, data['name'], data['position'], data['date'], data['repeatId'])
                self.write({'Event updated, id:': eid})
            else:
                print "Missing data in request"
                self.write({'Missing data': 'in your request'})
        else:
            print "Event doesn\'t exist."
            self.write({'Event doesn\'t exist': eid})

    def delete(self, eid):  # DONE
        if isEventExist(eid):
            c.execute('DELETE FROM events WHERE id=?', (eid,))
            conn.commit()
            # Task which refers to this event should also be deleted
            self.write({'DELETED EVENT': '#which code here ? 200 ?'})
        else:
            self.write({'Event doesn\'t exist': eid})


class TaskHandler(tornado.web.RequestHandler):
    def get(self, eid, tid):  # DONE
        if tid:
            c.execute('SELECT * from tasks where eventId=' + eid + ' and id=' + tid)
            result_set = c.fetchall()
            self.write(json.dumps(result_set))
        else:  # DONE
            if isEventExist(eid):
                c.execute('SELECT * from tasks where eventId=' + eid)
                result_set = c.fetchall()
                self.write(json.dumps(result_set))
            else:
                self.write({'Event doesn\'t exist': eid})

    def post(self, eid, tid):  # DONE
        if tid:
            print "METHOD NOT ALLOWED"
            self.write({'Method': 'not allowed'})
        else:
            data = json.loads(self.request.body.decode('utf-8'))
            if taskKeysExists(data):
                if isEventExist(`data['eventId']`) and `data['eventId']` == eid:
                    tid = addTask(data['eventId'], data['name'], data['priority'],
                                  data['status'], data['repeatId'])
                    self.write({'Task added, id:': tid})
                    self.set_status(statuses['Created'])
                    self.set_header('location', '/events/' + `data['eventId']` + '/tasks/' + `tid`)
                else:
                    print "Event Id doesn't exist"
                    self.write({'Incorrect Event Id': 'in your request'})
            else:
                print "Missing data in request"
                self.write({'Missing data': 'in your request'})

    def delete(self, eid, tid):  # DONE
        if tid:
            if isTaskExist(tid):
                c.execute('DELETE FROM tasks WHERE id=?', (tid,))
                conn.commit()
                self.write({'DELETED TASK': '#which code here ? 200 ?'})
            else:
                self.write({'Task doesn\'t exist': tid})
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
