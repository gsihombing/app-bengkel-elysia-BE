// This is file for type and interface


// Type
type Query = string
type ErrorResponse = any
type TypeId = unknown
type StatusCreate = { name: string }
type MemberCreate = { name: string }
type VehicleYearCreate = { year: string }


// interface
interface Status {
    id: number,
    name: string,
    createdAt: string,
    updatedAt: string
}

interface Member {
    id: number,
    name: string,
    createdAt: string,
    updatedAt: string
}

interface VehicleYear {
    id: number,
    year: string,
    createdAt: string,
    updatedAt: string
}