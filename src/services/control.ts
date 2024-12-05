// This is file for type and interface


// Type
type Sql = string
type ErrorResponse = unknown
type StatusCreate = { name: string }


// interface
interface Status {
    id: number,
    name: string,
    createdAt: string,
    updatedAt: string
}