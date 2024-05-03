import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
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
}
