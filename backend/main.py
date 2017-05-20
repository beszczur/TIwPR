import json
import tornado.ioloop
import tornado.web
import sqlite3 as sqlite
from tornado.escape import json_encode


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
    def __init__(self, id, eventId, name, status, priority):
        self.id = id
        self.eventId = eventId
        self.name = name
        self.status = status
        self.priority = priority


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


def eventKeysExists(data):
    keys = ['name', 'position', 'date', 'repeatId']
    for key in keys:
        if not key in data:
            return False
    return True


def isEventExist(id):
    c.execute('SELECT count(*) from events where id=' + id)
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
        self.write(json.dumps(result_set))

    def post(self):  # DONE
        data = json.loads(self.request.body.decode('utf-8'))
        if eventKeysExists(data):
            # Should it be 201 - Created ?
            self.write({'Event added, id:': addEvent(data['name'], data['position'], data['date'], data['repeatId'])})
        else:
            print "Missing data in request"
            self.write({'Missing data': 'in your request'})


class EventHandler(tornado.web.RequestHandler):
    def get(self, id):  # DONE
        c.execute('SELECT * from events where id=' + id)
        result_set = c.fetchall()
        self.write(json.dumps(result_set))
        # Should I return 404 if id doesn't exist in database ?

    def put(self, id):
        print "PUT"

    def delete(self, id): # DONE
        if isEventExist(id):
            c.execute('DELETE FROM events WHERE id=?', (id,))
            conn.commit()
            # Task which refers to this event should also be deleted
            self.write({'DELETED': '#which code here ? 200 ?'})
        else:
            self.write({'Event dosen\'t exist': id})


if __name__ == "__main__":
    application = tornado.web.Application([
        ("/", MainHandler),
        ("/events", EventsCollectionHandler),  # DONE
        ("/events/([0-9]+)", EventHandler)
    ])
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
