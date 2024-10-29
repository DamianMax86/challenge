# challenge
# Backend
En la carpeta ReservasApi, se encuentra desarrollado el backend en .net core 6, y para la base de datos SQL Server.
El cual contiene los distintos metodos para consultas de reservas, consulta de reserva por id, edicion, creacion y cancelacion de reservas.
La conexion con la base de datos se establece en el archivo appsettings.json, y se utilizaron los comandos:

"dotnet ef migrations add InitialCreate"
"dotnet ef database update"

para que creara la base de datos, y el comando "dotnet run" para la ejecucion del proyecto.


# Frontend
En la carpeta ReservasApp, se encuentra desarrollado el front con Angular, version Angular CLI 17.3.11, Node 18.20.1.
El cual contiene los componentes para crear, editar y listar las reservas, donde en la pantalla de listar reserveras se le incorporo filtros de busquedas por nombre o fecha.

En el archivo reserva.service.ts, ubicado en "ReservasApp\src\app\services", se encuentra la linea:
"private apiUrl = 'http://localhost:5183/api/reservas';" donde se setea la url obtenida en la ejecucion del proyecto ReservasApi.
