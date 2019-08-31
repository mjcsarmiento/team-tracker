FROM python:3.6
ENV PYTHONUNBUFFERED 1
RUN mkdir /django
WORKDIR /django
COPY requirements.txt /django/
RUN pip install -r requirements.txt
COPY . /django/