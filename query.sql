CREATE TABLE status (
    "id" varchar(255) NOT NULL PRIMARY KEY,
    "name" varchar(10) NOT NULL,
    "createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp
);

CREATE TABLE member (
	"id" varchar(255) NOT NULL PRIMARY KEY,
	"name" varchar(20) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp
);

CREATE TABLE vehicle_year (
	"id" varchar(255) NOT NULL PRIMARY KEY,
	"year" varchar(5) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp
);

CREATE TABLE vehicle_merk (
	"id" varchar(255) NOT NULL PRIMARY KEY,
	"name" varchar(15) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp
);

CREATE TABLE vehicle_category (
	"id" varchar(255) NOT NULL PRIMARY KEY,
	"name" varchar(15) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp
);

CREATE TABLE vehicle_type (
	"id" varchar(255) NOT NULL PRIMARY KEY,
	"vehicle_category_id" varchar(255) NOT NULL,
	"name" varchar(15) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp,
    CONSTRAINT fk_vehicle_type_vehicle_category FOREIGN KEY (vehicle_category_id) REFERENCES vehicle_category(id)
    	ON DELETE CASCADE
    	ON UPDATE CASCADE
);

CREATE TABLE users (
	"id" varchar(255) NOT NULL PRIMARY KEY,
	"status_id" varchar(255) NOT NULL,
	"member_id" varchar(255) NOT NULL,
	"vehicle_year_id" varchar(255) NOT NULL,
	"vehicle_merk_id" varchar(255) NOT NULL,
	"vehicle_type_id" varchar(255) NOT NULL,
	"no_police" varchar(15) NOT NULL,
	"name" varchar(255),
	"point" int DEFAULT 0,
	"address" TEXT,
	"phone_number" varchar(16) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp,
	"deletedAt" timestamp,
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
    CONSTRAINT fk_vusers_vehicle_type FOREIGN KEY (vehicle_type_id) REFERENCES vehicle_type(id)
    	ON DELETE CASCADE
    	ON UPDATE CASCADE
);

CREATE TABLE employee (
	"id" varchar(255) NOT NULL PRIMARY KEY,
	"status_id" varchar(255) NOT NULL,
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

CREATE TABLE level (
	"id" varchar(255) NOT NULL PRIMARY KEY,
	"name" varchar(15) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp
);

CREATE TABLE warehouse (
	"id" varchar(255) NOT NULL PRIMARY KEY,
	"level_id" varchar(255) NOT NULL,
	"name_warehouse" varchar(255) NOT NULL,
	"username" varchar(50) NOT NULL,
	"password" varchar(255) NOT NULL,
	"warehouse_address" TEXT NOT NULL,
	"phone_number_warehouse" varchar(16),
	"createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp,
    CONSTRAINT fk_level_warehouse FOREIGN KEY (level_id) REFERENCES level(id)
    	ON DELETE CASCADE
    	ON UPDATE CASCADE
);

CREATE TABLE mekanik (
	"id" varchar(255) NOT NULL PRIMARY KEY,
	"employee_id" varchar(255) NOT NULL,
	"warehouse_id" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp,
	CONSTRAINT fk_mekanik_employee FOREIGN KEY (employee_id) REFERENCES employee(id)
    	ON DELETE CASCADE
    	ON UPDATE CASCADE,
    CONSTRAINT fk_mekanik_warehouse FOREIGN KEY (warehouse_id) REFERENCES warehouse(id)
    	ON DELETE CASCADE
    	ON UPDATE CASCADE
);

CREATE TABLE barang (
	"id" varchar(255) NOT NULL PRIMARY KEY,
	"category_vehicle_id" varchar(255) NOT NULL,
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

CREATE TABLE warehouse_inventory (
	"id" varchar(255) NOT NULL PRIMARY KEY,
	"warehouse_id" varchar(255) NOT NULL,
	"barang_id" varchar(255) NOT NULL,
	"qty" int NOT NULL DEFAULT 0,
	"createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp,
    CONSTRAINT fk_warehouse_inventory_warehouse FOREIGN KEY (warehouse_id) REFERENCES warehouse(id)
    	ON DELETE CASCADE
    	ON UPDATE CASCADE,
    CONSTRAINT fk_warehouse_inventory_barang FOREIGN KEY (barang_id) REFERENCES barang(id)
    	ON DELETE CASCADE
    	ON UPDATE CASCADE
);

CREATE TABLE transaksi (
	"id" varchar(255) NOT NULL PRIMARY KEY,
	"users_id" varchar(255) NOT NULL,
	"mekanik_id" varchar(255) NOT NULL,
	"warehouse_id" varchar(255) NOT NULL,
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
    CONSTRAINT fk_transaksi_warehouse FOREIGN KEY (warehouse_id) REFERENCES warehouse(id)
    	ON DELETE CASCADE
    	ON UPDATE CASCADE
);

CREATE TABLE transaksi_detail (
	"id" varchar(255) NOT NULL PRIMARY KEY,
	"transaksi_id" varchar(255) NOT NULL,
	"barang_id" varchar(255) NOT NULL,
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
	"id" varchar(255) NOT NULL PRIMARY KEY,
	"from_warehouse_id" varchar(255) NOT NULL,
	"to_warehouse_id" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp,
    CONSTRAINT fk_order_barang_from_warehouse FOREIGN KEY (from_warehouse_id) REFERENCES warehouse(id)
    	ON DELETE CASCADE
    	ON UPDATE CASCADE,
    CONSTRAINT fk_order_barang_to_warehouse FOREIGN KEY (to_warehouse_id) REFERENCES warehouse(id)
    	ON DELETE CASCADE
    	ON UPDATE CASCADE
);

CREATE TABLE order_barang_detail (
	"id" varchar(255) NOT NULL PRIMARY KEY,
	"order_barang_id" varchar(255) NOT NULL,
	"barang_id" varchar(255) NOT NULL,
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