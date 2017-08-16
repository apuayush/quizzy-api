from tornado.web import RequestHandler, UIModule, Application, removeslash
from tornado.gen import coroutine
from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop
# other libraries
from motor import MotorClient as Client
import os
import env
import random
import string

db = Client(env.DB_LINK)['quizzy']


class User(object):
    username = ""
    password = ""
    is_logged_in = False


class IndexHandler(RequestHandler, User):
    @coroutine
    @removeslash
    def get(self):
        if self.get_secure_cookie('username') is None:
            User.is_logged_in = False
            self.redirect('/log')
        else:
            User.username = self.get_secure_cookie('username')
            User.password = self.get_secure_cookie('password')
            User.is_logged_in = True
            self.redirect('/node')


# TODO- add cookie secret

class Log(RequestHandler):
    @coroutine
    @removeslash
    def get(self):
        """
        right submission successful in case of signup or submission failed
        and login failed in case of login
        :return: None
        """
        try:
            msg = self.get_query_argument('success')
        except:
            msg = "try"
        print msg
        self.render('log.html', success=msg)


class LoginHandler(RequestHandler, User):
    @removeslash
    @coroutine
    def post(self):
        username = self.get_argument('username')
        password = self.get_argument('password')
        print password
        # try:
        user = yield db['accounts'].find_one({'username': username})
        print user
        if user is None:
            self.redirect("/log?success=Not registered")

        elif user['password'] != password:
            self.redirect('/log?success=Wrong Password')

        else:
            User.username = username
            User.password = password
            User.is_logged_in = True
            self.set_secure_cookie('username', User.username)
            self.set_secure_cookie('password', User.password)
            self.redirect('/node')
        # except:
        #     self.write_error('You are living in dinosaur age')

    def write_error(self, status_code, **kwargs):
        self.write(str(status_code) + ' You are living in dinosaur age')


class SignUpHandler(RequestHandler, User):
    pass


class HomePage(RequestHandler, User):
    def get(self):
        self.write(User.username)


class TakeQuiz(RequestHandler, User):
    pass


class CreateQuiz(RequestHandler, User):
    pass


settings = dict(
    db=db
)

app = Application(
    handlers=[
        (r'/', IndexHandler),  # controls index if logged in then /node else /log
        (r'/log', Log),
        (r'/login', LoginHandler),  # Login if clicks login
        (r'/signup', SignUpHandler),
        (r'/node', HomePage),  # Home page
        (r'/cquiz', CreateQuiz),  # Creating quiz portal
        (r'/tquiz', TakeQuiz)  # Take quiz portal
    ],
    cookie_secret=random.choice(string.letters),
    template_path=os.path.join(os.path.dirname(__file__), "template"),
    static_path=os.path.join(os.path.dirname(__file__), "static"),
    **settings
)

if __name__ == "__main__":
    server = HTTPServer(app)
    server.listen(8080)
    IOLoop.current().start()
