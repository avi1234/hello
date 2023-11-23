import psycopg2


def fetch_buckets():
    conn = psycopg2.connect(
        host="localhost",
        dbname="buckets-app",
        user="postgres",
        password="1234",
        port=5432,
    )

    cur = conn.cursor()

    cur.execute('''select * from buckets;''')

    res = cur.fetchall()

    conn.commit()
    cur.close()
    conn.close()

    return res
