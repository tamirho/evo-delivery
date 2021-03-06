# evaluation
# ----------------------------------------------

# fitness types
BOUNDED_DISTANCE = "bounded_distance"
POWER = "power"

#fitness params
BOUND = "bound"
DEFAULT_BOUNDED_DISTANCE = 1000000

# ----------------------------------------------

# crossover types
SINGLE_POINT = "single_point"
TWO_POINTS = "two_points"
UNIFORM = "uniform"
PARTIAL_MATCHED = "partial_matched"
BLEND = "blend"

# crossover params
ALPHA = "alpha"

# ----------------------------------------------

#mutates types
SHUFFLE = "shuffle"
GAUSSIAN = "gaussian"
FLIP_BIT = "flip_bit"

#mutates params
MU = "mu"
SIGMA = "sigma"
INDPB = "indpb"

DEFAULT_INDPB = 0.05
DEFAULT_MU = 0
DEFAULT_SIGMA = 0.5

# ----------------------------------------------

#selection types
TOURNAMENT = 'tournament'
ROULETTE = "roulette"
RANDOM = "random"
BEST = "best"
WORST = "worst"

#selection params
TOUR_SIZE = "tournsize"

DEFAULT_TOUR_SIZE = 2

# ----------------------------------------------

