CREATE TABLE buildings(
    building_id serial PRIMARY KEY,
    building_name text not null,
    building_square_money int not null,
    building_img text not null
);

CREATE TABLE buildings_adresses (
    buildings_adress_id bigserial PRIMARY KEY,
    buildings_adress_name text not null,
    building_id int not null REFERENCES buildings(building_id)
);

CREATE TABLE banks(
    bank_id bigserial PRIMARY KEY,
    bank_name text not null,
    bank_money int not null,
    bank_img text not null,
    bank_percent int not null,
    bank_service int not null,
    bank_years int not null
);

CREATE TABLE six_rooms(
    id bigserial PRIMARY KEY,
    building_square int not null,
    building_id int not null REFERENCES buildings(building_id)
);

CREATE TABLE five_rooms(
    id bigserial PRIMARY KEY,
    building_square int not null,
    building_id int not null REFERENCES buildings(building_id)
);

CREATE TABLE four_rooms(
    id bigserial PRIMARY KEY,
    building_square int not null,
    building_id int not null REFERENCES buildings(building_id)
);

CREATE TABLE three_rooms(
    id bigserial PRIMARY KEY,
    building_square int not null,
    building_id int not null REFERENCES buildings(building_id)
);

CREATE TABLE two_rooms(
    id bigserial PRIMARY KEY,
    building_square int not null,
    building_id int not null REFERENCES buildings(building_id)
);

--------------------------
