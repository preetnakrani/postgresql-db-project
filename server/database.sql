-- Do not change the order of the queries
-- Drop Tables run queries in this order
drop table if exists visits;
drop table if exists customer_purchases_with;
drop table if exists shift_at_worksOn;
drop table if exists tickets;
drop table if exists ticket_tier;
drop table if exists eats;
drop table if exists dinosaurs;
drop table if exists shows;
drop table if exists rides;
drop table if exists attractions;
drop table if exists inventory_order;
drop table if exists employees;
drop table if exists food;
drop table if exists schedules;
drop table if exists offers;
drop table if exists tier_quantity;

-- Create Tables run queries in this order


Create table if not exists tier_quantity(
    tier char(1) primary key, 
    minTickets integer
);


Create table if not exists offers(
    code char(25) primary key, 
    tier char(1),
    discount real, 
    start_date date, 
    expiry_date date, 
    foreign key (tier) references tier_quantity(tier) 
    on delete cascade
    on update cascade
);


CREATE TABLE  if not exists schedules(
    sid serial, 
    start_time TIME,
    end_time TIME, 
    start_date DATE,
    end_date DATE,
    days VARCHAR(7),
    PRIMARY KEY (sid)
);

CREATE TABLE if not exists food(
    fid serial,
    name VARCHAR(50),
    description VARCHAR(255),
    PRIMARY KEY (fid)
);

CREATE TABLE if not exists employees(
    eid serial,
    fname VARCHAR(50),
    lname VARCHAR(50),
    phone VARCHAR(50),
    salary REAL,
    email VARCHAR(100),
    sid INTEGER,
    PRIMARY KEY (eid),
    FOREIGN KEY (sid) REFERENCES employees(eid) 
    on delete set null 
    on update cascade
);

Create table if not exists inventory_order(
    iid serial primary key, 
    status char(50), 
    quantity integer, 
    type char(50), 
    eid integer, 
    order_date date, 
    foreign key (eid) references employees(eid) 
    on delete set null 
    on update cascade
);

Create table if not exists attractions(
    aid serial primary key, 
    name char(50), 
    location char(50)
);

Create table if not exists rides(
    aid integer primary key, 
    capacity integer, 
    foreign key (aid) references attractions(aid) 
    on delete cascade 
    on update cascade
);

Create table if not exists shows(
    aid integer primary key, 
    sid integer, 
    duration real,  
    foreign key (sid) references schedules(sid), 
    foreign key (aid) references attractions(aid) 
    on delete cascade 
    on update cascade
);

Create table if not exists dinosaurs(
    aid integer primary key, 
    animal_name char(100),  
    foreign key (aid) references attractions(aid) 
    on delete cascade 
    on update cascade
);

CREATE TABLE if not exists eats(
    aid INTEGER,
    fid INTEGER,
    PRIMARY KEY(aid, fid),
    FOREIGN KEY (aid) REFERENCES dinosaurs(aid) 
    on delete cascade 
    on update cascade,
    FOREIGN KEY (fid) REFERENCES food(fid) 
    on delete cascade 
    on update cascade
);


CREATE TABLE if not exists ticket_tier (
    tier CHAR(1) PRIMARY KEY,
    price REAL
);

CREATE TABLE if not exists tickets(
    tid serial PRIMARY KEY,
    tier CHAR(1),
    FOREIGN KEY (tier) REFERENCES ticket_tier(tier) 
    on delete cascade 
    on update cascade
);

CREATE TABLE if not exists Shift_At_WorksOn (
    description CHAR(255),
    start_date DATE,
    end_date DATE,
    start_time TIME,
    end_time TIME,
    status CHAR(50),
    eid INT NOT NULL,
    aid INT,
    PRIMARY KEY (description, eid),
    FOREIGN KEY (eid) REFERENCES employees(eid)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (aid) REFERENCES attractions(aid) 
    on delete set null 
    on update cascade
);

CREATE TABLE if not exists customer_purchases_with (
    cid serial primary key,
    fname CHAR(50),
    lname CHAR(50),
    phone BIGINT,
    email CHAR(100),
    code char(25),
    tid INT unique,
    actual_price REAL,
    expiry_date DATE,
    date_issued DATE,
    family_representative INT,
    FOREIGN KEY (code) REFERENCES offers(code) 
    on delete set null 
    on update cascade,
    FOREIGN KEY (tid) REFERENCES tickets(tid)
    on delete set null 
    on update cascade,
    FOREIGN KEY (family_representative) REFERENCES customer_purchases_with(cid) 
    on delete set null 
    on update cascade
);

