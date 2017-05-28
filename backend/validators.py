import datetime


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


def validateDate(date_text):
    try:
        datetime.datetime.strptime(date_text, '%Y-%m-%d')
        return True
    except ValueError:
        return False


def validateInt(value):
    if isinstance(value, int):
        return True
    return False


def validateEvent(data):
    if eventKeysExists(data) and validateDate(data['date']) and validateInt(data['position']) and validateInt(
            data['repeatId']):
        return True
    return False


def validateTask(data):
    if taskKeysExists(data) and validateInt(data['eventId']) and validateInt(data['priority'])  and validateInt(data['status']) and validateInt(
            data['repeatId']):
        return True
    return False
