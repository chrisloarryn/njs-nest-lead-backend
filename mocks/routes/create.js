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

module.exports = [
  {
    id: 'create',
    url: '/api/v1/leads',
    method: 'POST',
    variants: [
      {
        id: 'success',
        type: 'middleware',
        options: {
          middleware: (req, res, next, core) => {
            const header = req.headers['x-status-code'];
            switch (header) {
              case '201':
                res.status(201).json(createOk);
                break;
              case '400':
                res.status(400).json(createBadRequest);
                break;
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
