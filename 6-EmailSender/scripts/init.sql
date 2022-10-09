create database email_sender;

\c email_sender

create table emails (
    id serial not null,
    date timestamp not null default current_timestamp,
    title varchar(100) not null,
    message varchar(250) not null
);