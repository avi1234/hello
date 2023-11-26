from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String
from database import Base

class SearchTerms(Base):
    __tablename__ = 'search_terms'

    id = Column(Integer, primary_key= True, index= True,)
    title = Column(String, index = True,)
    created_at = Column(DateTime)

class Repositories(Base):
    __tablename__ = 'repositories'

    id = Column(Integer, primary_key= True, index= True,)
    full_name = Column(String, index = True,)
    description = Column(String)
    html_url = Column(String)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    clone_url = Column(String)
    forks = Column(Integer)
    search_term_id = Column(Integer, ForeignKey('search_terms.id'))
