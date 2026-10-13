export function BadRequestException({
  errorMsg = "Bad Request",
  cause = { statusCode: 400 },
} = {}) {
  throw new Error(errorMsg, { cause });
}
export function ConflictException({
  errorMsg = "Conflict",
  cause = { statusCode: 409 },
} = {}) {
  throw new Error(errorMsg, { cause });
}
export function NotFoundException({
  errorMsg = "Not Found",
  cause = { stausCode: 404 },
} = {}) {
  throw new Error(errorMsg, { cause });
}
