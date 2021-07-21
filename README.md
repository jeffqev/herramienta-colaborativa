# Proyecto
 
Este proyecto es solo la parte visual del Proyecto técnico para crear una herramienta colaborativa en Internet que permita gestionar las prácticas de laboratorio del claustro docente de la Universidad Politécnica Salesiana. 
 
También puede revisar la lógica de negocio en el repositorio del API [ Herramienta colaborativa API ](https://github.com/jeffqev/herramienta-colaborativa-api).
 
Si se desea entender mejor como fue contruido el proyecto, cada modulo realizado cuenta con su tarjeta en el [ tablero kanban ](https://github.com/jeffqev/herramienta-colaborativa/projects/1) cada tarjeta esta asociada a un pull request donde esta descrito lo que se hace y el codigo que fue modificado
## Pre requisitos para levantar el proyecto
 
Para levantar el proyecto correctamente es recomendable primero levantar localmente el API del proyecto [ Herramienta colaborativa API ](https://github.com/jeffqev/herramienta-colaborativa-api). o ya tener el API desplegada en algun servidor
 
El proyecto fue desarrollado en la versión de node v14.15.1 sin embargo se ha probado que funciona correctamente en versiones mayores a 12.0.0
 
Para que funcione correctamente es necesario tener las siguientes variables de entorno en un archivo `.env.development.local`
 
```
* REACT_APP_BACKEND_URL=https://localhost:3001
* REACT_APP_RICHTEXT_KEY=ey98xxxxxxxxxxxxx
```
 
Descripción: 
* REACT_APP_BACKEND_URL: Debe contener el url del proyecto del API
* REACT_APP_RICHTEXT_KEY= Debe contener el token que brinda [ tinymce ](https://www.tiny.cloud/) en el dashboard al crear una cuenta
 
 
### Levantar el proyecto
 
* `npm install`
* `npm start`
 
### Desplegar el aplicativo
 
**tener las variables de entorno descritas en los pre requisitos copiadas en el archivo `.env.production.local` tomando en cuenta que serán los datos de producción**
 
```
REACT_APP_BACKEND_URL=https://quicklab-api.grupoia.ec
REACT_APP_RICHTEXT_KEY=ey98xxxxxxxxxxxxx
```
 
Escribimos el comando 
 
* `npm run build`
 
Esto generar una carpeta llamada build la podemos renombrar por `herramienta-colaborativa-ui` y estará lista para ser servida en cualquier servidor 
 
**NOTE: si desea servir el build en nginx necesita especificar try_files de la siguiente forma para que no haya problema con las rutas de react router doom**


```
server {

        root /home/quicklab/herramienta-colaborativa-ui;
        index index.html index.htm index.nginx-debian.html;

        server_name quicklab.grupoia.ec;

        location / {
                try_files $uri /index.html;
        }
}
```
