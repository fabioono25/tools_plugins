FROM nginx:latest
LABEL maintainer 'Name'

RUN echo '<h1>This is the test.html page</h1>' > /usr/share/nginx/html/test.html

# adding index.html to nginx
COPY *.html /usr/share/nginx/html/