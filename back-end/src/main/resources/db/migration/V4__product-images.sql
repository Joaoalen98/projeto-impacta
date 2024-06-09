create table product_images (
    id serial primary key,
    path text not null,
    product_id int not null references products(id)
);