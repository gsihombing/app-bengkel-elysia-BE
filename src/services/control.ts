// This is file for type and interface


// Type
type Query = string
type ErrorResponse = any
type TypeId = string | undefined
type StatusCreate = { name: string }
type MemberCreate = { name: string }
type VehicleYearCreate = { year: string }
type VehicleMerkCreate = { name: string }
type VehicleCategoryCreate = { name: string }
type VehicleTypeCreate = { 
    vehicle_category_id: number,
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
    id: number,
    name: string,
    createdAt: string,
    updatedAt: string
}

interface VehicleCategory {
    id: number,
    name: string,
    createdAt: string,
    updatedAt: string
}

interface VehicleAllType {
    id: number,
    name: string,
    metadata: object,
    createdAt: string,
    updatedAt: string
}

interface VehicleType {
    id: number,
    vehicle_category_id: number,
    name: string,
    createdAt: string,
    updatedAt: string
}