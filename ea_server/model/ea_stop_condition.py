from dataclasses import dataclass


@dataclass
class StopCondition:
    applied: bool
    bound: int
    progress: int = 0