CREATE TABLE if not exists visits (
    aid INT,
    cid INT,
    frequency INT,
    PRIMARY KEY (aid, cid),
    FOREIGN KEY (aid) REFERENCES attractions(aid) 
    on delete cascade 
    on update cascade,
    FOREIGN KEY (cid) REFERENCES customer_purchases_with(cid) 
    on delete set null 
    on update cascade
);


-- Populate Tables run queries in this order

INSERT INTO tier_quantity(tier, minTickets)
VALUES
	(1, 5),
	(2, 5),
    (3, 5),
    (4, 5),
    (5, 5);

INSERT INTO offers(code, tier, start_date, expiry_date, discount)
VALUES
	('ABC123', 1, '2021-06-01', '2021-08-01', 0.1),
	('ACC124', 2, '2021-06-01', '2021-08-01', 0.15),
    ('ADC125', 3, '2021-06-01', '2021-08-01', 0.2),
    ('AEC126', 4, '2021-06-01', '2021-07-01', 0.25),
    ('AFC127', 5, '2021-06-01', '2021-07-01', 0.3);



INSERT INTO schedules(sid, start_time, end_time, start_date, end_date, days) 
VALUES 
    (DEFAULT, '08:00:00', '12:00:00', '2021-06-01', '2021-07-01', 'MWF'),
    (DEFAULT, '12:00:00', '17:00:00', '2021-05-01', '2021-07-01', 'MWF'),
    (DEFAULT, '17:00:00', '21:00:00', '2021-06-01', '2021-07-01', 'MWF'),
    (DEFAULT, '08:00:00', '12:00:00', '2021-05-01', '2021-06-01', 'TF'),
    (DEFAULT, '10:00:00', '14:00:00', '2021-06-01', '2021-07-01', 'TF');

INSERT INTO food(fid, name, description) 
VALUES
    (DEFAULT, 'T-Rex Toast', 'Crispy, golden brown toast fit for a king'),
    (DEFAULT, 'Stego Soup', 'Delectable blend of stegosaurus innards'),
    (DEFAULT, 'Pterodactyl Wings', 'Hand-breaded Pterodactyl wings served with a side of BBQ sauce'),
    (DEFAULT, 'Dino Scales', 'Potato chips'),
    (DEFAULT, 'Eggs', 'Poor guys that never really stood a chance');



INSERT INTO attractions(aid, name, location)
VALUES
	(DEFAULT, 'Velociraptor Enclosure', 'Dinoland'),
	(DEFAULT, 'Ferris Wheel', 'Rides Galore'),
    (DEFAULT, 'Pet-a-Herbivore', 'Dinoland'),
    (DEFAULT, 'T-Rex Enclosure', 'Dinoland'),
    (DEFAULT, 'Triceratops Enclosure', 'Dinoland'),
    (DEFAULT, 'I am a Stegosaurus', 'Dinoland'),
    (DEFAULT, 'A Blast to the Past', 'Rides Galore'),
    (DEFAULT, 'Circus Tricks with Dinosaurs', 'The Stage'),
    (DEFAULT, 'The Life Cycle of a Herbivore', 'The Stage'),
    (DEFAULT, 'The Life Cycle of a Carnivore', 'The Stage'),
    (DEFAULT, '1 Million Lions against 1 Thousand T-rexs', 'The Stage'),
    (DEFAULT, 'Its a Mystery', 'The Stage'),
    (DEFAULT, 'Ancient Waters', 'Rides Galore'),
    (DEFAULT, 'Ancient Waters', 'Rides Galore'),
    (DEFAULT, 'Tech Roller Coaster', 'Tech Spot');

INSERT INTO rides(aid, capacity) 
VALUES 
    (2, 40),
    (5, 30),
    (8, 10),
    (14, 60),
    (15, 30);

INSERT INTO shows(aid, sid, duration)
VALUES 
	(9, 1, 1),
	(10, 2, 0.5),
	(11, 3, 1.5),
	(12, 4, 0.5),
	(13, 4, 1);

INSERT INTO dinosaurs(aid, animal_name)
VALUES
	(1, 'Velociraptor'),
	(3, 'Brachiosaurus'),
	(4, 'T-Rex'),
	(6, 'Triceratops'),
	(7, 'Stegosaurus');

INSERT INTO eats(aid, fid) 
VALUES
    (1,1),
    (3,2),
    (4,3),
    (6,4),
    (7,5);

