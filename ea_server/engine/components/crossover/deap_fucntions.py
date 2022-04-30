from ea_server.api.utils.constans import UNIFORM, ALPHA
from ea_server.data.deap_function_model import DeapFunctionModel, KwargModel
from deap import tools

single_point = DeapFunctionModel(function=tools.cxOnePoint,
                                 description="https://en.wikipedia.org/wiki/Crossover_(genetic_algorithm)#One-point_crossover",
                                 kwargs=[])

two_points = DeapFunctionModel(function=tools.cxTwoPoint,
                               description="https://en.wikipedia.org/wiki/Crossover_(genetic_algorithm)#Two-point_and_k-point_crossover",
                               kwargs=[])

uniform = DeapFunctionModel(function=tools.cxUniform,
                            description="https://en.wikipedia.org/wiki/Crossover_(genetic_algorithm)#Uniform_crossover",
                            kwargs=[KwargModel(name=UNIFORM,
                                               type="float",
                                               description="Independent probability for each attribute to be exchanged")]
                            )

blend = DeapFunctionModel(function=tools.cxBlend,
                          description="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwiqtPregLz3AhXGGuwKHVaUBA0QFnoECAcQAQ&url=http%3A%2F%2Fwww.tomaszgwiazda.com%2FblendX.htm&usg=AOvVaw1G1t_3o8u5Jwyl5DAs9AKS",
                          kwargs=[KwargModel(name=ALPHA,
                                             type="float",
                                             description="Extent of the interval in which the new values can be drawn for each attribute on both side of the parents' attributes.")]
                          )

partial_matched = DeapFunctionModel(function=tools.cxPartialyMatched,
                                    description="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwia0pDagbz3AhWUs6QKHSlJC0MQFnoECAsQAQ&url=https%3A%2F%2Fwww.researchgate.net%2Ffigure%2FExample-of-partially-mapped-crossover_fig1_312336654&usg=AOvVaw3zRwPS45TDz1xUXAb0i96l",
                                    kwargs=[])
