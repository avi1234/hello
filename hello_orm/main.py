from datetime import datetime
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Annotated
from sqlalchemy.orm import Session

import models
from database import engine, SessionLocal

app = FastAPI()
models.Base.metadata.create_all(bind=engine)

class Repository(BaseModel):
    full_name: str
    description: str
    html_url: str
    created_at: datetime
    updated_at: datetime
    clone_url: str
    forks: int

class SearchTerm(BaseModel):
    title: str
    created_at: datetime
    repositories: List[Repository]

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

@app.post('/search_terms/')
async def create_search_terms(search_term: SearchTerm, db: db_dependency):
    db_search_term = models.SearchTerms(
        title = search_term.title,
        created_at = search_term.created_at,
    )

    db.add(db_search_term)
    db.commit()
    db.refresh(db_search_term)
    for repository in search_term.repositories:
        db_repository = models.Repositories(
            full_name= repository.full_name,
            description= repository.description,
            html_url= repository.html_url,
            created_at= repository.created_at,
            updated_at= repository.updated_at,
            clone_url= repository.clone_url,
            forks= repository.forks,
            search_term_id= db_search_term.id,
        )
        db.add(db_repository)
        db.commit()

