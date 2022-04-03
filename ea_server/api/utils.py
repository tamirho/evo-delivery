import math
from operator import itemgetter
def transform(result, data):
    result_as_dict = dict()
    for driver in data["drivers"]:
        result_as_dict[driver["id"]]= []

    for order_index,number in enumerate(result):
        driver_index = math.floor(number)
        driver_id = data["drivers"][driver_index]["id"]
        item=(data["orders"][order_index]["id"],number)
        result_as_dict[driver_id].append(item)

    for driver in result_as_dict:
        print(result_as_dict[driver])
        result_as_dict[driver]=sorted(result_as_dict[driver], key=itemgetter(1))
        result_as_dict[driver]= [i[0] for i in result_as_dict[driver]]

    return result_as_dict

# Object Structure
# { "driver_id1":[orderId , orderId,...],
#   "driver_id2":[orderId , orderId,...],
#   "driver_id3":[orderId , orderId,...]
# }
# The object with current data:
#{
#  "11": [
#    "4", 
#    "1"
#  ], 
#  "12": [
#    "5", 
#    "6"
#  ], 
#  "13": [
#    "3", 
#    "2"
#  ]
#}
