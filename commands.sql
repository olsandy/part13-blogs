create table blogs (id serial primary key,
author text,
url text not null,
title text not null,
likes int default 0);

insert into blogs (author, url, title) values ('andy', 'www.google.com', 'Always be coding');
insert into blogs (author, url, title) values ('andy', 'www.postgresql.org/docs/current/index.html', 'How to learn psql');