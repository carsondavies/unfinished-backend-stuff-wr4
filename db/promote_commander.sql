INSERT INTO commanders
(title, password)
VALUES
(${title}, ${hash})
returning comm_id, title;