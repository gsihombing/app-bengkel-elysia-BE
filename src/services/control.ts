// This is file for type and interface


// Type
type Query = string
type ErrorResponse = any
type TypeId = string
type StatusCreate = { name: string }
type MemberCreate = { name: string }
type VehicleYearCreate = { year: string }
type VehicleMerkCreate = { name: string }
type VehicleCategoryCreate = { name: string }
type VehicleTypeCreate = { 
    vehicle_category_id: string,
    name: string 
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