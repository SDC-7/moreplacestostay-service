module.exports.geospatialQuery = function(longitude, latitude) {
  let queryString =
    `WITH closest_candidates AS (
      SELECT
        residences.id,
        residences.name,
        residences.price,
        residences.url,
        residences.geom,
        residences.longitude,
        residences.latitude
      FROM
        residences
      ORDER BY
        residences.geom <->
        'SRID=4326;POINT(${longitude} ${latitude})'::geometry
      LIMIT 50
    )
    SELECT
      id,
      name,
      price,
      url
    FROM closest_candidates
    ORDER BY
      ST_Distance(
        geom,
        'SRID=4326;POINT(${longitude} ${latitude})'::geometry
        )
    LIMIT 12;`
    return queryString
};

