from typing import Tuple


def get_preset_from_enum(enum: str) -> Tuple(str, str):
    enum = enum.upper()

    if enum == "LEAD_CONTRACTORS":
        pass
    elif enum == "CONTRACTOR_SPEND":
        pass
    elif enum == "HOMELESS_CONTRACTS":
        pass
    elif enum == "SMALL_BUSINESS_SPEND":
        pass
