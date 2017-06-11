import sqlite3 as sqlite


def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


conn = sqlite.connect('todo.db')
conn.row_factory = dict_factory
c = conn.cursor()


####################################### EVENT ########################################################
def addEvent(name, position, date, repeatId):
    c.execute('INSERT INTO events VALUES (NULL,?,?,?,?)', (name, position, date, repeatId))
    conn.commit()
    return c.lastrowid


def updateEvent(eid, name, position, date, repeatId):
    c.execute('UPDATE events SET name=?, position=?, date=?, repeatId=? WHERE id=?',
              (name, position, date, repeatId, eid))
    conn.commit()
    return c.lastrowid


def deleteEventById(eid):
    # Task which refers to this event should also be deleted
    c.execute('DELETE FROM events WHERE id=?', (eid,))
    conn.commit()


def getEventById(eid):
    c.execute('SELECT * FROM events WHERE id=' + eid)
    return c.fetchall()


def getEvents():
    c.execute('SELECT * FROM events')
    return c.fetchall()


def isEventExist(eid):
    c.execute('SELECT count(id) FROM events WHERE id=' + eid)
    exists = c.fetchone()['count(id)']
    if exists == 0:
        return False
    return True


####################################### TASK ########################################################
def addTask(eventId, name, priority, status, repeatId):
    c.execute('INSERT INTO tasks VALUES (NULL,?,?,?,?,?)', (eventId, name, priority, status, repeatId))
    conn.commit()
    return c.lastrowid


def updateTask(taskId, eventId, name, priority, status, repeatId):
    c.execute('UPDATE tasks SET eventId=?, name=?, priority=?, status=?, repeatId=? WHERE id=?',
              (eventId, name, priority, status, repeatId, taskId))
    conn.commit()
    return c.lastrowid


def updateTaskStatus(taskId, status):
    c.execute('UPDATE tasks SET status=? WHERE id=?', (status, taskId))
    conn.commit()
    return c.lastrowid


def deleteTaskById(tid):
    c.execute('DELETE FROM tasks WHERE id=?', (tid,))
    conn.commit()


def getTasksByEid(eid):
    c.execute('SELECT * FROM tasks WHERE eventId=' + eid)
    return c.fetchall()


def getTaskByEidAndTid(eid, tid):
    c.execute('SELECT * FROM tasks WHERE eventId=' + eid + ' AND id=' + tid)
    return c.fetchall()


def isTaskExist(tid):
    c.execute('SELECT count(id) FROM tasks WHERE id=' + tid)
    exists = c.fetchone()['count(id)']
    if exists == 0:
        return False
    return True
