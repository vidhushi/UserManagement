CREATE TABLE userData(
id VARCHAR(20),
first_name VARCHAR(30),
last_name VARCHAR(30),
Email VARCHAR(30),
IsStatus VARCHAR(20),
UserType VARCHAR(20))


INSERT INTO userData
VALUES
   ('1','HARSH','GUPTA','harshgupta@gmail.com','1','Admin'),
  ('2', 'SAURABH', 'KUMAR', 'saurabhkumar@gmail.com','1','Normal'), 
  ('3', 'SUBHAM', 'KUMAR','subhamkumar@gmail.com','1','Normal'), 
  ('4', 'PRIYAKANT', 'UPRETI','priyakantupreti@gmail.com','1','Normal'), 
  ('3', 'SHYAM', 'SINGH','shyamsingh@gmail.com','0','Normal');
 

SET ROWCOUNT 1

UPDATE userData 
SET first_name = 'ASHU' 
WHERE first_name='SAURABH'

DELETE FROM userData WHERE first_name='SHYAM';

select * from[dbo].[userData]




