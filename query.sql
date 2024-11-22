CREATE TABLE status (
    "id" serial NOT NULL PRIMARY KEY,
    "name" varchar(10) NOT NULL,
    "createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp
);

CREATE TABLE member (
	"id" serial NOT NULL PRIMARY KEY,
	"name" varchar(20) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp
);

CREATE TABLE vehicle_year (
	"id" serial NOT NULL PRIMARY KEY,
	"year" varchar(5) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp
);

CREATE TABLE vehicle_merk (
	"id" serial NOT NULL PRIMARY KEY,
	"name" varchar(15) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp
);

CREATE TABLE vehicle_category (
	"id" serial NOT NULL PRIMARY KEY,
	"name" varchar(15) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp
);

CREATE TABLE vehicle_type (
	"id" serial NOT NULL PRIMARY KEY,
	"vehicle_category_id" int NOT NULL,
	"name" varchar(15) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp,
    CONSTRAINT fk_vehicle_type_vehicle_category FOREIGN KEY (vehicle_category_id) REFERENCES vehicle_category(id)
    	ON DELETE CASCADE
    	ON UPDATE CASCADE
);

CREATE TABLE users (
	"id" varchar(255) NOT NULL PRIMARY KEY,
	"status_id" int NOT NULL,
	"member_id" int NOT NULL,
	"vehicle_year_id" int NOT NULL,
	"vehicle_merk_id" int NOT NULL,
	"vehicle_type_id" int NOT NULL,
	"no_police" varchar(15) NOT NULL,
	"name" varchar(255),
	"point" int DEFAULT 0,
	"address" TEXT,
	"phone_number" varchar(16) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp,
    CONSTRAINT fk_users_status FOREIGN KEY (status_id) REFERENCES status(id)
    	ON DELETE CASCADE
    	ON UPDATE CASCADE,
    CONSTRAINT fk_users_member FOREIGN KEY (member_id) REFERENCES member(id)
    	ON DELETE CASCADE
    	ON UPDATE CASCADE,
    CONSTRAINT fk_users_vehicle_year FOREIGN KEY (vehicle_year_id) REFERENCES vehicle_year(id)
    	ON DELETE CASCADE
    	ON UPDATE CASCADE,
    CONSTRAINT fk_users_vehicle_merk FOREIGN KEY (vehicle_merk_id) REFERENCES vehicle_merk(id)
    	ON DELETE CASCADE
    	ON UPDATE CASCADE,
    CONSTRAINT fk_vusers_ehicle_type FOREIGN KEY (vehicle_type_id) REFERENCES vehicle_type(id)
    	ON DELETE CASCADE
    	ON UPDATE CASCADE
);

CREATE TABLE employee (
	"id" varchar(255) NOT NULL PRIMARY KEY,
	"status_id" int NOT NULL,
	"name" varchar(255) NOT NULL,
	"point" int DEFAULT 0,
	"address" TEXT,
	"phone_number" varchar(16),
	"createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp,
    CONSTRAINT fk_employee_status FOREIGN KEY (status_id) REFERENCES status(id)
    	ON DELETE CASCADE
    	ON UPDATE CASCADE
);

CREATE TABLE gerai (
	"id" serial NOT NULL PRIMARY KEY,
	"name_gerai" varchar(255) NOT NULL,
	"username" varchar(50) NOT NULL,
	"password" varchar(255) NOT NULL,
	"address_gerai" TEXT NOT NULL,
	"phone_number_gerai" varchar(16),
	"createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp
);

CREATE TABLE mekanik (
	"id" serial NOT NULL PRIMARY KEY,
	"employee_id" varchar(255) NOT NULL,
	"gerai_id" int NOT NULL,
	"createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp,
	CONSTRAINT fk_mekanik_employee FOREIGN KEY (employee_id) REFERENCES employee(id)
    	ON DELETE CASCADE
    	ON UPDATE CASCADE,
    CONSTRAINT fk_mekanik_gerai FOREIGN KEY (gerai_id) REFERENCES gerai(id)
    	ON DELETE CASCADE
    	ON UPDATE CASCADE
);

CREATE TABLE warehouse (
	"id" serial NOT NULL PRIMARY KEY,
	"warehouse_name" varchar(255) NOT NULL,
	"username" varchar(50) NOT NULL,
	"password" varchar(255) NOT NULL,
	"warehouse_address" TEXT NOT NULL,
	"warehouse_phone_number" varchar(16),
	"createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp
);

