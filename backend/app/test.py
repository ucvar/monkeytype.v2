import asyncio
import asyncpg

async def test():
    conn = await asyncpg.connect(
        user='postgres',
        password='egorkin123',
        database='monkeytype_v2',
        host='127.0.0.1',
        port=5432
    )
    print(await conn.fetch("SELECT 1"))
    await conn.close()

asyncio.run(test())
