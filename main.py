# Tornado modules
from tornado.web import RequestHandler, UIModule, Application, removeslash, authenticated
from tornado.websocket import WebSocketHandler
from tornado.gen import coroutine
from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop

# other libraries
from motor import MotorClient as Client
import os
import env
import json
import uuid
import base64
import bcrypt


db = Client(env.DB_LINK)['quizzy']
c_question_count = 0


class User(object):
    username = ""
    password = ""
    is_logged_in = False


class NoConnectionException(Exception):
    pass


class QuestionsModule(UIModule):
    def render(self, *args, **kwargs):
        return self.render_string('questions.html')


# pylint: disable=abstract-method
class IndexHandler(RequestHandler, User):
    def get_current_user(self):
        return self.get_secure_cookie('username')


# TODO- add cookie secret

class Log(IndexHandler):
    @coroutine
    @removeslash
    def get(self):
        """
        right submission successful in case of signup or submission failed
        and login failed in case of login
        :return: None
        """
        self.render('log.html')


class LoginHandler(IndexHandler):
    @removeslash
    @coroutine
    def post(self):
        username = self.get_argument('username')
        password = self.get_argument('password')
        # password = base64.urlsafe_b64encode(t_sha.digest())
        user = yield db['accounts'].find_one({'username': username})
        redirect = 'none'
        if user is None:
            message = "Not registered"
        elif bcrypt.hashpw(password.encode('utf-8'), user['password']) != user['password']:
            message = 'Wrong Password'

        else:
            User.username = username
            User.password = password
            User.is_logged_in = True
            self.set_secure_cookie('username', User.username)
            self.set_secure_cookie('password', User.password)
            message = "loading..."
            redirect = '/'

        self.write(json.dumps({
            'status': 200,
            'message': message,
            'redirect': redirect
        }))

    def write_error(self, status_code, **kwargs):
        self.write(str(status_code) + ' You are living in dinosaur age')


class SignUpHandler(IndexHandler):
    @removeslash
    @coroutine
    def post(self):

        name = self.get_argument('name').lower().strip()
        username = self.get_argument('username').strip()
        password = self.get_argument('password')
        email = self.get_argument('email')

        # hashing
        # salt = base64.urlsafe_b64encode(uuid.uuid4().bytes)
        # t_sha = hashlib.sha512()
        # t_sha.update(password.encode('utf-8') + salt)
        # password = base64.urlsafe_b64encode(t_sha.digest())
        password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        u_account = yield db['accounts'].find_one({'username': username})
        e_account = yield db['accounts'].find_one({'email': email})
        message = 'unsuccessful'
        if u_account:
            message = 'Username unavailable'

        elif e_account:
            message = 'email already registered'

        else:
            try:
                yield db['accounts'].insert_one({'name': name, 'username': username, 'password': password, 'email': email})
                message = 'successfully registered'
            except NoConnectionException:
                self.write_error(400)

        self.write(json.dumps({
            'status': 200,
            'message': message
        }))

    def write_error(self, status_code):
        self.write(str(status_code) + ' ERROR..')


class HomePage(IndexHandler):
    @authenticated
    def get(self):
        user = self.current_user
        print(user)
        self.render('home.html', user=user)


class LogoutHandler(IndexHandler):
    def get(self):
        self.clear_all_cookies()
        self.redirect('/')


class TakeQuiz(IndexHandler, WebSocketHandler):
    def data_received(self, chunk):
        pass

    @authenticated
    def get(self):
        try:
            what = self.get_query_argument('page')
        except:
            what = ' '
        if what == 'page':
            self.render('tquiz.html', user=self.current_user)
        else:
            self.render('quiz.html', user=self.current_user, time_alloted="10")


    def post(self):
        user = self.current_user.decode('utf-8')
        quiz_token = self.get_argument('token')

    def open(self):
        pass

    @coroutine
    def on_message(self, message):
        pass

    def on_close(self):
        pass

class CreateQuiz(IndexHandler):
    access_code = 1000

    @authenticated
    def get(self):
        self.render('cquiz.html', user=self.current_user)

    @coroutine
    @removeslash
    @authenticated
    def post(self):
        message = 'successful'
        user = self.current_user.decode('utf-8')
        quiz_title = self.get_argument('quiz_title')
        question_set = json.loads(self.get_argument('question'))
        time_limit = self.get_argument('time-limit')
        start_time = self.get_argument('start-time')

        # utility function
        access_order = CreateQuiz.generate_access()
        # start_time = CreateQuiz.time_in_unix(start_time)
        print(start_time)

        # a detailed database list
        try:
            db['quiz'].insert(
                {
                    'quiz_title': quiz_title,
                    'access_token': access_order,
                    'author': user,
                    'time-limit': time_limit,
                    'start-time': start_time,
                    'question_set': question_set
                }
            )


            db['quiz-dyno'].insert({
                'title': quiz_title,
                'access_token': access_order,
                'start_time': start_time
            })

        except:
            message = 'sorry!! submission unsuccessful '

        self.write(json.dumps({
            'status': 200,
            'message': message
        }))

    @staticmethod
    def generate_access():
        CreateQuiz.access_code += 1
        return CreateQuiz.access_code





settings = dict(
    db=db,
    cookie_secret=base64.b64encode(uuid.uuid4().bytes + uuid.uuid4().bytes),
    debug=True,
    login_url="/log"
)

app = Application(
    handlers=[
        # (r'/', IndexHandler),  # controls index if logged in then /node else /log
        (r'/log', Log),
        (r'/logout', LogoutHandler),
        (r'/login', LoginHandler),  # Login if clicks login
        (r'/signup', SignUpHandler),
        (r'/', HomePage),  # Home page
        (r'/cquiz', CreateQuiz),  # Creating quiz portal
        (r'/tquiz', TakeQuiz)  # Take quiz portal
    ],
    template_path=os.path.join(os.path.dirname(__file__), "template"),
    static_path=os.path.join(os.path.dirname(__file__), "static"),
    ui_modules={'questions_module': QuestionsModule},
    **settings
)

if __name__ == "__main__":
    server = HTTPServer(app)
    server.listen(8000)
    IOLoop.current().start()
