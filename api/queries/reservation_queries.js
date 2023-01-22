exports.verifyReservation = "select *\n" +
    "from reservation\n" +
    "inner join pour p on reservation.id_reservation = p.id_reservation\n" +
    "inner join courses c on c.id_course = p.id_course\n" +
    "where id_public = $1 and c.id_course = $2;";

exports.addPeriode = "insert into periode values ($1);";

exports.addReservation = "insert into reservation values (default, $1, $2);";

exports.getReservation = "select id_reservation\n" +
    "from reservation\n" +
    "where id_public = $2 and date_periode = $1;";

exports.addPour = "insert into pour values ($1, $2, 1);";