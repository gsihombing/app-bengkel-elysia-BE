// This is file for type and interface


// Type
type Query = string
type ErrorResponse = any
type TypeId = unknown
type StatusCreate = { name: string }


// interface
interface Status {
    id: number,
    name: string,
    createdAt: string,
    updatedAt: string
}