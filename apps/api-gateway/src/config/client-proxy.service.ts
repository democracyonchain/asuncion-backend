import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

/**
 * Clase donde se crean los diferentes proxys de comunicación entre el apigateway y los microservicios
 *
 * @export
 * @class ClientProxyService
 * @typedef {ClientProxyService}
 */
@Injectable()
export class ClientProxyService {
  clientProxyAdministracion(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: process.env.MS_ADMINISTRACION_HOST,
        port: parseInt(process.env.MS_ADMINISTRACION_PORT),
      },
    });
  }
  clientProxyAutorizacion(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: process.env.MS_AUTORIZACION_HOST,
        port: parseInt(process.env.MS_AUTORIZACION_PORT),
      },
    });
  }
  clientProxyDigitalizacion(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: process.env.MS_DIGITALIZACION_HOST,
        port: parseInt(process.env.MS_DIGITALIZACION_PORT),
      },
    });
  }
  clientProxyVerificacion(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: process.env.MS_VERIFICACION_HOST,
        port: parseInt(process.env.MS_VERIFICACION_PORT),
      },
    });
  }
  clientProxyReportes(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: process.env.MS_REPORTES_HOST,
        port: parseInt(process.env.MS_REPORTES_PORT),
      },
    });
  }
}
