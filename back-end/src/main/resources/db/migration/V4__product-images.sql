create table product_images (
    id serial primary key,
    file_name text not null,
    product_id int not null references products(id)
);