import psycopg2
import redis
import json
import os
from bottle import route, run, Bottle, request

#class Sender(Bottle):
    # def __init__(self):
    #     super().__init__()
    #     self.route('/', method='POST', callback=self.send)
        
    #     redis_host = os.getenv('REDIS_HOST', 'queue')
    #     self.fila = redis.StrictRedis(host=redis_host, port=6379, db=0)

    #     db_host = os.getenv('DB_HOST', 'db')
    #     db_user = os.getenv('DB_USER', 'postgres')
    #     db_name = os.getenv('DB_NAME', 'sender')
    #     dsn = f'dbname={db_name} user={db_user} host={db_host}'
    #     self.conn = psycopg2.connect(dsn)
        
    # def register_message(self, title, message):
    #     SQL = 'INSERT INTO emails (title, message) VALUES (%s, %s)'
    #     cur = self.conn.cursor()
    #     cur.execute(SQL, (title, message))
    #     self.conn.commit()
    #     cur.close()

    #     msg = {'title': title, 'message': message}
    #     self.fila.rpush('sender', json.dumps(msg))

    #     print('message registrada !')

@route('/', method='POST')
def send():
    title = request.forms.get('title')
    message = request.forms.get('message')

    #self.register_message(title, message)
    return 'message is queued ! title: {} message: {}'.format(
        title, message
    )

if __name__ == '__main__':
    #sender = Sender()
    run(host='0.0.0.0', port=8080, debug=True)