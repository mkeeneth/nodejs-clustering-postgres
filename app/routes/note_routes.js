const maxNotePerUser = 20;

const db = require("./../../db"); // pg pool client

const Router = require("express-promise-router");
// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

// export our router to be mounted by the parent application
module.exports = router;

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query("SELECT * FROM notes WHERE userId = $1", [
    id
  ]);
  res.json(rows);
});

router.get("/", async (req, res) => {
  const { rows } = await db.query("SELECT NOW()");
  res.json(rows[0]);
});

router.post("/", async (req, res) => {
  try {
    await db.query("BEGIN"); // start transaction
    const { rows } = await db.query(
      "SELECT count FROM notecounts WHERE userId = $1 FOR UPDATE",
      [req.body.userId]
    );

    if (rows[0] && rows[0].count >= maxNotePerUser) {
      // over limit!
      res.status(507);
      res.json({ error: true, errorMessage: "Overlimit!" });
    } else {
      await db.query(
        `INSERT INTO notecounts VALUES ($1,1,NOW()) ON CONFLICT (userid)
        DO UPDATE SET count = notecounts.count+1, lastadd = NOW()`,
        [req.body.userId]
      ); // atomically update count
      const { rowCount } = await db.query(
        "INSERT INTO notes(userid, title, body, created) VALUES($1, $2, $3, NOW())",
        [req.body.userId, req.body.title, req.body.body]
      );
      res.status(202);
      res.json({ created: rowCount });
    }
  } catch (e) {
    await db.query("ROLLBACK");
    throw e;
  } finally {
    await db.query("COMMIT");
  }
});
