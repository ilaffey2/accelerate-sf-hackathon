from typing import Tuple


def get_preset_from_id(i: str) -> Tuple[str, str]:
    if i == 1:
        return (
            "Who are the lead contractors in homelessness, and how much do we spend?",
            """SELECT
 SUM(Contract_Awarded_Amount) AS total_contract_amount,
 MAX(Scope_of_Work) AS example_scope_of_work,
 Supplier_Name,
 Department
FROM
 `hazel-mote-150900.vendor_payments.supplier_contracts`
WHERE
 Department = 'HOM Homelessness Services'
GROUP BY
 3,
 4
ORDER BY
 1 DESC""",
        )
    elif i == 2:
        return (
            "What are the different contracts for homeless services",
            """SELECT
 Contract_Title,
 Scope_of_Work,
 Supplier_Name,
 Contract_Awarded_Amount
FROM
 `hazel-mote-150900.vendor_payments.supplier_contracts`
WHERE
 Department = 'HOM Homelessness Services'
ORDER BY
 1
            """,
        )
    elif i == 3:
        return (
            "What do we spend money on for mental health?",
            """SELECT
 SUM(Vouchers_Paid) AS total_money_spent,
 Fiscal_Year,
 Object,
 Program,
 Department
FROM
 `hazel-mote-150900.vendor_payments.vouchers`
WHERE
 Program LIKE "Mental Health%"
GROUP BY
 2,
 3,
 4,
 5
ORDER BY
 2 desc

""",
        )
    elif i == 4:
        pass