CREATE TABLE barang (
	"id" serial NOT NULL PRIMARY KEY,
	"category_vehicle_id" int NOT NULL,
	"name_barang" varchar(255) NOT NULL,
	"description_barang" TEXT,
	"price" numeric NOT NULL,
	"point" int DEFAULT 0,
	"createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp,
    CONSTRAINT fk_barang_vehicle_category FOREIGN KEY (category_vehicle_id) REFERENCES vehicle_category(id)
    	ON DELETE CASCADE
    	ON UPDATE CASCADE
);

CREATE TABLE gerai_inventory (
	"id" serial NOT NULL PRIMARY KEY,
	"gerai_id" int NOT NULL,
	"barang_id" int NOT NULL,
	"qty" int NOT NULL DEFAULT 0,
	"createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp,
    CONSTRAINT fk_inventory_gerai_gerai FOREIGN KEY (gerai_id) REFERENCES gerai(id)
    	ON DELETE CASCADE
    	ON UPDATE CASCADE,
    CONSTRAINT fk_inventory_gerai_barang FOREIGN KEY (barang_id) REFERENCES barang(id)
    	ON DELETE CASCADE
    	ON UPDATE CASCADE
);

CREATE TABLE inventory_warehouse (
	"id" serial NOT NULL PRIMARY KEY,
	"warehouse_id" int NOT NULL,
	"barang_id" int NOT NULL,
	"qty" int NOT NULL DEFAULT 0,
	"createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp,
    CONSTRAINT fk_inventory_warehouse_warehouse FOREIGN KEY (warehouse_id) REFERENCES warehouse(id)
    	ON DELETE CASCADE
    	ON UPDATE CASCADE,
    CONSTRAINT fk_inventory_warehouse_barang FOREIGN KEY (barang_id) REFERENCES barang(id)
    	ON DELETE CASCADE
    	ON UPDATE CASCADE
);

CREATE TABLE transaksi (
	"id" serial NOT NULL PRIMARY KEY,
	"users_id" varchar(255) NOT NULL,
	"mekanik_id" int NOT NULL,
	"gerai_id" int NOT NULL,
	"point" int NOT NULL DEFAULT 0,
	"total" int,
	"createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp,
     CONSTRAINT fk_transaksi_user FOREIGN KEY (users_id) REFERENCES users(id)
    	ON DELETE CASCADE
    	ON UPDATE CASCADE,
    CONSTRAINT fk_transaksi_mekanik FOREIGN KEY (mekanik_id) REFERENCES mekanik(id)
    	ON DELETE CASCADE
    	ON UPDATE CASCADE,
    CONSTRAINT fk_transaksi_gerai FOREIGN KEY (gerai_id) REFERENCES gerai(id)
    	ON DELETE CASCADE
    	ON UPDATE CASCADE
);

CREATE TABLE transaksi_detail (
	"id" serial NOT NULL PRIMARY KEY,
	"transaksi_id" int NOT NULL,
	"barang_id" int NOT NULL,
	"qty" int NOT NULL,
	"sub_total" int NOT NULL,
	"createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp,
    CONSTRAINT fk_transaksi_detail_transaksi FOREIGN KEY (transaksi_id) REFERENCES transaksi(id)
    	ON DELETE CASCADE
    	ON UPDATE CASCADE,
    CONSTRAINT fk_transaksi_detail_barang FOREIGN KEY (barang_id) REFERENCES barang(id)
    	ON DELETE CASCADE
    	ON UPDATE CASCADE
);

CREATE TABLE order_barang (
	"id" serial NOT NULL PRIMARY KEY,
	"gerai_id" int NOT NULL,
	"warehouse_id" int NOT NULL,
	"createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp,
     CONSTRAINT fk_order_barang_gerai FOREIGN KEY (gerai_id) REFERENCES gerai(id)
    	ON DELETE CASCADE
    	ON UPDATE CASCADE,
    CONSTRAINT fk_order_barang_warehouse FOREIGN KEY (warehouse_id) REFERENCES warehouse(id)
    	ON DELETE CASCADE
    	ON UPDATE CASCADE
);

CREATE TABLE order_barang_detail (
	"id" serial NOT NULL PRIMARY KEY,
	"order_barang_id" int NOT NULL,
	barang_id int NOT NULL,
	"qty" int NOT NULL,
	"createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp,
    CONSTRAINT fk_order_barang_detail_transaksi FOREIGN KEY (order_barang_id) REFERENCES order_barang(id)
    	ON DELETE CASCADE
    	ON UPDATE CASCADE,
    CONSTRAINT fk_order_barang_detail_barang FOREIGN KEY (barang_id) REFERENCES barang(id)
    	ON DELETE CASCADE
    	ON UPDATE CASCADE
);





























