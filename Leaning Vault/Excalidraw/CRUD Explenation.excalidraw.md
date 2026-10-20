---
excalidraw-plugin: parsed
tags: [excalidraw]
---
==⚠  Switch to EXCALIDRAW VIEW in the MORE OPTIONS menu of this document. ⚠== You can decompress Drawing data with the command palette: 'Decompress current Excalidraw file'. For more info check in plugin settings under 'Saving'

# Excalidraw Data

## Text Elements
SPRING BOOT CRUD / FROM JAVA CODE TO DATABASE ROWS ^APivoN96

A guided Person example: read left to right, then move down. Zoom into one numbered section at a time. ^9hVOtYmB

CLIENT ^foSN5WgN

HTTP + JSON ^CAu6LiM5

CONTROLLER ^8LEMTC9v

routes + responses ^nML6fnQs

SERVICE ^xa0HEYs2

rules + operations ^iI6WYSvg

REPOSITORY ^bo7KXCA3

save / find / delete ^hsIHCuEm

HIBERNATE ^dpu0b9iS

JPA -> SQL ^0UmxXjfJ

POSTGRESQL ^vKjF3nXx

stored rows ^q4bBvsyB

Response travels back through the layers; the controller writes the JSON body. ^Cz9nNCGE

HTTP crosses the client/backend boundary. Inside the backend these are Java method calls. JDBC carries SQL to PostgreSQL. ^zQT94P5e

HOW TO READ THIS DRAWING ^kiDl52Ul

01-04: Java + Spring foundations    |    05-08: full service + controller code    |    09-10: configuration + requests
11: watch Ana move through all four operations    |    12: file map, glossary and practice
Real Java syntax is preserved. Parts of the same file continue in the next section. Examples are teaching code, not installed endpoints. ^Wvh33Nsb

01 / JAVA: CLASSES BECOME OBJECTS ^Zw9fmIbg

Example statements inside a method ^9rNpOiNI

CODE / 01 ^AcdWloxI

Person person = new Person();
person.setName("Ana");
Person saved = repo.save(person);
Long id = saved.getId();
String name = saved.getName(); ^NSPJuMHf

WHAT EACH PART DOES ^rkj1aRzc

CLASS = a description of data and behavior.
Person describes an id and a name.
OBJECT = one instance of that class in memory.
new Person() constructs a fresh object.
VARIABLE = a named place holding a value or reference.
person refers to that object; its type is Person.
METHOD = an operation called with arguments.
setName("Ana") changes the object's name field.
return sends a result back to the caller.
Long holds a whole number and can be null.
String is Java's text type. null means no reference/value yet.

The constructor runs when an object is created.
Its name matches the class and it has no return type.
A field belongs to an object; a local variable to a method.
private keeps access inside the declaring class.
public allows access from other classes.

The first two lines only create and change memory data.
repo.save asks persistence to store the new person.
Use the returned entity and its generated id.
Assume id 1 here; real generated ids can differ or have gaps.

PREDICT: stop after setName. Is there a database row? ^mJHSA4BE

NEW OBJECT ^vorldX5p

id = null ^Un0IARgt

SET NAME ^XKD4srUK

name = Ana ^zS4R0iSK

SAVE ^WqsTzTKK

stored row + id ^ZtgKic5z

Creating an object and saving a row are separate steps. ^ulnigw2Z

02 / HOW SPRING BOOT STARTS ^i4WiSsOf

BackendApplication.java ^NTgm7btw

CODE / 02 ^xzCxDD4a

package test.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }
} ^00I1unOm

WHAT EACH PART DOES ^xKeZZVAR

package test.backend names this Java package.
import allows a short type name instead of the full package name.
class declares a type; main is Java's application entry point.
static means main belongs to the class, not an instance.
void means it returns no value; String[] args holds arguments.
BackendApplication.class passes the class itself to Spring.

@SpringBootApplication combines configuration,
auto-configuration and component scanning.
SpringApplication.run starts the application context.
Boot configures a web server and database support using
installed dependencies and application settings.

A BEAN is an object managed by Spring.
Spring discovers our @Service and @RestController classes.
Boot's JPA defaults discover our entity and repository.
Keep lesson files in test.backend or its subpackages.
Spring supplies PersonRepo to the service constructor,
and PersonService to the controller constructor.
That is DEPENDENCY INJECTION: receive what you need.
One constructor normally needs no @Autowired annotation.

Build time: Lombok generates Java methods; javac emits .class.
Runtime: Spring creates/wires beans; Hibernate persists data.
Your build has Web MVC, JPA, PostgreSQL and Lombok. ^Ht78HOa6

03 / ENTITY: OBJECT TO DATABASE ROW ^HUykplx5

Person.java — your existing model ^8UkIUtNe

CODE / 03 ^B79V2MFj

package test.backend;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "Person_Table")
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
} ^CklkPPL6

WHAT EACH PART DOES ^pDHsYd5F

Person is the entity type. A Person object is one instance.
A persisted person's information corresponds to a database row.
@Entity identifies this class as a JPA entity.
@Table maps it to Person_Table; it does not create a database.
@Id marks the primary key: the identity of a stored person.
@GeneratedValue with IDENTITY uses a database identity column
for the id when a new row is inserted.

@Data comes from LOMBOK, not Spring or JPA.
During compilation it generates getId/getName,
setId/setName, toString, equals and hashCode,
and a required-argument constructor.
This class has no required constructor fields, so it gets
an empty-argument constructor suitable for JPA.
Adding constructors or required fields changes that behavior.

Getter = read a field. Setter = change a field.
toString = text form; equals/hashCode = equality/collections.
@Data does not save data, create tables or expose URLs.
With entity relationships, generated equality/toString need care.
CLASS -> table mapping; OBJECT -> row; FIELD -> column.
In memory: id = 1, name = Ana.
In PostgreSQL: a row with id 1 and name Ana.
A naming strategy may turn Person_Table into person_table. ^oJ8n4yhJ

04 / REPOSITORY + REQUEST DTO ^Z1H5Qxgs

Two separate files: PersonRepo.java and PersonInput.java ^W2hU2zLm

CODE / 04 ^pTr4Uzwg

package test.backend;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepo
        extends JpaRepository<Person, Long> {
}

// Separate file: PersonInput.java
package test.backend;

public record PersonInput(String name) {
} ^PA3NsG5Z

WHAT EACH PART DOES ^WaBCAeKS

An INTERFACE describes operations available to callers.
extends inherits another interface's operations.
JpaRepository<Person, Long> supplies type parameters:
Person = managed entity; Long = its primary-key type.
Spring Data supplies a repository implementation at runtime.
Your empty interface inherits operations such as:
save(person) -> saved entity
findAll() -> List<Person>, possibly empty
findById(id) -> Optional<Person>, present or empty
delete(person) -> remove that person
Optional means a result may be absent. List means a collection.
save can persist new entities or merge existing ones;
it does not necessarily execute SQL immediately.
The service chooses which id to update.

PersonInput is a DTO: an object carrying incoming data.
A Java record generates a constructor, accessors,
equals, hashCode and toString for declared components.
Its accessor is name(), not getName().
Input contains name only; the database generates new ids.
On update, the URL id selects the stored person.
This JPA repository interface needs no extra @Repository.
PREDICT: why keep client input separate from Person? ^ZQrzJMuC

05 / SERVICE: READ + CREATE ^UkAx23gS

PersonService.java — part 1 of 2; class continues in section 06 ^6pX3eDWY

CODE / 05 ^LZSvomGM

package test.backend;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class PersonService {
    private final PersonRepo repo;

    public PersonService(PersonRepo repo) {
        this.repo = repo;
    }

    public List<Person> all() {
        return repo.findAll();
    }

    public Person one(Long id) {
        return repo.findById(id).orElseThrow(() ->
            new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Person not found"));
    }

    @Transactional
    public Person create(PersonInput input) {
        Person person = new Person();
        person.setName(checkedName(input.name()));
        return repo.save(person);
    } ^ou7M8vN7

WHAT EACH PART DOES ^Po9mYQVS

@Service registers a discoverable Spring component.
private final PersonRepo repo stores the dependency.
final prevents reassigning the reference after initialization.
Spring supplies repo to the constructor.
this.repo is the field; repo is the constructor parameter.
this.repo = repo stores the supplied dependency.

all() returns repo.findAll().
one(id) asks repo.findById for one person.
orElseThrow returns that person if present.
If absent, the lambda constructs the exception to throw.
() -> ... is a lambda: a small piece of behavior.
ResponseStatusException with NOT_FOUND produces HTTP 404.

create(input) constructs a fresh Person.
input.name() reads the DTO. checkedName validates and trims it.
setName is generated by Lombok for Person.
repo.save persists this entity and returns the saved result.

@Transactional groups work into a transaction.
On success, commit. On failure, roll back according to rules;
runtime exceptions trigger rollback by default.
SQL may be flushed before commit, including the INSERT
needed to obtain an IDENTITY id. Flush is not itself commit.
PREDICT: why should create build a new Person? ^RtIUsNpw

06 / SERVICE: UPDATE + DELETE ^9jEVEPM6

PersonService.java — part 2 of 2; append to section 05 ^C819JyFa

CODE / 06 ^CJmmN7LZ

    @Transactional
    public Person update(Long id, PersonInput input) {
        Person person = one(id);
        person.setName(checkedName(input.name()));
        return repo.save(person);
    }

    @Transactional
    public void delete(Long id) {
        repo.delete(one(id));
    }

    private String checkedName(String name) {
        if (name == null || name.isBlank()) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "Name is required");
        }
        return name.trim();
    }
} ^uHCnSzL1

WHAT EACH PART DOES ^j4WeQa8O

update first loads the EXISTING person using one(id).
A missing person raises HTTP 404.
We change its name and save, keeping the same id.
The input is not treated as an arbitrary stored entity.
Hibernate tracks managed entities inside a transaction.
Dirty checking can write changes at flush/commit;
explicit save here makes our persistence intent visible.

@Transactional groups the find and delete.
repo.delete(one(id)) finds and then removes the person.
void means this service method returns no value.
The controller will choose HTTP 204.

checkedName is a private helper returning a String.
name == null checks whether a value was supplied.
|| means OR with short-circuit evaluation.
When the first check is true, Java skips name.isBlank(),
so it never calls that method on null.
isBlank rejects empty and whitespace-only names.
throw stops normal execution and raises an exception.
BAD_REQUEST produces HTTP 400 for this lesson.
trim removes leading/trailing ordinary whitespace.

A service is a design choice, not a requirement for CRUD.
Here it holds rules while the controller handles HTTP. ^KprooRG8

07 / CONTROLLER: CREATE + READ ^qcjiz0k3

PersonController.java — part 1 of 2; class continues in section 08 ^Nn2DUbUf

CODE / 07 ^3Z0BANKC

package test.backend;

import java.net.URI;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/people")
public class PersonController {
    private final PersonService service;