INSERT INTO ticket_tier(tier, price)
VALUES
	(1, 10),
	(2, 20),
	(3, 30),
	(4, 40),
	(5, 50);

INSERT INTO tickets(tid, tier)
VALUES
	(1, 1),
	(2, 1),
	(3, 3),
	(4, 2),
	(5, 2);

INSERT INTO customer_purchases_with(cid, fname, lname, phone, email, code, tid, actual_price, expiry_date, date_issued, family_representative)
VALUES
	(1, 'John', 'Smith', '2369991234', 'johnsmith@gmail.com', null, 1, 10, '2021-05-03', '2021-05-02', null),
    (2, 'Jack', 'Smith', '2369991234', 'johnsmith@gmail.com', null, 2, 10, '2021-05-03', '2021-05-02', null),
    (3, 'Jake', 'Smith', '2362222222', 'jacksmith@gmail.com', null, 3, 30, '2021-05-03', '2021-05-02', null),
    (4, 'Bob', 'Joe', '2361231234', 'bobjoe@yahoo.com', null, 4, 20, '2021-05-13', '2021-05-12', null),
    (5, 'Joe', 'Bob', '2369879876', 'joebob@yahoo.com', 'ADC125', 5, 18, '2021-05-13', '2021-05-12', null);

INSERT INTO visits (aid, cid, frequency)
VALUES
	    (1, 1, 1),
    (3, 1, 1),
    (4, 1, 2),
    (6, 1, 3),
    (7, 1, 5),
    (9, 1, 1),
    (10, 1, 1),
    (11, 1, 2),
    (12, 1, 1),
    (13, 1, 3),
    (9, 2, 1),
    (10, 2, 2),
    (11, 2, 1),
    (12, 2, 3),
    (13, 2, 3),
    (1, 3, 7),
    (3, 3, 5),
    (4, 3, 4),
    (6, 3, 2),
    (7, 3, 3),
    (2, 4, 1),
    (5, 4, 1),
    (8, 4, 1),
    (14, 4, 2),
    (15, 4, 1),
    (1, 5, 1),
    (2, 5, 1),
    (3, 5, 1),
    (4, 5, 1),
    (5, 5, 1),
    (6, 5, 1),
    (7, 5, 1),
    (8, 5, 1),
    (9, 5, 1),
    (10, 5, 1),
    (11, 5, 1),
    (12, 5, 1),
    (13, 5, 1),
    (14, 5, 1),
    (15, 5, 1);

INSERT INTO employees(eid, fname, lname, phone, salary, email, sid)
VALUES
    (DEFAULT, 'John', 'Hamm', '289-000-1234', 45000, 'john.hammRocks@gmail.com', 1),
    (DEFAULT, 'Jeff', 'Goldblum', '289-011-1234', 85200, 'jeffGold@outlook.com', 2),
    (DEFAULT, 'Sam', 'Neill', '905-011-2234', 22800, 'iamsamneill@hotmail.com', 3),
    (DEFAULT, 'Laura', 'Dern', '289-129-2345', 85950, 'dern.laura@gmail.com', 4),
    (DEFAULT, 'Ariana', 'Richards', '905-564-1256', 100000, 'ariana.is.the.richest@gmail.com', 5);

INSERT INTO shift_at_worksOn(description, start_date, end_date, start_time, end_time, status, eid, aid)
VALUES
	('Feeding', '2021-05-01', '2021-05-08', '9:00', '10:00', 'worked',1, 1),
	('Operator', '2021-05-01', '2021-05-08', '10:00', '12:00', 'pending',2, 2),
    ('Operator', '2021-05-01', '2021-05-08', '15:00', '17:00', 'missed',3, 5),
    ('Ticketing', '2021-05-01', '2021-05-22', '9:00', '12:00', null,4, 2),
    ('Ticketing', '2021-05-01', '2021-05-22', '12:00', '15:00', null,5, 5);



INSERT INTO inventory_order(iid, status, quantity, type, eid, order_date)
VALUES
	(DEFAULT, 'Ordered', 40, 'Food', 1, '2021-06-01'),
	(DEFAULT, 'Shipped', 100, 'Medicine', 1, '2021-06-01'),
    (DEFAULT, 'Ordered', 20, 'Food', 3, '2021-06-01'),
    (DEFAULT, 'Ordered', 10, 'Supplies', 4, '2021-06-01'),
    (DEFAULT, 'Shipped', 90, 'Props', 2, '2021-06-01');