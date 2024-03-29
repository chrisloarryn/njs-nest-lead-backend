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
const createForbiddenRequest = {
  success: false,
  message: 'an error has occurred',
  errors: [
    {
      name: 'error',
      message: 'forbidden',
    },
  ],
};

module.exports = [
  {
    id: 'retrieve',
    url: '/api/v1/leads/:id',
    method: 'GET',
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
              case '403':
                res.status(403).json(createForbiddenRequest);
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
