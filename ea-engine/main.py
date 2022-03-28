
from deap import tools

from ea import EA 
from cx import Crossovers
from mut import Mutates
from sel import Selection

data = {
    "drivers": [
        {"id": 11, "max_capacity": 5, "max_distance": 2},
        {"id": 12, "max_capacity": 6, "max_distance": 8},
        {"id": 13, "max_capacity": 6, "max_distance": 8},
    ],
    "orders": [
        {"id": 1, "weight": 5},
        {"id": 2, "weight": 5},
        {"id": 3, "weight": 5},
        {"id": 4, "weight": 5},
        {"id": 5, "weight": 5},
        {"id": 6, "weight": 5},
    ],
    "distances": {
        0: {0: 0, 1: 99, 2: 99, 3: 1, 4: 1, 5: 1, 6: 33},
        1: {0: 1, 1: 99, 2: 99, 3: 99, 4: 99, 5: 99, 6: 99},
        2: {0: 1, 1: 99, 2: 0, 3: 99, 4: 99, 5: 99, 6: 99},
        3: {0: 99, 1: 99, 2: 1, 3: 0, 4: 99, 5: 99, 6: 99},
        4: {0: 99, 1: 1, 2: 99, 3: 99, 4: 0, 5: 99, 6: 99},
        5: {0: 99, 1: 99, 2: 99, 3: 99, 4: 99, 5: 0, 6: 1},
        6: {0: 1, 1: 99, 2: 99, 3: 99, 4: 99, 5: 99, 6: 99},
    }
}

# 0->3->2
# 0->4->1
# 0->5->6

def main():
    ea = EA(data) \
        .set_pop_size(100)
        # .set_crossover(Crossovers.SINGLE_POINT) \
        # .set_mutate(Mutates.SHUFFLE, indpb=0.05) \
        # .set_selection(Selection.TOURNAMENT, tournsize=3) \

    result, log = ea.eval_model()
    best_individual = EA.get_best_individual(result)
    print('best individual: ', best_individual)

if __name__ == "__main__":
    main()