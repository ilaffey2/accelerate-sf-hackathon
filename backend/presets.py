from typing import Tuple


def get_preset_from_id(i: str) -> Tuple[str, str]:
    if i == 1:
        return (
            "test",
            """SELECT *
FROM `hazel-mote-150900.vendor_payments.budget`
WHERE `Program` = 'Homeless Services'
LIMIT 100""",
        )
    elif i == 2:
        pass
    elif i == 3:
        pass
    elif i == 4:
        pass
