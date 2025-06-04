// Type
type Query = string
type ErrorResponse = any
type TypeId = string
type CountData = number
type StatusCreate = { name: string }
type MemberCreate = { name: string }
type LevelCreate = { name: string }
type VehicleYearCreate = { year: string }
type VehicleMerkCreate = { name: string }
type VehicleCategoryCreate = { name: string }
type QueryParams = any
type VehicleTypeCreate = { 
    vehicle_category_id: string,
    name: string 
}
type EmployeeCreate = { 
    status_id: string,
    name: string,
    point: number | null,
    address: string | null,
    phone_number: string | null
}

type UsersCreate = { 
    status_id: string,
    member_id: string,
    vehicle_year_id: string,
    vehicle_merk_id: string,
    vehicle_type_id: string,
    no_police: string,
    name: string | null,
    point: number | null,
    address: string | null,
    phone_number: string
}

type BarangCreate = { 
    category_vehicle_id: string,
    name_barang: string,
    description_barang: string | null,
    price: any,
    point: number
}

type WarehouseCreate = {
    id: string,
    level_id: string,
    name_warehouse: string,
    username: string,
    password: string,
    warehouse_address: string,
    phone_number_warehouse: string | null
}











// interface
interface Status {
    id: string,
    name: string,
    createdAt: Date | null,
    updatedAt: Date | null
}

interface Member {
    id: string,
    name: string,
    createdAt: Date | null,
    updatedAt: Date | null
}

interface VehicleYear {
    id: string,
    year: string,
    createdAt: Date | null,
    updatedAt: Date | null
}

interface VehicleMerk {
    id: string,
    name: string,
    createdAt: Date | null,
    updatedAt: Date | null
}

interface VehicleCategory {
    id: string,
    name: string,
    createdAt: Date | null,
    updatedAt: Date | null
}

interface VehicleAllType {
    id: string,
    name: string,
    vehicle_category_id: string,
    createdAt: Date | null,
    updatedAt: Date | null
}

interface VehicleType {
    id: string,
    vehicle_category_id: string,
    name: string,
    createdAt: Date | null,
    updatedAt: Date | null
}

interface Level {
    id: string,
    name: string,
    createdAt: Date | null,
    updatedAt: Date | null
}

interface Employee {
    id: string,
    status_id: string,
    name: string,
    point: number | null,
    address: string | null,
    phone_number: string | null,
    createdAt: Date | null,
    updatedAt: Date | null
}

interface Users {
    id: string,
    status_id: string,
    member_id: string,
    vehicle_year_id: string,
    vehicle_merk_id: string,
    vehicle_type_id: string,
    no_police: string,
    name: string | null,
    point: number | null,
    address: string | null,
    phone_number: string,
    createdAt: Date | null,
    updatedAt: Date | null,
    deletedAt: Date | null
}

interface Barang {
    id: string,
    category_vehicle_id: string,
    name_barang: string,
    description_barang: string | null,
    price: any,
    point: number | null,
    createdAt: Date | null,
    updatedAt: Date | null
}

interface Warehouse {
    id: string,
    level_id: string,
    name_warehouse: string,
    username: string,
    password: string,
    warehouse_address: string | null,
    phone_number_warehouse: string | null,
    createdAt: Date | null,
    updatedAt: Date | null
}