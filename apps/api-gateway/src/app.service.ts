import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
  getError401() {
    return `
      <html>
      <head>
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
              <title>BSC</title>
              <link rel="stylesheet" href="https://bsc-app.com.es">
          </head>
      <body>
              <div id="pagina">
                  <div id="header">
                      <div class="fila">
                          <div id="divNombreAplicacion" style="float: right;margin-top:40px;">
                              BSC
                          </div>
                      </div>
                  </div>
                  <div id="cuerpo" style="background-color: #FFFFFF;">
                      <div class="fila" style="text-align: right; height: 500px;">
                          <div class="celda" style="width: 65%; text-align: center; vertical-align: middle;">
                          </div>
                          <div class="celda" style="width: 35%;">
                              <div style="height: 250px; font-size: 26px; padding-top: 163px;"> Error 401: Unautorized <br><br> </div>
                          </div>
                      </div>
                  </div>
                  <div id="footer">
                      <div>
                          <hr>
                          <p style="text-align: center;"> Derechos reservados 2025 <br>BSC CORP</p>
                      </div>
                  </div>
              </div>
             </body>
      </html>
      `;
  }
}
