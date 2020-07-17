create database jonny;

use jonny;

CREATE TABLE person (
  person_id     INTEGER   NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name    VARCHAR(250) NOT NULL,
  last_name     VARCHAR(250) NOT NULL,
  street        VARCHAR(250),
  city          VARCHAR(250),
  state         VARCHAR(250),
  zip           VARCHAR(250),
  phone         VARCHAR(250)
);


INSERT INTO person (person_id, first_name, last_name, street, city, state, zip, phone) VALUES (1, "Starry", "Mavey", "124 E Main Street", "Anytown", "UT", "84774", "435-555-67888"); 
INSERT INTO person (person_id, first_name, last_name, street, city, state, zip, phone) VALUES (2, "Bob", "Cheesehead", "566 George Street", "Shocking", "NZ", "59599", "435-555-67888"); 
INSERT INTO person (person_id, first_name, last_name, street, city, state, zip, phone) VALUES (3, "Pinky", "Pencilhead", "46 E Dire Straits", "Pain and Embarresment", "AZ", "39939", "435-555-67888"); 
INSERT INTO person (person_id, first_name, last_name, street, city, state, zip, phone) VALUES (4, "Spanky", "Jones", "678999 End of Road Street", "Wonder Why", "AK", "39293", "435-555-67888"); 
INSERT INTO person (person_id, first_name, last_name, street, city, state, zip, phone) VALUES (5, "Harold", "Crenshaw", "456 Road Street Avenue Lane Cul-de-Sac", "Truth and Consquence", "NM", "29939", "435-555-67888"); 
INSERT INTO person (person_id, first_name, last_name, street, city, state, zip, phone) VALUES (6, "Stewart", "Bloopers", "999 Please Call For Help Lane", "Paris", "MO", "59699", "435-555-67888"); 
INSERT INTO person (person_id, first_name, last_name, street, city, state, zip, phone) VALUES (7, "Yankie", "GoHome", "456766 Lost in My Own Purse", "Perdue", "PD", "59959", "435-555-67888"); 


CREATE TABLE pet (
  pet_id           INTEGER   NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name             VARCHAR(250) NOT NULL,
  animal           VARCHAR(250) NOT NULL,
  person_id        INTEGER   NOT NULL,
  vet_id           INTEGER
);


INSERT INTO pet (pet_id, name, animal, person_id, vet_id) VALUES (1, 'Petey', 'Bird', 1, 1);
INSERT INTO pet (pet_id, name, animal, person_id, vet_id) VALUES (2, 'Rex', 'Dog', 1, 1);
INSERT INTO pet (pet_id, name, animal, person_id, vet_id) VALUES (3, 'Jerry', 'Cat', 2, 1);
INSERT INTO pet (pet_id, name, animal, person_id, vet_id) VALUES (4, 'Bob', 'Toucan', 3, 2);
INSERT INTO pet (pet_id, name, animal, person_id, vet_id) VALUES (5, 'Harold', 'Turtle', 3, 2);
INSERT INTO pet (pet_id, name, animal, person_id, vet_id) VALUES (6, 'Tweety', 'Bird', 4, 1);
INSERT INTO pet (pet_id, name, animal, person_id, vet_id) VALUES (7, 'Annoying', 'Bird', 5, 1);
INSERT INTO pet (pet_id, name, animal, person_id, vet_id) VALUES (8, 'Norris', 'Octupus', 6, 1);
INSERT INTO pet (pet_id, name, animal, person_id, vet_id) VALUES (9, 'Ninny', 'Sevenpus', 7, 2);
INSERT INTO pet (pet_id, name, animal, person_id, vet_id) VALUES (10, 'Sylvia', 'Cat', 8, 2);
INSERT INTO pet (pet_id, name, animal, person_id, vet_id) VALUES (11, 'Brown 1', 'Cat', 9, 1);
INSERT INTO pet (pet_id, name, animal, person_id, vet_id) VALUES (12, 'Brown 2', 'Cat', 9, 1);
INSERT INTO pet (pet_id, name, animal, person_id, vet_id) VALUES (13, 'Brown 3', 'Cat', 9, 1);
INSERT INTO pet (pet_id, name, animal, person_id, vet_id) VALUES (14, 'Black 1', 'Cat', 9, 1);
INSERT INTO pet (pet_id, name, animal, person_id, vet_id) VALUES (15, 'Black 2', 'Cat', 9, 1);
INSERT INTO pet (pet_id, name, animal, person_id, vet_id) VALUES (16, 'Monstrous', 'Cat', 9, 1);



CREATE TABLE task_monsters (
  first_name    VARCHAR(250) NOT NULL,
  last_name     VARCHAR(250) NOT NULL,
  size          INTEGER
   
);