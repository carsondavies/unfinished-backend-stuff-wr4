SELECT t.tank_id, t.tank_name, c.country_name, c.country_id
FROM tanks t
JOIN countries c ON c.country_id = t.country_id;