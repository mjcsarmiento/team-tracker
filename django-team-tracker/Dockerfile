FROM python:3.6
ENV PYTHONUNBUFFERED 1

WORKDIR /django
COPY requirements.txt /django
RUN pip3 install -r requirements.txt

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]