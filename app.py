BASE_URL = 'http://localhost:5000'

# ------------------------------------------------------------------------------

from flask import Flask, abort, request, redirect, render_template
from sqlalchemy import create_engine, Column, Integer, String, select
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.exc import NoResultFound, MultipleResultsFound

engine = create_engine('sqlite:///urls.db', echo=True)
app = Flask(__name__)

Base = declarative_base()

class URL(Base):
    __tablename__ = 'urls'

    key = Column(String, primary_key=True)
    value = Column(String)

Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()

@app.get('/panel')
def render():
    return render_template('app.html')

@app.get("/<id>")
def reroute(id): 
    try:
        url = session.query(URL).filter(URL.key == id).one()
        return redirect(url.value)
    except NoResultFound:
        return abort(404)
    except MultipleResultsFound:
        return abort(500)      