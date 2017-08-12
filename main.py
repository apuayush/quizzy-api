from tornado.web import RequestHandler, UIModule, Application
from tornado.gen import coroutine
from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop
# other libraries
from motor import MotorClient as Client
import os

db = Client()

class User:
    def __init__(self):
        self.username = ""
        self.password = ""
        self.session = dict()
        self.is_logged_in = False

class IndexHandler(RequestHandler, User):
    @coroutine
    def get(self):
        if self.get_secure_cookie('name') is None:
            self.is_logged_in = False
            self.render('logSign.html')
        else:
            self.username = self.get_secure_cookie('name')
            self.password = self.get_secure_cookie('pass')
            try:
                user_creds = yield db.users.find_one({'user': self.username})
                if user_creds is self.password:
                    self.session = self.session
            self.session.update({'user': self.username, 'pass': self.password})
            self.redirect('/node')

class LoginHandler(RequestHandler, User):
    @coroutine
    def post(self):
        name = self.get_argument('name')
        password = self.get_argument('pass')
        yield db.users.find_one('user')
        self.is_logged_in = True
        self.session =

class SignUpHandler(RequestHandler, User):
    pass

class TakeQuiz(RequestHandler, User):
    pass

class CreateQuiz(RequestHandler, User):
    pass

settings = dict(
    db=db,
    debug=True
)

app = Application(
    handlers =[
        (r'/',IndexHandler)
    ],
    template_path=os.path.join(os.path.dirname(__file__),"template"),
    static_path=os.path.join(os.path.dirname(__file__),"static"),
    **settings
)

if __name__ == "__main__":
    server = HTTPServer(app)
    server.listen(8080)
    IOLoop.current().start()