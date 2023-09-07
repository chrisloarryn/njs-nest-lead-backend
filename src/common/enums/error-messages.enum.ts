export enum ErrorMessagesDTO {
    InvalidDate = '{"name": "$property", "reason": "$property debe ser de tipo fecha ($value)"}',
    InvalidMailList = '{"name": "$property", "reason": "$property debe ser un arreglo de correos ($value)"}',
    ApprovalsMinimumNumber = '{"name": "$property", "reason": "$property debe ser un número ($value)"}',
    InvalidString = '{"name": "$property", "reason": "$property debe ser de tipo texto ($value)"}',
    InvalidEmail = '{"name": "$property", "reason": "$property debe ser un correo válido ($value)"}',
    InvalidBoolean = '{"name": "$property", "reason": "$property debe ser de tipo booleano ($value)"}',
    InvalidEnum = '{"name": "$property", "reason": "$property debe ser uno de los siguientes valores: $constraint1"}',
}
