import os
import shutil

# -----------------------------
# SAFE ANNEXES STRUCTURE
# -----------------------------
EXPECTED_ANNEXES = {
    "ANNEX_A_input_structure.md",
    "ANNEX_B_dependency_logic.md",
    "ANNEX_C_cascade_rules.md",
    "ANNEX_D_output_interpretation.md",
    "ANNEX_E_sandbox_protocol.md",
}

ANNEX_ROOT = "annexes"


def flatten_annexes():
    """
    Fixes nested annexes like:
    annexes/annexes/annexes/...
    """

    collected = {}

    for root, dirs, files in os.walk(ANNEX_ROOT):
        for f in files:
            if f.startswith("ANNEX_"):
                full_path = os.path.join(root, f)
                collected[f] = full_path

    # Ensure root exists
    os.makedirs(ANNEX_ROOT, exist_ok=True)

    # Move files to correct root level
    for file_name, old_path in collected.items():
        new_path = os.path.join(ANNEX_ROOT, file_name)

        if old_path != new_path:
            print(f"Fixing: {old_path} → {new_path}")
            shutil.move(old_path, new_path)


def validate_annexes():
    """
    Checks if annex structure is clean
    """

    current = set(os.listdir(ANNEX_ROOT))

    missing = EXPECTED_ANNEXES - current
    extra = current - EXPECTED_ANNEXES

    print("\n📦 Annex Validation Report")

    if not missing and not extra:
        print("✔ Annex structure is clean")
    else:
        if missing:
            print("❌ Missing:", missing)
        if extra:
            print("⚠ Unexpected files:", extra)


if __name__ == "__main__":
    print("🧼 Running structure healer...\n")
    flatten_annexes()
    validate_annexes()
