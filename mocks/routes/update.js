const createOk = {
  success: true,
  data: {
    id: 'string',
    rut: 'string',
    dv: 'string',
    primerNombre: 'string',
    segundoNombre: 'string',
    primerApellido: 'string',
    segundoApellido: 'string',
    telMovil: 'string',
    canalRegistro: 'string',
    sucursal: 'string',
    clasificacion: 'Frio',
    estado: 'SinGestion',
    tipoLead: 'Trabajador',
    direccion: 'string',
    ciudad: 'string',
    comuna: 'string',
    region: 'string',
  },
};
const createBadRequest = {
  success: false,
  message: 'an error has occurred',
  errors: [
    {
      name: 'rut',
      message: 'rut is required',
    },
  ],
};
const notFoundRequest = {
  success: false,
  message: 'an error has occurred',
  errors: [
    {
      name: 'not found',
      message: 'not found example',
    },
  ],
};

module.exports = [
  {
    id: 'update',
    url: '/api/v1/leads/:id',
    method: 'PATCH',
    variants: [
      {
        id: 'success',
        type: 'middleware',
        options: {
          middleware: (req, res, next, core) => {
            const header = req.headers['x-status-code'];
            switch (header) {
              case '200':
                res.status(200).json(createOk);
                break;
              case '400':
                res.status(400).json(createBadRequest);
                break;
              case "404":
                res.status(404).json(notFoundRequest);
              default:
                res.status(204).json({success: false});
                break;
            }
          },
        },
      },
    ],
  },
];
