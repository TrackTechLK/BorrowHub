FROM python:3.9-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /code
COPY ./requirements.txt /code/

RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . /code/

# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
RUN chmod +x ./docker-entrypoint.sh
CMD ["./docker-entrypoint.sh"]
