# CRED-JAVA-REACT-SQLite

The Client-Management Application (Basic UI and Java API using SQLite) is responsible for handling HTTP requests related to client details. It provides endpoints to create, retrieve, update, and delete client details in the system with will be stored in the SQLite DB.

**Technical Stack**
Java: Programming language used for backend development.
Spring Boot: Framework used for building the application.
SQLite: Database used for data storage.
ReactJS: Frontend framework used for the user interface.
Maven: Build automation tool.


**Endpoints **

Create Client Details:
Method: POST
Endpoint: /client/save
Description: Creates a new client detail entry in the system.


Get All Clients:
Method: GET
Endpoint: /client/getAll
Description: Retrieves all client details from the system.



Update Client Details:
Method: PUT
Endpoint: /client/update/{id}
Description: Updates an existing client detail entry in the system.


Delete Client:
Method: DELETE
Endpoint: /client/delete/{clientId}


Get Client By ID:
Method: GET
Endpoint: /client/get/{id}
Description: Retrieves a client detail entry by its ID.


**UI**:
Home Page

Home.png

Create new Client
Add New Client.png

View & Edit Client
View and edit client details.png

delete client
delete client.png

Database 

Create a folder filename.db in the project folder and config in the application.properties for SQLite connection.
