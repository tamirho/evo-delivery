from deap import tools

from ea_server.api.utils.constans import INDPB
from ea_server.model.ea_function_model import EaFunctionModel, KwargModel

shuffle = EaFunctionModel(function=tools.mutShuffleIndexes,
                          description="Shuffle the attributes of the input individual",
                          kwargs=[KwargModel(name=INDPB,
                                             type="float",
                                             description="Independent probability for each attribute to be exchanged toanother position.")]
                          )

flip_bit = EaFunctionModel(function=tools.mutFlipBit,
                           description="https://www.tutorialspoint.com/genetic_algorithms/genetic_algorithms_mutation.htm#:~:text=operator%20more%20useful.-,Bit%20Flip%20Mutation,-In%20this%20bit",
                           kwargs=[KwargModel(name=INDPB,
                                              type="float",
                                              description="Independent probability for each attribute to be exchanged toanother position."),
                                   ]
                           )
