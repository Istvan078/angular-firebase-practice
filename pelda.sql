create database pedla;
CREATE TABLE uj (
    oszlop1 integer,
    oszlop2 varchar(255)
)
BACKUP DATABASE pedla;
TO DISK = './'
WITH DIFFERENTIAL
drop database pedla