    public PersonController(PersonService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Person> create(
            @RequestBody PersonInput input) {
        Person saved = service.create(input);
        return ResponseEntity.created(
            URI.create("/people/" + saved.getId())).body(saved);
    }

    @GetMapping
    public List<Person> all() {
        return service.all();
    }

    @GetMapping("/{id}")
    public Person one(@PathVariable("id") Long id) {
        return service.one(id);
    } ^OnHgTCLm

WHAT EACH PART DOES ^Goefpzb9

@RestController registers the HTTP controller.
It includes response-body handling: converters write return
values to the response, typically as JSON in this lesson.
@RequestMapping("/people") sets the shared route prefix.
Spring injects PersonService through the constructor.

@PostMapping matches POST /people.
@RequestBody asks a converter to read JSON into PersonInput.
service.create is an ordinary Java method call.
ResponseEntity<Person> lets code choose status, headers and body.
created(...) chooses 201 and sets the Location header.
URI.create builds an address such as /people/1.
.body(saved) includes the saved Person in the response.

@GetMapping matches GET /people and returns the list.
The normal successful status is 200 OK.
@GetMapping("/{id}") matches paths such as /people/1.
@PathVariable("id") converts that path part into a Long.
service.one(id) returns a Person or raises 404.

The JSON converter exposes this flat entity's id and name
through getters that Lombok generated.
JSON is text on the wire; Person is an object in memory.
Our DTO is for input; this simple lesson returns Person.
Larger APIs often use separate response DTOs too. ^dtHUKETX

08 / CONTROLLER: UPDATE + DELETE ^3QKdFVMs

PersonController.java — part 2 of 2; append to section 07 ^Rzgg7BE8

CODE / 08 ^1JtB3Sa9

    @PutMapping("/{id}")
    public Person update(
            @PathVariable("id") Long id,
            @RequestBody PersonInput input) {
        return service.update(id, input);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable("id") Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
} ^4ZY3LPg9

WHAT EACH PART DOES ^3SvwxXEy

@PutMapping("/{id}") matches PUT /people/1.
@PathVariable reads 1 from the URL path.
@RequestBody reads replacement input from JSON.
The controller passes both values to the service.
A returned Person becomes a 200 JSON response.
PUT supplies all editable fields in this one-name model.
PATCH commonly supports partial changes; not needed here.

@DeleteMapping("/{id}") matches DELETE /people/1.
service.delete(id) performs the deletion.
ResponseEntity<Void> means there is no data value.
noContent().build() chooses HTTP 204 with no body.

This API returns 404 for missing read/update/delete targets.
Those choices come from our code, not annotations alone.
A blank or missing name produces 400 in create/update.
Missing bodies, malformed JSON or invalid numeric ids can
also cause 400 before the service is called.

A browser address bar normally makes a GET request.
Use Postman, curl or a frontend for other methods.
Repeated identical PUTs leave the same resource state.
DELETE also has an idempotent effect; a later call may return
404 even though the first returned 204.
GET should read resources without changing their state. ^xEj5whIQ

09 / DATABASE + BUILD CONFIGURATION ^FagHbsph

application.properties — example settings, not your actual values ^vBgzCR7f

CODE / 09 ^GpTITZUj

spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USER}
spring.datasource.password=${DB_PASSWORD}
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Example DB_URL value:
# jdbc:postgresql://localhost:5432/learning

# Dependencies already in your build.gradle:
# Spring Web MVC: HTTP and JSON conversion
# Spring Data JPA: repositories and ORM integration
# PostgreSQL JDBC driver: database communication
# Lombok compileOnly + annotationProcessor:
# methods generated during Java compilation ^mpumz68g

WHAT EACH PART DOES ^hPeGFYNF

PostgreSQL runs as a separate database server.
The datasource URL selects its host, port and database.
The server, database and access credentials must exist.
The placeholders read configuration values, for example
from environment variables. They are not real credentials.

@Table maps a name; schema-generation settings determine
whether Hibernate creates or changes tables.
ddl-auto=update is one possible local learning setting.
Versioned migrations are the next step for controlled changes.
show-sql prints generated SQL; actual statements may vary.

JPA = the persistence specification.
Hibernate = a JPA implementation doing ORM.
ORM = object/relational mapping.
Spring Data provides convenient repository behavior on top.
JDBC and the PostgreSQL driver communicate with the database.

Use pgAdmin or another SQL client to inspect stored rows.
GET /people accesses data through your API instead.
Committed PostgreSQL rows survive a backend restart.
An in-memory database may disappear when its process stops.

Person object in memory <-> table row in PostgreSQL.
The HTTP JSON body is another representation of that data. ^P2orpXaB

10 / SEND REQUESTS AND SEE RESULTS ^ltFsdhHX

HTTP examples — POST/PUT bodies use Content-Type: application/json ^EBZOVEdx

CODE / 10 ^N2AqT5Tw

POST /people
{"name":"Ana"}
-> 201 Created
Location: /people/1
{"id":1,"name":"Ana"}

GET /people
-> 200 OK
[{"id":1,"name":"Ana"}]

GET /people/1
-> 200 OK
{"id":1,"name":"Ana"}

PUT /people/1
{"name":"Ana Maria"}
-> 200 OK
{"id":1,"name":"Ana Maria"}

DELETE /people/1
-> 204 No Content

GET /people/1
-> 404 Not Found

GET /people
-> 200 OK
[] ^hYltP8LC

WHAT EACH PART DOES ^uzm6bFiW

Assume Ana gets id 1 in an otherwise empty table.
Use the actual returned id in your own requests.
A local URL might be http://localhost:8080/people.
An ENDPOINT is an HTTP method plus a route.
POST /people and GET /people are different endpoints.

CREATE adds a row. READ retrieves rows.
UPDATE changes the selected row. DELETE removes it.
201 = a resource was created.
200 = a successful response, often with data.
204 = success without a response body.
400 = invalid request. 404 = requested resource is absent.

Try POST with {"name":"   "}: expect 400.
Try GET with an unused id: expect 404.
After deletion, GET /people returns 200 and []
when no other people remain; the collection still exists.
Error-body format depends on Spring error configuration;
this lesson promises statuses, not a specific error JSON shape.

The drawing has not installed endpoints in your backend.
Its six teaching Java files were compiled together using
Java 21 compatibility and Lombok annotation processing.
The example was not started against your live database.
Follow the request through all layers before copying any code. ^WkhXWc91

11 / FOLLOW ANA: FOUR REQUESTS, FOUR DATABASE EFFECTS ^8eOXd4xv

Logical SQL is shown for understanding. Hibernate may generate different SQL, use parameters, or reuse managed/cached data. ^enH8OKXt

CREATE / POST ^SAsrnn7M

POST /people
{"name":"Ana"} ^sO6zoShs

service.create -> repo.save ^aIULTt2F

DATABASE WORK ^6sk3uiCc

INSERT INTO person_table (name)
VALUES ('Ana'); ^BGOBVR14

id  |  name
1   |  Ana ^KL1LJ020

201 Created + saved JSON ^iPA9yycC

READ / GET ^FEm9dhZj

GET /people/1 ^yrH4Yhnn

service.one -> repo.findById ^XeaY9X0h

DATABASE WORK ^eFTqTzhI

SELECT id, name FROM person_table
WHERE id = 1; ^fPgs6hTy

id  |  name
1   |  Ana ^iYKRZGrh

200 OK + person JSON ^zPrO0oCX

UPDATE / PUT ^CP4ukEAZ

PUT /people/1
{"name":"Ana Maria"} ^OVd5BHf3

service.update -> repo.save ^Ad0CLa1d

DATABASE WORK ^XTNcY5TO

UPDATE person_table
SET name = 'Ana Maria'
WHERE id = 1; ^pDdzSTnR

id  |  name
1   |  Ana Maria ^ZNIu8VQt

200 OK + updated JSON ^1cZhhpo2

DELETE / DELETE ^J8nVS9Xj

DELETE /people/1 ^F17I9OJf

service.delete -> repo.delete ^vmoH7jzo

DATABASE WORK ^Ylc7UA89

DELETE FROM person_table
WHERE id = 1; ^7KeesBCp

id  |  name
(no row with id 1) ^ZudRADO1

204 No Content ^sjU3gTX1

The id stays the same during update. After deletion, GET /people/1 gives 404; GET /people gives [] if no other people remain. ^R3PBgkm9

12 / FILE MAP + CHECK YOUR UNDERSTANDING ^Mx42mDXq

SIX JAVA FILES / ONE SMALL SYSTEM ^aZ3k1U01

BackendApplication.java -> starts Spring Boot
Person.java -> entity mapping and stored data
PersonRepo.java -> persistence operations
PersonInput.java -> incoming name data
PersonService.java -> rules and CRUD operations
PersonController.java -> HTTP routes and responses

Existing in your project: application, entity, repository.
Proposed for this lesson: input DTO, service, controller.
This drawing changes no backend source files.

Bean = an object managed by Spring.
Entity = a persistent domain object with identity.
DTO = an object carrying data across a boundary.
CRUD = create, read, update, delete.
ORM = mapping objects to relational records.
HTTP = the request/response protocol. JSON = a text data format.

Next exercise: explain POST /people out loud, layer by layer. ^LWevda7D

PREDICT FIRST, THEN CHECK ^v5E3fYeJ

1. Who generates getName and setName?
2. Who supplies PersonService to PersonController?
3. Why can an empty repository interface do useful work?
4. Why does new Person() not guarantee a stored row?
5. Which code turns a missing person into HTTP 404?
6. What happens if name contains only spaces?
7. Why must update keep the existing id?
8. What changes in the database after each request?

Keep these distinctions clear:
Java class / Java object / JSON body / database row.
Build-time Lombok generation / runtime Spring wiring.
A Java method call / an HTTP request / SQL execution.

Learn in order: run one request, predict its result,
inspect the response, then inspect the stored row.
A complete CRUD example connects all of these pieces. ^dXeenddA

OFFICIAL REFERENCES / click a title ^TaMkDWfW

Spring REST tutorial ^nBB3YxHp

Spring Data JPA guide ^iy6yOU8K

Lombok @Data ^X8ng86z5

Spring dependency injection ^PTClHgDa

Spring transactions ^SOdzvK1n

Request mapping annotations ^odm5jwS1

Reading a JSON request body ^PvCvKblH

Spring SQL database configuration ^7dURHWeI

## Element Links
nBB3YxHp: https://spring.io/guides/tutorials/rest/

iy6yOU8K: https://spring.io/guides/gs/accessing-data-jpa/

X8ng86z5: https://projectlombok.org/features/Data

PTClHgDa: https://docs.spring.io/spring-boot/reference/using/spring-beans-and-dependency-injection.html

SOdzvK1n: https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/annotations.html

odm5jwS1: https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-requestmapping.html

PvCvKblH: https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-methods/requestbody.html

7dURHWeI: https://docs.spring.io/spring-boot/reference/data/sql.html

%%
## Drawing
```compressed-json
N4KAkARALgngDgUwgLgAQQQDwMYEMA2AlgCYBOuA7hADTgQBuCpAzoQPYB2KqATLZMzYBXUtiRoIACyhQ4zZAHoFAc0JRJQgEYA6bGwC2CgF7N6hbEcK4OCtptbErHALRY8RMpWdx8Q1TdIEfARcZgRmBShcZQUebR4ADm0ARho6IIR9BA4oZm4AbXAwUDBSiBJuCABBAAVCejYAOQBOADY00shYREqoLCgOssxuAFZkgAZ+MphRkanIChJ1bmbx

pIB2ZpGEgGZ1gBZxnh39nYT5qQRCZWluHbmiyGtlYO5Jx4hmKFI2AGsEADCbHwbFIlQAxMkEIdcAAzQaQTS4bC/ZQ/IQcYhAkFgiTfazMOC4QI5BEQWGEfD4ADKsFeEkEHjJXx+/wA6ktJNxkhcWX8ELSYPT0IyKhd0TcOOE8mgeR82ETsGoZrLxu9OhA0cI4ABJYgy1D5AC64uEmKlzANHCEVN5CAQxG46wmarlGsYLHYXDQfA+hGYABEMn1HWh

YQQwhdNGbiABRYJZHIG40XIRwYi4EPczY8U7rY7JBIJB4aogcX7ca22j4glEO7jh/CRj59TADCTUmoAJR1jQA4qgAEIAeWHABVUACuwBVAOoBSoABiXeHAFlUAApKoANSqk+HAdjqDHw9QAaqY6qg6q1KPK7Z1LJsM4UGphCM4l45w+z5yi9w+iUiqqAlmUrZQFURDKN66DBLCAwXB6UDmAQkHXDB0AKmSeg5LghBSqQeqVja+AXKC1z4QQY79JU

nY9v2Q6jhOU6zvOS4ruuW67vuh7Hqe56Xtet6oPej4XLgQhQGwXbhO+n7fEICAXGWCAABJXDc7aoMk8SgZAHqsJwjScGI3LjM6Iz3OM9wXPhxBYJUuDjE+5BZERaBVqRHzYIEmb1h5JEXJIoTUW2AAy+EVmGEZKR85AUKFWkQGS+C4JoQQ1GwrDIZwxHVhqSJhIuL5vh+eX4EUAC+UwlGUFQSM0kjbsOUAAJr6IOZLdJ+0A0RcwxoFZFzAckEwXI

sxDLLKyQ8K02hqjsPBbAkzQJHmemXNctw+us2gbc8wrqmUfL/NioIQns+zJGMZJIiiWoYliwLnXi5AcISxLZAhP6UjSdI9aKjq8t8/IcpNXKysDrICv9lSA2SEqSBaBpumUCrIsqZlHZAD26vqBQmnFMbI+Vdr+agzpqkciFMIZMG+hq/pBsEWbRU2sUFTG8aZF9yaExqaYZqz2k5nmBZFhtZZRagnnKWwdahqgjbNhq4GVHuyhCCQDqoDUtOcKg

WAAT4CBoL5xCoHBUCoFJqCkFtUDUDbkjZKg+hsIwqDEGwFAcNoqAAFpsAYqD4bbnAIDLQj6OlgQW2E2A5RwqCZinNuEFk2hPiVcncDwDNlL+UD/oB+DARt4FodBlRW2SSEofgVcYVJcDYS+eEEe5Uf5Wj9v+FRNESBrWv2RbessAbRv6CbZshBbVs22wdsO076iu+7nve77/tByHYdLxHUcx0wOsJ0nKfW7g6eZ2SElSTJrBlWgCkc2UKnqQ73K6

TTnpGSZn7JGaLmcYM1DgbTsg5CQuBUgXFhK5BAXdZbeV8sLJBGpgrMEShFcsDYYrikoIlSoKU0oZSymoL0pMPiFQQMVHIpVPyeSqjVP0isIA+SEMQZwVMdhdXgD1QIicDpIH6twVo2MIDAR4GND4E0pqoB2DZD4LtP6yn2PtDgLxPziJOoCZ6uJ0CQmhOMOEt1kSonRJiM6+iIDglwCMYgCRYTwlgb9QUwpPjAjFB8HRYM5EFwECDf4biAaeKBkT

PwSNpTcjIoqTGqpxG4z1HzU0j0SZoFqmBPhdxHjVW8faRWlMFo/zpnnWygZgzk2Vq/REXMEy8wJqmdMflFbJFFnscWxZlKRUoaWeW/xFZVOKV6YyHBTKynWBM/Y6xWitGaM0WymJIHoFwDwFyAEEGKzQWUHyIRUGBSUSFfo2DpZVKYUUDJ5RWHPmpI0EYbJlCNF4T0PEfUPgDVQGtYaedFEalkRDVAzQdjaGaKNLYrR1gJEpoC786CNLbXkeIoRb

wob8isRCKEMJnFULMQ9SxejehvQ+iSb6GoKRUmCXDUJzJAkIF8f81GAToYUoZFSlJkoomQ3lLE2AWMLiJPxmgFM4TzQcu7l5DUYRyaFPGPsIZuUfRlOZggYWgyqG1J5kmBpHxBbNOzEAsWOxCydJrN0gKPdIC1n6bg9mFw1YSABGFHUsZGhjmznQ3OPpZU/hfCXICoxbX9CbjXBA8E65MGQu4INeIsIXBwlEfCTBEH7I1ORfu+BCH2sdc6114lJL

SVkk/G2pBFJdKlB/TSX8eAbQMsM/+3IxGtBGMcdYCz7LvIgLgHhsD4FJvNWwlB5MtmQAwVg01Ss8FxQIYPdAxD0r4EytlChZrxVlGobQ18HqxVnNKBc+q6AARVCEK0CKq4RhPJ6mrERaBPkfEkascanJuRnHmnMto1keDOn2GtL1sKVG8HUZo5F3iaVookOCS610YHYvuhYp6OICUEiJMSp8rjYYsqZCi9kj7OUSppcykUrLwnsstNErlGMeXxL5

eiPGyThXEDSWKsmBSXTjGrbTJdvBFUVIGROzmj1uaJlyFqgWTThatP1e0w1EtS3SyHRAS1lTeNgWnRAVSY4xw1FQAAak3NSYcjzYE50LTwcRRdfVl39S2QNUEMK1x/hG1CNnegxu8u3BNhFNnJt7hRDgA82yVDUxp7Tun9O3zzQ/TdL9S1qThVpHSVa5UcBGWM3gpw1EJCWvMv0iz224H2Gstynm+07N1cuoKhzwpjtVRqeKGaZ3KRIfOshScemr

tCDQozDCSLbuKCwyo7DOFU3aLarJUDSA/CoFe1AYCvk+gSOIv53BDhBVi0BjUSK0DaJA/isDOxNAZdhMN6D5iYygfQPid6SGvoofJWhgjGHgPQzpaUx7/J8MeIezV4QxGUYxPIyNNUVHtRJOE2UWDDG5OSuY0NxLL3GblJZopm1ar+N1M1YK/mZQdVibafmKTxrSxjrkwpnjyONRwDYGHZMjwwCFE6KUbGDOaeY9KHT+ny2adgHGMzx4LPPhRFIF

AQcdl8LKFa5AbIxBheYlF+L/nxIILjZ9i7XARWV0S8xFUJXFAVesOJBNsNv8kt1rQM0NRRwQXrB2K2pZHaz3dvWb29X/bdmDq88OirUBjnWrCD13drCBtcLVOsc9lQBFRA0a8KbaiNqSOkb87D8ifllGURW1RAHDqYd0fBsDGLjFYoKji2DZ2bF2IcU4m7f0hQhM+8dGlz2FWvaCXdj7XivsRIYwyiA6MlQUe0oDj4/LaPt5FSR9JNPoCjfkTkpj

ToWMto+DW+VnG/QI+VUjlWq71WCeH1j0T5NxO5kk0ayWRP3fyb6Rv6pDB2N/1GZ+RtIwn+rHBTb3LR3SU9rV7Ggd3+DmYKOSqxij9z6wkASDCljFXDHABGaHoFDxeX82j02Fm14GTwWET2SEbT2g/SAXuF2FWlOBhRT1W0GkRUjy0SzxL0MUxVMRg1Ox23O0JSu1JBcVu2r0pVr0ZVBgwKz3e3hjZUiTH20j+17wBwSWoxBwxxSVHytHPyhznypi

IP0lv3pi40R1J03xqVRw1SEykO1X3xaVxw6VPxwTKxrEvw0OvztX3X0zHBXDCggK7DdQ3WMx/ULh9QAj9TQArms3QmDVDXswbijXOxcw1DjQ7kTT/xTT7konTRUwBFsPsMcLC3vgLXkmLWv3fhIO0m/kXxUOSwAUWhAVmUhQX0Zhy0chDwd0KzlxKz2T7RHUANMPHTJzBynX8wkFnVIUXWXzkzXU63KhAMZlYQ4FXDClaFhA4AAEU8gRtnlztXkN

R3kpkssNQ70FsMCEg5oQFVoZkzcFERhoUVs/0EsPgNtUAttoYqCIMboowi96Cc9GDENPoWCfo2D3F+Cm9aUeCvi+DCN28ftSMU1uUxCgc0xJDDQ+dwdRVId8kFC1RViygl9VDV8lUVUlMtDMQBN6k9CRMhYD8jD8cTDZNz8ScfcrCVN0Q+hmBgtAhCROAwhZjvV3VjNTMPDS5y4A02xgj5MQ0SUkTw0ginNo1W5Y03NO4ojvM006sIAqTwhaTwgK

d3pwgUj81H50iS0TUy1sj4s2MjcCjuR9hVgdhWhAFro39HIEgCsNlajf85dGjKtmjqs2iEoVMuimseiYI+j2t116FBjShckd1QD0BA9XRnI5iep9cfYyR3l5txFJF5sH1wYltxFU94UyDANNtKCGCbE9sDsP82s6DHoS8LsiVrtWCq8Pj/i68ntE9/F+cmUW9PiATBDfsyNRDeVB8JCBVITpD6MYS5C4S0BCl48BSjc4c6o190TWjMS4w0ddDez9

D8TDCJM8cT8ZM5cyS2ZNCIAKcqcCgac2dOhGcudmd5hadOcOd6dTz6cjRedgYFdpdHANE5dJcnzZczDcMFctcJtddXzNdtc/yxsDdEsDTvCRgJlVg2hwEKioFmhrSncf9XdJSPcADHSTlgCAzmFhj+ti1BsQEoNVYp9ZSEBBFyCYzuBix4y85Rz0DkzBo0DNo09tI1FxJyKsyviqC88TE7iiy8VHibFiBxhNAnEC9C5UN2D0M28azuD6KV9cNGzJ

L7tpLIBEZO8RC4l+9xDgceyhUR9+yhCMkugp8dgZ88kpUXRRpYdG94c0Sr8oxt8cTFy8TSsRZVzjCNzPy34LDyTQKTdeAZoxhplLJETIAIFcsqgEKUKXdXK5MHSvcgD2Yhi6pWFMAnJVJYxWpmBVkIzehFihhKKDgUDjgNpFtVQkgQVAFZpZothDVTjf1mKdgMzM9OKczqD89aCTtiyczSzmD+TIAyVKya8VKGzZK5Eu8dE/jODZTvtWygS0YQTO

yNQh9QdVLiYBy+15DhzLL6zkSJywqpz7KUcsT5zd9IBscCT3KiTPLGNzCFZfKrMOj0BbwuxtwdQARYxnC/TPVDM/xPCLNvCuSIJhTYI+TDcHNG4QbMJRTXNcJ3NEL5QYjfM4inqIAXq3qPrVSItC0ostSYs/1dS/L79uQq1rJFp1gIKLSoFOpqibSvLIA6i3cGjPdvdtzr9as3SGs50F1yFejz9+iWSusqRkqwrWFCAdRWg2RWpqR6AxdcqED+qI

BYyirb08570ZEMCDh5pDjIURgv0MsEhArjjmL6qyhzjLjUU2qbjCLCyur+KXonjLsXjFbBqpqRqfEfiFK3smzqy1qO9RUu8e9NKXQwSaNVqZrUkNrnctqKZLLrc8jxybLJy7LLCHLtCd9w6LqVyj81zpMtSSS+0tyWidzrDZSbR5SdMFQmBMwvQmTSUBifQ2S/qOTLNVZfDq4JA7ME6IaeSW4244aJS5dU1YiZTi1ggaTK7EByAk466zbws0juBc

bCdtSCbcj3R8j/LAEijZkKaYK21HIAQorbTkL7SWbEqdyObUb3SeaWt6aIABaXChaKosLzlgz+0OEg9kh8t5blltcKLpothirEyNa5KrziC/1mqKDWqBLwN9seBDtOrcU4MHboAmDnbK83awkvasM5L6zJqfbpq1KA6NK+8Q6uydKzqI6ZC5cY6Ry3DlDE75Lk7uMHq+MTqdDKGs69Uc6PL87NyfK2aLg9z0dDRDzOcTzudbzzyjzSgwHjyedOg+

cvhHyRcXy763zVGxc77lHBcfzlc55/ziA9GdcDHgLoyiaUsTMqqIVZou9wrHIAwj677Gbor4rWbi6EARbLlcKP7XR7cWxiLw8kUptQFY8aKNi5KDjjb4Uv6M8oHsHs8UH2qeLjskGqDsAdhwwEArSKzMHqVazcHeCCGRqiGhDA7FrKNyHwTdKoT1rDKJ9upslOhAzjohzY6/HrKmGDqU7WGt906nK9K99lzuGDV1y+G76i7nSGG6YwLps1FWg9hG

1QryhYLllPraaEawi7S763Hz7PGX6gycKJBox1gABpAADQPS7QCfmN6kQLeRJtmWKsYrKu0nBWBQppf3aXMmsmia0iarYszIuOzJge4rEsRHuO6oEt6vQdyeKawZkpwfGqKaUtbwRb9sBJwwWv+yWrKBWtxLBzqdkM2raZHNaE6frKZhYcEeOrnI4czoMJGePzzuXoLud0mYxLuaSi7FjBqGHGpB1BPC7Fai+s3VzF+uLn+s5MeuBr8M7rBsCMjS

hr7rFIHsiKHqRr825d5f5cFeHGFaxoXufgyOi3LRibXrHJmf8sNStyfytypuWUXCcduq2ZPp2bPqdM5cvqSmvuaw429KKgbq3QOd6yOfQEkGYB1FUgBCEFjH0HgIWPuaWMeeWfWKTPGq2G0D2FWibSWiNKkSLD+bzjibW0RcSesXAwOEg0QeLx6rQeQzhdRebLLYb2EN+PhYRlmvUvbODoH2Wu7MoehKENhIstdDKMtY40pcOtTtpexJEcGfOsZf

GSurGdZf4fuppbbtRuYFwE9gXApExDYnskR1FdZIlfM2la3dlY7tBoCO7qFLlZCJhrCPFPVbvuHuRplJ3b3aVjsiPYqUNfVMXpNbxrNbiwtemdrWJuHKbQWirWWfsagT7GdbkxcdPrQoSs9ZnNlPaJ9a5u6N5q9P5p9KDcYRDf9x8fwsLATY7T/pCcOOormwibkTkaYvTMBZaoSeuLgYQd4rtuQesRhYbbeKGo4PdvrzrJRarMIa7eIZ7dIb7bxY

HfDqHeJejtJcsqUJv0YanZ6c3b6fYYzoJcXeGeXZ4euvGZde8o3Y8aEcp3nbEevIkbPMc/Z2c9vPvOAxUZlzUas41yl00ZoYF0V1/NMb84wAAtC9V0cjo4Tqteg/7wUSkSatYuy33qgVUhQ/PzQ/dYw/cdOXI7ftDJ2Jo6CfIpCdaFY7j2Y/+SiaUR1NS/W3YuBegaSbBZrYeKSYyayZyZE7yaz1bbwbww7YEO7eBJxcqf7YoZU6Je4CMsn3mNMu

adn22tdGWb2qTu6epds9ndOoZdM7cvM9XbfjP0LoEZ2/Xv1M3vGBmUbUOFOAdY7R1Cy+K22fC92aw990K7DYgGIDgCEGEuaEIDEhuYvXysgHeUwMq+edKowP2DmltcBWSB2DaC/UIKLdII4/ibLa4qMRScLz4oE4QyduE9JQkuk/E4KeRfbabd9ojsxbbfG47Mm6U+m+M6oYMrU5W/aaOHEQ266fKGnd6dnLnYXIXYgC4bM9GZZZO+aOJ3O6ma5Y

Cx1EHFjC7EaAvHWeZMfrznofJHZK8JAiBp5K7su57uVdCO2VfY8w1Z8y1eV9V/V818A8ixA+XvxuYsJri6g5SzOEBUbRMz3tt1wA3Be+dxy/e49Ywuw+9aIXw49MI7lwfu+uDbABaYo4kHGGnH0EwHOYACtYRQ+f6leKvofVafR1aE85LRpxgs2UegE1RTgzdLIu80ytJTanhmuLbToraq3bjUna3oX63yy+uRuvjW2JrhvaeZP/aymSHQSqmw72

fVOaGNO1QpEKW1D18Z22G6WjPnKhnXLD9peCdZe2W5YbPFfS6Nwag9xnAAA+VAakKYsKU9z8Ezc9qV1u5TbkqG03sc83o+2hr9140g9d9pqxRpJQb+d/R/s/1f65pUiQHY1pqXd5gdK0epeLpY3WDjBcC8HR7rgFOZh8kKsVc/B92j4X1cOcfGsI1hvr+tiOgbQWv6TT7YUUqlHIPPnBo5RlJsDzWUDmyAY1cUyGPFrk1yBbd9y2F0HjgWQhaE8S

yw/V4mT3eLDV0Wo1JFv8iG6KUKeyg0pm2SZ69ttK1TQdrN20Zr8jgu1FQvtUF56cLuBnPfgMz5yS9DuJ/YkuuytT6dIAwjMXq52PLnkbyijaRpeXc6KNPOX5QXO+V85yYNGPnLRuFx0Yhd9G0XdRpF3iF65Yul3TAQAmwGQojgQVfAfAJ/Bf5j6JA5mnlz2ZeM9079fCscFK6kUI8gGKbCZkYrVd02tXRim30NIlsOKXHNqu1z45pM2qmgeBjwE0

CaAMGY/BJoNyk5KDO2s/HQdi2Z5aVQ6EJcXiv3Hz04Fun4JbiGwEAmDjgm/VEtt0V7Rh+m87ewUu0cHMtT+FqU7uywV6ctkSszfOPmDUR458Bq4IgcgjdaR8Shn3fZswNfo/d6ApzPPouB2AcBzmwwYvpeh4G8BWMqbb5LD2r6zIUgr6EzHdyWitBC29XP9ACzOJd8QWbXPHuC3vqQt7agnOQS7XJ5TCBuntMtv1yIxzUsWkAIOgp30FL8D+ftah

sYNHZHA9e/PXTgcM5ZHDDOdgxpAd2P4XDnBEzW4dh1Lp8tqQY4PsDyzgFv9den/FuoDRlYm8FW97JVkAJVaw1QBb7cLh+3t4SA5RCopUS/xd4403esvD3uaw77ad0hdwQsCZjNwIdVmHaAzPkMdzRUI+cVKPsLxw6ukr68fWgXzT7TJ9N0ZHP4Yc1YESAAAjvsE0CDh6AzAGADTVB55Uk2BVRuocWKqV8ygrzUaLtGfxAIZolXSrt+iEGOjza+Ii

ttbQ65QsUGQnEfgoNE5SVlBHtavpMLE5aDZOc/eTgvym4GCZukdYdoOW5GOi+RW/acjuSFG2CThooo/oSWO5XC5epJaUSXRUxfBQQOsCbLPQGpBsP+2vC9t/y6Dt1bM2os3g+xvbADVWhom3uALt6QC4YUkOOHbB9iHiO089JAUWhQF2i0BsoCDk6J96fgIKGWEzMWA9Hpdlkw4d4a6yKHO4yBQY2Pp0TDF+sIxzuKMYWhjHp8iueFdgVIPWExcQ

K0I4BIx3kSXCIArzY4KxzaGdCzaeI1rg2MkFNjSRxPMsvIPEqKC+x+TMamoN7ESAMwzAF2P2JmHzUmRFTBYYvyWG1NxxXPcytDiODktvey+fkeoSDELjRenDM4eKNzrUSpYLgo6uTns6eD6cMjLnD4MkZ+CvBpQZwHRMCGlA7ytkkIULkC6JCAuUQoLt+UAphcIhSQkxgkN/pkS0hYEpbHrVGitIFE+AmoAhO2RvcAx3w8gb8Pwk/cAQRgZoElgB

B9gteRFW5lCOTZoAMRlEq6AIOHKG1tACzLYLNBNLOhdaNYjocIJx7dDCR7Eonq9GeKk8eJHY5Sl2Ik49iaemg6YQz3KYTcZJI4tkcsKMExCdh47SDupNnEmSbBOk/biuJXYy91x5/O6q4OsEXjUaD8JUmECLS7sggNJO6L8GdiIxnYkcVKDAFpgABuG6agDjQ/AqQTAVABQHtjUlnpG4PTI0FQDRhiAMALOBKxT4nj66zdQ3j4V/5AD/+DDQAXeP

1Evs1WT440RAJlKHSGSkcfEIwCbCAyzEV02as9LumPTnpr04EMEFICfTvp8pNeCFgBlAyQZ1ojUpkQTRASci04jeglwmCmktiVFeaSs1gkdopi8UhmolNIGBi3BwYmUr609JJ8SOjA5dGUNYRGApiY4M3DUBGDCIsxCtf+hNOmBLYxEzQkmnrTr6VVkeiQI2liJNpNSxB1xPvjbWkH8dZBXUtsT1LpHjCaRXBZvNPxKYDjZhUk8aWQ0mlyS+yEOS

ccpMSB7DbKAo7DtpL27s8HB+k3hmuylGX9OWpdQLJph8hZRGS5MogF9AUAXTJcgMmMMSBBmoAdQ70bWM9JLmHs14x0z6JuF3ZXwsg6gNgBbHcBNh/YG4AMIOABAvT9chAeUnAMXi6wsoUANEAKBf6gzte4MpupK3VFG9NRf/a8QANvHNxLeDNa3psylIj0VM2cl6T8EtB0yXYL0wuTkGLlmJS5C4iuf7GrkOAcZ58+uRbEbmRxm5G4VuW7GVSSBO

5Q8qkMwF7n9zB5eAcbCPJpJjzbYC6KeYEDgFzz1sv413gBPXH2jwOXMq7jzMNRGkoKMUtLsHycIbM/REs4oaOh+H4IQxeHagdzUwlEdIxisnXsrO+7xiQyhE9fvBWL5lc6h0I42eXxAiOjaJJwVMjqSfxY9S2Ps8Qbnjam9DB+STUSntiJGu0xhLbSTkNKpH0ixucwvQYsJqbhzRU83RpoNDMoSodh63cwZt0sFxz5xjlJcUuXWlHdNp8ma4Rf12

mK97h/lMRCMCWZ4D8FuWEHp/l9GFD6iyEqWR4xVmVBfghAAMPgCbTTh8ANHQqbmIBSUS9aCIuRHsF2ivpDaGI5vnVQ2gMSEUYixiRItx40EZFnXMkW7O4kDVKRfE6kYNISaezCWEkxkd3mkkhzWeo45fjNJHbKScRYUxafsM0nSyE59LJOXpNXGOKjJ6c1xZnMPnDg2QfEESLGCqBzgxwqkHUNSDPBdgqgbIXsMhzBlis9eZmL/hqKvZai72N43U

UjO3lsJd50VE0a+IkCqQFlSynlqsuPAbKtlAYHZXsv7AszgOKCpxSvU94gT3FCXKCYaigqNp8BOaH0TUWcYkKQlyU1CZQPQnUKCOt9cLjhKfrhKJAbIegJIAUSNBmAIwyEeDyVorAUl1E4sQoh0iNoVo9wPWhiIppCDWVuI0QfWIuiOz2prsknu7JqW8TOx/E1QZJJUEww/Z4k0afP1xY4xlO3ShSav25GGoY5zDYZXtPvo2KxepwsUZMsMnOKdp

y0/aUlBARcJ9gaAL+fQCvg6ZqQcAe2BoiVjlyZ6qAF1agAAA+rqi4iMC4QJAwwJEVAGEFIBmAxAwWCme9Opl6B7Inqj1a6pwHOAJgaAHCBSE1jT0vQCpBMYpC+DMAAAOhwFGhoAKAmYbAJIFQBVBfMbsD2M/OukEB8AjqkQKgCrqpqGS0az1TNDDCUhI4+gXAHACdgvA85FclOIeztXIgI0CAXNTJAIAtyrVAamALhEwChwaSdq8IEwEYDEB/YNQ

BXDSTYCwhnpO7LIL+2CAvSXw+ERSKHGTj0ypQbYANTUK9D+xYwaVaeOPRTiBAbYIQYtaLiPX2QnYHANgNbHwjKN3pFsSXB4KAUqjG6ao6GcbzXmXKN51yrec+yt6oy95TIjGSplNUyoLV38m1Xao/XPhHoNdZta6pjUurWMPqv1VSGvVBrzAkcHTGGqpmfrI4RGz1XGoTVHqOAyakQARuTg6ZAgGa8ILkFzX5rPpRaktWWrbmVqiZESFOBRrw3Uz

G1XGmkkxtdVtqD1na7tb2pBCWgB11gC2MOsTjUbx1IQWtZaqvjpi51C61AEusDWrr11m6htTuvpl7rI4ZKSOHGhPWRx8Iz0y9dbDPi3rUA9642E+ubl9BkQkgD9ZGqUgyxf1Z6gDcECA2YgQNCCueogOQVsyQVDojAeFPGQrQq0KPc0r4scjTgxZMVYJeVhRXSy0J9WDFQnyxUBsOsSs1PmlJYUQAA4FAZoLCH0A6hNActXWYm0VrvJeFaxJ0CMH

KkgRtg80UaGtDWANDrZDVeFIxTrEsT0U0igfhUs4l9VRhkqkVd8QaW0jlFGLBkYzy0UsidFhgxVVyL6VmCdOS0nfitMTnsiJeEyjafqo3FncM5MotDckDYhcQqgaAB1DeFvBbLVeCRVcEeGHCDgNwsYAEGOH8XuEGt0c08acpXnnLoNiteuHBucwIad5SGh5ahtRogJvtO4X7ZODCgA7YwQOqHWuDB0Q6odMOgFcgLS1oL0BFjABBBL2AQUQE+A7

cMVv9GSzytGqyrclAwnyy76OKpgU1tFqVBmgpARoHAGHCEBGgz3clTmIh6iJKJmwLTq8yZXAo5ku9aCezsalFLmpJS3vldH74E8XZdbKpRSKFV9TttE/ISXbtG5yddBJ22SborowRySWyq+OgMpRKxz1VhwrVbpN1XPbJR4XDlh9tRoBbH1kcZRn0B3wxba5bc3+Z3LA0wiINANZHT/2vZXiYNCMzeZjpAERE0ZcmR5TKRj0mwA1UQBPbzCT1RqU

9Hc5QXfDVKpbTWOpMFdzJSzI8v0hxIBB+nwFsgedSKsrWQpSkULZZwuxPqLoYUp88JLAyXRIGK4nBqhZFbhUVNQCDbDZ16EbSbOmj9LwGzFA4JA3EXirSlHVcpc2IrZl5HEii2pcKvqV+JHdaLEaYdrGnzCOlcqtnqIzWHj1BALgVIMEOaWcjUABikysYtabKreR5izfapID3b8tJwetaTjgkxFgJkewX3Wf2Mm3aFpxuBLldEBT3AlodjT0bgHO

bD7PhSUsfeSTxWsLfG1kfxvlP4Q1Dgm0IwKpRKop77tI10YRX+mP1G77ZrUspatqv0QhRKolTbcNMf2CS1FdSjRS7uO3DjOlU0ifH/s4DxqIAQBjkZzzm4NNwDy3JSfCUYr88ZkN2xA8cO1XLiUDR+NA1bntaWd5e72ncuCu73YCZURpeHiQeFm4ARWRCoJUzWRXUG2atB6oNgGIBsgQQmAJXb1pL7QjCxkAYCA1JAbjUbuVU19GMFaSFh2Vc29v

nbK5VSLhDFuvoUP2t2SH1FXs3bRIqaUHbNFQcj/Ypy/1dKf9pYaUOocAOuTgDOhi7UYbgMTtl8phoZQgZGVIHxloemw6UQwM3VHDsyqPUlASK8QFwICdPRDLh1LzINq8uGevIL0Y6RSxe+GrjpfEyl5jR4RY07J/EpabRQKrIqvQwXOjZQH6Q4mcHMhB9csAcCg0hNH1NFx9k6ShVQNLA0DaFCshgYwsa0L7vGEgRoJ2A3BCBVwqkIkYYr636z4j

EiFYAIsTwmltiEE9heiKSM5Gn0pYgQ/kYMSNjL9HEzqfyuqXkh79Tu8ft7PFXVH6eb+mVSz0aMqHf9rRgA5oY6PaGvd6nZVYLJMO9GtugewUSMYe3Jy2kthyYw4c3FOGKSqNceP/ss36xk4AAXhlgIAKAusFUwAAoAAlA9NzVT1/92gMIFAEaDrIdT2a6oL5mtMGnc1ipg2N+x1jqnAgFOU06dJ1PGnOA9pjgGFE4DKBQ4FsdU86bXXKBlUeofU4

aY4C0h7VgZ3zPupDOnSwzyqC01kCjPLH6yJy5eTDNz3+E0dgpHY0+z2NgD0ZhxlTI6eTjem1TGprU5WajNGmVTpp1M5aetNia7T0ZyswGuTOoBXTCAd086a9MqnfT/ph1SQF7PdmbN4ZqAJGd9OxmP1CZyOEmanMtn0zBp+nf+MZ0cyvefu2Zs0ApqbATS1ExDsslwDvHSt/+IIwLrRVVb/jNCkXditn3RjuszCxfegFIC/A8+yQXAF2CMDYAElF

KyHokA4PZGixdZKZFmw10G1Zth++FLWOYldDQWK2oo7IsqUUmbdvUl/dIbFX4Mttzuwca7qUOsmlhqhjkxoa0Mc9eT3PQpGcE6YDH4Dc46/KMv37i8JTqBiY/YbTkR6tx8ppKGyFUgXh/NVQAEKpF1hVAuwE4AMMOHJ3LHF5Z4s5TnouUFnBche3Yw+JL3Ibu8eOviwJYnArKRLYliS2eGkuw6ngSCy41uY723GstIsCFCWNYxeHg+ZK+FXTXC68

7SFXx1Fb8fRV3nMVdA+hcCbn0vnYxobZrfoA3CqRqQVQfYKrwAsq7KV9x4BkNtNxom5KjxqqYAhG0Yj7ggKUC8OmyJiIT9xSs/aburakmOpjtLiRhYZPdjqejS/bYydqNtLg5DRzUPKuaNvwyL7R5yXoonHe6+lZixhvRbVVDGNVzFkUXYusOEEOLmBradgaDGl1/t1ILZeqavj2RmAPkQgHAHPjbqvYmYK+DpsBkIBgoZgUENoAdMqmvY4QTa+l

BpLWAgzg6i2FfEXPnWOA4OyHdDonOHx/1EeENbtfUCpxsAqUS0Gep/nuxSAIM3NVKDrO6m9TbGlkEIETh3WlYdJEtXYDz41DXru4HsFeAgITnnr6yXTalBDV/z8Az5QM1fCtW+BI4oIO2CGhPj35Xr1Zum7CFpjjyAb1sdGzUKelqAaS3UCzZWdeug71lB4fG8nHk3nxu5OsRYOoGfWawd8r1s02mYQBWmbTuAO0y9OCgaIz5NNzQBjcTgAByGko

ud/ZBA11uawIFABEDJwwgmIZG3SRtDWwLp7N8+VLdICvXRzgZ0m/qDTg65gQkca0MfGpmHW8AycdKGKlevzmxzNJEzUbdfVXruo/sTyD/IJBRaWbDNsQAoCpunr7pUAV67mrHCu2GSCkROLTeLTvRPpLsZOPda5uJwLNLjV6zqFyAyx1kbsETTrYvmhA7rh7NQKgAwRp3Lb1tm2Hwlet7gKQZto6yCA0R82l4NdvW9zbTi1hJ1Vq+2GlEPW2xG9f

882xwBw1Wq+gqAf4P2buvYAxAIN/9bXPpn2QgbxIcLcDaAVGmtARAbANJpBAUBj7p9mknAhDi/qXYEau++EHzscBC7zmwgCwGthQAKAS8FSFuo4Blxj5ruR65reeCdrMgoIGAHtaiCvW3TbAD057FCC/BF17GL4NkBDW2xdxL6i9ZqeVMTw/Yua6cMdPpmD3SAUoeLchFgCIPebqAcMwRGaRBnR7loaOB5othfbf7CAJ6b5FrXcPq6IYIMzSVDte

xCATiD6bTZOuRxlA3a++xwAdM8sAw71McGgF3FwAU48ED6UrfWQPy+bojtOELDSjtZPxFAAAPyyXM9l7RS6jvBqqXiz6l/Y7b2lLxFSdy1/G1dY2v2xtraa3azY8QfpQTr7Ad2xdZofBObr8pe6+OcOsE3M4ua967Tq+tSgYtv1mmw5uCjWxr7Z95OFkHBuQ2OA0N7UzQ/1Pw2S7zdq+HAnCBo357icLG+JZ1C42jwq1lu1kCJvIhI43tj9ZTYIC

nqy79NkkGICZuXXAgrNlgC7dTi12oAPN5u/zf9A1OTTua4Wy8rnCrXxbU9LjQAri2fS1AJa4kPLd5iK3VzKtts7aYgBw3i1yDyx7rf1tQA47Jt8e2TawfKoh7ttn21fAdv4AnbhM22PTLdse2Azfd4EAC8rv+2j4scRB/I/DueRI73wD9Rs9jt83+gw9xAEnf9VZBU7P69O1M4QBZ2xnkcXO4A+Af1Pi0pd6meXZpImNq74ttp3+rke/5G7zdk21

2qgDFqO7JT7uxbF7v93iXTD89SPdzVj2R5ZNyewGZnuDqG1bLp6VfCXu1qV7VgTQOvdns/ym9TN+2HvcjiH25AKcE+9KHr3PzI4V91KHGc7uWgmbj98wC/a/GmuP7KN7+2vD/td2AHuagu+fIpBgObYkDy2AmhgdwPGaSLrW+GbBtoOMHuAH5wOdOkpxmABD6h6wGIf35x55Dy17WbTecBXr9DnN+K51hfRlQHD5u1I+no6wSA/D5gII4esiOT44

jozVw+yDSPq3Pt+R44CUdybqZqjrhxo8AfdhYwuj6HQY5bjGO+g1Msx5nCrkvOX1a1/a9QnsdOOEBreiy+3puOZa78KWLYq0irR2t8B/5vw4isoN86rzivQXXLOn2PnArz54Wq+fBN0H8KhwVfbUKjxxHKJo0A/XRXSW0U2OcWFY5305VLaCjF+kQ2SYMTiGK8jbKQ7ScKayGH98hgi4odlVtXv90087aAb0OLcID2w7kaxxnGDHGLadYUbYpcpT

WJRUx2UzMecNd6AE+5x/FsBwH4DlBcCQJae4+OXnPLwRx9+UIaCkAyb5zEYFjpIl6yQmawFAqNF33JH6U9wbQDguhSo81oBum2XBbyOgeDEPQiDxVdQalHYP5RlRZUfpMNXtBYq5kURfQ9NHMPIB3pfCSuiqrhTo1oPRYZD32KnB1Ht7bR94uVBGgsYRZVk+h3OPEdOZqDZsfz3adEZ8Gks0aLL3aXfP/n1AIF7hWIKLjrMzd6Cuss7v3+LoVJYc

ReOOQdZAShFW5ZH3cf0KXlyfdVvDF0LsJT53CcFYl1PuIA04DgOMC6ddhlAitBE7EY30TAtOI0QBEKZomJ53mICFHvD0shFE6qNYuIBp8QtJMSTOnvlVVbKNyGKjdVvbXheQ+Bzmr9R1kWHM91R1qLLofYFdpKQWKqWIp+OWKdYtPaHFL27ab0jlNA1Kg459U55HT2FgXH54rlkpY8dFn7xBojSwcb8eo13vYqDc0vUAlWXt3eB7vXMkOKfNHRJ5

jtIooKGceLz6CUJZe5vNC7qvgJmfXe4a8PuQrGfZ90HlOCcDUhSSmbHwtBSjaEdeJ4q4toW+sT8yvKq3ehbW9IeNvMh+q9t5bJNWLPaH/Fg9pWGzSCPs10CYMoYtGrNVrn5A5dQe/h7pj8vkDQeQsniNrJLnLX9eSZ/04bJzkii7ELCHRCApXk8mz5N0Z+TgpFv4xkBRCnmM1J8Pz8KsEULXQCvUCHrcV9cuocyv2P/nQVzJ8ET6D+wb+jEa4Ufu

N94fr98j1G2GpeDnvIDx2gQstSkLhR22sUbkXQeefNJvnxYNwtwehfChuo9ovd1naQDYB3DwYZMUEfoD124j/L/GvkfD+lHgyar5o/y+XDD+OZObmgr4CuQJ70r2e48sVfePIfn7uc1OYBh9gzAUgNOEIHK7+tEUgb9yB4NcGJgIwbQFbkR/7nMCmwDEVpwKXwWQPbP5bZn+dnZ+0Lq3gz+t6M+beqjpngOeZ/aWtWxfNnro5L+UmNc+j/ukayR6

7cYyuKb3eHnjKZee8vqXS3gE4Bryg6wXpDJrGWermb/eirI5h6ityuEQ+Oz4mD5JQ0AagCwBeUslrru6XqByw+LOhFJtArSEsz4ChAOeYBGnxuP7Xm3lreZvwAJg+Z1avpPe7P0k/s1pGA1IPsBdg4wMDxL+MRokqq6aAOlhSeQ3lwb7mO/vXzh+6WMHiG0s3ntCEmmnrmQ8q5Vit4bad/rz4P+9KM/rNsNRqX57e5fqHIe6+lFRaGGq3DKjDeRH

nL44GCvmR6WGk1sr5gBXFmr6OBpdCbbqmYml95ac2ZusYo64XspZReRet46lmcXuWao0PgaWq+YUPraKoK25p3qYKKWE/gyoI2hMCOWuWHnx0BrjDj5esePte61a9AvVogm8+v8LNaxXFMjU+oUkkq70Ugcia0Sx/tkRFWxuiVYwMeZPAzESF0tf7rasLKPyC++gYX5T8xfs0rSqQ4qL7tWn/lYF1+P/gKYwGGks56imivqMbueVHuAE3CL3h8Aa

+gqHZJWS4jLr6dAlkgb7yMHnNyby4oQh5LhckQlb7aMwXA77+S5+JLiPBwUrRx1BuBg8ITAIKItCGoXvssgVgw/v76j+gRjx5hKfHgHhsKMqL1xMGYeCwblc0IpsBx+P7iN6RM/7gUozQbQYIYZ+4HihZraYGNB536tulhbweT+oh75+4wUyaTBLJlZ5TS8klX44eGwnh6fAJgl+iOelitd7WKqwSAFjG7gVgYzK3fvR55wRwKChLQygQVpQI8Sk

CHZcAfingFBSVBCGVAbIAmKYIRgGOCnMIgbCHie0IvNhr+00DJ5V8ciGMDAo9fM6C4E0Fo6In+83un4Eil/sSIyCXPrf6DBYwRIoO65ISSEl+KHmX5u65gZX5f+dnjYFGk7IVd7LBN3tyF3evIRsEeBXfl4EqYUVtuCEBR4vDpyWSOsgHuOqAZDToBonpgGRB5+OXpxhO4ImHnGxAYCqWWW7uQHeES0IkBzI+WuUTeG8bNKGvcIIQwGYc3xjVhFB

U+iUEBWZQUFak+TXuUIBwU8qczmAIwEYBxWK/teiSe9PtIGyeT6Nv6mkgCOZDLQBBLRZqe7fHN5qB5/rtiaBy3o6E6BzoYZ6uhdJkX6HhjViYEi+NIR/70h/oZHLwkBoX/4WCIYYAG78q0msHt+qcvyHcW2wVexvie4hbATYwWCNRFwKfN94heQQW44hBAPmgE3K2Yfcq+OB8tuzvi+4j7CARzeuZYkBqAmQEu+szMfpNo4KCx4ShyyFwCNh4fLK

GoUF7oUHMB+Pr5Y1a/lnV7E+uKoqESANoBwDXAFADwBvGy/vrKf6KJvcZNBieHrRJAppGCgQoUKKuHM+/6JuE2hDYjuF4hohuSZOh7YjVYDSj/iZ5DBxgV6GmBPocoaHelgcd7WBPPGMDBhQvMMbhhOqusEd+nnlsHeer3vagoIIzqy5vOiDt+wjO9js+px6/ZsSB+Q1ekfZJaSYSCYp+gQUgFhed4vDKRenjkD4oyj4ppb5hqNACD2RDqnPZORh

1i5GJRbkc3JhASGN5HEOcgH5HFh2NBhEw+5YdhHXcffkaTiY+AmwB5B6HBREx8HYQT7sBpQZwEk+3Af2Fi0+wByDUgzAMODwmxFGIEJWm+l+4lSXBl+iZKH6MWCVcaiHkpCCC2mn4m6OIfjxZ+qFv0HdSgqphZGB4qm6EC+LoWeGaRF4QbLEWFgZ0azBkBspJNoxkVYIuezgW57vhFnNGEQBsYfjo8AbEC8qLKdEPsqMQ44E/yXgElqZb688OgEE

G8wURsahRWxuFGA+yMohrRRoPghEmqz0QuCvRT/N2AfRI4F9Hyi4lnTpruBUaWEZeGWhWEUwKxLNC96+AqJ7seJXsCFcegfrVEUCVEcUF0RdxAxHi6YJuUIuoygPoDrAmgBA7jh+slvoJG2YKcGohfiE1S6Q+5pQFneEEjNCG6HKpxzSR3KmbpnGvQctEKR+4UpENWtVgYHuhG0WZ6tK+0TxFXhvVopJzBd4dL72BAAc363e5kbdFriwKk97WcNk

TKyVAg4DfKa4cAD4AoQScNoB58rcvAGrG8ltnrGqKATqLQR0XhEGxeeYfF4SATsXWAuxbsXgAexXsVaoJBVxuzJYRu5pvSG0rSCNqrAgsqj64ACYtVG5c1MezT1RNETV5AmPYVwEhGxXHrRvurBhvq8xvESLBJWYFtXzx+bKjCrSx2PPNG2huIUtH4hBiEJQiUMHgeH3+R4Qh7bRp4drFHa3oZZ4f+pFpaDqGqyBRYS+1fkyG1+p0XeEN+F3gLxP

h5sWZFWGbgVGGfhngUGI9+VKijxZWv/mFSkGYICRHECWPnKFB+mFDwFvmFQkHhP4tcQiF9epNFJ4Qoo2tJ5J+8KMFRSR3cRWzaeckZB42IhIXn4ehwwRYonho8btG7euse/7TB88f/oOSXJj1ZHe9TGsIImmwiFb4eZ0XD6PhJkWNYWxB8dnR8hc1gKGOBZ8Y3SJAGWFMgqqhER2jfiZMX74yhzYeV6thNBkxHoAmAEYAAgmAAGCz+Z5lxFTYyJi

NDzYaSvSgzQKQH3oQSxYAcBSIyzFaEgJHQT3GLRV/krGVWKsR7JqxKkRrETxiCVPHv6ZgTpG6U6CYvFYJYANeEnRRCXeF2BiwWYamR10Ur5UJR8TQlfh9sT+H2oB4CcYXEOVPPJisKYaF4gxeeqEERRkMdjrQx8EZ+zxEASWxBHAScWWGZecPrMytIICEiH3AOcaQYu0GPiP6Uxj8UXET6nNA1E3uHAaRyNezMawhqgOoMkAYgw4A2GiBgFlSpSe

xYLIlOgV0NoD4E+YAf5tAuJrBb/MRwKoGdxp+jogOy8sZz4lG3ProEUhY8apEIJegRpHIJb/gd5WJ7JgvEuAS8RcES+AYYZELBjfg4HmG7iW+GHxlkZsEuKkASpiKgvwNEA4y/GtoCvy0ZrmoZwFOILgNqpAMoCmmOGhogcJkDh+bPJwcHna2qcZlUCuxT9lxrRm7yaCCc23yb8lxmAKaCC/AwKb+raALekmrXAIgAgDaAYKaLiDgIKRCmxx0Kb6

4cAAAAL4pGiISm/qxKVClJwD9lq5OugrkODOxRjJCnuxaasAC5qnqv9xMpz9vHpOuDQOOZdq+EDqZR2ygMaBy2zAHDbcpycJ6quqVKcoB0pnKfm7l2OplHH/AMcfSm3qgrk7AXOMqdGaeqlULmqVQmZj94KWAcemFBxmYTBExepeuHHRBSUHckPJr6l8DPJbKa8msR08HClfJPyYSBIp8CICmop0YOilKpKqXHFegMKT6mfJoIP6l/JygMilApoa

XnaYpnABxqBAeKQmk0pEEBymRpnAF6mUp2aUSl5pXGoylP2drjSSapLwaWnnwcqbymOuAqTXpCplOBbCipHAOKnouGiFKkGpsqTykKpLquGm1pt6uqnVp2qaql+weqdKm+mxqaampJuMegoZJm9BBR2WzfNkGOQQgAXFfCpST8ZVepcYT63uFcS1EhGmAKcwIAAcAHDY23MSEzAWHSaxhcGuYLtDZsRYFbKWh2RKf4yxoCRf69xOif3F6ecySPEr

Jm0ceGjBk8S/46x6yadqa+LRtsmYJy8T0q3hNgdsAXRVikxYUJrgZ4mXJ90dZE3JqNPxaCW+lqJa38RllJYyWhymexgRwMcEGgxEXujrBx4QcD5YBZZjgFKhulkJYGWxGZJYmW86aQHFRacRCrgo3ipZD4CcBHfEfCxSeRFghuPrTGdh9MdiiMxTCi/HNeqkFAAQoLyrgDESPXv1FAWzcXzGygnSVwaVc2/jlbCRX9Ddxvpf6K0AfpXcZokyR0yV

oF7hAwarHqRwGcZ7LJCyUgmv+LVhsnU4WyRgm7J2CXpF9WfJmdGDW28UsHPhd2sAERhFkR+HeJJ8dLKl0LqdG7Ukedq/J9OZ8pi7fyyWbilvJMaZfBUgLrqZp/ynyfzYm2P1nPD2az0rCD+qOWRlmvWLKda6fQyNt1BPS7aRZpYuKcMOmTwOQBDaWaZkorbNpz9oS4V27WXOjyuLtq5p3236tFopO70Pk6vWwqW2khAFdr3biuxtkvDZ2Yjk/xdp

kqUaDSp0LmTZ3W3yYI5Jgr1mOnspJKR7EspRIKfIvOlaaHC5AQQA5pLwSqYA5FpcZjmkRpRznoAxwobmxoZpXGtQC5qLes4BYpKakc4h2BgEqRfQAaqHasRGiJHYJp32R7Hl21enZr0y3aldlpqcaP0DnZIKQDnYpdJL7YIAmgJRoegiDjY7Ludbq7G+pQgKwAaIbyfNk1qOsPZCIAiyKMgQKiDljk6pTpsqjIQ09oA57gqvFUAAyGzklE1Cbdr5

jhmFsJoDoOb2bmpKpCjhtaVqCzsIDUylKSurUaiDuSkPwUAECC9ZlMh9KCuPrhwA5pcdtAJXW4YI7Y0kjgCrkU56uYbA5AZbodbYO2UGg6vWZ6f2aWwHJqpo0knmqlkep0cRbC02nDnW6aAOWZo5K5NOW7HyklZjJAU4k2eTna5OEAjb0uwOb5iHslZtSBa5pDkvDguL4G9L0aqeQ05nWfrqnAbOh4DUDOoh4I0AAgrUFXKNAH1mOA6g+mLPBiA9

QJHA64qcDADCAGpg6CvWw4Lk4l5dLu+JRapAF2pUg6DlKAOgG2agDkph6FJCLAH4tYA/qzafm5kpg4FrCyuyEFkBoA/pjHB/Arbjw4/SJmrq5b2zAE9IJxyIIbCAQzdroB32r1l2AYgu+abBP8CafA5+QEQMvnyk6UASBPSqkIQCxwvmPvbGm/oM3Y2Or1q1CO5mgNvkWw/dmyCk5qAKuDbgAIE7DQCTsDArTyY8odYH50YKik+x/kX7FphkERmG

90GAXBHYBsMZUB1ZgeelmLmljllnTqOWa9awpnyTWpFZAaiVngOfCBll5OlWf9b+utWWYiupL1rmqNZpFDa7JOuLttntZTBbgBx2POROlO53wOg4eCg2TXTDZK2TSRjZQQBNlgurttNlRal8MnA/W1gNM65qS2SnarZ1sOtlp2W2U9ISpPad8k0k3tsdmXOZ2bmoXZKObql32lmt673ZLKbzbPZ48grlaOFKUqlfZ3WcnC/ZmgP9ng5nGknAZ5oO

QkVNqLLl3LQ5EcDkBw5q+aLhI54KdEXaAaObEL3ZShfmkxFL4HjleFBOakXSFFAEgXWaH0odZU5djjHl05DOcoBM5sWqzn9mkuCQ5c5aTtEXXqMgKLiaOUrkOArKYud3ZKuTkV2rS5OsHLnv5cZvkUfqduXoAGQDavWqa5VGiGqHWuufxoG5IMOGqVppuebkx2t/FbkSQwLrbn+g6xco71qpbuw6u5/Zs1ge5ual7lGOahsnAua/ueepPJ6WaHnN

24eZHkrFDqjHmFyNJPHkvFSedZop5xdqPmggyRVnkqmOeTsU4y+eUXaG5xxSPmI274q9aF2FeTSRV5Nec6j15jec3mt5jQO3lXAnsN3nWwveUID9529kPmua8JbiW02P6hPk1q0+fkhz5C+Xmg/5T1lU6/qXGoA5b5lIG/IZwb+XgVH5lbl/lTqm9p3KX5qANfnP2mQJw4P5Xdk/kv5UpWgBK5jNN/mgOv+doUAFQBUwAgFkcGAVZqcblAUwFcBX

3ahAqAIgVk5KBWgWbgt/JgWTy2BS/yIOMpQQVYxRrJuYLpzOiVEJcIKIbQU0mVvgLcCvvppbuWoIYwHSZe6awH3mlSU1HVJfYbUkBY04DAC/APgJgCMGmSAVJtJxUpRK1SXScVJVoO/tdAZY1kDBb5W2ItaFfpYHton2hlurMmKRBiS5nqxOFqBmmJ4GdPFaRs8dMH2J+kUbE2BDcabFOekWSLz3aMWVbFTKBqs96+JOepUDWQbENmiCsrUGgDJe

SygJBXgN4HeALKyxoDFQyVGRBE0ZUSRDEUFOOvEmmi6AOuULgm5WODblSXjTqfWJ4GeAXgB5cJD3gPGZhF8Zf/pknw8VuBMBne66VAgQiLlnGVkRUgPKE0xyZRahsBaZd2HNRjEUpnlCCQNOC/AOoNODmmRXkWVg88VgNpll2VlwZ0qVUkj7u+KPOZn5K76U2W2ZcsWVa7hHZfolrRykVTzGJW3jtFmJzJgdG0hukcdFjlG8ROVd4U5RyGhhXIWc

k8hsWXdHHxMYQtYVmTZtfmoAgACgEqAAyXUyWAOAUfq7sMeyEF/0YgGuOVqaQU2p5BbBG3lVBQkkKmyld/LqVmlYbCYAOlQ6p6VQQP+VFR6SfjElUjaOzr/BHaDMBiZiEg/GSZiZZRGIV8mMhVdh9EUenoVbUWwJqgVmZ/Hr6SSg3GSItrJv5txa4d0lYhRJjYjgJfcfJEGI3XLgDZMMCRtE9l8CX2VAZvFdSH8Vc8X5nqGPCPBlYeq8U0xbCLId

yJWZKGZyFoZ+8RhlMsWGfJUPRp8UKE+g10LmBf0MEsHxjhgVQlLcJVMVJnPxcVUvpQhCzElXR+SSuwbFU6VbOH6hgCVpD8G4ycVaTJQhj+ltlfQQSG5+8ybAmLJ/PtxVgZLSoOUoJPmdBmdWsGU1V7JM0q1VGK68Y4kTlJsS4lN+jgS34uBFHhclxZNsfNbSy9CSLAQUhxE3x+VmgGqBbpVBotUKhGFawiDgmwNuA8Aq4IuC5BEiZ+7bVDccWITA

WbIAhm4VmStC0VUsSIKfpjFS2VEiisX+mtilJkordlRib2UaCD1RMGEWUwRh7WJLgB9WBZQlcFkneCVVvGTsrieQl9VYNZhkQ10yj4m4ZcxkkmLG1zAgELyFqf7F/e1qVcr0Zaloxm5hfaLFEq1CxhcTq1RAdjEM6wZcBJZervsKEHuzHlNXtoSNWcYcJMFfNUlJaNQhXlJ+6Y1GoVGZa1FZl9qL8D4AvwDUA1A4xNelE1fClbKjaPlfEArQC4dk

qHAXVVlUSBgDEdXtBJ1Z0GyRBVZAms11VoYmcVXNd7QuZNVXzWXhaCQ1VC1tiaOVi1BkYUgdxfuqQmXRKwdJXzl4NXJXxZClYlm3JIhSln/FnqWSlsF1sF7H3JguPG5WlfQIzaxgzubADRpHyWPW4AE9Zg7T1JDril9gbblW7EA24BS6L1vqePUK4U9UQ4z10zlvUn5XoGOB8IB9Z8lH1k9doDr1jNnqC31y9avUn1noBm7TOY4GvZiOeWUvWWwB

gPgXaAAYPtaFpc9Ww4wAuauSmgNUQNA0/1WriraxB1ppWYAA+gg3BAdpuWnMpfhV2b1prquSl6g/aS6rkpF9e2671FLjqYsgfkMoDoO6pmQ1pF19Xi46gteS3kvlepsQ2WaBrt5Ge2QZkamuqu9t5ESpGWdGZmp5Ge/xZmQMcZU61plXrW2pIcYbVhxxtRHHoAtBUPXB5XqaPUqlK9cfWP1p9RvXaAEDcqCv12je/V6Nn9WfWb129c0h711NiY33

1a9fo2M2DDVxpMNf9d6kANDjR/XpuljdoAv1/9YfU6ND9U/Xf1v9SY0ggh+aimwNuAOA3z1UDRSnRN8Db/U6myDRABoNGDWOoPO2Dc/YspeDZw2ENxAPk0uNIYLY2KQVDfiB9AtDRObFNV9SPYsNz5a1AcN8qS6qCN+9rw0kA/DS03cN+9sI2Lmoje5VJBqcUBX+UVaG4ZbAmdXWG24SNcEmxlxCp7UhVvCRVolxKZX5ZYSDMTFVMxlQa/FwAAYK

pDMArUMQAjATrITXfxumY3EfoJNeBZPpUFq+l0VJxAxU51WiUzUkiunoXVlVdPBVWDl7mTdWeZEGd5lQZewTXXOAwtXYkGxSqspLDWuBq3WoZpHouKg1bfl3XWxitQlkaqpdPhl6WwlkRkYxxlmRkhJFGQgHEFIUZElQR8jQxlRRIPneVPK6AOi3sZWLSRncZAZX+LQ+gzYBWfB/lPv6jNQYawlI1FtQNSFJFMcFVwVT8XVEyZFSVFXrNaFZs1xi

r8WwAbgCQBwD7AMAJIBF8rScRUk0ZzQmT/urzHdw66WwCWJZGdzcxSFWGiY812ZzFRAmvN5Iu83TUnzZPzc1/ZY9XmJ2kYdG+ZMGRgkgt9dYbEiVPPK/gu+0LT1Wwtr4TJULlj3lDWotSlQk4bO9Mo8XoOidqWqbOBsMs4Wa31szmM24xevW6aKpnHb4Qz4FyWS2oIHSRKkPthvZxuy7hNivW5KUY3sO2sM7nj2jBXI5+FjpVfCW5MbRW0ZNbdia

6920CiqboNYTY9lewbAPKRr5n+fvaLuUQNQgVteoG3Yfm92ThpdqfWf8AwAz8OfI1tkDVVmmaSEZm00OFbcU0OgpTV3lnOVcqw1blqAPTnSFLRcdKrtZbnoC+A+gOEW5tz0uObMuacNU4ARGzv+rhoA+WSkwN+1kepZAn9j8D6AqAGFBrgI4KcwzZ1sErm020Aq9YBgIgOFrQ5lIEc692cpT9LTmeoCoA3OGeWaYYdM7pFpSQEqU7AIAGahGCIOG

CJIBAgX6iDmHsgLsR1awccM4AXOp2cU5sl9LviVhaDbV3YOlc+bxr0dOsDiX0uptkdlOwggP23TmOapnm3521jACMdJ2YJi0u7JdO5aw47YeoPtMHVK7EA5Ngp30uW6gy50dRpRbBfOnblG5nyqcNE67ssToA5b1MgB9J9mquGnBGd/sDnk2d1MuqZPO2tg50yu29gR27ZE5uBCOqE+U9J0dEYAoDkdlHUuaGwJHUQCwACgDe3BA+mgyQVt0TQO1

Dt0Ws6ZxuTsBG4qd8pLTZYAFOMdLTgXYGFCaOHILLYxtdNqlAz0YWnIC9q1jTI7Bd0XTACRAbAL035IQ8pmm5qS1lsoP8NsL/UdtcAKLhPSu5T10TYT0ouBOoYUHOA9dN7dHC0OHANXIxuENmgAQ+PIHwW+BvmI3bJwWBXAov8aAIC4oRMtiWrjmX2odYm2YmqPZ9OH6tQ2VN6Dl2qxtQ9uk19d+8Hm4cAqDdl15RwEaEla1JBZeUkt5lfakxRKj

Wk2XWUbefLldcbXuBdmSbRs4ptyjGm0cAe4Bm0vd2bexqggvLjjkFtipJwDFtOrhe2Rw5bdA1Vt6Dle11tzsBs4spTbe6V7grbUk2INHbf7ngOS8I92INqzil0bZxTgOjWOS7u1iTtbacSCpu9MnO0Dqi7cu1CO5XbtYbtf4S907tdXXu0UupzrLb1NLqCe1ntyNnj1Bm5XTN13tuag+30yT7VXYvtVDm+2/FgaiGDvZyXb9nykX9kB0gdq4GB0Q

dSxR+rQdt/LB3wdDqr9kDdlXWmoodsvTSTodxAJh3mm6yNh0RmAfXh2rwLXbtlEdUXUK7cdFHZ3JKQ1HU9Z02GagZ2ydHhSx3zZCJXE5AOHHQ9miuS8Lx0Gd2nWPlGdzACJ1LwPvQJqSdmQNJ3p9zHSX202dbmoB9danS70adWnQJ3viunSn18dhnV51yOJnZY5mdx1hZ1l54RdZ1TuE5ubCedZtk5385tnUg4edTTl52vWPnba7qm/nbm36AQXT

H2hdoQPH1Rq6pg13KgsXUbkJd70El2/t3sKl0+aSbjY6ZdnPdl099eXVlCRwhXcV2vWpXSWrldgQF70Mk1XeX3H55DZF1CABAKf3r9C5m11gKuWRwBddqAD13Zd/XYN1vlzeQgOP8o3UuATdU3Y/xa9c3Qt3lOaDst3BmwhGt1xB8brmoLd23TPJhQe3W5GHdDbog5ndG3eMUJmV3RU0IAVTXd02wD3T23ttz3dWZvdv9XlEt6VtUGW8ZnlaGUpY

hwKYLVSiNTKgo157t7XFxorX7UoV0VZK2KZy1egABwyQKpAjAUxJgDKA34lpkllg0SgT3AzdS3FGhiQMCiAImwKtC2BQyQ2WNUDzdtgLRzzQ6GsVTmV2U7RtrYYF08Fdah5V1GHp63gt8JBiLdVklb1Ud1lsYi2Llr2jhmPRJqvsBsQPLHKJ6swrMFg8sUxNODk6klieAnl33US35mf3RbwWVcSVZX3lEADKhpDOrAKxCsDeTpg5DeQ/KJnghQ4y

1t6Eg3jFSD4EndzXQCzHknCySNYWV8tHHkUmCtKEks2qDKzbRFrN8mRs1aDwddS08AkgNOA8ARgGFAtJWoYiZTYqVXcCmk0vq8wc65sn3piIuVoa3qeJre4OLeedb+mFV/6Z2XsVxdQJKl1vsjxUDlTrcOWhDYLd0YTlYWVLVA1pyXC03R8Q6G20JilajRjgwbplFeR+9j8VoAUJe6YqVh1pWbVy/3HnbX5BlUFHSNlcLrWwa+tV46KNDqco1Opl

QNCNLwsI1W5+5iIyqYJ5ODiiPIlNDuiOSQnsd7GdDG7t0OLp+MbqEt8UZdy03cig2P6LNTAeFWpQqZeK0LDmg6CZbNzXsVzYC61QRXiB5g3woYmFZdwYohBShZDXDVxKdWtlzNQ8PggxVaVXXV5VZzWVV9rdVWfDfFXrHV1breob5YzVQyF4J+hu1W0MLoNgKdMi0NLVXRIIx4kjMqdVIiZCVkdcl0Jo1bwD+8gKNsDO1lQEjVVE0FXM0SZQrUXF

VxUIc6CKj3ET/GqjMyOqMAJbKrWFMSZ/rLGM1MyTn7iG1rZTyvDFo2XUfDjrTaOoJAtUC2Ojn1S1WMhbVYQkdVyks6BejEWXvGxDlCQGPmZWSVpzItvdRqow1PenVJXQ3YwKMwhhcPy1cJSY1MPghGNTQVjgpAPsDTgRgBQA++hFdmIThyShYOzI/8TgK9JiiV+gKIK4S0H3NOo5bQeDpYzf5sVVJsSFmjJda0rfNWsdaO1Vto42P2jLgM2Mi1PJ

sJV/VPPPmA9jPo+3V+j5yVQmBjw4yGOGqyQ5UDHGySRH4a1X3ZRm4jl4qUNkF5QwD0wx1labWBJCgxyOFRLLZIP8Z0g/mClE+5o9xI1HCgmP+G+QcK0+1oYmK1yZheApkyj0rc1638OwCSp9gIwJxGqtB41Il3Ah1YaH/IMyLXyPGeVgB53AEFGMl01Nmaa1MV5uvnWWt+noBkeZ/g5rGBDX45XV1Vdo29UYJAE6C04JXrSBOFInFg+GDQvY8DXo

ZctYONWZcE1ckITkI86kD1jye6kvJI9fll+piKaLhJpqKZAV58RIEUUvF7uRDbaAG4ESD0jkUzABepfKRWlhwTAOGAhqSI2wCcNnqv0CS4MdrFMRTagGg4AAPJWZOwnto/xypJqeEVKAT/J5HUjLmrSPMjO9qyPX5Rpp5NupaWcPXhFSU064CIoIGPAqmLI1ACdptrouZ9pHAGI14tEjcUMRJ2E2ZW4TocSSPO4JtTQXtTdBV1MBNsaQikBpgU0G

kop2gCFNhTbuYVNRTMUz+YFT74glNkpPU8/YpTpAGlORwGU1lOuqOU3babg+U/l0nTMACVMqmZUwGYVTpqWSk1TOeVlHwjHao1P/6Q02yNWqbUyiCup60xo3XTjaXTZ6ApAANNNTGIyNMLm6yONOTTqXiWHW1XIyGUUT7/K6CmkX6FZQCjkVLNXiy8zcmPKDZSaxNqDkoxxOLDXE6FavxbILgADyVQAgCnMf0aYNqtiVpRImk/EbgwQWz6RaGXDu

RreM9894w5neDq0c+PrRHzeaNfNVVR5lBDM8fzXWegtc4CmTYQ38OgTktcvjejQI24lQTwbW4GwTwY65PLlytaxkEZmLYZZcZuLWhP4tvsamElD8rLRmFmhI5FFQxFLVUNUtEADS2EZLszi1/Rog4GXMtwKkzq21S6Qlwmk4sTgJWD18cMPjAmYrM2MTNUQzO7pvtbMNlxRPmzMVB3EwOFTEpAEYAbgq4EICH0JzZtW3pqo+JPWDkk1/TAo+Xmbj

5gjaFZnSzowLJOs+xY8SZ3D51bomPDT4+zV+Das3a01jPNVSEGTP47rNNjddb8Pf+8JLJP88ZsyckWzQbZ3UwTQ47bPYZoY+5PqwycL2BjgavIuDCWR4OtZJOW6oc7Oqrckh109tsG7aaOr0z7b4Qv9pw7WAP9h9J3TD03HYS2tdK9ZnTcU19M/TNDn9MaIj/OCVc5/NllHtytMMgDxOSpuqZzFDyaw7GNwHVC7qmnDkL0Q2zgIu0yFoJYGbJdsC

9IXHTl06HCx6gmJDm2FOpRk4cA0BQ8XTw1bTkCpTgzmepfzzdkAvNqdbsWrJuyC+9Cem1ZnDY9doZioXKgOvXZCQQ+AHU49dEUF8AQL/+vfxOw+XawBau6DrX2wA0i5iCDgMAJGYkAYi4/zDgYTpwAEAyi5wCqLXDcurZFuXawvxNx7OvhDmNDsYt02G8M/Kpw1Zpk5mLyNNYX224QI7Zt26DuHZpQttnnbAd4Bf4tpwcXTeob5wi57DyO09bm6P

FXObTZZA3yZHDaVXwE70WgMKdbA397PRqYf2N9nA5YApFJJCRwY8hnD9OVgH0Blw7HR5FolmtsHD5yOuOYBHdb8kvAXUQ7oNPNT7LmnABgJ4Ht2ORkuWAoQ2GLqMgGAqxftYXdZ+X1NozwA1W7I2XfYiWuurRiwAZ5DXUANhdCfYg6QDDqg+1NZH4h71ZFuQFy7v2GyxZqLm+pg73TmytvqabdGI2xqgCxtq3acAZcE9KX23PcdKodQ7VQ4kAmjk

Pmnt++KvDnyH/Q9ZhA8XWs7ny2blu1bOufZi4XFlC7G7/znCzPk+2xLv0DkA8+WAuXTr1sO6ju+jpXboOxrhfIjy2RfhDPLVI95HW9CbRwCruU08KEzT1GcS04TWYXhOUtMpGWqN55812CXzH1Ik72wt1g2r3ztdCnBWqT89q7HOtMK9bvzvxdwvd2v89TJorYgIAtiriXbmqgLF08VOlT2C9AsBqaYLHl82vBQgvr4LAEItdmaC9YAYLkiwvX6r

gZrgvN2+CzJ1ELidorkf5ZC0asQlacCit9Z7yfOR0LdsAwuwDzC1pUOLZ6lO4PTXC0wCcOvCxXb8L5zvIC5qg5qIvoDk5iW5xNui0YxUg8i4/yKLUAJYscA1i+otAFZSw4vZr+i4YvEAbi6YtJwFi5WYlrdJLDn2L0nbmpOLfQC4v/6bi4EAeLzsF4sqmPi/Wu1qI2QEt1uwLsEtHWKcPYBfQ/sAWvRLV8LEsX9itkm5JLp9Skvz1aS9TIZL0btk

sC5gZhHCX5byQUuDtRS1KAlL9sGUuYAFSz00+lNSw6B1LQQJU40usJSGrFqrS/KTtLAi+Oa2wPS2Sloj/SxZpXwQy8OAjLMxWMv64MAJMu/ZMy5g7jF8y6RT9TSy/KWLrrHe+L6pZrgvGbLuatstOwuyw3oNykfba5HLkhZ9AZFPqVKCeF83Y06YbggCqtvLa5ncs3Ojy5QOAbOYQxs02sDglPPS6vX8vG2AK/qCD5ycBdRgr7/UV2QrGQEja7qm

7dL1+uSK3uB+rxPewv3T6K7yVp22K1fD7Fn0/ivaOI7no4FqkgKSv2gRjkDYUrf6oBs0r8I4B30rjK/jNiDsc9cbkTwzVgo4C2AlN4xjxzOMB1zDE5j70BPCflxhVBc0hUSj7E21icTpcxzPNe2FVUCYAxwMoACzfUWYP7DEgVMijazwlVJSYrGAQbliaidkSzRRY82VaeyFupPaBPg88Mc1b4+rOWjms/pPBDhkz8PmT4QzYHTIUQzOVOBls7vM

DVCtUuV2xDs5nwjAbEOjTvUsYGgDvKc4DphTgKyufNFDGE7954jsjQSOktBteS1MZUQSxn9bg22rwY0I28sofKE2+8rTbJEzjFEzCc/jHI8kKBTUQU0vqj5I1jjDTMlafmwtWhVIrWKORVoWxCzhbNSbKPlCrQHADnMOwAgABgUtNHX1xpUmMCa6o3iZhVSmwF4p60OJrJPqJWddiG3D9mSxUtiVraaOqzlW9PPvDs88L6QZFfmOK2eiGaBNHJ4W

RBNhh/Y/1VS8XiZDUQjfdTZU0OqJcGq4pKlepVIY1sF9q7WPAE9IspbmtaDyknmr5oGwgo+I3Mrs25akyNv3eyt2pi04D1kjZoiiW55rO3ZX+FnyVzs7qPOw9n87maqDbC7ycKLtnE6EcdsAVTm2y0JckEuM2I+tE+MBFh7tYmOTD8FSoOvbIW/MOsz0oxFvk+b8UoEZjew2Dueju1RqP7VZkCn4DzhW3lXFb9w5Anggg8RIaY7NrWrPqCM8w628

1dWwvNsmf484BnoTo1/7fV0+L9Wdja81pziVu8fZOy1CLfLXd1dO0rVhjqQW75GkKPJsAOeAo8c0+bEw49te1z219yrjK1fQabAvu2wZZjyVtNgc6GVfeEuDMTLzyyzkikVt2hBo9HvQJ8e5WOiq1Y7jsp7c82nsNji85nvZ7LY86M7DBCS0yWTHowCOy+ZsWXtU7jkzTuDVPdcNXQ14Y/16zIppLMgQV6AEjUHKbewK0d7CzQFvo12gxABhQAcD

LQGAfYG8L1zyo6JMSB+XhlXSTFNacDNoKXE8zp1kkUju5VyTJ4Ptl6O5pPOZk89jsBDM/KnvazIQ9vvGT6hrvuATlFsBOF7NgWc0l7ZCb6M7zcQ5XtItPWxag8WtkTYRm1rGNiNSNc21hM+zV5f7MxJdypZXMZ1Bf4lcHow/lExziQXHPJBdtcBXmQYoYtDyDmXPdvxlLYb/ssTVCszPvbxIp9uZl326wjCA6wKuAJA9AI0DxjOw715JKkB9NhGZ

hmYCjYEEyDgJvoFw0IJFgOVeoGVsqOxa2lbSsxPOnhOkyYlWjdY9+Nb7Ge6QcuA5B2ZNBZFk9Qc884oS3WXe9B5BOMHA49fvdbiQ0fMM7Hk3DOD13kxtMeNgTVaraAkkJSDaABayY1xpAU/8l7TQKdICyA2gCpmyAtIJmD051R9tMJpQU6aZTuCAL+oj2zO9RqdH8aYGnrIwadoClkI6reqr5IpR7HrjBINMfmL+ACMe1HiafUeop9RToCNF7tlj

LKkbR1bbMA96mIC+LhaUMdiA2TQ9nZ5yu6AacNrTSA5+LGU3TYU4XqQ2n8p9K+ccq2Tx9g7jTA6S6rqA/oOFOJ5fZi8ecNVU3cfIzBa0WuP8NanU74NA6eK7PHODgew5rcizOmuq4J802WayM1D1SgOpu001rtx1ieeqiJ9g7aAKJ1WvEAOpkYvaAoIPGBhAhdhNg6mea89MDp1TnsdhABx/TnHH/ZknBWmxJ38eeqLR3ABcnQCo0DjgqDYuDDg0

4I0ABgTsCg2XWw7XhqYgdpuicuqmJ56rkpCx8IsX9BABCfvHXZozQ6mAG88tUrkkL8d/HXZszYfeVDvWZqnCqdWbNmQfemb8uCsA8tmnedjct6m3p500KppJy8W4OKtqIu+neM6sbgykjWeWYTsMtLvzTHK3Lv4T1Q2o2FHiM+EVaN1+WUfIQ+AJUfgFqxztN1H4x/tONHcAM0cyAIpzXodHm0/CmjHu0wWdApxDoEADHeLp8e5n3RxseTHhKEsd

+wsx+vl+w2pzuy6nKx5Wf+TeZ+se1nmx6TnNmQakwDaAHJzDDtHRxzgC8nUad+2fHlx7k1K7zS/CdcN9QLSuxE9K/SNInrxwI04nG5yzvGndI9CU/HRJ4KcAnQCtg7T9LxSGdkpbxxWlQnjay/ZwnrJ3TZW2zDkifknMi7mv2nGp8ecGnl1hHD4nULkYvXnfx/6fumFJwYtUnNJ3SfswjJz7DMnxi1+eeq7J1j37H5ZwucnHfJ5hd/Hwp6KfaA4p

2OCSn0p7KfynwPQk5KnMYKqdPn4RZqd9nnZ3qdYnN0/SsjtXx30umn/SxacDpVp5dY2nMNrU72nvKU2Z4dOpq6f9I7p/0vaAXpz6dfnsFzg6prw5iGcDNch0M3m7vvFMhQSK0K/v307XkKMJlIo0mVBbEVa7u1eErYHUhGmUM0D6ArUFMTbgCW8WVCz2kI3PD7aiBM0tzuvNc2rQUs7TWFj9NSpMljCs1gcAZOB0EdTz+B/7JhH88xEckWQLTEeG

zq8zQfnegI1vMy1l+xXtdbVe6ON374bXhlsZ4c5xmRzPB5Gd8H0Z2yuxnsu8SPy7629S0lXzs2VekZUc8buEzpuz0Mkz6/hBQBX8PB5tv74wCq3Zzvm0xM7p7YTMPBbqzdZdSjtl/wkQAXYDOb0OsujGV7j2oac2lSDh4HsB8vSXv7Og4KIMnXjRrdZkTJNw2a1qTUexpORXvg9Fd4HukwQcb7RB/VskHFqGRYpXK8wcmFIuwK1t9jHW0wd5XLB9

kduTuR5UDbFLO3TaqA9Z2r23FquX136lmRZRt52Rpt00PHk6t8fQl2bvdls5fRaMiVOB7JOpLqjAEmB02XduhAfqjDpM4b1k7n/OsRyEOANGAopR6u2u5CzST3nBhayVZ9inWv0cdQJ5X33ZRnc26J5oPZzdp5Y+WatTuPN4Cf3nIJ5SNIR92eQsWwONxznYAlTiDmAX359bZs3AZyieyLLGz+p4nUF/g7a3cF3ZCUnAXQ2q5Ojp7mrIXDJ5IAAR

dhRzYvdocDupWas65QM7qYS19CiblsABCaAGYCX33ZbgEucGwBhQT0dpbi9oBR3QG77cxwGYHQPMAk+bWoDdpFAU5HWMTuP2znopzye+LCvSWrkXlFzKdzgdqp3KI28pEfL3cgDkacenjzmhvI2zTqJL0rrBfJdenpN8W3nyIG/7AyXDoMraoAVNiQAobDcvbD6ADPdc7OnHmn72y9sueg5+lFt4LYW2AZ+l3T19bXavoOzxT+cV2jmj2ZAuyN+E

VanHZwOdcO1GEy4opkazq5THy65k422iNh/aZdBgHfn+wwK+GCUgOKU7BF5BMiiCuu/UxTeF95dEescA5dq/mOVBF+KvouygOGYMulMs7aLF9kNbnAukdj6XcD4drCC+AokgsUhoe4n+135TsPhBA2HCBTfnyvYC9RjgUNvkg6w4cJzEdwirkr1sNDeTW5LgqD0d1FLwRfgA7qv2Q/e6bRKwZvoOoksICyuEbrAUSlhvaJf/6tm2GfoTBLV7OzTA

h2UNxn9Vwmchz4N9rmBAUN1O4w39udXR09CNxRvu3O9qje/sjxxeeJ5951jc8bvRSrf43e50Td16vkJaDk3DqpTfzO1N3CBT9+EOQgM3TNzGYf5rN0idJ5qyzn23nfNxZr0ygt748i3jfdTIS3057mqBPMt74+mPjmt6sjySt+Y/2QeN4A6wncNnYVknut4BevW4F0bcpuJt8idm3CFxbeHw1t5yX0nCAKhdamjt0U7O3ijjYvhLjdp7czrOQD7e

pQcd6htc3Um9G2Lnud2Hc+wr1nmuoAUd/7Di5sd/7e4ACd0neWaI8n9Y7q5nadY59Wd3hc5358AwMF3Up0XdcNpd6faoAFdzKhV3A6NSf8Xgdw52o2Td0zkYjCl5aZZPc8Pdmd3mtqRSyXrdv3f4ksfei4j3j2WPe93Gzn8vT32C5E1z3TZgveJunsMvdk9NJOV3r3Wt7urb3gS/A/ftrF4fe4wJ9x+Zn3acBfcexV94au0bd9/oAP3SXt8V4Qvg

IEBv3lMh/eXSyIKjNadtsGPThA0ZoA9SlwDyHeb3fcBA+fiVINA/oOsD1cW73Y8kg/OajD+g+5trJUS9qAOD6Mi+A9L4Q+QmavCQ9VOZD10tKuoAtQ/HtL5Xw4MP9OUw/GFj2VCtsP992oAErOjvpskrXBXw9dynPYI+yuz1racqmYj2ZZpeJux5XdXzm9IM4CYwAojmQNu5qHzj4w1/vjXec5Ncu7M1+XEe7X22XOsIzQHnyxgCYTUCrgmmYlvu

XyWyBDDRge5kFVSUyIf4LMawPDUzRbg7qPyzaO4+NlbysxxVVjVW8nuhHhB0OU6zdIZ9ck731ybP/+05X9fpH1O+cI371eyi1X8aGq0Cbbr1MNtoA04DUACQR4DpiHgEBIdtMrc2CysXlNV3I3/d8Z1ysDvQ79tujv475rzBY077GCzvdmzIfJx6WtyO9DatFsQlUQw1M3jAeQqNft7wb13vO7Fl+KPhvxc5G+GH0b0hOG0zQBuAwA/4CDspVKSl

RNcGT+HEA4EMyE1T66CO/RXT7Uyea0lbjmQEfUmPzcEf3V6+/jv/NhOwqrE7/VvCTUSdB23WU7/1xkfdvWR7bFsH34auWK7TO8rvQzV8OzsK4vAFVla7WOaXJkOcSwbtSHn3R7NEFUj6ytzTy7wtPyPa74zv/6nx3R9qVau9bDPR3Oyq6uxbH5SMcfXqppeOb7rzpfgSR+DdyAog10ZdgHn+4uOO7zE0+9MzhcwelVJDWp7uh++FFsQD7oOygRYm

GVZqPZEwCagfeH+VVddUEse8PFRXiCZ81J7a+7W9PX9b8QeRHb17BntAOewxh57h++LVrAziccnn7wI529X7pH/lesHF+JR/qfToFWjw85kCtA273one9Bvuc4++pj9BpCi2fDc+PuNxDn4Ht5jyBy59KTZ18W9PND42IZXVWkyh+J7sV1KpBfz1QC0dWYXxgkRfe+7nttjP1W6MmCkKL9cX7xH128pyaX8Df2zte3cbaQa0NCjXQLCZM0u14wPB

LqHsFcuPB+/+wCAbgRL5YeAHAHxAfUq96XV9k1Vu/MyiR3wXryI7TX8dXnX36fqMvN/hwKoVvLwyvvVvAXzVvxXm+y9WAtmeyN8UH+yc28ugmIskc7xqR0R/JfuV5keLf5Hxl8rlxqkhOq1FxMRLcfpMwu8mVMZ4J9yPK20bXLTQPchOLGxEtHNMtsh6p+nvPV6WU3cTKs3vbfsY+MBxS+33TOHfgWyZ/TXcw7Nfu781z3voAQgNGwxmmw2caCzI

k9SqiKO16aQKeVuAsy3NQgukGwfpVpdcjzLNRjudfr41W847EqrWN1v/X1h+DfvJOF/LzjW0bPfXp+228SVbWyDWgjzBwkNo/ketuKo0LFwffDr+pxWldmF1BBdjmxAJgW8XkkGeoYjAlwqlCXCTuqYFPNa76cSX27VJfd3xAHJe3Pil+JeuqKl4GddrPpkxf5NqL978cXyM1YUdrKtgScR/JJwGel/OprH9KXWJ8BddNO5z02+dyfw8u9NOM9Bc

DpTTyk2t2qph97+qbqh6ovW/oIOCpQ5YPqYV/fx+oAAR2F/SS4X85xs9eg/J4KeCnJF3hfaA14AGCoNLQ/kM0X/z9rep9ccB2ZfnVU4KeInL1t88Nm9f3Oli7PoBGdGVVV3mYyPMuwo2k/SjeT8K76AJ7+LHA5z79Oufv/vgA/oGYSAMH8MZqH8a7p39I/pdZrTpbcVbEYt4/gI1JLsxtW/paYPTnc81zHX8z/r85fzmSc1Lq4s8/lid97j/9C/i

+cW0uOZq/uX9IAZX93TNX9a/kBdnzgI19HsI0UAemZ2/lkBJ/i6pu/j4F+/hRpB/vVkR/mP9fgBP8qAVP97bihFZ/kdI5zocdF/pwBl/iv8B0mv95zhv9VlNv9YwLkNd/qgBrTPv9e+gZ1j/gKd1TspdsAcnAL/sPcr/rOkJpip8U4qy0ZfPbVVQF/RDrgswbdqLIufkuMndozMdDqZ9/ahoNhfv/s8+B1EEAFMRcAAkA9vsJNMxhq1RgDIkH0hL

MbmobQLMrbJ1fiW8/Doh8fvoEdfPjFcHrnFdjfgTtfQq9UhvuoYIfrEdRavEd3RgiQ+eIDUsrgwc5ygDcUfkDdXfuwcHYvipmrhxlsWm1cKrg/9JdvNsifotsV3sJ9g5jKQw5i1cWgQy0jdi69Orm68Gfh68AEDvRFoFNFrtp6IkaoQp9Pk2FXAUZ93AX8ZPAeoMbLhZ8o3pFtyhKcwS7tJA+wHONjKG5cDxjNBwgd4QDMpm9xtCtBoKLWVposgc

e5gkCUdvB8PPskC2ash89fv98DfgyYtZsF8XrqF9zfsN9LfnEcmtjzwQUDN8kvlUCSPgt9agWG1+3qjQLqL+xA3CCBVcPdlYwOcxNlC3kGIMzZ6crks4ATWsLuoBA7Hg6pmbOQB/QOXd1MJphK7rmpECkv1o3Jw4TbClFTpE7BjXAQ849K3Ya3H64PNIBsNnMO1vgMhRk3Iq5iQHEV8QH1k4VqvdXrIAVgCt5F8QCiAdCjasZcnasucufYG9CdId

Tri8OAAGBQHOw4ZLuFp7rF9I1AK5oh+hfAlYIw8z+pK8VnDhtMALHFe7Ol0rHF2p/gFup61CE0eQTPVrYGYANFsEB3sgX8vQJOp0XtVk/2M0UKkAm4cHLQDDbjWs4bCicvngb1e1pWpZ2mC8OAFYVR1tC9k8iGp25FvZNbsw458ltlGli8si8h9JFgBRp31m/1DnlSCYRPsAq7i7A3TpyDkbPcc+7EEAp6FmCEchTYdsssUobL38eAbWoZLky4XY

J6404FtlhNDSRFbq9Y+ASmD9WHndLXoLgwcqA5sAMp1DYNnZPHmyADeiE9QHF8AXnp/co2iawFSgGpIlCa5h/swBR/tYAhAXqZsOpX1rYFKAKct3Jh+tbAMwf/IDYKi43koeDBAXTY3nDC8I1odZ2ltSRFQAgBnAB8tp8ushNHNP8UIoY4NslyVa1OUs5wefBXcnhB85PdZg7r4tzsioCd/m0MS7sQAy7jSQjnuMALbrecfctsk1+sPd3FvGCfcq

rhRcJEByQWWAD1mjNKIH1kvwYqRBnELk0wRPdrHLJBoIC0tqNA71aOof8dCBbcWIAGApQSfB+2m4Vg1k+p2luvZMSkcV6NFrZiAE+ps5B91jxGElwIoT8l3t0ChPm/8lpmRAgekiCA3OuDUQe3dI4BiCsQR9FcQR0VYAdSdCQeMViQaZCyQbBDKQUFgaQRwA6Qe50GQdy5W7MyDGAKyDjNuyDuzPuouQbn0eQaacilgKDeHE21q7KQBRQeQBxQTJ

saehwBpQeaVZQeQB5QVLlbVqktBdjXI1QTi9b1LmptQYLh0HHqD3egaDaZPSDknNbAUHrq8LQXflozHl0n7HaCk3A6CV6jl0XQU40Q1ClNsip6Cy1rAN4Gl78/QZI5j7oGCaOoexS/qGCDphUga/hGDvTgY8AXA3JYwag5GAAmDt2pYVW0tEtcIa+sUHE3pmwTmCKXHmC6NIWDfoC0tSwUfITMJWCyUiwDmIVfB6wS7B8AE2DxXK5EJUq9ZuAWKg

Nwam4TGP2DRnNTYhwYasOUl+0OAGODtCkl4uwJODeHtOClQKIB5wQgBFwZqDlwa7BVwYG4ZLsE9twWfkU3FtYONtoABAceDblimtzwRqYrwTWobwefl7wcYCSIKwVnwceDXwTUJ3wdJ1EHHRCPoGIA/wVxsMskBCxAVqZQIePlJ8o5Ub1mmoYIRSDpighDNQZv9VAeoDUIT8B0IQc8sIThC8+l8UCIRnAiIXNCSIeTZyIWS8netRDfMLRCwtN+CG

IWSk9wKtCY7utZ0IOxCxAJxCdAb2tYcg+0+IQJCX1CK4YXGzc/7pXYO1OTJC8kbk+3DppZIVSCRBh1dxBl1cJgVl8YONVIJvFe8dvn9F7djnNC4iG8XSGG8BfhG8fAcsMIAAmJsAHnx3wOMBfgLy0xPLsMeFJRIIPuqNc2PNBrIBChpxoMloPo2VngWAlI9lr8Hhm80l9v1J7riEcgflkDMPjkDsPjeFcPjYEgEJCDt5tCD5vnqpO/IVcEQSap1g

GxAEiC6gkiGrw/tAdtJ3rts7tnO8vwAT8pdipDtjEIcbypUMxDgRM1yn3CFwAPC7CMOAHCMPDJwKPDshisoJ4Ye9afse945pzJE5r7wKaMcA6JIZckail4A3uTEDPt/t6Zo+81gT5YNgSzMwtiXMdgV7tGgBwAeAAGBpwJoBpwL1FTgTzF04WRUdrvDwFElsB0sCuEC4fEDXPluEh5r4cEPorMUgZ8Csdvr8evq/oMPvt4BvjMEqDiUCcBADUEvu

29Zvkj8TOLJU4QfTsirklBKzIcUCwe7Y2dlJ9tIMx9edn4UddmlDr1Bf0LiMcDDKprUJdtrVOgbPDwYvPCKhkHMl4dUM6EQ7Dw1BJ8GPurtWEdrtj1ALtfilwjz4GsBLASe9iZpMCVgMr81EBVEBRkVoXAYZ8JrmHDn3m9s3dh/D33kHUjDvFUcBKhN1ru+Z4QslVlRmm9wUC8wMCJlUJIqAgvDogiI9nPsvvm1Qb9N59brmkDKtv59Dfnjtzwtk

DLEq60ojs4AQ8JF99FON989pN9uRGbhW4dlc5vil9YQS794QXcIH9nIMu5qaQbdtzojEY/Cefn/to4cVwtgJV9lRltU+FG4jcxhv5kDt4ii4R98MDhdUoPB18fPkBk/Plgj8LGsk64TEjcgUCD1DAkjRvlF9kkTF9G6i6AfLlC0UjoR8pKlkjkfql8qETXsRqnXslsEaQn8FdsdPkjUh9GUiH3mZclqtHCdgAHBM5qLlTmN5trDtpl2kg0jpkCeN

mgOTU+/FTUX8HECrhggjB5n4izqvPtrrk8NfvhVtMERkDevjgiLEi60RkV8V4kSCCigWCDCkG0AMkZUDostUDVkbkjqET3CsflwcrDuI8ePoZVCWtI9b2IIcltkSN1IQ1dxDpwciJlijnXgTMPYeMCtEd7C1vlbIzvEtAbduQZDkSV9jkS9szEVZdI4dsCP3rsDWEEPlVIMoBoCFsNLvgNE7DhiItWqN5dgL0kq0NlYZJr3NpoK1Yw9gzUkEa8DS

4QXUdfj0jtJukDq4T80/gSb964Wb9IUeMjIfghkm4eCCydpldEvm3CkUTCDO4fBNlvsfMJAEmdOpimchzumcpQHnZCujqB7Gq3IMzhUcqjkOcajiOcejkWcZzjhcwgET0WzmMcsgBMctjs8k7IBilhSj2cQGhUhVwFjlBusGiujrGjNTPtME0XEVMQMmi18qKVrOhmjXYlmjijltNqzvmc40fmiJzoWi11N2dRShup1AHvVV7Cz1s0TWjRznWigU

gWik0c2iPYjApy0QN0NEDGiazr2jxzjoBG0cWi5jreoagJJAR0ZWitGiGjWzmOdtAP2ii0YOjb1DJA+NF8BCUsDJx0bWi80X2iG0QOiU0aKVd0ZmooAEuix0V2i1jj0dN0U2iL0R7E9cvQjHYYWk30dIiqZNA0r0fxpb0coBVbAoBEAAqBMGlk1mpu8d1zjQ530ccUtzvWCCbrWprjs0tVoUecWmiedoMd+imAOecaPshjldhwDoXpOcIbiGZldg

QDNTsOjM0Yzki/u8dZzkT1oTtxc5AfID9inuihcJ3J0HCadwAec8tzp6ouzBItiMWiVdAKc8a7ggCXVIicaMXE0BMchQGMSv8fURJi/IEBiQMSbAFANaZgsKGZtAP70J/nqZgUsDIqGsmZ6AcxcCGmWiKMZ0UqMa+dwCnRjMniICRMUYCmIRilALqRiDMcqgAMUBjgACQATUuBjSAc/ZcTirZyUq2imoDfZkmtaYSABrZKAVxjM/tZjVobSdxoRp

db/rwB7/nij+Ps/9arq/9A5qttHUo1ddyGtN1GlqliAJo0/Jp6jlUNoAfUX6jSjuUcszkGiq0VWcH0W2dw0WJjIGkeie0Seip0Ymit0S+jb1HZQAMfVjH0WeiWsSWiPYoZiK0XeiKscOc10ZOiN0d1jn0b1j50ZmA/MR2jggJ1i2zk+jZ0amjyMQNjlAPNj10Ytjt0fm4F0TeijMetjRsZtjWsfm4/0fujWMftjGsWNjp0eejJscdi6Ov+i9sfej

Q0QtjxsUtjL0QcVMMaQBP0e9isSj+iKUidjdsatj5Mf0cTYFg0IMRWkoMf/oYMfRo4Mfo8EMR8cbjihiGAWhjQLhhifsVhikMRDdVofhjAntrC+MSzt7MSQ0VsaOjjMR5iRIJGiEALRj3zkaciLiQ1/sQei2MSH9zNuH9LMVxdeMTZjq7vxdhMc2CycXP8o0eJiXGFJjBTjJjqcRABgMcDjggEpiIACpjkzGpjQ+hpitMTAAdMauo9MUU1HMUZi/

/s/Y3ziqYYThrdQsVZiN7jZjMngTj58v1jicc5jXMaDjScV5idTD5jpse2jNXMEBVbEFiHnA6sgzPhjEThFja/tFiRgdSiHNlYCzdjYDZmKaQpvGtAB9AKNfDEsDSItz83AfnM+fpZdX3oekrESEY+wIO1YQHAAjAJoB6JjcizBucD04Q8iogf5cX0rEDFUSgdXvtnV3vmFdS3itE0ES+MMEd8D+kTt4vMrgjTfjIxRkS4BTUYUCgJg3VxyuCDi9

uUCbUZkjyEY9pIwj28CrkkNnUU1cnZs0D6Wm7NsUfj8BET91hEXRkiUQHNYkuIi1tmSjQ5k0C6Wq7N2rqMCaUWRM1PoHjN6NdBRokyi9keMAhJkV8H4UcitDsZ8PAfz8i5onio4TYjhJFABVIIv593qyjQgTekLgZvpDaPHUIUNDtmPE3wpopLFHgadc3vi18LrgrEAkagiPgbXiE9lXC0PoF9QUc60BKpslM9h3jUrl9dZkbb9/WtENA2u3DskQ

6i7Zr1tEJhIB9il8AocR9IVHuAU2bPTIj5DtCc+k3Yz1Hg91rHTZecb+CmZA6VMQJRDE1JwAkIGzZDQfvZxXJYUKXAq5KblwTV4PAAG4HA5HSn9J9MKDZcIZLDf0XdivgE5jrTGLjQMZk04bGaYFbsFAPxHKQbFhSBMACQsz1G+D4cc0tgIVJoC8r088St+0icbpV27JCV+WBOBtCSbAK2nTjWMcm5U3D08hCdTIGXpVlFCWLkcgEz1Gcdc5+MRG

5xcuLZlYQOoz8neCu5DWon8uTjKcdrifcs3YItPtDjpPHp6cnhs54GzZDrEzIGsr/gdTOM9HnH/I3+jSQrGM5FlUPdl/TOUUGwarhonhwBhcTa84CtMVVcGQBzXImshQR4SJcTpBc1ArilcQ6A4bLg9ZXh3YJFl2YA8ufJC2tjJ3sqbjnCXy4XYDSRcpO4SFMYeo4XtmCSZOAU8wZyU2YfwsP7DVla1LkT/ctUS1QEl5TmDL0AcWbitCS5jiAG5i

4bLy5+XIuppscODEbEmt5wBsSyXIMSKUr5j7cQFjLkBrYcIEhA8YUSBZbBzssXlfBPbJESWdpFiCQQ88N7sjYoegy5bITSQHIdyCGZGxoAiY5V8upllP7JV1V7tm0hShbBFzDE8xAVJppzGo9+1tbBZ7oC8QFv9Jgnji5Q7ufIf8k9JpidMVoemU5UHFFNMnPWoQNhZoH2h6cvlnn1WALHo8IUqY7CvPc/TBc4PpLUAdQFuoTHMJsciXVNvInMTl

SO0NhwDPYcHG0D4sYu8BPqpCSfiliyfppDP/hAAqCfrkPsZDd6CQs5GCeWDmCVy42CRMTtblwTnADwTpIfwTsSZ+0FnCIT8ekYDxCdTZJCbMTycTISBut3I17jHZGSTMSNnKoS/seoSbiaLggcToSNbPoTd1IYTkIpUsTCYQAzCczdJlpYSMcdrkbCTcB7YfYTx+tA0nCS5UXCbrA3CV8TxcbAMmMdej6cb4SVloITvSePIZ+iESsXuxjd7hFjoi

ZyS4iX1kEianokiVSAUiVwS0iTQ5H+CzA5HHssSwTkS8LvkTmiQs4iiaxiSiZJjyidkT5SDUSUonUTnpA0SjnLrgWiW0SEHLa8poSnBNOnSR3iQItHSv0Sfia9ZhiaGYxiTK8OEJMSezNMTz1MGSuCQsS1cati27MsT5SGsTayToTEHPU9bpLsTMSfsTJ1IcTpQMcT0coccLNCZhsIcOAridA1FiRohzcQ8SNbM8SVif4V1AFeTPibeSFAL8TbcW

2j/MYg0ncYU0XcSCTw0GCTpscwjnutCSAzLCTqNPCTzIYiT4XlfAUSXbA0SdNhjnmSkaXJ2TqKYLgPpK/185LhCUHqnAY2sSSmBushySddIqSQwSGnnSSp7gySlCVG1mSR+SD2oEB2SSD1OSWy5QbIQNeSW9Z+SZ+UNnEKT+liKSNnGKSq9F8UNodc8ZSZktqZPKTFSTPVT2iqTQZn6SuCZqTtSW7D98X7jNEadsz3hIFWMEWA2gGHi2fp5txEpH

j74uUiY8aG8uUQnjzPuUEv4W/QdgFMRTmMQBFwNuBVwCYMU3geM03vNg05oLF/kF4pSxKUQMRE/h4eM4M5JoNAi3neNWvuFcy3kh9ECcvsdtEskNZvqjats9d09oJUu8cUC1+DxECPjC0gAixZkUTkjwRusjQbpnwEgP3DEiJvDHCFu8J3ru9YwDO87dseJTyu0DBEfwcCUbI86riSiFHjKQ1gLNTB4fNTt4WO8lqVO8Vqfu8iwjT8uhp7C6Ucfi

eZEdCtiOBU5gRnNnLNfjlgcYjQ4apRlmo/izPumVeUdYjP3hIBfzOA91gKrxeEdL9QESgQM4kcMBItMgMtvuY7EV3MvFPWQXvsFdlJhXi1UZr9fkd98ECSrMkCUCi9UZ+Ngft1TErkdE+qbCisgpzo/WgsjhqS+FiCSsjxqV3Dx8VNT0AFIi0cYwjVdpCSZPprs5PuzlVXvrsLiJSi+ERI9PZuEkEsTtSX/mS1jSe/9TSeljOaZJDpzkwjeaQojW

PoRtVEWmpzIBoiT4TuZtEfpkv0B+gQqf7D2fse5oqeJlvqc/DY8Q/j48RHC33i/iQaRT4QECklOFE4iNqi4iODJgQmkU58+DEVSVUaFdZ9j8i4CUkwgkUSFCaa1SJhMCjsEVEihkeCiwfnEirSIkjcEgftmQiUCJgBlcz9qQioQXaiO4WHpHUeQSNkat8ZkD3oDLqbTPNmx4Fxl9TYqUZ8yvoNgJgMnCevFH4lRgNF6kcPtslE0jqvlqN/aXNFVU

d8jPvl4MyxnHtdfnXi2qXdUn/OXUuqf8CeqZgTE6dCiqaasJU6QXt06b8w6afD9FkTENlkRQiQ2qzScjuOMCkcQZw/KtBy6UNcW6UHCxruyi78SEZkgBuAhcDsBqQLgAs8Q4ibDld9YaYuEYDr0kHBoQQpkN3N3kTLNPkeHt0Dm19lYuW9Ugb0jdUSgSa4X19okfHTjUWRYk6RMiCEQNSZUAii0jkzTt6WCNd6SDcaERiiiJrwi8fuLtJHpLT9SY

ljifntS5aRpDEaGaTKfjwjdafIcz4RkIQqIcMiqTdtxgOj5A3jfjL6XswX4SwF/qV4CtgclS+UV7t9gAHBWoDsAwoDUBlAE/STgURUZfrDTgECB8P0B8wJkPnABkkf4ZotRIA6djSNAsgi3gfASi6oCj68dHSBkU3iwURgTYkXkCXAAgyzUVh5cCS7SSEvTSA2iNSJrCQT86WQSKPhj8leBIAyMYuijMRhTHiRriuLv78acfPl/iWRTHcYFjKKXD

YCThnl5AbTj4yU2TuyWH9zTiziPcbR9/fiADkmVAAVcYQD2sX4y7iRbj3MSBcK0rVjlQEVNtwK2lH+NX8QmSRSZsQ7jbnECSXcSFivzhFjq/vADDAQbjSmbAAFLmwBDil9BHlqeSzARicb/pPD84NPChEQaS54SvjhDjmF5aVQz0sT4yEyehSCmZhSimcjjffpdZgmfoCFUrUyASeRTImcFjILkH8amd4TgZPSshplkz3ceFj0mYADMmUJiwTkjj

58nkzAcSsyAmSZinXF0zvphUySAFUzRoTUywmbNiGmc7jomUcz8Ma0zRoe0ztmaJjUieJif1H0ycgAMy4CkMyDARYCjtmMDD8V7DHqSlggEFZkHjAWN05te9dxmMN74dXTb8dwybaesC+GZsC5rkDSQjPfT6ABQBc+LGAAqj/jB9n/jv3oz5ogQFcVfsgdICeXjoCe0jgGXolQGegiiaUYySaXpMyadPSKaRYy28c4BrGZ3jKDt3jvWpTBeZKgzE

fugzh8ZQjUUZNScGY0Cp8TvjyrjFjAorwcOgdtTeSL7MVLNeUxEaljSRuliBgdPjd8XQztLliyAEPDw83hLA3qde8h/BbSgqjXSTEb9SprnbSn8UlTewsDT+UZUBMALGA8+CMAdcDqBnAayzNrvIzWONq1WkM8jsBFIg0eKp4JIk8CAGX3SfDuqi8ae8CDGbgdiaZAzOqVKzDUcMiE6ZYz5WfPSlWf1TR2BMArUVnT7fh29NWWxYVfAXSPGX1t0A

D5jfGS8zRcfcTHiX+SXibrBpwOsS6yURSK2gCz6mW3caSF9o6VvTIIVuCTJAF4SEmT4TzYCbdibDxCPTu64gOiETtoVaTbsvnJowLLYtskGSmlnCTxisW50ZkqZ0oJb1kbIhSsSeqSwgASsJ2Z9DjVi/ZDYI4AkBmX1lCXn0I4M4AeXAn0szg6YLwAZZ2Hv+DP2XClXiSpZJ1M5CmXvq8MVjrBRHOb100fkyh2YUyniVWS93ufMgKYpjfieCzEcG

xTqHNv1sbsGAsoRwBPmeUzKmctCrHHyCl4JE5cwVDZemZUUEWZpjBmRUSP1phDywUdDJwcS5iifxS8+vKS7KfdwLblZCP1ObAFABdQFAKX9eupktzln65Swe+tqNDOT91HStHchFpOIUdiK7AQAI4Bd0tXKTD0lv6BTISbY0IRhDeKdhDPNIzQZOfvghbKZyP1EDIIFE7BJ8tv0dYJ2TQ8kmDwBqSTBHPbBbpp25rAOrdROngAz2lZyjrOK9d1Dc

dyeizlt7OMVNAAeImiheTzXEiBqZJBSp8m3YnQWnBAKbx0nknQ5jpDAo5ipl0RALWpabE04fgOwtD2A+1lVvjDBNoZpEALw4r2u4Bx2WOAaSMEAk3Fvd91HSR1ciGp49LAM8OUeAIwEvB+7Ck57ID6l3QYbAlHInAVXL7cp+t3JJ1mISFWrUNwYdDC/5LYT/XGuDbCkYCdYEdDXrIBTeHjaB/wpVluuSIADnod1hAMU4o3OyDQHHBTcUrqS+PiQz

paUljZaWvjbWR/90sf2ylmYBjXmVhSqyTUAP2YRTiKbOy+uluyWEUuzwVuJtV2euzmMU2TQeW6Yd2fJ092XStD2ZiTmCf4U7smXJz2RISYSrR8b2dty72QbAH2QYBpCs+zOya+zYBv9yJwD48a1D+yW+nT1/2dGSYHL+CQOcewCVhBzRLFBz6YW0VBcHBz6bt2Ch+k9Jh2ihz4CifB0OYjhNCVhzVmThz/yUSUrqfhzAecxTpnG0zCTlPRyOWY8W

YFRyaOd8ziAI/wUwZ65mIcS5mOVtDWOfCzhppxykWdxyqiWWCgsPxyGBoJzVycJyNnKJy7CuJyH2pJyHVNJzZOfJyBcOJ12Oipy/5Gpy/2s5prNlpyE+jpybsXpyp7LAM9wEZzywF8k3YI5yHVOZzhYZZyZBqDZbOX+tRiInzAzM5zwgK5yCAO5yLYJ5yVVt5yPAEfBY1gFy5HEFzkaCFyJIMdI0+elBIuY5pouVXzANIxCEuV+Ikud0SQbKlzWY

dyVMudIUcufGSC3AVzJ5EVyXpCVz4+eVz2OYZ1abDVzEiZo4E8oKCmuejcJ2W1yQgJ7BOuZ5SeuXHoa9P1y5eYNymwMNzQoRr1xubDkQ0KzZpuYvY/IBGoaedwNFueJyVuR+TiZDDD1wbeyKwXtz93pa9DuW3dOCTvymXGc4LufSDrudO49+b5TfcXT9/cUfiJxnHU0DFt86oPMChAiZdNDuSz4qXHiX3vbTn8bSyFrv+BlAKpB7AHAAfWdnjU3p

RJVgCn5tWlIg5ArsQU6jTVkDvlsQrtoygGY1Tq8QTTK3uKzy2aTTa4c3ijUfgjlWcfsXaX3iSEW2yyER2zQArTsx8XvT0UZnxmgGxB9ykJAx4YOBpwDqBJuvuBGgON0+wIV0LwJSUZtkQylITPDJmSIjpmQvD18WljN8TgJZBd+V5BcFhFBcoK5wAPD1BZoKW8qFg0WQfitLtYCYatsiEqktAvWTt8Car6y5qisCA2TLIEqZgLQ2ZXEFrvQBBwMo

AhEl2B1gMAjZGTDS+FC/gIdnJQFmJWDXDqNFEDtVSMacB4GBQKztwroyNUX8jx5qKzI6SBlqthWyuBWYz9Ylb80ru0xvguqylkUPjO2dQle3mOMpBcshCiiXcp6MhB5SOpUp4FXozTPusgBsO0HKiOowBuq4JCfdziGcpCDBcviegftSRPklAyiqKVuhYKQ+hY5VAtB5ERitPYHemMLE4BMK+7lMKXBf5S9aSkFVvqfiOdJnF5BoCF/BbTNAhT9T

ghegLzEYL9LEY7SI2b3t66RMBakQNE03iChyBR4jfaUfoe6QVt82e58ihekxMmCVV8GaULK4VW9wkb8Cp6VWzYGa3jIUfBRk6QaBovmnSBqf+4hqU4zGabnTXGV2z3Gej9BQpsjBoPuY9aO6IfBez8pQncKHtmSyfhHXSuEFFIfhUBZqvsBB/hf/FmkRJFGvpjTmvvVTi4f4jB6RWxF9iPSxWWPSRghULOBdAy46eYyIUWRZ0RYgyU6Q4jpkT3jV

WZTM4fnZMc6aNT7UW4zD5tgy3FA/tGPI4NZJqwzthnfDOEqSyuGUyKFrn2A4AGw0A4NOA/BcQK5GUkLYmB/Td/Gbhw/NsAlAq3wYPnmzA6f3SOkaPNy4eKKyhW5kOqTKK0Cd8NXrnKylRTYycPiFkFCKNBM6Xb9S9jqKXGczTSCQaKnUezSIADQycBNMK9BRMzSGYaTyGa9yTSfMzN8YWLpGdIcj4WkloBQ/tDaCjwmqLYwbdsRF6RRod/NqgLTE

c8LuUQ7TsBSL8IANPBo4EYAMRESyU4S/TxUaQL+RhJM+5ukKVoP0kHAdkLsiFdANwoGLGBUt4kgfoyKxnCL2BRPSjfrKLuBdWy4GbBkExYqyofhaiNRcQjydubNB8aIKR8WR88kbMY4YAmkDpvtZBAKdzcUiVzVTAAASYAD9yVBof9KqYjnD8VRAL8WiAH8WBqRcz/iwCWDgYCUvUUCXvimxyQS6ZwnswFLEAOCVAS2/jLWNkD6sAMDIS5YqhTeN

xhaGUF9AA6YyQxjp5oVUwXUFNbvikiWmmP+QUAZwDMABMT4AVUwvwMlLggfzQPqKvRASiFZbZIRY8SvPjEATQDYAZAD5dWBThAdiWKABQBquP+RfAZAB60RaDySkIDMOUXDcSs8CpPforJOfADmwJTYaVO0oSlNTHkAGSGmwXNQ8SpXLOlZAqoFNABHyQ6yCU1slG4SyWO9B1TJdaASzwbTbkQZJyHsfVjrgFKZogMtIcAHiXUDMeR9yAeRewA1x

MANADq9dh4YgCdKuS2e4e9DtRD5OBw6YLbEcAGoA/AD+yggYSW1cye4n5VnJu9QMxn5FKX/9TsXuzaaYL472ZPcshnJYysVzM6IhmksCWoSnfllHQTzYShCUgS+iXLFNqXfiso4wS9ZBdSxCVq8IiV5FfqVQSx+pd2TCUjS3CXUgfCVdgQiW9SvIqMSsiXxQiiWadfADUSqSC0S/fArSxHKMS3h4sStiUcSriXhFHiWV6Q9QCS8TZCS1yWiS8SWS

Sr0p0kWSVKABSWTyZSXwHNSXEgFsFaSoMCC03SV3WfSVzwQyUOVU8mmS1XDBAfKXWSpAquleyXlgxyWMkoSl0wVyVK5DyW38LyWvFe2C+Si2D+SyNacDNIquSsKU+lCKWDyMgCd5UgCxSn5YSvfQAJS8opJSoBpH5cqUIANKXoODKW6c7KXywDZb5ShfnIbGRzoQ21xlSxDoVS51nuC8MaQoDET60cKkICjOZVRNlEhw62loC22kYCkNmA0wRnhs

r3aSAPWB9gRcCtQNQVionTKziq+LFUvy6QWblnF4oK65CrGn5CoOkD0zA5NUmvER0/cWSi98ZRiyVlVC9An1VTPYXinAnQ/AiitvAgkO/BybZi/UVDVNml6syfEYtR1lGs0ZmKQ88qzCssVTMhYUUM0lHLw/VlRyw1mtAk4WQCgKmnws7bkzLOIVUm3akxKulR4h4WKyvsXKyl4U8o9WV2XHgCggP7bczA2XqtWcVzIk2XFSNRDPIxQJ5feso1Uz

fR8s5HYwEoVljzEVktU52VbRDgXuy48XVCoya1sn2VNva8VZBfFk2AwOXtswkUhy4kW5iwun5i4mVhQYNZ6c5GyWbK1zUy8nItEmlyTSkNQQrKFbkwg17QuL4BqLX1LNFamV5gnY5OwdXppOWjbwONJ588nQr05a2B7rPME+AQZze2Nmwz9VIpHOC9lOwB9oDCzBrsaazbZAMwAVc+ToauX+pAKY8AuwNe4vqYdoSOL+WluCMA+gvrpdqE1zpObb

IbWF2BdqZwCodNNRDC0YpXWKdyAQKUC5qF6G/2Q55mlZhzeRA0rx8xDl82VBWvWLaU7StgB7S/EjJtK255yDqGANZrntcjSVglfnJ5FXNTbgFQg6wQCBBSh+YUOc+TeaHyJGOB9o7QruRD9RWzMS1iXsS7c4k3QF5P8F/gquA4VQUvfmJ6bgYr2NW4cAS3Kb9c+SuggNSIAJUAUgcopSgthUWlIJyW5ANY6EI5zewD9T+SwfJdgdcAx/NlwKAP/p

caSdREK4nHmE5Lol3MwAcE6imsRWHKKbdO5j9OTTnqBUAgLEBT7Lc+S7yqKUUyrB50y7yIMDb5bjtHnpkpQtyWaZVLEABhVT8tfIsKseSmbWHK2wf9RuKnzQybA8Sf8ydnAU2l7SgeUiROIsklqByqicirKq4V6xAgS0EyOIpUHiQ1ZUaPBzUvUuR0kYLij2UwouAQyl8vE+XcDO3KsfYkCV2V2B4LHKU9EluBjFLKVgXfSmeabZWoAIqaIDEHko

RTzS7yvMFHyTsk8EmIk1ct0zNrXCA7WQpypwSArFi+OX6CxOWGC5OWNSyhnNSxWnPSmgb7yu6yHy1Un72dXo7HPMEXysTZ7y6+VSbThyKSx2D9ZdgqDQ5+WYk1+WltOxwfyt1w7Ib+VWAfGS0y9cEAKzElAKsQAgKhZxgK9NJE5CBUSEqBW5dPiWwKulYIK0BycAZBXhMgBzoKhACYKgOzRaHBUUqvBU9yFF6EKjRwvtdZBPSMhWZAXACUKurrUK

2RXT2OhVMABhVjqDgDMKj6RxQ9hX72ThW02bhW9dRBqaOfhUt6IRXeRGHqiKux509NVwkQ6RWBmGhWI5eRWKKttLXANIrHZHNwaKnKIW3HRXFQzRzHSwxXJ3e1QVuKe5mKsKAWKq2xWKvyA2K3ADoOOxWAORxXPSFxWEgUiiKOCdJeK8iURdZtoXFfxW0Lc+BBKh1QhKzJxhKr6yRK6JXDrZAYeqrx62uRJU/AZJXykVJVmbJE7xTTJUrPS26LwY

s5arfJWHWemRFK8mVXg++5lK/ewVK8+R49QBy1KuAD1KxpVlc5pUfSVpWXyRnoxaLpXV6KXq9K3NSAU28nrLDHkjKiknFk8ZU1AHUD8FKZWddY142dMeAwqseQLKutxLKj+QrKw9hrKhXAbKs9TOAW5Xq9PZX+gA5XUyZ9onKrmUg2UCG9LBJxckxbroOe5WP8JAZvtLbp3q2eSYkt5WMkj5VKrfsHfK2xY9nKrJO3QFXZy4+H0Ms7aG0SKQXbeQ

b5xeWXbpR4VXuWTIWIj7afwoRlv0YFyLgZgDEASQCqQb/GuixIXD7XXSZwuZB7QBZih49AzrQQt5tIyvE7iiK7/IsBk6o5AmHiyJF7RGBnyihuEOJBI4ai+L53iioFoM9eUYM534TUvt5zKVGgTATbaynZZSCwmHSlqIzW3gO8Dk6acBhQTGKjMjal6khOV1S8sUNSkQ6LwjfFpy9AAGahcC3gIzUoQ0zWi5OcAWa5ZTUgazW2aw+F3U2lGBUxn5

rfBjhjAHN427W+Jdig75xUyuWUs4NkA0gOpDi//axgQcABwYcAJhYgBQVDjV+7KTzr8eGlyUfMC18HYgt8P+nFsETU402AkiilgUlsu65lsmTXofWOknilEW+yxeUEUFtnpihH5NCx8XasnTXtCvTVJQI+QwKjYXmiBQCU8suSOAeUhhc03nOANxp7daIoKAPPj/6IFVRnJ/5OapOVqQlOUHUw+TlgqbU0kdSozaubW58mkhLa9jlQAFbV8INbXY

5TgAbarbV4axsWYsicaXQSrj5gCEECjdhKlymKmMitsKpa1+FUs9+G0apPELXUMiTaNkVq6UrXPGRz7B7U3D/uLRk2y4MXDy8EADCWEBDCD6khI8BlhIhvGehQZFdahTVnijBLfCjEW6GF0Y1+VJHQ4SbSNCzenNCsQWj49L5u/a/Aw1EbSZs04AERCKlDXApIcM60UKyjlHd7f/bQ6wBCw6+4wcirGCyTUmpd07IggoHxFfIpgVV4y6rljCuH26

VRQSsx64xiht5JXTPYU65UWYiqZHYiptmAIBnVEEzTVasnends0kUrfGywmkKmA/0mkWebTdLka1GqlfBa6NAHgBVABMRjgEYDQjZuWm4L9wu0k8ZzQWZCI+fVqrim8abitHXK6sTUOy1gV/fF2UA/CJEdauTVyir2VxIg3WJixuHJi1biYhc3XOM1vxaawG46s3TWviiQ6BJb4XGsuOU7awOL1Sl7muakwV2smsXY/avU+4+zY5ys4UKHa1i5se

4DXQE+lGXUTJJa6PGrAilmg69LX8Mmlm1yha6SAVqDAuGoDgEa5HP025FB60rU8i3y4+gd5i5WGRKZxOyy1a4cgB7MvGDy1SaNa+2XNavcUa6yMXSiqeU66kL566rPXOQSnXW/LIIb8Nenai21G6ivOmbysOWSC8bWVAc0QEc2BXcpCABkklAB3OdWwQAKqY9dGonxRZCi5qfclJwNACA83NQgG53HIAHkDWmMA3ILNWzWmTE57q74m5qGA0XE5C

m5qfIBoGyikYG4HKgG2SngG3A1QGo0BkpAg1Ts5IBEGx/jPs0g0cACg3WmKg1YG2g04G9sxQG/9YA874lEU1A18GrIA8GiA3IFfzF4Gtg0wiJCmnMcQ2NM3g00GyQ10GsTQyG1exyG8IoDcoA0/E+Q38c4yCTgW7VMGr/koGlwCP8cTnGQa2DFQR6BmG/pUg4yw0KGy4lkGo0DmpGqX4oi1mEo8FVN6t7kK0zfGAG28nKG7A0QGnQ3EGr7RwG5pA

IG+WBcaZA2iG1g1cGg5koATA1qGzJoCG+5z4G8w2EG5w0cGpQ0cAcg3JG1Q2hG+g2VQRg0T9bI0sGww0kG/I3cGlI3UGko2CGzE5zaiw0gGxo3lqDNHaGoQ25Gmo3KG9A2pG9o1XwTo1WAHQ3ZQg/n6GsQ09G1IbGG03kOGiY2JGnrrWG6LR2GlU4VGxw2wK4g2KGtw2iygPETjaTz5wY4DwCglk7fNa7Esq0Vlyq2nC6+/FpalWUZa7wFZa6OFC

AIwD6AVoCaARcCEAA5GJshuZ/4mmmcswvGBXXll1UuWYNUlXXCs5qlOyq/XtUm/Xa6zrUzy38aP6+tlXivPX1CsZnv6inZDay3UtC8QWs6+oF+JSOW0tCOZZy2OXjM81lhReYUHaiFWpy6oYOszOXDA8LWcje6lRag2naQfVCWQJtDHmRAVFay0Ue1cuVXGnhnURN+F6HMXRLDV/HUtX4CSAc5hsgbAAgoQPUeXH40gIar4UCnSAZCyFBZCuBHwo

XNnH6tA7bilBHiakoVjyyE1cVdrWoE2E2ey2eVys7PWXi81HIm1Vm7CNE33ixFFf6okWtCiQWGi//VDwARz7qTQ3idRgaeaGuyeuRYDHSbRaxtYQb5cnNzjCydTv88cyeaByo+wZOC5crNQXdZ1UQrZRXSAKdZFnOSXvSpSW6hcYC3kj9U15PlhnzIDbJwI+SJEyzSoPX1YXcink1k/dWHWZg0DKl9TduJx7ZFYDRmSC5WTbHd5dE+2zDPceHfnb

GWywndWtE7d74c81XN86FbIRCgD+wPQ1xg2WEmvXNQ1E3pwncqCUfQhuzzmi4m9OaCmWgWCnk8p2DbqVykMDSAprm1IYhmG+7muc7mh/WjpeUoTlLc7CG4LUvnjmBM0RLcTl9mZjH7icIA78oDbtPXe4F2PrKAGhgZtG/g3KYl1R4GtAB5dSXIyDfEp9ZQCkMDe6wYgM9rCuYgCgWm0HgWvikI9ExzUyDtZegJ2D1mqvR2FZ9mHWY0BMKg3rEuGr

nfE9xYdwEUmsld6TcInJYUaPdaaOWMBK4UgBuknwnb9AFWpPGBxuSwMxMAH4ARqVlUQ5JODRmFQm+5Eu7Eg+UinEvPn6vUzRuKnNVqlJi1Yk0STdqTqH+QqKWUAD9QF9czbdFeLR/cNs2g2MGVspC5YBqbMmvqULQfqM/I/FT6SCQ5mVdLacwsKvEGUYs/JSIP9rgkoAqUgF3KHsWe6ZSvZ4f2ORUqWqbUfQ4dqxCHWDRADuDrghypEATeCEqjgD

FQQrJamSm7MYyTTFkmnmkyBZyN8zB56AOABQbRKIcAPKEJ9eSHJhEk3VXOYV+zIwU2sqsVQqzfFVAT02Rwb027k47qg2f02/2QM1ZLCNbvdMM3PSCM21qKM3CuZOCxm32C99fjSaOPcDJm8Tapmp2xDOUs6Zm2I34AHFXIAHM15mqVzJwAs3DgIs0xE63maYMs0+AenKVmypYErGs1kWus2VGhs1WuRRzNm/+UJaNs2AODs34crs2Vmyc29my2z9

m+UiDm86k7vUc2wrSTYyOctpngcY0zmwXa73Bc2+rd83filc2cuNc23mtOCbm5gDbmkMn2afc2HtQ82/w2oYnmz+Xnmy+CcEyQHzaypxp8u80fPAa3upXinHm/G1fW4G3Lm8XJfm6ly/mmsn/miQ3pGoC2aAqA1IWzdUQWn83oOaC2HtWC3WgMIAIWpm0oW46FoWqfqYWzgDYWo624WowHnE7CEEW8o3PtEi39gsi29rCi32w6i3nwWi0QQpyqJm

3NSMW3i0sWs5lsWgpYcW3tVK5Hi1mq/i2JFZc45ACWEiWwDrcwuCmq9Q2FZq9xVOuY23UyTsmKWvFzCcq1zxQdS2OlYdpmFQDRO5HS1U4PS0wFAy2UDIErGWkLTvqB1TmWjtRMuKy3Cy8h5sAWy0fSey3GYxy1faD3o10OIqNdX0qMyml66c7y3SgXy00ufy2FqIpZBWp6zqOH6xGS+tQRW4+VVKt9m5qGK2v2Z6SPmxK3nOCjQpW86QYPF9QZWr

K0U2HK0MacAWd6/DUusmAU/0nvSr03nVGXFlmfUi43+syjV/UyfXUsoX4PG0U0QABIAsy85jEAfYCYAYfXFatOFSBBHWB7fVBZsfjVNULxSVcczLCamPWCiwVnMCkBngmtgXJ6n4HP+StnyamoWggl/UgIcVj2m9TUaszE3M658Voo902ear7QLgKU4OEV5Si5YnQ7PAGF+a6kBOwOB1flQSCHlfzSLgRcC06QOHrUwq27a7w27UlzWzMyFX7yDz

UQAUaBsQSB0gdRZQwOtADIOhB1IO6U4AwuQVoO2MAYOrB07GpsXkit5hWZBZiWQLlrT2pGozVEfW8mu/H8mumI0a/Q50ajWVv0bICqQYIEXMbrx5UzjXb6bgy9y4sTAIEWJk0GbQH60vH8iqAl32goWFskOkJ6lrWhItrVqRI8V36gEG9UhtnU0n+0OM9ekM0qLJOmjeUumnE2ZfLxnoAf0yqAZrnVLYcHMS74q02R6C0wCPDk2f2BGqnxXcDP5Y

KOHtyw5OAROwMLlRPTZbx8wIBhc9BYy5WLqhaVnKzLbbWP/evXOaxvVEOqk0hzbx0NwGNUWaY6WBO6mTBOsBw6aPIqsK/NWTraJ1NmhmyQdF/gJO46RJOoAYTONJ2Kgh0CZO/lxK3HJ1vam2p5yoKnaQOqjWQYsB2mgR3t6ue2A6m0XA6wNnhw1WWZamfXDi6HWzQCXUqjYfZRSMWZGhOX68i0Pa90oMVx63U3X6exC36S/XYWVfap6k03p6knWf

2mFGL01UUm6unWzQQvUEilx0l6moFl6sbXYcCcYctGRIsM+YGjQZAU9i20XDiqKzz+KpymHWU03oXZ0zQZeW0SVIzM/IsDFgI0jzYKZAzRRXWAM8EVFs3cXq6m50p6xEXv2jPUjlBeU2m1/X9a1eUiCwB1Pi1H4vi935zGXeELgc0TLGY5SmsralFW0FXkmo0mUmo7VxRVl3Vk+UQcOj7XhjbKyUwEqi0TGaDgup7Z8m8fW8M5e3g6yR2Q64cXdR

VoBGAFroRseF168QbyeXTfXaQY0J/BS3D5wkvGHOvR38sgx0Na4eVhi7VFdfaTUWO2TXE6uE3WeHrVUun+2CCtTUD4x01Zin50oo0bXdw0B1pNfa11kkI2AW0o0eG3QXAq0sV7asFUUmvw3lWkh2SI0N3JkpI1pGqQ2RukZ0nbMZ3RataC761Rkyu5OHn0+96LOyrwhC1Z33G9Z3/7XAC4VGzVQAHgCt7A+0b6BF0qO79z7OtQQKIeIBVoNaBTeF

/ap1FQJAmmfY6Mox1Nax+2Oy5+0Ty401QMqx0z0v0JKa9OnMov+0+ujTXfOq3WYMm3Vs6jg4shKImc9EbqL3U6T+BXB35O/bX8uxN1NS5N0hzXsl7ujAYHuxgBiuh6kw1TuaLhbUbctL+hyuzvYKupWU3G6uWDi6t1VIthTx+WoLO+DfQ+vKQKx+LgxI63in1a3MhsSB+1gmid1J6qOla6zIHTys00NbL+11C1VkohPEWEEovXwtf10s0zd24mso

C7BQb6WSJySd4i8hOcHwSHABRgUHU3zXBC3xm+a3xxCIKTRUF4K2+FIQfBV1ncgEFCHDXOGI1a6Afun/alCBa6tAFNw7ALWAAgc2nNupJStuvTLcGMYC5jRGkhUVYDRSS8bViQE0wes516MvU2jyiE3Eu1+2T0sl2POil21CuxnI8MSr947Omf6v13ru7TVYMvMURyiADMO4SCLS/17+RfhHRuuvX4jU90Vi893EOlDRmktz1HgDz0Pupk30oqgI

goNoC8OmV24/AHWW0he0Vy5Z0Vuu40CMsNkhGQcB9gcHTbgLsDvu8A4DRBT2NxaTyXNSJiLQXpI5ws0Ko0zU3DJJbAEmW+3AmoeXwekeVP2pD3lCmt4zu002xixt4Wev2WWyT53OO+z1YmlnVLfbeUueoh6KvXlangQQZIDHv7sA+RVVAMKCtDVAA6mA2xiaA2zrmGLFm6zw1S0/B0y05baHapYWVASb1GWM+YzentpzesaaLe5b3k6Vb3re3zCb

eh6QRe3N3MmxcLFgJ4xIHWZ2i0kt3FfIXWiOxV0CmsHVCm+ryxVAD2+MZHiN0wJju0lumxkPV3r+fCIgfX14tI5eWo6613o6lr3ggMUX2ur4HJ6hEVv2j2U9emx0rxY3XL0gal4KLUXomxnXDa63Ukird3jOzNkEUbBSD6zQDUcN3VKDD3XDi05hhQZIBhQDcC88WU1gVKQLHjDKrKm19CxMEbT76811DuuD6404x0X6ol2khI01OutPUuu9D1uu

yl3i1HvSDe2cr0ukbVOe8b0dCy5AuqGNRkkvNRKaPwLGsuLEPcxzX7e57mHegV3HeiQDjmd1QuqM31faE30uqS30d6o97vax93hjNwy7AcTAs+8XXs+4UYA+790T6241T61e3/u9e2EAW/jNAGAAwAbADL6mRn7jfWTFewby7AdUbVUPaCAILYizIU4A5WZ74BirU1ufEuEEu/T1tewxkv2wnWUhWd0ysona56rX3GGGz3CCzMXF6hz2l6wN3hyo

32wG3/DS41dQMyXJ1msnl1xuvl0Beop2CupKAD+wUE6YCRYhEl7360+lGRSaZBiIB7hvu6mbCOy40R+kHVKu6P0r2t4Vr2p2ne7ZHjJvW5hcCHmIp+Qbxq/QPbSyifZaQXF35sroK8cUE2texD21+5D2TymE0PO1129ezD2Wek0g6+9rZM6hl1rI8vU7kMj0yMCj06+KRj7BB/1M4c4IMe4LgsezyRoBmIQPBLj2GMV4LcekD1vekqQ4ELYAh+rO

bcmh3bJeq43Mi8byi0pukw+nmIWuxT17O0bQ7ItlTHO0EWnO/F3y+sDDGjGEUGm4l34+kz2E+3XWU02x0vO9P0TfDsbp0vYAgBx37+jX529+v/UAu8MYXjY0gMGGV1p+8kCJev1lA6vhLDizB36AZoAsagOAuilfVJbZAjThKRC5jBSaRlHLRrAWBEl4lEJo+pr3329/12uvHVSa8x0fjW/Xde4QPzupBlNs8SI2TRx34iob1d+kb3AO3VlG+sbZ

sQNYkcu491+e+N1nu6f1O+9ADRBhcCxB7N2Mm1730opqiLMKTB7I5IAHwsgPBwijUpep4VVygcVYCuP2n+mACkAVSD7AVqBIwSqWmB1N7mBxF0Gu39z0oQ4hnjM0gnAJtBf0LT0SRJRky+jX5n6zpEf+xPVf+jr2A/SoVoeon0iBpE2t+/AmOMvD1fO4b1AOxl0gOivXoAHC0DEqN0S0ksWkmsGKT+wh2UFCREhzXYM/E5f3nCmyxQSGbS/BGV12

7LQMBC3f29i1L39ixKlqyzL0LXc5ghAVqDNAc5jjAIgUtB/KltBtt3I8Dt268bfwU0M4BqITNkqedU3rhRSaWuk/WGOuX1juhD2TB0tkHilX33OtX3zBvwN8C5TVZBQjzt+jMV2esIMbBiAP/O5l1wwWj6Hwfd2m3PRYIXI927ex7l2+hvUO+wL3FOr9j0h3JyMhkp7MhoiCZByLXZB3j2ygSsQHAfcxJHGWVTNZIBNu4oMX0/71vB8oM/uyoNhC

49JQ6wD1XQYD2nG8VGOiQbwQewPZQe1jhOB4d2wMDnwtetwPlbbEN4++v2rJUxnq+gAPPOrD0kh6z1CC8kMPivX20+reU9sxwLQB/YKUelnDUew3y0eo3x2JE3yoBpj3PBPRbRhzahYBqLgcewKSO+d4L4BqL2QYcPyHma+HJAD/bzOpL06Bifz/7GhBjgX3VGASQDRGOT0uIsEOMByDAqeuaBqe7JIKIFHiDBur0+gEYOJA850K+8MXjy6YN3Or

r1/+p0PE+601a+s7wyB4OWEenMW/6t03bB1z2WCtB3hemvXxBhbb+e04OiHdzXVDUL1OlfViee+sURajFn++rh17AGaC66EF3DDPQYiep+Ffu/f1A+5V0g+gw7SOn7iwgSRnMAVoCSAa+qymw65SBLxQJ+CCyB8KUMZGeqSIh+r3Ihq2UCi5wNohsYOhirVHuBh12eBt2W/+/EO+B5v0Lugamb+yn0Om1d3rB8AN/OoN0zh28AQET6yZMk2zLgNc

AvdIQaINWkEZUHlgPWdUzJAZ73be5Zg4jPJ0JBk4OFOs4PrhkOb4R7JxER1uwkR9cCze3+qURtXhHgFbr0Rn30Ni0Z0r+8UPcGTT7NsmV0VhxUOlu5UPkKQH3iO14UQ694Ve7aHXh+bZ2fh6cKI+zN7I+rxGo+k52MCzgMYhqBLdImCO4+7/3Tu2YON+0H7i+L6qk+2nUpi8Pxjh8vYTh0OW37Pv35Irh1MosYCNoWmmzOka6KRv72lBygMLXQgC

tQU5hdgAOB9gUgDAh8QOpw+uJzIYX2Qh6aBi+msIx4HuU6OhgOp+dgNbi4eZV+kx3XOpX1vDPsP2RnwP36hYPDhmZEgIY2W4eoOWeR7v3yBg31+hifHG+130ZZQTQW++IJW+pcNdAlcNsRtcOmC0h0u+032yU832e+8gbXBnvUJcSriFgL+ivu2Z07h372cM5SNLO1UNR+391VB74PDiowDZS4cDjAXpnsakEM8xasMlewsDuI3BhVlJZj/C74LZ

s1sO6O0CP6O8CO2ykMXa/bA7WR0elTu3EP9hxCM1RwkONsunXw8DyM5XLyM/6nyOKB2kMSAPI3BYZmxL+xcNsh231kmkq2+G5IN9AlTDwxnTCIx/6RzRhhmGkGirZJVpAyu295hRjaMRRvf3vBioOfBtZ37R0XXahmgPEUK/03pZeW3+xU11kQWQFKZ/2nO1/09BLgOYh0x346+EX2h35pPVD+3mewAP9e7F3Lu2z1ehtd3hBzYORBzlgBhvXyhh

w4LwB9WOdARAO+CY3wXBRj3eSdANxh6OgJh5IQ4B7ANmMPUMTjWZCLQLYgHAEP16fPMPaBst2Fh8H310r9DbOtungh9+nXAkvGVanT3mR8/VgYLz7h0yd2a6n/2oehyN4I1K5Yisn1NstkJyxjv0Uhgj2tRgN3tR23VF0mywVifYhIhAoOFfCmOC6qmNie4cUAgGoD7AIQC/AFZRX486M3pFWjtB5F0YEJw6sYBjj3A3uUFKRwOmR2PVBx8YPWhg

FG2hv6NeBhCOOhgkPIR/wOgx5YPBB1YOhB1ONKx6kO4R2GPoAV63y8lrlxBlGMgqif3oxhN2Yx84MykZeOBJSnkEx/GJW4UKk+vEP0hA52MvBigPUx7aMH+3aMahsH3r2/LWHNQcBwmKH0gIuuPw+6aAdB9uUBUIFD18CaKlUs4ACxApT5Rs0Oy+yCNfRm642h1rU4hoeNRx6qPWO2qO2M/r3VfJqNryxWNUhnCO+RmcMtGhI3hu9Q0ZGoY2yGqA

37B3j4zCjeMchgp1chneMcRmUh4Jqo3puwY1aGkY2kJkUP7hyL3SRzIzWQMKnI8GV2c/Hf3XxlUNUatiYSO4U3szL3ZVAISgOoaBDKCaGmfxqQI0VB9J7AHoP2x8FASxHR35wECMFRvIXo+gtnoh4ONCxsqMF+V2XQmhBMDh0eOKa8eMpioyJJxz0O+uykPYRhQPThxeM7uuElIggUOBnVkM+e5iPLhxINT+9iNjR6oYRYjxO3uiF4t026kMm0UN

SRmGrZsWaDgoZeU3bZIAJsy+P3C14MqRyP13x9UNfB8IUbOwD1NoXUPcRWDjgelNmJ4E0O8xrcVwe1wPQRmBNmO/74CByx2IJud1jxokPp086J2JwbXU+70Mbuun0ke9wRtm3IGwBzWPcmEMPeCAIT0exVmGxu4I3BWMNGxzAO+SRMMWxxZNWxw3CrfRIDpBVjCnhuUOLA1JMMi12Mrjf/bnMMcCNAbACtQf3UXx2uOD7euPgh5T2b+VT318RsOa

e9yPaexr3mhnuNQR76O1JkWNwJ+CPmJwGNIJ4GN2Ozb7gxrelpxoj29Jjx2l0TcMLh4k3rx2N1UJ4aM0JwJMt60h3Qp7cNHx8Z2I+BoS3AmV2Bw54NpJoRMZJ68NqRmuUMx6OE7NYgB8BMcDUcwX0foL+NKesr1+INuY2GJZgzIQ/yw/Z6POgECTgJ0YO2umpP9x2BN1+4xmN4v5pmejD0uhyz160EFNgB/X3EeyFMqYfeNkR7LqK5L/mxBB73EJ

1ewG2ISPUR0SNfeRiNcuxfHFWq1miIzlZYx1GiKpgSMURmMyqp3v6oAdVMsJhQrapkSMkDOiMYp6LXjREzCJAL72yhl2rJAW+FnGnk3pJraMiJ3Q5iJ0H1StD4XO0z3xexulPC+o/WGuyX1CCaTyBxyv2CxyyNq67sOGmqUWdeqqMWJpCNWJlUXJRtUUqsrIL5R9BN0uzBNOJjOP0+6LUgoFSWdJIT2GIwRMFhg5PRwgOCK6IQAJAbcBTERR0fxw

fbpI/SMZRt5iVgrYDbACyBtxvKPthl4EGJ3uP8pyTWwRn5NmJkFFNJpv0FpkGM2J1TXWo+WMOJ2eNYJ5xPOeo30TRt31TRj33dRzQ3DGqKlVSvODW+ihPwptGPGp0q2mp3eMqYI9M9R6aNnpjo3+Yt1PMmk0gnAXh086n1OxjZIClI5tP7J8y4fB0IU5JzUPDi5IDYAAOCSASQAU4GZqXJ7+LXJmsM5+qIE6QSCjZxfOC/0kvEDytA7vJqBMSa2E

VZp0xM5p6MUrpxyO8C9dP56ymgdJjekW6ytOypiFOeM0ug4xkFbLkEf3IxnxNj+vB33psIJIp0aMop6oYcZrOjcZ8SN7htwW7G40U1a3MAP+oWRyhz427J7sXyum+MhpwU1hp+8NUBmsqFJkJgAEr8Ocx3Bjcx1oI6e/mN8pz5MCpupN2h4VNE6keP5ppyMoJ3rU1laVM0+npO+hzOPSyNWPHBbXzDJwCajJ0oC6x8MMuSFAPecaZPMek2MPkG3z

LJmZNGMS2NO+a2PhjPoPP4Qt1vus6MBp8gMtpo77uxlkWHEL2O9uqQK+x+cXgUf2NsB3RPvRjH3v+zHWDCYYTGJuBIC8eBPLpvNNAxlpNG66nVrxVyN0ZyeMf6hWNYRljMeZmtPMm1aAYmRIBmi0F0R4lTPJa2ukLXOVocAFy4AhkwPJR6cWQ8LYhwib+ONx3Bgo8FICTaAa7HAC0I4ulNPCiwxMTB4WMeBxdMUZ7wPNZgFOtZoFOTlMkOdJpjN9

Zn0NThg9PBuvQ0LgAblrx3jPcu/jPHBreNJB5FPvczfHvZn62rU79NReptD1SQsDGypJM1xjLMlB93VXhmmNqhumNVuslPr2xcCtIHUDNAYcAbgeIUZ+/TPepmsM/xlF1xAVYDbAXYAQoN5H4Zhr3l+3xH6JyBNlwudOkZoz1ixg1GSx8VML010PFEd0Peu7dOYRxxP9Zl7OG+t7PjGwHlkJ3FE2+yhMCZ6JLGC/w3Vi1FNi5hI3g5rhO4ER/CuH

GV2XpwuPz2rLO8/WmOQZ+mO5J//b0Ad2CqQdYB58LV2C+1bOKJodO5gbfxtAXYh+8TAgKm4bwn+DcV05pXU6mvT2lRxX0mJkl0E+uYMOZmjO3ZtMW0uzv27pqtNyptjM7iWj7yczxOl/bxMHBmN1HBy1mCZ4lFHes1NJQYjnr4dNZknBPPsJ6TOcOi4XYCVaA4EejOzO3HXw5pUPFxolPI5naPZJw3PQZxmMQ+tarF8VmPkSZNPThI0PFZ9oIFKU

0NdxvRPmZq0PM5vgPlR252kuoQMtZtdO3Z28Vbp5OO9ZwXPPZ6GMuJ6/DeZ1nC+ZpzhHBdfM0e8ZPIByZNRhuZMRZw/NyEM2PsepZPmxlZM8jGZCzQCWXO6t/awZi8MVIkXXRw+fXYAdYDTgKoArQK3NE5q6O3Jur73JuZCPJ5sPPJoYNTpoUXB0iyN9x+dM2R3sMT5wPNT5xzNJirX1l8dCP/2jE3MZpfNtCheM+eCQBoprsBrRhSGDRpfH/ZgJ

PCZoHOopucPue9FMF5+n4HhtZNqgPh2AJmV2V0gXU65sDN65lHMG5tHNG56OFnMe0CHggECieeRNsGa3PThb8MPpLlN2GHMBmuoQQQWMAun6izPQJqzPfJoVMoeprP/J5pPT57+3e01zPdJxz1R53tmue8Y18RpVOCRxyFUR51MTmV1MMRogtGptPOr47kMz+yoB6GkwuWp2BX8WYSM0R7SBiR+k2kTQvPiurh0mYdf1nAX1qzOs+n4pvZObR8t0

QZyt0Zengvr26HUzIfLM/5wbwGRnvOJplH3yF0TWdh1XXD0nH2/RiON2RyjNXZzQuIFsb7tZ9sZH7YkPFETdOts+xMC5iPNC55fOvZpQNcO66MLMM4BVsGV3sMkllsFqItux9e0BwDhA7KKSxS/JR36Z/L6Dp/+IrQLNiWQIsDXRhVGq/LIs2u4fOWZ6AsFF6/UXZ4eOip//1DhpzMeug/y6FjAvuZ4XMdR/MWvps30pNQvoHdQ9rHdPUwS5piN8

Zk93+J1cNuaoJMhzC4tTRq4v0DW4vCOe4s0FqAUBFtZO5gA2h/BGV2Ti9aNFxxHPqZpe2H+lV3iJyz4/cZgB58acA7AYVHnMMYt9pvryiFxF0YZur7jaVw7N8G7g5+o4gvJj3N4u1NOQFkfOGesfP+5wQPwF67NaF7nOYEL11z5+osAO44v6F1jOGFow1LwU3mj+n7PPF1iNCZt4siZkOa8lkw2VcxWiRJvwu0FzhMTjOEOVakUIyupKOaB1gsLO

/ouijNL0x+4/3VByNOLXHYA1AKIW/AAwMfhuPzMeTfwZKROoOxp/BQfGnPaJnlO51QoUlRrsP5FiUWDx35PqF+zMIF4PPaFn/Plp8PNO/Hv3VpvpOeOiAA0ucczKMGAAK3VuwCyj9Q9LUtToWq6wa84W2oAS4NEUrhyd5dEkyoJ6SXBzMuywqVJNPWW0sK+W0qq/CD5WgKI3pw4Pj+hFMvFkaOil8gvVDCMvxwKIDRlhF77qOMsOqBMtVAJMtC2j

gAi29Y0/E/Mvyke7i5l0W2HqVQAFl/bJFlg+By2usnkW8ssq52JNZJcMppRt920BMP2mXGEtBsuEt3hqR0hGVcCYAM7z6AAMDnMMjVfGz2lSeKCTqjCqk7+KZDzYD9AnAJ6OP++SaHZiAvHZqAss52kvGexpMlF1dNlFlCNNs+NPzIqePNRiGNgpycPNFkXMzhmaAUO5QVHgVcC1AYLAiWKHSnMVACtQRh2oAIu5q8dGKynfZQ6CpPO+evxPCl9P

OO+zPOVAWCsQO+CvIFJCsTbDKgAgNCsYVwrpYV2U44Vy8B4V/5QAl3OUxJh/aPCVzZNhmV2LZtUu9FjUs154NOwl++NQZx+On+6HXpjN2lr6D2m/Cr9xBjH2lQe2ZDLFyrPx69r6wgBRR1Z26rZpmYPFFjQv/l30vYeCosSBqovp0mcaoFld0clp7MnFqCtnF/eltFxaDnbKRBGRwDPHMZIC3CybOj6lMZahiH35gGNNS6+4yZxMfZqVtuWOlkE1

aV3IvBIr5NnZmzNqFmOl/l6jOxxlyOSBgalgTBjNOO3X2cl4MsGFu3XZeB2pnAFdL8Ozyv35ukW+VkR0lxmt0BwHYC/AZIDTgJYyFe95B2HGaCB8EaLYCFICU5msraOhwMVJ7uOUlj8vUl8OObFwyuXZ4yupVzX31R6KRHF+ytclgbOhlqAI6gc5ibgInRYDCAhbKBcD6YI8DUgRCsOEJ/jS0c+ZOxufGqiOFMp5nw3bxwHMBG0h0CsVas/aDat3

e7at+eJ/j7VveXUgI6uQEJctJZ1MUXbRwFvui0VV5pSNiV6Iv652IvT69HOn+sKCIFegAZgdYBFBpbOr6w8b0+PiuGZLWi7+KzKHAOiTPlvuVTIDSsM5xQskZ0fN+5n8vOu70uMlgCvWJ/PVoZleUrBsCugpuePYJmGM4F9ADeFQooqVcRbBcSBQf5HNIoLfNwc1x/jldOJUORFstS9Gxx816jkBnAWtpuegmZueNYSdbskSfHrq4PaZZJ82Mv7W

CWvifaWuMvWPp8Q0VbSOWugS1mgnc06dQ9dI+RykWPrk8iTqa29W37rYO0ugn4BvOR7W85fsur3N+46rIymcyvEmz8wImW27ZLLdQDYgbETrK7O+5c09jobOTwCLAd3omgwTlspANQfmn4pilFbJi2cDZ12dJ0LFeXLvizW1xNIJxP1E9btZJNoMDK9rdM7KGflfZyp14pyQbWDYHWXOQg2K+B3yIyl61tzoDod2uq4BJ2grZMvr4UJXhK+tUHrN

lwKuWtU9QlGb9TTRxHyJxV+k5jFRK8nF7PKSA3tXuSMk3pz+dSJx62wByNAHFzlLUQAUgpm2pQZ5WpuqvRACkEAcIJ2ApWwGToOFK0Vl7z2EV3xNDRussil5vWNlkOZs1p7V+waWslFLi1DgEFIS1pWuC1nOvC17K2i1j8Ti1y5U0Oekbf1mWtf1Gmward6AS1qGbS1lWsMK+Mzq1uBrANsT60fbWs2ww6x61+WtG1j7FgN82tVmy2vk462scAe9

TOVYAG9Wx3Il3J2tdZZ+tEdOJru17yWe1n4De18WExkjkwB155ZB1piGh15Wk59QuwR1r23R155xp2dLJoSkBzj0JOv3WcutJtdOtAvMIpE9XOtONfOtUPQuu/FmKECk6Rv6U8Zb92uNymuE+TI2BuuVOJuvcXVutB/TjN+QN+UhgytU91v+t91ywlBEiqWRmxDZozUevlg8evE2qeteUku6z14EDz1pQmL1nFzL1tHqZgVevr169ab1sIDb1qh5

BGsi0H14QBmNk+uLFc+vfVtouI+MRAliGV3NBoGvhR6EvCJiSsN57gtN56OH0AEYCxgTJitQBAChRxGs54n+MjQfOA3fHvOLMeaCbAFRnuiAthARzHivJ8/R2y2dNrFr8sk1tnNIijnMa+vr3OZ9eb3ZxjP4eoMttRgqudRwlZ6OLAZdgeUROwdZTOoScD0Vggvw6Tl2VXJ4ssRkguvF++s3VyRFmvT6zjdJZtjgFZsZUAGQoVhispNi4Wc63MCV

cBTNJJuWWgZzUvgZsGvpeiGvxF0/3EAX4OS4Ixi0pn42o1zN4K/JcLRjBEMl48WJmZ4qNppz8vE1+rOk11X3k10oumVyz0tbbKshB3KvzV/Kvcligmea/2DLgpeB8bVtzj3Wonj3Bxzzmwlt/yT9k+rAsl55elbG1ylscAIFBOlQzZDyFlxSddhwZK1VZWubpZhAWCnBpZluVgtlt8vU9a5uO076vTWBeRdhbPqiUETYZlvb+NlsdLBjQ8DbYlty

bPmNPMInrWwm3MtuaBst1ODBQeT6rZHdQm2djaW3OBw0w8IDMt3aCitt2B/y8xv72Mlb9PMhtBmZltJAA1uXc4RszE+u22OJuRJlt9QlqR83Mt94rGbG6THSO3IC5C/oNtdSVCLMqV+FBcBn5JNqJtlDU+EhcDq9cO7ilMmzOAIB7KUy+oGwBcAsvfdRK5ZfK+WvcBDk9aHzchcD3Wc2vxkwbY+lSCHlHeJYIG9SWbKr5L2QSmX7y2AHE2tRZxwc

wB/qZuw73DPKdKyXJSEyQGibTZUO28BywrHpXDPcYoe9RHA7w1iD+WnCDnrRpwUaQQrLqeZ6p3UDQ8Zq+u7N4iv7N+suHNhXPVDHSBst4lu+9Ulu93HckUtqlsXt2ltc5elvolRlsfY5lust5cF5Q+6zwQiNY8t5TbRrb2BuUkNA2gT6QopYVvUtsVv/LER6yAuGzDtaVtvQPoByt2duOOXNRKt5cEqtrIlIktODu8wMzM2Z7pHPfYB6t6luGtjW

n+5U1ut2c1vQcq1vMAG1sQd+1vrgpEHOtsHq21jFzEAd1vEdr1va2FRGVKv1sfyANuhaYm0htjgAfFcNsnWnJajIZ1RA2WNtarb+QspRNvfyZNtYkngnptk+WZtuAo5t1l55tg2sFt/eVAPEtugOMts7gss1VtxVy1thK3eahtvXrKCFUclts/S0Gz9TGKVdtw+CPm3tsPrOuycOIdtdFTdVjt7GQTtjdWjtmdvbqudsI9Zy2LtvWsrtzgBrtoGW

lcwpxbtlO6n2Ye2++ySM3Boqs76W2NXCmV0ly9Uv5h9gucomItfN2P2Q1/Us/1VcC/AIHawgZTMoZwD5Xls3BpbcbTVSKsRCaugUDVvRNEZpnN9NhFv6V8jPjV7YsSx8l2c50QPMliZBzVxfMOVrAs4J1xPDgDB3vULpx7ynliYOnlh15J6vkrT+5XwNhyKVghk/Uc6s1lmXPWsp9N0JlTBTd8boAgWbvLKBbuklZbumbVbvpwKACKVmUuuvDhNi

h5ctQqMYBtypJPnlqqtBp0GucF8GuFdn5v6ls3KDgHYCtQTACqQIQvjFw+30+JqitWFF2F43NhtNo1CWynRPWy1rtDV3ptKF9Yvul2AsB56OMt4911a+iFAjdxouYFxWpSAUs7yAJQBgS9gAqAEeDhASIB5oVexNgTxtQABQApQJatxhD/JKiCcBW2d8RUqgUuGp3l1Htu+vy5iq23Vznv5DHga89ggB3N24PNs6CRXbGV2Jaz7uEp8Ss7lySuN5

6Sv6lwgAwAVoAwAaU4JAHcPCF7+IhViZ1UwB9KFgEWIZYW7gu5zRP41truaojrs0lgZu2Zhv1UZmOPTV9UVZBS6MBllOPTN9OM3UMnuyACnsKAKntsAGnvawCIDGDBQCDKkkHKAZwA2OZwAkS1nvM17d1oy39qW5TWDawfnu1S2sskVhwu0J94sykNPtRAKnpcOWnsy91Lux0M7w3cGVB35++jJAf7XZdl2PvNjgv151HNxFopvr285jytZQBbEI

wBSHI3vVdqHsyof+Lh+KBEPRohEdNl6PI9sCNvJtHsfJjHv9NxFuDN0z27F5BNIFmau0HCZs5V0ANuZhaufhQPtyAOSVUNmoQRNYBpxpBQCs2do50kBQDRNNnvyp1Giz3H9pRAbPteG3bsmp1d7kViQBP9u/tcV7vWEx/TLrfBaAAZ441AZ/nUiVnLst9vLufNnUsaRk/36lmoDQEfABCo0Bq0pk3vx+UpO4MSrgKeRvbbAaHtS+pHtRV8As9Nhf

tE1p3vL9l3sOhnYuDh9fst+zfu85tksPZqZtyB/3uWcQ/vB972DYAIBSh9kPsJpFi2/qKevNmzOyp23gdxmN0naFRjqYgePs6SvG7OAfCBvOW9TSAfQCVV6CuuJpXLK3NJ6q3CwkcfV/t7e9/uPpz/vPp1GjqDmQdaD+Qc6Dv/sEa8Z1f0Swb7uMbNnh13VvNkGvTDFZ0Fd3UtFdr3Z6YSlOAiZIBZNqcVI1tN7x+M5rFiIsBI07JSJAPOEmZ6PX

klsEXz94jP6m8gddduku/lyavu90ZsHFjLBE9v3vgprizsDuSWcD7gfvi6nsjnZwBBTQQcZ2MlwJ9mPsRATKHPa45Y10RgDR93TlAKJQcqDpytG+pXK1D96C6D9kP6DjGPXV09ucRj/JdD78T3d9Fn+FugvZxlviTRZLgyu/e3a50Su5N2vO3xm8O7lrTP7lha6dyfQAjAPPgUAakCYlhIU3pdAeQfRnzFgZpv7mH7X5sA1qEDgfMVZ3T0Qi4tl6

V1zJQmrYt/JlFsmV/Hub92fN1FpgdrB0bv797xJ5DpQAFDtY6owsPslDsodzOCocKALY4wj0nL6AegDYABQAIj7ABg5D7FNDlwCPm2xvaAVof396PMHSOtu2NwdQR89hKEF7bu/Z1POy5sq0Xu4L3pY/7G914kdzohkgV92wHTYJqgqM7NgyuvUOQlvovODrUv5d2AequzSNv0GoD0AAECAiLVxqHC8tKVqTyTOh9IzFnAhEatxHQWG4eFRwatHZ

9HtkD0asvDnrtvD6geWJymutJganFen3sL54ntjd0ntFnDgfywQofLFYod8DyEdU3e/BwjzQAujlEfIjxEdojrmkYjr9XDkiICPm4om4jlPsNA1INzwVyJk8uttMyHoeoxv7MPp/odkFo5shzCdRadZtqMktu1Rjywdj25sXTIK3voGGV1cm7JuUxpYeq91weCjhEspUn7jrAYgCFdVSCIFBSPVN9y7exxgNyjwPYKIJICZYDES2MQCP4Zu3txD9

ruL9zrvPD5X2NZ5KupDvHse9ktMgIfD7b9rFu79vQu4t3IdWj/Ic2j0Ef2jsQcppcoekuOTn7WEPvsSnEdQAZQd4jwwtK5MeRxS021pFaMfS52Mf2FmZkDD0XvVDE8c+lM8fsaNlUtYTMdiy/yPsGePwh+2e0LDyAd8jj5s/dtwdwD6t3gAfmAdoV2IHHT8C1QaADkKnqBQQW4BTABgAjyCgCapcYNY+qyNsIEQDEoJuyZAWMyo9qEBQgQYBYT8b

BfQXCcdQOFvQRkic4ThPTvGhFvUTsicJ6WkDmAX4CzqX9QwwQauETgioMTnIDkT/CeqCM9LAQEcUPraODETucGkT3idMTmlB7Mty194EQ5w9fkg8TmcxSTpdNiT7CeMTzIBdgWrZKT8iemLIZE6T2icGppCfiTmieZAaUYrGAyeZARKD5Oyyf6ANo7RZi/NWcWydz1OLMxZ1MNrXWyfGMNxph4GMBqTiSfKTsyfwILSfCgLZCfAXORUgcgxoAByS

7QaEJ1pibynxpCchOSmQisKKdMqe3NAIC7a6hD9C/2soBaugwBU6pEgUuN4BnjHrC2TrSdYeDnjETtEAkAMNlIT6qfEAWkD9mb/htWEgCrgBPpz1X+q3aFqcVWC5CEpMmxh4ZQBIgHUwVRNyhOwEafSTf4sfAGSCawG1wDToadHQp2ALTisFOwCadYJFph3KHEBjgBUB1AeUEFTiXDzkfidP0C4AZAQTBoT2DBJ8RGz/AYuC/QILgsTmAA2Gjif8

gW6coge6fsTs6e+TkU2rGLadwAHacEOVrBKTw6d1rWuj/TjhIyQRZBxmPacRcTqcPdthBEAVuDjDxcwwzi7kqQGGfztf4Ay6dZCoz/npMADqeINRWAvwUqfLOZgDUgXzBwANqf2QXGdxaXpgdofTSMALafAgSGc9eTFVvj7yB/ygwDeTrYM7ka3o55aFYcYRXjA2CCC0zmp7BweJSfTyAD7KxBp9MtsCrgbICbpfTj30TRjZSp0cpYKGd4z4if+g

VcAkADwQkzozGUz8mDQ+TVSYAHmccfcmc9QHMLqz/pZBgFnYbpKSBcmQMjPjFUjpISqAgASqBAAA
```
%%