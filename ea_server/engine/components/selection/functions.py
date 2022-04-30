from ea_server.api.utils.constans import TOUR_SIZE
from ea_server.model.ea_function_model import EaFunctionModel, KwargModel
from deap import tools

tournament = EaFunctionModel(function=tools.selTournament,
                             description="https://en.wikipedia.org/wiki/Selection_(genetic_algorithm)#Tournament_Selection",
                             kwargs=[
                                   KwargModel(name=TOUR_SIZE,
                                              type="int",
                                              description="The number of individuals participating in each tournament")])

roulette = EaFunctionModel(function=tools.selRoulette,
                           description="https://en.wikipedia.org/wiki/Selection_(genetic_algorithm)#Roulette_Wheel_Selection",
                           kwargs=[])

random = EaFunctionModel(function=tools.selRandom,
                         description="https://www.tutorialspoint.com/genetic_algorithms/genetic_algorithms_parent_selection.htm#:~:text=5-,Random%20Selection,-In%20this%20strategy",
                         kwargs=[])

best = EaFunctionModel(function=tools.selBest,
                       description="Select the best individuals",
                       kwargs=[])

worst = EaFunctionModel(function=tools.selWorst,
                        description="Select the worst individuals",
                        kwargs=[])
