import functools
import math
def transform(result, data):
    result_as_dict = dict()
    for order_index,p in enumerate(result):
        driver_index = math.floor(p)
        driver_id = data["drivers"][driver_index]["id"]
        order_in_route = p-driver_index
        item=(data["orders"][order_index]["id"],p)
        
        if data["drivers"][driver_index]["id"] in result_as_dict:
            addToOrderedList(result_as_dict[driver_id],item)
        else:
            orders_list = list()
            orders_list.append(item)
            result_as_dict[driver_id]= orders_list

    for driver in result_as_dict:
        result_as_dict[driver]= refactor_orders_list(result_as_dict[driver])

    return result_as_dict

def refactor_orders_list(orders_list: list):
    res = list()
    for i in orders_list:
        res.append(i[0])

    return res

def addToOrderedList (orders_list: list, item:tuple):
    for index,i in enumerate(orders_list):
        if(item[1]<=i[1]):
            orders_list.insert(index,item)
            return
    
    orders_list.append(item)



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
