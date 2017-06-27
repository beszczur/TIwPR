import sqlite3 as sqlite

def createDatabase():
    conn = sqlite.connect('todo.db')
    c = conn.cursor()
    try:
        c.execute('SELECT * FROM events')
        print('Table already exists')
    except:
        print('Creating table \'repeatOptions\'')
        c.execute('CREATE TABLE repeatOptions (\
                id INTEGER PRIMARY KEY AUTOINCREMENT,\
                date_from date, \
                date_to date,\
                options number)')
        print('Successfully created table \'repeatOptions\'')

        print('Creating table \'events\'')
        c.execute('CREATE TABLE events (\
            id INTEGER PRIMARY KEY AUTOINCREMENT,\
            name text,\
            position number,\
            date date,\
            repeatId number,\
            FOREIGN KEY (repeatId) REFERENCES repeatOptions(id))')
        print('Successfully created table \'events\'')

        print('Creating table \'tasks\'')
        c.execute('CREATE TABLE tasks (\
            id INTEGER PRIMARY KEY AUTOINCREMENT,\
            eventId number REFERENCES events(id) ON DELETE CASCADE, \
            name text,\
            priority number,\
            status number,\
            repeatId number,\
            FOREIGN KEY (repeatId) REFERENCES repeatOptions(id))')
        print('Successfully created table \'tasks\'')

        print('Creating table \'tokens\'')
        c.execute('CREATE TABLE tokens (\
                    id INTEGER PRIMARY KEY AUTOINCREMENT,\
                    token text,\
                    CONSTRAINT token_uniqsqlite uniqueue UNIQUE (token))')
        print('Successfully created table \'tokens\'')

    conn.commit()
    conn.close()

#FOREIGN KEY (parent_id) REFERENCES parent(id)
if __name__ == "__main__":
    createDatabase()
