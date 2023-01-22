exports.getClicsPrestataire = "select CONCAT(EXTRACT(YEAR FROM jour), '-',\n" +
    "            CASE WHEN CAST(EXTRACT(MONTH FROM jour) AS INT) < 10 THEN CONCAT('0', EXTRACT(MONTH FROM jour)) ELSE CAST(EXTRACT(MONTH FROM jour) AS TEXT) END, '-',\n" +
    "            CASE WHEN CAST(EXTRACT(DAY FROM jour) AS INT) < 10 THEN CONCAT('0', EXTRACT(DAY FROM jour)) ELSE CAST(EXTRACT(DAY FROM jour) AS TEXT) END) as \"x\",\n" +
    "       count(jour) as \"y\"\n" +
    "from clic\n" +
    "where id_prestataire = $1\n" +
    "group by \"x\"\n" +
    "order by \"x\";";

exports.putClicsPrestataire = `insert into clic values (default, to_timestamp(${Date.now()}/1000), $1);`;