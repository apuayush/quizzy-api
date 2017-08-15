from tornado.web import RequestHandler, UIModule, Application
from tornado.gen import coroutine
from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop
# other libraries
from motor import MotorClient as Client
import os
import random
import string

# db = Client(os.environ['DB_LINK'])
print os.environ


class User(object):
    username = ""
    password = ""
    is_logged_in = False


class IndexHandler(RequestHandler, User):
    @coroutine
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
    def get(self):
        """
        right submission successful in case of signup or submission failed
        and login failed in case of login
        :return: None
        """
        success = ""
        try:
            success = self.get_query_argument('success')
        except:
            pass
        self.render('log.html', success=success)


class LoginHandler(RequestHandler, User):
    @coroutine
    def post(self):
        username = self.get_argument('username')
        password = self.get_argument('password')
        try:
            account = yield db.accounts.find_one('username')
            if account is None:
                self.render('log.html', success="Check your Login Credentials")
            else:
                self.session = dict(username=username, password=self.password)
                self.set_secure_cookie(self.session)
                self.redirect('/node')

        except:
            pass
        self.is_logged_in = True


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
    db=db,
    debug=True
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
