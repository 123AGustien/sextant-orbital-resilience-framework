# -----------------------------------------
# LEVEL 6: DYNAMIC COUPLING MATRIX
# -----------------------------------------

COUPLING_MATRIX = {

    # Orbital instability impacts finance
    "orbital": {
        "financial": 0.6
    },

    # Financial instability impacts orbital
    "financial": {
        "orbital": 0.4
    },

    # Satellite degradation impacts telecom
    "satellite": {
        "telecom": 0.7
    },

    # Telecom degradation impacts satellite
    "telecom": {
        "satellite": 0.5
    }
}
