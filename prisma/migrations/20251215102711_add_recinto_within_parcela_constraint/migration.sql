-- Función que verifica si el recinto está dentro de la parcela
CREATE OR REPLACE FUNCTION recinto_within_parcela(recinto_geom geometry, parcela_id int)
RETURNS boolean AS $$
    SELECT ST_Within(
        recinto_geom,
        (SELECT geom FROM "Parcela" WHERE id = parcela_id)
    );
$$ LANGUAGE sql;

-- Constraint que usa la función
ALTER TABLE "Recinto"
ADD CONSTRAINT recinto_within_parcela_check
CHECK (recinto_within_parcela(geom, "parcelaId"));