from datetime import datetime
import unittest
import redis_dal as redis_dal

class TestRedisDal(unittest.TestCase):
    def test_set_json(self):
        value_to_persist = {'name': 'john', 'created_at': str(datetime.now())}
        res = redis_dal.set_json(
            'test_key', 
            value_to_persist
        )

        res2 = redis_dal.get_json('test_key')

        self.assertDictEqual(value_to_persist, res2)

if __name__ == '__main__':
    unittest.main()