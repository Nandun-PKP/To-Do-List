# To-Do-List

I created my first Spring Boot project 
([to-do-list-rouge-phi-54.vercel.app](https://to-do-list-rouge-phi-54.vercel.app))

### 📝 To-Do List Backend API - Request Flow Explained

First, let's simply understand the process (flow) of this Spring Boot application:
1. When you send a request (from Postman or React UI) to a URL like `http://localhost:8080/api/createtask`.
2. The **Embedded Tomcat Server** inside Spring Boot catches it automatically.
3. It hands the request over to the **Controller** (`TaskController.java`).
4. The Controller passes the data to the **Service** (`TaskService.java`) for processing.
5. The Service uses the **Mapper** to convert DTOs and asks the **Repository** (`TaskRepository.java`) to save it.
6. Finally, the Repository securely saves the data into the **MySQL Database**.

Now let's take them one by one and simply look at what the lines of code inside them mean.

#### 1. pom.xml (The Foundation of the Project)
This is the file read by the Maven software. It downloads the things we need from the internet.
* `<parent>`: This declares that this is a Spring Boot project, allowing it to set up standard configurations automatically.
* `<dependencies>`: This is exactly like a shopping list. It tells Maven to download tools like `spring-boot-starter-web` (for building web APIs), `spring-boot-starter-data-jpa` (for database communication), `mysql-connector-j` (to connect to MySQL), and helpful plugins like `lombok` and `mapstruct`.

#### 2. application.properties (The Settings File)
Modern Spring Boot doesn't need complex XML files. Instead, we use this simple file for configurations.
* `spring.datasource.url`: Tells Spring exactly where your MySQL database is located.
* `spring.datasource.username` & `password`: The login credentials for your database.
* `spring.jpa.hibernate.ddl-auto=update`: This is a magic line! It tells Hibernate to automatically create or update the database tables based on our Java Classes (Entities).

#### 3. T0DoListApplication.java (The Engine)
This is where the application starts.
* `@SpringBootApplication`: This is a powerful label (Annotation). It tells Spring to automatically configure the project, start the embedded Tomcat server, and scan the folders for our code.
* `SpringApplication.run()`: The main command that boots up the entire application.

#### 4. TaskController.java (The Receptionist)
This file receives the incoming HTTP requests from the outside world (like React or Postman).
* `@RestController`: Tells Spring that this class will handle web requests and send back raw data (JSON), not HTML pages.
* `@RequestMapping("/api")`: Sets the base URL for all endpoints in this file.
* `@PostMapping("/createtask")`: Connects this specific method to the `/api/createtask` URL when a POST request is sent.
* `@RequestBody`: Tells Spring to take the JSON data coming from the frontend and automatically convert it into a Java object (`TaskDTO`).

#### 5. TaskService.java (The Manager)
This is where the actual business logic happens.
* `@Service`: Tells Spring this is a service class handling the core operations.
* **Logic:** It takes the incoming `TaskDTO`, uses `TaskMapper` to convert it into a `Task` Database Entity, and then gives it to the Repository to save.

#### 6. TaskRepository.java (The Database Guard)
* `extends JpaRepository<Task, Long>`: By simply writing this one line, Spring Data JPA automatically writes all the complex SQL queries (Save, Find, Delete, Update) for us in the background. We don't have to write a single SQL command manually!
