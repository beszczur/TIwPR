import sqlite3 as sqlite


def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


conn = sqlite.connect('todo.db')
conn.row_factory = dict_factory
c = conn.cursor()

defaultPageSize = 5


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
    c.execute('PRAGMA foreign_keys = ON')
    c.execute('DELETE FROM events WHERE id=?', (eid,))
    conn.commit()


def getEventById(eid):
    c.execute('SELECT * FROM events WHERE id=' + eid)
    return c.fetchall()


def getEvents(startDate='', endDate='', chunkSize=defaultPageSize, pageNumber=0):
    if not startDate and not endDate:
        c.execute('SELECT * '
                  'FROM events '
                  'ORDER BY id '
                  'LIMIT ? OFFSET ?',
                  (chunkSize, int(pageNumber) * int(chunkSize)))
    else:
        if startDate and not endDate:
            endDate = startDate
        c.execute('SELECT * '
                  'FROM events '
                  'WHERE (date BETWEEN ? and ?) '
                  'ORDER BY id '
                  'LIMIT ? OFFSET ?',
                  (startDate, endDate, chunkSize, int(pageNumber) * int(chunkSize)))
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


def getTasksByEid(eid, chunkSize=defaultPageSize, pageNumber=0):
    c.execute('SELECT * FROM tasks WHERE eventId=? LIMIT ? OFFSET ?',
              (eid, chunkSize, int(pageNumber) * int(chunkSize)))
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


####################################### TOKEN ########################################################
def addToken(token):
    c.execute('INSERT INTO tokens VALUES (NULL,?)', (token,))
    conn.commit()
    return c.lastrowid


def isTokenExists(token):
    c.execute('SELECT count(id) FROM tokens WHERE token=' + `token`)
    exists = c.fetchone()['count(id)']
    if exists == 0:
        return False
    return True


def deleteToken(token):
    c.execute('DELETE FROM tokens WHERE token=?', (token,))
    conn.commit()


############################### COMPLEX OPERATIONS ########################################################
def addEventWithToken(name, position, date, repeatId, token):
    conn.isolation_level = None
    try:
        c.execute('begin')
        c.execute('DELETE FROM tokens WHERE token=?', (token,))
        c.execute('INSERT INTO events VALUES (NULL,?,?,?,?)', (name, position, date, repeatId))
        conn.commit()
        return c.lastrowid
    except sql.Error:
        print("failed!")
        c.execute("rollback")


def addTaskWithToken(name, position, date, repeatId, token):
    conn.isolation_level = None
    try:
        c.execute('begin')
        c.execute('DELETE FROM tokens WHERE token=?', (token,))
        c.execute('INSERT INTO tasks VALUES (NULL,?,?,?,?,?)', (eventId, name, priority, status, repeatId))
        conn.commit()
        return c.lastrowid
    except sql.Error:
        print("failed!")
        c.execute("rollback")
