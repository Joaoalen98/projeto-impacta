-- create database projeto_impacta_db;

create table products(
    id serial primary key,
    name text not null,
    description text not null,
    price float not null,
    stock int not null
);